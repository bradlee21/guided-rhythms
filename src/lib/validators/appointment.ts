import { z } from "zod";

import {
  appointmentLocationTypes,
  appointmentStatuses,
} from "@/types/appointment";

const optionalText = z
  .string()
  .trim()
  .max(4000, "Keep this response under 4000 characters.")
  .optional()
  .transform((value) => value ?? "");

export const appointmentConversionSchema = z.object({
  booking_request_id: z.string().uuid(),
  appointment_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid appointment date."),
  start_time: z
    .string()
    .trim()
    .regex(/^\d{2}:\d{2}$/, "Use a valid start time."),
  location_type: z.enum(appointmentLocationTypes),
  location_label: optionalText,
  internal_notes: optionalText,
  price_override_cents: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^\d+$/.test(value),
      "Price override must be a whole number of cents.",
    )
    .transform((value) => value ?? ""),
});

export const appointmentStatusUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(appointmentStatuses),
});

export const appointmentInternalNotesSchema = z.object({
  id: z.string().uuid(),
  internal_notes: z.string().trim().max(4000, "Keep notes under 4000 characters."),
});
