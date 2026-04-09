import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await requireApprovedAdminUser();
    const body = await req.json();
    const supabase = await createServiceClient();

    const { error } = await supabase
      .from("services")
      .update({
        name: body.name,
        description: body.description,
        hands_on_minutes: body.hands_on_minutes,
        base_price_cents: body.base_price_cents,
        is_active: body.is_active,
        is_public: body.is_public,
      })
      .eq("id", body.id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
