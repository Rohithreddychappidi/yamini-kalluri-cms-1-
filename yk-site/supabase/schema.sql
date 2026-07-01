-- ============================================================
-- Yamini Kalluri site — CMS schema for Supabase
-- Run this whole file in Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- 1) SITE SETTINGS (one row only) — brand, nav labels, footer, socials
create table if not exists site_settings (
  id int primary key default 1,
  brand_name text not null default 'Yamini Kalluri',
  nav_home text not null default 'Home',
  nav_artist text not null default 'The Artist',
  nav_work text not null default 'Work',
  nav_writings text not null default 'Writings',
  nav_media text not null default 'Media',
  nav_contact text not null default 'Contact',
  footer_tagline text not null default 'Please contact us for any inquiries regarding classes, workshops, performances or press.',
  email text not null default 'hello@yaminikalluri.com',
  phone text default '+1 (000) 000-0000',
  facebook_url text default 'https://www.facebook.com/yamini.kalluri',
  instagram_url text default 'https://www.instagram.com/yaminikalluri/',
  youtube_url text default 'https://www.youtube.com/channel/UCh3we6c2V5zI0Nw6FqqUabA',
  copyright_text text not null default '© Yamini Kalluri. All rights reserved.',
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

-- 2) PAGES — generic per-page content as JSON, one row per page slug
create table if not exists pages (
  slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- 3) WRITINGS — sub-pages for what used to be "Press". Each item links to its own article page.
create table if not exists writings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  source_name text,
  source_url text,
  image_url text,
  excerpt text,
  body text,
  tile_size text default 'normal', -- normal | wide | tall (matches press-mosaic layout)
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4) MEDIA GALLERY ITEMS (Photos grid + Videos on the Media page)
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'photo', -- photo | video
  label text,
  image_url text,
  video_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 5) CONTACT SUBMISSIONS (so the contact form actually saves somewhere)
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text,
  comment text,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public (anon) can READ everything except raw contact submissions.
-- Only logged-in admin (authenticated) can WRITE.
-- ============================================================
alter table site_settings enable row level security;
alter table pages enable row level security;
alter table writings enable row level security;
alter table gallery_items enable row level security;
alter table contact_submissions enable row level security;

create policy "public read settings" on site_settings for select using (true);
create policy "admin write settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read pages" on pages for select using (true);
create policy "admin write pages" on pages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read published writings" on writings for select using (published = true or auth.role() = 'authenticated');
create policy "admin write writings" on writings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read gallery" on gallery_items for select using (true);
create policy "admin write gallery" on gallery_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "anyone can submit contact form" on contact_submissions for insert with check (true);
create policy "admin read contact submissions" on contact_submissions for select using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — mirrors the current static site so nothing breaks on first deploy
-- ============================================================

insert into pages (slug, content) values
('home', '{
  "hero_title": "Yamini Kalluri",
  "hero_role": "Kuchipudi Dancer, Choreographer & Teacher",
  "about_eyebrow": "About",
  "about_heading": "A tradition carried forward with grace.",
  "about_image": "/assets/bio-photo-1.png",
  "about_image_caption": "Portrait — performance, 2025",
  "about_paragraph_1": "Yamini Kalluri is a world-class Kuchipudi dancer (disciple of legendary Dr. Sobha Naidu) based in the US, where she teaches, performs and choreographs full-time. An artist who is at once deeply traditional, but also flirts with the avant-garde, Kalluri is a performer and choreographer not to be missed as Indian classical dance continues to conquer new stages abroad.",
  "about_paragraph_2": "Kalluri is known for her grace, lines, agility, and uncompromising quest for excellence as she works to re-frame and highlight Kuchipudi in a global context.",
  "work_eyebrow": "Work",
  "work_heading": "Teaching, performing, choreographing.",
  "work_image": "/assets/bio-landscape.png",
  "work_image_caption": "Kritya Ensemble, in rehearsal",
  "work_paragraph_1": "Yamini teaches, performs, choreographs and arranges music for dance repertoires. Travelling to a new country every year, she is dedicated to her mission to spread Kuchipudi across the globe while collaborating with local artists.",
  "work_paragraph_2": "Yamini champions the art of Kuchipudi worldwide through her non-profit, Kritya Foundation. As curator of the NY Kuchipudi Dance Festival and through unforgettable performances and groundbreaking collaborations with the Kritya Ensemble, she preserves this rich tradition while empowering the next generation.",
  "connected_heading": "Follow along.",
  "connected_tiles": ["Instagram", "Performance", "Rehearsal", "Kritya Ensemble"]
}'::jsonb)
on conflict (slug) do nothing;

insert into pages (slug, content) values
('the-artist', '{
  "hero_eyebrow": "The Artist",
  "hero_heading": "The making of an artist.",
  "hero_paragraph": "Yamini Kalluri is an internationally acclaimed Kuchipudi dancer, choreographer, and educator whose work carries classical tradition into a modern global stage.",
  "hero_image": "/assets/mono-hero.png",
  "about_eyebrow": "About",
  "about_heading": "Rooted in tradition, open to the new.",
  "about_paragraph_1": "Yamini Kalluri, a celebrated Kuchipudi dancer, choreographer, and educator, represents the future of classical dance with her innovative blend of tradition and contemporary influence. Based in the US and India, her journey began under the tutelage of Padmasri Dr. Sobha Naidu in Hyderabad, where she displayed exceptional talent early on.",
  "about_paragraph_2": "Furthering her dance education with a Bachelor''s degree in Humanities & Social Sciences from Indira Gandhi National Open University, she also trained in ballet and modern dance at the prestigious Martha Graham School.",
  "about_paragraph_3": "As the Founder of Kritya School of Dance, the Kritya Ensemble, and Kritya Dance Company, Yamini is committed to teaching, choreographing, and developing original musical compositions that resonate with a global audience.",
  "about_paragraph_4": "Her work through Kritya creates a platform for experimentation, where dancers and musicians can search for their truest forms of expression while preserving the core essence of Kuchipudi.",
  "photo_1": "/assets/bio-photo-1.png",
  "photo_2": "/assets/bio-photo-2.png",
  "landscape_photo": "/assets/bio-landscape.png",
  "inside_heading": "Awards & Achievements / Testimonials",
  "awards_heading": "Awards & Achievements",
  "awards": ["Katta Sarojini Devi Gold Medal — Padma Shri Dr. Sobha Naidu, 2011","Pt. Jasraj Scholarship — awarded by Pt. Jasraj, 2012","Bala Ratna Awardee — Abhinandana Cultural Organization, 2013","Queens Theatre Grant — Queensboro Festival, 2018","NYSCA Grant — Kritya School of Dance, 2022"],
  "testimonials_heading": "Testimonials",
  "testimonials": [
    {"quote":"Yamini Kalluri is a force of nature on stage, carrying centuries of tradition with effortless grace.","author":"Critic Name, Publication"},
    {"quote":"Her choreography bridges the classical and the contemporary in a way few artists can.","author":"Critic Name, Publication"}
  ]
}'::jsonb)
on conflict (slug) do nothing;

insert into pages (slug, content) values
('work', '{
  "hero_heading": "Choreography, Performance & Teaching Highlights",
  "hero_paragraph": "Yamini champions the art of Kuchipudi worldwide through her non-profit, Kritya Foundation. As curator of the NY Kuchipudi Dance Festival and through collaborations with the Kritya Ensemble, she preserves this rich tradition while empowering the next generation.",
  "hero_image": "/assets/mono-hero.png",
  "hero_link_label": "KrityaFoundation.org",
  "hero_link_url": "https://krityafoundation.org/",
  "row_image_1": "/assets/bio-photo-1.png",
  "row_image_2": "/assets/bio-photo-2.png",
  "row_image_3": "/assets/bio-landscape.png",
  "education_title": "Bachelor of Humanities & Social Sciences",
  "education_detail": "Indira Gandhi National Open University — 2022",
  "certificates_title": "Formal Training",
  "certificates_detail": "Certificate in Graham Technique (Independent 2-Year Program), Martha Graham School of Contemporary Dance, NY.\nCertificate in Kuchipudi Dance (4-Year Program), Telugu University, Hyderabad, India.",
  "experience": [
    {"yr":"2020 — Present","ev":"Founder of Kritya Foundation (Kritya School of Dance & Kritya Music and Dance Ensemble)","loc":"Teaching Kuchipudi to all ages and experience levels · administration & marketing · choreography and musical arrangement · curating events & fundraising."},
    {"yr":"2022 — 2023","ev":"Teaching Artist, Mark Morris Dance Center","loc":"Teaching kids'' and adult classes."},
    {"yr":"2010 — 2017","ev":"Teaching Artist, Srinivasa Kuchipudi Art Academy","loc":"Teaching kids'' and adult class rehearsals · Director, choreography & musical arrangement."}
  ],
  "performances_col1": ["92nd Street Y, Harkness Dance Center, New York City — Feb 2026","Diaspora Dance Festival, Chennai, India — Dec 2025","Bangalore International Center, Bangalore — Nov 2025","Nita Mukesh Ambani Cultural Center, Mumbai — Nov 2025","Kalanidhi Dance Showcase Series — Nov 2025","Richmond Folk Festival — Oct 2025"],
  "performances_col2": ["Montana Folk Festival — Jul 2025","Natya Mandir, Vienna, Austria — May 2025","Le Mandapa Spring Concert, Paris, France — May 2025","St. Martha''s Church, Nuremberg, Germany — May 2025","Global Arts Festival, Adelphi University — Apr 2025","Pongal Dance Festival, Krishna Gana Sabha, Chennai — Jan 2025"],
  "performances_col3": ["CentreStage Festival, Delhi · Kiran Nadar Museum — Nov 2024","National Folk Festival Kick-Off, Jackson, MS — Nov 2024","NY Kuchipudi Dance Festival — Jul 2024","Ojai World Dance Festival — Apr 2024","Sunny Jain''s \"Dholusion\", Symphony Space — Feb 2023","National Folk Festival, Salisbury, MD — Aug 2019"],
  "quote_text": "Dance is not just performance — it is a living conversation between tradition and the present moment.",
  "quote_image": "/assets/bio-landscape.png"
}'::jsonb)
on conflict (slug) do nothing;

insert into pages (slug, content) values
('media', '{
  "hero_heading": "Photos",
  "hero_paragraph": "Yamini champions the art of Kuchipudi worldwide through her non-profit, Kritya Foundation.",
  "hero_link_label": "KrityaFoundation.org",
  "hero_link_url": "https://krityafoundation.org/",
  "videos_heading": "In Motion",
  "video_embed_url": "https://www.youtube.com/embed/7wNyqjC86Qs",
  "channel_url": "https://www.youtube.com/channel/UCh3we6c2V5zI0Nw6FqqUabA"
}'::jsonb)
on conflict (slug) do nothing;

insert into pages (slug, content) values
('contact', '{
  "hero_heading": "Please contact Yamini for classes, workshops, performances or press inquiries.",
  "eyebrow": "Get in Touch",
  "heading": "Let''s begin a conversation.",
  "paragraph": "Yamini champions the art of Kuchipudi worldwide through her non-profit, Kritya Foundation. As curator of the NY Kuchipudi Dance Festival and through collaborations with the Kritya Ensemble, she preserves this rich tradition while empowering the next generation.",
  "link_label": "KrityaFoundation.org",
  "link_url": "https://krityafoundation.org/",
  "side_image": "/assets/bio-landscape.png",
  "side_image_caption": "Yamini Kalluri, in studio"
}'::jsonb)
on conflict (slug) do nothing;

insert into writings (slug, title, source_name, source_url, image_url, tile_size, sort_order) values
('carrying-the-fire-of-kuchipudi', 'Carrying the fire of Kuchipudi across the world', 'The Hans India', 'https://www.thehansindia.com/featured/women/carrying-the-fire-of-kuchipudi-across-the-world-1000936', '/assets/press-clip.png', 'wide', 1),
('to-master-grace', 'To Master Grace Is Not at All an Easy Task', 'The New York Times', 'https://www.nytimes.com/2016/08/23/arts/dance/to-master-grace-is-not-at-all-an-easy-task-inside-indian-dance.html', '/assets/bio-photo-1.png', 'tall', 2),
('creators-yamini-kalluri', 'Creators: Yamini Kalluri', 'Los Herederos', 'https://www.losherederos.org/creators-yamini-kalluri/', '/assets/bio-landscape.png', 'normal', 3),
('dancing-to-her-own-tunes', 'Dancing to her own tunes', 'Deccan Chronicle', 'https://www.deccanchronicle.com/entertainment/theatre/021217/dancing-to-her-own-tunes.html', '/assets/hero-bg.png', 'tall', 4),
('bbc-radio-interview', 'BBC Radio Interview', 'BBC Radio', 'http://www.bbc.co.uk/programmes/p03v77rn', '/assets/bio-photo-2.png', 'normal', 5),
('global-moves-kuchipudi', 'Global Moves: Learn Indian Kuchipudi', 'Atlas Obscura', 'https://www.atlasobscura.com/experiences/global-moves-learn-indian-kuchipudi-w-yamini-kalluri', '/assets/mono-hero.png', 'wide', 6),
('bklyn-sauce-feature', 'Bklyn Sauce: Yamini Kalluri', 'BKLN Sauce', 'https://www.bkreader.com/bklyn-sauce/bklyn-sauce-yamini-kaluri-6547738', '/assets/press-clip.png', 'normal', 7),
('singing-and-dancing-that-tell-a-story', 'Singing and dancing that tell a story', 'The Lowell Sun', 'https://www.lowellsun.com/2019/07/25/singing-and-dancing-that-tell-a-story/', '/assets/bio-landscape.png', 'normal', 8)
on conflict (slug) do nothing;

insert into gallery_items (type, label, image_url, sort_order) values
('photo','Instagram','/assets/mono-hero.png',1),
('photo','Performance','/assets/hero-bg.png',2),
('photo','Rehearsal','/assets/bio-photo-1.png',3),
('photo','Kritya Ensemble','/assets/bio-photo-2.png',4),
('photo','Costume','/assets/bio-landscape.png',5),
('photo','Stage','/assets/press-clip.png',6),
('photo','Festival','/assets/mono-hero.png',7),
('photo','Ensemble','/assets/hero-bg.png',8),
('photo','Portrait','/assets/bio-photo-1.png',9),
('photo','Touring','/assets/bio-photo-2.png',10),
('photo','Teaching','/assets/bio-landscape.png',11),
('photo','Collaboration','/assets/press-clip.png',12)
on conflict do nothing;
