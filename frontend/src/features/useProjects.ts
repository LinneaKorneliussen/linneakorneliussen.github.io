import { useState, useEffect } from "react";
import type { Project } from "../types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE; 

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${API}/github-projects`);
        if (!response.ok) throw new Error("Could not fetch projects");
        const data: Project[] = await response.json();
        const sorted = data.sort((a, b) => b.completedDate.localeCompare(a.completedDate));
        setProjects(sorted);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); 
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [API]);

  return { projects, loading };
}
