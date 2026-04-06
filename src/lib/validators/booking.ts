import { z } from "zod";

import {
  bookingPreferredDayOptions,
  bookingPreferredTimeOptions,
  bookingRequestStatuses,
} from "@/types/booking";

const optionalTrimmedText = z
  .string()
  .trim()
  .max(2000, "Keep this response under 2000 characters.")
  .optional()
  .transform((value) => value ?? "");

const optionalDate = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
    "Use a valid date.",
  )
  .transform((value) => value ?? "");

export const bookingRequestSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required.").max(80),
  last_name: z.string().trim().min(1, "Last name is required.").max(80),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7, "Phone is required.").max(40),
  requested_service_id: z.string().trim().uuid("Select a service."),
  preferred_date_1: optionalDate,
  preferred_date_2: optionalDate,
  preferred_date_3: optionalDate,
  preferred_days: z
    .array(z.enum(bookingPreferredDayOptions))
    .max(7, "Choose up to 7 days.")
    .default([]),
  preferred_times: z
    .array(z.enum(bookingPreferredTimeOptions))
    .max(3, "Choose up to 3 time windows.")
    .default([]),
  pain_points: optionalTrimmedText,
  goals: optionalTrimmedText,
  referral_source: optionalTrimmedText,
  notes: optionalTrimmedText,
  is_new_client: z.boolean(),
});

export const bookingRequestStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(bookingRequestStatuses),
});

export const bookingRequestAdminNotesSchema = z.object({
  id: z.string().uuid(),
  admin_notes: z
    .string()
    .trim()
    .max(4000, "Keep admin notes under 4000 characters."),
});
