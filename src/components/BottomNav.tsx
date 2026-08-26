import { Link } from "@tanstack/react-router";
import { Home, Trophy, CalendarDays, Bell, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/leagues", label: "Leagues", icon: Trophy },
  { to: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { to: "/notifications", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-navy-deep/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex flex-col items-center gap-1 py-2.5 text-muted-foreground transition-colors data-[status=active]:text-foreground"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-0.5 w-7 rounded-full transition-opacity ${
                      isActive ? "accent-bar opacity-100" : "opacity-0"
                    }`}
                  />
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  <span className="font-display text-[0.65rem] uppercase tracking-[0.12em]">{label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
