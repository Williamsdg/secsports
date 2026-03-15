import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { formatShortDate } from "@/lib/utils/date";
import type { TeamScheduleEvent } from "@/types/teams";

interface Props {
  schedule: TeamScheduleEvent[];
}

export function TeamSchedule({ schedule }: Props) {
  if (schedule.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-bold uppercase tracking-wider mb-4">
        Schedule
      </h2>

      <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary text-xs uppercase border-b border-border bg-surface-overlay">
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Opponent</th>
              <th className="text-center px-4 py-3">Result</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">TV</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((event) => (
              <tr key={event.id} className="border-b border-border last:border-0 hover:bg-surface-overlay transition-colors">
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                  {formatShortDate(event.date)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary text-xs">
                      {event.isHome ? "vs" : "@"}
                    </span>
                    {event.opponent.logo && (
                      <Image
                        src={event.opponent.logo}
                        alt={event.opponent.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                    <span className="font-medium">
                      {event.opponent.rank && (
                        <span className="text-text-secondary text-xs mr-1">#{event.opponent.rank}</span>
                      )}
                      {event.opponent.name}
                    </span>
                    {event.isConference && (
                      <span className="text-xs text-sec-gold font-medium">SEC</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  {event.result ? (
                    <span
                      className={cn(
                        "font-mono font-semibold text-sm",
                        event.result.isWin ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {event.result.isWin ? "W" : "L"} {event.result.score}-{event.result.opponentScore}
                    </span>
                  ) : (
                    <span className="text-text-secondary">
                      {new Date(event.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                  {event.broadcasts[0] ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
