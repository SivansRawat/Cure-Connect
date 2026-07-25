# 🏥 Cure-Connect AI

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev)
[![Prisma](https://img.shields.io/badge/Prisma-6.8-purple?logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)](https://neon.tech)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-1.5_Flash-orange?logo=google)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**Cure-Connect AI** is an enterprise-grade, all-in-one telemedicine and healthcare management platform designed for modern digital health practices. It seamlessly connects patients with verified medical specialists through AI-driven symptom triage, atomic appointment scheduling, HD video consultations, digital clinical prescriptions, and a CarePoints-backed financial ecosystem.

At its core, the platform operates an **AI Medical Triage Pipeline** powered by **Google Gemini 1.5 Flash** and medical specialty classifiers, guaranteeing instant doctor matching, zero appointment double-booking, and 100% data consistency.

---

## 🌐 Live System Endpoints & Production Setup

* **Web Application (Local Dev):** [http://localhost:3000](http://localhost:3000)
* **Database Cluster (Neon Serverless PostgreSQL):** `ep-orange-voice-ad382sej-pooler.c-2.us-east-1.aws.neon.tech`
* **Authentication Provider (Clerk Dashboard):** [https://dashboard.clerk.com](https://dashboard.clerk.com)

---

## 🗺️ Architectural Topology

Cure-Connect AI is engineered with a modular, serverless-first Next.js 15 App Router architecture to ensure low latency, atomic data integrity, and strict role-based access control (RBAC).

```mermaid
graph TD
    A[Next.js Client / Web Browser] <-->|Server Actions / React 19| B[Next.js App Server / Node.js]
    B <-->|Clerk Claims & Auth Validation| C[Clerk Auth Service]
    B <-->|Atomic Transactions / Prisma ORM| D[(Neon PostgreSQL Database)]
    B <-->|Symptom Triage & AI Analysis| E[Google Gemini 1.5 Flash API]
    B <-->|Session Tokens & Media Routing| F[Vonage Video API SDK]
    A <-->|Peer-to-Peer WebRTC Fallback| G[Browser WebRTC Camera Engine]
```

---

## 🌟 Core Modules & AI Telemedicine Features

Every module across Cure-Connect AI is built for high security, atomic consistency, and visual elegance:

### 🤖 AI Health Assistant & Symptom Triage Hub
* **Smart Medical Triage**: Analyzes patient symptom descriptions in natural text and categorizes them into 8 core medical specialties (*Cardiology, Dermatology, Neurology, Pediatrics, Orthopedics, Psychiatry, Gastroenterology, General Medicine*).
* **Instant Doctor Matcher**: Queries verified doctors in the matching specialty and presents direct 1-click booking actions.
* **Hybrid Fallback Engine**: Uses Google Gemini 1.5 Flash with fallback to a local medical keyword classifier if API keys are omitted.

### 📅 Atomic Appointment Reservation System
* **Race-Condition & Overlap Protection**: `bookAppointment` executes slot availability validation, patient credit checks, credit transfers, and appointment creation within a single `db.$transaction` block.
* **Strict Time-Based Filtering**: Automatically separates consultations into **Upcoming Appointments** (`endTime >= now`) and **Past & Completed History** (`endTime < now` / `COMPLETED`).
* **Credit Balance Safety**: 2 CarePoints per consultation with automatic credit refund protection on appointment cancellation.

### 🎥 Secure Video Consultation Suite
* **HD Telemedicine Stream**: Integrated video consultations using Vonage Video API SDK with token generation and session expiration.
* **WebRTC Local Fallback Room**: Embedded WebRTC camera/mic fallback engine (`navigator.mediaDevices.getUserMedia`) allowing full video consultation testing without active Vonage API tokens.

### 📄 Digital Prescriptions & Clinical Notes Workspace
* **Doctor Rx Generator**: Verified doctors can issue structured digital prescriptions (Diagnosis, Prescribed Dosage, Special Instructions) directly from their dashboard.
* **Patient History & PDF Export**: Patients can view their complete prescription history and print or save formatted digital clinical notes as PDF.

### 💳 CarePoints Financial Ecosystem & Doctor Payouts
* **Credit Subscription Plans**: Credit packages (Basic, Value, Family) for patient consultations.
* **Atomic Payout Reservation**: Doctors can request payouts for accumulated credits ($8/credit net earnings). Payout requests reserve credits atomically upon creation to prevent double-payout exploits.

### 🔒 Multi-Role Dashboards & Admin Console
* **Patient Console**: Symptom checker, doctor directory, upcoming/past appointment tabs, and prescription downloads.
* **Doctor Console**: Schedule availability slot settings, upcoming/past consultations, prescription issuer, and earnings overview.
* **Admin Verification Console**: Doctor credential document review, verification approval/rejection, and payout request processing.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Usage |
| :--- | :--- | :--- |
| **Frontend** | React 19, Next.js 15, Tailwind CSS v4, Shadcn UI | Responsive glassmorphic UI, tabs, dialogs, and toast notifications |
| **Backend Framework**| Next.js App Router, Server Actions | Server-side execution, cached data revalidation, and API handlers |
| **Database** | PostgreSQL (Neon Serverless), Prisma ORM v6.8.2 | Atomic transactions, relational schema modeling, and migrations |
| **Authentication** | Clerk Auth (`@clerk/nextjs`) | Role-based authentication (PATIENT, DOCTOR, ADMIN), session claims |
| **AI Integration** | Google Gemini API (1.5 Flash) | Natural language symptom analysis and specialty categorization |
| **Video Engine** | Vonage Video SDK + Browser WebRTC | Telemedicine video sessions and local WebRTC camera fallback |
| **Validation & State**| Zod, Date-fns, Sonner, Lucide Icons | Input sanitization, date manipulation, and interactive feedback |

---

## ⚙️ Quick Start (Local Setup)

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher
* **PostgreSQL Database:** Neon Serverless or local Postgres instance

---

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/SivansRawat/Cure-Connect.git
cd Cure-Connect

# Install project dependencies
npm install
```

---

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory (refer to [`.env.example`](.env.example)):

```env
# Database Connection (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-sample.aws.neon.tech/CureConnect?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Google Gemini AI (Symptom Triage)
GEMINI_API_KEY="your-gemini-api-key"

# Vonage Video API (Optional - WebRTC Fallback active if omitted)
NEXT_PUBLIC_VONAGE_APPLICATION_ID="your-vonage-app-id"
VONAGE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

---

### Step 3: Run Database Migrations & Prisma Sync

```bash
# Push Prisma schema to database and generate client
npx prisma db push
```

---

### Step 4: Launch Development Server

```bash
npm run dev
# App launches at: http://localhost:3000
```

---

## 🔍 Verification & System Testing

You can verify that the system is fully operational using command line checks:

### 1. Verify ESLint & Syntax Integrity
```bash
npx next lint
```

### 2. Verify Database Schema & Prisma Client
```bash
npx prisma status
```

### 3. Verify Optimized Production Build
```bash
npm run build
```

---

## 📂 Project Structure Map

```
Cure-Connect/
├── actions/                   # Next.js Server Actions
│   ├── ai.js                  # Gemini AI symptom analysis & specialty matching
│   ├── appointments.js        # Atomic booking & video token generation
│   ├── credits.js             # CarePoints credit allocation & balance management
│   ├── doctor.js              # Doctor availability slots & appointment operations
│   ├── onboarding.js          # Role assignment & credential submission
│   ├── patient.js             # Patient appointment retrieval (Upcoming vs Past)
│   ├── payout.js              # Doctor payout requests with atomic credit reservation
│   ├── prescriptions.js       # Digital prescription generation & retrieval
│   └── admin.js               # Admin doctor verification & payout approval
│
├── app/                       # Next.js 15 App Router
│   ├── (main)/
│   │   ├── admin/             # Admin Console (Doctor verifications & payouts)
│   │   ├── appointments/      # Patient Appointments (Upcoming & Past Tabs)
│   │   ├── doctor/            # Doctor Dashboard (Slots, Appointments, Earnings)
│   │   ├── doctors/           # Doctor Directory & Booking Modal
│   │   ├── onboarding/        # Role selection & profile completion
│   │   ├── pricing/           # Consultation Packages & CarePoints
│   │   └── video-call/        # Telemedicine Video Consultation Room
│   ├── layout.js              # Root Layout, Fonts, and Theme Providers
│   └── page.js                # Landing Page & AI Symptom Checker Widget
│
├── components/                # Reusable UI Component Library
│   ├── ai-symptom-checker.jsx # Interactive AI Health Assistant Card
│   ├── prescription-modal.jsx # Digital Prescription Generator & Print View
│   ├── appointment-card.jsx   # Appointment Card with Status Badges & Actions
│   ├── header.jsx             # Top Navigation Header with Role Badges
│   └── pricing.jsx            # Consultation Packages Cards
│
├── lib/
│   ├── checkUser.js           # Clerk user synchronization & name sanitization
│   └── prisma.js              # Prisma Client singleton configuration
│
├── prisma/
│   ├── schema.prisma          # Database schema (User, Appointment, Prescription, Payout)
│   └── migrations/            # Migration SQL history
│
├── public/                    # Static Assets (Logos, Banner Images)
├── .env.example               # Environment Variables Template
├── package.json               # Node dependencies and scripts
└── README.md                  # System Documentation
```

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

<p align="center">Made with 💗 for modern digital healthcare</p>