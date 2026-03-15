import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { GameStatus } from "./GameStatus";
import { hexToRgba } from "@/lib/utils/colors";
import type { NormalizedGame } from "@/types/scores";

interface Props {
  game: NormalizedGame | null;
}

export function FeaturedGame({ game }: Props) {
  if (!game) return null;

  const { home, away, status, statusDetail, venue, broadcasts } = game;

  return (
    <section
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${hexToRgba(away.color, 0.9)}, ${hexToRgba(home.color, 0.9)})`,
      }}
    >
      <div className="relative z-10 p-6 md:p-10">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {status === "in_progress" && (
              <span className="bg-live text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full animate-score-pulse">
                Live
              </span>
            )}
            <GameStatus status={status} detail={statusDetail} className="text-white/80" />
          </div>
          {broadcasts.length > 0 && (
            <span className="text-sm text-white/70 font-medium">{broadcasts.join(" | ")}</span>
          )}
        </div>

        {/* Matchup */}
        <div className="flex items-center justify-between gap-4">
          {/* Away */}
          <div className="flex-1 text-center">
            {away.logo && (
              <Image
                src={away.logo}
                alt={away.name}
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-3"
              />
            )}
            <p className="text-white font-display text-lg md:text-xl uppercase tracking-wide">
              {away.rank && <span className="text-white/60 text-sm mr-1">#{away.rank}</span>}
              {away.name}
            </p>
            <p className="text-white/60 text-sm">{away.record}</p>
          </div>

          {/* Score / VS */}
          <div className="flex-shrink-0 text-center px-4">
            {status !== "scheduled" ? (
              <div className="flex items-center gap-3 md:gap-5">
                <span className={cn("text-4xl md:text-6xl font-mono font-bold", away.isWinner ? "text-white" : "text-white/50")}>
                  {away.score}
                </span>
                <span className="text-white/30 text-2xl font-light">-</span>
                <span className={cn("text-4xl md:text-6xl font-mono font-bold", home.isWinner ? "text-white" : "text-white/50")}>
                  {home.score}
                </span>
              </div>
            ) : (
              <span className="text-3xl md:text-5xl font-display text-white/40 uppercase">VS</span>
            )}
          </div>

          {/* Home */}
          <div className="flex-1 text-center">
            {home.logo && (
              <Image
                src={home.logo}
                alt={home.name}
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-3"
              />
            )}
            <p className="text-white font-display text-lg md:text-xl uppercase tracking-wide">
              {home.rank && <span className="text-white/60 text-sm mr-1">#{home.rank}</span>}
              {home.name}
            </p>
            <p className="text-white/60 text-sm">{home.record}</p>
          </div>
        </div>

        {/* Venue */}
        {venue.name && (
          <p className="text-center text-white/50 text-sm mt-6">
            {venue.name} &mdash; {venue.city}, {venue.state}
          </p>
        )}
      </div>
    </section>
  );
}
