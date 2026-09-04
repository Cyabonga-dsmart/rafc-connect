import { useCallback, useEffect, useState } from "react";

export type Role = "player" | "coach" | "admin";

export type Session = {
  name: string;
  email: string;
  role: Role;
};

const KEY = "rafc.session";

// Local session store. Firebase Auth will replace read/write here — no Supabase.
export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function writeSession(session: Session | null) {
  if (typeof window === "undefined") return;
  if (session) window.localStorage.setItem(KEY, JSON.stringify(session));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("rafc-session"));
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync();
    setReady(true);
    window.addEventListener("rafc-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("rafc-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const signIn = useCallback((s: Session) => writeSession(s), []);
  const signOut = useCallback(() => writeSession(null), []);

  return { session, ready, signIn, signOut };
}
