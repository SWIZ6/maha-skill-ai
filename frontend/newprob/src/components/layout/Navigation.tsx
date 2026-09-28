"use client";

import React from "react";
import { useApp, RoleType } from "@/context/AppContext";
import {
  Building2,
  GraduationCap,
  Briefcase,
  UserCheck,
  BarChart3,
  GitCompare,
  Vote,
  Compass,
  MapPin,
  ChevronRight,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import { DISTRICT_METRICS } from "@/data/mockData";
import { Badge } from "@/components/ui/Badge";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { role, setRole, selectedDistrict, setSelectedDistrict, appliedPatches } = useApp();

  const navItems = [
    {
      id: "policymaker" as RoleType,
      title: "Policymaker Macro LMI",
      subtitle: "State-wide Demand vs Supply",
      icon: <Building2 className="w-5 h-5" />,
      color: "text-blue-600",
      badge: "Macro View",
    },
    {
      id: "principal" as RoleType,
      title: "Institute Curriculum Diff",
      subtitle: "Syllabus vs Industry Demand",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "text-emerald-600",
      badge: appliedPatches.length > 0 ? `${appliedPatches.length} Patched` : "Core Engine",
    },
    {
      id: "employer" as RoleType,
      title: "Employer Demand Sensing",
      subtitle: "Pulse Survey & Validation Swipe",
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-orange-600",
      badge: "Industry Feedback",
    },
    {
      id: "candidate" as RoleType,
      title: "Candidate Career Navigator",
      subtitle: "Skill Gap & Course Recommender",
      icon: <UserCheck className="w-5 h-5" />,
      color: "text-purple-600",
      badge: "Radar Match",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar (Left) */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200/80 p-4 shrink-0 min-h-[calc(100vh-5.5rem)]">
        {/* District Filter Selector */}
        <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Target Geography
            </span>
            <Badge variant="outline" className="text-[10px] bg-white border-slate-300">
              36 Districts
            </Badge>
          </div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
          >
            <option value="All Districts">All Maharashtra Districts (Combined)</option>
            {DISTRICT_METRICS.map((d) => (
              <option key={d.id} value={d.district}>
                {d.district} ({d.region})
              </option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Filter applies to:</span>
            <span className="font-medium text-slate-700">All Analytics</span>
          </div>
        </div>

        {/* Persona Navigation Links */}
        <div className="space-y-1 mb-6 flex-1">
          <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Views (Personas)
          </div>
          {navItems.map((item) => {
            const isActive = role === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-150 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 font-semibold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? "bg-slate-800 text-amber-400" : "bg-slate-100 " + item.color
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${isActive ? "text-white" : "text-slate-900"}`}>
                      {item.title}
                    </p>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isActive ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? "text-amber-400 translate-x-0.5" : "text-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* State Vocational LMI Summary Badge */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white shadow-md border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              DVET Sync Status
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
              Live
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Curriculum updates are pushed to DGET / DVET portals in real-time.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400 font-mono">
            <span>ITIs: 959</span>
            <span>Trainees: 1.98L</span>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (When Hamburger is clicked) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full p-4 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <span className="font-bold text-slate-900 text-sm">Navigation & Views</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              {/* District select */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Select District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="All Districts">All Maharashtra Districts</option>
                  {DISTRICT_METRICS.map((d) => (
                    <option key={d.id} value={d.district}>
                      {d.district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role selection in drawer */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setRole(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs ${
                      role === item.id
                        ? "bg-slate-900 text-white font-semibold"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <div className={role === item.id ? "text-amber-400" : item.color}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className={`text-[10px] ${role === item.id ? "text-slate-300" : "text-slate-500"}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 text-center">
              MahaSkill AI • MSInS Govt of Maharashtra
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar (Permanent on screens < 768px for fast 1-tap switching) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pt-1 pb-safe shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = role === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 touch-manipulation min-w-[60px] min-h-[46px] ${
                  isActive ? "text-orange-600 font-bold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-orange-100 text-orange-600" : ""}`}>
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                  {item.id === "policymaker"
                    ? "Govt LMI"
                    : item.id === "principal"
                    ? "Curriculum"
                    : item.id === "employer"
                    ? "Employer"
                    : "Student"}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
