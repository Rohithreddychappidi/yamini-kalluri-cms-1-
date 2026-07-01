import { getPage } from "@/lib/data";
import PageEditor from "@/components/admin/PageEditor";

export const revalidate = 0;

const fields = [
  { key: "hero_image", label: "Hero Background Image", type: "image" },
  { key: "hero_heading", label: "Hero Heading", type: "text" },
  { key: "hero_paragraph", label: "Hero Paragraph", type: "textarea" },
  { key: "hero_link_label", label: "Hero Link Label", type: "text" },
  { key: "hero_link_url", label: "Hero Link URL", type: "text" },
  { key: "row_image_1", label: "Image Row — Image 1", type: "image" },
  { key: "row_image_2", label: "Image Row — Image 2", type: "image" },
  { key: "row_image_3", label: "Image Row — Image 3", type: "image" },
  { key: "education_title", label: "Education — Title", type: "text" },
  { key: "education_detail", label: "Education — Detail", type: "text" },
  { key: "certificates_title", label: "Certificates — Title", type: "text" },
  { key: "certificates_detail", label: "Certificates — Detail", type: "textarea" },
  { key: "experience", label: "Work Experience (advanced JSON: yr, ev, loc)", type: "json" },
  { key: "performances_col1", label: "Performances — Column 1", type: "list" },
  { key: "performances_col2", label: "Performances — Column 2", type: "list" },
  { key: "performances_col3", label: "Performances — Column 3", type: "list" },
  { key: "quote_text", label: "Closing Quote — Text", type: "textarea" },
  { key: "quote_image", label: "Closing Quote — Image", type: "image" },
];

export default async function AdminWorkPage() {
  const content = await getPage("work");
  return (
    <div>
      <h1 className="admin-h1">Work Page</h1>
      <p className="admin-sub">Edit education, experience, performances, collaborations and awards.</p>
      <PageEditor slug="work" initialContent={content} fields={fields} />
    </div>
  );
}
