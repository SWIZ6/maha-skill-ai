import { NextRequest, NextResponse } from "next/server";
import { forwardToPython, getJsonFile } from "@/lib/server-backend";

interface ParsedJobItem {
  job_id?: string;
  job_title?: string;
  employer?: string;
  city?: string;
  skills_detected?: string[];
}

interface CurriculumData {
  trade_name?: string;
  trade_code?: string;
  framework?: string;
  modules?: string[];
}

const DEFAULT_PREDICTIONS = [
  {
    target_skills: ["GD&T", "Mastercam"],
    badge: "Learn Next: GD&T and Mastercam for 35% higher placement advantage.",
    headline: "GD&T & Mastercam CAD/CAM",
    cluster: "Pune (Chakan/Talegaon) & Chhatrapati Sambhajinagar",
    advantage: "+35% Placement Advantage",
    salary_premium: "₹8,000 - ₹14,000/mo bump",
    sector: "Precision Machining & Aerospace",
    domain: "machinist",
    reason: "Tier-1 auto suppliers (Bharat Forge, Eaton) require Geometric Dimensioning & Tolerancing (GD&T) for zero-defect QA.",
  },
  {
    target_skills: ["Fanuc", "VMC"],
    badge: "Learn Next: Fanuc CNC & VMC for 40% higher tier-1 hiring preference.",
    headline: "Fanuc 0i-MF & Vertical Machining Centers (VMC)",
    cluster: "Pune Automotive Corridor",
    advantage: "+40% Tier-1 Preference",
    salary_premium: "₹6,000 - ₹10,000/mo bump",
    sector: "Automotive Component Manufacturing",
    domain: "machinist",
    reason: "Over 80% of Pune CNC shopfloors have transitioned to Fanuc controllers with high-speed tool changers.",
  },
  {
    target_skills: ["BMS", "CAN-Bus"],
    badge: "Learn Next: BMS Diagnostics & CAN-Bus for 45% faster EV hiring.",
    headline: "Battery Management Systems (BMS) & CAN Telemetry",
    cluster: "Pune & Chhatrapati Sambhajinagar EV Belt",
    advantage: "+45% Faster EV Hiring",
    salary_premium: "₹10,000 - ₹16,000/mo bump",
    sector: "Electric Mobility & Powertrain",
    domain: "automobile",
    reason: "Transition from BS-VI ICE to electric two/three wheelers requires firmware diagnostic and high-voltage safety skills.",
  },
  {
    target_skills: ["PLC", "SCADA"],
    badge: "Learn Next: PLC SCADA & Cobots for 38% higher starting packages.",
    headline: "PLC Automation & Collaborative Robots (Cobots)",
    cluster: "Pune (Pimpri-Chinchwad) & Nashik",
    advantage: "+38% Starting Package Edge",
    salary_premium: "₹9,000 - ₹15,000/mo bump",
    sector: "Industry 4.0 & Smart Assembly",
    domain: "machinist",
    reason: "Assembly lines are automating with collaborative robots requiring ladder logic and HMI supervisory control.",
  },
  {
    target_skills: ["Docker", "AWS"],
    badge: "Learn Next: Docker & Cloud APIs for 50% higher IT placement readiness.",
    headline: "Containerization & Cloud Microservices",
    cluster: "Pune (Hinjewadi) & Mumbai MMR",
    advantage: "+50% IT Placement Readiness",
    salary_premium: "₹12,000 - ₹20,000/mo bump",
    sector: "Software & Digital Platforms",
    domain: "copa",
    reason: "Enterprise software clients demand cloud deployment container skills beyond entry-level desktop forms.",
  },
  {
    target_skills: ["Solar PV", "Net Metering"],
    badge: "Learn Next: Solar Net Metering & SCADA for 32% green job advantage.",
    headline: "Rooftop Solar & Smart Grid Synchronization",
    cluster: "Vidarbha (Nagpur) & Nashik Renewable Zone",
    advantage: "+32% Green Job Advantage",
    salary_premium: "₹5,000 - ₹9,000/mo bump",
    sector: "Renewable Energy & Solar Parks",
    domain: "solar",
    reason: "Surging PM Surya Ghar deployments in Maharashtra require certified net-metering synchronization technicians.",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userSkills: string[] = body.user_skills || ["Lathe", "AutoCAD"];
    const courseName: string = body.course_name || "ITI Machinist";
    const district: string = body.district || "Pune";

    // Attempt python forward
    const pyRes = await forwardToPython("/api/candidate/analysis", {
      method: "POST",
      body: JSON.stringify({
        user_skills: userSkills,
        course_name: courseName,
        district: district,
      }),
    });

    if (pyRes && pyRes.ok) {
      const data = await pyRes.json();
      return NextResponse.json({ ...data, python_online: true });
    }

    // Direct Next.js Fallback if Python is offline
    const jobs = getJsonFile<ParsedJobItem[]>("processed/parsed_skills.json", []);
    const distNorm = district.toLowerCase().trim();
    const filteredJobs =
      distNorm && !["all", "all districts"].includes(distNorm)
        ? jobs.filter((j) => (j.city || "").toLowerCase().includes(distNorm))
        : jobs;

    const targetJobs = filteredJobs.length > 0 ? filteredJobs : jobs;

    // Feature 1: Gapped Skill Knowledge
    const skillCounts: Record<string, number> = {};
    for (const job of targetJobs) {
      for (const skill of job.skills_detected || []) {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      }
    }

    const sortedMarketSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
    const userTokens = new Set(userSkills.map((s) => s.trim().toLowerCase()));

    const matchedSkills = [];
    const deficitSkills = [];

    for (const [skill, count] of sortedMarketSkills) {
      const pct = Math.round((count / (targetJobs.length || 1)) * 100);
      const item = { skill, frequency: count, marketSharePercent: pct };
      if (userTokens.has(skill.toLowerCase())) {
        matchedSkills.push(item);
      } else {
        deficitSkills.push(item);
      }
    }

    deficitSkills.sort((a, b) => b.frequency - a.frequency);

    const totalTracked = matchedSkills.length + deficitSkills.length;
    const readinessScore = totalTracked > 0 ? Math.round((matchedSkills.length / totalTracked) * 100) : 0;

    // Feature 2: Course Gap Alert
    const courseFile = courseName.toLowerCase().includes("copa")
      ? "curriculum/iti_copa_curriculum.json"
      : courseName.toLowerCase().includes("auto")
      ? "curriculum/iti_automobile_curriculum.json"
      : "curriculum/iti_sample_curriculum.json";

    const curriculum = getJsonFile<CurriculumData>(courseFile, {
      trade_name: courseName,
      framework: "NSQF Level 4",
      modules: ["Bench Working and Fitting", "Conventional Lathe and Milling Operation"],
    });

    const currText = (curriculum.modules || []).join(" ").toLowerCase();
    const missingTools = [];
    const coveredTools = [];

    for (const [skill, count] of sortedMarketSkills) {
      const pct = Math.round((count / (targetJobs.length || 1)) * 100);
      const toolData = { skill, frequency: count, marketSharePercent: pct };
      if (currText.includes(skill.toLowerCase())) {
        coveredTools.push(toolData);
      } else {
        missingTools.push(toolData);
      }
    }

    const essentialMissing = missingTools.slice(0, 4);
    const missingNames = essentialMissing.slice(0, 3).map((t) => t.skill);
    const alertMessage =
      missingNames.length > 0
        ? `Your course is missing ${missingNames.length} essential market tools: [${missingNames.join(
            ", "
          )}]. Add these to stay competitive.`
        : "Your course syllabus strongly matches local market signals.";

    const teachesSummary = (curriculum.modules || []).slice(0, 2).join(", ");
    const topMiss = missingNames[0] || "Modern CNC Tools";
    const topMissPct = essentialMissing[0]?.marketSharePercent || 80;
    const detailedContrast = `Your current syllabus focuses on ${teachesSummary}, but over ${topMissPct}% of live job openings in ${district} actively require hands-on proficiency in ${topMiss}.`;

    // Feature 3: Future Predictions
    const userSkillSet = new Set(userSkills.map((s) => s.toLowerCase()));
    const courseNorm = courseName.toLowerCase();
    const scoredPredictions = DEFAULT_PREDICTIONS.map((pred) => {
      let score = 0;
      if (courseNorm.includes(pred.domain)) score += 2;
      if (pred.target_skills.some((ts) => userSkillSet.has(ts.toLowerCase()))) score += 1;
      return { score, pred };
    }).sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,
      python_online: false,
      query: { user_skills: userSkills, course_name: courseName, district },
      gapped_skill_knowledge: {
        district,
        total_jobs_analyzed: targetJobs.length,
        readiness_score: readinessScore,
        matched_skills_count: matchedSkills.length,
        deficit_skills_count: deficitSkills.length,
        matched_skills: matchedSkills,
        deficit_skills: deficitSkills,
        top_demanded_skills: sortedMarketSkills.slice(0, 10).map(([skill, count]) => ({ skill, count })),
      },
      course_gap_alert: {
        course_name: curriculum.trade_name || courseName,
        trade_code: curriculum.trade_code || "NSQF-L4",
        framework: curriculum.framework || "NSQF Level 4",
        curriculum_modules: curriculum.modules || [],
        essential_missing_tools: essentialMissing,
        covered_tools: coveredTools,
        alert_message: alertMessage,
        detailed_contrast: detailedContrast,
      },
      future_skill_predictions: scoredPredictions.map((p) => p.pred),
    });
  } catch (error) {
    console.error("Candidate analysis route error:", error);
    return NextResponse.json({ error: "Failed to run candidate analysis" }, { status: 500 });
  }
}
