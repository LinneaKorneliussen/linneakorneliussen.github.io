import { Project } from '../types';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectListProps {
  projects: Project[];
}

// Robust slugify-funktion
const slugify = (str: string) =>
  str
    .normalize("NFD")                 // hantera accent-tecken
    .replace(/[\u0300-\u036f]/g, "") // ta bort diakritiska tecken
    .toLowerCase()
    .replace(/\s+/g, "-")            // mellanslag -> -
    .replace(/[^\w-]+/g, "");        // ta bort ogiltiga tecken

export function ProjectList({ projects }: ProjectListProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split('-');
    if (!month) return year;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {projects.map(project => {
        const slug = slugify(project.title);

        return (
          <div 
            key={project.id} 
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
            onClick={() => navigate(`/projects/${slug}`)} // navigera till projektsidan
          >
            
            {/* Image */}
            <div className="h-48 md:h-56 overflow-hidden relative">
              <img 
                src={project.imageUrl ?? '/placeholder.png'} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-cyan-600 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold">{formatDate(project.completedDate)}</span>
              </div>

              <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-600 transition-colors">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies?.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-semibold">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    onClick={e => e.stopPropagation()} // hindra click bubbling
                    className="px-3 py-1 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition flex items-center gap-1"
                  >
                    <Github className="w-3 h-3"/> Kod
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank"
                    onClick={e => e.stopPropagation()} // hindra click bubbling
                    className="px-3 py-1 bg-cyan-600 text-white rounded-lg text-xs font-bold hover:bg-cyan-500 transition flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3"/> Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
