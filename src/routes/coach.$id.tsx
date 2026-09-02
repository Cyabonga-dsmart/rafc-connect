import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";

import { Chip } from "@/components/ui-bits";
import { getSubmission, type DocStatus } from "@/data/submissions";

export const Route = createFileRoute("/coach/$id")({
  loader: ({ params }) => {
    const submission = getSubmission(params.id);
    if (!submission) throw notFound();
    return { submission };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.submission.player ?? "Submission";
    return {
      meta: [
        { title: `${name} — RAFC Registration Review` },
        {
          name: "description",
          content: `Review uploaded documents and approve the RAFC registration submission for ${name}.`,
        },
        { property: "og:title", content: `${name} — RAFC Registration Review` },
        { property: "og:description", content: `Document checklist and approval for ${name}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SubmissionDetail,
});

function SubmissionDetail() {
  const { submission } = Route.useLoaderData();
  const [docs, setDocs] = useState(submission.docs);
  const [approved, setApproved] = useState(false);

  const setStatus = (key: string, status: DocStatus) =>
    setDocs((d) => d.map((doc) => (doc.key === key ? { ...doc, status } : doc)));

  const allApproved = docs.every((d) => d.status === "approved");

  return (
    <div className="pb-8">
      <header
        className="px-5 pt-8 pb-6"
        style={{ backgroundImage: `linear-gradient(150deg, ${submission.accent} -20%, var(--navy-deep) 75%)` }}
      >
        <Link
          to="/coach"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.14em] text-silver/80"
        >
          <ArrowLeft className="h-4 w-4" /> Coach desk
        </Link>
        <h1 className="mt-3 text-3xl font-bold uppercase leading-tight">{submission.player}</h1>
        <div className="mt-2 flex items-center gap-2">
          <Chip>{submission.league}</Chip>
          <span className="text-xs text-silver/80">
            {docs.filter((d) => d.status === "approved").length}/{docs.length} documents approved
          </span>
        </div>
      </header>

      <div className="space-y-3 px-5 pt-6">
        <p className="eyebrow">Document checklist</p>
        {docs.map((d) => (
          <div key={d.key} className="surface flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{d.label}</p>
              <p
                className={`mt-0.5 font-display text-[0.65rem] uppercase tracking-[0.12em] ${
                  d.status === "approved"
                    ? "text-accent"
                    : d.status === "rejected"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {d.status}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Approve ${d.label}`}
              onClick={() => setStatus(d.key, "approved")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                d.status === "approved" ? "cta-accent" : "bg-secondary text-muted-foreground"
              }`}
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Reject ${d.label}`}
              onClick={() => setStatus(d.key, "rejected")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                d.status === "rejected"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          disabled={!allApproved || approved}
          onClick={() => setApproved(true)}
          className="cta-accent mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-display text-sm uppercase tracking-[0.14em] disabled:opacity-40 disabled:shadow-none"
        >
          {approved ? "Registration approved" : "Approve registration"} <Check className="h-4 w-4" />
        </button>
        {!allApproved && (
          <p className="text-center text-xs text-muted-foreground">
            Approve every document to unlock registration approval.
          </p>
        )}
      </div>
    </div>
  );
}
