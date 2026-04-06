create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  preferred_name text null,
  email text not null,
  phone text not null,
  date_of_birth date null,
  pronouns text null,
  emergency_contact_name text null,
  emergency_contact_phone text null,
  referral_source text null,
  preferred_contact_method text null,
  notes text null,
  is_minor boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  description text not null,
  hands_on_minutes int not null,
  intake_minutes int not null default 0,
  buffer_minutes int not null default 10,
  total_block_minutes int not null,
  base_price_cents int not null,
  is_active boolean not null default true,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_hands_on_minutes_check check (hands_on_minutes > 0),
  constraint services_intake_minutes_check check (intake_minutes >= 0),
  constraint services_buffer_minutes_check check (buffer_minutes >= 0),
  constraint services_total_block_minutes_check check (total_block_minutes > 0),
  constraint services_base_price_cents_check check (base_price_cents >= 0)
);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid null references public.clients(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  is_new_client boolean not null,
  requested_service_id uuid null references public.services(id) on delete set null,
  requested_therapist_id uuid null,
  preferred_days jsonb null,
  preferred_times jsonb null,
  preferred_date_1 date null,
  preferred_date_2 date null,
  preferred_date_3 date null,
  pain_points text null,
  goals text null,
  referral_source text null,
  notes text null,
  status text not null default 'submitted',
  admin_notes text null,
  reviewed_by uuid null,
  reviewed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint booking_requests_status_check check (
    status in (
      'submitted',
      'under_review',
      'approved',
      'declined',
      'expired',
      'converted'
    )
  )
);

create index if not exists idx_clients_email on public.clients (email);
create index if not exists idx_services_slug on public.services (slug);
create index if not exists idx_services_is_public on public.services (is_public);
create index if not exists idx_booking_requests_status on public.booking_requests (status);
create index if not exists idx_booking_requests_email on public.booking_requests (email);
create index if not exists idx_booking_requests_created_at on public.booking_requests (created_at desc);

grant select on public.clients to anon, authenticated;
grant select on public.services to anon, authenticated;
grant select, insert, update on public.booking_requests to anon, authenticated;

drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at
before update on public.clients
for each row
execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();

drop trigger if exists set_booking_requests_updated_at on public.booking_requests;
create trigger set_booking_requests_updated_at
before update on public.booking_requests
for each row
execute function public.set_updated_at();
