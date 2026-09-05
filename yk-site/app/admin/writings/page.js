import { createClient } from "@/utils/supabase/server";
import PageEditor from "@/components/admin/PageEditor";
import { getPage } from "@/lib/data";
import WritingsListClient from "./WritingsListClient";

export const revalidate = 0;

const introFields = [
  { key: "work_heading", label: "Work Section — Heading", type: "text" },
  { key: "work_paragraph", label: "Work Section — Paragraph", type: "textarea" },
  { key: "work_bullets", label: "Work Section — Highlights (optional bullet points, one per line)", type: "list" },
  { key: "work_image", label: "Work Section — Image", type: "image" },
];

export default async function AdminWritingsPage() {
  const supabase = createClient();
  const [{ data }, introContent] = await Promise.all([
    supabase.from("writings").select("*").order("sort_order", { ascending: true }),
    getPage("writings"),
  ]);

  return (
    <div>
      <h1 className="admin-h1">Writings</h1>
      <p className="admin-sub">
        A "Work" intro section shows at the top of the Writings page, above the article grid —
        edit it below. Use either a paragraph, bullet points, or both; leave everything blank to
        hide the section.
      </p>
      <PageEditor slug="writings" initialContent={introContent} fields={introFields} />

      <h2 style={{ marginTop: "2.5rem" }}>Writings / Press Items</h2>
      <p className="admin-sub">
        These are the items shown further down the Writings page (formerly "Press"). Each one links to its own sub-page.
      </p>
      <a href="/admin/writings/new" className="admin-add-btn">+ Add Writing</a>
      <WritingsListClient initialItems={data || []} />
    </div>
  );
}
