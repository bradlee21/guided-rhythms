-- Drop the view and replace with a real table
drop view if exists public.therapists;

create table public.therapists (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  bio text not null default '',
  specialty text not null default '',
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.therapists enable row level security;

-- Public can read active therapists for booking flow
create policy "public can read active therapists"
  on public.therapists for select
  to anon, authenticated
  using (is_active = true);

-- Service role full access
create policy "service role full access therapists select" on public.therapists for select to service_role using (true);
create policy "service role full access therapists insert" on public.therapists for insert to service_role with check (true);
create policy "service role full access therapists update" on public.therapists for update to service_role using (true) with check (true);
create policy "service role full access therapists delete" on public.therapists for delete to service_role using (true);

create index on public.therapists(is_active, display_order);

-- Seed Brad
insert into public.therapists (id, full_name, bio, specialty, display_order)
values (
  '9e4f2bce-4ea2-4618-ba4a-bf5d2a085714',
  'Brad Ivy',
  'Recovery-minded work rooted in listening and purposeful treatment. Brad helps clients feel supported rather than rushed through a routine.',
  'Therapeutic & Deep Tissue',
  2
);
