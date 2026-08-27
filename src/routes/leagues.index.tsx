import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";
import { leagues } from "@/data/rafc";

export const Route = createFileRoute("/leagues/")({
  head: () => ({
    meta: [
      { title: "League Hub — RAFC" },
      {
        name: "description",
        content:
          "Browse all eight RAFC leagues, from RCLFA Junior and Youth to Championship, GDL MySAFA, ladies football and social leagues.",
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
      <div className="grid grid-cols-2 gap-3 px-5">
        {leagues.map((l) => (
          <Link
            key={l.slug}
            to="/leagues/$slug"
            params={{ slug: l.slug }}
            className="surface relative flex min-h-[8.5rem] flex-col justify-between overflow-hidden py-4 pl-5 pr-4 transition-transform active:scale-[0.98]"
          >
            <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: l.accent }} />
            <h2 className="text-base font-semibold uppercase leading-tight">{l.name}</h2>
            <div className="flex items-end justify-between gap-2">
              <p className="text-xs text-muted-foreground">{l.ageGroup}</p>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
