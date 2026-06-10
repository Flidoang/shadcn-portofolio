// Project assets
import esg1 from "@/assets/projects/esg1.webp";
import esg2 from "@/assets/projects/esg2.webp";
import esg3 from "@/assets/projects/esg3.webp";
import esg4 from "@/assets/projects/esg4.webp";

import porto1 from "@/assets/projects/porto1.webp";
import porto2 from "@/assets/projects/porto2.webp";
import porto3 from "@/assets/projects/porto3.webp";
import porto4 from "@/assets/projects/porto4.webp";

import p3_1 from "@/assets/project3_1.png";
import p3_2 from "@/assets/project3_2.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  url: string;
  tags: string[];
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "ESG Track AI",
    description: "AI-powered ESG management platform for seamless sustainability tracking and reporting.",
    extendedDescription: "ESG Track AI is a comprehensive enterprise SaaS dashboard enabling organizations to measure, manage, and report their environmental, social, and governance (ESG) performance. It features intuitive data visualization, automated compliance reporting, and AI-driven sustainability insights.",
    url: "esgtrack.ai",
    tags: ["Vue 3", "Nest JS", "Vuetify", "PostgreSQL", "Enterprise", "Dashboard", "SaaS"],
    screenshots: [esg1, esg2, esg3, esg4],
  },
  {
    id: 2,
    title: "Personal Portfolio v1",
    description: "A minimalist and highly interactive personal portfolio website showcasing frontend expertise.",
    extendedDescription: "The first iteration of my personal portfolio, built to showcase my projects and technical journey. Designed with a clean aesthetic and smooth interactions to highlight my frontend development skills, featuring a custom project showcase and integrated contact flow.",
    url: "rafli-portofolio.netlify.app",
    tags: ["Vue 3", "Tailwind CSS", "Frontend", "UI/UX", "Portfolio"],
    screenshots: [porto1, porto2, porto3, porto4],
  },
  {
    id: 3,
    title: "Chrono Task Space",
    description: "Agile management tool with collaborative Kanban boards and calendars.",
    extendedDescription: "Chrono is a highly interactive workspace app for modern agile squads. It features a custom drag-and-drop Kanban board, a team schedule calendar, and gantt chart timelines. It leverages WebSockets for instantaneous real-time updates across multiple team members.",
    url: "chrono-workspace.net",
    tags: ["Vue 3", "WebSockets", "Tailwind CSS", "Kanban", "Collaboration"],
    screenshots: [p3_1, p3_2],
  },
];
