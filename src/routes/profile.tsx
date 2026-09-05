import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  BellPlus,
  ChevronRight,
  CreditCard,
  Handshake,
  History,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Shield,
  UserPen,
  Users,
} from "lucide-react";

import crest from "@/assets/rafc-crest.png";
import { Chip } from "@/components/ui-bits";
import { useSession } from "@/lib/auth";

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
  const { session, signOut } = useSession();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(true);

  const name = session?.name ?? "Siyabonga M.";
  const isAdmin = session?.role === "admin";

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="pb-6">
      <header className="px-5 pt-8 pb-6" style={{ backgroundImage: "var(--gradient-navy)" }}>
        <div className="flex items-center gap-4">
          <img src={crest} alt="RAFC crest" loading="lazy" width={1024} height={1024} className="h-16 w-16" />
          <div>
            <h1 className="text-2xl font-bold uppercase leading-tight">{name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Parent · Championship League &amp; RCLFA U13–U19</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Chip accent>{session?.role ?? "Member"}</Chip>
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
      </div>

      <section className="mt-6 space-y-2 px-5">
        <p className="eyebrow">Club</p>
        <Link to="/sponsors" className="surface flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <Handshake className="h-4 w-4" />
          </span>
          <p className="flex-1 text-sm font-medium">Sponsors</p>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
        <Link to="/history" className="surface flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <History className="h-4 w-4" />
          </span>
          <p className="flex-1 text-sm font-medium">Club history</p>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </section>

      <section className="mt-6 space-y-2 px-5">
        <p className="eyebrow">Settings</p>
        <button type="button" className="surface flex w-full items-center gap-3 p-4 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <UserPen className="h-4 w-4" />
          </span>
          <p className="flex-1 text-sm font-medium">Edit profile</p>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <button type="button" className="surface flex w-full items-center gap-3 p-4 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <KeyRound className="h-4 w-4" />
          </span>
          <p className="flex-1 text-sm font-medium">Change password</p>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="surface flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <Bell className="h-4 w-4" />
          </span>
          <p className="flex-1 text-sm font-medium">Notification preferences</p>
          <button
            type="button"
            role="switch"
            aria-checked={alerts}
            aria-label="Notification preferences"
            onClick={() => setAlerts((a) => !a)}
            className={`relative h-6 w-11 rounded-full transition-colors ${alerts ? "cta-accent" : "bg-secondary"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${
                alerts ? "translate-x-[1.4rem]" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </section>

      {isAdmin && (
        <section className="mt-6 space-y-2 px-5">
          <p className="eyebrow">Admin</p>
          <Link
            to="/admin"
            className="cta-accent flex items-center justify-center gap-2 rounded-lg py-3.5 font-display text-sm uppercase tracking-[0.14em]"
          >
            <LayoutDashboard className="h-4 w-4" /> Admin dashboard
          </Link>
          <Link
            to="/admin/notifications"
            className="flex items-center justify-center gap-2 rounded-lg border border-border py-3.5 font-display text-sm uppercase tracking-[0.14em]"
          >
            <BellPlus className="h-4 w-4" /> Send notification
          </Link>
          <Link
            to="/admin/payments"
            className="flex items-center justify-center gap-2 rounded-lg border border-border py-3.5 font-display text-sm uppercase tracking-[0.14em]"
          >
            <CreditCard className="h-4 w-4" /> View all payments
          </Link>
        </section>
      )}

      <div className="mt-6 px-5">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-3 font-display text-sm uppercase tracking-[0.14em] text-muted-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );
}
