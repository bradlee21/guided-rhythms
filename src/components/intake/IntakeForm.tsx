"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { brand } from "@/lib/brand";
import { intakeFormSections, intakeStepOrder } from "@/lib/intake/form-definition";
import {
  intakeSubmissionSchema,
  type IntakeSubmissionValues,
} from "@/lib/validators/intake";
import { submitIntake } from "@/server/intakes/actions";
import type { IntakeActionState, PublicIntakeContext } from "@/types/intake";
import { IntakeField } from "@/components/intake/IntakeField";
import { IntakeSummary } from "@/components/intake/IntakeSummary";
import { formatDateOnly } from "@/lib/dates";

const initialState: IntakeActionState = {
  success: false,
  message: null,
};

type IntakeFormInput = z.input<typeof intakeSubmissionSchema>;

function toFormData(values: IntakeSubmissionValues) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, typeof value === "boolean" ? String(value) : String(value ?? ""));
  }

  return formData;
}

export function IntakeForm({
  intake,
  defaultValues,
}: {
  intake: PublicIntakeContext;
  defaultValues: IntakeSubmissionValues;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, formAction, isPending] = useActionState(submitIntake, initialState);
  const form = useForm<IntakeFormInput, unknown, IntakeSubmissionValues>({
    resolver: zodResolver(intakeSubmissionSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!state.fieldErrors) {
      return;
    }

    for (const [field, errors] of Object.entries(state.fieldErrors)) {
      if (!errors?.length) {
        continue;
      }

      form.setError(field as keyof IntakeSubmissionValues, {
        type: "server",
        message: errors[0],
      });
    }
  }, [form, state.fieldErrors]);

  const currentStep = intakeStepOrder[stepIndex];
  const isReviewStep = currentStep.key === "review";
  const currentSection = intakeFormSections.find(
    (section) => section.key === currentStep.key,
  );

  const stepFields = useMemo(
    () =>
      currentSection
        ? currentSection.fields.map((field) => field.key) as (keyof IntakeSubmissionValues)[]
        : [],
    [currentSection],
  );

  async function handleNext() {
    if (!currentSection) {
      setStepIndex((value) => Math.min(value + 1, intakeStepOrder.length - 1));
      return;
    }

    const isValid = await form.trigger(stepFields);

    if (isValid) {
      setStepIndex((value) => Math.min(value + 1, intakeStepOrder.length - 1));
    }
  }

  const submitReview = form.handleSubmit(async (values) => {
    await formAction(toFormData(values));
  });

  if (state.success) {
    return (
      <section
        className="rounded-[1.75rem] p-8"
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          border: `1px solid ${brand.border}`,
        }}
      >
        <p className="text-sm uppercase tracking-[0.24em]" style={{ color: brand.secondary }}>
          Intake received
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
          Thank you. Your intake has been submitted.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7" style={{ color: brand.textMuted }}>
          Guided Rhythms now has the information needed to review your session safely and with more context before your appointment.
        </p>
      </section>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        if (!isReviewStep) {
          event.preventDefault();
          return;
        }

        await submitReview(event);
      }}
    >
      <input type="hidden" {...form.register("token")} />
      <div className="rounded-[1.75rem] p-6" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: `1px solid ${brand.border}` }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: brand.secondary }}>
              Step {stepIndex + 1} of {intakeStepOrder.length}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              {currentStep.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: brand.textMuted }}>
              {intake.appointment?.service_name
                ? `${intake.appointment.service_name} on ${formatDateOnly(intake.appointment.appointment_date)} at ${intake.appointment.start_time}`
                : "A few guided steps will help us tailor your session safely and thoughtfully."}
            </p>
          </div>
          <div className="flex gap-2">
            {intakeStepOrder.map((step, index) => (
              <span
                key={step.key}
                className="h-2.5 w-8 rounded-full"
                style={{
                  backgroundColor:
                    index <= stepIndex ? brand.primary : "rgba(47,58,44,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {currentStep.key === "welcome" ? (
        <section className="rounded-[1.75rem] p-6" style={{ backgroundColor: "rgba(255,255,255,0.68)", border: `1px solid ${brand.border}` }}>
          <p className="text-base leading-7" style={{ color: brand.textMuted }}>
            This intake helps Guided Rhythms understand your health context, session goals, and comfort preferences before your appointment. It should take about 8 to 10 minutes and you can move one step at a time.
          </p>
          <p className="mt-4 text-base leading-7" style={{ color: brand.textMuted }}>
            You will review everything before you submit. If you are unsure about any answer, do your best and add a note where helpful.
          </p>
        </section>
      ) : null}

      {currentSection ? (
        <section className="rounded-[1.75rem] p-6" style={{ backgroundColor: "rgba(255,255,255,0.68)", border: `1px solid ${brand.border}` }}>
          <p className="text-base leading-7" style={{ color: brand.textMuted }}>
            {currentSection.description}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {currentSection.fields.map((field) => (
              <IntakeField key={field.key} field={field} form={form} />
            ))}
          </div>
        </section>
      ) : null}

      {isReviewStep ? (
        <section
          className="space-y-5 rounded-[1.75rem] p-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.68)",
            border: `1px solid ${brand.border}`,
          }}
        >
          <div className="space-y-3">
            <p
              className="text-sm uppercase tracking-[0.24em]"
              style={{ color: brand.secondary }}
            >
              Final review
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">
              Review your intake before you submit
            </h3>
            <p
              className="max-w-3xl text-base leading-7"
              style={{ color: brand.textMuted }}
            >
              This is your final chance to look over each section. If anything
              needs adjusting, use Previous to go back and update it before you
              submit.
            </p>
          </div>
          <IntakeSummary values={intakeSubmissionSchema.parse(form.getValues())} />
        </section>
      ) : null}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
          {state.message ?? "Take your time. You can move back to review or update any step before submitting."}
        </p>
        <div className="flex flex-wrap gap-3">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => setStepIndex((value) => Math.max(value - 1, 0))}
              className="rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.82)", border: `1px solid ${brand.border}` }}
            >
              Previous
            </button>
          ) : null}
          {stepIndex < intakeStepOrder.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})` }}
            >
              {currentStep.key === "welcome"
                ? "Start intake"
                : currentStep.key === "consent_and_policies"
                  ? "Next: review"
                  : "Next"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})` }}
            >
              {isPending ? "Submitting..." : "Submit intake"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
