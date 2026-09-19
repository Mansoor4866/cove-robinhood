import { NextResponse } from "next/server";
import { dbGetLeaderboard } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

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
