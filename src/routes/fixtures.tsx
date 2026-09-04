import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

import { Chip, PageHeader } from "@/components/ui-bits";
import { allFixtures, allResults, leagues, standings } from "@/data/rafc";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures — RAFC" },
      {
        name: "description",
        content: "Every upcoming Randburg AFC fixture across all eight leagues, with kick-off times and venues.",
      },
      { property: "og:title", content: "Fixtures — RAFC" },
      { property: "og:description", content: "Club-wide RAFC fixture list with kick-off times and venues." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fixtures,
});

function Fixtures() {
  const [slug, setSlug] = useState<string | null>(null);

  const fixtures = slug ? allFixtures.filter((f) => f.slug === slug) : allFixtures;
  const results = slug ? allResults.filter((r) => r.slug === slug) : allResults;

  const grouped = fixtures.reduce<Record<string, typeof fixtures>>((acc, f) => {
    (acc[f.date] ??= []).push(f);
    return acc;
  }, {});

  return (
    <div className="pb-6">
      <PageHeader title="Fixtures" subtitle="All RAFC teams · matchdays ahead" />

      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto px-5">
        <button
          type="button"
          onClick={() => setSlug(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.14em] ${
            slug === null ? "cta-accent" : "bg-secondary text-muted-foreground"
          }`}
        >
          All leagues
        </button>
        {leagues.map((l) => (
          <button
            key={l.slug}
            type="button"
            onClick={() => setSlug(l.slug)}
            className="flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.14em] text-white"
            style={{
              backgroundColor: slug === l.slug ? l.accent : "transparent",
              border: `1px solid ${l.accent}`,
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.accent }} />
            {l.short}
          </button>
        ))}
      </div>

      <section className="px-5">
        <p className="eyebrow mb-2">Upcoming matches</p>
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, list]) => (
            <div key={date}>
              <p className="mb-2 font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">{date}</p>
              <div className="space-y-2">
                {list.map((f) => (
                  <div key={f.id} className="surface p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.14em] text-white"
                        style={{ backgroundColor: f.accent }}
                      >
                        {f.league}
                      </span>
                      <Chip accent={f.home}>{f.home ? "Home" : "Away"}</Chip>
                    </div>
                    <p className="mt-3 text-base font-semibold">
                      {f.home ? `RAFC vs ${f.opponent}` : `${f.opponent} vs RAFC`}
                    </p>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {f.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" /> {f.venue}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 px-5">
        <p className="eyebrow mb-2">Past results</p>
        <div className="space-y-2">
          {results.map((r) => {
            const win = r.scoreFor > r.scoreAgainst;
            const draw = r.scoreFor === r.scoreAgainst;
            return (
              <div key={r.id} className="surface flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {r.home ? `RAFC vs ${r.opponent}` : `${r.opponent} vs RAFC`}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.date} · {r.league}
                  </p>
                </div>
                <span
                  className={`rounded-lg px-3 py-1.5 font-display text-sm tracking-[0.08em] ${
                    draw ? "bg-secondary text-muted-foreground" : win ? "result-win" : "result-loss"
                  }`}
                >
                  {r.scoreFor} – {r.scoreAgainst}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 px-5">
        <p className="eyebrow mb-2">League standings</p>
        <div className="surface overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 font-display uppercase tracking-[0.1em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-2 py-2">Team</th>
                <th className="px-1 py-2 text-center">P</th>
                <th className="px-1 py-2 text-center">W</th>
                <th className="px-1 py-2 text-center">D</th>
                <th className="px-1 py-2 text-center">L</th>
                <th className="px-3 py-2 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={row.team} className={`border-t border-border ${row.team === "RAFC" ? "bg-accent/10" : ""}`}>
                  <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                  <td className="px-2 py-2 font-medium">{row.team}</td>
                  <td className="px-1 py-2 text-center text-muted-foreground">{row.played}</td>
                  <td className="px-1 py-2 text-center text-muted-foreground">{row.won}</td>
                  <td className="px-1 py-2 text-center text-muted-foreground">{row.drawn}</td>
                  <td className="px-1 py-2 text-center text-muted-foreground">{row.lost}</td>
                  <td className="px-3 py-2 text-center font-semibold">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
