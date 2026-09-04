"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";

// field types: "text" | "textarea" | "image" | "image_list" (unlimited images) | "video" | "list" (newline-separated strings) | "url_list" (newline- or comma-separated links) | "json" (advanced array/object editor)
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
            {f.type === "url_list" && (
              <>
                <p style={{ fontSize: "0.78rem", color: "#777", margin: "0 0 0.3rem" }}>
                  One link per line (commas also work)
                </p>
                <textarea
                  value={(content[f.key] || []).join("\n")}
                  onChange={(e) =>
                    update(
                      f.key,
                      e.target.value
                        .split(/[\n,]+/)
                        .map((l) => l.trim())
                        .filter((l) => l !== "")
                    )
                  }
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
            {f.type === "image_list" && (
              <div>
                {(content[f.key] || []).length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
                      gap: "0.8rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    {(content[f.key] || []).map((url, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <img
                          src={url}
                          alt=""
                          style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 4, display: "block" }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...(content[f.key] || [])];
                            next.splice(i, 1);
                            update(f.key, next);
                          }}
                          title="Remove this image"
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            background: "#c0392b",
                            color: "#fff",
                            border: 0,
                            borderRadius: "50%",
                            width: 22,
                            height: 22,
                            cursor: "pointer",
                            fontSize: 12,
                            lineHeight: "22px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <ImageUploader
                  value={null}
                  onChange={(url) => url && update(f.key, [...(content[f.key] || []), url])}
                />
                <p style={{ fontSize: "0.78rem", color: "#777", margin: "0.3rem 0 0" }}>
                  Upload above to add another image — there's no limit.
                </p>
              </div>
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
