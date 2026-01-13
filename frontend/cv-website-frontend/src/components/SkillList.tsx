import type { Skill } from "../types/cv";

interface SkillListProps {
  skills: Skill[];
}

export function SkillList({ skills }: SkillListProps) {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categorySkills = skills.filter(skill => skill.category === category);

        return (
          <div key={category}>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
              {category}
            </h4>
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
