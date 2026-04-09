import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getAvailableSlots } from "@/lib/scheduling";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    therapistId, serviceId, date, startTime, endTime,
    durationMinutes, priceCents,
    firstName, lastName, email, phone, notes,
  } = body;

  if (!therapistId || !serviceId || !date || !startTime || !endTime || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  // Re-verify slot is still available
  const slots = await getAvailableSlots(therapistId, date, durationMinutes);
  const slot = slots.find((s) => s.start === startTime && s.available);
  if (!slot) {
    return NextResponse.json({ error: "That time slot is no longer available. Please choose another." }, { status: 409 });
  }

  // Upsert client by email
  const { data: existingClients } = await supabase
    .from("clients")
    .select("id")
    .eq("email", email)
    .limit(1);

  let clientId: string;
  if (existingClients && existingClients.length > 0) {
    clientId = existingClients[0].id;
  } else {
    const { data: newClient, error: clientError } = await supabase
      .from("clients")
      .insert({ first_name: firstName, last_name: lastName, email, phone })
      .select("id")
      .single();
    if (clientError || !newClient) {
      return NextResponse.json({ error: "Failed to create client record" }, { status: 500 });
    }
    clientId = newClient.id;
  }

  // Create appointment
  const { error: apptError } = await supabase.from("appointments").insert({
    client_id: clientId,
    service_id: serviceId,
    therapist_id: therapistId,
    appointment_date: date,
    start_time: startTime,
    end_time: endTime,
    price_cents: priceCents,
    status: "pending_confirmation",
    internal_notes: notes || null,
  });

  if (apptError) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
