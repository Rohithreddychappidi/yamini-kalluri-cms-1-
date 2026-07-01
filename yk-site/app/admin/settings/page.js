import { getSiteSettings } from "@/lib/data";
import SettingsForm from "@/components/admin/SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <h1 className="admin-h1">Site Settings</h1>
      <p className="admin-sub">Brand name, navigation labels, footer text, email and social links — used across every page.</p>
      <SettingsForm initial={settings} />
    </div>
  );
}
