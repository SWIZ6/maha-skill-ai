import { NextResponse } from "next/server";
import { forwardToPython, getJsonFile } from "@/lib/server-backend";

export async function GET() {
  const pyRes = await forwardToPython("/api/health");
  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json({ ...data, python_online: true });
  }

  // Fallback if Python backend is temporarily down
  const rawJobs = getJsonFile<any[]>("raw/pune_jobs.json", []);
  const parsedSkills = getJsonFile<any[]>("processed/parsed_skills.json", []);
  const pulseSubs = getJsonFile<any[]>("processed/pulse_submissions.json", []);
  const patches = getJsonFile<any[]>("processed/applied_patches.json", []);

  return NextResponse.json({
    status: "healthy (direct fallback)",
    service: "MahaSkill AI Direct Bridge",
    python_online: false,
    version: "1.0.0",
    live_data: {
      raw_jobs_count: rawJobs.length,
      parsed_skills_count: parsedSkills.length,
      pulse_submissions_count: pulseSubs.length,
      applied_patches_count: patches.length,
    },
  });
}
