import { createFileRoute } from "@tanstack/react-router";
import { Bell, CreditCard, LogOut, Shield, Users } from "lucide-react";

import crest from "@/assets/rafc-crest.png";
import { Chip } from "@/components/ui-bits";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — RAFC" },
      {
        name: "description",
        content: "Manage your Randburg AFC member profile, followed teams, alert preferences and club subscriptions.",
      },
      { property: "og:title", content: "Profile — RAFC" },
      { property: "og:description", content: "Your RAFC member profile, followed teams and alert preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});

const rows = [
  { icon: Users, label: "Followed teams", value: "3 leagues" },
  { icon: Bell, label: "Match alerts", value: "On" },
  { icon: CreditCard, label: "Club subscriptions", value: "Due 31 Aug" },
  { icon: Shield, label: "Player registration", value: "Verified" },
];

function Profile() {
  return (
    <div className="pb-6">
      <header className="px-5 pt-8 pb-6" style={{ backgroundImage: "var(--gradient-navy)" }}>
        <div className="flex items-center gap-4">
          <img src={crest} alt="RAFC crest" loading="lazy" width={1024} height={1024} className="h-16 w-16" />
          <div>
            <h1 className="text-2xl font-bold uppercase leading-tight">Siyabonga M.</h1>
            <p className="mt-1 text-sm text-muted-foreground">Parent · Championship &amp; RCLFA U13–U19</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Chip accent>Member</Chip>
          <Chip>Since 2024</Chip>
        </div>
      </header>

      <div className="mt-5 space-y-2 px-5">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="surface flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <Icon className="h-4 w-4" />
            </span>
            <p className="flex-1 text-sm font-medium">{label}</p>
            <span className="text-xs text-muted-foreground">{value}</span>
          </div>
        ))}

        <button className="cta-accent mt-4 w-full rounded-lg py-3 font-display text-sm uppercase tracking-[0.14em]">
          Manage notifications
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-3 font-display text-sm uppercase tracking-[0.14em] text-muted-foreground">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );
}
