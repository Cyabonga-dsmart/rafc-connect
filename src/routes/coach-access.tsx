import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/ui-bits";
import { leagues } from "@/data/rafc";

export const Route = createFileRoute("/coach-access")({
  head: () => ({
    meta: [
      { title: "Request Coach Access — RAFC" },
      {
        name: "description",
        content:
          "Coaches can request access to the Randburg AFC portal, select the leagues they manage and await club admin approval.",
      },
      { property: "og:title", content: "Request Coach Access — RAFC" },
      { property: "og:description", content: "Create a Randburg AFC coach account pending admin approval." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoachAccess,
});

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        maxLength={255}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function CoachAccess() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  return (
    <div className="pb-10">
      <PageHeader title="Coach Access" subtitle="Create an account to manage registrations." />

      <form
        className="space-y-4 px-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/pending" });
        }}
      >
        <div className="surface space-y-4 p-5">
          <Field label="Full name" placeholder="Sizwe Mahlangu" />
          <Field label="Email" type="email" placeholder="coach@randburgafc.co.za" />
          <Field label="Phone" type="tel" placeholder="082 000 0000" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <Field label="Confirm password" type="password" placeholder="••••••••" />
        </div>

        <div className="surface p-5">
          <p className="eyebrow">Leagues you coach</p>
          <div className="mt-3 space-y-2">
            {leagues.map((l) => (
              <label
                key={l.slug}
                className="flex cursor-pointer items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2.5"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(l.slug)}
                  onChange={() => toggle(l.slug)}
                  className="h-4 w-4 accent-[var(--pitch)]"
                />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: l.accent }} />
                <span className="min-w-0 flex-1 truncate text-sm">{l.name}</span>
                <span className="text-xs text-muted-foreground">{l.ageGroup}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="cta-accent w-full rounded-lg py-3.5 font-display text-sm uppercase tracking-[0.14em]"
        >
          Request access
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Your role stays pending until a club admin approves the request.
        </p>
      </form>
    </div>
  );
}
