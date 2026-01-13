// src/pages/ProjectPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css/github-markdown-light.css";

import { useProjects } from "../features/useProjects";
import { useProjectReadme } from "../features/useProjectReadme";
import { Project } from "../types";

export function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { projects, loading: projectsLoading } = useProjects();

  // Robust slugify
  const slugify = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const project: Project | undefined = projects.find((p) => slugify(p.title) === slug);

  const { readme, loading: readmeLoading } = useProjectReadme(project?.title ?? null);

  // Av-escapea \n och unicode
  const unescapedReadme = readme
    ? readme
        .replace(/\\n/g, "\n")
        .replace(/\\u([a-fA-F0-9]{4})/g, (_, g) =>
          String.fromCharCode(parseInt(g, 16))
        )
    : "";

  // Fix relativa bilder från GitHub till raw
  const fixImageUrls = (readme: string, repoName: string) => {
    const rawBase = `https://raw.githubusercontent.com/LinneaKorneliussen/${repoName}/main/`;
    return readme.replace(/!\[([^\]]*)]\((?!http)([^)]+)\)/g, (_, alt, path) => {
      return `![${alt}](${rawBase}${path})`;
    });
  };

  const fixedReadme = project && unescapedReadme
    ? fixImageUrls(unescapedReadme, project.title)
    : "";

  if (projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="glass rounded-3xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-700 font-semibold">Laddar projekt...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="glass rounded-3xl p-8 shadow-xl text-center">
          <p className="text-slate-700 font-semibold mb-4">Projekt hittades inte</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition"
          >
            ← Tillbaka till portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">

        {/* Tillbaka-knapp */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition"
        >
          ← Tillbaka till portfolio
        </button>

        {/* Projekttitel */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-slate-900">{project.title}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">{project.description}</p>
        </div>

        {/* Länkar */}
        <div className="flex justify-center gap-4 flex-wrap">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Öppna Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-100 transition"
            >
              GitHub Repo
            </a>
          )}
        </div>

        {/* Live Demo iframe */}
        {project.liveUrl && (
          <div className="mt-8 rounded-xl overflow-hidden border border-slate-300 shadow-lg">
            <iframe
              src={project.liveUrl}
              className="w-full h-[500px] md:h-[700px]"
              title={`${project.title} Live Demo`}
              frameBorder={0}
            />
          </div>
        )}

        {/* Team / Contributors */}
        {project.team && project.team.length > 0 && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {project.team.map(member => (
              <div key={member.githubUrl} className="space-y-2">
                <a href={member.githubUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={member.avatarUrl} // använder avatarUrl
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-2 border-cyan-300"
                  />
                  <div className="font-semibold text-slate-700">{member.name}</div>
                  {member.role && <div className="text-sm text-slate-500">{member.role}</div>}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* README */}
        <div className="glass rounded-3xl p-10 shadow-xl overflow-x-auto markdown-body max-w-none prose prose-cyan">
          {readmeLoading ? (
            <p className="text-slate-600">Laddar README...</p>
          ) : fixedReadme ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {fixedReadme}
            </ReactMarkdown>
          ) : (
            <p className="text-slate-500">Ingen README hittades.</p>
          )}
        </div>

      </div>
    </div>
  );
}
