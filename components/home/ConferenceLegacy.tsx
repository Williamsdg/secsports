import { cn } from "@/lib/utils/cn";

const LEGACY_MOMENTS = [
  {
    year: "2024",
    title: "Texas & Oklahoma Join the SEC",
    description: "The conference expands to 16 teams, cementing its dominance as the premier conference in college athletics.",
    category: "Expansion",
  },
  {
    year: "2023",
    title: "SEC Distributes Over $1 Billion",
    description: "The conference sets records in revenue distribution, giving each school over $50 million in shared revenue.",
    category: "Business",
  },
  {
    year: "2022",
    title: "Georgia Repeats as National Champions",
    description: "The Bulldogs become the first SEC team to win back-to-back CFP National Championships.",
    category: "Football",
  },
  {
    year: "2020",
    title: "Alabama Wins 18th National Title",
    description: "Nick Saban captures his 7th national championship, tying Bear Bryant's record.",
    category: "Football",
  },
  {
    year: "2006–2012",
    title: "The Dynasty: 7 Straight National Titles",
    description: "The SEC wins seven consecutive BCS National Championships — a streak unmatched in college football history.",
    category: "Dynasty",
  },
  {
    year: "1933",
    title: "The SEC is Founded",
    description: "Thirteen charter members form the Southeastern Conference, splitting from the Southern Conference.",
    category: "Origin",
  },
];

const CHAMPIONSHIPS = [
  { sport: "Football", count: 12, detail: "of last 20 national titles" },
  { sport: "Baseball", count: 6, detail: "of last 15 CWS titles" },
  { sport: "Basketball", count: 3, detail: "recent Final Four appearances" },
  { sport: "All Sports", count: "100+", detail: "total national championships" },
];

export function ConferenceLegacy() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sec-gold font-display text-sm uppercase tracking-[0.3em] mb-2">
            A Legacy Unmatched
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
            SEC Moments
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            From its founding in 1933 to the most powerful conference in sports today.
          </p>
        </div>

        {/* Championship stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CHAMPIONSHIPS.map((champ) => (
            <div
              key={champ.sport}
              className="bg-surface-raised border border-border rounded-xl p-5 text-center hover:border-sec-gold/30 transition-colors"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-sec-gold">{champ.count}</p>
              <p className="font-display text-sm uppercase tracking-wider font-semibold mt-1">{champ.sport}</p>
              <p className="text-xs text-text-secondary mt-1">{champ.detail}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {LEGACY_MOMENTS.map((moment, idx) => (
              <div
                key={moment.year}
                className={cn(
                  "relative flex items-start gap-6 md:gap-0",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-sec-gold rounded-full -translate-x-1.5 mt-2 ring-4 ring-surface z-10" />

                {/* Content */}
                <div className={cn("ml-10 md:ml-0 md:w-1/2", idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12")}>
                  <div className="bg-surface-raised border border-border rounded-xl p-5 hover:border-sec-gold/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2" style={{ justifyContent: idx % 2 === 0 ? "flex-end" : "flex-start" }}>
                      <span className="text-xs font-semibold uppercase tracking-wider text-sec-gold bg-sec-gold/10 px-2 py-0.5 rounded">
                        {moment.category}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-text-secondary mb-1">{moment.year}</p>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-2">{moment.title}</h3>
                    <p className="text-sm text-text-secondary">{moment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
