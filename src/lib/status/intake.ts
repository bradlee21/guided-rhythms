import type { IntakeStatus } from "@/types/intake";

export const intakeStatusMeta: Record<
  IntakeStatus,
  { label: string; tone: string }
> = {
  not_sent: {
    label: "Not Sent",
    tone: "rgba(111,106,92,0.16)",
  },
  sent: {
    label: "Sent",
    tone: "rgba(201,146,46,0.16)",
  },
  in_progress: {
    label: "In Progress",
    tone: "rgba(143,175,155,0.18)",
  },
  completed: {
    label: "Completed",
    tone: "rgba(68,110,73,0.2)",
  },
  reviewed: {
    label: "Reviewed",
    tone: "rgba(68,110,73,0.28)",
  },
  needs_update: {
    label: "Needs Update",
    tone: "rgba(156,106,42,0.22)",
  },
};
