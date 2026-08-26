import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/ui-bits";
import { notifications } from "@/data/rafc";

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

function Notifications() {
  return (
    <div className="pb-6">
      <PageHeader title="Notifications" subtitle="Club alerts and matchday updates" />
      <div className="space-y-2 px-5">
        {notifications.map((n) => (
          <article key={n.id} className="surface flex gap-3 p-4">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "accent-bar" : "bg-muted-foreground/40"}`}
            />
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-base font-semibold leading-snug">{n.title}</h2>
                <span className="shrink-0 text-[0.7rem] text-muted-foreground">{n.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
