"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const fields = [
  { key: "brand_name", label: "Brand Name (shown top-left & footer)" },
  { key: "nav_home", label: "Nav Label — Home" },
  { key: "nav_artist", label: "Nav Label — The Artist" },
  { key: "nav_writings", label: "Nav Label — Writings" },
  { key: "nav_media", label: "Nav Label — Media" },
  { key: "nav_work", label: "Nav Label — Work" },
  { key: "nav_contact", label: "Nav Label — Contact" },
  {
    key: "nav_order",
    label: "Navigation Order (one per line, use exactly: home, the-artist, writings, media, work, contact)",
    list: true,
  },
  { key: "nav_color_home", label: "Nav Text Color — Home page", color: true },
  { key: "nav_color_the_artist", label: "Nav Text Color — The Artist page", color: true },
  { key: "nav_color_writings", label: "Nav Text Color — Writings page", color: true },
  { key: "nav_color_media", label: "Nav Text Color — Media page", color: true },
  { key: "nav_color_work", label: "Nav Text Color — Work page", color: true },
  { key: "nav_color_contact", label: "Nav Text Color — Contact page", color: true },
  { key: "footer_tagline", label: "Footer Tagline", textarea: true },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "facebook_url", label: "Facebook URL" },
  { key: "instagram_url", label: "Instagram URL" },
  { key: "youtube_url", label: "YouTube URL" },
  { key: "copyright_text", label: "Copyright Text" },
];

export default function SettingsForm({ initial }) {
  const [form, setForm] = useState(initial || {});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...form, updated_at: new Date().toISOString() });
    setSaving(false);
    setMsg(error ? { type: "err", text: error.message } : { type: "ok", text: "Saved." });
  }

  return (
    <div>
      <div className="admin-card">
        {fields.map((f) => (
          <div className="admin-field" key={f.key}>
            <label>{f.label}</label>
            {f.textarea ? (
              <textarea value={form[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} />
            ) : f.list ? (
              <>
                <p style={{ fontSize: "0.78rem", color: "#777", margin: "0 0 0.3rem" }}>One item per line</p>
                <textarea
                  value={(form[f.key] || []).join("\n")}
                  onChange={(e) => update(f.key, e.target.value.split("\n").filter((l) => l.trim() !== ""))}
                />
              </>
            ) : f.color ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <input
                  type="color"
                  value={form[f.key] || "#403D39"}
                  onChange={(e) => update(f.key, e.target.value)}
                  style={{ width: 44, height: 34, padding: 2, border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  value={form[f.key] || ""}
                  placeholder="#403D39"
                  onChange={(e) => update(f.key, e.target.value)}
                  style={{ maxWidth: 140 }}
                />
              </div>
            ) : (
              <input type="text" value={form[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} />
            )}
          </div>
        ))}
      </div>
      <button className="admin-save" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save Settings"}
      </button>
      {msg && <p className={`admin-msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</p>}
    </div>
  );
}
