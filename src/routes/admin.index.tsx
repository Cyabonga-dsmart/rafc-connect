import { createFileRoute, Link } from "@tanstack/react-router";
import { BellPlus, CreditCard, FileCheck2, Users } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";
import { submissions } from "@/data/submissions";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — RAFC" },
      {
        name: "description",
        content: "Randburg AFC admin dashboard: coach approvals, registration submissions, payments and club alerts.",
      },
      { property: "og:title", content: "Admin Dashboard — RAFC" },
      { property: "og:description", content: "Approve coaches, track registrations and send club-wide alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const paid = submissions.filter((s) => s.docs.some((d) => d.key === "pop" && d.status === "approved"));
  const ready = submissions.filter((s) => s.status === "ready to approve");

  const stats = [
    { label: "Members", value: "512", icon: Users },
    { label: "Submissions", value: String(submissions.length), icon: FileCheck2 },
    { label: "Payments in", value: String(paid.length), icon: CreditCard },
    { label: "Ready", value: String(ready.length), icon: BellPlus },
  ];

  return (
    <div className="pb-8">
      <PageHeader title="Admin" subtitle="Club-wide oversight for RAFC administrators" />

      <div className="grid grid-cols-2 gap-2 px-5">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="surface p-4">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <p className="mt-2 font-display text-2xl">{value}</p>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 space-y-2 px-5">
        <p className="eyebrow">Quick actions</p>
        <Link
          to="/admin/notifications"
          className="cta-accent flex items-center justify-center gap-2 rounded-lg py-3.5 font-display text-sm uppercase tracking-[0.14em]"
        >
          <BellPlus className="h-4 w-4" /> Send notification
        </Link>
        <Link
          to="/admin/payments"
          className="flex items-center justify-center gap-2 rounded-lg border border-border py-3.5 font-display text-sm uppercase tracking-[0.14em]"
        >
          <CreditCard className="h-4 w-4" /> View all payments
        </Link>
        <Link
          to="/coach"
          className="flex items-center justify-center gap-2 rounded-lg border border-border py-3.5 font-display text-sm uppercase tracking-[0.14em]"
        >
          <FileCheck2 className="h-4 w-4" /> Registration submissions
        </Link>
      </section>
    </div>
  );
}
