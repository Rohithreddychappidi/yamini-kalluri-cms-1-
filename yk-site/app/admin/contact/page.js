import { getPage } from "@/lib/data";
import PageEditor from "@/components/admin/PageEditor";

export const revalidate = 0;

const fields = [
  { key: "hero_heading", label: "Hero Heading", type: "textarea" },
  { key: "eyebrow", label: "Eyebrow Label", type: "text" },
  { key: "heading", label: "Heading", type: "text" },
  { key: "paragraph", label: "Paragraph", type: "textarea" },
  { key: "link_label", label: "Link Label", type: "text" },
  { key: "link_url", label: "Link URL", type: "text" },
  { key: "side_image", label: "Side Image", type: "image" },
  { key: "side_image_caption", label: "Side Image Caption", type: "text" },
];

export default async function AdminContactPage() {
  const content = await getPage("contact");
  return (
    <div>
      <h1 className="admin-h1">Contact Page</h1>
      <p className="admin-sub">Edit the contact page hero, intro copy and side image. Email & socials live in Site Settings.</p>
      <PageEditor slug="contact" initialContent={content} fields={fields} />
    </div>
  );
}
