import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Pause,
  Music2,
  Play,
} from "lucide-react";
import {
  creatorLinks,
  creatorSnapshot,
  creatorStats,
  formatVerifiedMetric,
  creatorVideos,
  followerAge,
  followerGender,
  topCities,
  topCountries,
  type AudienceBar,
} from "../../data/creatorStats";
import { creatorCopy, getCreatorLanguage, type CreatorCopy } from "../../data/creatorCopy";
import { useLanguage } from "../context/LanguageContext";
import { CreatorEvidence } from "./CreatorEvidence";

import creatorPortrait from "../../imports/creator-portrait-editorial-clean.webp";
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

function setCreatorMeta(copy: CreatorCopy) {
  document.title = copy.meta.title;
  upsertMeta("name", "description", copy.meta.description);
  upsertMeta("property", "og:title", copy.meta.title);
  upsertMeta("property", "og:description", copy.meta.description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", "https://toszan-media-kit.vercel.app/creator");
  upsertMeta("property", "og:image", "https://toszan-media-kit.vercel.app/optimized/brand/toszan-dourado-capa-oficial.webp");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "theme-color", "#080909");
  upsertCanonical("https://toszan-media-kit.vercel.app/creator");
}

export function EditorialReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function PortfolioPaths({ language, current }: { language: string; current?: "creator" | "booking" }) {
  const labels = {
    en: ["Explore TOSZAN", "General", "DJ / Booking", "Creator"],
    pt: ["Explore TOSZAN", "Visão geral", "DJ / Contratação", "Criador"],
    it: ["Esplora TOSZAN", "Generale", "DJ / Ingaggi", "Creator"],
    es: ["Explora TOSZAN", "General", "DJ / Contratación", "Creador"],
    fr: ["Découvrez TOSZAN", "Accueil", "DJ / Booking", "Créateur"]
  };
  const [label, general, booking, creator] = labels[language as keyof typeof labels] || labels.en;
  return <nav className="creator-paths" aria-label={label}><span>{label}</span><a href="/">{general}<ArrowRight size={16} /></a><a href="/booking" aria-current={current === "booking" ? "page" : undefined}>{booking}<ArrowRight size={16} /></a><a href="/creator" aria-current={current === "creator" ? "page" : undefined}>{creator}<ArrowRight size={16} /></a></nav>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="creator-eyebrow">{children}</div>;
}

function Section({ id, number, eyebrow, title, intro, children, className = "" }: {
  id?: string;
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`creator-section ${className}`}>
      <div className="creator-container">
        <EditorialReveal className="creator-section-heading">
          <div className="creator-section-index"><span aria-hidden="true">{number}</span><Eyebrow>{eyebrow}</Eyebrow></div>
          <div className="creator-section-heading-copy">
            <h2>{title}</h2>
            {intro ? <p>{intro}</p> : null}
          </div>
        </EditorialReveal>
        {children}
      </div>
    </section>
  );
}

function PrimaryLink({ href, children, icon, external = false }: {
  href: string; children: ReactNode; icon?: ReactNode; external?: boolean;
}) {
  const reduced = useReducedMotion();
  return <motion.a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="creator-button creator-button-primary" whileHover={reduced ? undefined : { y: -3 }} whileTap={reduced ? undefined : { scale: 0.96 }} transition={{ duration: 0.2 }}>{children}{icon}</motion.a>;
}

// Visible counters retain the exact archived value for accessible labels and at rest.
// Percentages use their original precision; ranges and market names remain literal.
export function MetricValue({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const match = value.match(/^(\+?)([0-9][0-9,.]*)(%)?$/);
  const percentage = Boolean(match?.[3]);
  const amount = match ? Number(percentage ? match[2].replace(",", ".") : match[2].replace(/[,.]/g, "")) : 0;
  const decimals = percentage ? (match?.[2].split(/[,.]/)[1]?.length ?? 0) : 0;
  const locale = percentage ? (value.includes(",") ? "it-IT" : "en-US") : value.includes(".") ? "it-IT" : "en-US";
  const zero = match ? `${match[1]}${new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(0)}${percentage ? "%" : ""}` : value;
  const [display, setDisplay] = useState(reduced ? value : zero);
  useEffect(() => {
    if (!match || reduced) { setDisplay(value); return; }
    if (!inView) { setDisplay(zero); return; }
    let frame = 0;
    const started = performance.now() + delay * 1000;
    const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const tick = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - started) / 1450));
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(progress === 1 ? value : `${match[1]}${formatter.format(percentage ? amount * eased : Math.round(amount * eased))}${percentage ? "%" : ""}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduced, inView, delay]);
  return <span ref={ref} aria-hidden="true" className="creator-count" data-final-value={value}>{display}</span>;
}

function MetricCard({ label, value, detail, index, onOpen }: { label: string; value: string; detail: string; index: number; onOpen: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.a href="#verified-metrics" onClick={onOpen} aria-label={`${label}: ${value}. ${detail}`} className="creator-metric" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: reduced ? 0 : index % 4 * 0.07 }} whileHover={reduced ? undefined : { y: -5 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
      <span className="creator-metric-label">{label}<ArrowRight size={15} aria-hidden="true" /></span>
      <span className="creator-metric-value"><MetricValue value={value} delay={index % 4 * 0.08} /></span>
      <span className="creator-metric-detail">{detail}</span>
    </motion.a>
  );
}

function AudienceBars({ title, bars }: { title: string; bars: AudienceBar[] }) {
  const reduced = useReducedMotion();
  return (
    <EditorialReveal className="creator-audience-panel">
      <h3>{title}</h3>
      <div className="creator-audience-bars">
        {bars.map((bar, index) => (
          <div key={bar.label} className="creator-audience-row">
            <div className="creator-audience-label"><span>{bar.label}</span><span aria-label={bar.value}><MetricValue value={bar.value} delay={index * 0.08} /></span></div>
            <div className="creator-audience-track"><motion.div style={{ width: `${bar.percent}%`, transformOrigin: "0% 50%" }} initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 1 }} transition={{ duration: reduced ? 0 : 1.35, delay: reduced ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }} /></div>
          </div>
        ))}
      </div>
    </EditorialReveal>
  );
}

export function CreatorPage() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const copy = creatorCopy[getCreatorLanguage(language)];
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const playRequestVersion = useRef(0);
  const intendedVideo = useRef<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [blockedVideo, setBlockedVideo] = useState<string | null>(null);
  const [soundVideo, setSoundVideo] = useState<string | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState(() => window.location.hash === "#verified-metrics");
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  useEffect(() => {
    setCreatorMeta(copy);
  }, [copy]);

  const exactMetrics = [creatorStats.followersExact, creatorStats.monthlyViewsExact, creatorStats.accountsReachedExact, creatorStats.interactionsExact];
  const localizedSnapshot = creatorSnapshot.map((metric, index) => ({
    ...metric,
    value: formatVerifiedMetric(exactMetrics[index] ?? metric.value, getCreatorLanguage(language)),
    label: copy.metricLabels[index],
    detail: index < 4 ? copy.analyticsPage.month : copy.metricDetails[index],
  }));
  const localizedVideos = creatorVideos.map((video, index) => ({
    ...video,
    ...copy.work.videos[index],
  }));
  const localizedGender = followerGender.map((bar, index) => ({
    ...bar,
    label: index === 0 ? copy.audience.men : copy.audience.women,
  }));
  const localizedCountries = topCountries.map((bar, index) => ({
    ...bar,
    label: [
      copy.audience.brazil,
      copy.audience.italy,
      copy.audience.unitedStates,
      copy.audience.spain,
    ][index],
  }));
  const localizedCities = topCities.map((bar, index) => ({
    ...bar,
    label: [
      copy.audience.saoPaulo,
      copy.audience.milan,
      copy.audience.rome,
      copy.audience.rio,
    ][index],
  }));

  const stopOtherVideos = (activeSource: string) => {
    Object.entries(videoRefs.current).forEach(([source, video]) => {
      if (!video || source === activeSource) return;
      video.pause();
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    });
    setActiveVideo((current) => (current && current !== activeSource ? null : current));
    setBlockedVideo((current) => (current && current !== activeSource ? null : current));
    setSoundVideo((current) => (current && current !== activeSource ? null : current));
  };

  const handlePortfolioPlay = async (source: string, hasAudio: boolean) => {
    const video = videoRefs.current[source];
    if (!video) return;

    const requestVersion = ++playRequestVersion.current;
    intendedVideo.current = source;
    setPreviewVideo(null);
    stopOtherVideos(source);
    video.currentTime = video.currentTime || 0;

    if (!hasAudio) {
      setSoundVideo(null);
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      setBlockedVideo(null);
      try {
        await video.play();
        if (playRequestVersion.current !== requestVersion || intendedVideo.current !== source) {
          video.pause();
          video.muted = true;
          video.defaultMuted = true;
          video.volume = 0;
          return;
        }
        setActiveVideo(source);
      } catch {
        if (playRequestVersion.current !== requestVersion) return;
        if (video.paused) {
          setActiveVideo(null);
        }
        setBlockedVideo(null);
      }
      return;
    }

    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.removeAttribute("muted");
    video.defaultMuted = false;
    video.muted = false;
    video.volume = 1;
    setBlockedVideo(null);

    try {
      await video.play();
      if (playRequestVersion.current !== requestVersion || intendedVideo.current !== source) {
        video.pause();
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        return;
      }
      // Keep the media element aligned with React's rendered `muted` prop
      // after the asynchronous play request completes.
      video.defaultMuted = false;
      video.muted = false;
      video.volume = 1;
      setActiveVideo(source);
      setSoundVideo(source);
    } catch {
      if (playRequestVersion.current !== requestVersion) return;
      setActiveVideo(null);
      setSoundVideo(null);
      setBlockedVideo(source);
    }
  };

  const handlePortfolioPause = (source: string) => {
    const video = videoRefs.current[source];
    if (video && !video.ended && video.error === null && activeVideo !== source) return;
    setActiveVideo((current) => (current === source ? null : current));
    setSoundVideo((current) => (current === source ? null : current));
  };

  const handlePortfolioEnded = (source: string) => {
    if (intendedVideo.current === source) {
      intendedVideo.current = null;
      playRequestVersion.current += 1;
    }
    setActiveVideo((current) => (current === source ? null : current));
    setSoundVideo((current) => (current === source ? null : current));
  };

  const handlePortfolioError = (source: string) => {
    if (intendedVideo.current === source) {
      intendedVideo.current = null;
      playRequestVersion.current += 1;
    }
    setActiveVideo((current) => (current === source ? null : current));
    setSoundVideo((current) => (current === source ? null : current));
    setBlockedVideo(source);
  };

  const pausePortfolioVideo = (source: string) => {
    const video = videoRefs.current[source];
    if (intendedVideo.current === source) intendedVideo.current = null;
    playRequestVersion.current += 1;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.pause();
    }
    setActiveVideo((current) => (current === source ? null : current));
    setSoundVideo((current) => (current === source ? null : current));
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          video.pause();
          video.muted = true;
          video.defaultMuted = true;
          video.volume = 0;
          const source = video.getAttribute("src");
          if (source) {
            if (intendedVideo.current === source) {
              intendedVideo.current = null;
              playRequestVersion.current += 1;
            }
            setActiveVideo((current) => current === source ? null : current);
            setSoundVideo((current) => current === source ? null : current);
          }
        }
      });
    }, { threshold: 0.12 });
    Object.values(videoRefs.current).forEach((video) => { if (video) observer.observe(video); });
    const pauseHidden = () => {
      if (!document.hidden) return;
      intendedVideo.current = null;
      playRequestVersion.current += 1;
      Object.values(videoRefs.current).forEach((video) => {
        if (!video) return;
        video.pause();
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
      });
      setActiveVideo(null);
      setSoundVideo(null);
    };
    document.addEventListener("visibilitychange", pauseHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseHidden); };
  }, []);

  // Silent, single-video previews in view. Sound is only enabled by an explicit tap.
  useEffect(() => {
    if (reduced || (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
    let visible: HTMLVideoElement | null = null;
    const observer = new IntersectionObserver((entries) => {
      if (intendedVideo.current) return;
      const candidates = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.45)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const next = candidates[0]?.target as HTMLVideoElement | undefined;
      if (next === visible) return;
      if (visible) { visible.pause(); visible.currentTime = 0; }
      visible = next || null;
      if (next) {
        next.muted = true;
        next.defaultMuted = true;
        next.volume = 0;
        next.loop = true;
        setPreviewVideo(next.getAttribute("src"));
        void next.play().catch(() => setPreviewVideo(null));
      } else setPreviewVideo(null);
    }, { threshold: [0, 0.45, 0.7, 0.95] });
    Object.values(videoRefs.current).forEach(video => { if (video) observer.observe(video); });
    return () => { observer.disconnect(); if (visible && !intendedVideo.current) visible.pause(); };
  }, [reduced]);

  return (
    <div className="cinematic-creator">
      <section id="overview" className="creator-hero">
        <div className="creator-hero-ambient" aria-hidden="true" />
        <div className="creator-container creator-hero-grid">
          <motion.div className="creator-hero-copy" initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="creator-hero-topline"><Eyebrow>{copy.hero.eyebrow}</Eyebrow><span className="creator-location"><MapPin size={12} />{copy.hero.location}</span></div>
            <h1 className="creator-hero-name"><span>WILLIAN</span><span>TOSZAN<span className="creator-name-period">.</span></span></h1>
            <div className="creator-hero-statement">
              <h2>{copy.hero.headline}</h2>
              <p>{copy.hero.description}</p>
            </div>
            <div className="creator-hero-actions">
              <PrimaryLink href="#work" icon={<ArrowRight size={16} />}>{copy.hero.work}</PrimaryLink>
              <a href="#contact" className="creator-text-link creator-hero-inline-link"><Mail size={14} />{copy.hero.collaboration}</a>
              <a href="#performance" className="creator-text-link creator-hero-inline-link"><BarChart3 size={14} />{copy.hero.analytics}</a>
            </div>
          </motion.div>
          <motion.figure className="creator-hero-portrait" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, delay: reduced ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}>
            <span className="creator-portrait-word" aria-hidden="true">{copy.hero.roleWord}</span>
            <div className="creator-portrait-light" aria-hidden="true" />
            <img src={creatorPortrait} alt={copy.hero.alt} width={960} height={1280} loading="eager" decoding="async" />
            <figcaption><span>{copy.hero.roles}</span><span>{copy.hero.region}</span></figcaption>
          </motion.figure>
          <div className="creator-hero-foot">
            <span className="creator-availability"><i aria-hidden="true" />{copy.hero.availability}</span>
            <span className="creator-hero-edition">{copy.analyticsPage.month}</span>
            <a href="#performance" className="creator-scroll-cue" aria-label={copy.performance.eyebrow}><span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <div className="creator-quick-stats creator-container">
        {localizedSnapshot.slice(0, 4).map((metric, index) => (
          <motion.a key={metric.label} href="#performance" className="creator-quick-stat" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: reduced ? 0 : index * 0.09 }} whileHover={reduced ? undefined : { y: -4 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
            <span className="creator-quick-stat-value"><MetricValue value={metric.value} delay={index * 0.09} /><span className="sr-only">{metric.value}</span></span>
            <span>{metric.label}<ArrowRight size={13} aria-hidden="true" /></span>
          </motion.a>
        ))}
      </div>

      <Section id="work" number="01" eyebrow={copy.work.eyebrow} title={copy.work.title} intro={copy.work.intro} className="creator-work-section">
        <div className="creator-portfolio">
          {localizedVideos.map((video, index) => (
            <motion.article key={video.source} className={`creator-work-item ${index < 2 ? "creator-work-featured" : ""}`} initial={reduced ? false : { opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.8, delay: reduced ? 0 : index % 3 * 0.09, ease: [0.22, 1, 0.36, 1] }}>
              {(() => {
                const isPlaying = activeVideo === video.source && blockedVideo !== video.source;
                return (
                  <div className="creator-work-media">
                    <video className="creator-work-video" src={video.source} poster={video.poster} muted playsInline preload="metadata" ref={(node) => { videoRefs.current[video.source] = node; }} onPause={() => handlePortfolioPause(video.source)} onEnded={() => handlePortfolioEnded(video.source)} onError={() => handlePortfolioError(video.source)} />
                    <img src={video.poster} alt="" aria-hidden="true" loading="lazy" className={`creator-work-poster ${isPlaying || previewVideo === video.source ? "is-playing" : ""}`} />
                    <div className="creator-work-scrim" aria-hidden="true" />
                    <div className="creator-work-media-heading"><span>{String(index + 1).padStart(2, "0")}</span><span>{video.hasAudio ? copy.work.contentSample : copy.work.visualSample}</span></div>
                    {!isPlaying || soundVideo !== video.source ? (
                      <button type="button" className="creator-work-play" aria-label={`${video.hasAudio ? copy.work.playSound : copy.work.viewSample}: ${video.title}`} onClick={(event) => { event.stopPropagation(); void handlePortfolioPlay(video.source, video.hasAudio); }}>
                        <span className="creator-work-play-icon"><Play size={15} fill="currentColor" aria-hidden="true" /></span>
                        <span>{video.hasAudio && blockedVideo === video.source ? copy.work.tapAgain : !video.hasAudio ? copy.work.viewSample : copy.work.playSound}</span>
                      </button>
                    ) : (
                      <button type="button" className="creator-work-pause" aria-label={copy.work.pause} onClick={(event) => { event.stopPropagation(); pausePortfolioVideo(video.source); }}><Pause size={17} fill="currentColor" /></button>
                    )}
                  </div>
                );
              })()}
              <div className="creator-work-caption"><Eyebrow>{video.category}</Eyebrow><h3>{video.title}</h3><p>{video.description}</p></div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="performance" number="02" eyebrow={copy.performance.eyebrow} title={copy.performance.title} intro={copy.performance.intro} className="creator-performance-section">
        <div className="creator-metrics-grid">{localizedSnapshot.map((metric, index) => <MetricCard key={metric.label} {...metric} index={index} onOpen={() => setEvidenceOpen(true)} />)}</div>
        <CreatorEvidence open={evidenceOpen} onToggle={setEvidenceOpen} />
      </Section>

      <Section number="03" eyebrow={copy.pillars.eyebrow} title={copy.pillars.title} intro={copy.pillars.intro} className="creator-pillars-section">
        <div className="creator-pillars">{copy.pillars.items.map((pillar, index) => <motion.div key={pillar} className="creator-pillar" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: reduced ? 0 : index % 2 * 0.1 }}><span className="creator-pillar-number">{String(index + 1).padStart(2, "0")}</span><span>{pillar}</span></motion.div>)}</div>
      </Section>

      <Section id="audience" number="04" eyebrow={copy.audience.eyebrow} title={copy.audience.title} intro={copy.audience.intro}>
        <div className="creator-audience-grid"><AudienceBars title={copy.audience.gender} bars={localizedGender} /><AudienceBars title={copy.audience.age} bars={followerAge} /><AudienceBars title={copy.audience.countries} bars={localizedCountries} /><AudienceBars title={copy.audience.cities} bars={localizedCities} /></div>
      </Section>

      <Section id="services" number="05" eyebrow={copy.services.eyebrow} title={copy.services.title} intro={copy.services.intro} className="creator-services-section">
        <div className="creator-services">{copy.services.offers.map((offer, index) => <motion.a href="#contact" key={offer.title} className="creator-service" aria-label={`${offer.title} — ${copy.services.cta}`} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: reduced ? 0 : index * 0.06 }} whileHover={reduced ? undefined : { x: 6 }} whileTap={reduced ? undefined : { scale: 0.985 }}><span className="creator-service-number">{String(index + 1).padStart(2, "0")}</span><h3>{offer.title}</h3><p>{offer.detail}</p><ArrowRight size={22} aria-hidden="true" /></motion.a>)}</div>
        <div className="creator-services-cta"><a href="#contact" className="creator-text-link">{copy.services.cta}<ArrowRight size={17} /></a></div>
      </Section>

      <section id="contact" className="creator-contact">
        <div className="creator-container">
          <div className="creator-contact-header"><Eyebrow>{copy.contact.eyebrow}</Eyebrow><span aria-hidden="true">06 /</span></div>
          <EditorialReveal><h2>{copy.contact.title}</h2></EditorialReveal>
          <EditorialReveal className="creator-contact-content" delay={0.08}>
            <p>{copy.contact.intro}</p>
            <div className="premium-contact-buttons">
              <a href={creatorLinks.email} aria-label={copy.contact.partnershipEmail}><Mail size={36}/><strong>E-mail</strong></a>
              <a href={creatorLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={36}/><strong>WhatsApp</strong></a>
              <a href={creatorLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={36}/><strong>Instagram</strong></a>
              <a href="https://soundcloud.com/dj-willian-toszan" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud"><Music2 size={36}/><strong>SoundCloud</strong></a>
            </div>
          </EditorialReveal>
          <PortfolioPaths language={language} current="creator" />
          <footer className="creator-footer"><span>{copy.contact.footerLocation}</span><span>{copy.contact.footerRoles}</span></footer>
        </div>
      </section>
    </div>
  );
}
