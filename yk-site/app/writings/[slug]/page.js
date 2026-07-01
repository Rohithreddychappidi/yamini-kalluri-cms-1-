import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getWritingBySlug } from "@/lib/data";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function WritingDetailPage({ params }) {
  const [settings, writing] = await Promise.all([
    getSiteSettings(),
    getWritingBySlug(params.slug),
  ]);

  if (!writing) notFound();

  return (
    <>
      <Header settings={settings} active="writings" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow accent">{writing.source_name}</span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3.1rem)", maxWidth: 820 }}>{writing.title}</h1>
          </div>
        </section>

        <section className="tight">
          <div className="wrap split">
            <div className="ph" data-cap={writing.source_name}>
              {writing.image_url ? (
                <img src={writing.image_url} alt={writing.title} />
              ) : (
                <span className="frame-label">Image</span>
              )}
            </div>
            <div className="tx">
              {writing.excerpt && <p>{writing.excerpt}</p>}
              {writing.body && (
                <div style={{ whiteSpace: "pre-line" }}>
                  <p>{writing.body}</p>
                </div>
              )}
              {writing.source_url && (
                <a
                  href={writing.source_url}
                  target="_blank"
                  rel="noopener"
                  className="btn"
                  style={{ marginTop: "1.6rem", display: "inline-block" }}
                >
                  Read on {writing.source_name || "original source"}
                </a>
              )}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="tight">
          <div className="wrap">
            <a href="/writings" className="btn">← Back to Writings</a>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
