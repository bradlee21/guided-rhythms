"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { BookingField } from "@/components/booking/BookingField";
import { brand } from "@/lib/brand";
import type { IntakeFormField } from "@/lib/intake/form-definition";
import {
  intakeSubmissionSchema,
  type IntakeSubmissionValues,
} from "@/lib/validators/intake";

type IntakeFormInput = z.input<typeof intakeSubmissionSchema>;

export function IntakeField({
  field,
  form,
}: {
  field: IntakeFormField;
  form: UseFormReturn<IntakeFormInput, unknown, IntakeSubmissionValues>;
}) {
  if (
    field.conditionalOn &&
    form.watch(field.conditionalOn.key as keyof IntakeSubmissionValues) !==
      field.conditionalOn.value
  ) {
    return null;
  }

  const error = form.formState.errors[field.key as keyof IntakeSubmissionValues];
  const inputClassName = "w-full rounded-2xl px-4 py-3 outline-none";
  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.82)",
    border: `1px solid ${brand.border}`,
  };

  if (field.input === "checkbox") {
    return (
      <div>
        <label
          className="flex items-start gap-3 rounded-2xl px-4 py-3 text-sm"
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            border: `1px solid ${brand.border}`,
          }}
        >
          <input
            type="checkbox"
            value="true"
            {...form.register(field.key as keyof IntakeSubmissionValues)}
          />
          <span>{field.label}</span>
        </label>
        {error?.message ? (
          <p className="mt-2 text-sm" style={{ color: "#9C6A2A" }}>
            {error.message as string}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <BookingField
      label={field.label}
      htmlFor={field.key}
      error={error?.message as string | undefined}
    >
      {field.input === "textarea" ? (
        <textarea
          id={field.key}
          rows={4}
          {...form.register(field.key as keyof IntakeSubmissionValues)}
          className={inputClassName}
          style={inputStyle}
        />
      ) : null}

      {field.input === "text" || field.input === "date" ? (
        <input
          id={field.key}
          type={field.input}
          {...form.register(field.key as keyof IntakeSubmissionValues)}
          className={inputClassName}
          style={inputStyle}
        />
      ) : null}

      {field.input === "select" ? (
        <select
          id={field.key}
          {...form.register(field.key as keyof IntakeSubmissionValues)}
          className={inputClassName}
          style={inputStyle}
        >
          <option value="">Select one</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.input === "yes_no" ? (
        <div className="flex flex-wrap gap-3">
          {field.options?.map((option) => (
            <label
              key={option.value}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                border: `1px solid ${brand.border}`,
              }}
            >
              <input
                type="radio"
                value={option.value}
                {...form.register(field.key as keyof IntakeSubmissionValues)}
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : null}
    </BookingField>
  );
}
