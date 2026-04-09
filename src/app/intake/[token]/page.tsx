import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";
import { verifyIntakeToken } from "@/lib/intake/token";
import { createServiceClient } from "@/lib/supabase/server";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { IntakeSummary } from "@/components/intake/IntakeSummary";
import { mapIntakeAnswersToValues, createDefaultIntakeValues } from "@/lib/intake/answers";
import Link from "next/link";

export default async function IntakeTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const result = verifyIntakeToken(token);
  const payload = result.ok ? result.payload : null;

  if (!payload) {
    return (
      <div style={{ minHeight: "100vh", background: brand.background, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>Intake form</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            This link has expired.
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "32px" }}>
            Intake links expire after a period of time for your security. Please contact your therapist for a new link.
          </p>
          <Link href="/" style={{ padding: "12px 28px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const supabase = await createServiceClient();

  const { data: intake } = await supabase
    .from("intakes")
    .select(`*, intake_answers(*), appointments(id, appointment_date, clients(*))`)
    .eq("id", payload.intakeId)
    .single();

  if (!intake) notFound();

  const appt = intake.appointments as any;
  const client = appt?.clients as any;
  const isCompleted = intake.status === "completed" || intake.status === "reviewed";

  const values = mapIntakeAnswersToValues(
    intake.intake_answers ?? [],
    createDefaultIntakeValues(client ?? undefined),
  );

  return (
    <div style={{ minHeight: "100vh", background: brand.background }}>

      {/* Header */}
      <div style={{ padding: "24px 48px", borderBottom: `1px solid ${brand.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: brand.backgroundSoft }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1px solid ${brand.borderGold}`, background: brand.goldPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 10 C5 9 4 7.5 4 6 C4 4 5.5 2.5 7 2.5 C8.5 2.5 10 4 10 6 C10 7.5 9 9 7 10Z" fill={brand.sage} opacity="0.8"/>
              <path d="M7 2L7 1" stroke={brand.gold} strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="7" cy="0.5" r="1" fill={brand.gold}/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.forest, fontFamily: "'DM Sans', sans-serif" }}>Guided Rhythms</div>
            <div style={{ fontSize: "9px", letterSpacing: "0.08em", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Massage Therapy</div>
          </div>
        </div>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
          Health history form
        </p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 48px" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>
            {isCompleted ? "Intake complete" : "Before your session"}
          </p>
          <div style={{ width: "40px", height: "1px", background: brand.gold, marginBottom: "16px" }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "12px" }}>
            {isCompleted
              ? `Thank you${client?.first_name ? `, ${client.first_name}` : ""}.`
              : `Welcome${client?.first_name ? `, ${client.first_name}` : ""}.`}
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
            {isCompleted
              ? "Your health history has been received. Your therapist will review it before your session."
              : "Please take a few minutes to complete your health history. This helps your therapist provide the best possible care."}
          </p>
        </div>

        {isCompleted ? (
          <IntakeSummary values={values} />
        ) : (
          <IntakeForm
            intake={{
              id: intake.id,
              appointment_id: appt?.id ?? payload.appointmentId,
              client_id: client?.id ?? "",
              status: intake.status,
              client: client ? { first_name: client.first_name, last_name: client.last_name, preferred_name: client.preferred_name ?? null, email: client.email ?? "", phone: client.phone ?? "" } : null,
              appointment: appt ? { appointment_date: appt.appointment_date, start_time: appt.start_time ?? "", service_name: null } : null,
              answers: intake.intake_answers ?? [],
            }}
            defaultValues={{ ...values, token }}
          />
        )}
      </div>
    </div>
  );
}
