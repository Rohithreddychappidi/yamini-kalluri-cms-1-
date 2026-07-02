"use client";

import { useState } from "react";
import { uploadVideoToCloudinary } from "@/lib/cloudinary";

export default function VideoUploader({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadVideoToCloudinary(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", fontWeight: 600 }}>
          {label}
        </label>
      )}
      {value && (
        <video
          src={value}
          muted
          loop
          playsInline
          controls
          style={{ width: "100%", maxWidth: 320, height: 180, objectFit: "cover", borderRadius: 6, marginBottom: "0.5rem", display: "block", background: "#000" }}
        />
      )}
      <input type="file" accept="video/*" onChange={handleFile} disabled={uploading} />
      {uploading && <span style={{ marginLeft: 8, fontSize: "0.85rem" }}>Uploading…</span>}
      {error && <p style={{ color: "crimson", fontSize: "0.85rem" }}>{error}</p>}
      <input
        type="text"
        placeholder="or paste a video URL"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", marginTop: "0.4rem", padding: "0.4rem", fontSize: "0.85rem" }}
      />
      <p style={{ fontSize: "0.78rem", color: "#777", margin: "0.3rem 0 0" }}>
        Leave empty to fall back to the static background image on the Hero.
      </p>
    </div>
  );
}
