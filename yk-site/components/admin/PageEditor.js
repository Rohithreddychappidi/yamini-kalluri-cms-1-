"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";

// field types: "text" | "textarea" | "color" | "image" | "image_list" (unlimited images) | "image_caption_list" (unlimited images with optional captions) | "video" | "list" (newline-separated strings) | "url_list" (newline- or comma-separated links) | "json" (advanced array/object editor)
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
            {f.type === "color" && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <input
                  type="color"
                  value={content[f.key] || "#ffffff"}
                  onChange={(e) => update(f.key, e.target.value)}
                  style={{ width: 44, height: 34, padding: 2, border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  value={content[f.key] || ""}
                  placeholder="Leave blank for the default color"
                  onChange={(e) => update(f.key, e.target.value)}
                  style={{ maxWidth: 200 }}
                />
                {content[f.key] && (
                  <button type="button" onClick={() => update(f.key, "")} style={{ fontSize: "0.78rem" }}>
                    Clear
                  </button>
                )}
              </div>
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
            {f.type === "image_caption_list" && (
              <div>
                {(content[f.key] || []).length > 0 && (
                  <div style={{ display: "grid", gap: "0.6rem", marginBottom: "0.8rem" }}>
                    {(content[f.key] || []).map((item, i) => {
                      const url = typeof item === "string" ? item : item.url;
                      const caption = typeof item === "string" ? "" : item.caption || "";
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: "0.6rem",
                            alignItems: "center",
                            border: "1px solid #e2e2e2",
                            borderRadius: 6,
                            padding: "0.5rem",
                          }}
                        >
                          <img
                            src={url}
                            alt=""
                            style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
                          />
                          <input
                            type="text"
                            placeholder="Caption (optional, small tag under the photo)"
                            value={caption}
                            onChange={(e) => {
                              const next = [...(content[f.key] || [])];
                              next[i] = { url, caption: e.target.value };
                              update(f.key, next);
                            }}
                            style={{ flex: 1 }}
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
                              background: "#c0392b",
                              color: "#fff",
                              border: 0,
                              borderRadius: "50%",
                              width: 26,
                              height: 26,
                              cursor: "pointer",
                              fontSize: 13,
                              flexShrink: 0,
                            }}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <ImageUploader
                  value={null}
                  onChange={(url) => url && update(f.key, [...(content[f.key] || []), { url, caption: "" }])}
                />
                <p style={{ fontSize: "0.78rem", color: "#777", margin: "0.3rem 0 0" }}>
                  Upload above to add another photo, then type an optional caption for it. No limit.
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
