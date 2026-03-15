import Link from "next/link";
import { SEC_TEAMS } from "@/lib/sec/teams";

// Simulated recruiting data — in production this would come from an API
const RECRUITING_CLASSES = [
  { teamId: 61, rank: 1, fiveStars: 5, fourStars: 12, threeStars: 8, total: 25, points: 312.4 },
  { teamId: 333, rank: 2, fiveStars: 4, fourStars: 14, threeStars: 7, total: 25, points: 305.8 },
  { teamId: 251, rank: 3, fiveStars: 4, fourStars: 11, threeStars: 9, total: 24, points: 298.1 },
  { teamId: 99, rank: 4, fiveStars: 3, fourStars: 13, threeStars: 8, total: 24, points: 289.7 },
  { teamId: 2, rank: 5, fiveStars: 3, fourStars: 10, threeStars: 10, total: 23, points: 275.3 },
  { teamId: 2633, rank: 6, fiveStars: 2, fourStars: 12, threeStars: 9, total: 23, points: 268.9 },
  { teamId: 201, rank: 7, fiveStars: 2, fourStars: 11, threeStars: 10, total: 23, points: 261.4 },
  { teamId: 245, rank: 8, fiveStars: 2, fourStars: 10, threeStars: 11, total: 23, points: 255.0 },
];

const TRANSFER_PORTAL = [
  { name: "QB Transfer Target", from: "Big Ten School", to: "Auburn", stars: 4, position: "QB" },
  { name: "WR Portal Entry", from: "ACC School", to: "Georgia", stars: 5, position: "WR" },
  { name: "DL Addition", from: "Big 12 School", to: "Alabama", stars: 4, position: "DL" },
  { name: "CB Transfer", from: "Pac-12 School", to: "Texas", stars: 4, position: "CB" },
  { name: "LB Portal Pickup", from: "AAC School", to: "LSU", stars: 3, position: "LB" },
];

const NIL_HIGHLIGHTS = [
  { headline: "SEC NIL Spending Leads All Conferences", detail: "SEC schools combine for estimated $200M+ in NIL deals across all sports." },
  { headline: "Top QB Lands Record Deal", detail: "Multiple SEC quarterbacks sign seven-figure NIL agreements before the season starts." },
  { headline: "Collective Expansion", detail: "Every SEC school now has at least one organized NIL collective supporting athletes." },
];

export function RecruitingTracker() {
  return (
    <section className="py-16 bg-surface-raised">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sec-gold font-display text-sm uppercase tracking-[0.3em] mb-2">
            Building the Future
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            Recruiting & NIL
          </h2>
          <p className="text-text-secondary">
            The SEC dominates on the field and on the recruiting trail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recruiting Rankings */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-xl overflow-hidden">
            <div className="bg-sec-navy text-white px-5 py-3 flex items-center justify-between">
              <h3 className="font-display text-sm uppercase tracking-wider">SEC Recruiting Class Rankings</h3>
              <span className="text-xs text-sec-gold font-mono">2026</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-secondary text-xs uppercase border-b border-border">
                  <th className="text-left px-4 py-2.5">Rank</th>
                  <th className="text-left px-4 py-2.5">Team</th>
                  <th className="text-center px-3 py-2.5">
                    <span className="text-sec-gold">5</span>
                  </th>
                  <th className="text-center px-3 py-2.5">
                    <span className="text-blue-400">4</span>
                  </th>
                  <th className="text-center px-3 py-2.5">3</th>
                  <th className="text-center px-3 py-2.5 hidden md:table-cell">Total</th>
                  <th className="text-right px-4 py-2.5 hidden md:table-cell">Points</th>
                </tr>
              </thead>
              <tbody>
                {RECRUITING_CLASSES.map((cls) => {
                  const team = SEC_TEAMS[cls.teamId];
                  return (
                    <tr key={cls.teamId} className="border-b border-border last:border-0 hover:bg-surface-overlay transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-sec-gold">{cls.rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold"
                            style={{ backgroundColor: `#${team?.color}`, color: `#${team?.altColor}` }}
                          >
                            {team?.abbrev}
                          </div>
                          <span className="font-semibold">{team?.location ?? "Unknown"}</span>
                        </div>
                      </td>
                      <td className="text-center px-3 py-3 font-mono font-semibold text-sec-gold">{cls.fiveStars}</td>
                      <td className="text-center px-3 py-3 font-mono text-blue-400">{cls.fourStars}</td>
                      <td className="text-center px-3 py-3 font-mono text-text-secondary">{cls.threeStars}</td>
                      <td className="text-center px-3 py-3 font-mono hidden md:table-cell">{cls.total}</td>
                      <td className="text-right px-4 py-3 font-mono font-semibold hidden md:table-cell">{cls.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right column: Transfer Portal + NIL */}
          <div className="space-y-6">
            {/* Transfer Portal */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="bg-sec-navy text-white px-5 py-3">
                <h3 className="font-display text-sm uppercase tracking-wider">Transfer Portal</h3>
              </div>
              <div className="divide-y divide-border">
                {TRANSFER_PORTAL.map((player, idx) => (
                  <div key={idx} className="px-4 py-3 hover:bg-surface-overlay transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{player.position}</span>
                      <span className="text-xs text-sec-gold font-mono">{"★".repeat(player.stars)}</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      {player.from} &rarr; <span className="text-text-primary font-medium">{player.to}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NIL */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="bg-sec-navy text-white px-5 py-3">
                <h3 className="font-display text-sm uppercase tracking-wider">NIL Headlines</h3>
              </div>
              <div className="divide-y divide-border">
                {NIL_HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} className="px-4 py-3 hover:bg-surface-overlay transition-colors">
                    <p className="font-semibold text-sm mb-1">{item.headline}</p>
                    <p className="text-xs text-text-secondary">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
