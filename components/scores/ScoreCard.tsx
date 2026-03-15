import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { GameStatus } from "./GameStatus";
import type { NormalizedGame } from "@/types/scores";

interface Props {
  game: NormalizedGame;
  className?: string;
}

export function ScoreCard({ game, className }: Props) {
  const { home, away, status, statusDetail } = game;

  return (
    <Link
      href={`/scores/college-football`}
      className={cn(
        "flex flex-col gap-1 p-2.5 rounded-lg bg-surface-raised border border-border",
        "hover:border-sec-gold/50 transition-colors min-w-[160px]",
        className
      )}
    >
      <TeamRow
        logo={away.logo}
        name={away.abbreviation}
        score={away.score}
        rank={away.rank}
        isWinner={away.isWinner}
        showScore={status !== "scheduled"}
      />
      <TeamRow
        logo={home.logo}
        name={home.abbreviation}
        score={home.score}
        rank={home.rank}
        isWinner={home.isWinner}
        showScore={status !== "scheduled"}
      />
      <GameStatus status={status} detail={statusDetail} className="mt-0.5 text-center" />
    </Link>
  );
}

function TeamRow({
  logo,
  name,
  score,
  rank,
  isWinner,
  showScore,
}: {
  logo: string;
  name: string;
  score: number;
  rank?: number;
  isWinner: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 min-w-0">
        {logo && (
          <Image src={logo} alt={name} width={16} height={16} className="w-4 h-4 object-contain" />
        )}
        <span className={cn("text-xs font-semibold truncate", isWinner && "text-text-primary", !isWinner && "text-text-secondary")}>
          {rank ? <span className="text-text-secondary font-normal mr-0.5">{rank}</span> : null}
          {name}
        </span>
      </div>
      {showScore && (
        <span className={cn("text-sm font-mono font-bold tabular-nums", isWinner ? "text-text-primary" : "text-text-secondary")}>
          {score}
        </span>
      )}
    </div>
  );
}
