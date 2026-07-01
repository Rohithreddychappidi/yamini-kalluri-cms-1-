"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function ImageUploader({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", fontWeight: 600 }}>{label}</label>}
      {value && (
        <img
          src={value}
          alt=""
          style={{ width: "100%", maxWidth: 240, height: 150, objectFit: "cover", borderRadius: 6, marginBottom: "0.5rem", display: "block" }}
        />
      )}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
      {uploading && <span style={{ marginLeft: 8, fontSize: "0.85rem" }}>Uploading…</span>}
      {error && <p style={{ color: "crimson", fontSize: "0.85rem" }}>{error}</p>}
      <input
        type="text"
        placeholder="or paste an image URL"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", marginTop: "0.4rem", padding: "0.4rem", fontSize: "0.85rem" }}
      />
    </div>
  );
}
