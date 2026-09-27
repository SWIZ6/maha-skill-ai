import { NextResponse } from "next/server";
import { forwardToPython, getJsonFile } from "@/lib/server-backend";

export async function GET() {
  const pyRes = await forwardToPython("/api/skills");
  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json(data);
  }

  // Fallback
  const parsed = getJsonFile<any[]>("processed/parsed_skills.json", []);
  const countMap: Record<string, number> = {};
  for (const item of parsed) {
    for (const skill of item.skills_detected || []) {
      countMap[skill] = (countMap[skill] || 0) + 1;
    }
  }

  const demandRanking = Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .map(([skill, demandCount]) => ({ skill, demandCount }));

  return NextResponse.json({
    total_jobs_parsed: parsed.length,
    demand_ranking: demandRanking,
  });
}
