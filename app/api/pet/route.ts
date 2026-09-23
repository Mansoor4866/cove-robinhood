import { NextResponse } from "next/server";
import { dbPetCompanion } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username || "@mock_user";
    const result = await dbPetCompanion(username);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, cooldownMs: result.cooldownMs },
        { status: result.cooldownMs ? 429 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reaction: result.reaction,
      companion: result.companion,
      happinessGain: 10,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to pet companion" }, { status: 500 });
  }
}
