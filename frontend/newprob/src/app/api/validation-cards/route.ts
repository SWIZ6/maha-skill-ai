import { NextRequest, NextResponse } from "next/server";
import { forwardToPython, getJsonFile, writeJsonFile } from "@/lib/server-backend";

export async function GET() {
  const pyRes = await forwardToPython("/api/validation-cards");
  if (pyRes && pyRes.ok) {
    const data = await pyRes.json();
    return NextResponse.json(data);
  }

  const cards = getJsonFile<any[]>("processed/validation_cards.json", []);
  return NextResponse.json(cards);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pyRes = await forwardToPython("/api/validation-cards/vote", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (pyRes && pyRes.ok) {
      const data = await pyRes.json();
      return NextResponse.json(data);
    }

    // Fallback update
    const cards = getJsonFile<any[]>("processed/validation_cards.json", []);
    const card = cards.find((c) => c.id === body.cardId);
    if (card) {
      if (body.action === "approve") {
        card.employerEndorsements = (card.employerEndorsements || 0) + 1;
      } else if (body.action === "reject") {
        card.employerObjections = (card.employerObjections || 0) + 1;
      }
      writeJsonFile("processed/validation_cards.json", cards);
      return NextResponse.json({ success: true, card });
    }

    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
