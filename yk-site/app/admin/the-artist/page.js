import { getPage } from "@/lib/data";
import PageEditor from "@/components/admin/PageEditor";

export const revalidate = 0;

const fields = [
  { key: "hero_image", label: "Hero Background Image", type: "image" },
  { key: "hero_heading", label: "Hero Heading", type: "text" },
  { key: "hero_paragraph", label: "Hero Paragraph", type: "textarea" },
  { key: "about_eyebrow", label: "About — Eyebrow Label", type: "text" },
  { key: "about_heading", label: "About — Heading", type: "text" },
  { key: "about_paragraph_1", label: "About — Paragraph 1", type: "textarea" },
  { key: "about_paragraph_2", label: "About — Paragraph 2", type: "textarea" },
  { key: "about_paragraph_3", label: "About — Paragraph 3", type: "textarea" },
  { key: "about_paragraph_4", label: "About — Paragraph 4", type: "textarea" },
  { key: "photo_1", label: "Photo 1", type: "image" },
  { key: "photo_2", label: "Photo 2", type: "image" },
  { key: "inside_heading", label: "Inside The Artist — Section Heading", type: "text" },
  { key: "awards_heading", label: "Awards Column — Heading", type: "text" },
  { key: "awards", label: "Awards & Achievements", type: "list" },
  { key: "testimonials_heading", label: "Testimonials Column — Heading", type: "text" },
  { key: "testimonials", label: "Testimonials (advanced JSON: quote, author)", type: "json" },
  { key: "landscape_photo", label: "Landscape Photo (bottom)", type: "image" },
];

export default async function AdminTheArtistPage() {
  const content = await getPage("the-artist");
  return (
    <div>
      <h1 className="admin-h1">The Artist Page</h1>
      <p className="admin-sub">Edit the bio hero, copy, and photos.</p>
      <PageEditor slug="the-artist" initialContent={content} fields={fields} />
    </div>
  );
}
