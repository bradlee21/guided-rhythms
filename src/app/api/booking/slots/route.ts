import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/scheduling";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const therapistId = searchParams.get("therapistId");
  const date = searchParams.get("date");
  const duration = searchParams.get("duration");

  if (!therapistId || !date || !duration) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const durationMinutes = parseInt(duration, 10);
  if (isNaN(durationMinutes) || durationMinutes < 1) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  const slots = await getAvailableSlots(therapistId, date, durationMinutes);
  return NextResponse.json({ slots });
}
