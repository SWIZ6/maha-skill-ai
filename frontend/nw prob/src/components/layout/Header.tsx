"use client";

import React from "react";
import { useApp, RoleType } from "@/context/AppContext";
import {
  Building2,
  GraduationCap,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Sparkles,
  Layers,
  Menu,
  X,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onToggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, mobileMenuOpen }) => {
  const {
    role,

    setRole,
    toastMessage,
    backendConnected,
    backendHealth,
    refreshBackendData,
    isLoadingBackend,
  } = useApp();


  const roleOptions: {
    key: RoleType;
    label: string;
    shortLabel: string;
    subtext: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      key: "policymaker",
      label: "Policymaker / Govt Admin",
      shortLabel: "Govt Admin",
      subtext: "State-wide Macro LMI",
      icon: <Building2 className="w-4 h-4" />,
      color: "border-blue-500 text-blue-700 bg-blue-50",
    },
    {
      key: "principal",
      label: "Institute / ITI Principal",
      shortLabel: "ITI Principal",
      subtext: "Curriculum Diff Engine",
      icon: <GraduationCap className="w-4 h-4" />,
      color: "border-emerald-500 text-emerald-700 bg-emerald-50",
    },
    {
      key: "employer",
      label: "Employer / Industry",
      shortLabel: "Employer",
      subtext: "Demand Sensing & Swipe",
      icon: <Briefcase className="w-4 h-4" />,
      color: "border-orange-500 text-orange-700 bg-orange-50",
    },
    {
      key: "candidate",
      label: "Candidate / Student",
      shortLabel: "Student",
      subtext: "Radar & Pathway Match",
      icon: <UserCheck className="w-4 h-4" />,
      color: "border-purple-500 text-purple-700 bg-purple-50",
    },
  ];

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-xl border border-slate-700 text-xs md:text-sm animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Govt Bar */}
      <div className="bg-slate-950 text-slate-300 px-3 sm:px-4 py-1.5 text-[11px] border-b border-slate-800 flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {/* Subtle Tricolor indicator */}
          <div className="flex h-2.5 w-4 sm:w-5 rounded-xs overflow-hidden shrink-0">
            <span className="w-1/3 bg-[#FF9933]"></span>
            <span className="w-1/3 bg-white"></span>
            <span className="w-1/3 bg-[#138808]"></span>
          </div>
          <span className="font-semibold text-slate-200 truncate text-[10px] sm:text-[11px]">
            महाराष्ट्र शासन <span className="hidden sm:inline">| Govt of Maharashtra</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => refreshBackendData()}
            disabled={isLoadingBackend}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-medium transition-all bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer"
            title="Click to re-verify backend connectivity"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                backendConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            ></span>
            <span className={backendConnected ? "text-emerald-300 font-semibold" : "text-amber-300"}>
              {backendConnected ? (
                <>
                  <span className="hidden sm:inline">Python Live (:8000) • {backendHealth?.live_data?.raw_jobs_count || 10} Jobs</span>
                  <span className="sm:hidden">Live :8000</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Backend: Direct Cache Mode</span>
                  <span className="sm:hidden">Cache</span>
                </>
              )}
            </span>
            {isLoadingBackend && <span className="animate-spin text-slate-400">↻</span>}
          </button>
          <span className="text-slate-400 font-mono text-[10px] hidden md:inline">v3.2-prod</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-w-[38px] min-h-[38px] flex items-center justify-center shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900 flex items-center justify-center text-white shadow-md shadow-slate-900/10 border border-slate-700/40 shrink-0">
                <span className="text-xs sm:text-base font-black tracking-tighter text-amber-400">महा</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-950 tracking-tight flex items-center gap-1">
                    MahaSkill <span className="text-orange-600 font-extrabold">AI</span>
                  </h1>
                  <Badge variant="outline" className="text-[9px] sm:text-[10px] py-0 px-1 bg-slate-50 hidden sm:inline-flex border-slate-200 text-slate-600">
                    LMI Engine
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                  Labor Market Intelligence & Curriculum Alignment
                </p>
              </div>
            </div>
          </div>

          {/* Role Switcher (Crucial Feature Requirement) */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/70">
              {roleOptions.map((opt) => {
                const isActive = role === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setRole(opt.key)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm font-semibold scale-[1.02]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
                    }`}
                  >
                    <span className={isActive ? "text-orange-600" : "text-slate-500"}>
                      {opt.icon}
                    </span>
                    <span>{opt.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile / Tablet dropdown role switcher */}
            <div className="lg:hidden flex items-center">
              <select
                aria-label="Switch Persona"
                value={role}
                onChange={(e) => setRole(e.target.value as RoleType)}
                className="text-xs font-semibold bg-slate-100 border border-slate-300 rounded-lg px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 max-w-[130px] sm:max-w-[200px] truncate"
              >
                {roleOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    👤 {opt.shortLabel}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex items-center pl-2 border-l border-slate-200 text-slate-500">
              <button
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Alerts"
                title="Syllabus & Industry Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
