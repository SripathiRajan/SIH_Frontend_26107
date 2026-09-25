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
8. **Multi-Lingual & Tanglish / Hinglish:**
   - Toggle button for English, தமிழ், Tanglish, and हिन्दी in chat header. Includes pre-loaded Tanglish scenario.
9. **DPDP Act 2023 Privacy Panel:**
   - Prominently featured in `app/(tabs)/profile.tsx` — certifying zero training on proprietary manufacturing blueprints and automated data purge.

---

## 📁 Screen Route Mapping

| File Path | Reference Image | Features |
|---|---|---|
| `app/(tabs)/home.tsx` | **Image 1** | Dark Location/Context card (`Chennai · Tamil Nadu`), Red QCO Alert strip, 2×2 Bento Grid (`Ask Praman`, `QCO checker`, `Document vault`, `Find Testing Lab`), Today's Brief news feed. |
| `app/(tabs)/ask.tsx` | **Image 2** | Yellow trust banner, Assistant header, prompt chips, agentic map cards, VLM checklist, clarifier chips, voice mic button, Tanglish switcher. |
| `app/(tabs)/standards.tsx` | **Image 3** | Standards & QCO search input, Solid Deep Indigo button, result card, Geofence locked card, Offline warning alert, 2×2 category cards (`Speed & helmets`, `Safety gear`, `Electrical`, `Food & water`). |
| `app/(tabs)/map.tsx` | **Map Screen** | Directory of BIS-recognized & NABL-accredited laboratories with test scopes and Google Maps links. |
| `app/(tabs)/profile.tsx` | **Image 4** | User header card, `0 Open non-compliances` \| `3 Certificates in Vault` metrics row, menu list with Country/State, Document vault, DPDP Act 2023 panel. |
| `app/vault/index.tsx` | **Document Vault** | Upload drop zone, OCR extracted fields, license numbers, validity, and legal verification hash. |
| `app/(tabs)/history.tsx` | **History** | Chronological audit trail of past queries, application stepper, and verification receipts. |

---

## 🚀 How to Run in Expo

```bash
cd C:\Users\ELCOT\.gemini\antigravity-ide\scratch\praman-expo
npx expo start --web
```
Or simply double-click `run.bat` in the project root!
