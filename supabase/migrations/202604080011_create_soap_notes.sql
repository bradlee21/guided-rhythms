create table public.soap_notes (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  therapist_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  subjective text not null default '',
  objective text not null default '',
  assessment text not null default '',
  plan text not null default '',
  private_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(appointment_id)
);

alter table public.soap_notes enable row level security;

create policy "deny public soap_notes select" on public.soap_notes for select to anon, authenticated using (false);
create policy "deny public soap_notes insert" on public.soap_notes for insert to anon, authenticated with check (false);
create policy "deny public soap_notes update" on public.soap_notes for update to anon, authenticated using (false) with check (false);
create policy "deny public soap_notes delete" on public.soap_notes for delete to anon, authenticated using (false);

create policy "service role full access soap_notes select" on public.soap_notes for select to service_role using (true);
create policy "service role full access soap_notes insert" on public.soap_notes for insert to service_role with check (true);
create policy "service role full access soap_notes update" on public.soap_notes for update to service_role using (true) with check (true);
create policy "service role full access soap_notes delete" on public.soap_notes for delete to service_role using (true);

create index on public.soap_notes(appointment_id);
create index on public.soap_notes(therapist_id);
create index on public.soap_notes(client_id);

create or replace function public.update_soap_notes_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger soap_notes_updated_at
  before update on public.soap_notes
  for each row execute function public.update_soap_notes_updated_at();
