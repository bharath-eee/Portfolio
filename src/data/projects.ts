import { getAssetPath } from "@/lib/utils";

export type ProjectStatus = "Shipped" | "In Development" | "Editable" | "Concept / Planned";

export type ProjectGalleryItem = {
  src: string;
  title: string;
  caption?: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image?: string;
  gallery?: ProjectGalleryItem[];
  features?: string[];
  focus?: string[];
  components?: string[];
  exampleLoads?: string[];
  technology: string[];
  status: ProjectStatus;
  githubUrl?: string;
  demoUrl?: string;
  architecture: {
    layers: { label: string; detail: string }[];
  };
};

export const projects: Project[] = [
  {
    id: "smart-ev-charging",
    index: "01",
    title: "Smart EV Charging Station & IoT Energy Meter",
    category: "Electrical Engineering / IoT",
    image: getAssetPath("/images/projects/meter_hardware_demo.png"),
    summary:
      "An IoT-enabled EV charging station developed for energy monitoring, remote communication, and charging session management.",
    description:
      "A complete end-to-end electrical and IoT telemetry system that continuously monitors 6 critical AC parameters (Voltage, Current, Power, Energy accumulator, Frequency, and Power Factor) using an ESP8266 NodeMCU and PZEM-004T v3.0 sensor. Features cellular GSM alerts via SIM800L, low power-factor visual alarm, local 16x2 I2C LCD interface, and a remote cloud MySQL/Flask backend with web telemetry dashboard.",
    features: [
      "ESP8266-based monitoring and control with SPIFFS non-volatile flash logging",
      "PZEM-004T AC high-precision electrical parameter measurement (80-260V / 100A)",
      "SIM800L cellular GSM SMS query responses and automated billing notifications",
      "Automatic Low Power Factor alert indicator when PF drops below 0.90",
      "Customer and administrator web dashboard on Netlify with live session monitoring",
    ],
    technology: ["ESP8266", "PZEM-004T", "SIM800L GSM", "Flask API", "MySQL", "C++"],
    status: "Shipped",
    githubUrl: "https://github.com/bharath-eee/Energy_Meter",
    demoUrl: "https://energydata.netlify.app",
    gallery: [
      {
        src: getAssetPath("/images/projects/meter_hardware_demo.png"),
        title: "Physical Bench Hardware Prototype",
        caption: "Live hardware bench setup featuring ESP8266 NodeMCU, PZEM-004T current coil, GSM SIM800L module, and 16x2 I2C LCD readout.",
      },
      {
        src: getAssetPath("/images/projects/ev_charging_station.jpg"),
        title: "EV Charging Station & Power Telemetry Hub",
        caption: "Dual AC parameter monitoring station concept with real-time cloud data pipeline.",
      },
    ],
    architecture: {
      layers: [
        { label: "Sensing", detail: "PZEM-004T reads AC voltage, current, active power, energy, frequency & PF." },
        { label: "Control", detail: "ESP8266 manages charging enable/disable relay, I2C LCD, and reads sensor data." },
        { label: "Communication", detail: "SIM800L GSM module sends two-way SMS alerts and accepts remote commands." },
        { label: "Cloud & Web", detail: "Flask backend stores session history in MySQL and serves live Netlify telemetry dashboard." },
      ],
    },
  },
  {
    id: "llm-robotic-arm",
    index: "02",
    title: "AZORE: LLM & Vision Controlled Robotic Arm",
    category: "Robotics / Multimodal AI",
    image: getAssetPath("/images/projects/real_arm_hardware_1.jpg"),
    summary:
      "A voice, vision, and LLM-controlled 6-DOF robotic arm featuring real-time polar radar object tracking, background difference masking, and inverse kinematics.",
    description:
      "AZORE is an advanced robotic manipulation platform that bridges multimodal AI with physical actuation. The system combines an overhead computer vision feed with background subtraction difference masking and polar angle tracking, a custom desktop command center HUD with 'Hey Azore' voice recognition, a 3-link inverse kinematics solver, and an ESP8266 Wi-Fi microcontroller driving 6 multi-axis servo joints.",
    features: [
      "Multimodal Gemini AI Vision: Camera Frame → Vision Analysis → IK target pose → 6-DOF Servos",
      "Hands-Free Voice Execution: 'Hey Azore' wake word parses compound natural language spatial commands",
      "Computer Vision Tracking: Real-time difference mask background subtraction with polar radar (0°–180°)",
      "Planar 3-link inverse kinematics solver calculating joint angles across shoulder, elbow, and wrist in real time",
      "Embedded ESP8266 Wi-Fi HTTP REST API (/control, /preset, /ik) supporting web and serial COM control",
    ],
    technology: ["ESP8266", "Inverse Kinematics", "OpenCV", "Gemini Vision AI", "Speech Recognition", "Python", "3D Printing"],
    status: "Shipped",
    githubUrl: "https://github.com/bharath-eee/Robotic-Arm-by-LLM",
    gallery: [
      {
        src: getAssetPath("/images/projects/real_arm_hardware_1.jpg"),
        title: "Physical 3D-Printed Articulated Arm & ESP8266",
        caption: "Product shot of the real 3D-printed blue PLA 6-DOF articulated arm gripping an ESP8266 microcontroller.",
      },
      {
        src: getAssetPath("/images/projects/real_arm_hardware_2.jpg"),
        title: "Multi-Axis Servo Actuators & Wiring",
        caption: "Close-up of base continuous rotation servo, shoulder/elbow high-torque servos, and gripper assembly.",
      },
      {
        src: getAssetPath("/images/projects/real_robotic_arm_bench.jpg"),
        title: "Hardware Bench & Workspace",
        caption: "Bench setup with serial debug console, Wi-Fi communication, and calibration grid.",
      },
      {
        src: getAssetPath("/images/projects/arm_sim_3d_visualizer.png"),
        title: "3D Inverse Kinematics Visualizer",
        caption: "Interactive 3D simulation mapping real-time Cartesian targets to joint angle solutions.",
      },
      {
        src: getAssetPath("/images/projects/robotic_arm_ai.jpg"),
        title: "AZORE Studio Vision Workspace",
        caption: "Studio concept displaying optical object detection and pick-and-place trajectories.",
      },
    ],
    architecture: {
      layers: [
        { label: "Instruction", detail: "Spoken voice ('Hey Azore') or text command interpreted by multimodal LLM." },
        { label: "Vision", detail: "Overhead camera stream with background subtraction and polar radar contour tracking." },
        { label: "Motion Planning", detail: "Planar 3-link inverse kinematics solver computes joint angles with safety limits." },
        { label: "Actuation", detail: "ESP8266 micro-controller outputs PWM signals driving 6 servo joints simultaneously." },
      ],
    },
  },
  {
    id: "lifepilot-ai",
    index: "03",
    title: "LifePilot AI",
    category: "AI Agents / Full-Stack Automation",
    image: getAssetPath("/images/projects/lifepilot_ai.jpg"),
    summary:
      "A full-stack personal automation assistant that processes invoices, emails, and calendar events into automated scheduling and task workflows.",
    description:
      "LifePilot AI is a production-grade full-stack personal automation architecture. It orchestrates local and cloud-based LLMs to process emails, calendar events, and bill invoices, converting unstructured text into structured task schemas and automated desktop notifications. Built with FastAPI on the backend, React (TypeScript) with Vite on the frontend, and MongoDB persistence with Docker Compose deployment.",
    features: [
      "Full-stack microservices containerized with Docker Compose (FastAPI + React Vite + MongoDB)",
      "Multimodal invoice parsing utilizing Google Gemini 2.5 Flash for OCR and extraction",
      "Natural language chat command processing orchestrated via DeepSeek Chat",
      "Google Calendar and Gmail OAuth authentication for automated meeting scheduling",
      "Persistent MongoDB database schemas for users, tasks, and recurring bill reminders",
    ],
    technology: ["FastAPI", "React 19", "TypeScript", "MongoDB", "Docker", "Tailwind CSS", "OpenRouter"],
    status: "Shipped",
    githubUrl: "https://github.com/bharath-eee/lifepilot-ai",
    gallery: [
      {
        src: getAssetPath("/images/projects/lifepilot_ai.jpg"),
        title: "LifePilot AI Command Architecture",
        caption: "Full-stack personal automation assistant combining FastAPI backend, React UI, and asynchronous worker queues.",
      },
    ],
    architecture: {
      layers: [
        { label: "Interface", detail: "React 19 + TypeScript frontend with reactive task boards and calendar views." },
        { label: "Backend Core", detail: "FastAPI async server orchestrating routes, OAuth tokens, and worker tasks." },
        { label: "Cognition", detail: "OpenRouter gateway utilizing DeepSeek Chat for intent and Gemini Flash for OCR vision." },
        { label: "Persistence", detail: "MongoDB database storing schemas for users, structured tasks, and recurring bills." },
      ],
    },
  },
  {
    id: "eload-classifier",
    index: "04",
    title: "E-Load Classifier",
    category: "Electrical Engineering / TinyML",
    image: getAssetPath("/images/projects/eload_classifier.jpg"),
    summary:
      "An embedded machine learning concept for classifying electrical appliances using current measurements.",
    description:
      "An embedded machine learning concept for classifying electrical appliances using current measurements. By training a lightweight model on current signatures, the system can identify which appliance is running on a shared circuit — useful for energy disaggregation and smart monitoring.",
    components: ["ESP32", "ACS712", "TinyML"],
    exampleLoads: ["Fan", "Bulb", "Motor", "Iron box"],
    features: [
      "High-speed AC/DC current waveform sampling using ACS712 Hall-effect sensor",
      "Time-domain and frequency-domain feature extraction on ESP32",
      "Lightweight on-device TinyML neural network inference for real-time disaggregation",
      "Identifies inductive vs resistive appliance signatures (motors, fans, heating elements)",
    ],
    technology: ["ESP32", "ACS712", "TinyML", "Edge ML", "Current Sensing"],
    status: "Concept / Planned",
    githubUrl: "https://github.com/bharath-eee",
    gallery: [
      {
        src: getAssetPath("/images/projects/eload_classifier.jpg"),
        title: "E-Load Disaggregation Prototype",
        caption: "ACS712 current transducer sampling electrical loads into ESP32 edge classifier.",
      },
    ],
    architecture: {
      layers: [
        { label: "Sensing", detail: "ACS712 Hall-effect current sensor measures AC/DC current waveforms." },
        { label: "Feature Extraction", detail: "ESP32 computes statistical RMS, peak, and harmonic features." },
        { label: "Inference", detail: "On-device TinyML classifier identifies the active appliance signature." },
        { label: "Output", detail: "Classification result is published to telemetry dashboard or triggers automated cutoffs." },
      ],
    },
  },
];
