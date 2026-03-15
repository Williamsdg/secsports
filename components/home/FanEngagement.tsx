"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SEC_TEAMS } from "@/lib/sec/teams";

interface PollOption {
  id: string;
  label: string;
  color: string;
}

const POLLS = [
  {
    id: "championship",
    question: "Who wins the SEC Championship this year?",
    options: [
      { id: "61", label: "Georgia", color: "ba0c2f" },
      { id: "251", label: "Texas", color: "bf5700" },
      { id: "333", label: "Alabama", color: "9e1b32" },
      { id: "2633", label: "Tennessee", color: "ff8200" },
    ],
  },
  {
    id: "rivalry",
    question: "Greatest SEC rivalry?",
    options: [
      { id: "iron", label: "Iron Bowl", color: "03244d" },
      { id: "cocktail", label: "Cocktail Party", color: "0021a5" },
      { id: "egg", label: "Egg Bowl", color: "14213d" },
      { id: "rrs", label: "Red River Showdown", color: "bf5700" },
    ],
  },
];

const TRIVIA = [
  {
    question: "Which SEC school has the most national championships in football?",
    options: ["Alabama", "LSU", "Georgia", "Tennessee"],
    answer: 0,
  },
  {
    question: "What year was the SEC founded?",
    options: ["1920", "1933", "1946", "1952"],
    answer: 1,
  },
  {
    question: "Which SEC stadium has the largest capacity?",
    options: ["Neyland Stadium", "Tiger Stadium", "Kyle Field", "Bryant-Denny"],
    answer: 2,
  },
];

export function FanEngagement() {
  return (
    <section className="py-16 bg-surface-raised">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sec-gold font-display text-sm uppercase tracking-[0.3em] mb-2">
            Your Voice
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            Fan Zone
          </h2>
          <p className="text-text-secondary">
            Polls, predictions, and trivia — because being a fan is a full-time job.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Polls */}
          {POLLS.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}

          {/* Trivia */}
          <TriviaCard trivia={TRIVIA[Math.floor(Date.now() / 86400000) % TRIVIA.length]} />
        </div>
      </div>
    </section>
  );
}

function PollCard({ poll }: { poll: typeof POLLS[0] }) {
  const [voted, setVoted] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    poll.options.forEach((opt) => {
      initial[opt.id] = Math.floor(Math.random() * 500) + 100;
    });
    return initial;
  });

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (optionId: string) => {
    if (voted) return;
    setVoted(optionId);
    setVotes((prev) => ({ ...prev, [optionId]: (prev[optionId] ?? 0) + 1 }));
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-sec-gold bg-sec-gold/10 px-2 py-1 rounded">
          Poll
        </span>
      </div>
      <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-4">
        {poll.question}
      </h3>
      <div className="space-y-2.5">
        {poll.options.map((option) => {
          const pct = voted ? Math.round(((votes[option.id] ?? 0) / (totalVotes + 1)) * 100) : 0;
          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={!!voted}
              className={cn(
                "relative w-full text-left px-4 py-3 rounded-lg border transition-all overflow-hidden",
                voted === option.id
                  ? "border-sec-gold"
                  : voted
                  ? "border-border opacity-70"
                  : "border-border hover:border-white/20 cursor-pointer"
              )}
            >
              {/* Fill bar */}
              {voted && (
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700 ease-out rounded-lg"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: `#${option.color}20`,
                  }}
                />
              )}
              <div className="relative flex items-center justify-between">
                <span className="font-semibold text-sm">{option.label}</span>
                {voted && (
                  <span className="text-sm font-mono font-bold">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {voted && (
        <p className="text-xs text-text-secondary mt-3 text-center">
          {totalVotes + 1} votes
        </p>
      )}
    </div>
  );
}

function TriviaCard({ trivia }: { trivia: typeof TRIVIA[0] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === trivia.answer;

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-sec-gold bg-sec-gold/10 px-2 py-1 rounded">
          Trivia
        </span>
      </div>
      <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-4">
        {trivia.question}
      </h3>
      <div className="space-y-2.5">
        {trivia.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            disabled={selected !== null}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all",
              selected === null
                ? "border-border hover:border-white/20 cursor-pointer"
                : idx === trivia.answer
                ? "border-green-500 bg-green-500/10 text-green-400"
                : selected === idx
                ? "border-red-500 bg-red-500/10 text-red-400"
                : "border-border opacity-50"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className={cn("text-sm font-medium mt-3 text-center", isCorrect ? "text-green-400" : "text-red-400")}>
          {isCorrect ? "Correct!" : `The answer is ${trivia.options[trivia.answer]}`}
        </p>
      )}
    </div>
  );
}
