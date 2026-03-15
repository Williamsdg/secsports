import Image from "next/image";
import Link from "next/link";
import type { StandingsGroup } from "@/types/standings";

interface Props {
  standings: StandingsGroup[];
}

export function StandingsWidget({ standings }: Props) {
  if (standings.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wider">
          SEC Standings
        </h2>
        <Link href="/standings" className="text-sm text-sec-gold hover:underline font-medium">
          Full Standings
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {standings.map((group) => (
          <div key={group.name} className="bg-surface-raised border border-border rounded-xl overflow-hidden">
            <div className="bg-sec-navy text-white px-4 py-2.5">
              <h3 className="font-display text-sm uppercase tracking-wider">{group.name}</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-secondary text-xs uppercase border-b border-border">
                  <th className="text-left px-4 py-2">Team</th>
                  <th className="text-center px-2 py-2">Conf</th>
                  <th className="text-center px-2 py-2">Overall</th>
                  <th className="text-center px-2 py-2">Strk</th>
                </tr>
              </thead>
              <tbody>
                {group.entries.slice(0, 8).map((entry, idx) => (
                  <tr key={entry.teamId} className="border-b border-border last:border-0 hover:bg-surface-overlay transition-colors">
                    <td className="px-4 py-2.5">
                      <Link href={`/teams/${entry.abbreviation.toLowerCase()}`} className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary w-4">{idx + 1}</span>
                        {entry.logo && (
                          <Image src={entry.logo} alt={entry.teamName} width={20} height={20} className="w-5 h-5 object-contain" />
                        )}
                        <span className="font-medium truncate">{entry.teamName}</span>
                      </Link>
                    </td>
                    <td className="text-center px-2 py-2.5 font-mono text-xs">{entry.conferenceRecord}</td>
                    <td className="text-center px-2 py-2.5 font-mono text-xs">{entry.overallRecord}</td>
                    <td className="text-center px-2 py-2.5 text-xs text-text-secondary">{entry.streak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
