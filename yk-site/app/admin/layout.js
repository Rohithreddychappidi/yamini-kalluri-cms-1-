import "@/components/admin/admin.css";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Admin — Yamini Kalluri" };

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNav />
      <div className="admin-wrap">{children}</div>
    </div>
  );
}
