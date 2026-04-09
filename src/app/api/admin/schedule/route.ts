import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await requireApprovedAdminUser();
    const { days } = await req.json();
    const supabase = await createServiceClient();

    const rows = days.map((d: any) => ({
      therapist_id: user.id,
      day_of_week: d.day_of_week,
      start_time: d.start_time,
      end_time: d.end_time,
      is_active: d.is_active,
    }));

    const { error } = await supabase
      .from("therapist_schedules")
      .upsert(rows, { onConflict: "therapist_id,day_of_week" });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
