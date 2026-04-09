import { getTherapists } from "@/lib/scheduling";
import { createServiceClient } from "@/lib/supabase/server";
import BookingFlow from "@/components/booking/BookingFlow";

export default async function SchedulePage() {
  const therapists = await getTherapists();
  const supabase = await createServiceClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, name, description, hands_on_minutes, base_price_cents, slug")
    .eq("is_active", true)
    .eq("is_public", true)
    .order("sort_order");

  return <BookingFlow therapists={therapists} services={services ?? []} />;
}
