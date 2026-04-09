create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  therapist_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('post_session', 'rebooking')),
  status text not null default 'pending' check (status in ('pending', 'sent', 'dismissed')),
  due_date date not null,
  sent_at timestamptz,
  dismissed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.follow_ups enable row level security;

create policy "deny public follow_ups select" on public.follow_ups for select to anon, authenticated using (false);
create policy "deny public follow_ups insert" on public.follow_ups for insert to anon, authenticated with check (false);
create policy "deny public follow_ups update" on public.follow_ups for update to anon, authenticated using (false) with check (false);
create policy "deny public follow_ups delete" on public.follow_ups for delete to anon, authenticated using (false);

create policy "service role full access follow_ups select" on public.follow_ups for select to service_role using (true);
create policy "service role full access follow_ups insert" on public.follow_ups for insert to service_role with check (true);
create policy "service role full access follow_ups update" on public.follow_ups for update to service_role using (true) with check (true);
create policy "service role full access follow_ups delete" on public.follow_ups for delete to service_role using (true);

create index on public.follow_ups(therapist_id, status, due_date);
create index on public.follow_ups(appointment_id);
