export default function AdminDashboard() {
  const links = [
    { href: "/admin/home", label: "Home Page", desc: "Hero, About, Work intro, Stay Connected tiles" },
    { href: "/admin/the-artist", label: "The Artist", desc: "Hero text, bio paragraphs, photos" },
    { href: "/admin/work", label: "Work", desc: "Education, experience, performances, awards" },
    { href: "/admin/writings", label: "Writings", desc: "Add/edit/delete writing & press sub-pages" },
    { href: "/admin/media", label: "Media", desc: "Photo gallery tiles & video embed" },
    { href: "/admin/contact", label: "Contact Page", desc: "Hero text, intro, side image" },
    { href: "/admin/settings", label: "Site Settings", desc: "Brand name, nav labels, footer, social links" },
  ];

  return (
    <div>
      <h1 className="admin-h1">Admin Panel</h1>
      <p className="admin-sub">Edit any page, image, or piece of text on the site. Changes go live immediately.</p>
      {links.map((l) => (
        <a key={l.href} href={l.href} className="admin-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          <strong>{l.label}</strong>
          <p style={{ margin: "0.3rem 0 0", fontSize: "0.88rem", color: "#666" }}>{l.desc}</p>
        </a>
      ))}
    </div>
  );
}
