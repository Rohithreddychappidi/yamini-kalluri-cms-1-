import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getWritings, getPage } from "@/lib/data";

export const revalidate = 0;

export default async function WritingsPage() {
  const [settings, writings, content] = await Promise.all([getSiteSettings(), getWritings(), getPage("writings")]);

  const hasWorkSection = content.work_heading || content.work_paragraph || (content.work_bullets || []).length > 0 || content.work_image;

  return (
    <>
      <Header settings={settings} active="writings" />
      <main>
        {hasWorkSection && (
          <>
            <section className="tight page-hero" style={{ paddingBottom: "3.5rem" }}>
              <div className="wrap split">
                <div className="tx">
                  {content.work_heading && <h2 style={{ fontSize: "clamp(2.2rem,4.4vw,3.4rem)" }}>{content.work_heading}</h2>}
                  {content.work_paragraph && <p>{content.work_paragraph}</p>}
                  {(content.work_bullets || []).length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "1.2rem 0 0", display: "grid", gap: "0.8rem" }}>
                      {content.work_bullets.map((b, i) => (
                        <li key={i} style={{ paddingLeft: "1.2rem", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0 }}>—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {content.work_image && (
                  <div>
                    <img src={content.work_image} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                )}
              </div>
            </section>
            <hr className="rule" />
          </>
        )}

        <section className={hasWorkSection ? "tight" : "page-hero"}>
          <div className="wrap">
            <span className="eyebrow accent">{settings?.nav_writings || "Writings"}</span>
            <h1 style={{ fontSize: "clamp(2.2rem,4.4vw,3.4rem)" }}>{settings?.nav_writings || "Writings"} Coverage</h1>
          </div>
        </section>

        <section className="press-gallery-section">
          <div className="wrap press-mosaic">
            {writings.map((w) => (
              <article
                className={`press-tile${w.tile_size === "wide" ? " wide" : w.tile_size === "tall" ? " tall" : ""}`}
                key={w.id}
              >
                <a href={`/writings/${w.slug}`}>
                  <img src={w.image_url} alt={w.title} />
                </a>
                <a className="src" href={`/writings/${w.slug}`}>
                  {w.source_name || w.title}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
