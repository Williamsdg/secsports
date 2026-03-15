import Link from "next/link";
import { SEC_TEAMS } from "@/lib/sec/teams";

export function Footer() {
  const teamEntries = Object.entries(SEC_TEAMS).sort((a, b) =>
    a[1].location.localeCompare(b[1].location)
  );

  return (
    <footer className="bg-sec-navy text-white/70 mt-0">
      {/* Team links bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-xs uppercase tracking-[0.2em] text-sec-gold/60 mb-3 font-semibold">
            Member Institutions
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {teamEntries.map(([id, team]) => (
              <Link
                key={id}
                href={`/teams/${team.slug}`}
                className="text-xs hover:text-sec-gold transition-colors"
              >
                {team.location}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">Sports</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/scores/college-football" className="hover:text-white transition-colors">Football</Link></li>
              <li><Link href="/scores/mens-college-basketball" className="hover:text-white transition-colors">Basketball</Link></li>
              <li><Link href="/scores/college-baseball" className="hover:text-white transition-colors">Baseball</Link></li>
              <li><Link href="/scores" className="hover:text-white transition-colors">All Scores</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Video Hub</Link></li>
              <li><Link href="/standings" className="hover:text-white transition-colors">Standings</Link></li>
              <li><Link href="/teams" className="hover:text-white transition-colors">All Teams</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">Conference</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-white/40">History & Legacy</span></li>
              <li><span className="text-white/40">Rivalries</span></li>
              <li><span className="text-white/40">Recruiting</span></li>
              <li><span className="text-white/40">Analytics</span></li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-wider uppercase mb-2">
              <span className="text-sec-gold">SEC</span>
              <span className="text-white">Sports</span>
            </div>
            <p className="text-sm text-white/50 mb-3">
              The definitive digital home for the Southeastern Conference.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-sec-gold/20" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-sec-gold/50 font-medium">
                It Just Means More
              </span>
              <div className="h-px flex-1 bg-sec-gold/20" />
            </div>
            <p className="text-xs text-white/30">16 Universities. One Conference.</p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            Data provided by ESPN. This is a fan-built redesign concept — not affiliated with the SEC or ESPN.
          </p>
          <p className="text-xs text-white/20">
            Built with Next.js & the ESPN Public API
          </p>
        </div>
      </div>
    </footer>
  );
}
