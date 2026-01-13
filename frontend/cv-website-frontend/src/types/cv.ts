export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
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
}
