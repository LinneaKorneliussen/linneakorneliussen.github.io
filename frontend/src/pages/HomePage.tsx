import { useRef, useEffect } from "react";
import { useCv } from "../features/useCv";
import { useProjects } from "../features/useProjects";
import { SkillList } from "../components/SkillList";
import { ExperienceList } from "../components/ExperienceList";
import { EducationList } from "../components/EducationList";
import { ProjectList } from "../components/ProjectList";
import { useContactForm } from "../features/useContactForm";
import { Mail, MapPin, Phone, Github, Linkedin, Sparkles, Award, Briefcase } from "lucide-react";

interface HomePageProps {
  activeSection: string;
}

export function HomePage({ activeSection }: HomePageProps) {
  const { cv, loading: cvLoading } = useCv();
  const { projects, loading: projectsLoading } = useProjects();
  const { formData, handleChange, handleSubmit, loading, error, success } = useContactForm();

  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = { about: aboutRef, experience: experienceRef, projects: projectsRef, education: educationRef };
    const targetRef = refs[activeSection as keyof typeof refs];
    if (targetRef?.current)
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSection]);

  if (cvLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="text-center glass rounded-3xl p-12 shadow-2xl">
          <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-slate-700 font-semibold text-xl">Laddar...</p>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="glass rounded-3xl p-12 text-center shadow-2xl">
          <p className="text-slate-700 font-semibold text-xl">Kunde inte ladda CV</p>
        </div>
      </div>
    );
  }

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-900 min-h-screen">
      {/* ==================== HERO / ABOUT ==================== */}
      <section
        ref={aboutRef}
        className="relative py-20 md:py-32 px-6 lg:px-20 overflow-hidden"
      >
        <div className="gradient-mesh absolute inset-0" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* VÄNSTER KOLUMN: TEXT & KONTAKT */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-lg hover-glow">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Välkommen till min portfolio</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
                {cv.name}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient">
                {cv.title}
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
              {cv.about}
            </p>

            <div className="space-y-3 mt-8">
              <div className="flex items-center gap-4 text-slate-700 hover:text-cyan-600 transition-all duration-300 group">
                <div className="p-2.5 bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <a href={`mailto:${cv.email}`} className="font-medium text-base">{cv.email}</a>
              </div>
              <div className="flex items-center gap-4 text-slate-700 group">
                <div className="p-2.5 bg-cyan-50 rounded-xl">
                  <Phone className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="font-medium text-base">{cv.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-700 group">
                <div className="p-2.5 bg-cyan-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="font-medium text-base">{cv.location}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {cv.github && (
                <a
                  href={cv.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-900 text-white rounded-xl shadow-lg hover-lift hover:shadow-xl transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {cv.linkedin && (
                <a
                  href={cv.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl shadow-lg hover-lift hover:shadow-xl transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </div>
          <div className="animate-slide-in-right flex flex-col items-center">
            {/* Profile picture */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 hover:scale-105 transition-transform">
              <img
                src="assets/Linnea-profile.jpg"
                alt={`${cv.name} profilbild`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Skills */}
            <div className="glass rounded-3xl p-8 lg:p-10 shadow-xl hover-lift transition-all duration-500 border border-white/40 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Färdigheter
                </h3>
              </div>
              <SkillList skills={cv.skills} />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section
        ref={experienceRef}
        className="py-20 md:py-32 px-6 lg:px-20 bg-white/50 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-cyan-50/30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-lg mb-6">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Erfarenhet</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
              Arbetslivserfarenhet
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Min professionella resa och de företag jag arbetat med
            </p>
          </div>

          <div className="animate-fade-in">
            <ExperienceList experience={cv.experience} />
          </div>
        </div>
      </section>

      {/* ==================== EDUCATION ==================== */}
      {cv.education && cv.education.length > 0 && (
        <section
          ref={educationRef}
          className="py-20 md:py-32 px-6 lg:px-20 bg-white/50 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-cyan-50/30" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-lg mb-6">
                <Award className="w-4 h-4" />
                <span className="text-sm font-semibold">Utbildning</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                Min utbildning
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Skolor och program jag har gått
              </p>
            </div>

            <div className="animate-fade-in">
              <EducationList education={cv.education} />
            </div>
          </div>
        </section>
      )}

      {/* ==================== PROJECTS ==================== */}
      <section
        ref={projectsRef}
        className="py-20 md:py-32 px-6 lg:px-20 bg-gradient-to-br from-slate-50 to-cyan-50/50 relative overflow-hidden"
      >
        <div className="gradient-mesh absolute inset-0 opacity-50" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Portfolio</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
              Mina Projekt
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ett urval av projekt jag arbetat på och är stolt över
            </p>
          </div>

          {projectsLoading ? (
            <div className="flex justify-center py-20">
              <div className="glass rounded-3xl p-8 shadow-xl">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-700 font-semibold">Laddar projekt...</p>
              </div>
            </div>
          ) : projects.length > 0 ? (
            <div className="space-y-20 animate-fade-in">
              {featuredProjects.length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-3">
                      Utvalda Projekt
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg">Mina bästa och mest betydelsefulla arbeten</p>
                  </div>
                  <ProjectList projects={featuredProjects} />
                </div>
              )}

              {projects.filter((p) => !p.featured).length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                      Alla Projekt
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg">Övriga projekt jag arbetat med</p>
                  </div>
                  <ProjectList projects={projects.filter((p) => !p.featured)} />
                </div>
              )}
            </div>
          ) : (
            <div className="glass rounded-3xl p-12 max-w-md mx-auto shadow-xl">
              <p className="text-slate-600 text-lg font-semibold text-center">Inga projekt att visa för tillfället</p>
            </div>
          )}
        </div>
      </section>
       <section className="py-20 md:py-32 px-6 lg:px-20 bg-white/50 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Kontakta Mig
            </h2>
            <p className="text-slate-600 text-lg">
              Fyll i formuläret nedan för att skicka ett meddelande.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ditt namn"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="email"
                placeholder="Din e-post"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <input
              type="text"
              placeholder="Ämne"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <textarea
              placeholder="Meddelande"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              required
              rows={6}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Meddelandet skickat!</p>}

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 transition-all disabled:opacity-50"
            >
              {loading ? "Skickar..." : "Skicka Meddelande"}
            </button>
          </form>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 text-white py-16 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.1),transparent_50%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Låt oss arbeta tillsammans
            </h3>
            <p className="text-cyan-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Intresserad av samarbete eller har frågor? Kontakta mig gärna!
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {cv.github && (
              <a
                href={cv.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover-lift group border border-white/10"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            )}
            {cv.linkedin && (
              <a
                href={cv.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover-lift group border border-white/10"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            )}
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-cyan-200 text-sm mb-2">
              © {new Date().getFullYear()} {cv.name}. Alla rättigheter förbehållna.
            </p>
            <p className="text-cyan-300/60 text-xs">
              Byggt med React och modern teknik
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
