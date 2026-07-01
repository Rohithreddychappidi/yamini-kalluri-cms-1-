import { createClient } from "@/utils/supabase/server";
import WritingsListClient from "./WritingsListClient";

export const revalidate = 0;

export default async function AdminWritingsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("writings").select("*").order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="admin-h1">Writings</h1>
      <p className="admin-sub">
        These are the items shown on the Writings page (formerly "Press"). Each one links to its own sub-page.
      </p>
      <a href="/admin/writings/new" className="admin-add-btn">+ Add Writing</a>
      <WritingsListClient initialItems={data || []} />
    </div>
  );
}
