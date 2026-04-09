import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await requireApprovedAdminUser();
    const body = await req.json();
    const supabase = await createServiceClient();

    const { data, error } = await supabase
      .from("blocked_times")
      .insert({
        therapist_id: user.id,
        blocked_date: body.blocked_date,
        is_full_day: body.is_full_day,
        start_time: body.start_time ?? null,
        end_time: body.end_time ?? null,
        reason: body.reason ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ block: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requireApprovedAdminUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const supabase = await createServiceClient();
    const { error } = await supabase
      .from("blocked_times")
      .delete()
      .eq("id", id)
      .eq("therapist_id", user.id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
