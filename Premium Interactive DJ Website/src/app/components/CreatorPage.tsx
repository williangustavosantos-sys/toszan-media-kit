import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Pause,
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

import creatorPortrait from "../../imports/creator-portrait-editorial.webp";
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
        <div className="creator-section-heading">
          <div className="creator-section-index"><span aria-hidden="true">{number}</span><Eyebrow>{eyebrow}</Eyebrow></div>
          <div className="creator-section-heading-copy">
            <h2>{title}</h2>
            {intro ? <p>{intro}</p> : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function PrimaryLink({ href, children, icon, external = false }: {
  href: string; children: ReactNode; icon?: ReactNode; external?: boolean;
}) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="creator-button creator-button-primary">{children}{icon}</a>;
}

function SecondaryLink({ href, children, icon, external = false }: {
  href: string; children: ReactNode; icon?: ReactNode; external?: boolean;
}) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="creator-button creator-button-secondary">{children}{icon}</a>;
}

// Animate only verified integer statistics once they enter view.
// Preserve exact values in accessible text and respect reduced-motion settings.
function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const animated = useRef(false);
  useEffect(() => {
    animated.current = false;
    setDisplay(value);
    const match = value.match(/^(\+?)([0-9][0-9,.]*)$/);
    if (!match || !ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const amount = Number(match[2].replace(/[,.]/g, ""));
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting || animated.current) return;
      animated.current = true;
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 650);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(match[1] + Math.round(amount * eased).toLocaleString(value.includes(".") ? "it-IT" : "en-US"));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref} aria-hidden="true">{display}</span>;
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <a href="/analytics#verified-metrics" aria-label={`${label}: ${value}. ${detail}`} className="creator-metric">
      <span className="creator-metric-label">{label}<ArrowRight size={15} aria-hidden="true" /></span>
      <span className="creator-metric-value"><MetricValue value={value} /></span>
      <span className="creator-metric-detail">{detail}</span>
    </a>
  );
}

function AudienceBars({ title, bars }: { title: string; bars: AudienceBar[] }) {
  return (
    <div className="creator-audience-panel">
      <h3>{title}</h3>
      <div className="creator-audience-bars">
        {bars.map((bar) => (
          <div key={bar.label} className="creator-audience-row">
            <div className="creator-audience-label"><span>{bar.label}</span><span>{bar.value}</span></div>
            <div className="creator-audience-track"><div style={{ width: `${bar.percent}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreatorPage() {
  const { language } = useLanguage();
  const copy = creatorCopy[getCreatorLanguage(language)];
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [blockedVideo, setBlockedVideo] = useState<string | null>(null);
  const [soundVideo, setSoundVideo] = useState<string | null>(null);

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
    });
    setActiveVideo((current) => (current && current !== activeSource ? null : current));
    setBlockedVideo((current) => (current && current !== activeSource ? null : current));
    setSoundVideo((current) => (current && current !== activeSource ? null : current));
  };

  const handlePortfolioPlay = async (source: string, hasAudio: boolean) => {
    const video = videoRefs.current[source];
    if (!video) return;

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
        setActiveVideo(source);
      } catch {
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
      // Keep the media element aligned with React's rendered `muted` prop
      // after the asynchronous play request completes.
      video.defaultMuted = false;
      video.muted = false;
      video.volume = 1;
      setActiveVideo(source);
      setSoundVideo(source);
    } catch {
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
    setActiveVideo((current) => (current === source ? null : current));
  };

  const handlePortfolioError = (source: string) => {
    setActiveVideo((current) => (current === source ? null : current));
    setBlockedVideo(source);
  };

  const pausePortfolioVideo = (source: string) => {
    videoRefs.current[source]?.pause();
    setActiveVideo((current) => (current === source ? null : current));
    setSoundVideo((current) => (current === source ? null : current));
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          video.pause();
          const source = video.getAttribute("src");
          if (source) {
            setActiveVideo((current) => current === source ? null : current);
            setSoundVideo((current) => current === source ? null : current);
          }
        }
      });
    }, { threshold: 0.12 });
    Object.values(videoRefs.current).forEach((video) => { if (video) observer.observe(video); });
    const pauseHidden = () => { if (document.hidden) Object.values(videoRefs.current).forEach((video) => video?.pause()); };
    document.addEventListener("visibilitychange", pauseHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseHidden); };
  }, []);

  return (
    <div className="cinematic-creator">
      <section id="overview" className="creator-hero">
        <div className="creator-hero-ambient" aria-hidden="true" />
        <div className="creator-container creator-hero-grid">
          <div className="creator-hero-copy">
            <div className="creator-hero-topline"><Eyebrow>{copy.hero.eyebrow}</Eyebrow><span className="creator-location"><MapPin size={12} />{copy.hero.location}</span></div>
            <h1 className="creator-hero-name"><span>WILLIAN</span><span>TOSZAN<span className="creator-name-period">.</span></span></h1>
            <div className="creator-hero-statement">
              <h2>{copy.hero.headline}</h2>
              <p>{copy.hero.description}</p>
            </div>
            <div className="creator-hero-actions">
              <PrimaryLink href="#work" icon={<ArrowRight size={16} />}>{copy.hero.work}</PrimaryLink>
              <SecondaryLink href="#contact" icon={<Mail size={15} />}>{copy.hero.collaboration}</SecondaryLink>
            </div>
            <a href="/analytics" className="creator-text-link creator-hero-analytics"><BarChart3 size={14} />{copy.hero.analytics}<ArrowRight size={14} /></a>
          </div>
          <figure className="creator-hero-portrait">
            <span className="creator-portrait-word" aria-hidden="true">CREATOR</span>
            <div className="creator-portrait-light" aria-hidden="true" />
            <img src={creatorPortrait} alt={copy.hero.alt} width={960} height={1280} loading="eager" decoding="async" fetchPriority="high" />
            <figcaption><span>{copy.hero.roles}</span><span>{copy.hero.region}</span></figcaption>
          </figure>
          <div className="creator-hero-foot">
            <span className="creator-availability"><i aria-hidden="true" />{copy.hero.availability}</span>
            <span className="creator-hero-edition">{copy.analyticsPage.month}</span>
            <a href="#performance" className="creator-scroll-cue" aria-label={copy.performance.eyebrow}><span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <div className="creator-quick-stats creator-container">
        {localizedSnapshot.slice(0, 4).map((metric) => (
          <a key={metric.label} href="/analytics#verified-metrics" className="creator-quick-stat">
            <span className="creator-quick-stat-value"><MetricValue value={metric.value} /><span className="sr-only">{metric.value}</span></span>
            <span>{metric.label}</span>
          </a>
        ))}
      </div>

      <Section id="work" number="01" eyebrow={copy.work.eyebrow} title={copy.work.title} intro={copy.work.intro} className="creator-work-section">
        <div className="creator-portfolio">
          {localizedVideos.map((video, index) => (
            <article key={video.source} className={`creator-work-item ${index < 2 ? "creator-work-featured" : ""}`}>
              {(() => {
                const isPlaying = activeVideo === video.source && blockedVideo !== video.source;
                return (
                  <div className="creator-work-media" onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !soundVideo) void handlePortfolioPlay(video.source, false);
                  }} onMouseLeave={() => { if (soundVideo !== video.source) pausePortfolioVideo(video.source); }}>
                    <video className="creator-work-video" src={video.source} poster={video.poster} muted playsInline preload="metadata" ref={(node) => { videoRefs.current[video.source] = node; }} onPause={() => handlePortfolioPause(video.source)} onEnded={() => handlePortfolioEnded(video.source)} onError={() => handlePortfolioError(video.source)} />
                    <img src={video.poster} alt="" aria-hidden="true" loading="lazy" className={`creator-work-poster ${isPlaying ? "is-playing" : ""}`} />
                    <div className="creator-work-scrim" aria-hidden="true" />
                    <div className="creator-work-media-heading"><span>{String(index + 1).padStart(2, "0")}</span><span>{video.hasAudio ? copy.work.contentSample : copy.work.visualSample}</span></div>
                    {!isPlaying || soundVideo !== video.source ? (
                      <button type="button" className="creator-work-play" onClick={(event) => { event.stopPropagation(); void handlePortfolioPlay(video.source, video.hasAudio); }}>
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
            </article>
          ))}
        </div>
      </Section>

      <Section id="performance" number="02" eyebrow={copy.performance.eyebrow} title={copy.performance.title} intro={copy.performance.intro} className="creator-performance-section">
        <div className="creator-metrics-grid">{localizedSnapshot.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div>
      </Section>

      <Section number="03" eyebrow={copy.pillars.eyebrow} title={copy.pillars.title} intro={copy.pillars.intro} className="creator-pillars-section">
        <div className="creator-pillars">{copy.pillars.items.map((pillar, index) => <div key={pillar} className="creator-pillar"><span className="creator-pillar-number">{String(index + 1).padStart(2, "0")}</span><span>{pillar}</span><ArrowRight size={20} aria-hidden="true" /></div>)}</div>
      </Section>

      <Section id="audience" number="04" eyebrow={copy.audience.eyebrow} title={copy.audience.title} intro={copy.audience.intro}>
        <div className="creator-audience-grid"><AudienceBars title={copy.audience.gender} bars={localizedGender} /><AudienceBars title={copy.audience.age} bars={followerAge} /><AudienceBars title={copy.audience.countries} bars={localizedCountries} /><AudienceBars title={copy.audience.cities} bars={localizedCities} /></div>
      </Section>

      <Section id="services" number="05" eyebrow={copy.services.eyebrow} title={copy.services.title} intro={copy.services.intro} className="creator-services-section">
        <div className="creator-services">{copy.services.offers.map((offer, index) => <article key={offer.title} className="creator-service"><span className="creator-service-number">{String(index + 1).padStart(2, "0")}</span><h3>{offer.title}</h3><p>{offer.detail}</p><ArrowRight size={22} aria-hidden="true" /></article>)}</div>
        <div className="creator-services-cta"><a href="#contact" className="creator-text-link">{copy.services.cta}<ArrowRight size={17} /></a></div>
      </Section>

      <section id="contact" className="creator-contact">
        <div className="creator-container">
          <div className="creator-contact-header"><Eyebrow>{copy.contact.eyebrow}</Eyebrow><span aria-hidden="true">06 /</span></div>
          <h2>{copy.contact.title}<span aria-hidden="true">↗</span></h2>
          <div className="creator-contact-content">
            <p>{copy.contact.intro}</p>
            <div className="creator-contact-links">
              <a href={creatorLinks.email} className="creator-contact-link"><span><span className="creator-contact-link-label"><Mail size={14} />{copy.contact.partnershipEmail}</span><span>dj@toszan.com.br</span></span><ArrowRight size={24} /></a>
              <a href={creatorLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="creator-contact-link"><span><span className="creator-contact-link-label"><MessageCircle size={14} />WhatsApp</span><span>+39 342 836 9444</span></span><ArrowRight size={24} /></a>
              <div className="creator-contact-socials"><a href={creatorLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={15} />{copy.contact.instagram}<ExternalLink size={12} /></a><a href={creatorLinks.analytics}><BarChart3 size={15} />{copy.contact.analytics}<ArrowRight size={13} /></a></div>
            </div>
          </div>
          <footer className="creator-footer"><span>{copy.contact.footerLocation}</span><span>{copy.contact.footerRoles}</span></footer>
        </div>
      </section>
    </div>
  );
}
