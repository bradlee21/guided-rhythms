"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { brand } from "@/lib/brand";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

function getSafeNextPath(nextPath: string | null | undefined) {
  if (!nextPath || !nextPath.startsWith("/")) {
    return "/admin";
  }

  if (nextPath.startsWith("//")) {
    return "/admin";
  }

  return nextPath;
}

export function AdminLoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const inputClassName = "mt-2 w-full rounded-2xl px-4 py-3 outline-none";
  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.82)",
    border: `1px solid ${brand.border}`,
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push(getSafeNextPath(nextPath));
      router.refresh();
    } catch {
      setMessage("Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...form.register("email")}
          className={inputClassName}
          style={inputStyle}
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
          className={inputClassName}
          style={inputStyle}
        />
        {form.formState.errors.password ? (
          <p className="mt-2 text-sm" style={{ color: "#8A5A36" }}>
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>

      {message ? (
        <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        style={{
          background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
        }}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
