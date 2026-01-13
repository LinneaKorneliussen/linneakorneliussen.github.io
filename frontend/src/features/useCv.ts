import { useState, useEffect } from "react";
import type { CV } from "../types"; 

export function useCv() {
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE; 

  useEffect(() => {
    async function fetchCv() {
      try {
        const response = await fetch(`${API}/cv`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
  }, [API]);

  return { cv, loading };
}
