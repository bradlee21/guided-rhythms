import { brand } from "@/lib/brand";
import { formatDateOnly } from "@/lib/dates";
import { intakeFormSections } from "@/lib/intake/form-definition";
import type { IntakeSubmissionValues } from "@/lib/validators/intake";

function formatValue(
  value: unknown,
  fieldType: string,
  options?: { label: string; value: string }[],
) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value !== "string" || !value) {
    return "Not provided";
  }

  if (fieldType === "date") {
    return formatDateOnly(value);
  }

  return options?.find((option) => option.value === value)?.label ?? value.replaceAll("_", " ");
}

export function IntakeSummary({
  values,
  compact = false,
}: {
  values: IntakeSubmissionValues;
  compact?: boolean;
}) {
  return (
    <div className="space-y-6">
      {intakeFormSections.map((section) => (
        <section
          key={section.key}
          className="rounded-[1.5rem] p-5"
          style={{
            backgroundColor: "rgba(255,255,255,0.68)",
            border: `1px solid ${brand.border}`,
          }}
        >
          <div className={compact ? "space-y-1" : "space-y-2"}>
            <p
              className="text-sm uppercase tracking-[0.22em]"
              style={{ color: brand.secondary }}
            >
              {section.title}
            </p>
            {!compact ? (
              <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
                {section.description}
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {section.fields
              .filter((field) => {
                if (!field.conditionalOn) {
                  return true;
                }

                return (
                  values[
                    field.conditionalOn.key as keyof IntakeSubmissionValues
                  ] === field.conditionalOn.value
                );
              })
              .map((field) => (
                <div key={field.key}>
                  <p
                    className="text-xs uppercase tracking-[0.18em]"
                    style={{ color: brand.secondary }}
                  >
                    {field.label}
                  </p>
                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: brand.textMuted }}
                  >
                    {formatValue(
                      values[field.key as keyof IntakeSubmissionValues],
                      field.type,
                      field.options,
                    )}
                  </p>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
