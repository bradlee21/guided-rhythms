import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(4000, "Keep responses under 4000 characters.")
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

const yesNo = z.enum(["yes", "no"], {
  error: "Please choose yes or no.",
});

const optionalChoice = (values: readonly [string, ...string[]]) =>
  z.enum(values).optional().transform((value) => value ?? "");

export const intakeSubmissionSchema = z.object({
  token: z.string().min(1),
  first_name: z.string().trim().min(1, "First name is required.").max(80),
  last_name: z.string().trim().min(1, "Last name is required.").max(80),
  preferred_name: optionalText,
  date_of_birth: optionalDate,
  phone: z.string().trim().min(7, "Phone is required.").max(40),
  email: z.string().trim().email("Enter a valid email address."),
  emergency_contact_name: optionalText,
  emergency_contact_phone: optionalText,
  preferred_contact_method: optionalChoice(["text", "phone", "email"]),
  pronouns: optionalText,
  under_physician_care: yesNo,
  under_physician_care_details: optionalText,
  medications: yesNo,
  medications_details: optionalText,
  allergies_or_sensitivities: yesNo,
  allergies_or_sensitivities_details: optionalText,
  recent_surgeries: yesNo,
  recent_surgeries_details: optionalText,
  recent_injuries: yesNo,
  recent_injuries_details: optionalText,
  medical_conditions: yesNo,
  medical_conditions_details: optionalText,
  areas_to_avoid: optionalText,
  pregnancy_status: optionalChoice([
    "not_pregnant",
    "pregnant",
    "prefer_not_to_say",
  ]),
  blood_clot_history: optionalChoice(["no", "yes", "unsure"]),
  skin_conditions_or_open_wounds: optionalText,
  neurological_symptoms: optionalText,
  primary_reason: optionalText,
  focus_areas: optionalText,
  symptom_duration: optionalChoice(["days", "weeks", "months", "longer"]),
  pain_or_tension_level: optionalChoice(["low", "moderate", "high", "varies"]),
  related_to_stress_work_exercise_injury_or_other: optionalText,
  session_goals: optionalText,
  prior_bodywork_for_issue: optionalChoice(["yes", "no", "not_sure"]),
  pressure_preference: optionalChoice(["light", "medium", "firm", "guided"]),
  conversation_preference: optionalChoice(["quiet", "some", "open"]),
  music_preference: optionalChoice([
    "soft_music",
    "nature",
    "no_preference",
    "quiet_room",
  ]),
  table_warmer_preference: optionalChoice(["yes", "no", "depends"]),
  aromatherapy_preference: optionalChoice(["yes", "no", "discuss_first"]),
  temperature_preference: optionalChoice(["cooler", "warm", "no_preference"]),
  support_preferences: optionalText,
  areas_to_focus_on: optionalText,
  areas_to_avoid_confirm: optionalText,
  anything_that_improves_comfort: optionalText,
  past_massage_experience_notes: optionalText,
  consent_acknowledgement: z
    .boolean()
    .refine((value) => value, "Please acknowledge this item."),
  policy_acknowledgement: z
    .boolean()
    .refine((value) => value, "Please acknowledge this item."),
  boundary_acknowledgement: z
    .boolean()
    .refine((value) => value, "Please acknowledge this item."),
  accuracy_acknowledgement: z
    .boolean()
    .refine((value) => value, "Please acknowledge this item."),
  typed_signature_name: z
    .string()
    .trim()
    .min(1, "Please type your name as a signature.")
    .max(120),
  signature_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid signature date."),
});

export const intakeReviewSchema = z.object({
  id: z.string().uuid(),
});

export type IntakeSubmissionValues = z.output<typeof intakeSubmissionSchema>;
