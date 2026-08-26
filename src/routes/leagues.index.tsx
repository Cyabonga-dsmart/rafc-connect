import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";
import { leagues } from "@/data/rafc";

export const Route = createFileRoute("/leagues/")({
  head: () => ({
    meta: [
      { title: "League Hub — RAFC" },
      {
        name: "description",
        content:
          "Browse all eight RAFC leagues, from RCLFA U6–U12 and youth teams to Championship, GDL MySAFA and ladies football.",
      },
      { property: "og:title", content: "League Hub — RAFC" },
      { property: "og:description", content: "All eight Randburg AFC leagues in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeagueHub,
});

function LeagueHub() {
  return (
    <div className="pb-6">
      <PageHeader title="League Hub" subtitle="Eight competitions across juniors, youth, seniors and ladies." />
      <div className="space-y-3 px-5">
        {leagues.map((l) => (
          <Link
            key={l.slug}
            to="/leagues/$slug"
            params={{ slug: l.slug }}
            className="surface flex items-center gap-4 overflow-hidden p-0 transition-transform active:scale-[0.99]"
          >
            <span className="h-full min-h-[5.25rem] w-1.5 shrink-0" style={{ backgroundColor: l.accent }} />
            <div className="flex flex-1 items-center justify-between py-5 pr-5">
              <div>
                <h2 className="text-lg font-semibold uppercase leading-tight">{l.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {l.ageGroup} · {l.squad.length} players
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
