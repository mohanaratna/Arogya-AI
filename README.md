# 🏥 SwasthyaSaathi (స్వాస్థ్యసార్థి / स्वास्थ्यसाथी)
> **Production-Style Multilingual AI Health Guidance & Doctor-Connect Platform**

SwasthyaSaathi is an accessible, human-centered public health companion designed for low-income and middle-income populations who face barriers visiting hospitals, waiting long hours, deciphering complex medical jargon, or communicating in English.

---

## ⚠️ Medical Safety Disclaimer
> **This platform provides general health guidance and does not replace a qualified medical professional or emergency medical care.**

SwasthyaSaathi does **NOT** diagnose medical diseases or prescribe medication. All triage outputs, symptom classifications, and visual screening results are decision-support tools meant to empower patients to seek appropriate professional care.

---

## 🌟 Key Features

1. **Multilingual AI Voice Assistant (Prompt 3)**
   - Native support for **5 Indian languages**: English, Telugu (తెలుగు), Hindi (हिंदी), Tamil (தமிழ்), Kannada (కನ್ನಡ).
   - Real-time Speech-to-Text (`SpeechRecognition`) and Text-to-Speech synthesis (`SpeechSynthesis`).
   - Follow-up clarifying wizard for age, duration, severity (1-10 scale), and chronic conditions.

2. **Rule-Based Red-Flag Safety Triage (Prompt 4)**
   - Rule-based emergency detection layer before normal AI classification.
   - Immediate override for red flags (chest pain, shortness of breath, seizures, stroke signs).
   - 3-tier severity classification: **Mild (Green)**, **Moderate (Yellow)**, **Urgent (Red)**.
   - Structured recommendation cards with precautions, things to avoid, and specialist routing.

3. **Health Photo Visual Screening (Prompt 5)**
   - Camera integration (`getUserMedia`) and image file upload.
   - Automated image quality check (lighting, blur).
   - Visual screening for skin rashes, eczema, fungal reactions, and minor wounds with confidence scores.
   - Privacy-first option to prevent permanent image storage on servers.

4. **Verified Health Library & Medicine Encyclopedia (Prompt 6)**
   - Health articles covering common illnesses, chronic conditions, and emergency signs.
   - Attributed to **ICMR, WHO, MoHFW India, and Ayushman Bharat (AB-HWC)** sources.
   - Generic Medicine Encyclopedia detailing purpose, dosage warnings, and interactions (Non-prescription educational guide).

5. **Doctor Discovery & Appointment System (Prompt 7)**
   - Directory of verified doctors across specialties (General Physician, Pediatrics, Dermatology, AYUSH, ENT).
   - Filter by specialty, spoken language, consultation mode (Video, Clinic, Phone), and fee range.
   - Interactive appointment slot picker and confirmation workflow.

6. **Multilingual Doctor Video Consultation with Live Translation (Prompt 8)**
   - HD WebRTC video call simulator with mic, camera, and waiting room queue.
   - **Real-time Live Dual Subtitle Translation**: Automatically translates doctor's speech to patient's native language and patient's speech to doctor's language.

7. **Secure Auth & Session Management (Prompt 2 & 9)**
   - Email OTP & Mobile OTP verification flows (Demo code: `123456`).
   - Interactive reCAPTCHA security widget ("I am not a robot").
   - Personalized Patient Dashboard & Health History timeline with single-click delete.
   - Persistent **108 / 112 Emergency Banner** and fullscreen emergency protocol modal.

8. **Accessibility & Low Bandwidth Design (Prompt 1)**
   - **Low-Bandwidth Mode (Lite Mode)**: Removes heavy assets for 2G/3G connectivity.
   - **High-Contrast Mode**: Enhanced visibility for low vision users.
   - Large touch controls, simple language, and high-contrast typography.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, JavaScript (ES2024), Vite 8
- **Styling**: Vanilla CSS Variables, Tailwind CSS v4, Glassmorphism
- **Icons**: Lucide React
- **Voice Engine**: Web Speech API (`webkitSpeechRecognition`, `window.speechSynthesis`)
- **Video & Media**: WebRTC (`getUserMedia`), HTML5 Canvas
- **State & i18n**: React Context API (`LanguageContext`, `AuthContext`, `HealthContext`)

---

## 📁 Scalable Architecture

```
src/
├── assets/             # Brand logos and assets
├── context/
│   ├── AuthContext.jsx      # Authentication & Session state
│   ├── LanguageContext.jsx  # i18n dictionary & language switching
│   └── HealthContext.jsx    # Health timeline, appointments, emergency triggers
├── data/
│   ├── doctorsData.js       # Doctor directory database
│   ├── healthKnowledge.js   # ICMR/WHO health articles & medicine encyclopedia
│   └── symptomRules.js      # Clinical triage matrix & red-flag engine
├── i18n/
│   └── translations.js      # Multilingual translations (en, te, hi, ta, kn)
├── components/
│   ├── Navbar.jsx           # Top header navigation & controls
│   ├── Footer.jsx           # Accessible footer with helplines & source citations
│   ├── EmergencyBanner.jsx  # Sticky top emergency callout bar
│   ├── EmergencyModal.jsx   # Fullscreen 108/112 emergency modal
│   ├── CaptchaComponent.jsx # "I'm not a robot" security check
│   └── DisclaimerBadge.jsx  # Reusable safety disclaimer
└── views/
    ├── HomeView.jsx         # Homepage
    ├── AuthView.jsx         # Registration, Login, OTP & Password
    ├── VoiceAssistantView.jsx# Multilingual AI Voice Assistant
    ├── SymptomChecker.jsx   # AI Symptom Triage System
    ├── PhotoAnalysisView.jsx# Health Photo Screening
    ├── HealthInfoView.jsx   # Verified Knowledge Base & Medicine Info
    ├── DoctorDiscoveryView.jsx# Find Doctors & Book Slots
    ├── VideoConsultationView.jsx# Live Translation Video Call
    ├── DashboardView.jsx    # Personalized Patient Dashboard
    └── ProfileView.jsx      # Profile settings & emergency contacts
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1. **Clone or navigate to project directory**:
   ```bash
   cd healthAI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 🔌 API Integrations & Production Roadmap

For full production deployment with live cloud APIs:

| Feature | Production API Endpoint | Environment Variable |
|---|---|---|
| AI Speech-to-Text | Google Cloud Speech-to-Text API | `VITE_GOOGLE_STT_API_KEY` |
| AI Text-to-Speech | ElevenLabs / Azure Speech | `VITE_TTS_API_KEY` |
| LLM Triage Engine | Med-PaLM 2 / Gemini Pro Health | `VITE_GEMINI_HEALTH_API_KEY` |
| Derm Photo Classifier | TensorFlow.js / Custom ResNet-50 | `VITE_PHOTO_MODEL_URL` |
| Video Consultations | Daily.co / Twilio Video WebRTC | `VITE_TWILIO_VIDEO_TOKEN` |
| SMS & Email OTP | Twilio SMS / AWS SES | `VITE_OTP_SERVICE_URL` |

---

## 📄 License & Safety
Built for public health accessibility and educational demonstration. Attributed to ICMR, WHO, and MoHFW India guidelines.
