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
} from "lucide-react";
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

export const CandidateView: React.FC = () => {
  const {
    candidateRole,
    setCandidateRoleId,
    enrolledCourses,
    enrollInCourse,
    showToast,
  } = useApp();

  const [selectedCourseForModal, setSelectedCourseForModal] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

        {/* Role Pathway Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Target Career:</span>
          <select
            value={candidateRole.id}
            onChange={(e) => {
              setCandidateRoleId(e.target.value);
              setUserSkillLevels({});
            }}
            className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {CANDIDATE_CAREER_PATHS.map((p) => (
              <option key={p.id} value={p.id}>
                🎯 {p.roleTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Recommended Govt Courses
              </h3>
              <p className="text-xs text-slate-500">
                High placement probability & government stipend programs
              </p>
            </div>
            <Badge variant="success" className="text-[11px]">
              Govt Sponsored
            </Badge>
          </div>

          <div className="space-y-4">
            {candidateRole.matchedCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              return (
                <Card
                  key={course.id}
                  className="bg-white border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-800 border-blue-200">
                        NSFQ Level {course.nsfqLevel}
                      </Badge>
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
                        <span className="text-[10px] text-slate-400 block">Duration</span>
                        <span className="font-semibold text-slate-700">{course.duration}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">DBT Stipend</span>
                        <span className="font-bold text-emerald-700 font-mono">
                          ₹{course.stipendMonthly.toLocaleString()} / mo
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
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                          onClick={() => handleOpenEnrollModal(course)}
                        >
                          <span>Apply for Free Govt Seat</span>
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
