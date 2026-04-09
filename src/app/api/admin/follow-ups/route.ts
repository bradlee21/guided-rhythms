import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await requireApprovedAdminUser();
    const { id, status } = await req.json();
    const supabase = await createServiceClient();

    const update: Record<string, any> = { status };
    if (status === "sent") update.sent_at = new Date().toISOString();
    if (status === "dismissed") update.dismissed_at = new Date().toISOString();

    const { error } = await supabase
      .from("follow_ups")
      .update(update)
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
