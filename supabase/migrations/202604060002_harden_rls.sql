alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.booking_requests enable row level security;

drop policy if exists "public can read active public services" on public.services;
create policy "public can read active public services"
on public.services
for select
to anon, authenticated
using (is_active = true and is_public = true);

drop policy if exists "deny public client reads" on public.clients;
create policy "deny public client reads"
on public.clients
for select
to anon, authenticated
using (false);

drop policy if exists "deny public client inserts" on public.clients;
create policy "deny public client inserts"
on public.clients
for insert
to anon, authenticated
with check (false);

drop policy if exists "deny public client updates" on public.clients;
create policy "deny public client updates"
on public.clients
for update
to anon, authenticated
using (false)
with check (false);

drop policy if exists "deny public client deletes" on public.clients;
create policy "deny public client deletes"
on public.clients
for delete
to anon, authenticated
using (false);

drop policy if exists "deny public booking request reads" on public.booking_requests;
create policy "deny public booking request reads"
on public.booking_requests
for select
to anon, authenticated
using (false);

drop policy if exists "deny public booking request inserts" on public.booking_requests;
create policy "deny public booking request inserts"
on public.booking_requests
for insert
to anon, authenticated
with check (false);

drop policy if exists "deny public booking request updates" on public.booking_requests;
create policy "deny public booking request updates"
on public.booking_requests
for update
to anon, authenticated
using (false)
with check (false);

drop policy if exists "deny public booking request deletes" on public.booking_requests;
create policy "deny public booking request deletes"
on public.booking_requests
for delete
to anon, authenticated
using (false);
