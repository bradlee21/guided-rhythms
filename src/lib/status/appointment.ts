import type {
  AppointmentStatus,
  FollowUpStatus,
  IntakeStatus,
} from "@/types/appointment";

export const appointmentStatusMeta: Record<
  AppointmentStatus,
  { label: string; tone: string }
> = {
  pending_confirmation: {
    label: "Pending Confirmation",
    tone: "rgba(201,146,46,0.16)",
  },
  confirmed: {
    label: "Confirmed",
    tone: "rgba(68,110,73,0.18)",
  },
  intake_pending: {
    label: "Intake Pending",
    tone: "rgba(111,143,85,0.18)",
  },
  ready_for_visit: {
    label: "Ready For Visit",
    tone: "rgba(111,143,85,0.22)",
  },
  arrived: {
    label: "Arrived",
    tone: "rgba(68,110,73,0.24)",
  },
  in_session: {
    label: "In Session",
    tone: "rgba(47,58,44,0.14)",
  },
  completed: {
    label: "Completed",
    tone: "rgba(68,110,73,0.28)",
  },
  cancelled: {
    label: "Cancelled",
    tone: "rgba(156,106,42,0.18)",
  },
  no_show: {
    label: "No Show",
    tone: "rgba(156,106,42,0.24)",
  },
  rescheduled: {
    label: "Rescheduled",
    tone: "rgba(111,106,92,0.18)",
  },
};

export const intakeStatusMeta: Record<IntakeStatus, string> = {
  not_sent: "Not Sent",
  sent: "Sent",
  in_progress: "In Progress",
  completed: "Completed",
  reviewed: "Reviewed",
  needs_update: "Needs Update",
};

export const followUpStatusMeta: Record<FollowUpStatus, string> = {
  not_needed: "Not Needed",
  planned: "Planned",
  sent: "Sent",
  responded: "Responded",
  rebooked: "Rebooked",
  closed: "Closed",
};
