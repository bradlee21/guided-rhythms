"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { brand } from "@/lib/brand";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [submitted, setSubmitted] = useState<LoginValues | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    setSubmitted(values);
  };

  return (
    <PageShell
      eyebrow="Admin Access"
      title="Login scaffold"
      description="This page establishes the future admin authentication entry point and form foundation. Supabase auth wiring is not connected yet in this slice."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PlaceholderPanel
          title="Authentication foundation"
          body="The form is validated with react-hook-form and zod so future auth wiring can attach cleanly. Submission currently stays local to the page."
        >
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...form.register("email")}
                className="mt-2 w-full rounded-2xl px-4 py-3 outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.82)",
                  border: `1px solid ${brand.border}`,
                }}
              />
              {form.formState.errors.email ? (
                <p className="mt-2 text-sm" style={{ color: "#8A5A36" }}>
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...form.register("password")}
                className="mt-2 w-full rounded-2xl px-4 py-3 outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.82)",
                  border: `1px solid ${brand.border}`,
                }}
              />
              {form.formState.errors.password ? (
                <p className="mt-2 text-sm" style={{ color: "#8A5A36" }}>
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
              }}
            >
              Validate form
            </button>
          </form>
        </PlaceholderPanel>

        <PlaceholderPanel
          title="Current behavior"
          body={
            submitted
              ? `Validation passed for ${submitted.email}. Auth exchange and session creation are not connected yet.`
              : "Submit the form to verify client-side validation only. No auth request is sent."
          }
        />
      </div>
    </PageShell>
  );
}
