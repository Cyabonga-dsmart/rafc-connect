import { createFileRoute, Link } from "@tanstack/react-router";

import crest from "@/assets/rafc-crest.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Coach Sign In — RAFC" },
      {
        name: "description",
        content:
          "Sign in to the Randburg AFC coach portal to review player registrations, documents and MySAFA submissions.",
      },
      { property: "og:title", content: "Coach Sign In — RAFC" },
      { property: "og:description", content: "Randburg AFC coach portal sign in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="pb-10">
      <section
        className="px-5 pt-12 pb-8 text-center"
        style={{ backgroundImage: "linear-gradient(160deg, var(--navy-raised) 0%, var(--navy-deep) 80%)" }}
      >
        <img src={crest} alt="RAFC club crest" width={1024} height={1024} className="mx-auto h-24 w-24" />
        <h1 className="mt-4 text-3xl font-bold uppercase">Coach Portal</h1>
        <p className="mt-1 text-sm text-silver/80">Randburg Association Football Club</p>
      </section>

      <form className="mt-6 space-y-4 px-5" onSubmit={(e) => e.preventDefault()}>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            type="email"
            maxLength={255}
            placeholder="coach@randburgafc.co.za"
            className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Password</span>
          <input
            type="password"
            maxLength={128}
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-navy py-3.5 font-display text-sm uppercase tracking-[0.14em] text-foreground shadow-[var(--shadow-card)]"
        >
          Sign in
        </button>

        <div className="flex items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-border" />
          <span className="font-display text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Link
          to="/coach-access"
          className="flex w-full items-center justify-center rounded-lg border border-input py-3.5 font-display text-sm uppercase tracking-[0.14em] text-silver"
        >
          Request coach access
        </Link>

        <p className="pt-2 text-center text-xs text-muted-foreground">
          Players don't need an account — use the link sent by your coach
        </p>
      </form>
    </div>
  );
}
