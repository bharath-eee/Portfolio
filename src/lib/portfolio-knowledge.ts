// Deterministic portfolio Q&A knowledge base used by the Portfolio Assistant.
// Answers are pre-written from verified portfolio data only — no fabrication.

import { personal } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

export type QA = {
  patterns: RegExp[];
  answer: string;
  links?: { label: string; href: string }[];
};

const projectById = (id: string) => projects.find((p) => p.id === id)!;

export const knowledgeBase: QA[] = [
  {
    patterns: [
      /\b(who|tell me about|introduce)\b.*\b(bharath|him|you|yourself)\b/i,
      /\babout (bharath|him|you)\b/i,
    ],
    answer: `${personal.name} is an Electrical and Electronics Engineering student focused on Artificial Intelligence, IoT, Robotics, and Embedded Systems. He's interested in how microcontrollers, sensors, electrical monitoring, local language models, and intelligent automation can be combined to build practical, real-world solutions. His career goal is to contribute to both core electrical engineering and AI-driven technology development.`,
    links: [
      { label: "About section", href: "#about" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    patterns: [
      /\b(skills?|tech|technologies|tools?|stack)\b/i,
      /\bwhat.*(can|knows?)\b/i,
    ],
    answer: `Bharath works across five skill areas:\n• Programming: ${skillCategories[0].skills.join(", ")}.\n• Hardware: ${skillCategories[1].skills.join(", ")}.\n• Artificial Intelligence: ${skillCategories[2].skills.join(", ")}.\n• Electrical Engineering: ${skillCategories[3].skills.join(", ")}.\n• Development Tools: ${skillCategories[4].skills.join(", ")}.`,
    links: [{ label: "Technical Skills", href: "#skills" }],
  },
  {
    patterns: [
      /\b(ev|electric|charging)\b/i,
      /\bstation\b/i,
    ],
    answer: `Smart EV Charging Station (Project ${projectById("smart-ev-charging").index}) — ${projectById("smart-ev-charging").description} Features include ESP8266-based control, PZEM-004T electrical measurements, GSM SMS notifications, remote commands, customer and admin web portals, and energy/session history. Status: ${projectById("smart-ev-charging").status}.`,
    links: [{ label: "View project", href: "#projects" }],
  },
  {
    patterns: [
      /\blifepilot\b/i,
      /\bdesktop (automation|assistant)\b/i,
    ],
    answer: `LifePilot AI (Project ${projectById("lifepilot-ai").index}) — ${projectById("lifepilot-ai").description} It explores desktop automation, browser automation, file management, voice commands, and local + online LLM integration. Status: ${projectById("lifepilot-ai").status}.`,
    links: [{ label: "View project", href: "#projects" }],
  },
  {
    patterns: [
      /\b(robot|arm|servo)\b/i,
    ],
    answer: `LLM-Controlled Robotic Arm (Project ${projectById("llm-robotic-arm").index}) — ${projectById("llm-robotic-arm").description} Focus areas: servo motor control, robotic movement, natural-language interpretation, and hardware/AI integration. Status: ${projectById("llm-robotic-arm").status}. You can also experiment with a live 3D demo of robotic arm motion in the "Explore Robotics in 3D" section.`,
    links: [
      { label: "View project", href: "#projects" },
      { label: "3D Robotic Arm demo", href: "#robotics" },
    ],
  },
  {
    patterns: [
      /\b(load classifier|eload|tinyml|acs712|appliance)\b/i,
    ],
    answer: `E-Load Classifier (Project ${projectById("eload-classifier").index}) — ${projectById("eload-classifier").description} Proposed components: ${projectById("eload-classifier").components?.join(", ")}. Example loads: ${projectById("eload-classifier").exampleLoads?.join(", ")}. Status: ${projectById("eload-classifier").status}.`,
    links: [{ label: "View project", href: "#projects" }],
  },
  {
    patterns: [
      /\bprojects?\b/i,
      /\bwhat.*(built|made|done|working on)\b/i,
    ],
    answer: `Bharath has four featured projects:\n1. ${projects[0].title} — ${projects[0].status}\n2. ${projects[1].title} — ${projects[1].status}\n3. ${projects[2].title} — ${projects[2].status}\n4. ${projects[3].title} — ${projects[3].status}\nTap any project card for architecture, features, and tech stack.`,
    links: [{ label: "Selected Work", href: "#projects" }],
  },
  {
    patterns: [
      /\b(ai|artificial intelligence|llm|machine learning)\b/i,
    ],
    answer: `Bharath's AI interests include local LLM integration (e.g. via LM Studio), retrieval-augmented generation (RAG), AI agents, and natural-language control of hardware. These show up across LifePilot AI (desktop automation), the LLM-Controlled Robotic Arm, and the E-Load Classifier (TinyML on edge devices).`,
    links: [{ label: "AI projects", href: "#projects" }],
  },
  {
    patterns: [
      /\b(embedded|microcontroller|esp32|esp8266|arduino|sensors?)\b/i,
    ],
    answer: `Bharath works with Arduino UNO, ESP8266, ESP32, GSM modules, PZEM-004T, servo motors, and a wide range of sensor interfacing. Embedded work underpins the Smart EV Charging Station (ESP8266 + PZEM-004T + GSM) and the LLM-Controlled Robotic Arm (ESP8266 + servos).`,
    links: [{ label: "Technical Skills", href: "#skills" }],
  },
  {
    patterns: [
      /\b(career|goal|interest|future|plan)\b/i,
    ],
    answer: `Bharath's career goal is to contribute to both core electrical engineering and AI-driven technology development. He's interested in opportunities involving electrical engineering, embedded systems, AI, IoT, and robotics.`,
    links: [{ label: "Contact", href: "#contact" }],
  },
  {
    patterns: [
      /\b(contact|reach|email|hire|connect)\b/i,
    ],
    answer: `You can reach Bharath via email at ${personal.emailPlaceholder}, or connect on GitHub (${personal.socials.github.handle}) and LinkedIn (${personal.socials.linkedin.handle}). The contact form on the site is wired for delivery once a backend integration is configured.`,
    links: [
      { label: "Contact section", href: "#contact" },
      { label: "GitHub", href: personal.socials.github.url },
      { label: "LinkedIn", href: personal.socials.linkedin.url },
    ],
  },
  {
    patterns: [
      /\b(resume|cv)\b/i,
    ],
    answer: `The Resume button in the navigation and contact section is wired to download /resume.pdf. Once the PDF is placed in the public folder, the download will work end-to-end.`,
    links: [{ label: "Contact section", href: "#contact" }],
  },
  {
    patterns: [
      /\b(hello|hi|hey|greetings)\b/i,
    ],
    answer: `Hi! I'm Bharath's portfolio Q&A assistant. Ask me about his background, skills, projects (EV charging, LifePilot AI, robotic arm, E-Load Classifier), career interests, or how to get in touch.`,
  },
];

export const SUGGESTED_QUESTIONS = [
  "Tell me about Bharath.",
  "What are his technical skills?",
  "Explain the EV charging project.",
  "What AI projects is he working on?",
  "What are his career interests?",
  "How can I contact him?",
];

export function findAnswer(query: string): { answer: string; links?: { label: string; href: string }[] } {
  const trimmed = query.trim();
  if (!trimmed) {
    return { answer: "Please type a question and I'll do my best to answer from Bharath's verified portfolio data." };
  }
  for (const qa of knowledgeBase) {
    if (qa.patterns.some((p) => p.test(trimmed))) {
      return { answer: qa.answer, links: qa.links };
    }
  }
  return {
    answer:
      "I don't have verified information about that yet. I can answer questions about Bharath's background, technical skills, projects (Smart EV Charging Station, LifePilot AI, LLM-Controlled Robotic Arm, E-Load Classifier), career interests, or how to contact him.",
  };
}
