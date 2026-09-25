# Praman (प्रमाण) — AI-Powered Intelligent Assistant for Indian Standards & BIS Services
### Smart India Hackathon (SIH 2024) — Expo React Native Implementation

> **Praman** is built with **Expo (React Native) + TypeScript + Expo Router**, faithfully implementing both the visual structure from the reference layout (Bento cards, floating pill tabs, search/rules grid, profile) and the complete backend multi-agent architecture described in the official solution document.

---

## 🎨 Design System & Theme

- **Theme:** Clean Light Theme
- **Color Identity:**
  - Primary CTA & Hero: **Deep Indigo (`#312E81`)**
  - Verified / Trust: **Teal (`#0D9488`)**
  - Mandatory QCO / Alerts: **Amber (`#D97706`)**
  - Neutral Base: **Off-White (`#FAFAFA`)** with crisp white cards (`#FFFFFF`)

---

## 🧠 Solution Document Architecture Implemented in Code

1. **Proprietary Multi-Agent Orchestration (Zero LangChain/LangGraph):**
   - Reflected in `app/(tabs)/ask.tsx` through simulated sequential pipelines:
     `Query Analyzer → Router → Parallel Retrieval → Composer → Judge Layer → Clarifier/Escalator`
2. **Parallel Tiered Retrieval:**
   - Tier 1: Local Knowledge Base (BIS Gazettes, DPIIT QCOs, Scheme manuals)
   - Tier 2: QCO Knowledge Graph (Product description → IS Number → Mandatory/Voluntary → Scheme)
   - Tier 3: Lab Directory (NABL accredited & BIS recognized facilities with geo-proximity)
   - Tier 4: Vision-Language Model (VLM) for product/hallmark photos
3. **Judge Layer (Verification & Groundedness Engine):**
   - Each answer computes and renders an explicit **Confidence / Grounding Score** (e.g. `98% Grounded`) based on citation coverage and claim-to-evidence validation.
4. **Clarifier Agent:**
   - When an ambiguous query like *"How to get ISI mark?"* is received without a product, Praman renders an **inline quick-reply chip set**: *"Which product does your MSME manufacture?"*
5. **Agentic Action Cards (Mini-Map & Lab Directory):**
   - When a testing lab query is asked, Praman embeds an interactive **Lab Action Card** with facility distance, test scope (e.g. Helmets IS 4151), and a direct **"Open in Google Maps"** action.
6. **VLM Hallmark & Product Inspection:**
   - Tap the **Camera icon** to simulate photo inspection. Outputs a 3-point checklist:
     - `✓ BIS Standard Triangle Mark detected`
     - `✓ Purity Fineness Grade (22K916) verified`
     - `⚠️ 6-digit HUID code note`
     - Footer: *"Assistive only. We assist, BIS authenticates — confirm via BIS Care app."*
7. **Version-Aware Citations & Related Standards Panel:**
   - Every claim is cited with its standard AND amendment year: `IS 4151:2015 · Amd 2021`.
   - Displays a structured **Related Standards Panel** (e.g. test methods `IS 16993` & `IS 2925`).
8. **Global Multi-Lingual Architecture (10 Indian Languages):**
   - Horizontal pill bar with active blue selection and checkmark: English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, മലയാളം, मराठी, বাংলা, ଓଡ଼ିଆ, ગુજરાતી.
   - Global context sync across all screens, tab titles, and headers.
9. **Praman AI Slide Bar Drawer:**
   - Full slide bar drawer to manage chat sessions with Rename, Delete, and Pin/Unpin actions.
10. **Top-Right Settings Access:**
   - Ubiquitous settings button accessible across every screen in the application.

---

## 📁 Screen Route Mapping

| File Path | Reference Image | Features |
|---|---|---|
| `app/(tabs)/index.tsx` | **Dashboard** | Context card, QCO Alert, Bento Grid, Today's Brief news feed, Top-Right Settings button, Multilingual Pill Bar. |
| `app/(tabs)/ask.tsx` | **Praman AI** | Slide bar drawer for chat session management (Rename/Delete/Pin), Multilingual Pill Bar, Top-Right Settings button, citations, and NABL testing protocols. |
| `app/(tabs)/standards.tsx` | **Standards** | Standards & QCO search input, jurisdiction switcher, 8 technical divisions, Multilingual Pill Bar, Top-Right Settings button. |
| `app/(tabs)/services.tsx` | **Services** | Official BIS programmes and schemes, target eligibility, portal links, Top-Right Settings button, Multilingual Pill Bar. |
| `app/(tabs)/map.tsx` | **NABL Labs** | Directory of BIS-recognized & NABL-accredited laboratories with test scopes, Google Maps links, Top-Right Settings button, Multilingual Pill Bar. |
| `app/(tabs)/profile.tsx` | **Enterprise** | Enterprise Credentials, BIS Officer details, Surveillance audits, Top-Right Settings button, Multilingual Pill Bar. |
| `app/vault/index.tsx` | **Document Vault** | Upload drop zone, OCR extracted fields, license numbers, validity, Top-Right Settings button, Multilingual Pill Bar. |
| `app/settings/index.tsx` | **Settings** | Complete app dialect configuration (10 Indian languages), push notification preferences, DPDP compliance. |

---

## 🚀 How to Run in Expo

```bash
cd C:\Users\ELCOT\.gemini\antigravity-ide\scratch\praman-expo
npx expo start --web
```
Or simply double-click `run.bat` in the project root!
