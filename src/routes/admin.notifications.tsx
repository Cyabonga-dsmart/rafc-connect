import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

import { Chip } from "@/components/ui-bits";
import { leagues } from "@/data/rafc";
import { sentNotifications, type SentNotification } from "@/data/payments";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({
    meta: [
      { title: "Send Notification — RAFC Admin" },
      {
        name: "description",
        content:
          "Compose and send a Randburg AFC club notification to all players, a single league or one player, and review recently sent alerts.",
      },
      { property: "og:title", content: "Send Notification — RAFC Admin" },
      { property: "og:description", content: "Compose club-wide, league or player notifications for Randburg AFC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminNotifications;
});

const targets = ["All players", "By league", "Specific player"] as const;
type Target = (typeof targets)[number];

function AdminNotifications() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState<Target>("All players");
  const [league, setLeague] = useState(leagues[0]!.name);
  const [player, setPlayer] = useState("");
  const [history, setHistory] = useState<SentNotification[]>(sentNotifications);

  const canSend =
    title.trim().length > 0 &&
    body.trim().length > 0 &&
    (target !== "Specific player" || player.trim().length > 0);

  const send = () => {
    const to = target === "By league" ? league : target === "Specific player" ? player.trim() : "All players";
    setHistory((h) => [
      { id: `sn-${Date.now()}`, title: title.trim(), body: body.trim(), target: to, sent: "Just now" },
      ...h,
    ]);
    setTitle("");
    setBody("");
    setPlayer("");
  };

  return (
    <div className="pb-8">
      <header className="px-5 pt-8 pb-6" style={{ backgroundImage: "var(--gradient-navy)" }}>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.14em] text-silver/80"
        >
          <ArrowLeft className="h-4 w-4" /> Admin
        </Link>
        <h1 className="mt-3 text-3xl font-bold uppercase leading-tight">Send notification</h1>
        <p className="mt-1 text-sm text-silver/80">Push an alert to the club, a league or one player.</p>
      </header>

      <div className="space-y-4 px-5 pt-6">
        <label className="block">
          <span className="eyebrow">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="e.g. Training moved to Field 3"
            className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block">
          <span className="eyebrow">Message</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={400}
            rows={4}
            placeholder="Write the announcement…"
            className="mt-1.5 w-full resize-none rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <div>
          <span className="eyebrow">Send to</span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {targets.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTarget(t)}
                className={`rounded-full px-3.5 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.12em] ${
                  target === t ? "cta-accent" : "bg-secondary text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {target === "By league" && (
          <div>
            <span className="eyebrow">League</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {leagues.map((l) => (
                <button
                  key={l.slug}
                  type="button"
                  onClick={() => setLeague(l.name)}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.12em] ${
                    league === l.name ? "bg-navy text-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.accent }} />
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {target === "Specific player" && (
          <label className="block">
            <span className="eyebrow">Player name</span>
            <input
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              maxLength={80}
              placeholder="e.g. Thabo Mokoena"
              className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        )}

        <button
          type="button"
          disabled={!canSend}
          onClick={send}
          className="cta-accent flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-display text-sm uppercase tracking-[0.14em] disabled:opacity-40 disabled:shadow-none"
        >
          Send notification <Send className="h-4 w-4" />
        </button>

        <section className="pt-2">
          <p className="eyebrow">Recently sent</p>
          <div className="mt-2 space-y-2">
            {history.map((n) => (
              <article key={n.id} className="surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {n.sent}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
                <div className="mt-2">
                  <Chip>{n.target}</Chip>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
