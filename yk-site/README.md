# Yamini Kalluri — Next.js + Supabase + Cloudinary CMS

Your static site, rebuilt as an editable CMS. Same design, same fonts — everything is now
admin-editable and deploys on Vercel.

## What changed from the static version
- "Press" → **Writings**. Each writing/press item now has its own sub-page at `/writings/your-slug`.
  Clicking the image or the source name on the Writings page goes to that sub-page.
- "Biography" → **The Artist**.
- Every page's text, images, footer, nav labels, and social links are editable from `/admin`.

## 1) Create the Supabase project
1. Go to supabase.com → New Project.
2. Open **SQL Editor** → New query → paste the contents of `supabase/schema.sql` → Run.
   This creates all tables, security rules, and seeds them with your current content so the
   site looks identical to the static version on first deploy.
3. Go to **Authentication → Users** → Add user → create yourself an admin login (email + password).
   This is the only login the admin panel accepts — there's no public signup.
4. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2) Create the Cloudinary upload preset
1. Go to cloudinary.com → your dashboard, copy the **Cloud name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
2. Settings → Upload → Upload presets → Add upload preset.
   - Signing Mode: **Unsigned** (this lets the admin panel upload images directly from the browser
     without exposing your API secret).
   - Save, then copy the preset name → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

## 3) Local setup
```
cp .env.local.example .env.local
# fill in the 4 values above
npm install
npm run dev
```
Visit http://localhost:3000 for the public site, http://localhost:3000/admin for the CMS.

## 4) Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Vercel → New Project → import the repo.
3. Add the same 4 environment variables under Project → Settings → Environment Variables.
4. Deploy.

## Using the admin panel (`/admin`)
- **Home / The Artist / Work / Media / Contact** — each has a form for every heading, paragraph,
  link and image on that page. Images can be uploaded directly (goes to Cloudinary) or pasted as a URL.
- **Writings** — add, edit, delete, reorder, publish/unpublish entries. Each one becomes its own
  page at `/writings/<slug>`, with a cover image, excerpt, optional full body text, and a link
  back to the original source.
- **Site Settings** — brand name, the 6 nav labels (already set to Home / The Artist / Work /
  Writings / Media / Contact), footer tagline, email, and social links — shared across every page.
- The contact form on the public site saves submissions into the `contact_submissions` table
  in Supabase (view them in the Supabase Table Editor).

## Notes
- Design and fonts are untouched — `app/globals.css` is your original `style.css`, only the two
  image references inside it were repointed to `/assets/...` (now served from `/public/assets`).
- Pages render with `revalidate = 0`, so admin edits show up immediately, no rebuild needed.
- The "advanced JSON" fields on the Work page editor (Work Experience) are the few list items that
  have multiple parts (year / role / location) — edit them as a JSON array of
  `{ "yr": "...", "ev": "...", "loc": "..." }` objects.
