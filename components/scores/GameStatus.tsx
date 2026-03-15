import { cn } from "@/lib/utils/cn";
import type { GameStatus as GameStatusType } from "@/types/scores";

interface Props {
  status: GameStatusType;
  detail: string;
  className?: string;
}

export function GameStatus({ status, detail, className }: Props) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-wide",
        status === "in_progress" && "text-live",
        status === "final" && "text-text-secondary",
        status === "scheduled" && "text-text-secondary",
        className
      )}
    >
      {status === "in_progress" && (
        <span className="inline-block w-2 h-2 bg-live rounded-full mr-1.5 animate-score-pulse" />
      )}
      {detail}
    </span>
  );
}
