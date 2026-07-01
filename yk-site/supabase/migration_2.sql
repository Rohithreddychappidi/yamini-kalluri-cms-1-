-- ============================================================
-- Migration: run this if you already ran schema.sql once before.
-- Safe to run multiple times.
-- ============================================================

-- 1) Add phone number to site settings
alter table site_settings add column if not exists phone text default '+1 (000) 000-0000';

-- 2) The Artist page: hero image + Inside The Artist (Awards & Testimonials)
update pages
set content = content || jsonb_build_object(
  'hero_image', coalesce(content->>'hero_image', '/assets/mono-hero.png'),
  'inside_heading', 'Awards & Achievements / Testimonials',
  'awards_heading', 'Awards & Achievements',
  'awards', '["Katta Sarojini Devi Gold Medal — Padma Shri Dr. Sobha Naidu, 2011","Pt. Jasraj Scholarship — awarded by Pt. Jasraj, 2012","Bala Ratna Awardee — Abhinandana Cultural Organization, 2013","Queens Theatre Grant — Queensboro Festival, 2018","NYSCA Grant — Kritya School of Dance, 2022"]'::jsonb,
  'testimonials_heading', 'Testimonials',
  'testimonials', '[{"quote":"Yamini Kalluri is a force of nature on stage, carrying centuries of tradition with effortless grace.","author":"Critic Name, Publication"},{"quote":"Her choreography bridges the classical and the contemporary in a way few artists can.","author":"Critic Name, Publication"}]'::jsonb
)
where slug = 'the-artist';

-- 3) Work page: hero image + closing quote/image (replaces the old Collaborations /
--    Masterclasses / Residencies / Awards lists, which the new design no longer shows)
update pages
set content = content || jsonb_build_object(
  'hero_image', coalesce(content->>'hero_image', '/assets/mono-hero.png'),
  'quote_text', 'Dance is not just performance — it is a living conversation between tradition and the present moment.',
  'quote_image', '/assets/bio-landscape.png'
)
where slug = 'work';
