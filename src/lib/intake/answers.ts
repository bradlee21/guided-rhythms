import { healthFlagFieldKeys, intakeFormSections } from "@/lib/intake/form-definition";
import { getTodayLocalDateString } from "@/lib/dates";
import type { IntakeAnswerRecord } from "@/types/intake";
import type { IntakeSubmissionValues } from "@/lib/validators/intake";

const fieldEntries = intakeFormSections.flatMap((section) => section.fields);

export const intakeFieldMap = Object.fromEntries(
  fieldEntries.map((field) => [field.key, field]),
) as Record<string, (typeof fieldEntries)[number]>;

export type IntakeHealthFlag = {
  key: string;
  label: string;
  value: string;
};

export function createDefaultIntakeValues(input?: {
  first_name?: string | null;
  last_name?: string | null;
  preferred_name?: string | null;
  phone?: string | null;
  email?: string | null;
}) {
  return {
    token: "",
    first_name: input?.first_name ?? "",
    last_name: input?.last_name ?? "",
    preferred_name: input?.preferred_name ?? "",
    date_of_birth: "",
    phone: input?.phone ?? "",
    email: input?.email ?? "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    preferred_contact_method: "",
    pronouns: "",
    under_physician_care: "no",
    under_physician_care_details: "",
    medications: "no",
    medications_details: "",
    allergies_or_sensitivities: "no",
    allergies_or_sensitivities_details: "",
    recent_surgeries: "no",
    recent_surgeries_details: "",
    recent_injuries: "no",
    recent_injuries_details: "",
    medical_conditions: "no",
    medical_conditions_details: "",
    areas_to_avoid: "",
    pregnancy_status: "",
    blood_clot_history: "",
    skin_conditions_or_open_wounds: "",
    neurological_symptoms: "",
    primary_reason: "",
    focus_areas: "",
    symptom_duration: "",
    pain_or_tension_level: "",
    related_to_stress_work_exercise_injury_or_other: "",
    session_goals: "",
    prior_bodywork_for_issue: "",
    pressure_preference: "",
    conversation_preference: "",
    music_preference: "",
    table_warmer_preference: "",
    aromatherapy_preference: "",
    temperature_preference: "",
    support_preferences: "",
    areas_to_focus_on: "",
    areas_to_avoid_confirm: "",
    anything_that_improves_comfort: "",
    past_massage_experience_notes: "",
    consent_acknowledgement: false,
    policy_acknowledgement: false,
    boundary_acknowledgement: false,
    accuracy_acknowledgement: false,
    typed_signature_name: "",
    signature_date: getTodayLocalDateString(),
  } satisfies IntakeSubmissionValues;
}

export function mapIntakeAnswersToValues(
  answers: IntakeAnswerRecord[],
  defaults: IntakeSubmissionValues,
) {
  const values = { ...defaults };

  for (const answer of answers) {
    const field = intakeFieldMap[answer.field_key];

    if (!field) {
      continue;
    }

    if (field.input === "checkbox") {
      values[answer.field_key as keyof IntakeSubmissionValues] = Boolean(
        answer.answer_json,
      ) as never;
      continue;
    }

    values[answer.field_key as keyof IntakeSubmissionValues] =
      (answer.answer_text ?? "") as never;
  }

  return values;
}

export function buildIntakeAnswerRows(
  intakeId: string,
  values: IntakeSubmissionValues,
) {
  return fieldEntries.map((field) => {
    const value = values[field.key as keyof IntakeSubmissionValues];

    return {
      intake_id: intakeId,
      field_key: field.key,
      field_label: field.label,
      field_type: field.type,
      answer_text:
        field.input === "checkbox" ? null : typeof value === "string" ? value || null : null,
      answer_json: field.input === "checkbox" ? Boolean(value) : null,
    };
  });
}

export function getHealthFlags(values: IntakeSubmissionValues): IntakeHealthFlag[] {
  return healthFlagFieldKeys
    .flatMap((fieldKey) => {
      const field = intakeFieldMap[fieldKey];
      const value = values[fieldKey as keyof IntakeSubmissionValues];

      if (!field) {
        return [];
      }

      if (typeof value === "string") {
        if (!value) {
          return [];
        }

        if (value === "no" || value === "not_pregnant") {
          return [];
        }

        return [{
          key: fieldKey,
          label: field.label,
          value,
        }];
      }

      return [];
    });
}
