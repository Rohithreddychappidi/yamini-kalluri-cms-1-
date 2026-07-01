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
  { key: "video_embed_url", label: "Video Embed URL (YouTube embed link)", type: "text" },
  { key: "channel_url", label: "YouTube Channel URL", type: "text" },
];

export default async function AdminMediaPage() {
  const [content, gallery] = await Promise.all([getPage("media"), getGalleryItems()]);
  return (
    <div>
      <h1 className="admin-h1">Media Page</h1>
      <p className="admin-sub">Edit the hero text, video embed, and the photo gallery tiles below.</p>
      <PageEditor slug="media" initialContent={content} fields={fields} />
      <h2 style={{ marginTop: "2.5rem" }}>Photo Gallery Tiles</h2>
      <GalleryManager initialItems={gallery} />
    </div>
  );
}
