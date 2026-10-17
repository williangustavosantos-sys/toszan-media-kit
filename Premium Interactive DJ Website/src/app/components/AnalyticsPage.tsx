import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EditorialReveal, MetricValue, PortfolioPaths } from "./CreatorPage";
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
  upsertMeta("property", "og:url", "https://toszan.com.br/analytics");
  upsertMeta("property", "og:image", "https://toszan.com.br/analytics/2026-07/instagram-insights-views-overview.png");
  upsertMeta("name", "robots", "noindex, nofollow");
  upsertMeta("name", "theme-color", "#080909");
  upsertCanonical("https://toszan.com.br/analytics");
}

function MetricCard({ label, value, detail, index, onOpen, openLabel }: { label: string; value: string; detail: string; index: number; onOpen: () => void; openLabel: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.button type="button" className="analytics-metric" onClick={onOpen} aria-label={`${label}: ${value}. ${detail}. ${openLabel}`} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: reduced ? 0 : index % 3 * 0.08 }} whileHover={reduced ? undefined : { y: -5 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
      <span className="analytics-metric-label">{label}<ZoomIn size={15} aria-hidden="true" /></span>
      <span className="analytics-metric-value"><MetricValue value={value} delay={index % 3 * 0.08} /><span className="sr-only">{value}</span></span>
      <span className="analytics-metric-detail">{detail}</span>
      <span className="analytics-metric-open">{openLabel}<ArrowRight size={13} aria-hidden="true" /></span>
    </motion.button>
  );
}

export function AnalyticsPage() {
  const reduced = useReducedMotion();
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
          <motion.div className="analytics-intro-top" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="analytics-eyebrow">{copy.analyticsPage.eyebrow}</span>
            <a href="/creator" className="analytics-back"><ArrowLeft size={13} />{copy.analyticsPage.creatorPage}</a>
          </motion.div>
          <motion.h1 initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: reduced ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}>{copy.analyticsPage.title}</motion.h1>
          <EditorialReveal className="analytics-intro-bottom" delay={0.15}>
            <p>{copy.analyticsPage.intro}</p>
            <div className="analytics-intro-actions"><motion.a href="/creator#contact" className="creator-button creator-button-primary" whileHover={reduced ? undefined : { y: -3 }} whileTap={reduced ? undefined : { scale: 0.96 }}>{copy.analyticsPage.startProject}<Mail size={15} /></motion.a></div>
          </EditorialReveal>
          <div className="analytics-verification"><ShieldCheck size={23} strokeWidth={1.2} aria-hidden="true" /><p>{copy.analyticsPage.verification}</p></div>
        </div>
      </section>

      <section id="verified-metrics" className="analytics-section">
        <div className="analytics-container">
          <EditorialReveal className="analytics-section-heading">
            <div><span className="analytics-eyebrow">{copy.analyticsPage.snapshot}</span><h2>{copy.analyticsPage.month}</h2></div>
            <span className="analytics-section-number" aria-hidden="true">01 /</span>
          </EditorialReveal>
          <div className="analytics-metrics">{localizedSnapshot.map((metric, index) => <MetricCard key={metric.label} {...metric} index={index} openLabel={copy.contact.verified} onOpen={() => setSelected(localizedScreenshots[[11, 0, 0, 2, 11, 10][index]])} />)}</div>
        </div>
      </section>

      <section className="analytics-section analytics-gallery-section">
        <div className="analytics-container">
          <EditorialReveal className="analytics-section-heading">
            <div><span className="analytics-eyebrow">{copy.analyticsPage.gallery}</span><h2>{copy.analyticsPage.proof}</h2></div>
            <span className="analytics-section-number" aria-hidden="true">02 /</span>
          </EditorialReveal>
          <div className="analytics-gallery">
            {localizedScreenshots.map((item, index) => (
              <motion.button type="button" key={item.src} onClick={() => setSelected(item)} className="analytics-evidence" aria-label={`${copy.contact.open}: ${item.title}`} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay: reduced ? 0 : index % 3 * 0.07 }} whileHover={reduced ? undefined : { y: -6 }} whileTap={reduced ? undefined : { scale: 0.98 }}>
                <div className="analytics-evidence-image"><img src={item.src} alt={item.title} loading="lazy" /><span className="analytics-evidence-zoom" aria-hidden="true"><ZoomIn size={15} /></span></div>
                <div className="analytics-evidence-caption"><span className="analytics-evidence-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.metric}</p></div></div>
              </motion.button>
            ))}
          </div>
          <PortfolioPaths language={language} />
          <footer className="analytics-footer"><a href="/creator" className="analytics-back"><ArrowLeft size={13} />{copy.analyticsPage.creatorPage}</a><a href="/creator#contact" className="creator-text-link">{copy.analyticsPage.startProject}<ArrowRight size={15} /></a></footer>
        </div>
      </section>

      <AnimatePresence>
      {selected ? (
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} role="dialog" aria-modal="true" aria-label={selected.title} className="analytics-modal" onClick={() => setSelected(null)}>
          <motion.div className="analytics-modal-content" initial={reduced ? false : { scale: 0.96, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 8 }} transition={{ duration: reduced ? 0 : 0.3 }} onClick={(event) => event.stopPropagation()}>
            <button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label={copy.analyticsPage.close} className="analytics-modal-close"><X size={21} /></button>
            <img src={selected.src} alt={selected.title} className="analytics-modal-image" />
            <div className="analytics-modal-caption">{selected.title} — {selected.metric}</div>
          </motion.div>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </div>
  );
}
