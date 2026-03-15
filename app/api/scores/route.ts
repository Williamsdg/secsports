import { NextRequest, NextResponse } from "next/server";
import { getSecScoreboard } from "@/lib/espn/scoreboard";
import type { SportSlug } from "@/lib/sec/sports";

export async function GET(request: NextRequest) {
  const sport = (request.nextUrl.searchParams.get("sport") ?? "college-football") as SportSlug;

  try {
    const data = await getSecScoreboard(sport, { revalidate: 15 });
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Scores API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
