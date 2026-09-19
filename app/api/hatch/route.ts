import { NextResponse } from "next/server";
import { dbCreateCompanion } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username || "@mock_user";
    const walletAddress = body.walletAddress || "0x0000...0000";

    const companion = await dbCreateCompanion(username, walletAddress);

    return NextResponse.json({
      success: true,
      message: `Hatched ${companion.name} (${companion.role}) on Robinhood Chain!`,
      companion,
      txHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to hatch companion" },
      { status: 500 }
    );
  }
}
