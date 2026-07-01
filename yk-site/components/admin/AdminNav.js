"use client";

import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/home", label: "Home Page" },
  { href: "/admin/the-artist", label: "The Artist" },
  { href: "/admin/work", label: "Work" },
  { href: "/admin/writings", label: "Writings" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/contact", label: "Contact Page" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="admin-nav">
      {links.map((l) => (
        <a key={l.href} href={l.href}>{l.label}</a>
      ))}
      <button className="logout" onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}>
        Log out
      </button>
    </nav>
  );
}
