from fastapi import FastAPI, APIRouter, HTTPException
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

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', 465))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')

    # Select recipient based on language
    if language == "fr":
        recipient = os.environ.get('NOTIFICATION_EMAIL_FR')
    elif language == "tutors":
        recipient = os.environ.get('NOTIFICATION_EMAIL_TUTORS', os.environ.get('NOTIFICATION_EMAIL_EN'))
    else:
        recipient = os.environ.get('NOTIFICATION_EMAIL_EN')

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
