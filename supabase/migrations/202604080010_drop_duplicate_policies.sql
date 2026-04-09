-- Drop the catch-all policies created in migration 7
-- to avoid conflicts with the granular per-operation policies in migration 9

drop policy if exists "service role full access" on public.therapist_schedules;
drop policy if exists "service role full access" on public.blocked_times;
