with pricing as (
  select
    9500::int as first_visit_therapeutic_60,
    11000::int as therapeutic_60,
    15500::int as therapeutic_90,
    21000::int as therapeutic_120,
    11000::int as sports_60,
    15500::int as sports_90,
    11000::int as focused_therapeutic_60,
    15500::int as focused_therapeutic_90
)
insert into public.services (
  name,
  slug,
  category,
  description,
  hands_on_minutes,
  intake_minutes,
  buffer_minutes,
  total_block_minutes,
  base_price_cents,
  sort_order
)
select
  seeded.name,
  seeded.slug,
  seeded.category,
  seeded.description,
  seeded.hands_on_minutes,
  seeded.intake_minutes,
  seeded.buffer_minutes,
  seeded.total_block_minutes,
  seeded.base_price_cents,
  seeded.sort_order
from (
    select
      'First Visit Therapeutic Massage'::text as name,
      'first-visit-therapeutic-60'::text as slug,
      'first_visit'::text as category,
      'A first visit with extra intake time built into the session block.'::text as description,
      60::int as hands_on_minutes,
      15::int as intake_minutes,
      5::int as buffer_minutes,
      80::int as total_block_minutes,
      pricing.first_visit_therapeutic_60 as base_price_cents,
      10::int as sort_order
    from pricing
    union all
    select
      'Therapeutic Massage 60',
      'therapeutic-60',
      'therapeutic',
      'A full-body therapeutic session with a 60-minute hands-on treatment window.',
      60,
      0,
      10,
      70,
      pricing.therapeutic_60,
      20
    from pricing
    union all
    select
      'Therapeutic Massage 90',
      'therapeutic-90',
      'therapeutic',
      'Extended therapeutic work with more time for multiple focus areas.',
      90,
      0,
      10,
      100,
      pricing.therapeutic_90,
      30
    from pricing
    union all
    select
      'Therapeutic Massage 120',
      'therapeutic-120',
      'therapeutic',
      'A longer therapeutic session for comprehensive treatment and pacing.',
      120,
      0,
      10,
      130,
      pricing.therapeutic_120,
      40
    from pricing
    union all
    select
      'Sports Massage 60',
      'sports-60',
      'sports',
      'Focused sports massage for recovery, mobility, and performance support.',
      60,
      0,
      10,
      70,
      pricing.sports_60,
      50
    from pricing
    union all
    select
      'Sports Massage 90',
      'sports-90',
      'sports',
      'Extended sports-focused treatment for deeper recovery work.',
      90,
      0,
      10,
      100,
      pricing.sports_90,
      60
    from pricing
    union all
    select
      'Focused Therapeutic 60',
      'focused-therapeutic-60',
      'focused',
      'Targeted therapeutic work centered on specific pain points or goals.',
      60,
      0,
      10,
      70,
      pricing.focused_therapeutic_60,
      70
    from pricing
    union all
    select
      'Focused Therapeutic 90',
      'focused-therapeutic-90',
      'focused',
      'Longer focused treatment for clients who need more time on key areas.',
      90,
      0,
      10,
      100,
      pricing.focused_therapeutic_90,
      80
    from pricing
  ) as seeded(
    name,
    slug,
    category,
    description,
    hands_on_minutes,
    intake_minutes,
    buffer_minutes,
    total_block_minutes,
    base_price_cents,
    sort_order
  )
on conflict (slug) do update
set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  hands_on_minutes = excluded.hands_on_minutes,
  intake_minutes = excluded.intake_minutes,
  buffer_minutes = excluded.buffer_minutes,
  total_block_minutes = excluded.total_block_minutes,
  base_price_cents = excluded.base_price_cents,
  sort_order = excluded.sort_order,
  is_active = true,
  is_public = true;
