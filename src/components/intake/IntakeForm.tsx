"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { brand } from "@/lib/brand";
import { intakeFormSections, intakeStepOrder } from "@/lib/intake/form-definition";
import { intakeSubmissionSchema, type IntakeSubmissionValues } from "@/lib/validators/intake";
import { submitIntake } from "@/server/intakes/actions";
import type { IntakeActionState, PublicIntakeContext } from "@/types/intake";
import { IntakeField } from "@/components/intake/IntakeField";
import { IntakeSummary } from "@/components/intake/IntakeSummary";

const initialState: IntakeActionState = { success: false, message: null };
type IntakeFormInput = z.input<typeof intakeSubmissionSchema>;

function toFormData(values: IntakeSubmissionValues) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, typeof value === "boolean" ? String(value) : String(value ?? ""));
  }
  return formData;
}

export function IntakeForm({ intake, defaultValues }: { intake: PublicIntakeContext; defaultValues: IntakeSubmissionValues }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, formAction, isPending] = useActionState(submitIntake, initialState);
  const form = useForm<IntakeFormInput, unknown, IntakeSubmissionValues>({
    resolver: zodResolver(intakeSubmissionSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!state.fieldErrors) return;
    for (const [field, errors] of Object.entries(state.fieldErrors)) {
      if (!errors?.length) continue;
      form.setError(field as keyof IntakeSubmissionValues, { type: "server", message: errors[0] });
    }
  }, [form, state.fieldErrors]);

  const currentStep = intakeStepOrder[stepIndex];
  const isReviewStep = currentStep.key === "review";
  const currentSection = intakeFormSections.find((s) => s.key === currentStep.key);
  const stepFields = useMemo(
    () => currentSection ? currentSection.fields.map((f) => f.key) as (keyof IntakeSubmissionValues)[] : [],
    [currentSection]
  );

  async function handleNext() {
    if (!currentSection) { setStepIndex((v) => Math.min(v + 1, intakeStepOrder.length - 1)); return; }
    const isValid = await form.trigger(stepFields);
    if (isValid) setStepIndex((v) => Math.min(v + 1, intakeStepOrder.length - 1));
  }

  const submitReview = form.handleSubmit(async (values) => { await formAction(toFormData(values)); });

  if (state.success) {
    return (
      <div style={{ padding: "48px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", background: "#ffffff" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(46,74,48,0.08)", border: `1px solid rgba(46,74,48,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M1 8l6 6L19 1" stroke={brand.forest} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "12px" }}>
          Intake received.
        </h2>
        <p style={{ fontSize: "15px", lineHeight: 1.8, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", maxWidth: "400px", margin: "0 auto" }}>
          Your therapist will review your health history before your session.
        </p>
      </div>
    );
  }

  const totalSteps = intakeStepOrder.length;

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <input type="hidden" {...form.register("token")} />

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {intakeStepOrder.map((step, i) => (
          <div
            key={step.key}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background: i <= stepIndex ? brand.gold : brand.border,
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      {/* Step header */}
      <div>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>
          Step {stepIndex + 1} of {totalSteps}
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "8px" }}>
          {currentStep.title}
        </h2>
        {currentSection && (
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
            {currentSection.description}
          </p>
        )}
      </div>

      {/* Welcome step */}
      {currentStep.key === "welcome" && (
        <div style={{ padding: "32px", background: "#ffffff", border: `1px solid ${brand.border}`, borderRadius: "2px" }}>
          <p style={{ fontSize: "15px", lineHeight: 1.9, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
            This form helps your therapist understand your health history, session goals, and comfort preferences before your appointment.
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.9, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
            It takes about <strong style={{ fontWeight: 400, color: brand.text }}>8–10 minutes</strong>. You can move through one step at a time and review everything before submitting.
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.9, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
            If you're unsure about any answer, do your best and add a note — your therapist will follow up if needed.
          </p>
        </div>
      )}

      {/* Section fields */}
      {currentSection && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {currentSection.fields.map((field) => (
            <IntakeField key={field.key} field={field} form={form} />
          ))}
        </div>
      )}

      {/* Review step */}
      {isReviewStep && (
        <div style={{ padding: "32px", background: "#ffffff", border: `1px solid ${brand.border}`, borderRadius: "2px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            Review your responses
          </h3>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "24px" }}>
            Use Previous to go back and update anything before submitting.
          </p>
          <IntakeSummary values={intakeSubmissionSchema.parse(form.getValues())} />
        </div>
      )}

      {/* Error message */}
      {state.message && (
        <p style={{ fontSize: "14px", color: "#c0392b", fontFamily: "'DM Sans', sans-serif" }}>{state.message}</p>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px" }}>
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={() => setStepIndex((v) => Math.max(v - 1, 0))}
            style={{ fontSize: "13px", color: brand.textMuted, background: "none", border: "none", cursor: "pointer", padding: "0", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}
          >
            ← Previous
          </button>
        ) : <span />}

        {stepIndex < intakeStepOrder.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            style={{ padding: "12px 32px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "2px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            {currentStep.key === "welcome" ? "Begin intake" : currentStep.key === "consent_and_policies" ? "Review & submit" : "Continue"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { void submitReview(); }}
            disabled={isPending}
            style={{ padding: "12px 32px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "2px", cursor: isPending ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", opacity: isPending ? 0.7 : 1 }}
          >
            {isPending ? "Submitting…" : "Submit intake"}
          </button>
        )}
      </div>
    </form>
  );
}
