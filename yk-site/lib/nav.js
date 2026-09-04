// Single source of truth for the site's top navigation: which pages exist,
// their default label / order / nav-bar text color, and how to read any of
// that back out of Admin → Settings once the client customizes it.
//
// Default order: Home, The Artist, Writings, Media, Work, Contact.
// Default colors: white text on Home / The Artist / Media (dark hero art
// behind the header on those pages), dark text everywhere else.

export const NAV_KEYS = ["home", "the-artist", "writings", "media", "work", "contact"];

const DEFAULTS = {
  home: { href: "/", label: "Home", color: "#ffffff" },
  "the-artist": { href: "/the-artist", label: "The Artist", color: "#ffffff" },
  writings: { href: "/writings", label: "Writings", color: "#403D39" },
  media: { href: "/media", label: "Media", color: "#ffffff" },
  work: { href: "/work", label: "Work", color: "#403D39" },
  contact: { href: "/contact", label: "Contact", color: "#403D39" },
};

const LABEL_SETTINGS_KEY = {
  home: "nav_home",
  "the-artist": "nav_artist",
  writings: "nav_writings",
  media: "nav_media",
  work: "nav_work",
  contact: "nav_contact",
};

function colorSettingsKey(key) {
  return `nav_color_${key.replace(/-/g, "_")}`;
}

export function getNavOrder(settings) {
  let custom = settings?.nav_order;
  // Defensive: if an older save (before the Settings form accepted commas)
  // stored this as one comma/newline string instead of a real array, parse
  // it the same forgiving way so a stale save doesn't silently break the nav.
  if (typeof custom === "string") {
    custom = custom.split(/[\n,]+/);
  }
  if (Array.isArray(custom) && custom.length) {
    const valid = custom.map((k) => String(k).trim()).filter((k) => NAV_KEYS.includes(k));
    // If the admin's custom order is missing a page, tack it on at the end
    // rather than letting that page silently disappear from the nav.
    const missing = NAV_KEYS.filter((k) => !valid.includes(k));
    return [...valid, ...missing];
  }
  return NAV_KEYS;
}

export function getNavItems(settings) {
  return getNavOrder(settings).map((key) => ({
    key,
    href: DEFAULTS[key].href,
    label: settings?.[LABEL_SETTINGS_KEY[key]] || DEFAULTS[key].label,
  }));
}

export function getNavColor(activeKey, settings) {
  const key = DEFAULTS[activeKey] ? activeKey : "contact";
  return settings?.[colorSettingsKey(key)] || DEFAULTS[key].color;
}
