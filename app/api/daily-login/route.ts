import { NextResponse } from "next/server";
import { dbClaimDailyLogin } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username || "@mock_user";
    const result = await dbClaimDailyLogin(username);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      alreadyClaimed: result.alreadyClaimed,
      tokensAwarded: result.tokensAwarded,
      message: result.alreadyClaimed
        ? "Already claimed today! Come back tomorrow for +2 Food Tokens."
        : `🎁 Daily login bonus! +${result.tokensAwarded} Food Tokens`,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to claim daily login" }, { status: 500 });
  }
}
