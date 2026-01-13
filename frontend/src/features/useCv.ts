import { useState, useEffect } from "react";
import type { CV } from "../types"; 

export function useCv() {
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCv() {
      try {
        const response = await fetch("/api/cv"); 
        if (!response.ok) throw new Error("Could not fetch CV");
        const data: CV = await response.json();
        setCv(data);
      } catch (error) {
        console.error("Error fetching CV:", error);
        setCv(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCv();
  }, []);

  return { cv, loading };
}
