import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BellOff, CalendarDays, CreditCard, Dumbbell, Newspaper } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";
import { notifications, type NotificationKind } from "@/data/rafc";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — RAFC" },
      {
        name: "description",
        content: "Club alerts for Randburg AFC: kick-off changes, match reports, training updates and subs reminders.",
      },
      { property: "og:title", content: "Notifications — RAFC" },
      { property: "og:description", content: "Kick-off changes, match reports and training updates from RAFC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notifications,
});

const icons: Record<NotificationKind, typeof Dumbbell> = {
  training: Dumbbell,
  match: CalendarDays,
  payment: CreditCard,
  news: Newspaper,
};

const filters = [
  { label: "All", kinds: null },
  { label: "Training", kinds: ["training"] },
  { label: "Matches", kinds: ["match"] },
  { label: "Payments", kinds: ["payment"] },
] as const;

function Notifications() {
  const [active, setActive] = useState(0);
  const selected = filters[active]!;
  const list = selected.kinds
    ? notifications.filter((n) => (selected.kinds as readonly string[]).includes(n.kind))
    : notifications;

  return (
    <div className="pb-6">
      <PageHeader title="Notifications" subtitle="Club alerts and matchday updates" />

      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto px-5">
        {filters.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-4 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
              i === active ? "cta-accent" : "bg-secondary text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="surface mx-5 flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <BellOff className="h-5 w-5 text-muted-foreground" />
          </span>
          <h2 className="text-base font-semibold">Nothing here yet</h2>
          <p className="text-sm text-muted-foreground">
            You have no {selected.label.toLowerCase()} notifications. New club alerts will land here.
          </p>
        </div>
      ) : (
        <div className="space-y-2 px-5">
          {list.map((n) => {
            const Icon = icons[n.kind];
            return (
              <article key={n.id} className="surface flex gap-3 p-4">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${n.accent}33`, color: "#FFFFFF" }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-base font-semibold leading-snug">{n.title}</h2>
                    <span className="shrink-0 text-[0.7rem] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.14em] text-white"
                      style={{ backgroundColor: n.accent }}
                    >
                      {n.league}
                    </span>
                    <span className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {n.kind}
                    </span>
                  </div>
                </div>
                {n.unread ? <span className="accent-bar mt-2 h-2 w-2 shrink-0 rounded-full" /> : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
