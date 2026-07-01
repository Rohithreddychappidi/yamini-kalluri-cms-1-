import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getPage, getGalleryItems } from "@/lib/data";

export const revalidate = 0;

export default async function MediaPage() {
  const [settings, content, gallery] = await Promise.all([
    getSiteSettings(),
    getPage("media"),
    getGalleryItems(),
  ]);

  const photos = gallery.filter((g) => g.type === "photo");

  return (
    <>
      <Header settings={settings} active="media" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow accent">Media</span>
            <h1 style={{ fontSize: "clamp(2.2rem,4.4vw,3.4rem)" }}>{content.hero_heading}</h1>
            <p style={{ maxWidth: 680, marginTop: "1.2rem" }}>
              {content.hero_paragraph}{" "}
              {content.hero_link_url && (
                <a href={content.hero_link_url} target="_blank" rel="noopener" style={{ color: "var(--vermillion-dim)" }}>
                  {content.hero_link_label}
                </a>
              )}
            </p>
          </div>
        </section>

        <section className="tight">
          <div className="wrap">
            <div className="gallery">
              {photos.map((item) => (
                <div
                  className="g-item"
                  key={item.id}
                  style={item.image_url ? { backgroundImage: `url(${item.image_url})` } : undefined}
                >
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="band-dark">
          <div className="wrap">
            <span className="eyebrow">Videos</span>
            <h2 style={{ margin: "0.6rem 0 2rem" }}>{content.videos_heading}</h2>
            <div className="cols-2">
              {content.video_embed_url && (
                <div className="video-frame">
                  <iframe src={content.video_embed_url} title="Performance Reel" allowFullScreen />
                </div>
              )}
              <div className="video-frame" style={{ background: "#2E2C29" }}>
                <span style={{ fontFamily: "var(--display)", fontStyle: "italic", color: "var(--chrome-white)" }}>
                  More on YouTube
                </span>
              </div>
            </div>
            {content.channel_url && (
              <a
                href={content.channel_url}
                target="_blank"
                rel="noopener"
                className="btn"
                style={{ marginTop: "2rem", display: "inline-block", color: "var(--orchid-white)", borderColor: "var(--orchid-white)" }}
              >
                Visit Channel
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
