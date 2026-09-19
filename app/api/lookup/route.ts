import { NextResponse } from "next/server";
import { dbGetCompanion } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user") || "@mock_user";

    const companion = await dbGetCompanion(user);

    if (companion) {
      return NextResponse.json({
        success: true,
        companion,
        hatched: true,
      });
    }

    return NextResponse.json({
      success: true,
      companion: null,
      hatched: false,
      message: `No companion hatched yet for ${user}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Lookup query failed" },
      { status: 500 }
    );
  }
}
