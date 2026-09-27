import { NextRequest, NextResponse } from "next/server";
import { forwardToPython, getJsonFile } from "@/lib/server-backend";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const pyEndpoint = `/api/jobs${queryString ? `?${queryString}` : ""}`;

  const pyRes = await forwardToPython(pyEndpoint);
  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json(data);
  }

  // Fallback to local files
  const parsed = getJsonFile<any[]>("processed/parsed_skills.json", []);
  const raw = getJsonFile<any[]>("raw/pune_jobs.json", []);
  const rawMap = new Map(raw.map((j) => [j.job_id || j.job_uid, j]));

  const query = searchParams.get("query")?.toLowerCase();
  const city = searchParams.get("city")?.toLowerCase();
  const skill = searchParams.get("skill")?.toLowerCase();

  const results = [];
  for (const item of parsed) {
    const rawDetail = rawMap.get(item.job_id) || {};
    const jobRecord = {
      job_id: item.job_id,
      job_title: item.job_title,
      employer: item.employer,
      city: item.city || rawDetail.job_city || "Maharashtra",
      skills_detected: item.skills_detected || [],
      apply_link: item.apply_link || rawDetail.job_apply_link || "#",
      posted_at: item.posted_at || rawDetail.job_posted_at_datetime_utc || "Recent",
      description_snippet: (rawDetail.job_description || "").slice(0, 200) + "...",
    };

    if (query && !jobRecord.job_title?.toLowerCase().includes(query)) continue;
    if (city && !jobRecord.city?.toLowerCase().includes(city)) continue;
    if (skill && !jobRecord.skills_detected.some((s: string) => s.toLowerCase() === skill)) continue;

    results.push(jobRecord);
  }

  return NextResponse.json({ total: results.length, jobs: results });
}
