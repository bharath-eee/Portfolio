# Bharath Suresh — Futuristic 3D Engineering & AI Portfolio

> **"Engineering Intelligence Into Reality."**  
> An award-quality personal portfolio website built for **Bharath Suresh**, an Electrical & Electronics Engineering student specializing in the intersection of **Artificial Intelligence, IoT, Robotics, Embedded Systems, and Intelligent Automation**.

---

## ⚡ Visual Design Direction: Neural Circuit / Dark Futurism

- **Core Palette**:
  - `Main Background`: `#05070D`
  - `Secondary Background`: `#0B1020`
  - `Surface Cards`: `#101827`
  - `Electric Cyan`: `#00E5FF`
  - `Neon Violet`: `#8B5CF6`
  - `Electric Blue`: `#2563EB`
  - `Text`: `#F8FAFC` (Primary), `#94A3B8` (Secondary)
- **Typography**:
  - Headings: `Space Grotesk`
  - Body: `Inter`
  - Technical Data & Code: `JetBrains Mono`

---

## 🚀 Key Features

1. **Cinematic Entrance Sequence**:
   - Cyberpunk system bootloader with diagnostic initialization tests and audio feedback (skippable, stored per session).
2. **Interactive 3D Neural Circuit (Hero Section)**:
   - Built with Three.js.
   - Dual-layer engineering visual: Floating circuit board with glowing PCB traces and electronic nodes connected to dynamic AI neural synaptic layers.
   - Smooth mouse parallax tilt, hover node highlights, and interactive central processor shockwave trigger on click.
3. **About Me**:
   - 3 glassmorphism cards detailing Electrical Engineering, Artificial Intelligence, and Embedded Systems & Robotics.
   - Academic timeline with configurable graduation year and university credentials.
4. **Interactive Technical Arsenal (5-Node System Map)**:
   - Futuristic orbital system map switching between:
     - `Programming` (C, C++, Arduino)
     - `Embedded Hardware` (ESP8266, ESP32, PZEM-004T, GSM, Raspberry Pi, Sensors)
     - `Artificial Intelligence` (Local LLMs, LM Studio, RAG, AI Agents, Hardware Control)
     - `Electrical Engineering` (Circuit Analysis, Power Systems, Machines, Control Systems)
     - `Development Tools` (VS Code, Arduino IDE, Git, GitHub, AutoCAD Electrical)
5. **Signature Feature: The Intelligence Core**:
   - 4-Stage visual execution pipeline demonstrating embedded AI hardware in action:
     - `01. SENSOR INPUT` → `02. SIGNAL PROCESSING` → `03. AI INFERENCE` → `04. HARDWARE ACTION`
   - Real-time telemetry inspector, stage selector, and one-click execution loop with audio cues.
6. **Featured Engineering Builds (Real Repositories Linked)**:
   - **Smart EV Charging Station & Energy Meter**: ESP8266, PZEM-004T, GSM SIM800L, 16x2 LCD, Flask & MySQL (Linked to real repo: `bharath-eee/Energy_Meter`).
   - **LifePilot AI**: Desktop automation assistant with local LLM orchestration and workflow agents.
   - **LLM-Controlled Robotic Arm**: Natural language command interpretation with 6-axis servo kinematics.
   - **E-Load Classifier (TinyML)**: Non-intrusive appliance classification via ACS712 current harmonics on ESP32.
   - Full technical specification modal with ASCII architecture diagrams, pinout guides, and hardware breakdown.
7. **Engineering Journey Timeline**:
   - Vertical neon circuit timeline categorized into Hackathons, Competitions, Exhibitions, Workshops, and Education.
8. **Futuristic Contact Terminal**:
   - Direct interactive terminal with real mail dispatch (`mailto:`), clipboard quick-copy, and setup guides for Formspree / EmailJS.
9. **Interactive Resume Modal**:
   - Live formatted resume viewer with print/download functionality and drop-in support for `public/Bharath_Suresh_Resume.pdf`.
10. **Web Audio Synthesizer**:
    - Pure browser-native Web Audio API sound generator (blips, pulses, shockwaves) with a persistent mute toggle in the navigation bar.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Dark Futurism design tokens
- **3D Graphics**: Three.js
- **Icons**: Lucide React + custom vector SVGs
- **Audio**: Web Audio API (zero external audio files needed)
- **SEO**: Dynamic Open Graph metadata, Sitemap (`/sitemap.xml`), and Robots (`/robots.txt`)

---

## 💻 Running Locally

To run the portfolio on your local machine:

```powershell
# 1. Open the project directory
cd C:\Users\Bharath\Documents\portfolio

# 2. Start the development server
npm run dev

# 3. Or test the production build
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Customization & Personalization

All personal details, project specs, links, and journey entries are stored in a single, well-documented file:

👉 `src/data/portfolioData.ts`

### Adding Your Official Resume PDF:
1. Export your resume as a PDF file.
2. Name it `Bharath_Suresh_Resume.pdf`.
3. Drop it into the `public/` folder (`public/Bharath_Suresh_Resume.pdf`).
4. The **Download Resume** button in the Hero section and Resume Modal will automatically serve this PDF file!

### Contact Form Backend Integration:
The contact terminal currently dispatches through standard `mailto:` protocol and provides instant email copying. To connect a serverless delivery service like **Formspree** or **EmailJS**:
1. Sign up for a free account at [Formspree](https://formspree.io).
2. Create a new form endpoint.
3. In `src/components/ContactSection.tsx`, replace the `handleSubmit` handler with a standard `fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: ... })`.

---

## 🌐 Deployment to Production

### Option A: Vercel (Recommended — Free & 1-Click)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Futuristic 3D Portfolio for Bharath Suresh"
   git remote add origin https://github.com/bharath-eee/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Next.js settings will be auto-detected. Click **Deploy**.

---

© Bharath Suresh. Built with Next.js, Three.js & Tailwind CSS.
