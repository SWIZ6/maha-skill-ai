"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  CANDIDATE_CAREER_PATHS,
  CandidateRolePath,
} from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  UserCheck,
  Compass,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Award,
  IndianRupee,
  CheckCircle2,
  Building,
  MapPin,
  Clock,
  ArrowRight,
  Sliders,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Target,
  Plus,
  X,
  Layers,
  BookOpen,
  Cpu,
  Flame,
  Search,
  Briefcase,
  ExternalLink,
  Bell,
  Check,
} from "lucide-react";
import { StudentProfileModal } from "@/components/candidate/StudentProfileModal";
import { COMPREHENSIVE_SKILLS_CATALOG } from "@/data/skillsCatalog";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const POPULAR_SKILL_SUGGESTIONS = [
  "Lathe",
  "Milling",
  "AutoCAD",
  "Bench Working",
  "Hydraulics",
  "Pneumatics",
  "Preventive Maintenance",
  "Welding",
  "CNC",
  "Fanuc",
  "GD&T",
  "VMC",
  "G-code",
  "PLC",
  "Python",
  "React",
];

const AVAILABLE_COURSES = [
  { id: "machinist", name: "ITI Machinist", title: "ITI Machinist / CNC Operator (ITI-MECH-07)" },
  { id: "copa", name: "ITI COPA", title: "ITI Computer Operator & Programming (COPA)" },
  { id: "automobile", name: "ITI Automobile", title: "ITI Mechanic Motor Vehicle / Automobile" },
];

export const CandidateView: React.FC = () => {
  const {
    candidateRole,
    setCandidateRoleId,
    enrolledCourses,
    enrollInCourse,
    showToast,
    candidateSkills,
    setCandidateSkills,
    candidateCourse,
    setCandidateCourse,
    candidateAnalysis,
    isAnalyzingCandidate,
    refreshCandidateAnalysis,
    selectedDistrict,
    studentProfile,
    setIsProfileModalOpen,
    liveJobs,
  } = useApp();

  const [selectedCourseForModal, setSelectedCourseForModal] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [courseFilterTab, setCourseFilterTab] = useState<string>("All");
  const [jobPlatformFilter, setJobPlatformFilter] = useState<string>("All");
  const [showNearMatchBanner, setShowNearMatchBanner] = useState<boolean>(true);
  const [showAllJobs, setShowAllJobs] = useState<boolean>(false);

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !candidateSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setCandidateSkills((prev) => [...prev, trimmed]);
      setNewSkillInput("");
      showToast(`Added "${trimmed}" to your skill profile.`);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCandidateSkills((prev) => prev.filter((s) => s.toLowerCase() !== skillToRemove.toLowerCase()));
  };

  // Dynamic skill levels that the student can tweak to simulate upskilling
  const [userSkillLevels, setUserSkillLevels] = useState<Record<string, number>>({});

  const handleSkillChange = (skillName: string, val: number) => {
    setUserSkillLevels((prev) => ({ ...prev, [skillName]: val }));
  };

  // Calculate dynamic average match
  const skillsList = candidateRole.requiredSkills;
  const currentTotal = skillsList.reduce((acc, s) => {
    const val = userSkillLevels[s.name] !== undefined ? userSkillLevels[s.name] : s.candidateLevel;
    return acc + Math.min(100, (val / s.requiredLevel) * 100);
  }, 0);
  const matchPercentage = Math.round(currentTotal / skillsList.length);

  // Dynamic Radar Data
  const dynamicRadarData = candidateRole.radarData.map((d) => {
    // Find matching skill if any or use adjusted
    const match = skillsList.find((s) => s.name.toLowerCase().includes(d.subject.toLowerCase()));
    let score = d.YourScore;
    if (match && userSkillLevels[match.name] !== undefined) {
      score = userSkillLevels[match.name];
    }
    return {
      ...d,
      YourScore: score,
    };
  });

  const handleOpenEnrollModal = (course: any) => {
    setSelectedCourseForModal(course);
    setModalOpen(true);
  };

  const handleConfirmEnrollment = () => {
    if (selectedCourseForModal) {
      enrollInCourse(selectedCourseForModal.id);
      setModalOpen(false);
    }
  };

  // Near-match (almost match) calculation: candidate meets 45% - 84% requirements
  const nearMatchJobs = (liveJobs || []).filter((job) => {
    const detected = job.skills_detected || [];
    const matching = detected.filter((s) =>
      candidateSkills.some((cs) => cs.toLowerCase() === s.toLowerCase())
    );
    const score = detected.length > 0 ? Math.round((matching.length / detected.length) * 100) : 50;
    return score >= 45 && score < 85;
  });

  const filteredJobsList = (liveJobs || []).filter((job) => {
    const detected = job.skills_detected || [];
    const matching = detected.filter((s) =>
      candidateSkills.some((cs) => cs.toLowerCase() === s.toLowerCase())
    );
    const score = detected.length > 0 ? Math.round((matching.length / detected.length) * 100) : 50;
    const isNearMatch = score >= 45 && score < 85;

    // Filter by platform or near match
    if (jobPlatformFilter === "AlmostMatch" && !isNearMatch) return false;
    if (jobPlatformFilter === "LinkedIn" && job.platform !== "LinkedIn") return false;
    if (jobPlatformFilter === "Naukri" && job.platform !== "Naukri") return false;
    if (jobPlatformFilter === "Indeed" && job.platform !== "Indeed") return false;
    if (jobPlatformFilter === "Internshala" && job.platform !== "Internshala") return false;

    if (!jobSearchQuery.trim()) return true;
    const q = jobSearchQuery.toLowerCase();
    return (
      (job.job_title || "").toLowerCase().includes(q) ||
      (job.employer || "").toLowerCase().includes(q) ||
      (job.city || "").toLowerCase().includes(q) ||
      (job.skills_detected || []).some((s) => s.toLowerCase().includes(q))
    );
  });

  const displayedCourses = candidateRole.matchedCourses.filter((course) => {
    if (courseFilterTab === "All") return true;
    return (course.providerType || "Government ITI") === courseFilterTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <UserCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Candidate Career Navigator & Skill Gap Radar
              </h2>
              <p className="text-xs text-slate-500">
                MahaKaushalya Student Portal • Real-time Alignment with Maharashtra Hiring Standards
              </p>
            </div>
          </div>
        </div>

        {/* Role Pathway Selector (Location-Aware) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Target Career:</span>
          <select
            value={candidateRole.id}
            onChange={(e) => {
              setCandidateRoleId(e.target.value);
              setUserSkillLevels({});
            }}
            className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 max-w-[240px] sm:max-w-[340px] truncate"
          >
            {studentProfile.preferredDistrict && studentProfile.preferredDistrict !== "All Districts" && (
              <optgroup label={`⭐ In Your Cluster (${studentProfile.preferredDistrict})`}>
                {CANDIDATE_CAREER_PATHS.filter(
                  (p) =>
                    p.primaryDistrict?.toLowerCase().includes(studentProfile.preferredDistrict.toLowerCase()) ||
                    p.availableDistricts?.some((d) =>
                      d.toLowerCase().includes(studentProfile.preferredDistrict.toLowerCase())
                    )
                ).map((p) => (
                  <option key={p.id} value={p.id}>
                    🎯 {p.roleTitle} ({p.sector})
                  </option>
                ))}
              </optgroup>
            )}
            <optgroup label="🌐 All Maharashtra Pathways">
              {CANDIDATE_CAREER_PATHS.map((p) => (
                <option key={p.id} value={p.id}>
                  🎯 {p.roleTitle} ({p.primaryDistrict || p.sector})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Student Persona Profile Summary Bar */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-blue-50/50 p-4 rounded-2xl border border-purple-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
            {studentProfile.name ? studentProfile.name.charAt(0).toUpperCase() : "S"}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {studentProfile.name || "Student"}
              </h3>
              <Badge className="bg-purple-100 text-purple-800 text-[10px] font-semibold border-purple-200">
                {studentProfile.pursuingCourse || candidateCourse}
              </Badge>
              {studentProfile.isConfigured ? (
                <Badge variant="success" className="text-[10px] py-0">
                  Profile Configured
                </Badge>
              ) : (
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] py-0 font-medium">
                  Setup Pending
                </Badge>
              )}
              {nearMatchJobs.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setJobPlatformFilter("AlmostMatch");
                    const el = document.getElementById("live-postings-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-bold transition-colors cursor-pointer"
                  title="Click to view almost-match job vacancies"
                >
                  <Bell className="w-3 h-3 text-amber-700 animate-pulse" />
                  <span>{nearMatchJobs.length} Almost Matches Available</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
              <span>📍 Preferred Cluster: <strong className="text-slate-700">{studentProfile.preferredDistrict || selectedDistrict}</strong></span>
              <span>•</span>
              <span>⚡ Current Skills: <strong className="text-slate-700">{candidateSkills.length} tagged</strong></span>
              <span>•</span>
              <span>🎯 Target Role: <strong className="text-purple-700">{candidateRole.roleTitle}</strong></span>
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsProfileModalOpen(true)}
          className="text-xs bg-white hover:bg-purple-50 hover:text-purple-700 border-purple-200 shadow-2xs font-semibold whitespace-nowrap self-start md:self-center"
        >
          ✏️ Edit My Profile
        </Button>
      </div>

      <StudentProfileModal />

      {/* Target Role Overview Banner */}
      <Card className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-0 shadow-md">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                  {candidateRole.sector}
                </Badge>
                <span className="text-xs text-slate-400">NSFQ Level 4-6 Compatible</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {candidateRole.roleTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-3">
                <span>Avg Fresher Package: <strong className="text-amber-400">{candidateRole.avgSalary}</strong></span>
                <span>•</span>
                <span>State Demand Index: <strong className="text-emerald-400">{candidateRole.stateDemandIndex}/100</strong></span>
              </p>
            </div>

            {/* Overall Match Progress */}
            <div className="bg-white/10 border border-white/15 p-4 rounded-xl min-w-[240px]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Industry Readiness</span>
                <span className="text-sm font-bold font-mono text-amber-400">
                  {matchPercentage}% Match
                </span>
              </div>
              <Progress
                value={matchPercentage}
                className="bg-white/20 h-2"
                indicatorClassName={
                  matchPercentage > 75
                    ? "bg-emerald-400"
                    : matchPercentage > 50
                    ? "bg-amber-400"
                    : "bg-orange-500"
                }
              />
              <p className="text-[10px] text-slate-400 mt-2">
                {matchPercentage >= 80
                  ? "High interview call probability in Chakan & Hinjewadi!"
                  : "Bridge 2-3 specific modules to unlock guaranteed placements."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================================== */}
      {/* 🚀 AI SKILL & CURRICULUM GAP INTELLIGENCE (FEATURES 1, 2, 3) */}
      {/* ============================================================== */}
      <div className="space-y-4">
        {/* Controls Card: Course, District & User Skills Input */}
        <Card className="bg-white border border-slate-200/90 shadow-xs overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 via-indigo-50/30 to-purple-50/30 border-b border-slate-200/70 pb-3.5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                    <Target className="w-4 h-4" />
                  </span>
                  <CardTitle className="text-base text-slate-900 font-bold">
                    Student Skill Gap & Curriculum Intelligence
                  </CardTitle>
                  <Badge className="bg-indigo-100 text-indigo-800 text-[10px] font-semibold border-indigo-200">
                    Live NLP Engine
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  Cross-referencing your course syllabus & skill profile with real-time employer postings from <code className="font-mono text-[11px] text-indigo-800 bg-indigo-50 px-1 py-0.5 rounded">data/processed/parsed_skills.json</code>
                </CardDescription>
              </div>

              {/* Course Selector Dropdown */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Enrolled Course:</span>
                <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 ml-1" />
                  <select
                    value={candidateCourse}
                    onChange={(e) => setCandidateCourse(e.target.value)}
                    className="text-xs font-semibold bg-transparent border-0 text-slate-800 focus:outline-none pr-2 cursor-pointer"
                  >
                    {AVAILABLE_COURSES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-5 space-y-4">
            {/* Student Current Skills Input & Chips */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  Your Current Acquired Skills ({candidateSkills.length}):
                </label>
                <span className="text-[11px] text-slate-400">
                  Click a skill to remove • Type or click suggestions below to add
                </span>
              </div>

              {/* Active Skill Tags */}
              <div className="flex flex-wrap items-center gap-1.5 min-h-[42px] p-2 bg-slate-50 rounded-xl border border-slate-200 mb-2.5">
                {candidateSkills.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => handleRemoveSkill(skill)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 hover:bg-red-100 hover:text-red-700 cursor-pointer transition-colors group"
                    title="Click to remove"
                  >
                    <span>{skill}</span>
                    <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </span>
                ))}

                {/* Input for new skill */}
                <div className="flex items-center gap-1 ml-auto">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(newSkillInput);
                      }
                    }}
                    placeholder="+ Add custom skill..."
                    className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 w-36"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddSkill(newSkillInput)}
                    disabled={!newSkillInput.trim()}
                    className="h-7 px-2 text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Quick Suggestions Chips from 80+ Catalog */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500 pt-1">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-semibold text-slate-700 mr-1">Suggested tools:</span>
                  {COMPREHENSIVE_SKILLS_CATALOG.filter(
                    (s) => !candidateSkills.some((cs) => cs.toLowerCase() === s.name.toLowerCase())
                  )
                    .slice(0, 10)
                    .map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => handleAddSkill(s.name)}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 text-slate-600 transition-colors"
                      >
                        + {s.name}
                      </button>
                    ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-purple-700 font-semibold hover:underline flex items-center gap-1 shrink-0 text-[11px] ml-auto sm:ml-0"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  Browse 80+ Catalog →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ============================================================== */}
        {/* FEATURE 2: COURSE GAP ALERT                                   */}
        {/* ============================================================== */}
        {candidateAnalysis?.course_gap_alert && (
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border-2 border-amber-400/80 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      Feature 2 • Course Gap Alert
                    </Badge>
                    <span className="text-xs text-amber-800 font-medium">
                      Curriculum Verification: {candidateAnalysis.course_gap_alert.course_name}
                    </span>
                  </div>

                  {/* Core Alert Message */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
                    <span>{candidateAnalysis.course_gap_alert.alert_message}</span>
                  </h3>

                  {/* Detailed Explanation */}
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    {candidateAnalysis.course_gap_alert.detailed_contrast}
                  </p>

                  {/* Missing Tools vs Taught Modules Tags */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      Critical Market Tools Missing in Syllabus:
                    </span>
                    {candidateAnalysis.course_gap_alert.essential_missing_tools.map((tool) => (
                      <span
                        key={tool.skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-800 border border-red-200"
                      >
                        <span>{tool.skill}</span>
                        <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-white text-red-700">
                          {tool.frequency} postings
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-start md:self-center">
                <Button
                  size="sm"
                  onClick={() => {
                    const firstMissing = candidateAnalysis.course_gap_alert.essential_missing_tools[0]?.skill;
                    if (firstMissing) handleAddSkill(firstMissing);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Missing Tools to My Plan
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Split: Feature 1 (Gapped Skill Knowledge) & Feature 3 (Future Skill Prediction) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ============================================================== */}
          {/* FEATURE 1: GAPPED SKILL KNOWLEDGE (7 Columns)                 */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-white border border-slate-200/90 shadow-xs h-full flex flex-col justify-between">
              <div>
                <CardHeader className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <CardTitle className="text-base text-slate-900 font-bold">
                          Gapped Skill Knowledge Analyzer
                        </CardTitle>
                        <Badge className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold border-emerald-200">
                          Feature 1
                        </Badge>
                      </div>
                      <CardDescription className="text-xs text-slate-500 mt-1">
                        Filtered by <strong className="text-slate-800">{selectedDistrict === "All Districts" ? "Pune & Maharashtra" : selectedDistrict}</strong> • Aggregated from active employer postings
                      </CardDescription>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Market Readiness</span>
                      <span className="text-base font-bold font-mono text-emerald-600">
                        {candidateAnalysis?.gapped_skill_knowledge?.readiness_score || 0}%
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 space-y-4">
                  {/* Part A: Matched Skills (user_skills ∩ employer_demanded_skills) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Matched Market Competencies (user_skills ∩ employer_demanded):
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {candidateAnalysis?.gapped_skill_knowledge?.matched_skills?.length || 0} skills aligned
                      </span>
                    </div>

                    {candidateAnalysis?.gapped_skill_knowledge?.matched_skills && candidateAnalysis.gapped_skill_knowledge.matched_skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {candidateAnalysis.gapped_skill_knowledge.matched_skills.map((item) => (
                          <div
                            key={item.skill}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.skill}</span>
                            <span className="text-[10px] font-mono bg-white px-1.5 py-0.2 rounded text-emerald-700 border border-emerald-100">
                              {item.frequency} jobs
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        No overlap yet between your skills and top employer requirements. Click suggested skills below to bridge the gap!
                      </p>
                    )}
                  </div>

                  {/* Part B: Deficit (The Gap): employer_demanded_skills - user_skills (sorted by count) */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-orange-600" />
                        Deficit Skills (The Gap: employer_demanded - user_skills):
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Ranked by hiring frequency
                      </span>
                    </div>

                    <div className="space-y-2">
                      {candidateAnalysis?.gapped_skill_knowledge?.deficit_skills?.slice(0, 6).map((item, idx) => (
                        <div
                          key={item.skill}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-orange-300 transition-all"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-orange-100 text-orange-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                              #{idx + 1}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">
                                {item.skill}
                              </h4>
                              <span className="text-[10px] text-slate-500">
                                Demanded in <strong className="text-slate-800 font-mono">{item.frequency}</strong> postings ({item.marketSharePercent}% of cluster)
                              </span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddSkill(item.skill)}
                            className="text-[11px] h-7 px-2.5 bg-white hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 text-slate-700"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Acquire Skill
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* ============================================================== */}
          {/* FEATURE 3: FUTURE SKILL PREDICTION (5 Columns)                */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-white border border-slate-200/90 shadow-xs h-full flex flex-col justify-between">
              <div>
                <CardHeader className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                      <Zap className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base text-slate-900 font-bold">
                          Future Skill Prediction
                        </CardTitle>
                        <Badge className="bg-purple-50 text-purple-700 text-[10px] font-semibold border-purple-200">
                          Feature 3
                        </Badge>
                      </div>
                      <CardDescription className="text-xs text-slate-500">
                        Higher-tier emerging tech in Maharashtra industrial clusters
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 space-y-3.5">
                  {candidateAnalysis?.future_skill_predictions?.slice(0, 3).map((pred) => (
                    <div
                      key={pred.badge}
                      className="p-3.5 rounded-xl border border-purple-200/80 bg-gradient-to-r from-purple-50/50 to-indigo-50/30 hover:border-purple-300 transition-all space-y-2"
                    >
                      {/* Prediction Badge */}
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0"></span>
                        <div className="flex-1">
                          <p className="text-xs font-extrabold text-purple-950 leading-snug">
                            {pred.badge}
                          </p>
                        </div>
                      </div>

                      {/* Cluster & Impact Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <Badge variant="outline" className="text-[10px] bg-white text-slate-700 border-slate-200">
                          📍 {pred.cluster.split("&")[0]}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
                          📈 {pred.advantage}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-800 border-amber-200">
                          💰 {pred.salary_premium}
                        </Badge>
                      </div>

                      {/* Rationale */}
                      <p className="text-[11px] text-slate-600 italic leading-normal">
                        "{pred.reason}"
                      </p>
                    </div>
                  ))}
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 💼 LIVE JOB OPENINGS MATCHING TARGET CAREER & SKILLS            */}
      {/* ============================================================== */}
      <div id="live-postings-section" className="space-y-4">
        {/* ============================================================== */}
        {/* 🔔 SMART NEAR-MATCH (ALMOST MATCH) NOTIFICATION ALERT BANNER   */}
        {/* ============================================================== */}
        {showNearMatchBanner && nearMatchJobs.length > 0 && (
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-indigo-500/10 border-2 border-amber-400/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
            <button
              onClick={() => setShowNearMatchBanner(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-6">
              <div className="flex items-start gap-3.5">
                <div className="relative p-2.5 rounded-2xl bg-amber-500 text-white shadow-xs shrink-0 mt-0.5">
                  <Bell className="w-5 h-5 animate-bounce" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      🔔 Near-Match Opportunity Alert
                    </Badge>
                    <span className="text-xs font-bold text-amber-800">
                      Found {nearMatchJobs.length} Openings Matching 50%–84% of Requirements
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Almost a Match? Apply anyway! Employers sponsor on-the-job training.
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                    Industrial hiring data across <strong>{studentProfile.preferredDistrict || selectedDistrict}</strong> shows that 82% of manufacturers and tech firms accept candidates with strong core prerequisites and provide on-site orientation for secondary tools. <em>You can learn the missing skills later while earning!</em>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <Button
                  size="sm"
                  onClick={() => setJobPlatformFilter("AlmostMatch")}
                  className={`text-xs font-bold shadow-xs whitespace-nowrap ${
                    jobPlatformFilter === "AlmostMatch"
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-amber-600 hover:bg-amber-700 text-white"
                  }`}
                >
                  ⚡ View {nearMatchJobs.length} Almost Matches
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Postings Filter & Controls Bar */}
        <div className="flex flex-col space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <Briefcase className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Live Job Openings & Vacancies ({filteredJobsList.length})
                    </h3>
                    <Badge className="bg-blue-100 text-blue-800 text-[10px] font-semibold border-blue-200">
                      LinkedIn & Trending Portals
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real vacancies aggregated from LinkedIn, Naukri.com, and Indeed matched against <strong className="text-slate-800">{candidateRole.roleTitle}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  placeholder="Filter by role, company, or tool..."
                  className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Platform & Near Match Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setJobPlatformFilter("All")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                jobPlatformFilter === "All"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Openings ({liveJobs.length})
            </button>

            <button
              type="button"
              onClick={() => setJobPlatformFilter("AlmostMatch")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                jobPlatformFilter === "AlmostMatch"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <span>⚡ Almost Matches</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-200/80 text-amber-950 font-bold text-[10px]">
                {nearMatchJobs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setJobPlatformFilter("LinkedIn")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                jobPlatformFilter === "LinkedIn"
                  ? "bg-[#0A66C2] text-white shadow-2xs"
                  : "bg-blue-50 text-[#0A66C2] border border-blue-200 hover:bg-blue-100"
              }`}
            >
              <span className="font-bold">in</span>
              <span>LinkedIn Jobs</span>
            </button>

            <button
              type="button"
              onClick={() => setJobPlatformFilter("Naukri")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                jobPlatformFilter === "Naukri"
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100"
              }`}
            >
              <span>Naukri.com</span>
            </button>

            <button
              type="button"
              onClick={() => setJobPlatformFilter("Indeed")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                jobPlatformFilter === "Indeed"
                  ? "bg-purple-600 text-white shadow-2xs"
                  : "bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100"
              }`}
            >
              <span>Indeed</span>
            </button>

            <button
              type="button"
              onClick={() => setJobPlatformFilter("Internshala")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                jobPlatformFilter === "Internshala"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <span>Internshala</span>
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(showAllJobs ? filteredJobsList : filteredJobsList.slice(0, 6)).map((job, idx) => {
            const detected = job.skills_detected || [];
            const matchingSkills = detected.filter((s) =>
              candidateSkills.some((cs) => cs.toLowerCase() === s.toLowerCase())
            );
            const deficitSkills = detected.filter(
              (s) => !candidateSkills.some((cs) => cs.toLowerCase() === s.toLowerCase())
            );
            const matchScore =
              detected.length > 0
                ? Math.round((matchingSkills.length / detected.length) * 100)
                : 50;

            const isNearMatch = matchScore >= 45 && matchScore < 85;

            // Direct external search query URLs
            const queryCity = job.city || "Pune";
            const linkedInSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
              job.job_title + " " + queryCity
            )}`;
            const targetApplyUrl =
              job.apply_link && job.apply_link !== "#" ? job.apply_link : linkedInSearchUrl;

            return (
              <Card
                key={job.job_id || idx}
                className={`bg-white border shadow-xs hover:shadow-sm transition-all flex flex-col justify-between ${
                  isNearMatch
                    ? "border-amber-300 ring-1 ring-amber-200/60"
                    : "border-slate-200/90 hover:border-blue-300"
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  {/* Top Badges: Platform and Match % */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Platform Badge */}
                      {job.platform === "LinkedIn" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20">
                          <span className="font-extrabold text-[11px]">in</span>
                          <span>LinkedIn</span>
                        </span>
                      ) : job.platform === "Naukri" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <span>Naukri</span>
                        </span>
                      ) : job.platform === "Internshala" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span>Internshala</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <span>Indeed</span>
                        </span>
                      )}

                      {/* Match Badge */}
                      <Badge
                        className={`text-[10px] font-bold py-0.5 ${
                          matchScore >= 80
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : isNearMatch
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {isNearMatch ? `⚡ ${matchScore}% Almost Match` : `${matchScore}% Match`}
                      </Badge>
                    </div>

                    <span className="text-[11px] text-slate-500 font-medium shrink-0">
                      📍 {job.city || "Pune"}
                    </span>
                  </div>

                  {/* Job Title and Employer */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {job.job_title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600 line-clamp-1 mt-0.5">
                      {job.employer}
                    </p>

                    {/* Salary & Recency */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1">
                      {job.salary_range && (
                        <span className="font-semibold text-emerald-700">
                          💰 {job.salary_range}
                        </span>
                      )}
                      {job.work_mode && (
                        <span>• {job.work_mode}</span>
                      )}
                      <span>• {job.posted_at || "Recent"}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {job.description_snippet}
                    </p>
                  </div>

                  {/* Near-Match Advice Callout */}
                  {isNearMatch && deficitSkills.length > 0 && (
                    <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-2 text-[11px] text-amber-900 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-amber-800">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Learn Later Advice:</span>
                      </div>
                      <p className="leading-snug">
                        Missing only <strong className="underline">{deficitSkills.slice(0, 2).join(", ")}</strong>. You have core skills verified—employers provide on-the-job training for this role.
                      </p>
                    </div>
                  )}

                  {/* Matching vs Deficit Skill Chips */}
                  <div className="space-y-1.5 pt-1">
                    {matchingSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 text-[10px]">
                        <span className="text-emerald-700 font-semibold">Matched:</span>
                        {matchingSkills.map((s) => (
                          <span
                            key={s}
                            className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-medium"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {deficitSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 text-[10px]">
                        <span className="text-orange-700 font-semibold">Missing:</span>
                        {deficitSkills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="bg-orange-50 text-orange-800 border border-orange-200 px-1.5 py-0.5 rounded font-medium"
                          >
                            + {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Apply Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={targetApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                    >
                      <span>Apply on {job.platform || "Portal"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={linkedInSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-slate-200 hover:border-blue-400 rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
                      title="Search similar vacancies on LinkedIn"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Show More / Show Fewer Postings */}
        {filteredJobsList.length > 6 && (
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllJobs((prev) => !prev)}
              className="text-xs bg-white text-slate-700 border-slate-200 hover:border-slate-300"
            >
              {showAllJobs
                ? "Show Fewer Postings"
                : `View All ${filteredJobsList.length} Job Postings`}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. SKILL GAP ANALYZER & RADAR CHART (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Competency Benchmark Radar
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Comparing your current verified skills against top employer hiring thresholds in Maharashtra
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs bg-slate-50">
                  Recharts Radar
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Radar Chart Container */}
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dynamicRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar
                      name="Employer Market Benchmark"
                      dataKey="MarketStandard"
                      stroke="#0F172A"
                      fill="#0F172A"
                      fillOpacity={0.15}
                    />
                    <Radar
                      name="Your Current Level"
                      dataKey="YourScore"
                      stroke="#F97316"
                      fill="#F97316"
                      fillOpacity={0.4}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "0.75rem",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "5px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Interactive Self-Assessment Sliders */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-600" />
                    Interactive Skill Self-Tuning (Test Your Readiness)
                  </span>
                  <span className="text-[11px] text-slate-400">Drag to adjust score</span>
                </div>

                <div className="space-y-3">
                  {candidateRole.requiredSkills.map((s) => {
                    const currentVal =
                      userSkillLevels[s.name] !== undefined
                        ? userSkillLevels[s.name]
                        : s.candidateLevel;
                    return (
                      <div key={s.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">{s.name}</span>
                          <span className="font-mono text-slate-600">
                            {currentVal}% / Required:{" "}
                            <strong className="text-slate-900">{s.requiredLevel}%</strong>
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={currentVal}
                          onChange={(e) => handleSkillChange(s.name, Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. COURSE RECOMMENDER (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Curated Courses & Academies
              </h3>
              <p className="text-xs text-slate-500">
                Govt ITIs, Private Industry Centres & Online Bootcamps
              </p>
            </div>
          </div>

          {/* Provider Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            {(["All", "Government ITI", "Private Industry Academy", "Online Bootcamp"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setCourseFilterTab(tab)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  courseFilterTab === tab
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === "All"
                  ? `All (${candidateRole.matchedCourses.length})`
                  : tab === "Government ITI"
                  ? "🏛️ Govt ITI"
                  : tab === "Private Industry Academy"
                  ? "🏢 Industry Academy"
                  : "🌐 Online Bootcamp"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {displayedCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              const isGovt = (course.providerType || "Government ITI") === "Government ITI";
              const isPvt = course.providerType === "Private Industry Academy";
              const isOnline = course.providerType === "Online Bootcamp";

              return (
                <Card
                  key={course.id}
                  className="bg-white border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold ${
                            isGovt
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : isPvt
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {isGovt ? "🏛️ Govt ITI" : isPvt ? "🏢 Private Academy" : "🌐 Online Bootcamp"}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-800 border-blue-200">
                          NSFQ L{course.nsfqLevel}
                        </Badge>
                      </div>

                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {course.placementRate}% Placement
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {course.institute} • {course.district}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Duration & Mode</span>
                        <span className="font-semibold text-slate-700">{course.duration}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">
                          {isGovt ? "DBT Stipend" : "Fee / Scholarship"}
                        </span>
                        <span className="font-bold text-emerald-700 font-mono">
                          {course.feeStructure || (course.stipendMonthly > 0 ? `₹${course.stipendMonthly.toLocaleString()} / mo` : "Scholarship Available")}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span>Key recruiters: </span>
                      <strong className="text-slate-700">
                        {course.topHiringCompanies.join(", ")}
                      </strong>
                    </div>

                    <div className="pt-1">
                      {isEnrolled ? (
                        <div className="w-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Application Submitted (Hall Ticket #MS-8842)
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className={`w-full text-white text-xs font-semibold flex items-center justify-center gap-1.5 ${
                            isGovt
                              ? "bg-slate-900 hover:bg-slate-800"
                              : isPvt
                              ? "bg-purple-700 hover:bg-purple-800"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={() => handleOpenEnrollModal(course)}
                        >
                          <span>
                            {isGovt
                              ? "Apply for Free Govt Seat"
                              : isPvt
                              ? "Apply for Academy Scholarship"
                              : "Enroll in Online Bootcamp"}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Maharashtra Student Scheme Note */}
          <Card className="bg-orange-50/50 border-orange-200 shadow-2xs">
            <CardContent className="p-3.5 text-xs text-orange-950 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
              <div>
                <strong>Direct Benefit Transfer (DBT):</strong> Trainees enrolling in high-demand trades flagged by MahaSkill AI receive 100% tuition subsidy and monthly direct bank transfer stipends under the Maharashtra State Innovation Society Skill Voucher scheme.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Enrollment Confirmation Dialog */}
      {selectedCourseForModal && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogHeader>
            <DialogTitle>Confirm Free Government ITI Admission</DialogTitle>
            <DialogDescription>
              Government of Maharashtra Vocational Training Portal (DVET)
            </DialogDescription>
          </DialogHeader>
          <DialogContent className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block uppercase font-semibold">
                Selected Course
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {selectedCourseForModal.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                {selectedCourseForModal.institute} ({selectedCourseForModal.district})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">Stipend via Aadhaar DBT</span>
                <span className="text-sm font-bold text-emerald-900 font-mono">
                  ₹{selectedCourseForModal.stipendMonthly} / Month
                </span>
              </div>
              <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-[10px] text-blue-700 block">Placement Guarantee</span>
                <span className="text-sm font-bold text-blue-900 font-mono">
                  {selectedCourseForModal.placementRate}% Track Record
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
              <p className="font-semibold text-slate-800">What happens next?</p>
              <p>1. Instant SMS confirmation with your DVET application registration number.</p>
              <p>2. Document verification at the nearest District Skill Development Office (DSDO).</p>
              <p>3. Direct apprentice onboarding interview with partner industrial firms.</p>
            </div>
          </DialogContent>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-800"
              onClick={handleConfirmEnrollment}
            >
              Confirm Admission
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};
