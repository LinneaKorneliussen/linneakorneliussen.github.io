import { useState, useEffect } from "react";
import { fetchCv } from "../api/cvApi";
import type { CV } from "../types/cv";

export function useCv() {
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCv() {
      try {
        setLoading(true);
        const data = await fetchCv();
        setCv(data);
        setError(null);
      } catch (err) {
        setError("Kunde inte ladda CV");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCv();
  }, []);

  return { cv, loading, error };
}
