import { createAdminClient } from "@/lib/supabase/admin";
import {
  createDefaultIntakeValues,
  mapIntakeAnswersToValues,
} from "@/lib/intake/answers";
import { verifyIntakeToken } from "@/lib/intake/token";
import { hasIntakeTokenSecret, hasServiceRoleSupabaseEnv } from "@/lib/supabase/env";
import type {
  IntakeAnswerRecord,
  IntakeListItem,
  IntakeRecord,
  PublicIntakeContext,
} from "@/types/intake";
import type { IntakeSubmissionValues } from "@/lib/validators/intake";

type ConnectionState = "connected" | "not_configured" | "error";

export type IntakeQueryResult<T> = {
  data: T;
  connection: ConnectionState;
  message: string | null;
};

export type IntakeTokenResult =
  | { state: "invalid" | "expired" | "not_configured"; message: string }
  | {
      state: "connected";
      intake: PublicIntakeContext;
      formValues: IntakeSubmissionValues;
    };

function normalizeAnswers(value: unknown) {
  if (!Array.isArray(value)) {
    return [] satisfies IntakeAnswerRecord[];
  }

  return value
    .filter(
      (answer): answer is Record<string, unknown> =>
        typeof answer === "object" && answer !== null,
    )
    .map(
      (answer) =>
        ({
          id: String(answer.id),
          field_key: String(answer.field_key),
          field_label: String(answer.field_label),
          field_type: answer.field_type as IntakeAnswerRecord["field_type"],
          answer_text: (answer.answer_text as string | null) ?? null,
          answer_json: answer.answer_json ?? null,
        }) satisfies IntakeAnswerRecord,
    );
}

function normalizeIntake(row: Record<string, unknown>): IntakeRecord {
  const client =
    row.client && typeof row.client === "object" && !Array.isArray(row.client)
      ? {
          id: String((row.client as Record<string, unknown>).id),
          first_name: String((row.client as Record<string, unknown>).first_name),
          last_name: String((row.client as Record<string, unknown>).last_name),
          preferred_name:
            ((row.client as Record<string, unknown>).preferred_name as string | null) ??
            null,
          email: String((row.client as Record<string, unknown>).email),
          phone: String((row.client as Record<string, unknown>).phone),
        }
      : null;

  const appointment =
    row.appointment &&
    typeof row.appointment === "object" &&
    !Array.isArray(row.appointment)
      ? {
          id: String((row.appointment as Record<string, unknown>).id),
          appointment_date: String(
            (row.appointment as Record<string, unknown>).appointment_date,
          ),
          start_time: String(
            (row.appointment as Record<string, unknown>).start_time,
          ).slice(0, 5),
          end_time: String(
            (row.appointment as Record<string, unknown>).end_time,
          ).slice(0, 5),
          service_name:
            (row.appointment as Record<string, unknown>).service &&
            typeof (row.appointment as Record<string, unknown>).service === "object" &&
            !Array.isArray((row.appointment as Record<string, unknown>).service)
              ? String(
                  ((row.appointment as Record<string, unknown>).service as Record<
                    string,
                    unknown
                  >).name,
                )
              : null,
        }
      : null;

  return {
    id: String(row.id),
    client_id: String(row.client_id),
    appointment_id: String(row.appointment_id),
    status: row.status as IntakeRecord["status"],
    form_version: Number(row.form_version),
    completed_at: (row.completed_at as string | null) ?? null,
    reviewed_at: (row.reviewed_at as string | null) ?? null,
    reviewed_by: (row.reviewed_by as string | null) ?? null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    client,
    appointment,
    answers: normalizeAnswers(row.answers),
  };
}

export async function listIntakes() {
  if (!hasServiceRoleSupabaseEnv()) {
    return {
      data: [] satisfies IntakeListItem[],
      connection: "not_configured",
      message: "The intakes area is not connected yet.",
    } satisfies IntakeQueryResult<IntakeListItem[]>;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("intakes")
      .select(
        "id, status, completed_at, reviewed_at, client:clients(first_name,last_name), appointment:appointments(id, appointment_date)",
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: ((data ?? []) as Record<string, unknown>[]).map((row) => ({
        id: String(row.id),
        status: row.status as IntakeListItem["status"],
        completed_at: (row.completed_at as string | null) ?? null,
        reviewed_at: (row.reviewed_at as string | null) ?? null,
        client:
          row.client && typeof row.client === "object" && !Array.isArray(row.client)
            ? {
                first_name: String((row.client as Record<string, unknown>).first_name),
                last_name: String((row.client as Record<string, unknown>).last_name),
              }
            : null,
        appointment:
          row.appointment &&
          typeof row.appointment === "object" &&
          !Array.isArray(row.appointment)
            ? {
                id: String((row.appointment as Record<string, unknown>).id),
                appointment_date: String(
                  (row.appointment as Record<string, unknown>).appointment_date,
                ),
              }
            : null,
      })),
      connection: "connected",
      message: null,
    } satisfies IntakeQueryResult<IntakeListItem[]>;
  } catch {
    return {
      data: [] satisfies IntakeListItem[],
      connection: "error",
      message: "Guided Rhythms could not load intakes right now.",
    } satisfies IntakeQueryResult<IntakeListItem[]>;
  }
}

export async function getIntakeById(id: string) {
  if (!hasServiceRoleSupabaseEnv()) {
    return {
      data: null,
      connection: "not_configured",
      message: "The intake detail view is not connected yet.",
    } satisfies IntakeQueryResult<IntakeRecord | null>;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("intakes")
      .select(
        "id, client_id, appointment_id, status, form_version, completed_at, reviewed_at, reviewed_by, created_at, updated_at, client:clients(id, first_name, last_name, preferred_name, email, phone), appointment:appointments(id, appointment_date, start_time, end_time, service:services(name)), answers:intake_answers(id, field_key, field_label, field_type, answer_text, answer_json)",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: data ? normalizeIntake(data as Record<string, unknown>) : null,
      connection: "connected",
      message: null,
    } satisfies IntakeQueryResult<IntakeRecord | null>;
  } catch {
    return {
      data: null,
      connection: "error",
      message: "Guided Rhythms could not load this intake right now.",
    } satisfies IntakeQueryResult<IntakeRecord | null>;
  }
}

export async function getIntakeByToken(token: string): Promise<IntakeTokenResult> {
  if (!hasServiceRoleSupabaseEnv() || !hasIntakeTokenSecret()) {
    return {
      state: "not_configured",
      message: "Secure intake access is not configured yet.",
    };
  }

  const verified = verifyIntakeToken(token);

  if (!verified.ok) {
    return {
      state: verified.reason,
      message:
        verified.reason === "expired"
          ? "This intake link has expired."
          : "This intake link is invalid.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("intakes")
      .select(
        "id, client_id, appointment_id, status, client:clients(id, first_name, last_name, preferred_name, email, phone), appointment:appointments(appointment_date, start_time, service:services(name)), answers:intake_answers(id, field_key, field_label, field_type, answer_text, answer_json)",
      )
      .eq("id", verified.payload.intakeId)
      .eq("appointment_id", verified.payload.appointmentId)
      .maybeSingle();

    if (error || !data) {
      return {
        state: "invalid",
        message: "This intake link is invalid.",
      };
    }

    if (data.status === "not_sent") {
      await supabase
        .from("intakes")
        .update({ status: "sent" })
        .eq("id", verified.payload.intakeId);
      await supabase
        .from("appointments")
        .update({ intake_status: "sent" })
        .eq("id", verified.payload.appointmentId);
      data.status = "sent";
    }

    const client =
      data.client && typeof data.client === "object" && !Array.isArray(data.client)
        ? {
            first_name: String((data.client as Record<string, unknown>).first_name),
            last_name: String((data.client as Record<string, unknown>).last_name),
            preferred_name:
              ((data.client as Record<string, unknown>).preferred_name as string | null) ??
              null,
            email: String((data.client as Record<string, unknown>).email),
            phone: String((data.client as Record<string, unknown>).phone),
          }
        : null;

    const appointment =
      data.appointment &&
      typeof data.appointment === "object" &&
      !Array.isArray(data.appointment)
        ? {
            appointment_date: String(
              (data.appointment as Record<string, unknown>).appointment_date,
            ),
            start_time: String(
              (data.appointment as Record<string, unknown>).start_time,
            ).slice(0, 5),
            service_name:
              (data.appointment as Record<string, unknown>).service &&
              typeof (data.appointment as Record<string, unknown>).service === "object" &&
              !Array.isArray((data.appointment as Record<string, unknown>).service)
                ? String(
                    ((data.appointment as Record<string, unknown>).service as Record<
                      string,
                      unknown
                    >).name,
                  )
                : null,
          }
        : null;

    const answers = normalizeAnswers(data.answers);
    const defaults = createDefaultIntakeValues(client ?? undefined);
    const formValues = mapIntakeAnswersToValues(answers, {
      ...defaults,
      token,
    });

    return {
      state: "connected",
      intake: {
        id: String(data.id),
        appointment_id: String(data.appointment_id),
        client_id: String(data.client_id),
        status: data.status as PublicIntakeContext["status"],
        client,
        appointment,
        answers,
      },
      formValues,
    };
  } catch {
    return {
      state: "invalid",
      message: "This intake link could not be opened right now.",
    };
  }
}
