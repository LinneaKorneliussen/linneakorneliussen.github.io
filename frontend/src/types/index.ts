// src/types/index.ts

// =====================
// CV / Resume Types
// =====================
export interface Skill {
  name: string;
  level: number;        // t.ex. 0-100 eller 0-10
  category: string;     // t.ex. "Frontend", "Backend", "Tools"
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;     
  endDate: string;       
  description: string;
  responsibilities: string[];
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;  
  endDate: string;    
}

export interface CV {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

// =====================
// Team / Contributors
// =====================
export interface TeamMember {
  name: string;
  githubUrl: string;    // GitHub profil-länk
  avatarUrl: string;    // GitHub profilbild
  role?: string;        // t.ex. "Frontend", "Backend", "Designer"
}

// =====================
// Project Types
// =====================
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[]; 
  imageUrl?: string;       // Projektbild
  githubUrl?: string;      // GitHub repo
  liveUrl?: string;        // Live demo
  featured: boolean;       
  completedDate: string;   // ISO-format "YYYY-MM-DD"
  team?: TeamMember[];     // Teammedlemmar
}

// =====================
// GitHub API Typing
// =====================
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  topics?: string[];
  pushed_at?: string;      // ISO datum
}
