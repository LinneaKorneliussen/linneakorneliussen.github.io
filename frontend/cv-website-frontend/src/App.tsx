import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { Menu, X } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-lg">
              Portfolio
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('about')}
                className={`font-semibold transition-colors ${
                  activeSection === 'about'
                    ? 'text-cyan-400'
                    : 'text-white hover:text-cyan-400'
                }`}
              >
                Om mig
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`font-semibold transition-colors ${
                  activeSection === 'experience'
                    ? 'text-cyan-400'
                    : 'text-white hover:text-cyan-400'
                }`}
              >
                Erfarenhet
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`font-semibold transition-colors ${
                  activeSection === 'projects'
                    ? 'text-cyan-400'
                    : 'text-white hover:text-cyan-400'
                }`}
              >
                Projekt
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeSection === 'about'
                    ? 'text-cyan-400 bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Om mig
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`block w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeSection === 'experience'
                    ? 'text-cyan-400 bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Erfarenhet
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`block w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeSection === 'projects'
                    ? 'text-cyan-400 bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Projekt
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="pt-16">
        <HomePage activeSection={activeSection} />
      </div>
    </div>
  );
}

export default App;
