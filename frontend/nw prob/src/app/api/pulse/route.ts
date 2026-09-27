import { NextRequest, NextResponse } from "next/server";
import { forwardToPython, getJsonFile, writeJsonFile } from "@/lib/server-backend";

export async function GET() {
  const pyRes = await forwardToPython("/api/pulse");
  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json(data);
  }

  const subs = getJsonFile<any[]>("processed/pulse_submissions.json", []);
  return NextResponse.json(subs);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pyRes = await forwardToPython("/api/pulse", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (pyRes && pyRes.ok) {
      const data = await pyRes.json();
      return NextResponse.json(data);
    }

    // Fallback write
    const subs = getJsonFile<any[]>("processed/pulse_submissions.json", []);
    const newSub = {
      id: `sub-${Date.now()}`,
      companyName: body.companyName,
      sector: body.sector,
      district: body.district,
      role: body.role,
      skills: body.skills,
      openings: Number(body.openings),
      proficiencyRequired: body.proficiencyRequired,
      timeline: body.timeline,
      submittedAt: "Just now",
      verified: true,
    };
    subs.unshift(newSub);
    writeJsonFile("processed/pulse_submissions.json", subs);

    return NextResponse.json({ success: true, submission: newSub });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
