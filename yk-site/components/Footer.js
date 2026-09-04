import { getNavItems } from "@/lib/nav";

export default function Footer({ settings }) {
  const brand = settings?.brand_name || "Yamini Kalluri";

  const navItems = getNavItems(settings);

  return (
    <footer className="site">
      <div className="wrap">
        <div className="f-top">
          <div>
            <div className="f-brand">{brand}</div>
            <p className="f-tag">{settings?.footer_tagline}</p>
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="f-social">
            {settings?.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noopener">Facebook</a>
            )}
            {settings?.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener">Instagram</a>
            )}
            {settings?.youtube_url && (
              <a href={settings.youtube_url} target="_blank" rel="noopener">YouTube</a>
            )}
          </div>
        </div>
        <div className="f-bottom">
          <span>Email — {settings?.email}{settings?.phone ? ` · Phone — ${settings.phone}` : ""}</span>
          <span>{settings?.copyright_text}</span>
        </div>
      </div>
    </footer>
  );
}
