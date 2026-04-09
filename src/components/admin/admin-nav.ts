export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Overview", description: "Your practice at a glance." },
  { href: "/admin/booking-requests", label: "Booking Requests", description: "Review and confirm incoming bookings." },
  { href: "/admin/appointments", label: "Appointments", description: "Scheduled sessions and visit status." },
  { href: "/admin/clients", label: "Clients", description: "Client profiles and session history." },
  { href: "/admin/intakes", label: "Intakes", description: "Health history forms and review." },
  { href: "/admin/soap", label: "SOAP Notes", description: "Session charting and treatment notes." },
  { href: "/admin/follow-ups", label: "Follow-ups", description: "Post-session check-ins and rebooking." },
  { href: "/admin/services", label: "Services", description: "Offerings and pricing." },
  { href: "/admin/availability", label: "Availability", description: "Weekly hours and blocked time." },
  { href: "/admin/settings", label: "Settings", description: "Account and practice configuration." },
];
