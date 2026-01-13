import type { Experience } from "../types/cv";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceListProps {
  experience: Experience[];
}

export function ExperienceList({ experience }: ExperienceListProps) {
  const formatDate = (dateString: string) => {
    if (dateString === 'Nuvarande') return 'Nuvarande';
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="relative">
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500" />

      <div className="space-y-12">
        {experience.map((exp, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="md:w-1/2 flex justify-start md:justify-center items-center">
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 border-4 border-white shadow-lg z-10" />
            </div>

            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <div className="glass rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300 border border-white/40 ml-6 md:ml-0">
                <div className="flex items-center gap-2 text-cyan-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {exp.position}
                </h3>

                <div className="flex items-center gap-2 text-slate-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">{exp.company}</span>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Ansvarsområden:</p>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-slate-600 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 mt-1.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
