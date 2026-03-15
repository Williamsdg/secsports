import { NextRequest, NextResponse } from "next/server";
import { getSecStandings } from "@/lib/espn/standings";
import type { SportSlug } from "@/lib/sec/sports";

export async function GET(request: NextRequest) {
  const sport = (request.nextUrl.searchParams.get("sport") ?? "college-football") as SportSlug;

  try {
    const data = await getSecStandings(sport, { revalidate: 3600 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Standings API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
