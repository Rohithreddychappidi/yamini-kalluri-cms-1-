import { getPage } from "@/lib/data";
import PageEditor from "@/components/admin/PageEditor";

export const revalidate = 0;

const fields = [
  { key: "page_bg_image", label: "Page Background — Fixed Image (shown behind all sections, doesn't scroll)", type: "image" },
  {
    key: "hero_image",
    label: "Hero — Banner Image, Desktop (recommended 1920×1080px or larger, landscape — this image is cropped/zoomed to fill the screen, so keep the subject centered)",
    type: "image",
  },
  {
    key: "hero_image_mobile",
    label: "Hero — Banner Image, Mobile (recommended 1200×675px, 16:9 landscape — this image is shown in full with no cropping, so this exact ratio avoids empty bars above/below. Leave blank to reuse the Desktop image.)",
    type: "image",
  },
  { key: "hero_title", label: "Hero Title", type: "text" },
  { key: "hero_role", label: "Hero Role / Subtitle", type: "text" },
  { key: "hero_text_color", label: "Hero Text Color (pick a color that reads well against your Hero Banner Image; leave blank for the default)", type: "color" },
  { key: "hero_video", label: "Hero — Background Video (optional; if set, plays on top of the Hero Banner Image while the Hero is in view)", type: "video" },
  { key: "about_eyebrow", label: "About — Eyebrow Label", type: "text" },
  { key: "about_heading", label: "About — Heading", type: "text" },
  { key: "about_text_color", label: "About Section Text Color (pick a color that reads well against your Page Background image; leave blank for the default dark text)", type: "color" },
  { key: "about_image", label: "About — Image", type: "image" },
  { key: "about_image_caption", label: "About — Image Caption", type: "text" },
  { key: "about_paragraph_1", label: "About — Paragraph 1", type: "textarea" },
  { key: "about_paragraph_2", label: "About — Paragraph 2", type: "textarea" },
  { key: "work_eyebrow", label: "Work Section — Eyebrow Label", type: "text" },
  { key: "work_heading", label: "Work Section — Heading", type: "text" },
  { key: "work_image", label: "Work Section — Image", type: "image" },
  { key: "work_image_caption", label: "Work Section — Image Caption", type: "text" },
  { key: "work_paragraph_1", label: "Work Section — Paragraph 1", type: "textarea" },
  { key: "work_paragraph_2", label: "Work Section — Paragraph 2", type: "textarea" },
];

export default async function AdminHomePage() {
  const content = await getPage("home");
  return (
    <div>
      <h1 className="admin-h1">Home Page</h1>
      <p className="admin-sub">
        Edit the hero, about, work intro, and Stay Connected sections. There are separate Hero
        Banner Image uploads for Desktop and Mobile (see recommended sizes below each field) so the
        banner looks right on both. The Page Background image stays fixed behind the rest of the
        page as you scroll past the hero. If a Hero video is set, it plays on top of the Hero
        Banner Image only while the Hero is in view.
      </p>
      <PageEditor slug="home" initialContent={content} fields={fields} />
    </div>
  );
}
