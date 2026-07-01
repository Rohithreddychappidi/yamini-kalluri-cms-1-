import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getPage } from "@/lib/data";

export const revalidate = 0;

export default async function ContactPage() {
  const [settings, content] = await Promise.all([getSiteSettings(), getPage("contact")]);

  return (
    <>
      <Header settings={settings} active="contact" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow accent">Contact</span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3.1rem)", maxWidth: 760 }}>{content.hero_heading}</h1>
          </div>
        </section>

        <section>
          <div className="wrap split">
            <div className="tx">
              <span className="eyebrow accent">{content.eyebrow}</span>
              <h2 style={{ marginBottom: "1.2rem" }}>{content.heading}</h2>
              <p>{content.paragraph}</p>
              {content.link_url && (
                <p><a href={content.link_url} target="_blank" rel="noopener" style={{ color: "var(--vermillion-dim)" }}>{content.link_label}</a></p>
              )}

              <div style={{ marginTop: "2.4rem", display: "grid", gap: "1.4rem" }}>
                <div>
                  <span className="eyebrow">Email</span>
                  <h3 style={{ marginTop: "0.5rem", fontWeight: 500 }}>
                    <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
                  </h3>
                </div>
                {settings?.phone && (
                  <div>
                    <span className="eyebrow">Phone</span>
                    <h3 style={{ marginTop: "0.5rem", fontWeight: 500 }}>
                      <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                    </h3>
                  </div>
                )}
              </div>
            </div>

            <div className="ph" data-cap={content.side_image_caption}>
              {content.side_image ? (
                <img src={content.side_image} alt={content.side_image_caption || ""} />
              ) : (
                <span className="frame-label">Image</span>
              )}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="band-dark tight">
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.6rem" }}>
            <div>
              <span className="eyebrow">Email</span>
              <h3 style={{ marginTop: "0.6rem", color: "var(--orchid-white)", fontWeight: 500 }}>{settings?.email}</h3>
            </div>
            {settings?.phone && (
              <div>
                <span className="eyebrow">Phone</span>
                <h3 style={{ marginTop: "0.6rem", color: "var(--orchid-white)", fontWeight: 500 }}>{settings.phone}</h3>
              </div>
            )}
            <div className="f-social" style={{ display: "flex", gap: "1.8rem" }}>
              {settings?.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noopener">Facebook</a>}
              {settings?.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener">Instagram</a>}
              {settings?.youtube_url && <a href={settings.youtube_url} target="_blank" rel="noopener">YouTube</a>}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
