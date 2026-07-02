import { getPage } from "@/lib/data";
import PageEditor from "@/components/admin/PageEditor";

export const revalidate = 0;

const fields = [
  { key: "page_bg_image", label: "Page Background — Fixed Image (shown behind all sections, doesn't scroll)", type: "image" },
  { key: "hero_title", label: "Hero Title", type: "text" },
  { key: "hero_role", label: "Hero Role / Subtitle", type: "text" },
  { key: "hero_video", label: "Hero — Background Video (covers the fixed background while in the Hero section)", type: "video" },
  { key: "about_eyebrow", label: "About — Eyebrow Label", type: "text" },
  { key: "about_heading", label: "About — Heading", type: "text" },
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
  { key: "connected_heading", label: "Stay Connected — Heading", type: "text" },
  { key: "connected_tiles", label: "Stay Connected — Tile Labels", type: "list" },
];

export default async function AdminHomePage() {
  const content = await getPage("home");
  return (
    <div>
      <h1 className="admin-h1">Home Page</h1>
      <p className="admin-sub">
        Edit the hero, about, work intro, and Stay Connected sections. The Page Background image
        stays fixed behind the whole page; the Hero video (if set) covers it while the Hero is in view.
      </p>
      <PageEditor slug="home" initialContent={content} fields={fields} />
    </div>
  );
}
