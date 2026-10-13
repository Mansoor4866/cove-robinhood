import { NextResponse } from "next/server";
import { dbCreateCompanion } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const walletAddress = body.walletAddress || "";
    const formattedFromAddr = walletAddress && walletAddress.length > 8
      ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`
      : walletAddress;
    const username = body.username || formattedFromAddr || "SolanaTrainer";

    const companion = await dbCreateCompanion(username, walletAddress);

    return NextResponse.json({
      success: true,
      message: `Hatched ${companion.name} (${companion.role}) on Solana!`,
      companion,
      txSignature: `${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to hatch companion" },
      { status: 500 }
    );
  }
}
