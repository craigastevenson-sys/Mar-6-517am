from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Meta tag configurations for each domain
META_CONFIGS = {
    "avance-langue": {
        "title": "Avance Langue | Formation linguistique professionnelle",
        "description": "Formation linguistique professionnelle au Québec. Cours de français TEFAQ, anglais ESL, conformité Loi 96 et programmes de langues étrangères pour entreprises à Montréal.",
        "og_title": "Avance Langue | Formation linguistique professionnelle au Québec",
        "og_description": "Formation linguistique pour entreprises. Français TEFAQ, anglais ESL, conformité Loi 96. De confiance des entreprises à Montréal et au Québec.",
        "og_image": "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?w=1200&h=630&fit=crop",
        "og_image_alt": "Formation linguistique professionnelle en entreprise",
        "og_url": "https://avance-langue.com",
        "og_locale": "fr_CA",
        "twitter_title": "Avance Langue | Formation linguistique professionnelle",
        "twitter_description": "Formation linguistique pour entreprises. Français TEFAQ, anglais ESL, conformité Loi 96 au Québec.",
        "lang": "fr"
    },
    "giantstepstutors": {
        "title": "Giant Steps Tutors | Professional Language Tutoring",
        "description": "Professional language tutoring services in Quebec. Personalized English, French, and foreign language instruction for students and professionals.",
        "og_title": "Giant Steps Tutors | Professional Language Tutoring",
        "og_description": "Professional language tutoring services in Quebec. Personalized English, French, and foreign language instruction.",
        "og_image": "https://images.unsplash.com/photo-1758685733907-42e9651721f5?w=1200&h=630&fit=crop",
        "og_image_alt": "Professional tutoring session - one on one learning",
        "og_url": "https://giantstepstutors.com",
        "og_locale": "en_CA",
        "twitter_title": "Giant Steps Tutors | Professional Language Tutoring",
        "twitter_description": "Professional language tutoring services in Quebec. Personalized instruction for students and professionals.",
        "lang": "en"
    },
    "default": {
        "title": "Advance Language | Professional Corporate Language Training",
        "description": "Professional corporate language training. English ESL courses, French TEFAQ preparation, Bill 96 francization compliance, and foreign language programs for businesses.",
        "og_title": "Advance Language | Professional Corporate Language Training",
        "og_description": "Expert language training for businesses. English ESL, French TEFAQ, Bill 96 compliance, and foreign languages.",
        "og_image": "https://images.unsplash.com/photo-1565688527174-775059ac429c?w=1200&h=630&fit=crop",
        "og_image_alt": "Professional corporate language training session",
        "og_url": "https://advancelanguage.com",
        "og_locale": "en_CA",
        "twitter_title": "Advance Language | Professional Corporate Language Training",
        "twitter_description": "Expert language training for businesses. English ESL, French TEFAQ, Bill 96 compliance, and foreign languages.",
        "lang": "en"
    }
}

def get_meta_config(host: str) -> dict:
    """Get the appropriate meta configuration based on the host."""
    host_lower = host.lower()
    if "avance-langue" in host_lower or "avancelangue" in host_lower:
        return META_CONFIGS["avance-langue"]
    elif "giantstepstutors" in host_lower:
        return META_CONFIGS["giantstepstutors"]
    return META_CONFIGS["default"]

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = ""
    message: Optional[str] = ""
    language: Optional[str] = "en"

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    message: str
    submitted_at: str

# Helper: send email notification via Zoho SMTP
async def send_contact_notification(submission: dict, language: str = "en"):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    # Hardcoded Zoho SMTP settings
    smtp_host = "smtp.zohocloud.ca"
    smtp_port = 465
    smtp_user = "craig@advancelanguage.com"
    smtp_password = "MpsWu9EYy1zr"

    # All submissions from this site go to Giant Steps Tutors
    recipient = "craig@giantstepstutors.com"

    if not all([smtp_host, smtp_user, smtp_password, recipient]):
        logger.info("SMTP not configured — skipping email notification")
        return

    try:
        html = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {submission['first_name']} {submission['last_name']}</p>
        <p><strong>Email:</strong> {submission['email']}</p>
        <p><strong>Phone:</strong> {submission.get('phone', 'N/A')}</p>
        <p><strong>Message:</strong></p>
        <p>{submission.get('message', 'N/A')}</p>
        <hr>
        <p><em>Submitted at {submission['submitted_at']}</em></p>
        """

        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"New Contact: {submission['first_name']} {submission['last_name']}"
        msg['From'] = smtp_user
        msg['To'] = recipient
        msg.attach(MIMEText(html, 'html'))

        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, recipient, msg.as_string())

        logger.info(f"Email notification sent to {recipient} for submission {submission['id']}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactSubmission):
    doc = {
        "id": str(uuid.uuid4()),
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
        "phone": data.phone or "",
        "message": data.message or "",
        "submitted_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contact_submissions.insert_one(doc)
    logger.info(f"Contact submission saved: {doc['id']} from {data.email}")

    # Fire-and-forget email notification with language
    try:
        await send_contact_notification(doc, data.language or "en")
    except Exception:
        pass

    return ContactResponse(**{k: v for k, v in doc.items() if k != "_id"})

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions

# Endpoint to serve index.html with correct meta tags based on domain
@api_router.get("/meta-index", response_class=HTMLResponse)
async def get_meta_index(request: Request, domain: Optional[str] = None):
    """
    Serves the index.html with meta tags customized for the requesting domain.
    This endpoint is used by crawlers/social media previews.
    Use ?domain=avance-langue or ?domain=giantstepstutors to test different configs.
    """
    # Use query param if provided, otherwise use host header
    if domain:
        host = domain
    else:
        host = request.headers.get("host", "")
    
    config = get_meta_config(host)
    
    # Read the original index.html
    frontend_path = Path(__file__).parent.parent / "frontend" / "build" / "index.html"
    if not frontend_path.exists():
        frontend_path = Path(__file__).parent.parent / "frontend" / "public" / "index.html"
    
    if not frontend_path.exists():
        raise HTTPException(status_code=404, detail="index.html not found")
    
    html_content = frontend_path.read_text()
    
    # Replace meta tags with domain-specific values
    replacements = [
        (r'<meta property="og:title" content="[^"]*"', f'<meta property="og:title" content="{config["og_title"]}"'),
        (r'<meta property="og:description" content="[^"]*"', f'<meta property="og:description" content="{config["og_description"]}"'),
        (r'<meta property="og:image" content="[^"]*"', f'<meta property="og:image" content="{config["og_image"]}"'),
        (r'<meta property="og:image:alt" content="[^"]*"', f'<meta property="og:image:alt" content="{config["og_image_alt"]}"'),
        (r'<meta property="og:url" content="[^"]*"', f'<meta property="og:url" content="{config["og_url"]}"'),
        (r'<meta property="og:locale" content="[^"]*"', f'<meta property="og:locale" content="{config["og_locale"]}"'),
        (r'<meta name="twitter:title" content="[^"]*"', f'<meta name="twitter:title" content="{config["twitter_title"]}"'),
        (r'<meta name="twitter:description" content="[^"]*"', f'<meta name="twitter:description" content="{config["twitter_description"]}"'),
        (r'<meta name="twitter:image" content="[^"]*"', f'<meta name="twitter:image" content="{config["og_image"]}"'),
        (r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{config["description"]}"'),
        (r'<title>[^<]*</title>', f'<title>{config["title"]}</title>'),
        (r'<html lang="[^"]*"', f'<html lang="{config["lang"]}"'),
    ]
    
    for pattern, replacement in replacements:
        html_content = re.sub(pattern, replacement, html_content, count=1)
    
    return HTMLResponse(content=html_content)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
