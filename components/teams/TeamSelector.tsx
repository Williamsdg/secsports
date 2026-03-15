"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useMyTeams } from "@/providers/MyTeamsProvider";
import { SEC_TEAMS } from "@/lib/sec/teams";
import type { NormalizedTeam } from "@/types/teams";

interface Props {
  teams: NormalizedTeam[];
}

export function TeamSelector({ teams }: Props) {
  const { toggleTeam, isFollowing, isLoaded } = useMyTeams();

  if (!isLoaded) return null;

  const teamList = teams.length > 0
    ? teams
    : Object.entries(SEC_TEAMS).map(([id, info]) => ({
        id: Number(id),
        slug: info.slug,
        name: info.mascot,
        location: info.location,
        abbreviation: info.abbrev,
        displayName: info.name,
        color: info.color,
        altColor: info.altColor,
        logo: "",
        logoDark: "",
        record: "",
        standingSummary: "",
        conferenceRecord: "",
      }));

  return (
    <section className="bg-surface-raised border border-border rounded-2xl p-6">
      <h2 className="font-display text-2xl font-bold uppercase tracking-wider mb-2">
        Follow Your Teams
      </h2>
      <p className="text-text-secondary text-sm mb-6">
        Select your favorite SEC teams to personalize your experience
      </p>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {teamList.map((team) => {
          const following = isFollowing(team.id);
          return (
            <button
              key={team.id}
              onClick={() => toggleTeam(team.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl transition-all",
                following
                  ? "bg-sec-navy/10 dark:bg-sec-gold/10 ring-2 ring-sec-gold"
                  : "hover:bg-surface-overlay"
              )}
            >
              {team.logo ? (
                <Image
                  src={team.logo}
                  alt={team.displayName}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: `#${team.color}` }}
                >
                  {team.abbreviation}
                </div>
              )}
              <span className="text-xs font-medium text-center leading-tight">
                {team.abbreviation}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
