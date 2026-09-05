import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, FileCheck2, FileX2 } from "lucide-react";

import { payments as seedPayments, type Payment, type PaymentStatus } from "@/data/payments";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({
    meta: [
      { title: "Payments — RAFC Admin" },
      {
        name: "description",
        content:
          "Track Randburg AFC registration payments: amounts, methods, references, proof of payment and unpaid, pending, paid or overdue status.",
      },
      { property: "og:title", content: "Payments — RAFC Admin" },
      { property: "og:description", content: "Registration payment tracking and confirmation for Randburg AFC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPayments,
});

const filters = ["all", "unpaid", "pending", "paid", "overdue"] as const;
type Filter = (typeof filters)[number];

function statusClass(status: PaymentStatus) {
  if (status === "paid") return "cta-accent";
  if (status === "overdue") return "bg-destructive text-destructive-foreground";
  if (status === "pending") return "bg-[#1D4ED8] text-white";
  return "bg-secondary text-muted-foreground";
}

function AdminPayments() {
  const [rows, setRows] = useState<Payment[]>(seedPayments);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);
  const collected = rows.filter((r) => r.status === "paid").reduce((sum, r) => sum + r.amount, 0);
  const outstanding = rows.filter((r) => r.status !== "paid").reduce((sum, r) => sum + r.amount, 0);

  const confirm = (id: string) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: "paid" as PaymentStatus } : r)));

  return (
    <div className="pb-8">
      <header className="px-5 pt-8 pb-6" style={{ backgroundImage: "var(--gradient-navy)" }}>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.14em] text-silver/80"
        >
          <ArrowLeft className="h-4 w-4" /> Admin
        </Link>
        <h1 className="mt-3 text-3xl font-bold uppercase leading-tight">Payments</h1>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="surface p-4">
            <p className="font-display text-2xl">R{collected.toLocaleString("en-ZA")}</p>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">Collected</p>
          </div>
          <div className="surface p-4">
            <p className="font-display text-2xl">R{outstanding.toLocaleString("en-ZA")}</p>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">Outstanding</p>
          </div>
        </div>
      </header>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.12em] ${
              filter === f ? "cta-accent" : "bg-secondary text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2 px-5">
        {visible.map((p) => (
          <div key={p.id} className="surface relative overflow-hidden p-4 pl-5">
            <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: p.accent }} />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{p.player}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.league}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.12em] ${statusClass(p.status)}`}
              >
                {p.status}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="font-display text-sm">R{p.amount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Method</dt>
                <dd className="font-medium">{p.method}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Reference</dt>
                <dd className="truncate font-medium">{p.reference}</dd>
              </div>
            </dl>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.12em] ${
                  p.proof ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {p.proof ? <FileCheck2 className="h-3.5 w-3.5" /> : <FileX2 className="h-3.5 w-3.5" />}
                {p.proof ? "Proof uploaded" : "No proof"}
              </span>
              {p.status === "pending" && (
                <button
                  type="button"
                  onClick={() => confirm(p.id)}
                  className="cta-accent inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-display text-[0.65rem] uppercase tracking-[0.12em]"
                >
                  <Check className="h-3.5 w-3.5" /> Confirm payment
                </button>
              )}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No {filter} payments right now.</p>
        )}
      </div>
    </div>
  );
}
