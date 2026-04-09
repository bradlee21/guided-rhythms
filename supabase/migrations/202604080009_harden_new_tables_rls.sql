-- Harden RLS on all tables added in this session
-- Matches the pattern established in 202604060002 and 202604060003

-- therapist_schedules
alter table public.therapist_schedules enable row level security;

create policy "deny public therapist_schedules select" on public.therapist_schedules for select to anon, authenticated using (false);
create policy "deny public therapist_schedules insert" on public.therapist_schedules for insert to anon, authenticated with check (false);
create policy "deny public therapist_schedules update" on public.therapist_schedules for update to anon, authenticated using (false) with check (false);
create policy "deny public therapist_schedules delete" on public.therapist_schedules for delete to anon, authenticated using (false);

create policy "service role full access therapist_schedules select" on public.therapist_schedules for select to service_role using (true);
create policy "service role full access therapist_schedules insert" on public.therapist_schedules for insert to service_role with check (true);
create policy "service role full access therapist_schedules update" on public.therapist_schedules for update to service_role using (true) with check (true);
create policy "service role full access therapist_schedules delete" on public.therapist_schedules for delete to service_role using (true);

-- blocked_times
alter table public.blocked_times enable row level security;

create policy "deny public blocked_times select" on public.blocked_times for select to anon, authenticated using (false);
create policy "deny public blocked_times insert" on public.blocked_times for insert to anon, authenticated with check (false);
create policy "deny public blocked_times update" on public.blocked_times for update to anon, authenticated using (false) with check (false);
create policy "deny public blocked_times delete" on public.blocked_times for delete to anon, authenticated using (false);

create policy "service role full access blocked_times select" on public.blocked_times for select to service_role using (true);
create policy "service role full access blocked_times insert" on public.blocked_times for insert to service_role with check (true);
create policy "service role full access blocked_times update" on public.blocked_times for update to service_role using (true) with check (true);
create policy "service role full access blocked_times delete" on public.blocked_times for delete to service_role using (true);

-- appointments (added in migration 4 but RLS not yet hardened to match pattern)
create policy "deny public appointments select" on public.appointments for select to anon, authenticated using (false);
create policy "deny public appointments insert" on public.appointments for insert to anon, authenticated with check (false);
create policy "deny public appointments update" on public.appointments for update to anon, authenticated using (false) with check (false);
create policy "deny public appointments delete" on public.appointments for delete to anon, authenticated using (false);

create policy "service role full access appointments select" on public.appointments for select to service_role using (true);
create policy "service role full access appointments insert" on public.appointments for insert to service_role with check (true);
create policy "service role full access appointments update" on public.appointments for update to service_role using (true) with check (true);
create policy "service role full access appointments delete" on public.appointments for delete to service_role using (true);

-- intakes
create policy "deny public intakes select" on public.intakes for select to anon, authenticated using (false);
create policy "deny public intakes insert" on public.intakes for insert to anon, authenticated with check (false);
create policy "deny public intakes update" on public.intakes for update to anon, authenticated using (false) with check (false);
create policy "deny public intakes delete" on public.intakes for delete to anon, authenticated using (false);

create policy "service role full access intakes select" on public.intakes for select to service_role using (true);
create policy "service role full access intakes insert" on public.intakes for insert to service_role with check (true);
create policy "service role full access intakes update" on public.intakes for update to service_role using (true) with check (true);
create policy "service role full access intakes delete" on public.intakes for delete to service_role using (true);

-- intake_answers
create policy "deny public intake_answers select" on public.intake_answers for select to anon, authenticated using (false);
create policy "deny public intake_answers insert" on public.intake_answers for insert to anon, authenticated with check (false);
create policy "deny public intake_answers update" on public.intake_answers for update to anon, authenticated using (false) with check (false);
create policy "deny public intake_answers delete" on public.intake_answers for delete to anon, authenticated using (false);

create policy "service role full access intake_answers select" on public.intake_answers for select to service_role using (true);
create policy "service role full access intake_answers insert" on public.intake_answers for insert to service_role with check (true);
create policy "service role full access intake_answers update" on public.intake_answers for update to service_role using (true) with check (true);
create policy "service role full access intake_answers delete" on public.intake_answers for delete to service_role using (true);

-- therapists view (read-only, no PHI)
grant select on public.therapists to service_role;
revoke select on public.therapists from anon, authenticated;
