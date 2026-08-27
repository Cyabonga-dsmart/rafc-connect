import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock, MapPin, Whistle } from "lucide-react";

import { Chip } from "@/components/ui-bits";
import { getLeague } from "@/data/rafc";

const tabs = ["Squad", "Fixtures", "Results", "Training"] as const;

export const Route = createFileRoute("/leagues/$slug")({
  loader: ({ params }) => {
    const league = getLeague(params.slug);
    if (!league) throw notFound();
    return { league };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.league.name ?? "League";
    return {
      meta: [
        { title: `${name} — RAFC` },
        {
          name: "description",
          content: `${name} squad list, upcoming fixtures, recent results, league standings and weekly training schedule at Randburg AFC.`,
        },
        { property: "og:title", content: `${name} — RAFC` },
        { property: "og:description", content: `Squad, fixtures, results and training for RAFC ${name}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LeagueDetail,
});

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LeagueDetail() {
  const { league } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Squad");

  return (
    <div className="pb-6">
      <header
        className="relative px-5 pt-8 pb-6"
        style={{
          backgroundImage: `linear-gradient(150deg, ${league.accent} -20%, var(--navy-deep) 75%)`,
        }}
      >
        <Link
          to="/leagues"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.14em] text-silver/80"
        >
          <ArrowLeft className="h-4 w-4" /> League hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold uppercase leading-tight">{league.name}</h1>
        <p className="mt-1 text-sm text-silver/80">
          {league.ageGroup} · {league.squad.length} registered players
        </p>
        <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: league.accent }} />
      </header>

      <div className="sticky top-0 z-40 border-b border-border bg-navy-deep/95 backdrop-blur">
        <div className="flex px-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 py-3.5 font-display text-xs uppercase tracking-[0.14em] transition-colors ${
                tab === t ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t}
              {tab === t ? <span className="accent-bar absolute inset-x-3 bottom-0 h-0.5 rounded-full" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">
        {tab === "Squad" ? (
          <div className="grid grid-cols-2 gap-3">
            {league.squad.map((p) => (
              <div key={p.number} className="surface p-4">
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border font-display text-sm"
                    style={{ backgroundColor: league.accent }}
                  >
                    {initials(p.name)}
                  </span>
                  <span className="font-display text-2xl font-bold leading-none text-silver/70">
                    {String(p.number).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-tight">{p.name}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{p.position}</p>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Fixtures" ? (
          <div className="space-y-3">
            {league.fixtures.map((f) => (
              <div key={f.id} className="surface p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-display text-sm uppercase">
                    <CalendarDays className="h-3.5 w-3.5" /> {f.date}
                  </span>
                  <Chip accent={f.home}>{f.home ? "Home" : "Away"}</Chip>
                </div>
                <p className="mt-3 text-lg font-semibold">RAFC vs {f.opponent}</p>
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
        ) : null}

        {tab === "Results" ? (
          <div className="space-y-6">
            <div className="space-y-2">
              {league.results.map((r) => {
                const win = r.scoreFor > r.scoreAgainst;
                const loss = r.scoreFor < r.scoreAgainst;
                return (
                  <div
                    key={r.id}
                    className={`surface flex items-center justify-between p-4 ${
                      win ? "result-win" : loss ? "result-loss" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">RAFC vs {r.opponent}</p>
                      <p className="mt-0.5 text-xs text-silver/75">
                        {r.date} · {r.home ? "Home" : "Away"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-bold">
                        {r.scoreFor}–{r.scoreAgainst}
                      </span>
                      <span className="font-display text-xs uppercase tracking-[0.14em]">
                        {win ? "W" : loss ? "L" : "D"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="surface overflow-hidden">
              <p className="eyebrow px-4 pt-4">League standings</p>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <th className="py-2 pl-4 text-left font-normal">Team</th>
                    <th className="py-2 text-center font-normal">P</th>
                    <th className="py-2 text-center font-normal">GD</th>
                    <th className="py-2 pr-4 text-center font-normal">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {league.table.map((row, i) => (
                    <tr
                      key={row.team}
                      className={`border-b border-border/60 last:border-0 ${
                        row.team === "RAFC" ? "bg-secondary/50" : ""
                      }`}
                    >
                      <td className="py-2.5 pl-4">
                        <span className="mr-2 text-muted-foreground">{i + 1}</span>
                        {row.team}
                      </td>
                      <td className="py-2.5 text-center text-muted-foreground">{row.played}</td>
                      <td className="py-2.5 text-center text-muted-foreground">
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </td>
                      <td className="py-2.5 pr-4 text-center font-display font-bold">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {tab === "Training" ? (
          <div className="space-y-2">
            {league.training.map((t) => (
              <div key={t.day} className="surface p-5">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg uppercase">{t.day}</p>
                  <Chip>{t.time}</Chip>
                </div>
                <p className="mt-2 text-sm">{t.focus}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {t.venue}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-accent">
                  <Whistle className="h-3 w-3" /> {t.coach}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
