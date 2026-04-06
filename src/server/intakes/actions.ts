"use server";

import { revalidatePath } from "next/cache";

import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { buildIntakeAnswerRows } from "@/lib/intake/answers";
import { verifyIntakeToken } from "@/lib/intake/token";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasIntakeTokenSecret, hasServiceRoleSupabaseEnv } from "@/lib/supabase/env";
import {
  intakeReviewSchema,
  intakeSubmissionSchema,
  type IntakeSubmissionValues,
} from "@/lib/validators/intake";
import type { IntakeActionState } from "@/types/intake";

const defaultActionState: IntakeActionState = {
  success: false,
  message: null,
};

function formDataToSubmissionValues(formData: FormData) {
  const value = (key: string) => formData.get(key);

  return {
    token: value("token"),
    first_name: value("first_name"),
    last_name: value("last_name"),
    preferred_name: value("preferred_name"),
    date_of_birth: value("date_of_birth"),
    phone: value("phone"),
    email: value("email"),
    emergency_contact_name: value("emergency_contact_name"),
    emergency_contact_phone: value("emergency_contact_phone"),
    preferred_contact_method: value("preferred_contact_method"),
    pronouns: value("pronouns"),
    under_physician_care: value("under_physician_care"),
    under_physician_care_details: value("under_physician_care_details"),
    medications: value("medications"),
    medications_details: value("medications_details"),
    allergies_or_sensitivities: value("allergies_or_sensitivities"),
    allergies_or_sensitivities_details: value("allergies_or_sensitivities_details"),
    recent_surgeries: value("recent_surgeries"),
    recent_surgeries_details: value("recent_surgeries_details"),
    recent_injuries: value("recent_injuries"),
    recent_injuries_details: value("recent_injuries_details"),
    medical_conditions: value("medical_conditions"),
    medical_conditions_details: value("medical_conditions_details"),
    areas_to_avoid: value("areas_to_avoid"),
    pregnancy_status: value("pregnancy_status"),
    blood_clot_history: value("blood_clot_history"),
    skin_conditions_or_open_wounds: value("skin_conditions_or_open_wounds"),
    neurological_symptoms: value("neurological_symptoms"),
    primary_reason: value("primary_reason"),
    focus_areas: value("focus_areas"),
    symptom_duration: value("symptom_duration"),
    pain_or_tension_level: value("pain_or_tension_level"),
    related_to_stress_work_exercise_injury_or_other: value(
      "related_to_stress_work_exercise_injury_or_other",
    ),
    session_goals: value("session_goals"),
    prior_bodywork_for_issue: value("prior_bodywork_for_issue"),
    pressure_preference: value("pressure_preference"),
    conversation_preference: value("conversation_preference"),
    music_preference: value("music_preference"),
    table_warmer_preference: value("table_warmer_preference"),
    aromatherapy_preference: value("aromatherapy_preference"),
    temperature_preference: value("temperature_preference"),
    support_preferences: value("support_preferences"),
    areas_to_focus_on: value("areas_to_focus_on"),
    areas_to_avoid_confirm: value("areas_to_avoid_confirm"),
    anything_that_improves_comfort: value("anything_that_improves_comfort"),
    past_massage_experience_notes: value("past_massage_experience_notes"),
    consent_acknowledgement: value("consent_acknowledgement") === "true",
    policy_acknowledgement: value("policy_acknowledgement") === "true",
    boundary_acknowledgement: value("boundary_acknowledgement") === "true",
    accuracy_acknowledgement: value("accuracy_acknowledgement") === "true",
    typed_signature_name: value("typed_signature_name"),
    signature_date: value("signature_date"),
  };
}

export async function submitIntake(
  _previousState: IntakeActionState,
  formData: FormData,
): Promise<IntakeActionState> {
  const parsed = intakeSubmissionSchema.safeParse(
    formDataToSubmissionValues(formData),
  );

  if (!parsed.success) {
    return {
      ...defaultActionState,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!hasServiceRoleSupabaseEnv() || !hasIntakeTokenSecret()) {
    return {
      ...defaultActionState,
      message: "Secure intake access is not configured yet.",
    };
  }

  const verified = verifyIntakeToken(parsed.data.token);

  if (!verified.ok) {
    return {
      ...defaultActionState,
      message:
        verified.reason === "expired"
          ? "This intake link has expired."
          : "This intake link is invalid.",
    };
  }

  const supabase = createAdminClient();
  const values = parsed.data;

  try {
    const { data: intake, error: intakeError } = await supabase
      .from("intakes")
      .select("id, client_id, appointment_id, status")
      .eq("id", verified.payload.intakeId)
      .eq("appointment_id", verified.payload.appointmentId)
      .maybeSingle();

    if (intakeError || !intake) {
      return {
        ...defaultActionState,
        message: "This intake link is invalid.",
      };
    }

    if (intake.status === "reviewed") {
      return {
        ...defaultActionState,
        message: "This intake has already been reviewed and is locked.",
      };
    }

    const { error: clientError } = await supabase
      .from("clients")
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        preferred_name: values.preferred_name || null,
        email: values.email,
        phone: values.phone,
        date_of_birth: values.date_of_birth || null,
        pronouns: values.pronouns || null,
        emergency_contact_name: values.emergency_contact_name || null,
        emergency_contact_phone: values.emergency_contact_phone || null,
        preferred_contact_method: values.preferred_contact_method || null,
      })
      .eq("id", intake.client_id);

    if (clientError) {
      throw new Error(clientError.message);
    }

    const { error: answersError } = await supabase
      .from("intake_answers")
      .upsert(buildIntakeAnswerRows(intake.id, values as IntakeSubmissionValues), {
        onConflict: "intake_id,field_key",
      });

    if (answersError) {
      throw new Error(answersError.message);
    }

    const completedAt = new Date().toISOString();

    const { error: intakeUpdateError } = await supabase
      .from("intakes")
      .update({
        status: "completed",
        completed_at: completedAt,
      })
      .eq("id", intake.id);

    if (intakeUpdateError) {
      throw new Error(intakeUpdateError.message);
    }

    const { error: appointmentError } = await supabase
      .from("appointments")
      .update({
        intake_status: "completed",
      })
      .eq("id", intake.appointment_id);

    if (appointmentError) {
      throw new Error(appointmentError.message);
    }

    revalidatePath("/admin/intakes");
    revalidatePath(`/admin/intakes/${intake.id}`);
    revalidatePath(`/admin/appointments/${intake.appointment_id}`);

    return {
      success: true,
      message: "Your intake has been submitted.",
    };
  } catch {
    return {
      ...defaultActionState,
      message: "Unable to submit your intake right now.",
    };
  }
}

export async function markIntakeReviewed(input: { id: string }) {
  const parsed = intakeReviewSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid intake review request.");
  }

  if (!hasServiceRoleSupabaseEnv()) {
    throw new Error("Supabase is not connected.");
  }

  const adminUser = await requireApprovedAdminUser();
  const supabase = createAdminClient();

  const { data: intake, error: intakeError } = await supabase
    .from("intakes")
    .select("id, appointment_id, status")
    .eq("id", parsed.data.id)
    .maybeSingle();

  if (intakeError || !intake) {
    throw new Error("Intake not found.");
  }

  if (intake.status !== "completed" && intake.status !== "reviewed") {
    throw new Error("Only completed intakes can be marked reviewed.");
  }

  const reviewedAt = new Date().toISOString();

  const { error } = await supabase
    .from("intakes")
    .update({
      status: "reviewed",
      reviewed_at: reviewedAt,
      reviewed_by: adminUser.id,
    })
    .eq("id", parsed.data.id);

  if (error) {
    throw new Error(error.message);
  }

  const { error: appointmentError } = await supabase
    .from("appointments")
    .update({
      intake_status: "reviewed",
    })
    .eq("id", intake.appointment_id);

  if (appointmentError) {
    throw new Error(appointmentError.message);
  }

  revalidatePath("/admin/intakes");
  revalidatePath(`/admin/intakes/${parsed.data.id}`);
  revalidatePath(`/admin/appointments/${intake.appointment_id}`);
}
