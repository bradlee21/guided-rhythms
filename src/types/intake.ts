export const intakeStatuses = [
  "not_sent",
  "sent",
  "in_progress",
  "completed",
  "reviewed",
  "needs_update",
] as const;

export type IntakeStatus = (typeof intakeStatuses)[number];

export type IntakeAnswerFieldType =
  | "text"
  | "textarea"
  | "date"
  | "single_select"
  | "multi_select"
  | "acknowledgement";

export type IntakeAnswerRecord = {
  id: string;
  field_key: string;
  field_label: string;
  field_type: IntakeAnswerFieldType;
  answer_text: string | null;
  answer_json: unknown | null;
};

export type IntakeRecord = {
  id: string;
  client_id: string;
  appointment_id: string;
  status: IntakeStatus;
  form_version: number;
  completed_at: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
  client: {
    id: string;
    first_name: string;
    last_name: string;
    preferred_name: string | null;
    email: string;
    phone: string;
  } | null;
  appointment: {
    id: string;
    appointment_date: string;
    start_time: string;
    end_time: string;
    service_name: string | null;
  } | null;
  answers: IntakeAnswerRecord[];
};

export type IntakeListItem = {
  id: string;
  status: IntakeStatus;
  completed_at: string | null;
  reviewed_at: string | null;
  client: {
    first_name: string;
    last_name: string;
  } | null;
  appointment: {
    id: string;
    appointment_date: string;
  } | null;
};

export type PublicIntakeContext = {
  id: string;
  appointment_id: string;
  client_id: string;
  status: IntakeStatus;
  client: {
    first_name: string;
    last_name: string;
    preferred_name: string | null;
    email: string;
    phone: string;
  } | null;
  appointment: {
    appointment_date: string;
    start_time: string;
    service_name: string | null;
  } | null;
  answers: IntakeAnswerRecord[];
};

export type IntakeActionState = {
  success: boolean;
  message: string | null;
  fieldErrors?: Record<string, string[] | undefined>;
};
