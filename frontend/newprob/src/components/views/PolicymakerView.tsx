"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  MACRO_STATS,
  DISTRICT_METRICS,
  DistrictMetric,
} from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import {
  TrendingUp,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  Zap,
  Cpu,
  Cog,
  Sun,
  CheckCircle,
  Building,
  ArrowUpRight,
  Filter,
  Download,
  IndianRupee,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const PolicymakerView: React.FC = () => {
  const {
    selectedDistrict,
    setSelectedDistrict,
    showToast,
    backendConnected,
    liveJobs,
    triggerJobIngestion,
    isLoadingBackend,
    backendHealth,
    refreshBackendData,
  } = useApp();
  const [allocationStatus, setAllocationStatus] = useState<Record<string, boolean>>({});
  const [queryInput, setQueryInput] = useState("CNC Operator OR Machinist in Pune, Maharashtra");


  const filteredDistricts =
    selectedDistrict === "All Districts"
      ? DISTRICT_METRICS
      : DISTRICT_METRICS.filter((d) => d.district.toLowerCase().includes(selectedDistrict.toLowerCase()));

  const chartData = DISTRICT_METRICS.map((d) => ({
    name: d.district,
    "Job Demand": d.demand,
    "Candidate Supply": d.supply,
    "Skill Gap": d.gap,
  }));

  const handleApproveBudget = (districtId: string, districtName: string) => {
    setAllocationStatus((prev) => ({ ...prev, [districtId]: true }));
    showToast(`FY 2026-27 Seat Reallocation & Budget for ${districtName} sanctioned by DVET Cabinet!`);
  };

  const getSectorIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 text-blue-600" />;
      case "Cog":
        return <Cog className="w-4 h-4 text-orange-600" />;
      case "Sun":
        return <Sun className="w-4 h-4 text-amber-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Building className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                State-wide Macro LMI Dashboard
              </h2>
              <p className="text-xs text-slate-500">
                Maharashtra Labor Market Intelligence & Technical Education Oversight
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast("Exporting Maharashtra LMI Annual Report (PDF)...")}
            className="text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export LMI Report
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => showToast("Refreshing live job board APIs (NCS, LinkedIn, Naukri)...")}
            className="text-xs bg-slate-900 text-white"
          >
            Live Sync
          </Button>
        </div>
      </div>

      {/* 1. KEY METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="border-l-4 border-l-blue-600 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
              <span>Total Active Job Postings</span>
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Briefcase className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
                {MACRO_STATS.activeJobPostings.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {MACRO_STATS.jobGrowthYoY}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Across 36 districts • Crawled from 42 job boards
            </p>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="border-l-4 border-l-emerald-600 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
              <span>State-wide Placement Rate</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <GraduationCap className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
                {MACRO_STATS.statewidePlacementRate}%
              </span>
              <span className="text-xs text-slate-500">Target: {MACRO_STATS.placementTarget}%</span>
            </div>
            <div className="mt-3">
              <Progress
                value={MACRO_STATS.statewidePlacementRate}
                indicatorClassName="bg-emerald-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="border-l-4 border-l-orange-500 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
              <span>Obsolescent Courses Flagged</span>
              <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-orange-600 font-mono">
                {MACRO_STATS.obsolescentCoursesCount} Trades
              </span>
              <Badge variant="deprecate">Action Needed</Badge>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              &lt; 30% placement rate in last 3 consecutive cohorts
            </p>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="border-l-4 border-l-purple-600 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
              <span>Apprenticeships & ITIs</span>
              <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                <Building className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
                {MACRO_STATS.totalITIs}
              </span>
              <span className="text-xs text-slate-500 font-medium">Govt + Pvt ITIs</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {MACRO_STATS.activeApprenticeships.toLocaleString()} dual-training trainees active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Emerging Sectors Banner */}
      <Card className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Top Emerging Sectors in Maharashtra (LMI Velocity)
              </CardTitle>
              <CardDescription className="text-slate-300 text-xs">
                Real-time job creation pace mapped to Maharashtra Industrial Development Corporation (MIDC) hubs
              </CardDescription>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Q3 2026 Expansion
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MACRO_STATS.topEmergingSectors.map((sector, i) => (
              <div
                key={sector.name}
                className="bg-white/5 border border-white/10 p-3.5 rounded-xl backdrop-blur-xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 rounded-lg bg-white/10">
                      {getSectorIcon(sector.icon)}
                    </span>
                    <span className="text-xs font-semibold text-white">{sector.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {sector.openings.toLocaleString()} openings
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {sector.growth}
                  </span>
                  <p className="text-[10px] text-slate-400">YoY Hiring</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* LIVE MARKET INGESTION & JOB FEED (PYTHON PIPELINE) */}
      <Card className="bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-slate-200/60 pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <CardTitle className="text-base text-slate-900 font-bold flex items-center gap-2">
                  Live Job Ingestion & Market Signals Radar
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-700 text-[10px] font-semibold py-0.5 border-blue-200">
                  RapidAPI + Python NLP
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-500 mt-1">
                Real-time job postings crawled into <code className="font-mono text-[11px] text-blue-800 bg-blue-50 px-1 py-0.5 rounded">data/raw/pune_jobs.json</code> & parsed by <code className="font-mono text-[11px] text-blue-800 bg-blue-50 px-1 py-0.5 rounded">src/extract_skills.py</code>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                Synced Postings: <strong className="text-slate-900 font-mono">{liveJobs.length || 10}</strong>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 space-y-4">
          {/* Query & Trigger Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <input
              type="text"
              aria-label="Job Search Query for RapidAPI"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="e.g. CNC Operator in Pune, Maharashtra or Fullstack Developer"
              className="flex-1 w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button
              size="sm"
              onClick={() => triggerJobIngestion(queryInput)}
              disabled={isLoadingBackend}
              className="w-full sm:w-auto text-xs bg-blue-600 hover:bg-blue-700 text-white shrink-0"
            >
              {isLoadingBackend ? "Ingesting Live Jobs..." : "Ingest Live Signals (RapidAPI)"}
            </Button>
          </div>

          {/* Job Postings Grid */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Recently Ingested Industry Postings with Detected Skills:</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {liveJobs.length} records verified
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {(liveJobs.length > 0 ? liveJobs : []).slice(0, 8).map((job, idx) => (
                <div
                  key={job.job_id || idx}
                  className="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {job.job_title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                        {job.city || "Pune"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mb-2">
                      {job.employer || "Industrial Employer"}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {job.skills_detected.length > 0 ? (
                        job.skills_detected.map((s: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-medium"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400">Core manufacturing operations</span>
                      )}
                    </div>
                    {job.apply_link && job.apply_link !== "#" && (
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 inline-flex"
                      >
                        View Official Listing <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. INTERACTIVE DISTRICT HEATMAP / BAR CHART */}
      <Card className="bg-white">

        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                District Demand vs. Candidate Supply Matrix
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Visualizing industrial vacancies against ITI / Polytechnic graduating capacity across Maharashtra
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Filter View:</span>
              <select
                aria-label="Filter District View"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-medium"
              >
                <option value="All Districts">All 6 Key Industrial Zones</option>
                {DISTRICT_METRICS.map((d) => (
                  <option key={d.id} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value: number) => [`${value.toLocaleString()} candidates`, ""]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                />
                <Bar
                  dataKey="Job Demand"
                  fill="#0F172A"
                  radius={[4, 4, 0, 0]}
                  name="Industry Demand (Vacancies)"
                />
                <Bar
                  dataKey="Candidate Supply"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  name="Trained Supply (Current Capacity)"
                />
                <Bar
                  dataKey="Skill Gap"
                  fill="#F97316"
                  radius={[4, 4, 0, 0]}
                  name="Unmet Net Gap"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>
                <strong>LMI Takeaway:</strong> Pune & Mumbai exhibit peak unmet demand in EV Powertrain & Cloud Microservices. Vidarbha (Nagpur) demand surges in Warehouse Logistics Automation.
              </span>
            </div>
            <span className="font-semibold text-slate-900 shrink-0">
              Net State Deficit: 48,000+ Skilled Technicians
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 3. BUDGET & CAPACITY PLANNER */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                Budget & Seat Capacity Reallocation Planner (FY 2026-27)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Algorithmically recommended seat allocations per district based on local job volume to curb oversupply of obsolescent trades
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs bg-slate-50 text-slate-700">
              Cabinet Recommendation Engine
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-2 text-[11px] text-slate-500 sm:hidden">
            <span>Swipe horizontally to view full allocation matrix →</span>
          </div>
          <div className="overflow-x-auto">
            <Table className="min-w-[680px]">
              <TableHeader>
                <TableRow>
                  <TableHead>District & Region</TableHead>
                  <TableHead>Priority Trade Needed</TableHead>
                  <TableHead>Current Seats</TableHead>
                  <TableHead>AI-Recommended Seats</TableHead>
                  <TableHead>Delta</TableHead>
                  <TableHead>Placement Rate</TableHead>
                  <TableHead>Sanctioned Budget</TableHead>
                  <TableHead className="text-right">Cabinet Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistricts.map((d) => {
                  const delta = d.recommendedSeats - d.seatCapacity;
                  const isApproved = allocationStatus[d.id];
                  return (
                    <TableRow key={d.id}>
                      <TableCell className="font-semibold text-slate-900">
                        {d.district}
                        <span className="block text-[11px] font-normal text-slate-500">
                          {d.region}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50/50 border-blue-200 text-blue-800 text-[11px]">
                          {d.topTradeNeeded}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-slate-600">
                        {d.seatCapacity.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono font-bold text-slate-900">
                        {d.recommendedSeats.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          +{delta.toLocaleString()} seats
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs font-mono">{d.placementRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono font-semibold text-slate-800">
                        ₹{d.budgetAllocatedCr} Cr
                      </TableCell>
                      <TableCell className="text-right">
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5" /> Sanctioned
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-xs bg-slate-900 text-white hover:bg-slate-800"
                            onClick={() => handleApproveBudget(d.id, d.district)}
                          >
                            Sanction Allocation
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
