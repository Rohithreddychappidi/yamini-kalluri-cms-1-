import { getPage } from "@/lib/data";
import PageEditor from "@/components/admin/PageEditor";
import GalleryManager from "@/components/admin/GalleryManager";
import { getGalleryItems } from "@/lib/data";

export const revalidate = 0;

const fields = [
  { key: "hero_heading", label: "Hero Heading", type: "text" },
  { key: "hero_paragraph", label: "Hero Paragraph", type: "textarea" },
  { key: "hero_link_label", label: "Hero Link Label", type: "text" },
  { key: "hero_link_url", label: "Hero Link URL", type: "text" },
  { key: "videos_heading", label: "Videos — Heading", type: "text" },
  {
    key: "videos",
    label: "Videos (one YouTube link per line — watch, share, or embed link, any format. Add as many as you like. Leave empty to hide the Videos section entirely.)",
    type: "list",
  },
  { key: "channel_url", label: "YouTube Channel URL", type: "text" },
];

export default async function AdminMediaPage() {
  const [content, gallery] = await Promise.all([getPage("media"), getGalleryItems()]);
  return (
    <div>
      <h1 className="admin-h1">Media Page</h1>
      <p className="admin-sub">
        Edit the hero text, videos, and the photo gallery tiles below. You can paste any regular
        YouTube link into the Videos field — one per line, converted automatically — and add as
        many as you like. If the Videos field is empty, that whole section is hidden from the page.
      </p>
      <PageEditor slug="media" initialContent={content} fields={fields} />
      <h2 style={{ marginTop: "2.5rem" }}>Photo Gallery Tiles</h2>
      <GalleryManager initialItems={gallery} />
    </div>
  );
}
