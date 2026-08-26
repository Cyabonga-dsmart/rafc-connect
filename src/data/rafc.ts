export type Player = {
  name: string;
  number: number;
  position: string;
};

export type Fixture = {
  id: string;
  opponent: string;
  home: boolean;
  competition: string;
  date: string;
  time: string;
  venue: string;
};

export type Result = {
  id: string;
  opponent: string;
  home: boolean;
  scoreFor: number;
  scoreAgainst: number;
  date: string;
  competition: string;
};

export type TableRow = {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
};

export type Training = {
  day: string;
  time: string;
  focus: string;
  venue: string;
};

export type League = {
  slug: string;
  name: string;
  short: string;
  ageGroup: string;
  accent: string;
  squad: Player[];
  fixtures: Fixture[];
  results: Result[];
  table: TableRow[];
  training: Training[];
};

const positions = ["Goalkeeper", "Defender", "Midfielder", "Winger", "Striker"];

function squad(prefix: string): Player[] {
  const first = [
    "Thabo",
    "Sipho",
    "Liam",
    "Kabelo",
    "Ethan",
    "Lwazi",
    "Ruan",
    "Tumelo",
    "Jayden",
    "Naledi",
    "Bandile",
    "Keegan",
  ];
  const last = [
    "Mokoena",
    "Nkosi",
    "van Wyk",
    "Dlamini",
    "Botha",
    "Khumalo",
    "Pretorius",
    "Sithole",
    "Naidoo",
    "Mabaso",
    "Fourie",
    "Zwane",
  ];
  return first.map((f, i) => ({
    name: `${f} ${last[(i + prefix.length) % last.length]}`,
    number: i + 1,
    position: positions[i % positions.length],
  }));
}

function fixtures(competition: string): Fixture[] {
  return [
    {
      id: `${competition}-f1`,
      opponent: "Bryanston Bulls",
      home: true,
      competition,
      date: "Sat 29 Aug",
      time: "09:30",
      venue: "Randburg Sports Complex",
    },
    {
      id: `${competition}-f2`,
      opponent: "Fourways United",
      home: false,
      competition,
      date: "Sat 5 Sep",
      time: "11:00",
      venue: "Fourways Memorial Fields",
    },
    {
      id: `${competition}-f3`,
      opponent: "Sandton City FC",
      home: true,
      competition,
      date: "Sun 13 Sep",
      time: "14:00",
      venue: "Randburg Sports Complex",
    },
  ];
}

function results(competition: string): Result[] {
  return [
    {
      id: `${competition}-r1`,
      opponent: "Northcliff Rovers",
      home: true,
      scoreFor: 3,
      scoreAgainst: 1,
      date: "Sat 22 Aug",
      competition,
    },
    {
      id: `${competition}-r2`,
      opponent: "Ferndale Athletic",
      home: false,
      scoreFor: 2,
      scoreAgainst: 2,
      date: "Sat 15 Aug",
      competition,
    },
    {
      id: `${competition}-r3`,
      opponent: "Cosmo City Stars",
      home: true,
      scoreFor: 1,
      scoreAgainst: 0,
      date: "Sat 8 Aug",
      competition,
    },
  ];
}

const table: TableRow[] = [
  { team: "RAFC", played: 12, won: 9, drawn: 2, lost: 1, gd: 18, points: 29 },
  { team: "Fourways United", played: 12, won: 8, drawn: 2, lost: 2, gd: 12, points: 26 },
  { team: "Sandton City FC", played: 12, won: 7, drawn: 1, lost: 4, gd: 7, points: 22 },
  { team: "Bryanston Bulls", played: 12, won: 5, drawn: 3, lost: 4, gd: 2, points: 18 },
  { team: "Northcliff Rovers", played: 12, won: 4, drawn: 2, lost: 6, gd: -4, points: 14 },
  { team: "Ferndale Athletic", played: 12, won: 2, drawn: 3, lost: 7, gd: -11, points: 9 },
  { team: "Cosmo City Stars", played: 12, won: 1, drawn: 1, lost: 10, gd: -24, points: 4 },
];

const training: Training[] = [
  { day: "Tuesday", time: "17:30 – 19:00", focus: "Possession & pressing", venue: "Randburg Sports Complex" },
  { day: "Thursday", time: "17:30 – 19:00", focus: "Finishing & set pieces", venue: "Randburg Sports Complex" },
  { day: "Friday", time: "16:30 – 17:30", focus: "Matchday activation", venue: "Ferndale Astro" },
];

const base = [
  { slug: "rclfa-u6-u12", name: "RCLFA U6–U12", short: "RCLFA Juniors", ageGroup: "Junior development", accent: "oklch(0.508 0.126 148.5)" },
  { slug: "rclfa-u13-u19", name: "RCLFA U13–U19", short: "RCLFA Youth", ageGroup: "Youth", accent: "oklch(0.62 0.16 235)" },
  { slug: "championship", name: "Championship", short: "Championship", ageGroup: "Senior men", accent: "oklch(0.75 0.14 85)" },
  { slug: "gdl-mysafa", name: "GDL MySAFA", short: "GDL MySAFA", ageGroup: "Senior men", accent: "oklch(0.66 0.19 25)" },
  { slug: "ladies-rclfa", name: "Ladies RCLFA", short: "Ladies RCLFA", ageGroup: "Senior women", accent: "oklch(0.68 0.17 340)" },
  { slug: "ladies-regional-safa", name: "Ladies Regional SAFA", short: "Ladies Regional", ageGroup: "Senior women", accent: "oklch(0.7 0.15 300)" },
  { slug: "league-7", name: "League 7", short: "League 7", ageGroup: "Social / 7-a-side", accent: "oklch(0.72 0.13 195)" },
  { slug: "league-8", name: "League 8", short: "League 8", ageGroup: "Social / 8-a-side", accent: "oklch(0.8 0.1 120)" },
];

export const leagues: League[] = base.map((l) => ({
  ...l,
  squad: squad(l.slug),
  fixtures: fixtures(l.name),
  results: results(l.name),
  table,
  training,
}));

export function getLeague(slug: string) {
  return leagues.find((l) => l.slug === slug);
}

export const nextFixture = leagues[2].fixtures[0];
export const latestResult = leagues[2].results[0];

export const allFixtures: (Fixture & { league: string })[] = leagues.flatMap((l) =>
  l.fixtures.map((f) => ({ ...f, league: l.name })),
);

export const news = [
  {
    id: "n1",
    tag: "Club",
    title: "RAFC opens new astro at Ferndale for winter training",
    date: "24 Aug 2026",
    excerpt:
      "All age groups from U6 through senior men and ladies will rotate through the new floodlit surface from September.",
  },
  {
    id: "n2",
    tag: "Championship",
    title: "Unbeaten run stretches to seven after Northcliff win",
    date: "22 Aug 2026",
    excerpt: "A composed second-half display saw the senior side move within three points of top spot.",
  },
  {
    id: "n3",
    tag: "Academy",
    title: "Trials open for the 2027 RCLFA youth intake",
    date: "18 Aug 2026",
    excerpt: "Registration is now open for players born between 2008 and 2014. Limited spaces per age group.",
  },
];

export const sponsors = ["Randburg Motors", "Kasi Kicks", "Bidvest Fuel", "Highveld Water", "Astro Turf SA"];

export const notifications = [
  {
    id: "a1",
    title: "Kick-off moved to 09:30",
    body: "Championship vs Bryanston Bulls on Sat 29 Aug now starts 30 minutes earlier.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "a2",
    title: "Match report: RAFC 3–1 Northcliff",
    body: "Full report and player ratings are live in the news feed.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "a3",
    title: "Training cancelled — weather",
    body: "Ladies RCLFA Thursday session cancelled due to lightning warnings.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: "a4",
    title: "Subs reminder",
    body: "Q3 club subscriptions are due by 31 August.",
    time: "1 week ago",
    unread: false,
  },
];
