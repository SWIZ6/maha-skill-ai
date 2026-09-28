"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  DISTRICT_METRICS,
  CurriculumValidationCard,
  PulseSurveySubmission,
} from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import {
  Briefcase,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  CheckCircle2,
  Building2,
  MapPin,
  Clock,
  Plus,
  X,
  Send,
  HelpCircle,
  TrendingUp,
  Layers,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

export const EmployerView: React.FC = () => {
  const {
    pulseSubmissions,
    addPulseSubmission,
    validationCards,
    voteValidationCard,
    showToast,
  } = useApp();

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("Automotive & Electric Mobility");
  const [district, setDistrict] = useState("Pune");
  const [role, setRole] = useState("");
  const [openings, setOpenings] = useState(25);
  const [proficiency, setProficiency] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [timeline, setTimeline] = useState("Next 30 Days");
  const [skillInput, setSkillInput] = useState("");
  const [skillTags, setSkillTags] = useState<string[]>([
    "EV High Voltage Safety",
    "BMS Diagnostics",
  ]);

  // Card Swipe / Validation State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [votedCards, setVotedCards] = useState<Record<string, "approve" | "reject">>({});

  const popularSkillsBySector: Record<string, string[]> = {
    "Automotive & Electric Mobility": ["BMS Diagnostics", "CAN-bus", "EV Powertrain", "Thermal Systems", "OBD-II"],
    "Information Technology & Cloud": ["Node.js", "React/Next.js", "PostgreSQL", "Docker", "REST APIs", "AWS"],
    "Precision Manufacturing": ["5-Axis CNC", "Siemens Sinumerik", "CAD/CAM", "CMM Inspection", "GD&T"],
    "Renewable Energy & Solar": ["Solar PV Sizing", "Grid Inverters", "Net Metering", "Earthing & Safety"],
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skillTags.includes(trimmed)) {
      setSkillTags((prev) => [...prev, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (tag: string) => {
    setSkillTags((prev) => prev.filter((s) => s !== tag));
  };

  const handleSubmitPulse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !role.trim() || skillTags.length === 0) {
      showToast("Please provide company name, job role, and at least one key skill.");
      return;
    }

    addPulseSubmission({
      companyName,
      sector,
      district,
      role,
      skills: skillTags,
      openings: Number(openings),
      proficiencyRequired: proficiency,
      timeline,
    });

    // Reset some fields
    setRole("");
    setSkillTags(["Node.js", "Git"]);
  };

  const handleVote = (action: "approve" | "reject") => {
    const currentCard = validationCards[activeCardIndex];
    if (!currentCard) return;

    voteValidationCard(currentCard.id, action);
    setVotedCards((prev) => ({ ...prev, [currentCard.id]: action }));

    // Move to next card if available
    if (activeCardIndex < validationCards.length - 1) {
      setTimeout(() => {
        setActiveCardIndex((prev) => prev + 1);
      }, 400);
    }
  };

  const activeCard = validationCards[activeCardIndex];
  const userVoteOnActive = activeCard ? votedCards[activeCard.id] : undefined;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-50 text-orange-700">
              <Briefcase className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Employer Demand Sensing & Curriculum Validation
              </h2>
              <p className="text-xs text-slate-500">
                Industry Partnership Portal • Real-time hiring signals feeding the Maharashtra LMI
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-800 text-xs py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Direct Line to DVET Board
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. QUICK PULSE SURVEY FORM (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    Quick Pulse Hiring Survey
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Submit upcoming hiring requirements in 60 seconds to calibrate local ITI seat quotas
                  </CardDescription>
                </div>
                <Badge variant="saffron" className="text-[10px]">
                  LMI Signal
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-5">
              <form onSubmit={handleSubmitPulse} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / Employer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mahindra Electric, Persistent Systems"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  {/* Industry Sector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Industrial Sector *
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      <option value="Automotive & Electric Mobility">Automotive & Electric Mobility</option>
                      <option value="Information Technology & Cloud">Information Technology & Cloud</option>
                      <option value="Precision Manufacturing">Precision Manufacturing</option>
                      <option value="Renewable Energy & Solar">Renewable Energy & Solar</option>
                      <option value="Logistics & Warehousing Automation">Logistics & Automation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* District / Cluster */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hiring District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      {DISTRICT_METRICS.map((d) => (
                        <option key={d.id} value={d.district}>
                          {d.district}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Job Role */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Role / Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Junior EV Diagnostics Technician"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>

                {/* Skill Tag Adder */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Key Required Skills & Competencies *
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Type a skill (e.g. CAN-bus, React, G-Code) and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill(skillInput);
                        }
                      }}
                      className="flex-1 text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddSkill(skillInput)}
                      className="text-xs"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>

                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-50 rounded-lg border border-slate-200">
                    {skillTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-white text-slate-800 border border-slate-300 text-xs px-2.5 py-0.5 rounded-full font-medium shadow-2xs"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(tag)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {skillTags.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No skills added yet.</span>
                    )}
                  </div>

                  {/* Quick Skill Suggestions */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span>Quick suggestions:</span>
                    {(popularSkillsBySector[sector] || popularSkillsBySector["Automotive & Electric Mobility"]).map(
                      (quick) => (
                        <button
                          key={quick}
                          type="button"
                          onClick={() => handleAddSkill(quick)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          + {quick}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Openings Volume
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5000}
                      value={openings}
                      onChange={(e) => setOpenings(Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Proficiency Level
                    </label>
                    <select
                      value={proficiency}
                      onChange={(e) => setProficiency(e.target.value as any)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    >
                      <option value="Beginner">Entry Level (Trainee)</option>
                      <option value="Intermediate">Intermediate (Practical)</option>
                      <option value="Advanced">Advanced (Autonomous)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Timeframe
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    >
                      <option value="Immediate">Immediate (&lt; 15 Days)</option>
                      <option value="Next 30 Days">Next 30 Days</option>
                      <option value="Next 60 Days">Next 60 Days</option>
                      <option value="Q3 2026">Q3-Q4 2026 Cohort</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 py-2.5"
                  >
                    <Send className="w-4 h-4" />
                    Submit Demand Signal to Maharashtra LMI
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recent Submissions Feed */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="py-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Live Employer Pulse Feed (Recent Verified Submissions)
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  {pulseSubmissions.length} Registered Demands
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {pulseSubmissions.map((sub) => (
                  <div key={sub.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-slate-900">{sub.companyName}</span>
                        {sub.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        )}
                        <span className="text-[11px] text-slate-500">in {sub.district}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{sub.submittedAt}</span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <p className="text-xs font-medium text-slate-800">
                        {sub.role} •{" "}
                        <strong className="text-emerald-600 font-mono">
                          {sub.openings} Openings
                        </strong>
                      </p>
                      <Badge variant="secondary" className="text-[10px] py-0">
                        {sub.timeline}
                      </Badge>
                    </div>

                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {sub.skills.map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.2 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. VALIDATION INTERFACE (SWIPE / CARD ENDORSEMENT) (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border-0 shadow-lg relative overflow-hidden">
            {/* Background glowing aura */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <CardHeader className="pb-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Curriculum Patch Validation Deck
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-xs">
                    Validate proposed syllabus changes before DVET statewide rollout
                  </CardDescription>
                </div>
                <Badge className="bg-white/10 text-amber-300 border-white/20 text-xs">
                  Card {activeCardIndex + 1} of {validationCards.length}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              {activeCard ? (
                <div className="space-y-4">
                  {/* Card Main Info */}
                  <div className="bg-white/10 border border-white/15 p-4 rounded-xl backdrop-blur-md">
                    <span className="text-[11px] text-amber-400 font-semibold block mb-1">
                      {activeCard.trade}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {activeCard.proposedTitle}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {activeCard.rationale}
                    </p>

                    <div className="border-t border-white/10 pt-3">
                      <span className="text-[11px] font-semibold text-slate-300 block mb-1.5 uppercase tracking-wider">
                        Core Competencies Taught:
                      </span>
                      <ul className="space-y-1.5">
                        {activeCard.keyCompetencies.map((comp, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-200 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Industry validation score counter */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-xl">
                      <span className="text-lg font-bold font-mono text-emerald-400">
                        {activeCard.employerEndorsements}
                      </span>
                      <span className="text-[11px] text-emerald-300 block font-medium">
                        Employer Endorsements
                      </span>
                    </div>
                    <div className="bg-red-500/15 border border-red-500/30 p-2.5 rounded-xl">
                      <span className="text-lg font-bold font-mono text-red-400">
                        {activeCard.employerObjections}
                      </span>
                      <span className="text-[11px] text-red-300 block font-medium">
                        Revisions Requested
                      </span>
                    </div>
                  </div>

                  {/* Partners engaged */}
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Target Trainee Cohort: <strong>{activeCard.targetBatchSize} students</strong></span>
                    <span>Reviewers: {activeCard.industryPartners.slice(0, 2).join(", ")}</span>
                  </div>

                  {/* ACTION BUTTONS (SWIPE CONTROLS) */}
                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleVote("reject")}
                      className={`flex-1 border-red-400/50 text-red-300 hover:bg-red-500/20 hover:text-white transition-all text-xs font-semibold py-2.5 ${
                        userVoteOnActive === "reject" ? "bg-red-500/30 border-red-400" : "bg-transparent"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4 mr-1.5 text-red-400" />
                      Reject / Modify
                    </Button>

                    <Button
                      variant="default"
                      onClick={() => handleVote("approve")}
                      className={`flex-1 bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-semibold py-2.5 shadow-md ${
                        userVoteOnActive === "approve" ? "ring-2 ring-emerald-300" : ""
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1.5 text-white" />
                      Endorse & Validate
                    </Button>
                  </div>

                  {/* Card Switcher navigation */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                    <button
                      onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeCardIndex === 0}
                      className="flex items-center gap-1 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    <span>
                      {activeCardIndex + 1} of {validationCards.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveCardIndex((prev) => Math.min(validationCards.length - 1, prev + 1))
                      }
                      disabled={activeCardIndex === validationCards.length - 1}
                      className="flex items-center gap-1 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-white">All Cards Reviewed!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    You have validated all pending curriculum proposals for this cycle.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Validation Guidelines */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Building2 className="w-4 h-4 text-orange-500" />
                Industry Validation Protocol (DVET Maharashtra)
              </div>
              <p className="leading-relaxed">
                When 100+ registered Maharashtra employers endorse a syllabus patch, it qualifies for expedited notification under the Maharashtra State Skill Development Council without waiting for annual curriculum cycles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
