export type PaymentStatus = "unpaid" | "pending" | "paid" | "overdue";

export type Payment = {
  id: string;
  player: string;
  league: string;
  accent: string;
  amount: number;
  method: "EFT" | "Cash" | "Card";
  reference: string;
  proof: boolean;
  status: PaymentStatus;
};

export const payments: Payment[] = [
  {
    id: "p1",
    player: "Thabo Mokoena",
    league: "RCLFA Youth",
    accent: "#1D4ED8",
    amount: 350,
    method: "EFT",
    reference: "RAFC-1042",
    proof: true,
    status: "paid",
  },
  {
    id: "p2",
    player: "Naledi Khumalo",
    league: "Ladies RCLFA",
    accent: "#7C3AED",
    amount: 350,
    method: "EFT",
    reference: "RAFC-1043",
    proof: true,
    status: "pending",
  },
  {
    id: "p3",
    player: "Ruan Pretorius",
    league: "Championship League",
    accent: "#0F766E",
    amount: 350,
    method: "Cash",
    reference: "RAFC-1044",
    proof: false,
    status: "unpaid",
  },
  {
    id: "p4",
    player: "Lesego Dube",
    league: "RCLFA Junior",
    accent: "#001039",
    amount: 350,
    method: "EFT",
    reference: "RAFC-1045",
    proof: true,
    status: "pending",
  },
  {
    id: "p5",
    player: "Katlego Sithole",
    league: "League 7",
    accent: "#B45309",
    amount: 350,
    method: "Card",
    reference: "RAFC-1046",
    proof: true,
    status: "paid",
  },
  {
    id: "p6",
    player: "Aphiwe Ndlovu",
    league: "GDL MySAFA",
    accent: "#2D7D32",
    amount: 350,
    method: "EFT",
    reference: "RAFC-1047",
    proof: false,
    status: "overdue",
  },
  {
    id: "p7",
    player: "Zanele Mabaso",
    league: "Ladies Regional SAFA",
    accent: "#BE185D",
    amount: 350,
    method: "EFT",
    reference: "RAFC-1048",
    proof: true,
    status: "paid",
  },
  {
    id: "p8",
    player: "Sipho Radebe",
    league: "League 8",
    accent: "#DC2626",
    amount: 350,
    method: "Cash",
    reference: "RAFC-1049",
    proof: false,
    status: "unpaid",
  },
];

export type SentNotification = {
  id: string;
  title: string;
  body: string;
  target: string;
  sent: string;
};

export const sentNotifications: SentNotification[] = [
  {
    id: "sn1",
    title: "Kick-off moved to 09:30",
    body: "Championship League vs Bryanston Bulls now starts 30 minutes earlier.",
    target: "Championship League",
    sent: "Yesterday 18:04",
  },
  {
    id: "sn2",
    title: "Subs due 31 August",
    body: "Please settle outstanding subscriptions before the closing date.",
    target: "All players",
    sent: "22 Aug 2026",
  },
  {
    id: "sn3",
    title: "Astro closed for maintenance",
    body: "Thursday training moves to Field 3 for one week.",
    target: "All players",
    sent: "17 Aug 2026",
  },
];
