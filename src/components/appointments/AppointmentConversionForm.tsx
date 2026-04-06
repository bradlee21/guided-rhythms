"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BookingField } from "@/components/booking/BookingField";
import { brand } from "@/lib/brand";
import { appointmentConversionSchema } from "@/lib/validators/appointment";
import { addMinutesToTime } from "@/server/appointments/helpers";
import { createAppointmentFromBookingRequest } from "@/server/appointments/actions";
import type { AppointmentActionState } from "@/types/appointment";

type ConversionInput = z.input<typeof appointmentConversionSchema>;
type ConversionValues = z.output<typeof appointmentConversionSchema>;

const initialState: AppointmentActionState = {
  success: false,
  message: null,
};

function toFormData(values: ConversionValues) {
  const formData = new FormData();
  formData.set("booking_request_id", values.booking_request_id);
  formData.set("appointment_date", values.appointment_date);
  formData.set("start_time", values.start_time);
  formData.set("location_type", values.location_type);
  formData.set("location_label", values.location_label);
  formData.set("internal_notes", values.internal_notes);
  formData.set("price_override_cents", values.price_override_cents);
  return formData;
}

export function AppointmentConversionForm({
  bookingRequestId,
  serviceBlockMinutes,
  defaultPriceCents,
  defaultLocationType,
}: {
  bookingRequestId: string;
  serviceBlockMinutes: number;
  defaultPriceCents: number;
  defaultLocationType: "office" | "custom";
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createAppointmentFromBookingRequest,
    initialState,
  );
  const form = useForm<ConversionInput, unknown, ConversionValues>({
    resolver: zodResolver(appointmentConversionSchema),
    defaultValues: {
      booking_request_id: bookingRequestId,
      appointment_date: "",
      start_time: "",
      location_type: defaultLocationType,
      location_label: "",
      internal_notes: "",
      price_override_cents: "",
    },
  });

  useEffect(() => {
    if (!state.fieldErrors) {
      return;
    }

    for (const [field, errors] of Object.entries(state.fieldErrors)) {
      if (!errors?.length) {
        continue;
      }

      form.setError(field as keyof ConversionInput, {
        type: "server",
        message: errors[0],
      });
    }
  }, [form, state.fieldErrors]);

  useEffect(() => {
    if (state.success && state.appointmentId) {
      router.push(`/admin/appointments/${state.appointmentId}`);
      router.refresh();
    }
  }, [router, state.appointmentId, state.success]);

  const inputClassName = "w-full rounded-2xl px-4 py-3 outline-none";
  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.82)",
    border: `1px solid ${brand.border}`,
  };
  const startTime = useWatch({
    control: form.control,
    name: "start_time",
  });
  const derivedEndTime = startTime
    ? addMinutesToTime(startTime, serviceBlockMinutes)
    : null;

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await formAction(toFormData(values));
      })}
    >
      <input type="hidden" value={bookingRequestId} {...form.register("booking_request_id")} />
      <div className="grid gap-4 md:grid-cols-2">
        <BookingField
          label="Appointment date"
          htmlFor="appointment_date"
          error={form.formState.errors.appointment_date?.message}
        >
          <input
            id="appointment_date"
            type="date"
            {...form.register("appointment_date")}
            className={inputClassName}
            style={inputStyle}
          />
        </BookingField>

        <BookingField
          label="Start time"
          htmlFor="start_time"
          error={form.formState.errors.start_time?.message}
        >
          <input
            id="start_time"
            type="time"
            {...form.register("start_time")}
            className={inputClassName}
            style={inputStyle}
          />
        </BookingField>
      </div>

      <div
        className="rounded-2xl px-4 py-3 text-sm"
        style={{
          backgroundColor: "rgba(255,255,255,0.72)",
          border: `1px solid ${brand.border}`,
          color: brand.textMuted,
        }}
      >
        End time is derived from the selected service block of {serviceBlockMinutes}{" "}
        minutes.
        {derivedEndTime
          ? ` Current preview: ${startTime} to ${derivedEndTime}.`
          : " Choose a start time to preview the calculated end time."}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BookingField
          label="Location type"
          htmlFor="location_type"
          error={form.formState.errors.location_type?.message}
        >
          <select
            id="location_type"
            {...form.register("location_type")}
            className={inputClassName}
            style={inputStyle}
          >
            <option value="office">Office</option>
            <option value="custom">Custom</option>
          </select>
        </BookingField>

        <BookingField
          label="Location label"
          htmlFor="location_label"
          error={form.formState.errors.location_label?.message}
        >
          <input
            id="location_label"
            {...form.register("location_label")}
            className={inputClassName}
            style={inputStyle}
          />
        </BookingField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BookingField
          label="Price override in cents"
          htmlFor="price_override_cents"
          hint={`Leave blank to use the service default of ${defaultPriceCents} cents.`}
          error={form.formState.errors.price_override_cents?.message}
        >
          <input
            id="price_override_cents"
            inputMode="numeric"
            {...form.register("price_override_cents")}
            className={inputClassName}
            style={inputStyle}
          />
        </BookingField>

        <BookingField
          label="Internal notes"
          htmlFor="internal_notes"
          error={form.formState.errors.internal_notes?.message}
        >
          <textarea
            id="internal_notes"
            rows={4}
            {...form.register("internal_notes")}
            className={inputClassName}
            style={inputStyle}
          />
        </BookingField>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
          {state.message ?? "Create a real scheduled appointment from this approved request."}
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          style={{
            background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
          }}
        >
          {isPending ? "Creating..." : "Create appointment"}
        </button>
      </div>
    </form>
  );
}
