import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";

import { Chip, PageHeader } from "@/components/ui-bits";
import { allFixtures } from "@/data/rafc";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures — RAFC" },
      {
        name: "description",
        content: "Every upcoming Randburg AFC fixture across all eight leagues, with kick-off times and venues.",
      },
      { property: "og:title", content: "Fixtures — RAFC" },
      { property: "og:description", content: "Club-wide RAFC fixture list with kick-off times and venues." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fixtures,
});

function Fixtures() {
  const grouped = allFixtures.reduce<Record<string, typeof allFixtures>>((acc, f) => {
    (acc[f.date] ??= []).push(f);
    return acc;
  }, {});

  return (
    <div className="pb-6">
      <PageHeader title="Fixtures" subtitle="All RAFC teams · matchdays ahead" />
      <div className="space-y-6 px-5">
        {Object.entries(grouped).map(([date, list]) => (
          <section key={date}>
            <p className="eyebrow mb-2">{date}</p>
            <div className="space-y-2">
              {list.map((f) => (
                <div key={f.id} className="surface p-4">
                  <div className="flex items-center justify-between">
                    <Chip>{f.league}</Chip>
                    <Chip accent={f.home}>{f.home ? "Home" : "Away"}</Chip>
                  </div>
                  <p className="mt-3 text-base font-semibold">RAFC vs {f.opponent}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {f.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> {f.venue}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
