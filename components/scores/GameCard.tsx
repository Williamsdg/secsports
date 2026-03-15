import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { GameStatus } from "./GameStatus";
import type { NormalizedGame } from "@/types/scores";

interface Props {
  game: NormalizedGame;
  className?: string;
}

export function GameCard({ game, className }: Props) {
  const { home, away, status, statusDetail, venue, broadcasts } = game;

  return (
    <div
      className={cn(
        "bg-surface-raised border border-border rounded-xl p-4 hover:border-sec-gold/40 transition-colors",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <GameStatus status={status} detail={statusDetail} />
        {broadcasts.length > 0 && (
          <span className="text-xs text-text-secondary">{broadcasts[0]}</span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-3">
        <CompetitorRow competitor={away} showScore={status !== "scheduled"} />
        <CompetitorRow competitor={home} showScore={status !== "scheduled"} />
      </div>

      {/* Venue */}
      {venue.name && (
        <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border truncate">
          {venue.name}
        </p>
      )}
    </div>
  );
}

function CompetitorRow({
  competitor,
  showScore,
}: {
  competitor: import("@/types/scores").NormalizedCompetitor;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        {competitor.logo && (
          <Image
            src={competitor.logo}
            alt={competitor.name}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        )}
        <div className="min-w-0">
          <p className={cn("font-semibold truncate", competitor.isWinner ? "text-text-primary" : "text-text-secondary")}>
            {competitor.rank && (
              <span className="text-xs text-text-secondary mr-1">#{competitor.rank}</span>
            )}
            {competitor.displayName}
          </p>
          <p className="text-xs text-text-secondary">{competitor.record}</p>
        </div>
      </div>
      {showScore && (
        <span className={cn("text-2xl font-mono font-bold tabular-nums", competitor.isWinner ? "text-text-primary" : "text-text-secondary")}>
          {competitor.score}
        </span>
      )}
    </div>
  );
}
