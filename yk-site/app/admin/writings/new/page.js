import WritingForm from "@/components/admin/WritingForm";

export default function NewWritingPage() {
  return (
    <div>
      <h1 className="admin-h1">Add Writing</h1>
      <p className="admin-sub">Creates a new entry on the Writings page with its own sub-page.</p>
      <WritingForm mode="new" />
    </div>
  );
}
