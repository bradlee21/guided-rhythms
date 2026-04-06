import type { IntakeAnswerFieldType } from "@/types/intake";

export type IntakeFormField = {
  key: string;
  label: string;
  type: IntakeAnswerFieldType;
  input:
    | "text"
    | "textarea"
    | "date"
    | "select"
    | "yes_no"
    | "checkbox";
  options?: { label: string; value: string }[];
  conditionalOn?: { key: string; value: string };
};

export type IntakeFormSection = {
  key: string;
  title: string;
  description: string;
  fields: IntakeFormField[];
};

const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
] as const;

const preferenceOptions = {
  pressure: [
    { label: "Light", value: "light" },
    { label: "Medium", value: "medium" },
    { label: "Firm", value: "firm" },
    { label: "We can decide together", value: "guided" },
  ],
  conversation: [
    { label: "Quiet is best", value: "quiet" },
    { label: "A little conversation is fine", value: "some" },
    { label: "Open to conversation", value: "open" },
  ],
  music: [
    { label: "Soft music", value: "soft_music" },
    { label: "Nature sounds", value: "nature" },
    { label: "No preference", value: "no_preference" },
    { label: "Quiet room", value: "quiet_room" },
  ],
  warmer: [
    { label: "Yes please", value: "yes" },
    { label: "No thank you", value: "no" },
    { label: "Depends on the day", value: "depends" },
  ],
  aromatherapy: [
    { label: "Yes please", value: "yes" },
    { label: "No thank you", value: "no" },
    { label: "Only if discussed first", value: "discuss_first" },
  ],
  temperature: [
    { label: "Cooler room", value: "cooler" },
    { label: "Comfortably warm", value: "warm" },
    { label: "No strong preference", value: "no_preference" },
  ],
} as const;

export const intakeFormSections: IntakeFormSection[] = [
  {
    key: "basic_information",
    title: "Basic information",
    description: "Help us confirm the details we should use for your care.",
    fields: [
      { key: "first_name", label: "First name", type: "text", input: "text" },
      { key: "last_name", label: "Last name", type: "text", input: "text" },
      { key: "preferred_name", label: "Preferred name", type: "text", input: "text" },
      { key: "date_of_birth", label: "Date of birth", type: "date", input: "date" },
      { key: "phone", label: "Phone", type: "text", input: "text" },
      { key: "email", label: "Email", type: "text", input: "text" },
      {
        key: "emergency_contact_name",
        label: "Emergency contact name",
        type: "text",
        input: "text",
      },
      {
        key: "emergency_contact_phone",
        label: "Emergency contact phone",
        type: "text",
        input: "text",
      },
      {
        key: "preferred_contact_method",
        label: "Preferred contact method",
        type: "single_select",
        input: "select",
        options: [
          { label: "Text", value: "text" },
          { label: "Phone call", value: "phone" },
          { label: "Email", value: "email" },
        ],
      },
      { key: "pronouns", label: "Pronouns", type: "text", input: "text" },
    ],
  },
  {
    key: "health_and_safety",
    title: "Health and safety",
    description: "Share anything we should know to keep your session safe and comfortable.",
    fields: [
      { key: "under_physician_care", label: "Are you currently under a physician's care?", type: "single_select", input: "yes_no", options: yesNoOptions as unknown as { label: string; value: string }[] },
      { key: "under_physician_care_details", label: "Please share any helpful details", type: "textarea", input: "textarea", conditionalOn: { key: "under_physician_care", value: "yes" } },
      { key: "medications", label: "Are you taking any medications we should know about?", type: "single_select", input: "yes_no", options: yesNoOptions as unknown as { label: string; value: string }[] },
      { key: "medications_details", label: "Medication details", type: "textarea", input: "textarea", conditionalOn: { key: "medications", value: "yes" } },
      { key: "allergies_or_sensitivities", label: "Do you have allergies or sensitivities?", type: "single_select", input: "yes_no", options: yesNoOptions as unknown as { label: string; value: string }[] },
      { key: "allergies_or_sensitivities_details", label: "Allergy or sensitivity details", type: "textarea", input: "textarea", conditionalOn: { key: "allergies_or_sensitivities", value: "yes" } },
      { key: "recent_surgeries", label: "Have you had any recent surgeries?", type: "single_select", input: "yes_no", options: yesNoOptions as unknown as { label: string; value: string }[] },
      { key: "recent_surgeries_details", label: "Recent surgery details", type: "textarea", input: "textarea", conditionalOn: { key: "recent_surgeries", value: "yes" } },
      { key: "recent_injuries", label: "Any recent injuries?", type: "single_select", input: "yes_no", options: yesNoOptions as unknown as { label: string; value: string }[] },
      { key: "recent_injuries_details", label: "Recent injury details", type: "textarea", input: "textarea", conditionalOn: { key: "recent_injuries", value: "yes" } },
      { key: "medical_conditions", label: "Any medical conditions that affect your session?", type: "single_select", input: "yes_no", options: yesNoOptions as unknown as { label: string; value: string }[] },
      { key: "medical_conditions_details", label: "Medical condition details", type: "textarea", input: "textarea", conditionalOn: { key: "medical_conditions", value: "yes" } },
      { key: "areas_to_avoid", label: "Are there any areas we should avoid?", type: "textarea", input: "textarea" },
      { key: "pregnancy_status", label: "Pregnancy status", type: "single_select", input: "select", options: [{ label: "Not pregnant", value: "not_pregnant" }, { label: "Pregnant", value: "pregnant" }, { label: "Prefer not to say", value: "prefer_not_to_say" }] },
      { key: "blood_clot_history", label: "Any history of blood clots?", type: "single_select", input: "select", options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }, { label: "Unsure", value: "unsure" }] },
      { key: "skin_conditions_or_open_wounds", label: "Skin conditions or open wounds", type: "textarea", input: "textarea" },
      { key: "neurological_symptoms", label: "Neurological symptoms such as numbness or tingling", type: "textarea", input: "textarea" },
    ],
  },
  {
    key: "reason_for_visit",
    title: "Reason for visit",
    description: "Tell us what brought you in and what you hope this session supports.",
    fields: [
      { key: "primary_reason", label: "Primary reason for booking", type: "textarea", input: "textarea" },
      { key: "focus_areas", label: "Focus areas", type: "textarea", input: "textarea" },
      { key: "symptom_duration", label: "How long has this been going on?", type: "single_select", input: "select", options: [{ label: "A few days", value: "days" }, { label: "A few weeks", value: "weeks" }, { label: "A few months", value: "months" }, { label: "Longer than six months", value: "longer" }] },
      { key: "pain_or_tension_level", label: "Pain or tension level", type: "single_select", input: "select", options: [{ label: "Low", value: "low" }, { label: "Moderate", value: "moderate" }, { label: "High", value: "high" }, { label: "Varies", value: "varies" }] },
      { key: "related_to_stress_work_exercise_injury_or_other", label: "Does this feel related to stress, work, exercise, injury, or something else?", type: "textarea", input: "textarea" },
      { key: "session_goals", label: "Session goals", type: "textarea", input: "textarea" },
      { key: "prior_bodywork_for_issue", label: "Have you received bodywork for this concern before?", type: "single_select", input: "select", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }, { label: "Not sure", value: "not_sure" }] },
    ],
  },
  {
    key: "session_preferences",
    title: "Session preferences",
    description: "Help us shape the room, communication, and treatment feel in a way that works for you.",
    fields: [
      { key: "pressure_preference", label: "Pressure preference", type: "single_select", input: "select", options: [...preferenceOptions.pressure] },
      { key: "conversation_preference", label: "Conversation preference", type: "single_select", input: "select", options: [...preferenceOptions.conversation] },
      { key: "music_preference", label: "Music preference", type: "single_select", input: "select", options: [...preferenceOptions.music] },
      { key: "table_warmer_preference", label: "Table warmer preference", type: "single_select", input: "select", options: [...preferenceOptions.warmer] },
      { key: "aromatherapy_preference", label: "Aromatherapy preference", type: "single_select", input: "select", options: [...preferenceOptions.aromatherapy] },
      { key: "temperature_preference", label: "Temperature preference", type: "single_select", input: "select", options: [...preferenceOptions.temperature] },
      { key: "support_preferences", label: "Support preferences for pillows or positioning", type: "textarea", input: "textarea" },
      { key: "areas_to_focus_on", label: "Areas to focus on", type: "textarea", input: "textarea" },
      { key: "areas_to_avoid_confirm", label: "Areas to avoid or work around", type: "textarea", input: "textarea" },
      { key: "anything_that_improves_comfort", label: "Anything else that improves your comfort", type: "textarea", input: "textarea" },
      { key: "past_massage_experience_notes", label: "Notes about past massage experiences", type: "textarea", input: "textarea" },
    ],
  },
  {
    key: "consent_and_policies",
    title: "Consent and policies",
    description: "Review the core expectations so we can begin with clarity and consent.",
    fields: [
      { key: "consent_acknowledgement", label: "I understand massage is for wellness and therapeutic support and is not a substitute for medical care.", type: "acknowledgement", input: "checkbox" },
      { key: "policy_acknowledgement", label: "I understand I should share any changes in my health and follow the practice policies provided to me.", type: "acknowledgement", input: "checkbox" },
      { key: "boundary_acknowledgement", label: "I understand I can speak up at any time about comfort, pressure, draping, or boundaries.", type: "acknowledgement", input: "checkbox" },
      { key: "accuracy_acknowledgement", label: "I confirm the information I provided is accurate to the best of my knowledge.", type: "acknowledgement", input: "checkbox" },
      { key: "typed_signature_name", label: "Type your full name as your signature", type: "text", input: "text" },
      { key: "signature_date", label: "Signature date", type: "date", input: "date" },
    ],
  },
];

export const healthFlagFieldKeys = [
  "under_physician_care",
  "medications",
  "allergies_or_sensitivities",
  "recent_surgeries",
  "recent_injuries",
  "medical_conditions",
  "areas_to_avoid",
  "pregnancy_status",
  "blood_clot_history",
  "skin_conditions_or_open_wounds",
  "neurological_symptoms",
] as const;

export const intakeStepOrder = [
  { key: "welcome", title: "Welcome" },
  { key: "basic_information", title: "Basic information" },
  { key: "health_and_safety", title: "Health and safety" },
  { key: "reason_for_visit", title: "Reason for visit" },
  { key: "session_preferences", title: "Session preferences" },
  { key: "consent_and_policies", title: "Consent and policies" },
  { key: "review", title: "Review and submit" },
] as const;
