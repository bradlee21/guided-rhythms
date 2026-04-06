drop policy if exists "service role can read services" on public.services;
create policy "service role can read services"
on public.services
for select
to service_role
using (true);

drop policy if exists "service role can insert services" on public.services;
create policy "service role can insert services"
on public.services
for insert
to service_role
with check (true);

drop policy if exists "service role can update services" on public.services;
create policy "service role can update services"
on public.services
for update
to service_role
using (true)
with check (true);

drop policy if exists "service role can delete services" on public.services;
create policy "service role can delete services"
on public.services
for delete
to service_role
using (true);

drop policy if exists "service role can read clients" on public.clients;
create policy "service role can read clients"
on public.clients
for select
to service_role
using (true);

drop policy if exists "service role can insert clients" on public.clients;
create policy "service role can insert clients"
on public.clients
for insert
to service_role
with check (true);

drop policy if exists "service role can update clients" on public.clients;
create policy "service role can update clients"
on public.clients
for update
to service_role
using (true)
with check (true);

drop policy if exists "service role can delete clients" on public.clients;
create policy "service role can delete clients"
on public.clients
for delete
to service_role
using (true);

drop policy if exists "service role can read booking requests" on public.booking_requests;
create policy "service role can read booking requests"
on public.booking_requests
for select
to service_role
using (true);

drop policy if exists "service role can insert booking requests" on public.booking_requests;
create policy "service role can insert booking requests"
on public.booking_requests
for insert
to service_role
with check (true);

drop policy if exists "service role can update booking requests" on public.booking_requests;
create policy "service role can update booking requests"
on public.booking_requests
for update
to service_role
using (true)
with check (true);

drop policy if exists "service role can delete booking requests" on public.booking_requests;
create policy "service role can delete booking requests"
on public.booking_requests
for delete
to service_role
using (true);
