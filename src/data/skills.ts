export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    icon: "Code2",
    blurb: "Core languages used across embedded and AI work.",
    skills: ["C", "Basic C++", "Arduino Programming"],
  },
  {
    id: "hardware",
    title: "Hardware",
    icon: "CircuitBoard",
    blurb: "Microcontrollers, sensors, and actuator platforms.",
    skills: [
      "Arduino UNO",
      "ESP8266",
      "ESP32",
      "GSM Module",
      "PZEM-004T",
      "Servo Motors",
      "Sensor Interfacing",
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: "BrainCircuit",
    blurb: "Local LLMs, retrieval pipelines, and AI agents.",
    skills: [
      "Local LLM Integration",
      "LM Studio",
      "Retrieval-Augmented Generation",
      "AI Agents",
      "Natural-Language Hardware Control",
    ],
  },
  {
    id: "electrical",
    title: "Electrical Engineering",
    icon: "Zap",
    blurb: "Core electrical domain knowledge and analysis.",
    skills: [
      "Circuit Analysis",
      "Electrical Machines",
      "Power Systems",
      "Power Electronics",
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    icon: "Wrench",
    blurb: "IDEs, version control, and electrical CAD.",
    skills: ["Arduino IDE", "VS Code", "Git", "GitHub", "AutoCAD Electrical"],
  },
];
