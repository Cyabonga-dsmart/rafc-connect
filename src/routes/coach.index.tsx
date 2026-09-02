import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, FilePlus2 } from "lucide-react";

import { PageHeader, Chip } from "@/components/ui-bits";
import { submissions } from "@/data/submissions";

export const Route = createFileRoute("/coach/")({
  head: () => ({
    meta: [
      { title: "Coach Dashboard — RAFC" },
      {
        name: "description",
        content:
          "Review RAFC player registration submissions, track document progress and approve registrations from the coach dashboard.",
      },
      { property: "og:title", content: "Coach Dashboard — RAFC" },
      { property: "og:description", content: "Track and approve RAFC player registration submissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoachDashboard,
});

export function statusClass(status: string) {
  if (status === "ready to approve") return "cta-accent";
  if (status === "rejected") return "bg-destructive text-destructive-foreground";
  if (status === "paid") return "bg-secondary text-silver";
  return "bg-secondary text-muted-foreground";
}

function CoachDashboard() {
  const total = submissions.length;
  const actionNeeded = submissions.filter((s) => s.docs.some((d) => d.status !== "approved")).length;
  const physical = submissions.filter((s) => s.physicalDocsOutstanding).length;
  const ready = submissions.filter((s) => s.status === "ready to approve").length;

  const stats = [
    { label: "Submissions", value: total },
    { label: "Action needed", value: actionNeeded },
    { label: "Physical docs", value: physical },
    { label: "Ready", value: ready },
  ];

  return (
    <div className="pb-6">
      <PageHeader title="Coach Desk" subtitle="Registration submissions and document review." />

      <div className="px-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] py-3 font-display text-sm uppercase tracking-[0.14em] text-white">
          <FilePlus2 className="h-4 w-4" /> Issue registration form
        </button>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="surface px-2 py-3 text-center">
              <p className="font-display text-2xl font-bold leading-none">{s.value}</p>
              <p className="mt-1.5 text-[0.6rem] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {submissions.map((s) => {
            const done = s.docs.filter((d) => d.status === "approved").length;
            return (
              <Link
                key={s.id}
                to="/coach/$id"
                params={{ id: s.id }}
                className="surface relative flex items-center gap-3 overflow-hidden p-4 pl-5"
              >
                <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: s.accent }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{s.player}</p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.12em] ${statusClass(s.status)}`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Chip>{s.league}</Chip>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="accent-bar h-full rounded-full"
                        style={{ width: `${(done / s.docs.length) * 100}%` }}
                      />
                    </div>
                    <span className="font-display text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {done}/{s.docs.length} docs
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
