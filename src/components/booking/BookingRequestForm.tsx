"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BookingField } from "@/components/booking/BookingField";
import { BookingFormSection } from "@/components/booking/BookingFormSection";
import { brand } from "@/lib/brand";
import { bookingRequestSchema } from "@/lib/validators/booking";
import { createBookingRequest } from "@/server/booking/actions";
import type {
  BookingActionState,
  BookingFormMode,
  BookingFormValues,
  BookingService,
} from "@/types/booking";
import {
  firstVisitServiceSlug,
  bookingPreferredDayOptions,
  bookingPreferredTimeOptions,
} from "@/types/booking";

const initialState: BookingActionState = {
  success: false,
  message: null,
};

type BookingRequestFormInput = z.input<typeof bookingRequestSchema>;

function toFormData(values: BookingFormValues) {
  const formData = new FormData();

  formData.set("first_name", values.first_name);
  formData.set("last_name", values.last_name);
  formData.set("email", values.email);
  formData.set("phone", values.phone);
  formData.set("requested_service_id", values.requested_service_id);
  formData.set("preferred_date_1", values.preferred_date_1);
  formData.set("preferred_date_2", values.preferred_date_2);
  formData.set("preferred_date_3", values.preferred_date_3);
  formData.set("pain_points", values.pain_points);
  formData.set("goals", values.goals);
  formData.set("referral_source", values.referral_source);
  formData.set("notes", values.notes);
  formData.set("is_new_client", String(values.is_new_client));

  values.preferred_days.forEach((value) => {
    formData.append("preferred_days", value);
  });

  values.preferred_times.forEach((value) => {
    formData.append("preferred_times", value);
  });

  return formData;
}

export function BookingRequestForm({
  mode,
  services,
}: {
  mode: BookingFormMode;
  services: BookingService[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createBookingRequest,
    initialState,
  );
  const form = useForm<BookingRequestFormInput, unknown, BookingFormValues>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      requested_service_id: "",
      preferred_date_1: "",
      preferred_date_2: "",
      preferred_date_3: "",
      preferred_days: [],
      preferred_times: [],
      pain_points: "",
      goals: "",
      referral_source: "",
      notes: "",
      is_new_client: mode === "new",
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

      form.setError(field as keyof BookingRequestFormInput, {
        type: "server",
        message: errors[0],
      });
    }
  }, [form, state.fieldErrors]);

  useEffect(() => {
    if (state.success && state.requestId) {
      router.push(`/booking/success?request=${state.requestId}`);
    }
  }, [router, state.requestId, state.success]);

  const inputClassName = "w-full rounded-2xl px-4 py-3 outline-none";
  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.82)",
    border: `1px solid ${brand.border}`,
  };

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit(async (values) => {
        await formAction(toFormData(values));
      })}
    >
      <input
        type="hidden"
        value={mode === "new" ? "true" : "false"}
        {...form.register("is_new_client", {
          setValueAs: (value) => value === "true",
        })}
      />

      <BookingFormSection
        title="Contact information"
        description="Share the core details needed to review your booking request and follow up with you."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <BookingField
            label="First name"
            htmlFor="first_name"
            error={form.formState.errors.first_name?.message}
          >
            <input
              id="first_name"
              {...form.register("first_name")}
              className={inputClassName}
              style={inputStyle}
            />
          </BookingField>

          <BookingField
            label="Last name"
            htmlFor="last_name"
            error={form.formState.errors.last_name?.message}
          >
            <input
              id="last_name"
              {...form.register("last_name")}
              className={inputClassName}
              style={inputStyle}
            />
          </BookingField>

          <BookingField
            label="Email"
            htmlFor="email"
            error={form.formState.errors.email?.message}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...form.register("email")}
              className={inputClassName}
              style={inputStyle}
            />
          </BookingField>

          <BookingField
            label="Phone"
            htmlFor="phone"
            error={form.formState.errors.phone?.message}
          >
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...form.register("phone")}
              className={inputClassName}
              style={inputStyle}
            />
          </BookingField>
        </div>
      </BookingFormSection>

      <BookingFormSection
        title="Service and preferences"
        description="Choose the service you want and share the date and timing windows that work best for you."
      >
        <div className="grid gap-5">
          <BookingField
            label="Requested service"
            htmlFor="requested_service_id"
            error={form.formState.errors.requested_service_id?.message}
          >
            <select
              id="requested_service_id"
              {...form.register("requested_service_id")}
              className={inputClassName}
              style={inputStyle}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                  {mode === "new" && service.slug === firstVisitServiceSlug
                    ? " — new clients only, includes consultation"
                    : ""}
                </option>
              ))}
            </select>
          </BookingField>

          <div className="grid gap-5 md:grid-cols-3">
            <BookingField
              label="Preferred date 1"
              htmlFor="preferred_date_1"
              error={form.formState.errors.preferred_date_1?.message}
            >
              <input
                id="preferred_date_1"
                type="date"
                {...form.register("preferred_date_1")}
                className={inputClassName}
                style={inputStyle}
              />
            </BookingField>

            <BookingField
              label="Preferred date 2"
              htmlFor="preferred_date_2"
              error={form.formState.errors.preferred_date_2?.message}
            >
              <input
                id="preferred_date_2"
                type="date"
                {...form.register("preferred_date_2")}
                className={inputClassName}
                style={inputStyle}
              />
            </BookingField>

            <BookingField
              label="Preferred date 3"
              htmlFor="preferred_date_3"
              error={form.formState.errors.preferred_date_3?.message}
            >
              <input
                id="preferred_date_3"
                type="date"
                {...form.register("preferred_date_3")}
                className={inputClassName}
                style={inputStyle}
              />
            </BookingField>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <BookingField
              label="Preferred days"
              htmlFor="preferred_days"
              error={form.formState.errors.preferred_days?.message as string | undefined}
            >
              <div className="flex flex-wrap gap-3">
                {bookingPreferredDayOptions.map((day) => (
                  <label
                    key={day}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.78)",
                      border: `1px solid ${brand.border}`,
                    }}
                  >
                    <input
                      type="checkbox"
                      value={day}
                      {...form.register("preferred_days")}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </BookingField>

            <BookingField
              label="Preferred times"
              htmlFor="preferred_times"
              error={form.formState.errors.preferred_times?.message as string | undefined}
            >
              <div className="flex flex-wrap gap-3">
                {bookingPreferredTimeOptions.map((time) => (
                  <label
                    key={time}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.78)",
                      border: `1px solid ${brand.border}`,
                    }}
                  >
                    <input
                      type="checkbox"
                      value={time}
                      {...form.register("preferred_times")}
                    />
                    {time}
                  </label>
                ))}
              </div>
            </BookingField>
          </div>
        </div>
      </BookingFormSection>

      <BookingFormSection
        title={mode === "new" ? "What brings you in" : "Current focus"}
        description="Share anything helpful for review before the booking request is approved."
      >
        <div className="grid gap-5">
          <BookingField
            label="Pain points"
            htmlFor="pain_points"
            error={form.formState.errors.pain_points?.message}
          >
            <textarea
              id="pain_points"
              rows={4}
              {...form.register("pain_points")}
              className={inputClassName}
              style={inputStyle}
            />
          </BookingField>

          <BookingField
            label="Goals"
            htmlFor="goals"
            error={form.formState.errors.goals?.message}
          >
            <textarea
              id="goals"
              rows={4}
              {...form.register("goals")}
              className={inputClassName}
              style={inputStyle}
            />
          </BookingField>

          <div className="grid gap-5 md:grid-cols-2">
            <BookingField
              label="Referral source"
              htmlFor="referral_source"
              error={form.formState.errors.referral_source?.message}
            >
              <input
                id="referral_source"
                {...form.register("referral_source")}
                className={inputClassName}
                style={inputStyle}
              />
            </BookingField>

            <BookingField
              label="Additional notes"
              htmlFor="notes"
              error={form.formState.errors.notes?.message}
            >
              <textarea
                id="notes"
                rows={4}
                {...form.register("notes")}
                className={inputClassName}
                style={inputStyle}
              />
            </BookingField>
          </div>
        </div>
      </BookingFormSection>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {state.message ? (
            <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
              {state.message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          style={{
            background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
          }}
        >
          {isPending ? "Submitting request..." : "Submit booking request"}
        </button>
      </div>
    </form>
  );
}
