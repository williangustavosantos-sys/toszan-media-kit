import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck, X, ZoomIn } from "lucide-react";
import {
  analyticsScreenshots,
  analyticsSnapshot,
  formatVerifiedMetric,
  type AnalyticsScreenshot,
} from "../../data/creatorStats";
import { creatorCopy, getCreatorLanguage, type CreatorCopy } from "../../data/creatorCopy";
import { useLanguage } from "../context/LanguageContext";
import "../../styles/creator-editorial.css";

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
  upsertMeta("name", "theme-color", "#080909");
  upsertCanonical("https://toszan-media-kit.vercel.app/analytics");
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="analytics-metric">
      <span className="analytics-metric-label">{label}</span>
      <span className="analytics-metric-value">{value}</span>
      <span className="analytics-metric-detail">{detail}</span>
    </div>
  );
}

export function AnalyticsPage() {
  const { language } = useLanguage();
  const copy = creatorCopy[getCreatorLanguage(language)];
  const [selected, setSelected] = useState<AnalyticsScreenshot | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const localizedSnapshot = analyticsSnapshot.map((metric, index) => ({
    ...metric,
    value: formatVerifiedMetric(metric.value, getCreatorLanguage(language)),
    label: copy.analyticsPage.metricLabels[index],
    detail: copy.analyticsPage.metricDetails[index],
  }));
  const localizedScreenshots = analyticsScreenshots.map((item, index) => ({
    ...item,
    ...copy.analyticsPage.galleryItems[index],
  }));

  useEffect(() => {
    setAnalyticsMeta(copy);
  }, [copy]);

  useEffect(() => {
    if (!selected) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [selected]);

  return (
    <div className="cinematic-analytics">
      <section className="analytics-intro">
        <div className="analytics-container">
          <div className="analytics-intro-top">
            <span className="analytics-eyebrow">{copy.analyticsPage.eyebrow}</span>
            <a href="/creator" className="analytics-back"><ArrowLeft size={13} />{copy.analyticsPage.creatorPage}</a>
          </div>
          <h1>{copy.analyticsPage.title}</h1>
          <div className="analytics-intro-bottom">
            <p>{copy.analyticsPage.intro}</p>
            <div className="analytics-intro-actions"><a href="/creator#contact" className="creator-button creator-button-primary">{copy.analyticsPage.startProject}<Mail size={15} /></a></div>
          </div>
          <div className="analytics-verification"><ShieldCheck size={23} strokeWidth={1.2} aria-hidden="true" /><p>{copy.analyticsPage.verification}</p></div>
        </div>
      </section>

      <section id="verified-metrics" className="analytics-section">
        <div className="analytics-container">
          <div className="analytics-section-heading">
            <div><span className="analytics-eyebrow">{copy.analyticsPage.snapshot}</span><h2>{copy.analyticsPage.month}</h2></div>
            <span className="analytics-section-number" aria-hidden="true">01 /</span>
          </div>
          <div className="analytics-metrics">{localizedSnapshot.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div>
        </div>
      </section>

      <section className="analytics-section analytics-gallery-section">
        <div className="analytics-container">
          <div className="analytics-section-heading">
            <div><span className="analytics-eyebrow">{copy.analyticsPage.gallery}</span><h2>{copy.analyticsPage.proof}</h2></div>
            <span className="analytics-section-number" aria-hidden="true">02 /</span>
          </div>
          <div className="analytics-gallery">
            {localizedScreenshots.map((item, index) => (
              <button type="button" key={item.src} onClick={() => setSelected(item)} className="analytics-evidence" aria-label={`${copy.contact.open}: ${item.title}`}>
                <div className="analytics-evidence-image"><img src={item.src} alt={item.title} loading="lazy" /><span className="analytics-evidence-zoom" aria-hidden="true"><ZoomIn size={15} /></span></div>
                <div className="analytics-evidence-caption"><span className="analytics-evidence-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.metric}</p></div></div>
              </button>
            ))}
          </div>
          <footer className="analytics-footer"><a href="/creator" className="analytics-back"><ArrowLeft size={13} />{copy.analyticsPage.creatorPage}</a><a href="/creator#contact" className="creator-text-link">{copy.analyticsPage.startProject}<ArrowRight size={15} /></a></footer>
        </div>
      </section>

      {selected ? (
        <div role="dialog" aria-modal="true" aria-label={selected.title} className="analytics-modal" onClick={() => setSelected(null)}>
          <div className="analytics-modal-content" onClick={(event) => event.stopPropagation()}>
            <button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label={copy.analyticsPage.close} className="analytics-modal-close"><X size={21} /></button>
            <img src={selected.src} alt={selected.title} className="analytics-modal-image" />
            <div className="analytics-modal-caption">{selected.title} — {selected.metric}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
