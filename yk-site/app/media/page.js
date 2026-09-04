import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getPage, getGalleryItems } from "@/lib/data";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

export const revalidate = 0;

export default async function MediaPage() {
  const [settings, content, gallery] = await Promise.all([
    getSiteSettings(),
    getPage("media"),
    getGalleryItems(),
  ]);

  const photos = gallery.filter((g) => g.type === "photo");
  const videos = (content.videos || []).map((v) => toYouTubeEmbedUrl(v)).filter(Boolean);

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
                <div className={`g-item ${item.image_url ? "has-photo" : "no-photo"}`} key={item.id}>
                  {item.image_url ? (
                    <>
                      <img src={item.image_url} alt={item.label || ""} />
                      {item.label && <span className="g-caption">{item.label}</span>}
                    </>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {(videos.length > 0 || content.channel_url) && (
          <>
            <hr className="rule" />

            <section className="band-dark">
              <div className="wrap">
                <span className="eyebrow">Videos</span>
                <h2 style={{ margin: "0.6rem 0 2rem" }}>{content.videos_heading}</h2>
                {videos.length > 0 && (
                  <div className="video-grid">
                    {videos.map((src, i) => (
                      <div className="video-frame" key={i}>
                        <iframe src={src} title={`Performance Reel ${i + 1}`} allowFullScreen />
                      </div>
                    ))}
                  </div>
                )}
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
          </>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
