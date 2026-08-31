// Turns whatever YouTube link someone pastes (watch page, share link,
// youtu.be short link, Shorts link, or an already-correct embed link)
// into a proper https://www.youtube.com/embed/VIDEO_ID URL.
// YouTube refuses to load its normal /watch page inside an <iframe>
// (that's the "www.youtube.com refused to connect" error), so this
// makes the Media page tolerant of whatever URL format gets pasted in.
export function toYouTubeEmbedUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();

  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "");

    // Already an embed URL — leave it alone.
    if (host === "youtube.com" && u.pathname.startsWith("/embed/")) {
      return trimmed;
    }

    // youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      // youtube.com/watch?v=VIDEO_ID
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      // youtube.com/shorts/VIDEO_ID or youtube.com/live/VIDEO_ID
      const match = u.pathname.match(/^\/(shorts|live)\/([^/]+)/);
      if (match) return `https://www.youtube.com/embed/${match[2]}`;
    }
  } catch {
    // Not a valid URL at all — fall through and return it unchanged so
    // the admin still sees something rather than a silent blank field.
  }

  return trimmed;
}
