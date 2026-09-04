import { createFileRoute, Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";
import { clubInfo } from "@/data/rafc";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "General Info — RAFC" },
      {
        name: "description",
        content:
          "Randburg AFC club address, training ground, contact details, committee members and social media channels.",
      },
      { property: "og:title", content: "General Info — RAFC" },
      { property: "og:description", content: "Where to find RAFC, who to contact and who runs the club." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GeneralInfo,
});

const socialIcons = { Facebook, Instagram, "Twitter / X": Twitter } as const;

function GeneralInfo() {
  return (
    <div className="pb-8">
      <PageHeader title="General info" subtitle="Find us, contact us, meet the committee" />

      <div className="space-y-6 px-5">
        <section className="surface p-5">
          <p className="eyebrow">Club address</p>
          <p className="mt-2 text-sm leading-relaxed">{clubInfo.address}</p>
          <a
            href={clubInfo.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="cta-accent mt-4 flex items-center justify-center gap-2 rounded-lg py-3 font-display text-sm uppercase tracking-[0.14em]"
          >
            <MapPin className="h-4 w-4" /> Open in Google Maps
          </a>
        </section>

        <section className="surface p-5">
          <p className="eyebrow">Training ground</p>
          <p className="mt-2 text-base font-semibold">{clubInfo.trainingGround.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{clubInfo.trainingGround.detail}</p>
        </section>

        <section>
          <p className="eyebrow mb-2">Contact</p>
          <div className="surface divide-y divide-border">
            <a href={`mailto:${clubInfo.email}`} className="flex items-center gap-3 px-4 py-3.5">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{clubInfo.email}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href={`tel:${clubInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 px-4 py-3.5">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{clubInfo.phone}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </section>

        <section>
          <p className="eyebrow mb-2">Committee</p>
          <div className="surface divide-y divide-border">
            {clubInfo.committee.map((c) => (
              <div key={c.role} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">{c.role}</span>
                <span className="text-sm font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow mb-2">Follow RAFC</p>
          <div className="grid grid-cols-3 gap-2">
            {clubInfo.socials.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="surface flex flex-col items-center gap-2 px-2 py-4"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-display text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {s.label}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <Link to="/sponsors" className="surface flex items-center gap-3 p-4">
            <span className="flex-1 text-sm font-medium">Our sponsors</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link to="/history" className="surface flex items-center gap-3 p-4">
            <span className="flex-1 text-sm font-medium">Club history</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </section>
      </div>
    </div>
  );
}
