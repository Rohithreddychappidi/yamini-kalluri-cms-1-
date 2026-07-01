"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function WritingForm({ mode, initial }) {
  const router = useRouter();
  const [form, setForm] = useState(
    initial || {
      title: "",
      slug: "",
      source_name: "",
      source_url: "",
      image_url: "",
      excerpt: "",
      body: "",
      tile_size: "normal",
      published: true,
      sort_order: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function update(key, value) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && mode === "new" && !f._slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const supabase = createClient();
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      source_name: form.source_name,
      source_url: form.source_url,
      image_url: form.image_url,
      excerpt: form.excerpt,
      body: form.body,
      tile_size: form.tile_size,
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (mode === "new") {
      ({ error } = await supabase.from("writings").insert(payload));
    } else {
      ({ error } = await supabase.from("writings").update(payload).eq("id", initial.id));
    }

    setSaving(false);
    if (error) {
      setMsg({ type: "err", text: error.message });
    } else {
      router.push("/admin/writings");
      router.refresh();
    }
  }

  return (
    <div>
      <div className="admin-card">
        <div className="admin-field">
          <label>Title</label>
          <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>URL slug (yoursite.com/writings/...)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => {
              setForm((f) => ({ ...f, _slugTouched: true }));
              update("slug", slugify(e.target.value));
            }}
          />
        </div>
        <div className="admin-field">
          <label>Source name (e.g. The New York Times)</label>
          <input type="text" value={form.source_name || ""} onChange={(e) => update("source_name", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Source URL (original article link)</label>
          <input type="text" value={form.source_url || ""} onChange={(e) => update("source_url", e.target.value)} />
        </div>
        <ImageUploader label="Cover Image" value={form.image_url} onChange={(url) => update("image_url", url)} />
        <div className="admin-field">
          <label>Excerpt (short summary shown at top of article)</label>
          <textarea value={form.excerpt || ""} onChange={(e) => update("excerpt", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Body (optional full text)</label>
          <textarea style={{ minHeight: 160 }} value={form.body || ""} onChange={(e) => update("body", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Tile size on Writings page</label>
          <select value={form.tile_size} onChange={(e) => update("tile_size", e.target.value)}>
            <option value="normal">Normal</option>
            <option value="wide">Wide</option>
            <option value="tall">Tall</option>
          </select>
        </div>
        <div className="admin-field">
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Published (visible on site)
          </label>
        </div>
        <div className="admin-field">
          <label>Sort order (lower shows first)</label>
          <input type="text" value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
        </div>
      </div>

      <button className="admin-save" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : mode === "new" ? "Create Writing" : "Save Changes"}
      </button>
      {msg && <p className={`admin-msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</p>}
    </div>
  );
}
