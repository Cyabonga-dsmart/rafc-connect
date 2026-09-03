import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pending")({
  head: () => ({
    meta: [
      { title: "Awaiting Approval — RAFC" },
      {
        name: "description",
        content:
          "Your Randburg AFC coach account is awaiting club admin approval. Here's what happens next and when you can log back in.",
      },
      { property: "og:title", content: "Awaiting Approval — RAFC" },
      { property: "og:description", content: "Your RAFC coach account is pending admin approval." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pending,
});

const steps = [
  { title: "A club admin reviews your request", body: "We confirm your name, phone number and the leagues you coach." },
  { title: "You receive a confirmation email", body: "Sent to the address you signed up with, usually within 24 hours." },
  { title: "Log back in", body: "Once approved, sign in again to open the coach desk." },
];

function Pending() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-5xl" role="img" aria-label="Clock">
        ⏳
      </span>
      <h1 className="mt-5 text-3xl font-bold uppercase">Awaiting approval</h1>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Your coach account has been created and is pending review by a Randburg AFC admin.
      </p>

      <ol className="mt-8 w-full space-y-3 text-left">
        {steps.map((s, i) => (
          <li key={s.title} className="surface flex gap-3 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-xs">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium">{s.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        to="/login"
        className="mt-8 flex w-full items-center justify-center rounded-lg border border-input py-3.5 font-display text-sm uppercase tracking-[0.14em] text-silver"
      >
        Sign out
      </Link>
    </div>
  );
}
