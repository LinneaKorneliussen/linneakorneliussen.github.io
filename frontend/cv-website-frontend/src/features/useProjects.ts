import { useState, useEffect } from "react";
import { fetchProjects } from "../api/projects";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError("Kunde inte ladda projekt");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, loading, error };
}
