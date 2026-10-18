// Single source of truth for personal/portfolio information.
// Edit values here to update the entire site.

export const personal = {
  name: "Bharath Suresh",
  shortName: "BS.",
  initials: "BS",
  role: "Electrical & Electronics Engineering Student",
  tagline: "Electrical Engineering meets Artificial Intelligence.",
  helloLabel: "HELLO, I'M",
  heroIntro:
    "I'm an Electrical and Electronics Engineering student exploring how AI, IoT, embedded systems, and robotics can work together to build intelligent solutions for real-world problems.",
  interests: ["AI & Automation", "Embedded Systems", "Robotics"],
  aboutHeading: "Connecting Hardware, Software, and Intelligence.",
  aboutBody: [
    "I'm Bharath Suresh, an Electrical and Electronics Engineering student with interests in Artificial Intelligence, IoT, Robotics, and Embedded Systems.",
    "I enjoy developing and exploring practical solutions involving microcontrollers, sensors, electrical monitoring, local language models, and intelligent automation.",
    "My career goal is to contribute to both core electrical engineering and AI-driven technology development.",
  ],
  contactHeading: "Let's Work Together.",
  contactBody:
    "I'm interested in opportunities involving electrical engineering, embedded systems, AI, IoT, and robotics.",
  emailPlaceholder: "bharath.eee.engineer@gmail.com",
  email: "bharath.eee.engineer@gmail.com",
  location: "Tamil Nadu, India",
  resumeNote:
    "Resume PDF will be available here once uploaded. The download button is wired and ready.",
  socials: {
    github: {
      label: "GitHub",
      url: "https://github.com/bharath-eee",
      handle: "@bharath-eee",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/bharath-s-b22842329/",
      handle: "in/bharath-s",
    },
  },
} as const;

export const focusAreas = [
  {
    id: "electrical",
    title: "Electrical Engineering",
    description:
      "Electrical machines, power systems, power electronics, and automation.",
    icon: "Zap",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Local LLMs, RAG, AI agents, and intelligent workflows.",
    icon: "BrainCircuit",
  },
  {
    id: "embedded",
    title: "Embedded Systems & Robotics",
    description:
      "Microcontrollers, sensors, communication modules, and motor control.",
    icon: "Cpu",
  },
] as const;

// Editable education section — placeholder details left blank on purpose.
export const education = [
  {
    id: "ug",
    degree: "B.E. — Electrical and Electronics Engineering",
    institution: "V.S.B Engineering College",
    period: "2023 – 2027 (Expected)",
    notes: "Specialization areas: Power systems, Embedded systems, AI",
  },
] as const;

// Editable journey timeline. Mark `verified: false` for placeholders.
export type TimelineEntry = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: "Hackathon" | "Exhibition" | "Paper" | "Event" | "Workshop" | "Internship";
  verified: boolean;
  certificateUrl?: string;
  externalUrl?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "ev-charging-exhibition",
    title: "Smart EV Charging Station — Project Exhibition",
    organization: "College Technical Symposium",
    date: "Editable date",
    description:
      "Presented an IoT-enabled EV charging station featuring ESP8266 control, PZEM-004T energy monitoring, GSM notifications, and a web dashboard for session tracking.",
    type: "Exhibition",
    verified: false,
  },
  {
    id: "embedded-workshop",
    title: "Embedded Systems & IoT Workshop",
    organization: "Workshop provider (to be added)",
    date: "Editable date",
    description:
      "Hands-on training covering Arduino, ESP32, sensor interfacing, and cloud-connected prototypes.",
    type: "Workshop",
    verified: false,
  },
  {
    id: "ai-agents-hackathon",
    title: "AI Agents & Automation Hackathon",
    organization: "Hackathon organizer (to be added)",
    date: "Editable date",
    description:
      "Explored natural-language desktop automation using local and online LLMs, browser automation, and file management pipelines.",
    type: "Hackathon",
    verified: false,
  },
  {
    id: "robotics-event",
    title: "Robotics & Motor Control Technical Event",
    organization: "Technical club (to be added)",
    date: "Editable date",
    description:
      "Demonstrated servo-based articulated motion control concepts and discussed natural-language instruction parsing for robotic arms.",
    type: "Event",
    verified: false,
  },
];
