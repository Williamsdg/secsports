import Image from "next/image";
import Link from "next/link";
import { getContrastColor } from "@/lib/utils/colors";
import type { NormalizedTeam } from "@/types/teams";

interface Props {
  team: NormalizedTeam;
}

export function TeamCard({ team }: Props) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group relative block rounded-xl overflow-hidden border border-border hover:border-sec-gold/40 transition-all"
    >
      <div
        className="p-6 flex flex-col items-center gap-3 text-center"
        style={{
          background: `linear-gradient(180deg, #${team.color}15, transparent)`,
        }}
      >
        {team.logo ? (
          <Image
            src={team.logo}
            alt={team.displayName}
            width={56}
            height={56}
            className="w-14 h-14 object-contain group-hover:scale-110 transition-transform"
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: `#${team.color}`, color: getContrastColor(team.color) }}
          >
            {team.abbreviation}
          </div>
        )}
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide">{team.location}</p>
          <p className="text-xs text-text-secondary">{team.name}</p>
        </div>
        {team.record && (
          <p className="text-xs font-mono text-text-secondary">{team.record}</p>
        )}
      </div>
    </Link>
  );
}
