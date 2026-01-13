import { useEffect, useState } from "react";

export function useProjectReadme(repoName: string | null) {
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoName) return;

    async function fetchReadme() {
      try {
        setLoading(true);
        const res = await fetch(`/api/github-readme/${repoName}`);
        if (!res.ok) throw new Error("Could not fetch README");
        const text = await res.text();
        setReadme(text);
      } catch (err) {
        console.error("README error:", err);
        setReadme(null);
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, [repoName]);

  return { readme, loading };
}
