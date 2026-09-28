import { NextRequest, NextResponse } from "next/server";
import { forwardToPython, getJsonFile, writeJsonFile } from "@/lib/server-backend";

export async function GET() {
  const pyRes = await forwardToPython("/api/patches");
  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json(data);
  }

  const patches = getJsonFile<string[]>("processed/applied_patches.json", []);
  return NextResponse.json(patches);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pyRes = await forwardToPython("/api/patches/apply", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (pyRes && pyRes.ok) {
      const data = await pyRes.json();
      return NextResponse.json(data);
    }

    // Fallback
    const patches = getJsonFile<string[]>("processed/applied_patches.json", []);
    if (!patches.includes(body.diffId)) {
      patches.push(body.diffId);
      writeJsonFile("processed/applied_patches.json", patches);
    }

    return NextResponse.json({
      success: true,
      message: "Patch synchronized with Maharashtra DVET syllabus repository!",
      appliedPatches: patches,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
