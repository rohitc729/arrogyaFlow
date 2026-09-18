# AarogyaFlow AI (आरोग्यफ्लो एआई)
### India's PHC Health-Resource & Medicine Supply-Chain Management System

A production-quality, responsive web application and federated edge intelligence platform designed to monitor, forecast, and proactively redistribute health resources and life-saving medicines across Primary Health Centres (PHCs) in India.

---

## 🌟 Key Capabilities

1. **National Command Centre Geo-Grid**:
   - High-performance interactive Leaflet map rendering state, district, and PHC resource nodes.
   - Dynamic clay pin indicators:
     - 🟢 **Green**: Stable inventory (> 15 days buffer)
     - 🟠 **Amber**: Moderate risk / Low stock (4 - 7 days buffer)
     - 🔴 **Red**: Critical stock-out threat (≤ 3 days buffer, animated alarm)
     - 🔵 **Blue**: Active inter-facility redistribution in transit
   - 6 Live Top KPI summary cards with responsive layout.
   - 5 Dynamic Chart.js analytics:
     1. Daily Medicine Consumption Velocity (Line)
     2. Outpatient & Emergency Footfall Projection (Bar)
     3. Inpatient Bed Occupancy by Facility (Stacked Bar)
     4. Staff Availability by District: Doctors vs Nurses (Bar)
     5. Stock-Out Risk Distribution by Medicine Class (Doughnut)

2. **Granular PHC Detail & Inventory Management**:
   - Facility profile, emergency contact officer, Pincode, and embedded transit mini-map.
   - Real-time resource cards tracking count, safe minimum buffer, daily burn rate, estimated days remaining, and risk level for:
     - Medicine Inventory
     - Bed Availability (General, Oxygen, ICU)
     - Doctor Availability by Speciality (MBBS/General, Paediatrician, Gynaecologist, Emergency, Pharmacist)
     - Nursing Staff on Duty
     - Medical Oxygen Cylinders (Filled / Empty)
     - Diagnostic Kits (Rapid & PCR), IV Fluids, Blood Units, Ambulances
     - Daily Patient Footfall
   - Live searchable and filterable essential medicine inventory table.

3. **Gemini AI Edge Forecasting & Cross-District Redistribution**:
   - Configurable AI horizon forecasts (7, 15, and 30 days) powered by Google Gemini (free-tier compatible).
   - Structured JSON response schema validation.
   - Explainable clinical intelligence:
     - *Why is this risk predicted?*
     - *What clinical data signals caused it?*
     - *Recommended actions for Chief Medical Officers*
   - Automated Cross-District Redistribution Engine:
     - Computes surplus vs. deficit facilities
     - Recommends exact transfer quantities and units
     - Calculates road transit distance and urgency
     - Generates authorization waybills with one-click **"Approve Transfer"** and **"Contact Nearby PHCs"** actions.
   - Resilient Fallback: If the Gemini API key is missing or offline, seamlessly switches to an intelligent deterministic mathematical rule engine.

4. **Emergency Alert Centre & Rapid Dispatch**:
   - Urgent animated alarm modal with siren ring, pulse animation, and audible voice alerts.
   - Severity filters (Critical, Warning, Resolved) with one-click Acknowledge and Resolve workflows.
   - Simulated Multi-Channel Notification Broadcast (In-App, SMS, WhatsApp Health Bot, District NIC Email, State Intranet Portal).

5. **Authorised Facility Operational Portal**:
   - Mobile-first dashboard form for facility coordinators to update stocks, bed occupancy, doctor rosters, and footfall.
   - Bulk CSV upload parser with row-by-row validation and error feedback.
   - Downloadable standardized sample CSV template (`AarogyaFlow_Sample_Inventory.csv`).
   - Audit trail timeline logging timestamps, roles, and changes.
   - **Strict Zero-PII Policy**: Strictly no patient names, Aadhaar numbers, phone numbers, or individual medical records are ever captured.

6. **Federated Learning Architecture**:
   - Explains privacy-preserving machine learning where raw medical records remain local at PHCs and only differential privacy gradients (with Gaussian noise injection) are shared.
   - Real-time simulation of state node contributions (Bihar, UP, Maharashtra, Rajasthan) and global model synchronization.

7. **Multilingual i18n & Web Speech API**:
   - Full support for **English**, **Hindi (हिन्दी)**, and **Bhojpuri (भोजपुरी)**.
   - Instant language switching across all navigation, KPI cards, table headers, alerts, and explanations.
   - Multilingual Text-to-Speech (TTS) for critical emergency alerts.
   - Speech-to-Text voice query support for hands-free searching.

---

## 🎨 Design System: Premium Claymorphism

The UI strictly adheres to a tactile, modern **Claymorphism** aesthetic:
- **Background**: Soft, clinical pastel tones (`#edf3f8` / `#f8fafc`).
- **Text**: Deep navy text (`#0b1c2d` / `#071524`) delivering WCAG AAA accessible contrast.
- **Clay Cards**: Soft dual outer shadows combined with delicate inner bevel highlights:
  ```css
  box-shadow: 10px 10px 24px rgba(162, 178, 200, 0.38),
              -10px -10px 24px rgba(255, 255, 255, 0.95),
              inset 2px 2px 3px rgba(255, 255, 255, 0.9),
              inset -2px -2px 3px rgba(175, 192, 214, 0.25);
  border-radius: 26px;
  ```
- **Clay Buttons**: Raised tactile appearance with active inset depression on press.
- **Palette**: Medical Blue (`#1a6bbf`), Teal (`#0d9488`), Danger Coral (`#e11d48`), Amber (`#d97706`), Success Green (`#059669`), Lavender (`#6366f1`).

---

## 🔒 Security & Secrets Management

- **Zero Hardcoded Secrets**: The Gemini API key is never bundled into client JavaScript.
- All AI queries flow through a backend server proxy (`/api/forecast`) that accesses `process.env.GEMINI_API_KEY`.
- In development, Vite dev server middleware intercepts `/api/forecast` and `/api/datagov/status`.
- In production, `server.js` (Node/Express) handles API routing and static delivery.

---

## 🌐 data.gov.in Integration Guide

AarogyaFlow AI incorporates public health datasets from [data.gov.in](https://data.gov.in/):
1. **Rural Health Statistics (RHS)**: PHC infrastructure, sanctioned vs. in-position specialists, and facility amenities.
2. **National List of Essential Medicines (NLEM)**: Core drug classifications and standard dosage forms.

### Configuring Your API Key:
1. Register for an API key at [data.gov.in](https://data.gov.in/).
2. Add your key to `.env`:
   ```env
   DATA_GOV_IN_API_KEY=your_key_here
   ```
3. When the government gateway is unreachable, rate-limited, or undergoing maintenance, AarogyaFlow AI displays an explicit **"Data temporarily unavailable"** status badge and falls back to verified historical baseline data, ensuring continuity without spoofing live status.

---

## 🚀 Quickstart & Setup

### Prerequisites
- Node.js >= 18.0.0 (Tested on Node.js v24.18.0)
- npm >= 9.0.0

### Installation
```bash
cd aarogyaflow-ai
npm install
```

### Environment Setup
Create a `.env` file in the project root (see `.env.example`):
```env
# Optional: Google Gemini API Key from https://aistudio.google.com/
GEMINI_API_KEY=

# Gemini Model Identifier (free-tier default)
GEMINI_MODEL=gemini-1.5-flash

# Optional: Open Government Data Key from https://data.gov.in/
DATA_GOV_IN_API_KEY=

PORT=5173
```
*(If `GEMINI_API_KEY` is left blank, the app will automatically use the built-in deterministic mathematical forecasting engine).*

### Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Standalone Server
```bash
npm run build
npm start
```
The application will build optimized assets to `dist/` and start the Express server at [http://localhost:5173](http://localhost:5173).

---

## ⚖️ Disclaimer & Compliance Notice

- **Human-in-the-Loop Mandate**: All AI-generated supply forecasts and inter-facility transfer recommendations are advisory and require authorized human review (Chief Medical Officer / District Drug Warehouse) before physical dispatch.
- **Federated Learning Simulation**: The federated learning dashboard demonstrates the privacy-preserving edge architecture. Full nationwide deployment is subject to state-level IT governance and DPDP Act 2023 regulations.
