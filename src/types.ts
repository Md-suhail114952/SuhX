export interface Project {
  id: string;
  title: string;
  category: "UI UX Design" | "Branding" | "Social Media Designs" | "AI Generated Work";
  description: string;
  image: string;
  tags: string[];
  metrics?: string;
  year: string;
  client: string;
  link: string;
  duration?: string;
  industry?: string;
  problem?: string;
  solution?: string;
  researchHighlight?: string;
  wireframeInsight?: string;
  designSystemHighlight?: string;
  prototypeFeedback?: string;
  finalOutcome?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  glowColor: string; // Tailwind glow utility or hex
  tags: string[];
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  icon: string;
  sub: string;
}

export interface AITool {
  name: string;
  description: string;
  level: string; // "Expert" | "Power User" | "Certified"
  category: "LLM" | "Generative Imagery" | "Automation" | "Audio/Voice";
  iconName: string;
  color: string;
}

export interface ProcessStep {
  number: string;
  phase: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  designation: string;
  company: string;
  avatarInitials: string;
  rating: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
