import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — RAFC" },
      {
        name: "description",
        content:
          "Meet the gold, silver and bronze tier partners who back Randburg AFC — and find out how your business can sponsor the club.",
      },
      { property: "og:title", content: "Sponsors — RAFC" },
      { property: "og:description", content: "Gold, silver and bronze partners of Randburg Association FC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sponsors,
});

type Tier = { tier: string; color: string; sponsors: { name: string; category: string; color: string }[] };

const tiers: Tier[] = [
  {
    tier: "Gold",
    color: "#B45309",
    sponsors: [
      { name: "BSC", category: "Building supplies", color: "#B45309" },
      { name: "Hyundai", category: "Automotive", color: "#1D4ED8" },
    ],
  },
  {
    tier: "Silver",
    color: "#DDDDDD",
    sponsors: [
      { name: "Hirsch's", category: "Home appliances", color: "#DC2626" },
      { name: "Hollywood Foundation", category: "Community trust", color: "#2D7D32" },
      { name: "Euro Steel", category: "Steel & industry", color: "#0F766E" },
    ],
  },
  {
    tier: "Bronze",
    color: "#7C3AED",
    sponsors: [
      { name: "Wimpy", category: "Food & beverage", color: "#DC2626" },
      { name: "Afrihost", category: "Internet services", color: "#1D4ED8" },
      { name: "Castaways", category: "Hospitality", color: "#0F766E" },
      { name: "Ecopest", category: "Pest control", color: "#2D7D32" },
      { name: "FBS", category: "Financial services", color: "#001039" },
      { name: "JAM", category: "Media & marketing", color: "#BE185D" },
      { name: "Vecchio", category: "Restaurant", color: "#B45309" },
      { name: "AquaMonkey", category: "Water solutions", color: "#0F766E" },
      { name: "Gas Link", category: "Gas supply", color: "#7C3AED" },
    ],
  },
];

function Sponsors() {
  return (
    <div className="pb-8">
      <PageHeader title="RAFC Sponsors" subtitle="WE THANK YOU! 🙏⚽" />

      <div className="space-y-7 px-5">
        {tiers.map((t) => (
          <section key={t.tier}>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
              <h2 className="text-xl font-semibold uppercase tracking-wide">{t.tier} tier</h2>
            </div>
            <div className="space-y-2">
              {t.sponsors.map((s) => (
                <div key={s.name} className="surface flex items-center gap-3 p-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-base text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{s.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.category}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full border px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.12em]"
                    style={{ borderColor: t.color, color: t.color }}
                  >
                    {t.tier}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="surface overflow-hidden">
          <div className="accent-bar h-1 w-full" />
          <div className="p-5">
            <h2 className="text-xl font-semibold uppercase tracking-wide">Become a sponsor</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Put your brand in front of 500+ players and their families across eight leagues in Randburg.
            </p>
            <a
              href="mailto:sponsors@randburgafc.co.za?subject=Sponsorship%20enquiry"
              className="cta-accent mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-display text-sm uppercase tracking-[0.14em]"
            >
              <Mail className="h-4 w-4" /> Email the club
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
