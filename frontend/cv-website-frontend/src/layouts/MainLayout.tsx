import type { ReactNode } from "react";
import { Navigation } from "../components/Navigation";

interface MainLayoutProps {
  children: ReactNode;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function MainLayout({ children, activeSection, onNavigate }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <Navigation activeSection={activeSection} onNavigate={onNavigate} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
