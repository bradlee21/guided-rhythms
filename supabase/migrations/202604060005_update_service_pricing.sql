update public.services
set base_price_cents = canonical.base_price_cents
from (
  values
    ('first-visit-therapeutic-60'::text, 9500::int),
    ('therapeutic-60'::text, 11000::int),
    ('therapeutic-90'::text, 15500::int),
    ('therapeutic-120'::text, 21000::int),
    ('sports-60'::text, 11000::int),
    ('sports-90'::text, 15500::int),
    ('focused-therapeutic-60'::text, 11000::int),
    ('focused-therapeutic-90'::text, 15500::int)
) as canonical(slug, base_price_cents)
where public.services.slug = canonical.slug;
