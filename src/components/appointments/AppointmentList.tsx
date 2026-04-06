import Link from "next/link";

import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { brand } from "@/lib/brand";
import type { AppointmentListItem } from "@/types/appointment";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function AppointmentList({
  appointments,
}: {
  appointments: AppointmentListItem[];
}) {
  if (!appointments.length) {
    return (
      <section
        className="rounded-[1.75rem] p-6"
        style={{
          backgroundColor: "rgba(255,255,255,0.68)",
          border: `1px solid ${brand.border}`,
        }}
      >
        <p className="text-base leading-7" style={{ color: brand.textMuted }}>
          No appointments have been created yet.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Link
          key={appointment.id}
          href={`/admin/appointments/${appointment.id}`}
          className="block rounded-[1.75rem] p-5 transition hover:translate-y-[-1px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.72)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xl font-semibold tracking-[-0.03em]">
                {appointment.client
                  ? `${appointment.client.first_name} ${appointment.client.last_name}`
                  : "Unknown client"}
              </p>
              <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
                {appointment.service?.name ?? "No service"} |{" "}
                {formatDate(appointment.appointment_date)} | {appointment.start_time} -{" "}
                {appointment.end_time}
              </p>
            </div>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </Link>
      ))}
    </div>
  );
}
