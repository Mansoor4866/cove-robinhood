import { NextResponse } from "next/server";
import { dbSparCompanion } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username || "@mock_user";
    const result = await dbSparCompanion(username);

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
      expGain: 15,
      manaCost: 15,
      tokenReward: result.tokenReward,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to spar" }, { status: 500 });
  }
}
