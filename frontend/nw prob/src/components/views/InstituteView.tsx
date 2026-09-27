"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { SYLLABUS_DIFF_DATA, SyllabusDiffItem } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Progress } from "@/components/ui/Progress";
import {
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Wrench,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Building,
  ShieldCheck,
  FileText,
  Share2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export const InstituteView: React.FC = () => {
  const {
    selectedTradeDiff,
    setSelectedTradeDiff,
    appliedPatches,
    applyPatch,
    showToast,
    backendConnected,
    liveGapData,
    fetchTradeGapAnalysis,
    isLoadingBackend,
  } = useApp();


  const [activeTab, setActiveTab] = useState<"diff" | "infrastructure" | "trainers">("diff");
  const [nominatedTrainers, setNominatedTrainers] = useState<Record<string, boolean>>({});

  const currentTrade: SyllabusDiffItem =
    SYLLABUS_DIFF_DATA.find((item) => item.id === selectedTradeDiff) || SYLLABUS_DIFF_DATA[0];

  const isPatched = appliedPatches.includes(currentTrade.id);

  const handleNominateTrainer = (moduleName: string) => {
    setNominatedTrainers((prev) => ({ ...prev, [moduleName]: true }));
    showToast(`2 Senior Instructors nominated for "${moduleName}"! DVET sponsorship voucher generated.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <GitCompare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Curriculum Translation & LMI Diff Engine
              </h2>
              <p className="text-xs text-slate-500">
                Institutional Portal • Government ITIs & Autonomous Polytechnics of Maharashtra
              </p>
            </div>
          </div>
        </div>

        {/* Trade Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Active Trade:</span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {SYLLABUS_DIFF_DATA.map((trade) => (
              <button
                key={trade.id}
                onClick={() => setSelectedTradeDiff(trade.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTradeDiff === trade.id
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {trade.tradeCode.replace("ITI-", "")}
              </button>
            ))}
          </div>

          <Button
            variant={isPatched ? "secondary" : "default"}
            size="sm"
            onClick={() => applyPatch(currentTrade.id)}
            className={`text-xs flex items-center gap-1.5 ${
              isPatched
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isPatched ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Patch Active in DVET
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Apply AI Patch to Syllabus
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Trade Overview Card */}
      <Card className="bg-slate-900 text-white border-0 shadow-md">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-400/10 text-xs">
                  {currentTrade.tradeCode}
                </Badge>
                <span className="text-xs text-slate-400">{currentTrade.department}</span>
                <span className="text-xs text-slate-500">• {currentTrade.duration}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {currentTrade.tradeName}
              </h3>
            </div>

            {/* Alignment Score Meter */}
            <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-3.5 rounded-xl">
              <div>
                <span className="text-[11px] text-slate-400 block">Baseline Match</span>
                <span className="text-lg font-bold font-mono text-red-400">
                  {currentTrade.currentMatchRate}%
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-[11px] text-emerald-400 block font-medium">With AI Patch</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {currentTrade.projectedMatchRate}%
                </span>
              </div>
              <div className="pl-3 border-l border-white/10 hidden sm:block">
                <span className="text-[10px] text-slate-400 block">Industry Gap Closed</span>
                <span className="text-xs font-bold text-amber-400">
                  +{currentTrade.projectedMatchRate - currentTrade.currentMatchRate}% Synergy
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Python Gap Engine Card */}
      {liveGapData && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-4 md:p-5 shadow-sm border border-blue-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-blue-800/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Live Python Gap Engine (SIH26134 Core Pipeline)
              </span>
              <Badge className="bg-blue-800 text-blue-200 text-[10px] py-0 border-0">
                FastAPI :8000
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-blue-200">
                Postings Ingested: <strong className="text-white font-mono">{liveGapData.total_jobs_analyzed}</strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchTradeGapAnalysis(selectedTradeDiff)}
                disabled={isLoadingBackend}
                className="text-xs bg-blue-950/60 border-blue-700 text-blue-200 hover:text-white hover:bg-blue-900 h-7 px-2.5"
              >
                {isLoadingBackend ? "Syncing..." : "↻ Recalculate Live Gap"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-blue-950/50 p-3 rounded-xl border border-blue-800/40">
              <span className="text-[11px] font-semibold text-rose-300 block mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> High-Demand Industry Skills Missing in Curriculum:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {liveGapData.missing_in_curriculum.slice(0, 8).map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-200 border border-rose-500/30 text-[11px]"
                  >
                    <span>{m.skill}</span>
                    <span className="bg-rose-900/60 px-1 rounded text-[10px] text-rose-300 font-mono">
                      {m.frequency} jobs
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-950/50 p-3 rounded-xl border border-blue-800/40">
              <span className="text-[11px] font-semibold text-emerald-300 block mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Aligned Technical Topics Currently Covered:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {liveGapData.covered_in_curriculum.length > 0 ? (
                  liveGapData.covered_in_curriculum.map((c, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-[11px]"
                    >
                      <span>{c.skill}</span>
                      <span className="bg-emerald-900/60 px-1 rounded text-[10px] text-emerald-300 font-mono">
                        {c.frequency} jobs
                      </span>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic">No direct overlap detected with legacy modules</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIONABLE ALERT BANNER */}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 border-2 border-orange-300 p-4 md:p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500 text-white shrink-0 mt-0.5 shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
                Actionable LMI Intelligence Alert
              </span>
              <Badge variant="saffron" className="text-[10px] py-0 px-2">
                High Priority
              </Badge>
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-snug">
              {currentTrade.actionableAlert}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="accent"
                className="text-xs bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => applyPatch(currentTrade.id)}
              >
                {isPatched ? "Review Revision Details" : "Accept & Apply Patch to Current Cohort"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs bg-white text-slate-700 border-orange-200 hover:bg-orange-100/50"
                onClick={() => showToast("Curriculum amendment memo forwarded to DVET Steering Board.")}
              >
                Send to Academic Council
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Diff vs Infrastructure vs Trainers */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="bg-slate-200/80 p-1 w-full sm:w-auto flex">
          <TabsTrigger value="diff" className="flex-1 sm:flex-initial flex items-center gap-2">
            <GitCompare className="w-4 h-4" />
            <span>The "Diff" Viewer</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-slate-300/60">
              Core
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="flex-1 sm:flex-initial flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span>Hardware & Lab Needs</span>
            <span className="text-xs text-slate-400">({currentTrade.infrastructureRequired.length})</span>
          </TabsTrigger>
          <TabsTrigger value="trainers" className="flex-1 sm:flex-initial flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Trainer Upskilling Paths</span>
            <span className="text-xs text-slate-400">({currentTrade.trainerUpskilling.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. THE CRITICAL "DIFF" VIEWER */}
        <TabsContent value="diff">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE: Current Syllabus (Outdated) */}
            <Card className="border-red-200 bg-white shadow-xs">
              <CardHeader className="bg-red-50/70 border-b border-red-100 rounded-t-xl py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <div>
                      <CardTitle className="text-sm font-bold text-red-950">
                        Current Syllabus (Static DGET 2018 Scheme)
                      </CardTitle>
                      <CardDescription className="text-[11px] text-red-700">
                        Flagged for obsolescence based on regional hiring data
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-[11px]">
                    {currentTrade.outdatedModules.length} Modules Flagged
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                {currentTrade.outdatedModules.map((mod) => (
                  <div
                    key={mod.code}
                    className="p-3.5 rounded-xl border border-red-200 bg-red-50/30 hover:bg-red-50/60 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-600">
                          {mod.code}
                        </span>
                        <Badge variant="deprecate">{mod.deprecationTag}</Badge>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {mod.hours} Hrs
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 line-through decoration-red-500 decoration-2">
                      {mod.title}
                    </h4>

                    <div className="mt-2 text-xs text-red-800 bg-red-100/60 p-2 rounded-lg flex items-start gap-1.5">
                      <span className="font-bold text-red-600">Why remove:</span>
                      <span>{mod.reason}</span>
                    </div>
                  </div>
                ))}

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Total hours spent on flagged skills:</span>
                  <span className="font-bold font-mono text-red-600">
                    {currentTrade.outdatedModules.reduce((acc, m) => acc + m.hours, 0)} Hours
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* RIGHT SIDE: Curriculum Patch (Industry Demand) */}
            <Card className="border-emerald-200 bg-white shadow-xs">
              <CardHeader className="bg-emerald-50/70 border-b border-emerald-100 rounded-t-xl py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <div>
                      <CardTitle className="text-sm font-bold text-emerald-950">
                        Curriculum Patch (MahaSkill LMI Real-time Feed)
                      </CardTitle>
                      <CardDescription className="text-[11px] text-emerald-700">
                        Dynamically formulated from active industry job postings & employer pulse
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="highDemand" className="text-[11px]">
                    {currentTrade.patchModules.length} Modules Recommended
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                {currentTrade.patchModules.map((mod) => (
                  <div
                    key={mod.code}
                    className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-800">
                          {mod.code}
                        </span>
                        <Badge
                          variant={
                            mod.tag === "Critical Skill"
                              ? "critical"
                              : mod.tag === "Emerging Tech"
                              ? "saffron"
                              : "highDemand"
                          }
                        >
                          {mod.tag}
                        </Badge>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {mod.hours} Hrs
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{mod.title}</h4>

                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {mod.industryDemandPercent}% employers requesting
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Partners: {mod.leadEmployers.slice(0, 2).join(", ")}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-slate-700 flex items-center justify-between">
                  <span>Total hours allocated in revised patch:</span>
                  <span className="font-bold font-mono text-emerald-700">
                    {currentTrade.patchModules.reduce((acc, m) => acc + m.hours, 0)} Hours
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. INFRASTRUCTURE & LAB NEEDS */}
        <TabsContent value="infrastructure">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-500" />
                Lab Infrastructure & Tooling Requirements for Revised Modules
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Mandatory equipment and software licenses needed to deliver the modernized syllabus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentTrade.infrastructureRequired.map((infra, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            infra.urgency === "Immediate"
                              ? "destructive"
                              : infra.urgency === "Within 60 Days"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {infra.urgency}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          Status:{" "}
                          <strong className="text-slate-800">{infra.status}</strong>
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900">{infra.item}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Est. Cost</span>
                        <span className="text-sm font-bold font-mono text-slate-900">
                          {infra.estimatedCost}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() =>
                          showToast(`Capital grant application for "${infra.item}" initiated under MSInS Modernization Fund!`)
                        }
                      >
                        Apply for Grant
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. TRAINER UPSKILLING PATHS */}
        <TabsContent value="trainers">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Faculty Upskilling & Master Trainer Certifications
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Government-funded "Train-the-Trainer" certifications in partnership with industry leaders and technical universities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentTrade.trainerUpskilling.map((trainer, idx) => {
                  const isNominated = nominatedTrainers[trainer.module];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Partner: {trainer.partner}
                          </span>
                          <span className="text-xs text-slate-500">
                            • Duration: {trainer.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{trainer.module}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Target quota: <strong>{trainer.certifiedTrainersNeeded} instructors</strong> across district ITIs
                        </p>
                      </div>

                      <div>
                        {isNominated ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" /> Faculty Nominated
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-xs bg-slate-900 text-white hover:bg-slate-800"
                            onClick={() => handleNominateTrainer(trainer.module)}
                          >
                            Nominate Instructors
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
