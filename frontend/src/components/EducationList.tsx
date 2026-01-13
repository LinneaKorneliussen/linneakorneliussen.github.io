import { Education } from '../types';
import { Calendar } from 'lucide-react';

interface EducationListProps {
  education: Education[];
}

export function EducationList({ education }: EducationListProps) {
  const formatDate = (dateString: string) => {
    if (dateString === 'Nuvarande') return 'Nuvarande';
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={index} className="glass rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300 border border-white/40">
          <div className="flex items-center gap-2 text-cyan-600 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-1">{edu.degree}</h3>
          <p className="text-slate-600">{edu.school}</p>
        </div>
      ))}
    </div>
  );
}
