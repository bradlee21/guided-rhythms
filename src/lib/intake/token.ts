import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

const intakeTokenTtlDays = 180;

type IntakeTokenPayload = {
  intakeId: string;
  appointmentId: string;
  expiresAt: number;
};

function getIntakeTokenSecret() {
  const secret = process.env.INTAKE_TOKEN_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "INTAKE_TOKEN_SECRET must be configured and at least 32 characters long.",
    );
  }

  return secret;
}

function signPayload(payloadBase64: string) {
  return createHmac("sha256", getIntakeTokenSecret())
    .update(payloadBase64)
    .digest("base64url");
}

export function createIntakeToken(input: {
  intakeId: string;
  appointmentId: string;
  createdAt: string;
}) {
  const expiresAt =
    new Date(input.createdAt).getTime() + intakeTokenTtlDays * 24 * 60 * 60 * 1000;
  const payloadBase64 = Buffer.from(
    JSON.stringify({
      intakeId: input.intakeId,
      appointmentId: input.appointmentId,
      expiresAt,
    } satisfies IntakeTokenPayload),
  ).toString("base64url");

  const signature = signPayload(payloadBase64);

  return `${payloadBase64}.${signature}`;
}

export function verifyIntakeToken(token: string) {
  const [payloadBase64, signature] = token.split(".");

  if (!payloadBase64 || !signature) {
    return { ok: false, reason: "invalid" } as const;
  }

  try {
    const expectedSignature = signPayload(payloadBase64);
    const provided = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);

    if (
      provided.length !== expected.length ||
      !timingSafeEqual(provided, expected)
    ) {
      return { ok: false, reason: "invalid" } as const;
    }

    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8"),
    ) as IntakeTokenPayload;

    if (
      typeof payload.intakeId !== "string" ||
      typeof payload.appointmentId !== "string" ||
      typeof payload.expiresAt !== "number"
    ) {
      return { ok: false, reason: "invalid" } as const;
    }

    if (Date.now() > payload.expiresAt) {
      return { ok: false, reason: "expired" } as const;
    }

    return { ok: true, payload } as const;
  } catch {
    return { ok: false, reason: "invalid" } as const;
  }
}

export function getIntakeTokenPath(token: string) {
  return `/intake/${token}`;
}
