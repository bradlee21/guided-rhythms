export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
};

export const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "Practice foundation and upcoming workflow areas.",
  },
  {
    href: "/admin/booking-requests",
    label: "Booking Requests",
    description: "Inbound booking intake will land here.",
  },
  {
    href: "/admin/appointments",
    label: "Appointments",
    description: "Scheduled client work will surface here.",
  },
  {
    href: "/admin/clients",
    label: "Clients",
    description: "Client records and history will live here.",
  },
  {
    href: "/admin/intakes",
    label: "Intakes",
    description: "Submitted forms and intake review.",
  },
  {
    href: "/admin/soap",
    label: "SOAP Notes",
    description: "Session charting and treatment notes.",
  },
  {
    href: "/admin/follow-ups",
    label: "Follow-ups",
    description: "Post-session communication queue.",
  },
  {
    href: "/admin/services",
    label: "Services",
    description: "Offerings and pricing configuration.",
  },
  {
    href: "/admin/availability",
    label: "Availability",
    description: "Calendar structure and scheduling windows.",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Practice-level app configuration.",
  },
];
