import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Clock } from "lucide-react";

import crest from "@/assets/rafc-crest.png";
import stadium from "@/assets/hero-stadium.jpg";
import { SectionHeading, Chip } from "@/components/ui-bits";
import { latestResult, leagues, news, nextFixture, sponsors } from "@/data/rafc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAFC — Randburg Association Football Club" },
      {
        name: "description",
        content:
          "Official Randburg AFC app: fixtures, results, squads, league tables and training schedules across all eight RAFC leagues.",
      },
      { property: "og:title", content: "RAFC — Randburg Association Football Club" },
      {
        property: "og:description",
        content: "Fixtures, results, squads and training for every RAFC team in Randburg, Johannesburg.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const training = leagues[2]!.training;

  return (
    <div className="pb-6">
      <section className="relative overflow-hidden">
        <img
          src={stadium}
          alt="Floodlit football stadium at night"
          width={1440}
          height={960}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
        <div className="relative px-5 pt-12 pb-7">
          <img src={crest} alt="RAFC club crest" width={1024} height={1024} className="h-24 w-24" />
          <h1 className="mt-4 text-4xl font-bold uppercase leading-[0.95]">
            Randburg
            <br />
            Association FC
          </h1>
          <p className="mt-2 max-w-xs text-sm text-silver/80">
            Randburg, Johannesburg · Eight leagues, one club. Est. 2024.
          </p>
        </div>
      </section>

      <div className="space-y-8 px-5 pt-6">
        <section>
          <SectionHeading eyebrow="Next up" title="Upcoming fixture" />
          <div className="surface overflow-hidden">
            <div className="accent-bar h-1 w-full" />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <Chip>{nextFixture.competition}</Chip>
                <Chip accent>{nextFixture.home ? "Home" : "Away"}</Chip>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex-1 text-center">
                  <img src={crest} alt="" loading="lazy" width={1024} height={1024} className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-display text-sm uppercase">RAFC</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold">{nextFixture.time}</p>
                  <p className="text-xs text-muted-foreground">{nextFixture.date}</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-display text-sm">
                    {nextFixture.opponent.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="mt-2 font-display text-sm uppercase">{nextFixture.opponent}</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {nextFixture.venue}
              </p>
              <Link
                to="/fixtures"
                className="cta-accent mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-display text-sm uppercase tracking-[0.14em]"
              >
                All fixtures <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Full time" title="Latest result" />
          <div className="surface flex items-center justify-between p-5">
            <div>
              <p className="font-display text-lg uppercase">
                RAFC vs {latestResult.opponent}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {latestResult.date} · {latestResult.competition}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-bold">
                {latestResult.scoreFor}–{latestResult.scoreAgainst}
              </p>
              <Chip accent>Win</Chip>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="This week"
            title="Training"
            action={
              <Link to="/leagues" className="font-display text-xs uppercase tracking-[0.14em] text-accent">
                By team
              </Link>
            }
          />
          <div className="space-y-2">
            {training.map((t) => (
              <div key={t.day} className="surface flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary">
                  <span className="font-display text-xs uppercase">{t.day.slice(0, 3)}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{t.focus}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {t.time} · {t.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Club news" title="Announcements" />
          <div className="space-y-3">
            {news.map((n) => (
              <article key={n.id} className="surface p-5">
                <div className="flex items-center justify-between">
                  <Chip>{n.tag}</Chip>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{n.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="surface p-5">
          <p className="eyebrow text-center">Our partners</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {sponsors.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-secondary/60 px-3 py-2 font-display text-[0.7rem] uppercase tracking-[0.12em] text-silver"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
