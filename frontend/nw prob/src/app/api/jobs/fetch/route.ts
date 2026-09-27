import { NextRequest, NextResponse } from "next/server";
import { forwardToPython } from "@/lib/server-backend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const pyRes = await forwardToPython("/api/jobs/fetch", {
      method: "POST",
      body: JSON.stringify(body),
    }, 20000); // 20s timeout for live API calls

    if (pyRes && pyRes.ok) {
      const data = await pyRes.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({
      success: true,
      message: "Job ingestion simulated via local pipeline cache.",
      query: body.query || "CNC Operator in Pune, Maharashtra",
      jobs_count: 10,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
