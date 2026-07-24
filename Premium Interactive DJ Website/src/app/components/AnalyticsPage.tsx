import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Mail, X } from "lucide-react";
import {
  analyticsScreenshots,
  analyticsSnapshot,
  type AnalyticsScreenshot,
} from "../../data/creatorStats";
import { creatorCopy, getCreatorLanguage, type CreatorCopy } from "../../data/creatorCopy";
import { useLanguage } from "../context/LanguageContext";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function setAnalyticsMeta(copy: CreatorCopy) {
  const title = `${copy.analyticsPage.title} | TOSZAN`;
  document.title = title;
  upsertMeta("name", "description", copy.analyticsPage.verification);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", copy.analyticsPage.verification);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", "https://toszan-media-kit.vercel.app/analytics");
  upsertMeta("property", "og:image", "https://toszan-media-kit.vercel.app/analytics/2026-07/instagram-insights-views-overview.png");
  upsertMeta("name", "robots", "noindex, nofollow");
  upsertMeta("name", "theme-color", "#0B0B0B");
  upsertCanonical("https://toszan-media-kit.vercel.app/analytics");
}

function PageLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center justify-center gap-2 px-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "8px",
        color: "rgba(255,255,255,0.82)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.66rem",
        fontWeight: 800,
        letterSpacing: "0.2em",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      {children}
    </a>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div
      className="p-5"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div className="mt-4" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.7rem", letterSpacing: "0.06em", lineHeight: 0.9 }}>
        {value}
      </div>
      <div className="mt-3" style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem" }}>
        {detail}
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  const { language } = useLanguage();
  const copy = creatorCopy[getCreatorLanguage(language)];
  const [selected, setSelected] = useState<AnalyticsScreenshot | null>(null);
  const localizedSnapshot = analyticsSnapshot.map((metric, index) => ({
    ...metric,
    label: copy.analyticsPage.metricLabels[index],
    detail: copy.analyticsPage.metricDetails[index],
  }));

  useEffect(() => {
    setAnalyticsMeta(copy);
  }, [copy]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B0B", color: "#ffffff" }}>
      <section className="px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                {copy.analyticsPage.eyebrow}
              </div>
              <h1
                className="mt-4"
                style={{
                  color: "#ffffff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.2rem, 11vw, 8rem)",
                  letterSpacing: "0.08em",
                  lineHeight: 0.88,
                }}
              >
                {copy.analyticsPage.title}
              </h1>
              <p className="mt-5 max-w-2xl" style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", lineHeight: 1.8 }}>
                {copy.analyticsPage.intro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PageLink href="/creator">
                <ArrowLeft size={14} />
                {copy.analyticsPage.creatorPage}
              </PageLink>
              <PageLink href="/creator#contact">
                {copy.analyticsPage.startProject}
                <Mail size={14} />
              </PageLink>
            </div>
          </div>

          <div
            className="p-5 md:p-6"
            style={{
              background: "linear-gradient(135deg, rgba(255,176,0,0.12), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,176,0,0.24)",
              borderRadius: "8px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.74)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
              {copy.analyticsPage.verification}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {copy.analyticsPage.snapshot}
            </div>
            <h2 className="mt-3" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.4rem, 7vw, 5rem)", letterSpacing: "0.08em", lineHeight: 0.95 }}>
              {copy.analyticsPage.month}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localizedSnapshot.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {copy.analyticsPage.gallery}
            </div>
            <h2 className="mt-3" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.4rem, 7vw, 5rem)", letterSpacing: "0.08em", lineHeight: 0.95 }}>
              {copy.analyticsPage.proof}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {analyticsScreenshots.map((item) => (
              <button
                key={item.src}
                onClick={() => setSelected(item)}
                className="group overflow-hidden text-left"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#ffffff",
                  cursor: "zoom-in",
                  padding: 0,
                }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ transition: "transform 0.45s ease" }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
                <div className="p-5">
                  <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                    {copy.analyticsPage.month}
                  </div>
                  <h3 className="mt-2" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.08em", lineHeight: 1 }}>
                    {item.title}
                  </h3>
                  <p className="mt-3" style={{ color: "rgba(255,255,255,0.54)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.84rem", lineHeight: 1.6 }}>
                    {item.metric}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(18px)" }}
          onClick={() => setSelected(null)}
        >
          <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={copy.analyticsPage.close}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "rgba(11,11,11,0.78)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
            >
              <X size={22} />
            </button>
            <img
              src={selected.src}
              alt={selected.title}
              className="max-h-[88vh] w-auto max-w-full"
              style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.18)" }}
            />
            <div className="mt-3" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}>
              {selected.title} - {selected.metric}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
