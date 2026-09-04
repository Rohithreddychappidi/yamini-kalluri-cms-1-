"use client";

import { getNavItems, getNavColor } from "@/lib/nav";

export default function Header({ settings, active }) {
  const brand = settings?.brand_name || "Likhitha Gopi";
  const navItems = getNavItems(settings);
  const navColor = getNavColor(active, settings);

  return (
    <header className="site" style={{ "--nav-color": navColor }}>
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
