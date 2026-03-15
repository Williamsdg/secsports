import { NextRequest, NextResponse } from "next/server";
import { getSecNews, getTeamNews } from "@/lib/espn/news";
import type { SportSlug } from "@/lib/sec/sports";

export async function GET(request: NextRequest) {
  const sport = (request.nextUrl.searchParams.get("sport") ?? "college-football") as SportSlug;
  const teamId = request.nextUrl.searchParams.get("team");

  try {
    const data = teamId
      ? await getTeamNews(sport, Number(teamId), { revalidate: 300 })
      : await getSecNews(sport, { revalidate: 300 });

    return NextResponse.json(data);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
