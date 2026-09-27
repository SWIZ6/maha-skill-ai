"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { PolicymakerView } from "@/components/views/PolicymakerView";
import { InstituteView } from "@/components/views/InstituteView";
import { EmployerView } from "@/components/views/EmployerView";
import { CandidateView } from "@/components/views/CandidateView";

export default function Home() {
  const { role } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Platform Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      {/* Main Content Layout Shell */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Responsive Desktop Sidebar + Mobile Bottom Tab Bar */}
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Dynamic Persona Dashboard Viewport */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0 max-w-full pb-20 md:pb-8">
          {role === "policymaker" && <PolicymakerView />}
          {role === "principal" && <InstituteView />}
          {role === "employer" && <EmployerView />}
          {role === "candidate" && <CandidateView />}

          {/* Institutional Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">MahaSkill AI Engine</span>
              <span>•</span>
              <span>Maharashtra State Innovation Society (MSInS)</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 text-[11px]">
              <span className="hover:text-slate-900 cursor-pointer">Directorate of Vocational Education (DVET)</span>
              <span>•</span>
              <span className="hover:text-slate-900 cursor-pointer">MIDC Industrial Clusters</span>
              <span>•</span>
              <span className="hover:text-slate-900 cursor-pointer">Aadhaar DBT Portal</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
