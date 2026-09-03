import { createFileRoute } from "@tanstack/react-router";
import { Trophy, UserRound } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Club History — RAFC" },
      {
        name: "description",
        content:
          "From a single side founded in Randburg in 1983 to eight leagues and 500+ players — the story, honours and key people of Randburg AFC.",
      },
      { property: "og:title", content: "Club History — RAFC" },
      { property: "og:description", content: "The story of Randburg Association Football Club since 1983." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: History,
});

const timeline = [
  {
    year: "1983",
    title: "Founded in Randburg",
    body: "A group of local families start Randburg Association Football Club with one senior side playing on municipal fields.",
  },
  {
    year: "1994",
    title: "First junior structures",
    body: "The club opens its doors to U6–U12 players, laying the foundation of what becomes the RCLFA Junior programme.",
  },
  {
    year: "2005",
    title: "Growth through the leagues",
    body: "Youth teams climb into RCLFA Youth competition and the senior side earns promotion into Championship football.",
  },
  {
    year: "2013",
    title: "Ladies football arrives",
    body: "Ladies RCLFA launches, followed by a Regional SAFA side, making RAFC one of Randburg's few full-family clubs.",
  },
  {
    year: "2019",
    title: "Social leagues added",
    body: "League 7 and League 8 bring seven- and eight-a-side football to working adults across the northern suburbs.",
  },
  {
    year: "2026",
    title: "Eight leagues, 500+ players",
    body: "RAFC now fields teams from U6 through senior men and women, with floodlit training at Ferndale Astro.",
  },
];

const honours = [
  { title: "RCLFA Youth Champions", detail: "2016, 2019, 2023" },
  { title: "Championship League runners-up", detail: "2022, 2025" },
  { title: "Ladies RCLFA Cup winners", detail: "2024" },
  { title: "GDL MySAFA Fair Play Award", detail: "2021, 2024" },
];

const people = [
  { name: "Sizwe Mahlangu", role: "Head of coaching" },
  { name: "Dean Roberts", role: "Championship head coach" },
  { name: "Palesa Dube", role: "Ladies programme lead" },
  { name: "Riaan Fourie", role: "Club chairman" },
  { name: "Nomsa Zwane", role: "Registrations & MySAFA" },
];

function History() {
  return (
    <div className="pb-8">
      <PageHeader title="Club History" subtitle="Randburg, Johannesburg · Est. 1983" />

      <div className="px-5">
        <ol className="relative space-y-5 border-l border-border pl-6">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="accent-bar absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full" />
              <p className="font-display text-sm uppercase tracking-[0.16em] text-accent">{t.year}</p>
              <h2 className="mt-1 text-lg font-semibold leading-snug">{t.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-9">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold uppercase tracking-wide">Honours</h2>
          </div>
          <div className="space-y-2">
            {honours.map((h) => (
              <div key={h.title} className="surface flex items-center justify-between gap-3 p-4">
                <p className="min-w-0 text-sm font-medium">{h.title}</p>
                <p className="shrink-0 font-display text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {h.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <div className="mb-3 flex items-center gap-2">
            <UserRound className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold uppercase tracking-wide">Key people</h2>
          </div>
          <div className="space-y-2">
            {people.map((p) => (
              <div key={p.name} className="surface flex items-center gap-3 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm">
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
