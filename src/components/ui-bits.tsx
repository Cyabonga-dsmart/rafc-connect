import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-xl font-semibold uppercase tracking-wide">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-[0.65rem] uppercase tracking-[0.14em] ${
        accent ? "cta-accent" : "bg-secondary text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-5 pt-8 pb-4">
      <p className="eyebrow">Randburg AFC</p>
      <h1 className="text-3xl font-bold uppercase">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}
