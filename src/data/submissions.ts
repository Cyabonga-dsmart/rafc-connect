export type DocStatus = "pending" | "approved" | "rejected";

export type SubmissionDoc = {
  key: string;
  label: string;
  status: DocStatus;
};

export type SubmissionStatus = "docs pending" | "rejected" | "paid" | "ready to approve";

export type Submission = {
  id: string;
  player: string;
  league: string;
  accent: string;
  status: SubmissionStatus;
  physicalDocsOutstanding: boolean;
  docs: SubmissionDoc[];
};

const docLabels = [
  { key: "photo", label: "Player photo" },
  { key: "id", label: "ID / birth certificate" },
  { key: "school", label: "School stamp letter" },
  { key: "clearance", label: "Clearance letter" },
  { key: "pop", label: "Proof of payment" },
];

function docs(states: DocStatus[]): SubmissionDoc[] {
  return docLabels.map((d, i) => ({ ...d, status: states[i] ?? "pending" }));
}

export const submissions: Submission[] = [
  {
    id: "s1",
    player: "Thabo Mokoena",
    league: "RCLFA Youth",
    accent: "#1D4ED8",
    status: "ready to approve",
    physicalDocsOutstanding: false,
    docs: docs(["approved", "approved", "approved", "approved", "approved"]),
  },
  {
    id: "s2",
    player: "Naledi Khumalo",
    league: "Ladies RCLFA",
    accent: "#7C3AED",
    status: "paid",
    physicalDocsOutstanding: true,
    docs: docs(["approved", "approved", "pending", "pending", "approved"]),
  },
  {
    id: "s3",
    player: "Ruan Pretorius",
    league: "Championship",
    accent: "#0F766E",
    status: "docs pending",
    physicalDocsOutstanding: true,
    docs: docs(["approved", "pending", "pending", "pending", "pending"]),
  },
  {
    id: "s4",
    player: "Kabelo Dlamini",
    league: "RCLFA Junior",
    accent: "#001039",
    status: "rejected",
    physicalDocsOutstanding: false,
    docs: docs(["rejected", "approved", "approved", "pending", "approved"]),
  },
  {
    id: "s5",
    player: "Jayden Naidoo",
    league: "League 7",
    accent: "#B45309",
    status: "ready to approve",
    physicalDocsOutstanding: false,
    docs: docs(["approved", "approved", "approved", "approved", "approved"]),
  },
  {
    id: "s6",
    player: "Lwazi Sithole",
    league: "GDL MySAFA",
    accent: "#2D7D32",
    status: "docs pending",
    physicalDocsOutstanding: true,
    docs: docs(["approved", "approved", "pending", "approved", "pending"]),
  },
];

export function getSubmission(id: string) {
  return submissions.find((s) => s.id === id);
}
