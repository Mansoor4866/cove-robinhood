import { NextResponse } from "next/server";
import { dbGetLeaderboard } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = parseInt(searchParams.get("limit") || "1000", 10);
    const limit = Math.min(1000, Math.max(1, isNaN(limitParam) ? 1000 : limitParam));

    const leaderboard = await dbGetLeaderboard(limit);

    return NextResponse.json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
