create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  booking_request_id uuid null references public.booking_requests(id) on delete set null,
  service_id uuid not null references public.services(id) on delete restrict,
  therapist_id uuid null,
  status text not null default 'pending_confirmation',
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  timezone text not null default 'America/New_York',
  location_type text not null default 'office',
  location_label text null,
  intake_status text not null default 'not_sent',
  follow_up_status text not null default 'not_needed',
  price_cents int not null,
  internal_notes text null,
  confirmation_sent_at timestamptz null,
  reminder_sent_at timestamptz null,
  cancelled_at timestamptz null,
  cancelled_reason text null,
  rescheduled_from_appointment_id uuid null references public.appointments(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint appointments_status_check check (
    status in (
      'pending_confirmation',
      'confirmed',
      'intake_pending',
      'ready_for_visit',
      'arrived',
      'in_session',
      'completed',
      'cancelled',
      'no_show',
      'rescheduled'
    )
  ),
  constraint appointments_location_type_check check (
    location_type in ('office', 'custom')
  ),
  constraint appointments_intake_status_check check (
    intake_status in (
      'not_sent',
      'sent',
      'in_progress',
      'completed',
      'reviewed',
      'needs_update'
    )
  ),
  constraint appointments_follow_up_status_check check (
    follow_up_status in (
      'not_needed',
      'planned',
      'sent',
      'responded',
      'rebooked',
      'closed'
    )
  ),
  constraint appointments_price_cents_check check (price_cents >= 0),
  constraint appointments_time_range_check check (end_time > start_time)
);

create unique index if not exists idx_appointments_booking_request_unique
on public.appointments (booking_request_id)
where booking_request_id is not null;

create index if not exists idx_appointments_appointment_date
on public.appointments (appointment_date);

create index if not exists idx_appointments_status
on public.appointments (status);

create index if not exists idx_appointments_client_id
on public.appointments (client_id);

create index if not exists idx_appointments_therapist_id
on public.appointments (therapist_id);

drop trigger if exists set_appointments_updated_at on public.appointments;
create trigger set_appointments_updated_at
before update on public.appointments
for each row
execute function public.set_updated_at();

alter table public.appointments enable row level security;

drop policy if exists "deny public appointment reads" on public.appointments;
create policy "deny public appointment reads"
on public.appointments
for select
to anon, authenticated
using (false);

drop policy if exists "deny public appointment inserts" on public.appointments;
create policy "deny public appointment inserts"
on public.appointments
for insert
to anon, authenticated
with check (false);

drop policy if exists "deny public appointment updates" on public.appointments;
create policy "deny public appointment updates"
on public.appointments
for update
to anon, authenticated
using (false)
with check (false);

drop policy if exists "deny public appointment deletes" on public.appointments;
create policy "deny public appointment deletes"
on public.appointments
for delete
to anon, authenticated
using (false);

drop policy if exists "service role can read appointments" on public.appointments;
create policy "service role can read appointments"
on public.appointments
for select
to service_role
using (true);

drop policy if exists "service role can insert appointments" on public.appointments;
create policy "service role can insert appointments"
on public.appointments
for insert
to service_role
with check (true);

drop policy if exists "service role can update appointments" on public.appointments;
create policy "service role can update appointments"
on public.appointments
for update
to service_role
using (true)
with check (true);

drop policy if exists "service role can delete appointments" on public.appointments;
create policy "service role can delete appointments"
on public.appointments
for delete
to service_role
using (true);
