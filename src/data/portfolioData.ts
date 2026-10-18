import { getAssetPath } from "@/lib/utils";

export interface ProjectGalleryItem {
  src: string;
  title: string;
  caption: string;
  tag?: string;
}

export interface ProjectVideoItem {
  src: string;
  title: string;
  description: string;
}

export interface ProjectDocTable {
  headers: string[];
  rows: string[][];
}

export interface ProjectDocSection {
  title: string;
  description?: string;
  table?: ProjectDocTable;
  codeBlock?: {
    language: string;
    code: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  badge: string;
  status: "Completed" | "In Development" | "Concept / Planned" | "Prototype";
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery?: ProjectGalleryItem[];
  videos?: ProjectVideoItem[];
  docs?: ProjectDocSection[];
  repoUrl?: string;
  demoUrl?: string;
  hardware: string[];
  software: string[];
  features: string[];
  architectureDiagram?: string;
  technicalNotes?: string[];
}

export interface SkillItem {
  name: string;
  level: "Proficient" | "Working Knowledge" | "Exploring";
  description: string;
  tags?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  skills: SkillItem[];
}

export interface TimelineEntry {
  id: string;
  type: "Hackathon" | "Exhibition" | "Competition" | "Paper Presentation" | "Workshop" | "Education" | "Internship";
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  verified: boolean;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Bharath Suresh",
    headline: "Engineering Intelligence Into Reality.",
    tagline: "Electrical & Electronics Engineering Student × AI, IoT & Robotics",
    bio: "I'm Bharath Suresh, an Electrical and Electronics Engineering student passionate about Artificial Intelligence, IoT, Robotics, and Embedded Systems. I enjoy exploring how microcontrollers, sensors, electrical systems, and local AI models can work together to create practical intelligent solutions. My interests span electrical automation, hardware-software integration, AI agents, and robotics. I aim to build technology that connects intelligent software with the physical world.",
    email: "bharath.eee.engineer@gmail.com",
    github: "https://github.com/bharath-eee",
    linkedin: "https://www.linkedin.com/in/bharath-s-b22842329/",
    location: "Tamil Nadu, India",
    education: {
      degree: "B.E. in Electrical and Electronics Engineering",
      institution: "V.S.B Engineering College", // Editable
      expectedGraduation: "2027",
      cgpa: "Editable upon semester verification"
    },
    roles: [
      "Electrical & Electronics Engineer",
      "AI & IoT Developer",
      "Robotics & Automation Enthusiast",
      "Embedded Systems Builder"
    ]
  },

  aboutCards: [
    {
      id: "ee",
      title: "Electrical Engineering",
      icon: "Zap",
      color: "from-blue-600/15 to-slate-700/15",
      accent: "#38BDF8",
      description: "Power systems, electrical machines, power electronics, sensor instrumentation, and industrial automation architectures.",
      keyTopics: ["Circuit Analysis", "Electrical Machines", "Power Electronics", "Grid Protection", "High Voltage Safety"]
    },
    {
      id: "ai",
      title: "Artificial Intelligence",
      icon: "Brain",
      color: "from-indigo-600/15 to-slate-700/15",
      accent: "#818CF8",
      description: "Local LLMs, AI agents, RAG pipelines, prompt engineering, and edge intelligence bridging code with hardware.",
      keyTopics: ["Local LLM Integration", "LM Studio & Ollama", "Retrieval-Augmented Generation", "Autonomous AI Agents", "TinyML"]
    },
    {
      id: "iot-robotics",
      title: "Embedded Systems & Robotics",
      icon: "Cpu",
      color: "from-slate-700/15 to-blue-600/15",
      accent: "#60A5FA",
      description: "Microcontrollers, wireless telemetry, sensor interfacing, servo kinematics, and real-time physical control.",
      keyTopics: ["ESP8266 & ESP32", "Arduino Architectures", "Sensor Interfacing (PZEM, ACS)", "GSM / Cloud APIs", "Servo Kinematics"]
    }
  ],

  skillCategories: [
    {
      id: "programming",
      name: "Programming",
      icon: "Code2",
      tagline: "Core engineering logic and algorithm development",
      skills: [
        { name: "C", level: "Proficient", description: "Low-level memory management and hardware register interfacing." },
        { name: "Basic C++", level: "Working Knowledge", description: "Object-oriented firmware design and embedded classes." },
        { name: "Arduino Programming", level: "Proficient", description: "Hardware abstraction, timing loops, and sensor library integrations." },
        { name: "Python", level: "Working Knowledge", description: "AI agent development, Flask REST APIs, and data analysis." }
      ]
    },
    {
      id: "embedded",
      name: "Embedded Hardware",
      icon: "Cpu",
      tagline: "Microcontrollers, modules, and physical electronics",
      skills: [
        { name: "Arduino UNO", level: "Proficient", description: "Prototyping, GPIO control, ADC conversion, and interrupt handling." },
        { name: "ESP8266", level: "Proficient", description: "Wi-Fi IoT connectivity, web server hosting, SPIFFS flash filesystem." },
        { name: "ESP32", level: "Working Knowledge", description: "Dual-core processing, BLE, and edge machine learning." },
        { name: "GSM Module (SIM800L)", level: "Proficient", description: "AT command scripting, cellular SMS triggers, and remote telemetry." },
        { name: "PZEM-004T v3.0", level: "Proficient", description: "High-voltage AC sensing (Voltage, Current, Power, Energy, PF, Hz)." },
        { name: "Servo Motors", level: "Working Knowledge", description: "PWM signal modulation, angular positioning, and mechanical actuation." },
        { name: "Sensor Interfacing", level: "Proficient", description: "I2C, SPI, UART, and analog transducers (LCD, ACS712, ultrasonic, relays)." }
      ]
    },
    {
      id: "ai-systems",
      name: "AI & Intelligent Systems",
      icon: "BrainCircuit",
      tagline: "Bridging neural cognition with physical interfaces",
      skills: [
        { name: "Local LLM Integration", level: "Working Knowledge", description: "Deploying quantized open-weights models offline on local compute." },
        { name: "LM Studio", level: "Working Knowledge", description: "Local model experimentation, OpenAI-compatible local endpoints, and prompt tuning." },
        { name: "Retrieval-Augmented Generation", level: "Working Knowledge", description: "Vector context retrieval, document grounding, and hallucination reduction." },
        { name: "AI Agents", level: "Exploring", description: "Autonomous task planning, tool execution, and browser/system automation loops." },
        { name: "Natural-Language Hardware Control", level: "Exploring", description: "Parsing spoken or written natural instructions into deterministic microcontroller actuation." }
      ]
    },
    {
      id: "electrical",
      name: "Electrical Engineering",
      icon: "Zap",
      tagline: "Fundamental power, machine, and circuit theory",
      skills: [
        { name: "Circuit Analysis", level: "Proficient", description: "Kirchhoff's laws, mesh/nodal analysis, and transient response calculations." },
        { name: "Electrical Machines", level: "Working Knowledge", description: "Transformers, induction motors, synchronous machines, and DC motor characteristics." },
        { name: "Power Systems", level: "Working Knowledge", description: "Generation, transmission line modeling, and grid stability fundamentals." },
        { name: "Power Electronics", level: "Working Knowledge", description: "Inverters, converters, rectifiers, and semiconductor switching dynamics." }
      ]
    },
    {
      id: "tools",
      name: "Development Tools",
      icon: "Wrench",
      tagline: "Software suites and engineering workflows",
      skills: [
        { name: "Arduino IDE", level: "Proficient", description: "Firmware flashing, serial plotting, library management, and board configuration." },
        { name: "Visual Studio Code", level: "Proficient", description: "Primary IDE for full-stack, embedded C/C++, and AI development." },
        { name: "Git", level: "Proficient", description: "Version control, branching strategies, and commit history management." },
        { name: "GitHub", level: "Proficient", description: "Open source collaboration, repository management, and project releases." },
        { name: "AutoCAD Electrical", level: "Working Knowledge", description: "Electrical schematics drafting, circuit diagrams, and panel layout design." }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "smart-ev-charging",
      title: "Smart EV Charging Station & IoT Energy Meter",
      category: "Electrical Engineering / IoT",
      badge: "Real Hardware Build",
      status: "Completed",
      shortDescription: "An IoT-enabled EV charging station designed for remote monitoring, charging control, energy measurement, and cellular GSM communication.",
      fullDescription: "A complete end-to-end electrical and IoT telemetry system that continuously monitors 6 critical AC parameters (Voltage, Current, Power, Energy accumulator, Frequency, and Power Factor) using an ESP8266 NodeMCU and PZEM-004T v3.0 sensor. Features cellular GSM alerts via SIM800L/900, low power-factor visual alarm, local 16x2 I2C LCD interface, and a remote cloud MySQL/Flask backend with web telemetry dashboard.",
      image: getAssetPath("/images/projects/meter_hardware_demo.png"),
      repoUrl: "https://github.com/bharath-eee/Energy_Meter",
      demoUrl: "https://energydata.netlify.app",
      hardware: ["ESP8266 NodeMCU", "PZEM-004T v3.0 AC Sensor (80-260V / 100A)", "SIM800L / SIM900 GSM Module", "16x2 I2C LCD (0x27)", "Push-button cycle switch", "Low PF Alert LED (GPIO15)"],
      software: ["Embedded C++ (Arduino)", "Flask (Python REST API)", "MySQL Database (Clever Cloud)", "SPIFFS Non-Volatile Flash", "HTML5 Telemetry Table (Netlify)"],
      features: [
        "Real-time AC electrical parameter tracking (230V mains, current up to 100A, power in W, energy in Wh, frequency in Hz, PF)",
        "Automatic Low Power Factor alert LED triggers when PF drops below 0.90 to flag reactive losses",
        "Two-way SMS communication: responds to 'GET' message with energy total and triggers accumulator reset",
        "SPIFFS non-volatile flash logging preserves meter state across power interruptions",
        "Cloud REST API synchronization for billing and energy consumption history"
      ],
      gallery: [
        {
          src: getAssetPath("/images/projects/meter_hardware_demo.png"),
          title: "Physical Bench Hardware Prototype",
          caption: "Live hardware bench setup featuring ESP8266 NodeMCU, PZEM-004T current coil, GSM SIM800L module, and 16x2 I2C LCD readout."
        },
        {
          src: getAssetPath("/images/projects/ev_charging_station.jpg"),
          title: "EV Charging Station & Power Telemetry Hub",
          caption: "Dual AC parameter monitoring station concept with real-time cloud data pipeline."
        }
      ],
      videos: [
        {
          src: "/videos/projects/meter_full_hardware_run.mp4",
          title: "Full Hardware Bench Demonstration",
          description: "Complete hardware bench run showing live AC mains load measurement, PZEM-004T current sensing, and LCD status."
        },
        {
          src: "/videos/projects/meter_lcd_telemetry.mp4",
          title: "16x2 LCD Real-Time Telemetry Cycle",
          description: "Demonstrating on-screen parameter cycling (Voltage, Current, Power, Energy, Power Factor) via the push button."
        },
        {
          src: "/videos/projects/meter_current_sensing.mp4",
          title: "AC Current & Active Power Sensing Test",
          description: "Bench testing current sensor coil response under dynamic electrical load fluctuations."
        },
        {
          src: "/videos/projects/meter_gsm_sms_alert.mp4",
          title: "GSM SIM800L Cellular Two-Way SMS Alert",
          description: "Cellular SMS query response ('GET' command) and automated power consumption SMS delivery."
        }
      ],
      docs: [
        {
          title: "Hardware Pinout & Interfacing Matrix",
          table: {
            headers: ["Component", "Interface", "Microcontroller Pin", "Function Description"],
            rows: [
              ["PZEM-004T v3.0", "SoftwareSerial", "D5 (GPIO14) RX, D6 (GPIO12) TX", "High-precision AC voltage, current & power sensing"],
              ["GSM Module (SIM800L)", "SoftwareSerial", "D1 (GPIO5) RX, D2 (GPIO4) TX", "Cellular 2G AT commands & two-way SMS delivery"],
              ["16x2 LCD Display", "I2C Bus (0x27)", "D4 (GPIO2) SDA, D3 (GPIO0) SCL", "Visual parameter readout & charging state messages"],
              ["Parameter Toggle Button", "Digital GPIO", "D7 (GPIO13) INPUT_PULLUP", "Cycles through V, I, P, Wh, Hz, PF readouts"],
              ["Low PF Alert Indicator", "Digital GPIO", "D8 (GPIO15) OUTPUT", "Active HIGH LED indicator when Power Factor < 0.90"]
            ]
          }
        },
        {
          title: "Backend REST API & SMS Webhook Endpoints",
          table: {
            headers: ["Route", "HTTP Method", "Payload Format", "Operational Role"],
            rows: [
              ["/sms", "POST", "voltage=230.5&current=1.2&power=276.6...", "GSM SMS webhook parsing & MySQL insertion"],
              ["/get_data", "GET", "None", "Returns full chronological telemetry JSON to frontend"],
              ["/add_data", "POST", "JSON {voltage, current, power, pf}", "Manual or API-level reading insertion"]
            ]
          }
        },
        {
          title: "16x2 LCD Display State Machine",
          table: {
            headers: ["Display Message", "System State", "Behavior"],
            rows: [
              ["WELCOME TO CHARGING STATION", "System Idle", "Displayed on system startup & boot calibration"],
              ["SLOW CHARGING", "Trickle Mode", "Triggered when current detection is below nominal baseline"],
              ["CHARGE WITH ACCOUNT", "Authorization", "Prompts user identification before relay latching"],
              ["CHARGING...", "Active Delivery", "Continuously updates live wattage and accumulator"],
              ["THANK YOU", "Session Complete", "Disengages relay and dispatches final SMS invoice"]
            ]
          }
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                       HARDWARE LAYER                        │
│                                                             │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────┐  │
│  │ PZEM-004T    │───▶│ ESP8266       │───▶│ 16x2 I2C LCD │  │
│  │ (AC Sensor)  │    │ NodeMCU       │    │ Display      │  │
│  └──────────────┘    │               │    └──────────────┘  │
│                      │               │    ┌──────────────┐  │
│  ┌──────────────┐    │               │───▶│ GSM SIM800L  │  │
│  │ Push Button  │───▶│               │    │ Module (SMS) │  │
│  └──────────────┘    │               │    └──────────────┘  │
│                      │               │    ┌──────────────┐  │
│  ┌──────────────┐    │               │───▶│ Low PF Alert │  │
│  │ SPIFFS Flash │◀──▶│               │    │ LED          │  │
│  └──────────────┘    └───────┬───────┘    └──────────────┘  │
└──────────────────────────────┼──────────────────────────────┘
                               │ GSM SMS / HTTP API
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND & CLOUD PLATFORM                    │
│                                                             │
│       ┌───────────────────┐        ┌───────────────────┐    │
│       │ Flask Python API  │───────▶│ MySQL Database    │    │
│       │ (POST/GET routes) │        │ (Clever Cloud)    │    │
│       └─────────┬─────────┘        └───────────────────┘    │
│                 │                                           │
│                 ▼                                           │
│       ┌───────────────────┐                                 │
│       │ Customer & Admin  │                                 │
│       │ Web Dashboard     │                                 │
│       └───────────────────┘                                 │
└─────────────────────────────────────────────────────────────┘`,
      technicalNotes: [
        "Firmware utilizes SoftwareSerial for non-blocking communication with both PZEM-004T and SIM800L modules.",
        "AC measurement accuracy calibrated with reference digital multimeter.",
        "Tested under various inductive and resistive loads to verify power factor degradation thresholds."
      ]
    },
    {
      id: "lifepilot-ai",
      title: "LifePilot AI",
      category: "AI Agents / Full-Stack Automation",
      badge: "FastAPI + Vite + MongoDB",
      status: "Completed",
      shortDescription: "An intelligent personal automation assistant and scheduling manager designed to organize objectives and automate scheduling from emails, calendar events, and bill invoices.",
      fullDescription: "LifePilot AI is a production-grade full-stack personal automation architecture. It orchestrates local and cloud-based LLMs via OpenRouter to process emails, calendar events, and bill invoices, converting unstructured text into structured task schemas and automated desktop notifications. Built with FastAPI on the backend, React (TypeScript) with Vite on the frontend, and MongoDB persistence with Docker Compose deployment.",
      image: getAssetPath("/images/projects/lifepilot_ai.jpg"),
      repoUrl: "https://github.com/bharath-eee/lifepilot-ai",
      hardware: ["Local GPU Workstation / Docker Host", "Google OAuth API Gateway", "OpenRouter AI Gateway"],
      software: ["FastAPI (Python 3.10+)", "React 19 + TypeScript + Vite", "Motor (Async MongoDB Driver)", "OpenRouter AI Gateway", "Tailwind CSS", "Docker Compose"],
      features: [
        "Full-stack microservices architecture containerized with Docker Compose",
        "Multimodal invoice parsing utilizing Google Gemini 2.5 Flash for OCR and extraction",
        "Natural language chat command processing orchestrated via DeepSeek Chat",
        "Google Calendar and Gmail OAuth authentication for automated meeting scheduling",
        "Persistent MongoDB database schemas for users, tasks, and recurring bill reminders"
      ],
      gallery: [
        {
          src: getAssetPath("/images/projects/lifepilot_ai.jpg"),
          title: "LifePilot AI Command Architecture",
          caption: "Full-stack personal automation assistant combining FastAPI backend and React frontend."
        }
      ],
      docs: [
        {
          title: "Microservices & Container Ports",
          table: {
            headers: ["Service", "Port", "Technology Stack", "Operational Role"],
            rows: [
              ["Frontend UI", "5173", "React (TypeScript) + Vite", "Interactive task management & calendar dashboard"],
              ["Backend API", "8000", "FastAPI + Motor + Uvicorn", "Async REST routes & AI model orchestration"],
              ["Database", "27017", "MongoDB", "Persistent collections for users, tasks, and bills"],
              ["AI Gateway", "Cloud", "OpenRouter API", "Gemini 2.5 Flash (OCR/Vision) + DeepSeek Chat"]
            ]
          }
        },
        {
          title: "Docker Compose Deployment",
          codeBlock: {
            language: "bash",
            code: `# Deploy all services (Frontend, Backend, MongoDB) in one command:
docker-compose up --build -d

# Stop deployment and tear down containers:
docker-compose down`
          }
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                     │
│               React + Vite Frontend (Port 5173)             │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / WebSocket REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND CORE                     │
│               Uvicorn Async Server (Port 8000)              │
│                                                             │
│   ┌─────────────────────┐       ┌──────────────────────┐    │
│   │ Google OAuth 2.0    │──────▶│ Task & Bill Engine   │    │
│   │ (Gmail & Calendar)  │       │ (Motor MongoDB Async)│    │
│   └─────────────────────┘       └──────────┬───────────┘    │
│              ▲                             │                │
│              │ Context                     ▼                │
│   ┌──────────┴──────────┐       ┌──────────────────────┐    │
│   │ OpenRouter Gateway  │       │ MongoDB Database     │    │
│   │ (DeepSeek + Gemini) │       │ (Port 27017)         │    │
│   └─────────────────────┘       └──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘`,
      technicalNotes: [
        "Employs structured JSON schema output forcing to guarantee safe tool execution.",
        "Evaluated with local quantized models to ensure sub-second latency on consumer hardware."
      ]
    },
    {
      id: "robotic-arm-ai",
      title: "AZORE: LLM & Vision Controlled Robotic Arm",
      category: "Robotics / Multimodal AI",
      badge: "Voice, Vision & ESP8266 Build",
      status: "Completed",
      shortDescription: "A voice, vision, and LLM-controlled 6-DOF robotic arm featuring real-time polar radar object tracking, background difference masking, and inverse kinematics.",
      fullDescription: "AZORE is an advanced robotic manipulation platform that bridges multimodal AI with physical actuation. The system combines an overhead computer vision feed with background subtraction difference masking and polar angle tracking, a custom desktop command center HUD with 'Hey Azore' voice recognition, a 3-link inverse kinematics solver, and an ESP8266 Wi-Fi microcontroller driving 6 multi-axis servo joints.",
      image: getAssetPath("/images/projects/real_arm_hardware_1.jpg"),
      repoUrl: "https://github.com/bharath-eee/Robotic-Arm-by-LLM",
      hardware: [
        "ESP8266 NodeMCU Wi-Fi Microcontroller",
        "3D-Printed 6-DOF Articulated Blue PLA Arm",
        "Base Continuous Rotation (CR) Servo (D1/GPIO5)",
        "Shoulder Servo 0°-180° (D2/GPIO4)",
        "Elbow Servo 0°-180° (D5/GPIO14)",
        "Wrist Pitch Servo 0°-180° (D6/GPIO12)",
        "Wrist Roll Servo 0°-180° (D7/GPIO13)",
        "Gear-Driven Gripper Servo 0°-90° (D8/GPIO15)",
        "Overhead High-Res Camera / DroidCam Stream"
      ],
      software: [
        "Google Gemini Multimodal AI Vision API",
        "SpeechRecognition ('Hey Azore' Wake Word)",
        "OpenCV (Contour Tracking & Background Difference Mask)",
        "Planar 3-Link Inverse Kinematics (Python & JS Solvers)",
        "ESP8266 Wi-Fi REST HTTP Server (C++)",
        "Three.js 3D Interactive Browser Visualizer"
      ],
      features: [
        "Multimodal Gemini AI Vision: Camera Frame → Gemini Vision API → {row, col, action} → IK → Servos",
        "Hands-Free Voice Execution: 'Hey Azore' wake word parses compound commands ('move front 5 cm, up 20 cm, rotate 45 degree, close gripper')",
        "Computer Vision Tracking: Real-time difference mask background subtraction with polar rays (0°–180°)",
        "Planar 3-link inverse kinematics solver calculating joint angles across shoulder, elbow, and wrist in real time",
        "Embedded ESP8266 HTTP REST API (/control, /preset, /ik) supporting web dashboard and serial COM3 control"
      ],
      gallery: [
        {
          src: getAssetPath("/images/projects/real_arm_hardware_1.jpg"),
          title: "Physical 3D-Printed Articulated Arm & ESP8266",
          caption: "High-contrast product shot of the real 3D-printed blue PLA 6-DOF arm gripping an ESP8266 NodeMCU microcontroller."
        },
        {
          src: getAssetPath("/images/projects/real_robotic_arm_bench.jpg"),
          title: "Hardware Bench & Kinematic Calibration",
          caption: "Live lab bench setup showing calibrated link segment dimensions (7.5cm base, 16cm lower arm, 16cm upper arm, 11cm gripper) and laptop control interface."
        },
        {
          src: getAssetPath("/images/projects/real_arm_hardware_3.jpg"),
          title: "Overhead CV Polar Radar Tracking",
          caption: "Computer vision polar radar tracking real objects: Loupe at 118°, Power Drill at 79°, and base manipulator target vectors."
        },
        {
          src: getAssetPath("/images/projects/arm_aruco_calibration_output.png"),
          title: "OpenCV ArUco Marker Calibration & Vector Ray",
          caption: "Accurate physical workspace mapping: 22.6 cm distance, 101° angle, and 26.0 cm object target vector."
        },
        {
          src: getAssetPath("/images/projects/azore_command_center.png"),
          title: "AZORE Robotic Command Center Desktop HUD",
          caption: "Custom desktop interface with voice trigger ('Hey Azore'), scanning radar, and COM3 hardware serial connectivity."
        },
        {
          src: getAssetPath("/images/projects/robotic_arm_radar_cv.png"),
          title: "CV Difference Mask & Angular Rays",
          caption: "Real-time background subtraction difference mask targeting objects at 104°, 68°, and 50°."
        },
        {
          src: getAssetPath("/images/projects/robotic_arm_overhead.png"),
          title: "Top-Down Workspace Calibration",
          caption: "Overhead camera calibration with green 90° reference meridian and 180° radial coordinate sweep area."
        },
        {
          src: getAssetPath("/images/projects/arm_sim_3d_visualizer.png"),
          title: "Three.js 3D Kinematics Visualizer",
          caption: "Interactive 3D simulation solving inverse kinematics and reachable workspace envelope in real-time."
        }
      ],
      docs: [
        {
          title: "ESP8266 Joint Pinout & Motion Limits",
          table: {
            headers: ["Joint", "ESP8266 GPIO Pin", "Wire Color", "Motion Range / Spec"],
            rows: [
              ["Base (CR)", "D1 (GPIO5)", "Red", "Continuous Rotation (Speed & Direction)"],
              ["Shoulder", "D2 (GPIO4)", "Standard", "0° to 180° Angular Elevation"],
              ["Elbow", "D5 (GPIO14)", "Violet", "0° to 180° Angular Flexion"],
              ["Wrist Pitch", "D6 (GPIO12)", "Blue", "0° to 180° Pitch Adjustment"],
              ["Wrist Roll", "D7 (GPIO13)", "Yellow", "0° to 180° Axial Rotation"],
              ["Gripper", "D8 (GPIO15)", "Green", "0° (Fully Closed) to 90° (Fully Open)"]
            ]
          }
        },
        {
          title: "Planar Inverse Kinematics Dimensions",
          table: {
            headers: ["Link Segment", "Measurement", "Kinematic Designation"],
            rows: [
              ["Floor to Shoulder Base", "9.3 cm", "Ground clearance datum"],
              ["Upper Arm (Shoulder → Elbow)", "12.0 cm", "Primary elevation arm link (L1)"],
              ["Forearm (Elbow → Wrist)", "11.5 cm", "Secondary extension link (L2)"],
              ["Wrist to Gripper Midpoint", "10.0 cm", "End-effector reach vector (L3)"]
            ]
          }
        },
        {
          title: "ESP8266 HTTP REST Endpoints",
          table: {
            headers: ["Endpoint", "Example Query", "Action Description"],
            rows: [
              ["GET /", "http://<ARM_IP>/", "Serves Web Dashboard with manual sliders & status"],
              ["GET /control", "/control?servo=shoulder&value=90", "Sets specific servo angle or base rotation speed"],
              ["GET /preset", "/preset?p=3", "Executes programmed pick-and-place sequence (P1–P10)"],
              ["GET /ik", "/ik?x=15.00&y=5.00", "Dispatches on-board Cartesian inverse kinematics"]
            ]
          }
        },
        {
          title: "Python Multimodal & Voice Execution Commands",
          codeBlock: {
            language: "bash",
            code: `# 1. Run Gemini AI Multimodal Vision Pick-and-Place:
python final_gemini.py

# 2. Run Hands-Free Voice Control ("Hey Azore"):
python final_arm.py

# 3. Run Real-Time CV Object Tracking with Polar Radar:
python detect.py --target nearest --arm-host 192.168.137.241 --auto-execute`
          }
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                     MULTIMODAL SENSING                      │
│   Webcam Overhead Grid Feed     │     Microphone Voice      │
│   (OpenCV Difference Mask)      │     ('Hey Azore' Wake)    │
└──────────────┬──────────────────┴──────────────┬────────────┘
               │                                 │
               ▼                                 ▼
┌─────────────────────────────────┐   ┌───────────────────────┐
│ Gemini Vision Multimodal Model  │   │ SpeechRecognition LLM │
│ {row, col, target classification}│   │ Compound Intent Parser│
└──────────────┬──────────────────┘   └──────────┬────────────┘
               │                                 │
               └────────────────┬────────────────┘
                                │ Cartesian Target (X, Y, Z)
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 INVERSE KINEMATICS SOLVER                   │
│   Calculates θ1 (Base), θ2 (Shoulder), θ3 (Elbow), θ4 (Wrist)│
└──────────────────────────────┬──────────────────────────────┘
                               │ Wi-Fi HTTP GET / Serial COM3
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 ESP8266 NODEMCU FIRMWARE                    │
│   Non-blocking PWM Servo Timers (D1, D2, D5, D6, D7, D8)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                6-DOF 3D PRINTED ROBOTIC ARM                 │
│   Continuous Base | Shoulder | Elbow | Wrist | Gripper      │
└─────────────────────────────────────────────────────────────┘`,
      technicalNotes: [
        "Tested with pixel-to-cm ArUco calibration factor (0.05875 cm/pixel).",
        "Includes Three.js browser visualizer (arm.html) with interactive 3D inverse kinematics solver.",
        "Smooth sinusoidal acceleration profiles implemented to minimize servo gear backlash."
      ]
    },
    {
      id: "eload-classifier",
      title: "E-Load Classifier",
      category: "Electrical Engineering / TinyML",
      badge: "Research / Concept",
      status: "Concept / Planned",
      shortDescription: "An intelligent electrical load classification concept designed to identify appliances using transient current waveforms and embedded machine learning.",
      fullDescription: "A Non-Intrusive Load Monitoring (NILM) architecture combining high-speed electrical sensor sampling with embedded TinyML neural networks on an ESP32. By sampling current and voltage transient waveforms through an ACS712 sensor and performing Fast Fourier Transforms (FFT), the system extracts frequency harmonic signatures to identify appliances like Fans, Bulbs, Motors, and Iron boxes.",
      image: getAssetPath("/images/projects/eload_classifier.jpg"),
      hardware: ["ESP32 Dual-Core MCU", "ACS712 Current Sensor (20A/30A)", "ZMPT101B Voltage Sensor", "OLED Status Display"],
      software: ["TinyML / TensorFlow Lite Micro", "Edge Impulse Studio", "Embedded C++", "Fast Fourier Transform (FFT)"],
      features: [
        "High-frequency analog sampling capturing inrush current transients and steady-state harmonics",
        "On-chip Fast Fourier Transform (FFT) spectral extraction on ESP32",
        "Quantized neural network model running with minimal RAM footprint (<30KB)",
        "Classification of typical household electrical loads: Fan, Bulb, Motor, Iron box",
        "Real-time power quality and energy breakdown without needing individual smart plugs"
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                      AC MAINS LINE                          │
│                           │                                 │
│              ┌────────────┴────────────┐                    │
│              ▼                         ▼                    │
│      ┌───────────────┐         ┌───────────────┐            │
│      │ ACS712 Sensor │         │ ZMPT101B      │            │
│      │ (Current)     │         │ (Voltage)     │            │
│      └───────┬───────┘         └───────┬───────┘            │
└──────────────┼─────────────────────────┼────────────────────┘
               │ Analog ADC              │
               ▼                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    ESP32 EMBEDDED TINYML                    │
│                                                             │
│       ┌───────────────────────────────────────────────┐     │
│       │ Fast Fourier Transform (FFT) Analysis         │     │
│       │ Harmonic magnitude & Phase angle extraction   │     │
│       └───────────────────────┬───────────────────────┘     │
│                               │                             │
│                               ▼                             │
│       ┌───────────────────────────────────────────────┐     │
│       │ Quantized TFLite Micro Neural Network         │     │
│       │ (Inference execution <15ms)                   │     │
│       └───────────────────────┬───────────────────────┘     │
└───────────────────────────────┼─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 CLASSIFICATION OUTPUT (OLED)                │
│       [✓] INDUCTION FAN (94% conf) | [✓] INCANDESCENT BULB  │
│       [✓] MOTOR RUNNING            | [✓] HEATING IRON       │
└─────────────────────────────────────────────────────────────┘`,
      technicalNotes: [
        "Leverages odd and even harmonic signatures to distinguish resistive heating elements from inductive motor loads.",
        "Architecture designed for edge autonomy without cloud dependency."
      ]
    },
    {
      id: "my-first-rag",
      title: "Enterprise RAG Intelligence",
      category: "Artificial Intelligence",
      badge: "Live Demo",
      status: "Completed",
      shortDescription: "Retrieval-Augmented Generation chatbot system deployed with contextual embeddings and document retrieval.",
      fullDescription: "A working RAG system built to explore document ground-truth retrieval, vector similarity matching, and conversational question-answering. Features dynamic knowledge ingestion and interactive query answering.",
      image: getAssetPath("/images/projects/lifepilot_ai.jpg"),
      repoUrl: "https://github.com/bharath-eee/my_first_rag",
      demoUrl: "https://bharath-eee.github.io/my_first_rag/",
      hardware: ["Cloud Compute"],
      software: ["Python", "Vector Embeddings", "RAG Pipeline", "FastAPI / GitHub Pages"],
      features: [
        "Live interactive web deployment on GitHub Pages",
        "Document ingestion and chunking pipeline",
        "Semantic similarity retrieval grounding model answers in factual data"
      ]
    },
    {
      id: "esp8266-switching",
      title: "IoT AC Switching Node",
      category: "IoT / Embedded Systems",
      badge: "Real Hardware Build",
      status: "Completed",
      shortDescription: "WiFi-controlled electrical switching and relay actuation firmware for automated power management.",
      fullDescription: "Embedded firmware for ESP8266 facilitating wireless control over high-voltage AC relays. Features local web server control, persistent state storage, and instant remote switching.",
      image: getAssetPath("/images/projects/meter_hardware_demo.png"),
      repoUrl: "https://github.com/bharath-eee/esp8266_switching",
      hardware: ["ESP8266", "Relay Module", "Optocoupler Isolation", "AC Power Supply"],
      software: ["C++", "ESP8266WebServer", "HTML5 Interface"],
      features: [
        "Isolated AC relay control protecting low-voltage microcontroller logic",
        "Embedded responsive web dashboard served directly from ESP8266",
        "Zero cloud latency for local industrial automation"
      ]
    },
    {
      id: "indic-nlp-translator",
      title: "IndicNLP: English-to-Tamil Neural Translator",
      category: "Artificial Intelligence / NLP",
      badge: "HuggingFace & PyTorch",
      status: "Completed",
      shortDescription: "An end-to-end neural machine translation system and dataset processing pipeline converting English text into Tamil using Seq2Seq transformer architectures.",
      fullDescription: "IndicNLP leverages Hugging Face's transformers and fine-tuned sequence-to-sequence language models (suriya7/English-to-Tamil) along with the gopi30 bilingual corpus to perform high-accuracy neural translation. Features interactive command-line translation loops, automated dataset ingestion with pandas DataFrame exports, and an automated electrical engineering MCQ examination generator.",
      image: getAssetPath("/images/projects/indic_nlp_terminal.jpg"),
      repoUrl: "https://github.com/bharath-eee/english-tamil-neural-translator",
      hardware: ["Local CUDA GPU / CPU Compute", "Hugging Face Model Hub", "PyTorch Execution Engine"],
      software: ["PyTorch", "HuggingFace Transformers", "Seq2Seq Model (suriya7)", "HuggingFace Datasets (gopi30)", "Pandas", "Python-Docx"],
      features: [
        "Sequence-to-Sequence neural machine translation from English to Tamil",
        "Bilingual corpus ingestion from Hugging Face Datasets with automated CSV export",
        "Interactive command-line translation interface with beam search decoding",
        "Automated 215+ Electric Circuit Analysis question bank generation for engineering placements",
        "Zero hardcoded API secrets with environment variable integration (.env)"
      ],
      gallery: [
        {
          src: getAssetPath("/images/projects/indic_nlp_terminal.jpg"),
          title: "HuggingFace Seq2Seq Neural Translation & Loss Monitor",
          caption: "Live inference environment translating English sentences to authentic Tamil script with PyTorch and bilingual loss curve telemetry."
        }
      ],
      docs: [
        {
          title: "Model Checkpoint & Dataset Specifications",
          table: {
            headers: ["Component", "Source Identifier", "Type", "Operational Role"],
            rows: [
              ["Neural Model", "suriya7/English-to-Tamil", "AutoModelForSeq2SeqLM", "Encoder-decoder translation architecture"],
              ["Tokenizer", "suriya7/English-to-Tamil", "AutoTokenizer", "Subword tokenization & tensor formatting"],
              ["Bilingual Dataset", "gopi30/english-tamil", "HuggingFace Dataset", "Paired English-Tamil training corpus"],
              ["MCQ Question Bank", "pdf.py", "python-docx Generator", "215+ Electric circuit analysis MCQs"]
            ]
          }
        },
        {
          title: "CLI Translation Commands",
          codeBlock: {
            language: "bash",
            code: `# Run interactive CLI translation:
python run_model.py

# Download and export bilingual dataset:
python download_dataset.py
python CsvCon.py

# Generate Circuit Analysis MCQ question bank:
python pdf.py`
          }
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                       INPUT PIPELINE                        │
│               English Text Prompt  /  CLI Query             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    TOKENIZATION & TENSORS                   │
│   AutoTokenizer (suriya7/English-to-Tamil)                  │
│   Subword BPE token IDs + Attention Masks                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 SEQ2SEQ TRANSFORMER CORE                    │
│   AutoModelForSeq2SeqLM (Encoder-Decoder Architecture)      │
│   Multi-Head Cross-Attention & Beam Search Decoding         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     GENERATED OUTPUT                        │
│   Tamil Text Translation  /  UTF-8 Decoded String           │
└─────────────────────────────────────────────────────────────┘`,
      technicalNotes: [
        "Inference optimized for both CPU and CUDA-accelerated hardware.",
        "Secure environment variable token management protects HuggingFace user credentials."
      ]
    }
  ] as Project[],

  journeyTimeline: [
    {
      id: "j-edu",
      type: "Education",
      title: "B.E. in Electrical and Electronics Engineering",
      organization: "V.S.B Engineering College",
      period: "2023 - 2027 (Present)",
      description: "Pursuing rigorous coursework covering Power Electronics, Circuit Analysis, Digital Systems, and Microcontrollers. Conducting independent research into AI-hardware integration.",
      highlights: [
        "Hands-on electrical laboratory training with power machines and test instrumentation",
        "Specialized self-study in TinyML, local LLMs, and embedded IoT architectures",
        "Active member of robotics and technical innovation forums"
      ],
      verified: true
    },
    {
      id: "j-ev-project",
      type: "Exhibition",
      title: "IoT Smart Energy Meter & EV Charging Station Demonstration",
      organization: "Department Project Exhibition",
      period: "2025",
      description: "Built and demonstrated a working hardware prototype of an IoT-enabled charging meter with real-time AC telemetry, low-PF visual alarms, and two-way GSM cellular SMS control.",
      highlights: [
        "Successfully tracked live 230V AC load parameters with high accuracy",
        "Integrated dual-serial firmware coordinating PZEM sensor and GSM module",
        "Demonstrated cloud database synchronization and web dashboard"
      ],
      verified: true
    },
    {
      id: "j-ai-rag",
      type: "Competition",
      title: "RAG & AI Agent Engineering Exploration",
      organization: "AI Hackathons & Self-Directed Research",
      period: "2025",
      description: "Developed and deployed Retrieval-Augmented Generation systems and explored autonomous local AI agents for desktop and hardware orchestration.",
      highlights: [
        "Built and deployed live RAG chatbot system on GitHub",
        "Experimented with local LLMs (Llama 3, Mistral) running on LM Studio",
        "Architected natural-language to serial command pipelines for robotic actuators"
      ],
      verified: true
    },
    {
      id: "j-embedded-workshop",
      type: "Workshop",
      title: "Hands-on Microcontrollers & Sensor Interfacing Workshop",
      organization: "Technical Symposium",
      period: "2024",
      description: "Participated in hands-on workshops focusing on advanced sensor interfacing (I2C, SPI, UART), PWM motor control, and IoT protocol optimization.",
      highlights: [
        "Interfaced analog and digital transducers with Arduino and ESP boards",
        "Engineered interrupt-driven firmware routines for timing-critical tasks",
        "Collaborated on embedded automation challenge sprints"
      ],
      verified: true
    }
  ] as TimelineEntry[],

  intelligencePipeline: [
    {
      step: 1,
      id: "sensor-input",
      title: "SENSOR INPUT",
      subtitle: "Physical Transduction",
      icon: "Activity",
      color: "#38BDF8",
      description: "Continuous real-time sensing of physical world metrics (AC Voltage, Current via ACS712/PZEM, optical sensors, motor encoders).",
      telemetry: "230.4 V | 16.2 A | 50.02 Hz"
    },
    {
      step: 2,
      id: "signal-processing",
      title: "SIGNAL PROCESSING",
      subtitle: "Embedded DSP & Feature Extraction",
      icon: "Cpu",
      color: "#60A5FA",
      description: "ESP32/ESP8266 executes ADC conversion, digital filtering, and Fast Fourier Transform (FFT) harmonic feature extraction.",
      telemetry: "THD: 4.8% | PF: 0.96 | 50Hz Peak"
    },
    {
      step: 3,
      id: "ai-inference",
      title: "AI INFERENCE",
      subtitle: "Neural Vector & LLM Reasoning",
      icon: "Brain",
      color: "#818CF8",
      description: "TinyML quantized neural net or local LLM agent interprets spectral features or natural command intent to decide optimal action.",
      telemetry: "Class: MOTOR_INDUCTIVE | Conf: 96.2%"
    },
    {
      step: 4,
      id: "hardware-action",
      title: "HARDWARE ACTION",
      subtitle: "Deterministic Physical Actuation",
      icon: "Zap",
      color: "#34D399",
      description: "Actuates physical servos, toggles high-power relays, triggers cellular GSM alerts, or modulates PWM charging duty cycles.",
      telemetry: "Relay: CLOSED | PWM: 84% | Status: OK"
    }
  ]
};
