"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";

// field types: "text" | "textarea" | "image" | "video" | "list" (newline-separated strings) | "json" (advanced array/object editor)
export default function PageEditor({ slug, initialContent, fields }) {
  const [content, setContent] = useState(initialContent || {});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function update(key, value) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("pages")
      .upsert({ slug, content, updated_at: new Date().toISOString() }, { onConflict: "slug" });
    setSaving(false);
    setMsg(error ? { type: "err", text: error.message } : { type: "ok", text: "Saved." });
  }

  return (
    <div>
      {fields.map((f) => (
        <div className="admin-card" key={f.key}>
          <div className="admin-field" style={{ marginBottom: 0 }}>
            <label>{f.label}</label>
            {f.type === "text" && (
              <input
                type="text"
                value={content[f.key] || ""}
                onChange={(e) => update(f.key, e.target.value)}
              />
            )}
            {f.type === "textarea" && (
              <textarea
                value={content[f.key] || ""}
                onChange={(e) => update(f.key, e.target.value)}
              />
            )}
            {f.type === "list" && (
              <>
                <p style={{ fontSize: "0.78rem", color: "#777", margin: "0 0 0.3rem" }}>One item per line</p>
                <textarea
                  value={(content[f.key] || []).join("\n")}
                  onChange={(e) => update(f.key, e.target.value.split("\n").filter((l) => l.trim() !== ""))}
                />
              </>
            )}
            {f.type === "json" && (
              <>
                <p style={{ fontSize: "0.78rem", color: "#777", margin: "0 0 0.3rem" }}>
                  Advanced: edit as JSON array of objects
                </p>
                <textarea
                  style={{ minHeight: 160, fontFamily: "monospace", fontSize: "0.8rem" }}
                  defaultValue={JSON.stringify(content[f.key] || [], null, 2)}
                  onBlur={(e) => {
                    try {
                      update(f.key, JSON.parse(e.target.value));
                    } catch {
                      // ignore invalid JSON until corrected
                    }
                  }}
                />
              </>
            )}
            {f.type === "image" && (
              <ImageUploader value={content[f.key]} onChange={(url) => update(f.key, url)} />
            )}
            {f.type === "video" && (
              <VideoUploader value={content[f.key]} onChange={(url) => update(f.key, url)} />
            )}
          </div>
        </div>
      ))}

      <button className="admin-save" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save Changes"}
      </button>
      {msg && <p className={`admin-msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</p>}
    </div>
  );
}
