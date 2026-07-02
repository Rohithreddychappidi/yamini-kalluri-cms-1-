import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import { getSiteSettings, getPage, getWritings } from "@/lib/data";

export const revalidate = 0;

export default async function HomePage() {
  const [settings, content, writings] = await Promise.all([
    getSiteSettings(),
    getPage("home"),
    getWritings(),
  ]);

  const pressImages = writings.slice(0, 8);
  const bgImage = content.page_bg_image || "/assets/hero-bg.png";

  return (
    <>
      {/* Fixed, non-scrolling background image for the whole home page */}
      <div className="home-fixed-bg" style={{ backgroundImage: `url('${bgImage}')` }} />

      <Header settings={settings} active="home" />
      <main className="home-main">
        <section className="hero hero-video-section">
          {content.hero_video ? <HeroVideo src={content.hero_video} /> : null}
          <div className="wrap">
            <h1>{content.hero_title}</h1>
            <div className="role">{content.hero_role}</div>
          </div>
        </section>

        <div className="home-glass">
          <section className="tight">
            <div className="wrap split">
              <div className="ph" data-cap={content.about_image_caption}>
                {content.about_image ? (
                  <img src={content.about_image} alt={content.about_image_caption || ""} />
                ) : (
                  <span className="frame-label">Image</span>
                )}
              </div>
              <div className="tx">
                <span className="eyebrow accent">{content.about_eyebrow}</span>
                <h2>{content.about_heading}</h2>
                <p>{content.about_paragraph_1}</p>
                <p>{content.about_paragraph_2}</p>
                <a href="/the-artist" className="btn">Learn More</a>
              </div>
            </div>
          </section>

          <hr className="rule" />

          <section className="band-dark">
            <div className="wrap split reverse">
              <div className="tx">
                <span className="eyebrow">{content.work_eyebrow}</span>
                <h2>{content.work_heading}</h2>
                <p>{content.work_paragraph_1}</p>
                <p>{content.work_paragraph_2}</p>
                <a href="/work" className="btn" style={{ color: "var(--orchid-white)", borderColor: "var(--orchid-white)" }}>
                  Explore the Work
                </a>
              </div>
              <div className="ph" data-cap={content.work_image_caption} style={{ background: "#34322F" }}>
                {content.work_image ? (
                  <img src={content.work_image} alt={content.work_image_caption || ""} />
                ) : (
                  <span className="frame-label" style={{ color: "var(--chrome-white)" }}>Image</span>
                )}
              </div>
            </div>
          </section>

          <hr className="rule" />

          <section>
            <div className="wrap">
              <span className="eyebrow accent">{settings?.nav_writings || "Writings"}</span>
              <div className="home-press-stack">
                {pressImages.map((w) => (
                  <a href={`/writings/${w.slug}`} key={w.id}>
                    <img src={w.image_url} alt={w.title} />
                  </a>
                ))}
              </div>
              <a href="/writings" className="btn" style={{ marginTop: "1.8rem", display: "inline-block" }}>
                Read More
              </a>
            </div>
          </section>

          <hr className="rule" />

          <section className="tight">
            <div className="wrap">
              <span className="eyebrow accent">Stay Connected</span>
              <h2 style={{ margin: "0.6rem 0 2rem" }}>{content.connected_heading}</h2>
              <div className="gallery">
                {(content.connected_tiles || []).map((tile, i) => (
                  <div className="g-item" key={i}><span>{tile}</span></div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
