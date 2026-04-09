-- Therapist schedule: regular weekly availability
create table therapist_schedules (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references auth.users(id) on delete cascade,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(therapist_id, day_of_week)
);

-- Blocked times: vacations, breaks, manual blocks
create table blocked_times (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid references auth.users(id) on delete cascade,
  blocked_date date,
  start_time time,
  end_time time,
  is_full_day boolean not null default false,
  reason text,
  created_at timestamptz not null default now()
);

-- RLS: service role only
alter table therapist_schedules enable row level security;
alter table blocked_times enable row level security;

create policy "service role full access" on therapist_schedules
  using (auth.role() = 'service_role');
create policy "service role full access" on blocked_times
  using (auth.role() = 'service_role');

-- Indexes
create index on therapist_schedules(therapist_id, day_of_week);
create index on blocked_times(therapist_id, blocked_date);
create index on appointments(therapist_id, appointment_date);
