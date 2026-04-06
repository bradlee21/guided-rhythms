create table if not exists public.intakes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  appointment_id uuid not null unique references public.appointments(id) on delete cascade,
  status text not null default 'not_sent',
  form_version int not null default 1,
  completed_at timestamptz null,
  reviewed_at timestamptz null,
  reviewed_by uuid null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint intakes_status_check check (
    status in (
      'not_sent',
      'sent',
      'in_progress',
      'completed',
      'reviewed',
      'needs_update'
    )
  ),
  constraint intakes_form_version_check check (form_version >= 1)
);

create table if not exists public.intake_answers (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.intakes(id) on delete cascade,
  field_key text not null,
  field_label text not null,
  field_type text not null,
  answer_text text null,
  answer_json jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.intakes (
  client_id,
  appointment_id,
  status,
  form_version
)
select
  appointments.client_id,
  appointments.id,
  appointments.intake_status,
  1
from public.appointments
left join public.intakes
  on public.intakes.appointment_id = public.appointments.id
where public.intakes.id is null;

create index if not exists idx_intakes_appointment_id
on public.intakes (appointment_id);

create index if not exists idx_intakes_client_id
on public.intakes (client_id);

create index if not exists idx_intakes_status
on public.intakes (status);

create index if not exists idx_intake_answers_intake_id
on public.intake_answers (intake_id);

create unique index if not exists idx_intake_answers_intake_id_field_key
on public.intake_answers (intake_id, field_key);

drop trigger if exists set_intakes_updated_at on public.intakes;
create trigger set_intakes_updated_at
before update on public.intakes
for each row
execute function public.set_updated_at();

drop trigger if exists set_intake_answers_updated_at on public.intake_answers;
create trigger set_intake_answers_updated_at
before update on public.intake_answers
for each row
execute function public.set_updated_at();

alter table public.intakes enable row level security;
alter table public.intake_answers enable row level security;

drop policy if exists "deny public intake reads" on public.intakes;
create policy "deny public intake reads"
on public.intakes
for select
to anon, authenticated
using (false);

drop policy if exists "deny public intake inserts" on public.intakes;
create policy "deny public intake inserts"
on public.intakes
for insert
to anon, authenticated
with check (false);

drop policy if exists "deny public intake updates" on public.intakes;
create policy "deny public intake updates"
on public.intakes
for update
to anon, authenticated
using (false)
with check (false);

drop policy if exists "deny public intake deletes" on public.intakes;
create policy "deny public intake deletes"
on public.intakes
for delete
to anon, authenticated
using (false);

drop policy if exists "service role can read intakes" on public.intakes;
create policy "service role can read intakes"
on public.intakes
for select
to service_role
using (true);

drop policy if exists "service role can insert intakes" on public.intakes;
create policy "service role can insert intakes"
on public.intakes
for insert
to service_role
with check (true);

drop policy if exists "service role can update intakes" on public.intakes;
create policy "service role can update intakes"
on public.intakes
for update
to service_role
using (true)
with check (true);

drop policy if exists "service role can delete intakes" on public.intakes;
create policy "service role can delete intakes"
on public.intakes
for delete
to service_role
using (true);

drop policy if exists "deny public intake answer reads" on public.intake_answers;
create policy "deny public intake answer reads"
on public.intake_answers
for select
to anon, authenticated
using (false);

drop policy if exists "deny public intake answer inserts" on public.intake_answers;
create policy "deny public intake answer inserts"
on public.intake_answers
for insert
to anon, authenticated
with check (false);

drop policy if exists "deny public intake answer updates" on public.intake_answers;
create policy "deny public intake answer updates"
on public.intake_answers
for update
to anon, authenticated
using (false)
with check (false);

drop policy if exists "deny public intake answer deletes" on public.intake_answers;
create policy "deny public intake answer deletes"
on public.intake_answers
for delete
to anon, authenticated
using (false);

drop policy if exists "service role can read intake answers" on public.intake_answers;
create policy "service role can read intake answers"
on public.intake_answers
for select
to service_role
using (true);

drop policy if exists "service role can insert intake answers" on public.intake_answers;
create policy "service role can insert intake answers"
on public.intake_answers
for insert
to service_role
with check (true);

drop policy if exists "service role can update intake answers" on public.intake_answers;
create policy "service role can update intake answers"
on public.intake_answers
for update
to service_role
using (true)
with check (true);

drop policy if exists "service role can delete intake answers" on public.intake_answers;
create policy "service role can delete intake answers"
on public.intake_answers
for delete
to service_role
using (true);
