import { NextRequest, NextResponse } from "next/server";
import { forwardToPython, getJsonFile } from "@/lib/server-backend";

export async function GET(req: NextRequest) {
  const trade = req.nextUrl.searchParams.get("trade") || "machinist";
  const pyRes = await forwardToPython(`/api/gap-analysis?trade=${encodeURIComponent(trade)}`);

  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json(data);
  }

  // Fallback calculation in Node
  const normalizedTrade = trade.toLowerCase().replace("diff-", "");
  let curriculumFile = "curriculum/iti_sample_curriculum.json";
  if (normalizedTrade.includes("copa")) {
    curriculumFile = "curriculum/iti_copa_curriculum.json";
  } else if (normalizedTrade.includes("auto")) {
    curriculumFile = "curriculum/iti_automobile_curriculum.json";
  }

  const curriculum = getJsonFile<any>(curriculumFile, {
    trade_name: "Mechanic Machine Tool Maintenance / CNC Operator",
    trade_code: "ITI-MECH-07",
    framework: "NSQF Level 4",
    modules: [],
  });

  const parsed = getJsonFile<any[]>("processed/parsed_skills.json", []);
  const countMap: Record<string, number> = {};
  for (const item of parsed) {
    for (const skill of item.skills_detected || []) {
      countMap[skill] = (countMap[skill] || 0) + 1;
    }
  }

  const currText = (curriculum.modules || []).join(" ").toLowerCase();
  const covered: { skill: string; frequency: number }[] = [];
  const missing: { skill: string; frequency: number }[] = [];

  const sortedSkills = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  for (const [skill, count] of sortedSkills) {
    if (currText.includes(skill.toLowerCase())) {
      covered.push({ skill, frequency: count });
    } else {
      missing.push({ skill, frequency: count });
    }
  }

  const total = covered.length + missing.length;
  const matchRate = total > 0 ? Math.round((covered.length / total) * 1000) / 10 : 50;

  return NextResponse.json({
    trade_name: curriculum.trade_name,
    trade_code: curriculum.trade_code || "ITI-GEN",
    framework: curriculum.framework || "NSQF Level 4",
    total_jobs_analyzed: parsed.length,
    match_rate: matchRate,
    modules_covered: curriculum.modules,
    missing_in_curriculum: missing,
    covered_in_curriculum: covered,
    top_skills_demanded: sortedSkills.slice(0, 12).map(([skill, count]) => ({ skill, count })),
  });
}
