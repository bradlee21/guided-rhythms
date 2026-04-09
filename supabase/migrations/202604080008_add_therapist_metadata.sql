-- Store therapist display info in auth metadata
-- No new table needed — we extend auth.users via a secure view
create or replace view public.therapists as
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data->>'full_name', u.email) as full_name,
  coalesce(u.raw_user_meta_data->>'bio', '') as bio,
  coalesce(u.raw_user_meta_data->>'specialty', '') as specialty,
  coalesce((u.raw_user_meta_data->>'display_order')::int, 0) as display_order,
  coalesce((u.raw_user_meta_data->>'is_active')::boolean, true) as is_active
from auth.users u
where u.email = any(
  string_to_array(current_setting('app.admin_allowlist', true), ',')
);

-- Grant read access
grant select on public.therapists to anon, authenticated, service_role;
