import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await requireApprovedAdminUser();
    const body = await req.json();
    const supabase = await createServiceClient();

    const { data, error } = await supabase
      .from("soap_notes")
      .upsert({
        appointment_id: body.appointmentId,
        therapist_id: body.therapistId,
        client_id: body.clientId,
        subjective: body.subjective ?? "",
        objective: body.objective ?? "",
        assessment: body.assessment ?? "",
        plan: body.plan ?? "",
        private_notes: body.private_notes ?? "",
      }, { onConflict: "appointment_id" })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ soapNote: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
