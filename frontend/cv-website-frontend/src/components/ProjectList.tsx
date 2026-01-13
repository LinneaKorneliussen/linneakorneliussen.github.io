import type { Project } from "../types/project";
import { Github, ExternalLink, Calendar} from "lucide-react";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="glass rounded-2xl overflow-hidden shadow-lg hover-lift transition-all duration-500 border border-white/40 group"
        >
          {project.imageUrl && (
            <div className="relative h-48 overflow-hidden bg-slate-200">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-2 text-cyan-600 mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {formatDate(project.completedDate)}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
              {project.title}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4 text-sm">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-semibold hover:bg-cyan-100 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all hover-lift"
                >
                  <Github className="w-4 h-4" />
                  <span>Kod</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all hover-lift"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
