import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ExternalLink, Upload } from "lucide-react";

import { PageHeader, Chip } from "@/components/ui-bits";

export const Route = createFileRoute("/mysafa")({
  head: () => ({
    meta: [
      { title: "MySAFA Submission — RAFC" },
      {
        name: "description",
        content:
          "Submit an approved Randburg AFC player to MySAFA: upload the signed SAFA form, mark it submitted and capture the MySAFA ID.",
      },
      { property: "og:title", content: "MySAFA Submission — RAFC" },
      { property: "og:description", content: "Coach workflow for registering an RAFC player on MySAFA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MySafa,
});

type Status = "Pending" | "Submitted" | "Registered";

const player = {
  name: "Thabo Mokoena",
  league: "RCLFA Youth",
  idNumber: "0809125012083",
  school: "Randburg High School",
  season: "2026",
};

function MySafa() {
  const [status, setStatus] = useState<Status>("Pending");
  const [formName, setFormName] = useState<string | null>(null);
  const [safaId, setSafaId] = useState("");

  const badgeClass =
    status === "Registered" ? "cta-accent" : status === "Submitted" ? "bg-[#1D4ED8] text-white" : "bg-secondary text-muted-foreground";

  return (
    <div className="pb-10">
      <PageHeader title="MySAFA" subtitle="Register an approved player with SAFA." />

      <div className="space-y-4 px-5">
        <div className="surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">{player.name}</p>
              <div className="mt-1.5">
                <Chip>{player.league}</Chip>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.12em] ${badgeClass}`}
            >
              {status}
            </span>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            {[
              ["ID number", player.idNumber],
              ["School", player.school],
              ["Season", player.season],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-border pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href="https://www.mysafa.co.za"
          target="_blank"
          rel="noreferrer noopener"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] py-3.5 font-display text-sm uppercase tracking-[0.14em] text-white"
        >
          Open MySAFA website <ExternalLink className="h-4 w-4" />
        </a>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-input bg-secondary/40 px-4 py-4 text-sm">
          <Upload className="h-4 w-4 text-accent" />
          <span className="min-w-0 flex-1 truncate">{formName ?? "Upload signed SAFA form (PDF or photo)"}</span>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => setFormName(e.target.files?.[0]?.name ?? null)}
          />
        </label>

        <button
          type="button"
          disabled={status !== "Pending"}
          onClick={() => setStatus("Submitted")}
          className="w-full rounded-lg bg-secondary py-3.5 font-display text-sm uppercase tracking-[0.14em] disabled:opacity-40"
        >
          Mark as submitted to MySAFA
        </button>

        <label className="block">
          <span className="eyebrow">MySAFA ID</span>
          <input
            value={safaId}
            onChange={(e) => setSafaId(e.target.value)}
            maxLength={40}
            placeholder="e.g. MSF-4482910"
            className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button
          type="button"
          disabled={!safaId.trim() || status === "Registered"}
          onClick={() => setStatus("Registered")}
          className="cta-accent flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-display text-sm uppercase tracking-[0.14em] disabled:opacity-40 disabled:shadow-none"
        >
          Save MySAFA ID — mark as registered <CheckCircle2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
