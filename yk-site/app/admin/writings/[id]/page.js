import { createClient } from "@/utils/supabase/server";
import WritingForm from "@/components/admin/WritingForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditWritingPage({ params }) {
  const supabase = createClient();
  const { data } = await supabase.from("writings").select("*").eq("id", params.id).single();
  if (!data) notFound();

  return (
    <div>
      <h1 className="admin-h1">Edit Writing</h1>
      <p className="admin-sub">/writings/{data.slug}</p>
      <WritingForm mode="edit" initial={data} />
    </div>
  );
}
