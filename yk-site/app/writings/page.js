import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getWritings } from "@/lib/data";

export const revalidate = 0;

export default async function WritingsPage() {
  const [settings, writings] = await Promise.all([getSiteSettings(), getWritings()]);

  return (
    <>
      <Header settings={settings} active="writings" />
      <main>
        <section className="page-hero">
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
