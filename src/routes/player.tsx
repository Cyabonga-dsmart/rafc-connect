import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";

import { Chip } from "@/components/ui-bits";
import { playerProfile as p } from "@/data/rafc";

export const Route = createFileRoute("/player")({
  head: () => ({
    meta: [
      { title: "Player Profile — RAFC" },
      {
        name: "description",
        content: "Randburg AFC player profile: appearances, goals, assists, jersey number, MySAFA ID and documents.",
      },
      { property: "og:title", content: "Player Profile — RAFC" },
      { property: "og:description", content: "Season stats, registration status and document checklist." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayerProfile,
});

const initials = p.name
  .split(" ")
  .map((w) => w[0])
  .join("");

function PlayerProfile() {
  return (
    <div className="pb-8">
      <header
        className="px-5 pt-8 pb-6"
        style={{ backgroundImage: `linear-gradient(150deg, ${p.accent} -20%, var(--navy-deep) 75%)` }}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/12 font-display text-xl tracking-[0.08em]">
            {initials}
          </span>
          <div>
            <h1 className="text-2xl font-bold uppercase leading-tight">{p.name}</h1>
            <p className="mt-1 text-sm text-silver/80">“{p.preferredName}”</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: p.accent }}
          >
            {p.league}
          </span>
          <Chip>{p.ageGroup}</Chip>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 px-5 pt-5">
        {[
          { label: "Apps", value: p.appearances },
          { label: "Goals", value: p.goals },
          { label: "Assists", value: p.assists },
        ].map((s) => (
          <div key={s.label} className="surface px-3 py-4 text-center">
            <p className="font-display text-2xl">{s.value}</p>
            <p className="mt-1 font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-6 px-5">
        <p className="eyebrow mb-2">Details</p>
        <div className="surface divide-y divide-border">
          {[
            { label: "Position", value: p.position },
            { label: "Jersey number", value: `#${p.number}` },
            { label: "School", value: p.school },
            { label: "MySAFA ID", value: p.mysafaId },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 flex gap-2 px-5">
        <div className="surface flex-1 p-4">
          <p className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">Registration</p>
          <span className="cta-accent mt-2 inline-flex rounded-full px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.14em]">
            {p.registration}
          </span>
        </div>
        <div className="surface flex-1 p-4">
          <p className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">Payment</p>
          <span className="cta-accent mt-2 inline-flex rounded-full px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.14em]">
            {p.payment}
          </span>
        </div>
      </section>

      <section className="mt-6 px-5">
        <p className="eyebrow mb-2">Documents</p>
        <div className="surface divide-y divide-border">
          {p.documents.map((d) => (
            <div key={d.label} className="flex items-center gap-3 px-4 py-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  d.done ? "cta-accent" : "bg-secondary text-muted-foreground"
                }`}
              >
                {d.done ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
              </span>
              <p className="flex-1 text-sm">{d.label}</p>
              <span className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                {d.done ? "Received" : "Outstanding"}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Documents are managed by your coach. Contact the club office to update them.
        </p>
      </section>
    </div>
  );
}
