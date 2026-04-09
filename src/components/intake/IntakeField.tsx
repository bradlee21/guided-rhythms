"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { brand } from "@/lib/brand";
import type { IntakeFormField } from "@/lib/intake/form-definition";
import { intakeSubmissionSchema, type IntakeSubmissionValues } from "@/lib/validators/intake";

type IntakeFormInput = z.input<typeof intakeSubmissionSchema>;

const placeholders: Record<string, string> = {
  under_physician_care_details: "e.g. Type 2 diabetes, managed with medication. Cleared for massage by Dr. Smith.",
  medications_details: "e.g. Lisinopril for blood pressure, Ibuprofen as needed for back pain.",
  allergies_or_sensitivities_details: "e.g. Sensitive to lavender essential oils. No latex allergies.",
  recent_surgeries_details: "e.g. Knee arthroscopy 4 months ago — cleared for massage but avoid direct pressure on the knee.",
  recent_injuries_details: "e.g. Strained left shoulder 3 weeks ago, still tender to the touch.",
  medical_conditions_details: "e.g. Fibromyalgia — pressure needs to be light to medium overall.",
  areas_to_avoid: "e.g. Please avoid my lower back and right hip. Recent flare-up.",
  skin_conditions_or_open_wounds: "e.g. Eczema on forearms — please avoid those areas or use unscented oil.",
  neurological_symptoms: "e.g. Occasional numbness in left hand, especially after long periods of sitting.",
  primary_reason: "e.g. Chronic neck and shoulder tension from desk work. Looking for relief and relaxation.",
  focus_areas: "e.g. Upper back, neck, and shoulders are my main areas of concern.",
  related_to_stress_work_exercise_injury_or_other: "e.g. Mostly stress and long hours at a computer. Some tension from weekend workouts.",
  session_goals: "e.g. I'd love to leave feeling less tight in my shoulders and more relaxed overall.",
  support_preferences: "e.g. A pillow under my knees would be really helpful.",
  areas_to_focus_on: "e.g. Neck, shoulders, and upper back please.",
  areas_to_avoid_confirm: "e.g. Please avoid my feet — very sensitive.",
  anything_that_improves_comfort: "e.g. I tend to get cold, so extra blankets are always appreciated.",
  past_massage_experience_notes: "e.g. I've had deep tissue before but found it too intense — medium pressure is usually my sweet spot.",
  preferred_name: "e.g. Alex, or leave blank if same as first name",
  emergency_contact_name: "e.g. Jane Ivy",
  emergency_contact_phone: "e.g. 717-555-0100",
  pronouns: "e.g. she/her, he/him, they/them",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: `1px solid ${brand.borderMed}`,
  borderRadius: "2px",
  fontSize: "15px",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  color: brand.text,
  background: "#ffffff",
  outline: "none",
  lineHeight: 1.7,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p style={{ fontSize: "13px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>
      {message}
    </p>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} style={{ display: "block", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "10px", fontWeight: 400 }}>
      {children}
    </label>
  );
}

function YesNoToggle({ field, form, error }: { field: IntakeFormField; form: UseFormReturn<IntakeFormInput, unknown, IntakeSubmissionValues>; error?: string }) {
  const value = form.watch(field.key as keyof IntakeSubmissionValues) as string;
  return (
    <div style={{ gridColumn: "1 / -1" }}>
      <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
      <div style={{ display: "flex", gap: "10px" }}>
        {(field.options ?? []).map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => form.setValue(field.key as keyof IntakeSubmissionValues, opt.value as never, { shouldValidate: true })}
              style={{
                padding: "10px 32px",
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                border: isSelected ? `1px solid ${opt.value === "yes" ? brand.gold : brand.forest}` : `1px solid ${brand.borderMed}`,
                background: isSelected ? (opt.value === "yes" ? brand.goldPale : "rgba(46,74,48,0.06)") : "#ffffff",
                color: isSelected ? (opt.value === "yes" ? brand.gold : brand.forest) : brand.textMuted,
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.15s",
                fontWeight: 400,
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

function CheckboxField({ field, form, error }: { field: IntakeFormField; form: UseFormReturn<IntakeFormInput, unknown, IntakeSubmissionValues>; error?: string }) {
  return (
    <Controller
      name={field.key as keyof IntakeSubmissionValues}
      control={form.control}
      defaultValue={false}
      render={({ field: checkboxField }) => (
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: "14px", cursor: "pointer", padding: "16px 20px", border: `1px solid ${Boolean(checkboxField.value) ? brand.forest : brand.borderMed}`, background: Boolean(checkboxField.value) ? "rgba(46,74,48,0.04)" : "#ffffff", borderRadius: "2px", transition: "all 0.15s" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "2px", border: `1.5px solid ${Boolean(checkboxField.value) ? brand.forest : brand.borderMed}`, background: Boolean(checkboxField.value) ? brand.forest : "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", transition: "all 0.15s" }}>
              {Boolean(checkboxField.value) && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke="#F0EBE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: "14px", lineHeight: 1.7, color: brand.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              {field.label}
            </span>
            <input
              type="checkbox"
              checked={Boolean(checkboxField.value)}
              onBlur={checkboxField.onBlur}
              name={checkboxField.name}
              ref={checkboxField.ref}
              onChange={(e) => checkboxField.onChange(e.target.checked)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
          </label>
          <FieldError message={error} />
        </div>
      )}
    />
  );
}

function SelectButtonGroup({ field, form, error }: { field: IntakeFormField; form: UseFormReturn<IntakeFormInput, unknown, IntakeSubmissionValues>; error?: string }) {
  const value = form.watch(field.key as keyof IntakeSubmissionValues) as string;
  const options = field.options ?? [];
  const useButtons = options.length <= 4;

  if (useButtons) {
    return (
      <div>
        <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => form.setValue(field.key as keyof IntakeSubmissionValues, opt.value as never, { shouldValidate: true })}
                style={{
                  padding: "9px 18px",
                  fontSize: "13px",
                  fontFamily: "'DM Sans', sans-serif",
                  border: `1px solid ${isSelected ? brand.forest : brand.borderMed}`,
                  background: isSelected ? "rgba(46,74,48,0.06)" : "#ffffff",
                  color: isSelected ? brand.forest : brand.textMuted,
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <FieldError message={error} />
      </div>
    );
  }

  return (
    <div>
      <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
      <select
        id={field.key}
        {...form.register(field.key as keyof IntakeSubmissionValues)}
        style={{ ...inputStyle, appearance: "auto" }}
      >
        <option value="">Select one</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

export function IntakeField({ field, form }: { field: IntakeFormField; form: UseFormReturn<IntakeFormInput, unknown, IntakeSubmissionValues> }) {
  if (field.conditionalOn) {
    const watchValue = form.watch(field.conditionalOn.key as keyof IntakeSubmissionValues);
    if (watchValue !== field.conditionalOn.value) return null;
  }

  const error = form.formState.errors[field.key as keyof IntakeSubmissionValues]?.message as string | undefined;

  if (field.input === "checkbox") return <CheckboxField field={field} form={form} error={error} />;
  if (field.input === "yes_no") return <YesNoToggle field={field} form={form} error={error} />;
  if (field.input === "select") return <SelectButtonGroup field={field} form={form} error={error} />;

  return (
    <div style={field.input === "textarea" ? { gridColumn: "1 / -1" } : {}}>
      <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
      {field.input === "textarea" ? (
        <textarea
          id={field.key}
          rows={3}
          placeholder={placeholders[field.key] ?? ""}
          {...form.register(field.key as keyof IntakeSubmissionValues)}
          style={{ ...inputStyle, resize: "vertical" as const }}
        />
      ) : (
        <input
          id={field.key}
          type={field.input === "date" ? "date" : "text"}
          placeholder={placeholders[field.key] ?? ""}
          {...form.register(field.key as keyof IntakeSubmissionValues)}
          style={inputStyle}
        />
      )}
      <FieldError message={error} />
    </div>
  );
}
