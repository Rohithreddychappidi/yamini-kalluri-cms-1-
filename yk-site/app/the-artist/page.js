import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getPage } from "@/lib/data";

export const revalidate = 0;

export default async function TheArtistPage() {
  const [settings, content] = await Promise.all([getSiteSettings(), getPage("the-artist")]);

  const heroStyle = content.hero_image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.44) 48%, rgba(0,0,0,0.98) 100%), url(${content.hero_image})`,
      }
    : undefined;

  return (
    <>
      <Header settings={settings} active="the-artist" />
      <main>
        <section className="visual-hero bio-visual" style={heroStyle}>
          <div className="wrap hero-copy left-copy">
            <span className="eyebrow">{settings?.nav_artist || "The Artist"}</span>
            <h1>{content.hero_heading}</h1>
            <p>{content.hero_paragraph}</p>
          </div>
        </section>

        <section className="about-minimal">
          <div className="wrap about-grid">
            <div className="about-copy">
              <span className="eyebrow">{content.about_eyebrow}</span>
              <h2>{content.about_heading}</h2>
              <p>{content.about_paragraph_1}</p>
              <p>{content.about_paragraph_2}</p>
              <p>{content.about_paragraph_3}</p>
              <p>{content.about_paragraph_4}</p>
            </div>
            <div className="photo-stack">
              {content.photo_1 && <img src={content.photo_1} alt="Rehearsal portrait" />}
              {content.photo_2 && <img src={content.photo_2} alt="Dance detail" />}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section>
          <div className="wrap">
            <span className="eyebrow accent">Inside The Artist</span>
            <h2 style={{ margin: "0.6rem 0 2.4rem" }}>{content.inside_heading || "Awards & Achievements / Testimonials"}</h2>

            <div className="cols-2">
              <div>
                <h3 style={{ marginBottom: "1.2rem" }}>{content.awards_heading || "Awards & Achievements"}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.9rem", fontSize: "0.95rem", color: "var(--masala)" }}>
                  {(content.awards || []).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
              <div>
                <h3 style={{ marginBottom: "1.2rem" }}>{content.testimonials_heading || "Testimonials"}</h3>
                <div style={{ display: "grid", gap: "1.6rem" }}>
                  {(content.testimonials || []).map((t, i) => (
                    <div className="quote-card" key={i}>
                      <p className="quote">"{t.quote}"</p>
                      <span className="source">{t.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="landscape-section">
          <div className="wrap">
            {content.landscape_photo && (
              <img src={content.landscape_photo} alt="Performance stage" />
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
