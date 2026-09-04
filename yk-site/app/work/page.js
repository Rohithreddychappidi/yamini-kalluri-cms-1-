import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getPage } from "@/lib/data";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

export const revalidate = 0;

export default async function WorkPage() {
  const [settings, content] = await Promise.all([getSiteSettings(), getPage("work")]);

  const heroStyle = content.hero_image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.44) 48%, rgba(0,0,0,0.98) 100%), url(${content.hero_image})`,
      }
    : undefined;

  // Combine the legacy 3 fixed images with the new unlimited list, in order.
  const rowImages = [content.row_image_1, content.row_image_2, content.row_image_3, ...(content.row_images || [])].filter(Boolean);
  const videos = (content.videos || []).map((v) => toYouTubeEmbedUrl(v)).filter(Boolean);

  return (
    <>
      <Header settings={settings} active="work" />
      <main>
        <section className="visual-hero work-visual" style={heroStyle}>
          <div className="wrap hero-copy center-copy">
            <h1 dangerouslySetInnerHTML={{ __html: content.hero_heading || "" }} />
            <p>{content.hero_paragraph}</p>
            {content.hero_link_url && (
              <p><a href={content.hero_link_url} target="_blank" rel="noopener">{content.hero_link_label}</a></p>
            )}
          </div>
        </section>

        <section className="work-image-row">
          <div className="wrap image-row">
            {rowImages.map((img, i) => (
              <img src={img} alt="" key={i} />
            ))}
          </div>
        </section>

        {(content.education_title || content.education_detail || content.certificates_title || content.certificates_detail) && (
          <section className="tight">
            <div className="wrap cols-2">
              {(content.education_title || content.education_detail) && (
                <div>
                  <span className="eyebrow">Education</span>
                  <h3 style={{ marginTop: "0.8rem" }}>{content.education_title}</h3>
                  <p>{content.education_detail}</p>
                </div>
              )}
              {(content.certificates_title || content.certificates_detail) && (
                <div>
                  <span className="eyebrow">Certificates</span>
                  <h3 style={{ marginTop: "0.8rem" }}>{content.certificates_title}</h3>
                  <p style={{ whiteSpace: "pre-line" }}>{content.certificates_detail}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {(content.education_title || content.education_detail || content.certificates_title || content.certificates_detail) && (content.experience || []).length > 0 && (
          <hr className="rule" />
        )}

        {(content.experience || []).length > 0 && (
          <section>
            <div className="wrap">
              <span className="eyebrow accent">Work Experience</span>
              <div className="row-list" style={{ marginTop: "1.6rem" }}>
                {content.experience.map((row, i) => (
                  <div className="row" key={i}>
                    <div className="yr">{row.yr}</div>
                    <div className="ev">{row.ev}<span className="loc">{row.loc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <hr className="rule" />

        {videos.length > 0 && (
          <>
            <section className="band-dark">
              <div className="wrap">
                <span className="eyebrow">Videos</span>
                <h2 style={{ margin: "0.6rem 0 2rem" }}>{content.videos_heading || "In Motion"}</h2>
                <div className="video-grid">
                  {videos.map((src, i) => (
                    <div className="video-frame" key={i}>
                      <iframe src={src} title={`Performance Reel ${i + 1}`} allowFullScreen />
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <hr className="rule" />
          </>
        )}

        <section className="band-dark">
          <div className="wrap">
            <span className="eyebrow">Performances — Selected</span>
            <div className="cols-3" style={{ marginTop: "1.8rem" }}>
              {[content.performances_col1, content.performances_col2, content.performances_col3].map((col, i) => (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.9rem", fontSize: "0.92rem" }} key={i}>
                  {(col || []).map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="tight">
          <div className="wrap split">
            <div className="tx">
              <p className="lede">&ldquo;{content.quote_text}&rdquo;</p>
            </div>
            <div className="ph">
              {content.quote_image ? (
                <img src={content.quote_image} alt="" />
              ) : (
                <span className="frame-label">Image</span>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
