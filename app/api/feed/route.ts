import { NextResponse } from "next/server";
import { dbFeedCompanion } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const food = body.food || "forest berries";
    const username = body.username || "@mock_user";

    const result = await dbFeedCompanion(username, food);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to feed companion" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reaction: result.reaction,
      companion: result.companion,
      rewardExp: 15,
      hungerReset: true,
      cooldownMinutes: 60,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to feed companion" },
      { status: 500 }
    );
  }
}
