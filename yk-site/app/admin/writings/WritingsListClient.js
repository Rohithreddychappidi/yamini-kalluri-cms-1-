"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function WritingsListClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);

  async function handleDelete(id) {
    if (!confirm("Delete this writing? This cannot be undone.")) return;
    const supabase = createClient();
    await supabase.from("writings").delete().eq("id", id);
    setItems(items.filter((it) => it.id !== id));
  }

  return (
    <div>
      {items.map((w) => (
        <div className="admin-list-row" key={w.id}>
          {w.image_url && <img src={w.image_url} alt="" />}
          <div className="grow">
            <strong>{w.title}</strong>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.82rem", color: "#777" }}>
              {w.source_name} · /writings/{w.slug} · {w.published ? "Published" : "Hidden"}
            </p>
          </div>
          <a className="edit" href={`/admin/writings/${w.id}`}>Edit</a>
          <button className="del" onClick={() => handleDelete(w.id)}>Delete</button>
        </div>
      ))}
      {items.length === 0 && <p>No writings yet. Click "+ Add Writing" to create one.</p>}
    </div>
  );
}
