"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ImageUploader from "./ImageUploader";

export default function GalleryManager({ initialItems }) {
  const [items, setItems] = useState(initialItems || []);
  const [msg, setMsg] = useState(null);

  async function addItem() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .insert({ type: "photo", label: "New", sort_order: items.length + 1 })
      .select()
      .single();
    if (!error) setItems([...items, data]);
  }

  function updateLocal(id, key, value) {
    setItems(items.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
  }

  async function saveItem(item) {
    const supabase = createClient();
    const { error } = await supabase
      .from("gallery_items")
      .update({ label: item.label, image_url: item.image_url, sort_order: item.sort_order })
      .eq("id", item.id);
    setMsg(error ? { type: "err", text: error.message } : { type: "ok", text: "Saved." });
  }

  async function deleteItem(id) {
    if (!confirm("Delete this tile?")) return;
    const supabase = createClient();
    await supabase.from("gallery_items").delete().eq("id", id);
    setItems(items.filter((it) => it.id !== id));
  }

  return (
    <div>
      <button className="admin-add-btn" onClick={addItem} style={{ border: "none", cursor: "pointer" }}>
        + Add Photo Tile
      </button>
      {items.map((item) => (
        <div className="admin-card" key={item.id}>
          <div className="admin-field">
            <label>Label</label>
            <input
              type="text"
              value={item.label || ""}
              onChange={(e) => updateLocal(item.id, "label", e.target.value)}
            />
          </div>
          <ImageUploader
            label="Image"
            value={item.image_url}
            onChange={(url) => updateLocal(item.id, "image_url", url)}
          />
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button className="admin-save" onClick={() => saveItem(item)}>Save Tile</button>
            <button className="del" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
      {msg && <p className={`admin-msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</p>}
    </div>
  );
}
