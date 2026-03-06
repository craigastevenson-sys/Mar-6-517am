# Advance Language / Avance Langue - PRD

## Project Overview
**Giant Steps Language Training** - A bilingual (English/French) corporate language training website for Quebec businesses.

## Original Problem Statement
Restore the last project saved to GitHub from https://github.com/craigastevenson-sys/March-3-459am-2026

## Architecture
- **Frontend**: React.js with Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Deployment**: Emergent Platform

## Core Features Implemented

### 1. Bilingual Website
- **English version** (`/en`) - advancelanguage.com
- **French version** (`/fr`) - avancelangues.com
- Language switcher in navigation
- Browser language detection on first visit

### 2. Service Sections
**English Version Order:**
1. English/ESL for Professionals
2. French/TEFAQ Preparation
3. Foreign Language Training

**French Version Order:**
1. Français/Préparation TEFAQ (Featured First)
2. Anglais/ALS pour professionnels
3. Formation en langues étrangères

### 3. Bill 96 Compliance Section
- Detailed information about Quebec's Bill 96 requirements
- Collapsible content with compliance areas
- CTA for compliance training

### 4. Contact Form
- Full form with first name, last name, email, phone, message
- Saves to MongoDB
- Email notification support (SMTP configurable)
- Success toast notifications

### 5. Additional Pages
- `/tutors` - Giant Steps Tutors page (academic tutoring)

## User Personas
1. **Corporate HR Managers** - Looking for team language training
2. **Business Professionals** - Need TEFAQ/IELTS preparation
3. **Non-francophone employees** - Quebec Bill 96 compliance

## Tech Stack
- React 18 with React Router
- Tailwind CSS
- Lucide React icons
- FastAPI backend
- Motor (async MongoDB driver)
- Schema.org structured data for SEO

## What's Been Implemented (Jan 2026)
- [x] Full bilingual frontend
- [x] Language context and URL-based routing
- [x] All home page components (Header, Hero, Stats, Services, Testimonials, Contact, Footer)
- [x] Bill 96 compliance section with collapsible details
- [x] Contact form with backend API
- [x] Giant Steps Tutors alternative page
- [x] SEO meta tags and Schema.org
- [x] Image carousels with Unsplash images
- [x] Mobile responsive design

## Backlog / Future Features
- [ ] Connect actual SMTP for email notifications
- [ ] Add real testimonial images
- [ ] Implement admin dashboard for contact submissions
- [ ] Add blog/resources section
- [ ] Connect to real domains (advancelanguage.com, avancelangues.com)
- [ ] Add Google Analytics

## Environment Variables Required
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - For email notifications
- `NOTIFICATION_EMAIL_EN`, `NOTIFICATION_EMAIL_FR`, `NOTIFICATION_EMAIL_TUTORS` - Recipients

## URLs
- English: https://seo-manager-3.preview.emergentagent.com/en
- French: https://seo-manager-3.preview.emergentagent.com/fr
- Tutors: https://seo-manager-3.preview.emergentagent.com/tutors
