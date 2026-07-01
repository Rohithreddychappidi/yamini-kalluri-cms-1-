"use client";

export default function Header({ settings, active }) {
  const brand = settings?.brand_name || "Yamini Kalluri";

  const navItems = [
    { href: "/", label: settings?.nav_home || "Home", key: "home" },
    { href: "/the-artist", label: settings?.nav_artist || "The Artist", key: "the-artist" },
    { href: "/work", label: settings?.nav_work || "Work", key: "work" },
    { href: "/writings", label: settings?.nav_writings || "Writings", key: "writings" },
    { href: "/media", label: settings?.nav_media || "Media", key: "media" },
    { href: "/contact", label: settings?.nav_contact || "Contact", key: "contact" },
  ];

  return (
    <header className="site">
      <div className="nav-row">
        <a href="/" className="brand">{brand.toUpperCase()}</a>
        <button
          className="nav-toggle"
          id="navToggle"
          onClick={() => document.getElementById("navList")?.classList.toggle("open")}
        >
          MENU
        </button>
        <nav className="main">
          <ul id="navList">
            {navItems.map((item) => (
              <li key={item.key}>
                <a href={item.href} className={active === item.key ? "active" : ""}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
