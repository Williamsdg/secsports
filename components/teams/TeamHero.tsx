import Image from "next/image";
import { getContrastColor } from "@/lib/utils/colors";
import type { NormalizedTeam } from "@/types/teams";

interface Props {
  team: NormalizedTeam;
}

export function TeamHero({ team }: Props) {
  const textColor = getContrastColor(team.color);

  return (
    <section
      style={{
        backgroundColor: `#${team.color}`,
        color: textColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {team.logo && (
          <Image
            src={team.logo}
            alt={team.displayName}
            width={120}
            height={120}
            className="w-24 h-24 md:w-30 md:h-30 object-contain"
          />
        )}
        <div className="text-center md:text-left">
          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wide">
            {team.displayName}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2 text-sm" style={{ opacity: 0.8 }}>
            {team.record && <span>{team.record}</span>}
            {team.conferenceRecord && <span>| Conf: {team.conferenceRecord}</span>}
            {team.standingSummary && <span>| {team.standingSummary}</span>}
            {team.rank && <span>| Ranked #{team.rank}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
