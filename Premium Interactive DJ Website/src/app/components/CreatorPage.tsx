import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Clapperboard,
  Dumbbell,
  CalendarDays,
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
import creatorPortrait from "../../imports/creator-portrait-transparent.png";
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

function setCreatorMeta(copy: CreatorCopy) {
  document.title = copy.meta.title;
  upsertMeta("name", "description", copy.meta.description);
  upsertMeta("property", "og:title", copy.meta.title);
  upsertMeta("property", "og:description", copy.meta.description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", "https://toszan-media-kit.vercel.app/creator");
  upsertMeta("property", "og:image", "https://toszan-media-kit.vercel.app/creator/posters/lifestyle-dj-day.jpg");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "theme-color", "#0B0B0B");
  upsertCanonical("https://toszan-media-kit.vercel.app/creator");
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: "#FFB000",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.62rem",
        fontWeight: 800,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            className="mt-3"
            style={{
              color: "#ffffff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)",
              letterSpacing: "0.055em",
              lineHeight: 1.02,
            }}
          >
            {title}
          </h2>
          {intro ? (
            <p
              className="mt-4"
              style={{
                color: "rgba(255,255,255,0.58)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(0.92rem, 2vw, 1.05rem)",
                lineHeight: 1.8,
              }}
            >
              {intro}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function PrimaryLink({
  href,
  children,
  icon,
  external = false,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-center"
      style={{
        background: "linear-gradient(135deg, #FFB000, #FF8C00)",
        border: "1px solid rgba(255,176,0,0.75)",
        color: "#0B0B0B",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.68rem",
        fontWeight: 800,
        letterSpacing: "0.2em",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      {children}
      {icon}
    </a>
  );
}

function SecondaryLink({
  href,
  children,
  icon,
  external = false,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-center"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "rgba(255,255,255,0.82)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.68rem",
        fontWeight: 800,
        letterSpacing: "0.2em",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      {children}
      {icon}
    </a>
  );
}

// Animate only verified integer statistics once they enter view.
// Preserve exact values in accessible text and respect reduced-motion settings.
function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const animated = useRef(false);
  useEffect(() => {
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
    <a
      href="/analytics#verified-metrics"
      aria-label={`${label}: ${value}. ${detail}`}
      className="group flex min-h-[135px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-colors duration-200 hover:border-[#FFB000]/55 hover:bg-white/[0.075] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB000]"
    >
      <div
        style={{
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.58rem",
          fontWeight: 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        className="mt-3"
        style={{
          color: "#ffffff",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2rem, 2.9vw, 2.5rem)",
          letterSpacing: "0.06em",
          lineHeight: 0.9,
        }}
      >
        <MetricValue value={value} />
      </div>
      <div
        className="mt-3"
        style={{
          color: "#FFB000",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.78rem",
        }}
      >
        {detail}
        <span className="ml-2 inline-block align-middle text-[#FFB000] opacity-55 transition-opacity group-hover:opacity-100"><ArrowRight size={16}/></span>
      </div>
    </a>
  );
}

function AudienceBars({ title, bars }: { title: string; bars: AudienceBar[] }) {
  return (
    <div
      className="p-5 md:p-6"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
      }}
    >
      <h3
        style={{
          color: "#ffffff",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1rem",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <div className="mt-5 space-y-4">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}>
                {bar.label}
              </span>
              <span style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", fontWeight: 800 }}>
                {bar.value}
              </span>
            </div>
            <div style={{ height: "7px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${bar.percent}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #FFB000, #FF4D00)",
                  borderRadius: "99px",
                }}
              />
            </div>
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
    <div style={{ background: "#0B0B0B", minHeight: "100vh" }}>
      <section
        id="overview"
        className="relative overflow-hidden border-b px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32 lg:min-h-[100svh] lg:pt-28"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 74% 35%, rgba(255,176,0,0.12), transparent 28%), radial-gradient(circle at 12% 80%, rgba(255,77,0,0.08), transparent 30%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="order-1">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex min-h-9 items-center gap-2 rounded-full px-3"
                style={{
                  background: "rgba(255,176,0,0.1)",
                  border: "1px solid rgba(255,176,0,0.28)",
                  color: "#FFB000",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <MapPin size={13} /> {copy.hero.location}
              </span>
              <span
                className="inline-flex min-h-9 items-center gap-2 rounded-full px-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                <BadgeCheck size={13} /> {copy.hero.availability}
              </span>
            </div>

            <div className="mt-7"><Eyebrow>{copy.hero.eyebrow}</Eyebrow></div>
            <h1
              className="mt-4"
              style={{
                color: "#ffffff",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4.6rem, 10vw, 8.8rem)",
                letterSpacing: "0.055em",
                lineHeight: 0.82,
              }}
            >
              WILLIAN<br />TOSZAN
            </h1>
            <h2
              className="mt-6 max-w-3xl"
              style={{
                color: "#FFB000",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1rem, 2.2vw, 1.45rem)",
                fontWeight: 800,
                letterSpacing: "0.13em",
                lineHeight: 1.45,
                textTransform: "uppercase",
              }}
            >
              {copy.hero.headline}
            </h2>
            <p
              className="mt-5 max-w-2xl"
              style={{
                color: "rgba(255,255,255,0.68)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(0.98rem, 1.7vw, 1.14rem)",
                lineHeight: 1.75,
              }}
            >
              {copy.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryLink href="#work" icon={<ArrowRight size={15} />}>
                {copy.hero.work}
              </PrimaryLink>
              <SecondaryLink href="#contact" icon={<Mail size={15} />}>
                {copy.hero.collaboration}
              </SecondaryLink>
              <SecondaryLink href="/analytics" icon={<BarChart3 size={15} />}>
                {copy.hero.analytics}
              </SecondaryLink>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {localizedSnapshot.slice(0, 4).map((metric) => (
                <a key={metric.label} href="/analytics#verified-metrics" className="group transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-[#FFB000]">
                  <div style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", letterSpacing: "0.07em", lineHeight: 1 }}>
                    <MetricValue value={metric.value}/><span className="sr-only">{metric.value}</span>
                  </div>
                  <div className="mt-1" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.17em", textTransform: "uppercase" }}>
                    {metric.label}
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/45">{copy.analyticsPage.month}</p>
          </div>

          <div className="order-2 mx-auto w-full max-w-[520px] lg:max-w-none">
            <div
              className="relative mx-auto aspect-[4/5] max-h-[720px] overflow-hidden rounded-[10px]"
              style={{
                border: "1px solid rgba(255,176,0,0.18)",
                background:
                  "radial-gradient(circle at 55% 32%, rgba(255,176,0,0.12), transparent 42%), linear-gradient(180deg, #171717 0%, #0d0d0d 100%)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              <img
                className="absolute inset-0 h-full w-full object-contain object-bottom"
                src={creatorPortrait}
                alt={copy.hero.alt}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 56%, rgba(11,11,11,0.92) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {copy.hero.roles}
                </div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <span style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.08em" }}>
                    {copy.hero.region}
                  </span>
                  <a
                    href={creatorLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${copy.contact.open} Instagram`}
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "#FFB000", color: "#0B0B0B" }}
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="performance"
        eyebrow={copy.performance.eyebrow}
        title={copy.performance.title}
        intro={copy.performance.intro}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localizedSnapshot.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </Section>

      <Section
        id="work"
        eyebrow={copy.work.eyebrow}
        title={copy.work.title}
        intro={copy.work.intro}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {localizedVideos.map((video) => (
            <article
              key={video.source}
              className="overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            >
              {(() => {
                const isPlaying = activeVideo === video.source && blockedVideo !== video.source;
                return (
              <div
                className="relative aspect-[9/16] overflow-hidden"
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !soundVideo) {
                    void handlePortfolioPlay(video.source, false);
                  }
                }}
                onMouseLeave={() => {
                  if (soundVideo !== video.source) pausePortfolioVideo(video.source);
                }}
              >
                <video
                  className="h-full w-full object-cover"
                  src={video.source}
                  poster={video.poster}
                  muted
                  playsInline
                  preload="metadata"
                  ref={(node) => {
                    videoRefs.current[video.source] = node;
                  }}
                  onPause={() => handlePortfolioPause(video.source)}
                  onEnded={() => handlePortfolioEnded(video.source)}
                  onError={() => handlePortfolioError(video.source)}
                />
                <img
                  src={video.poster}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isPlaying
                      ? "linear-gradient(180deg, transparent 72%, rgba(11,11,11,0.54) 100%)"
                      : "linear-gradient(180deg, rgba(11,11,11,0.08) 0%, rgba(11,11,11,0.18) 46%, rgba(11,11,11,0.86) 100%)",
                    transition: "background 0.25s ease",
                  }}
                />
                <div className="absolute left-4 top-4">
                  <span
                    className="inline-flex min-h-8 items-center justify-center rounded-full px-3"
                    style={{
                      background: "rgba(11,11,11,0.72)",
                      border: "1px solid rgba(255,176,0,0.34)",
                      color: "#FFB000",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {video.hasAudio ? copy.work.contentSample : copy.work.visualSample}
                  </span>
                </div>
                {!isPlaying || soundVideo !== video.source ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePortfolioPlay(video.source, video.hasAudio);
                    }}
                    className="absolute bottom-4 left-4 right-4 flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-center opacity-95 transition-all duration-200 hover:bg-[#FFB000] hover:text-black focus-visible:outline-2 focus-visible:outline-[#FFB000]"
                    style={{
                      background: "rgba(9,9,9,0.82)",
                      border: "1px solid rgba(255,176,0,0.62)",
                      borderRadius: "8px",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 900,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
                    }}
                  >
                    <Play size={15} fill="currentColor" />
                    {video.hasAudio && blockedVideo === video.source
                      ? copy.work.tapAgain
                      : !video.hasAudio
                        ? copy.work.viewSample
                        : copy.work.playSound}
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label={copy.work.pause}
                    onClick={(event) => {
                      event.stopPropagation();
                      pausePortfolioVideo(video.source);
                    }}
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(11,11,11,0.72)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      color: "#ffffff",
                      cursor: "pointer",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <Pause size={16} fill="currentColor" />
                  </button>
                )}
              </div>
                );
              })()}
              <div className="p-5">
                <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                  {video.category}
                </div>
                <h3 className="mt-3" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.1rem", letterSpacing: "0.08em", lineHeight: 0.95 }}>
                  {video.title}
                </h3>
                <p className="mt-4" style={{ color: "rgba(255,255,255,0.56)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.86rem", lineHeight: 1.7 }}>
                  {video.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.pillars.eyebrow}
        title={copy.pillars.title}
        intro={copy.pillars.intro}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {copy.pillars.items.map((pillar) => (
            <div
              key={pillar}
              className="flex min-h-[62px] items-center justify-center p-3 text-center transition-colors hover:border-[#FFB000]/40"
              style={{
                background: "linear-gradient(180deg, rgba(255,176,0,0.08), rgba(255,255,255,0.025))",
                border: "1px solid rgba(255,176,0,0.18)",
                borderRadius: "8px",
                color: "#ffffff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              {pillar}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="audience"
        eyebrow={copy.audience.eyebrow}
        title={copy.audience.title}
        intro={copy.audience.intro}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AudienceBars title={copy.audience.gender} bars={localizedGender} />
          <AudienceBars title={copy.audience.age} bars={followerAge} />
          <AudienceBars title={copy.audience.countries} bars={localizedCountries} />
          <AudienceBars title={copy.audience.cities} bars={localizedCities} />
        </div>
      </Section>

      <Section
        id="services"
        eyebrow={copy.services.eyebrow}
        title={copy.services.title}
        intro={copy.services.intro}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {copy.services.offers.map((offer, index) => {
            const Icon = [Clapperboard, MapPin, Dumbbell, CalendarDays][index];
            return (
              <article
                key={offer.title}
                className="group flex min-h-[148px] flex-col rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-[#FFB000]/45 hover:bg-white/[0.065] sm:min-h-[150px]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#FFB000]/20 bg-[#FFB000]/[0.08] text-[#FFB000]">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className="text-[0.65rem] font-semibold tracking-[0.15em] text-white/30">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-[1.05rem] font-bold leading-snug tracking-[-0.02em] text-white">{offer.title}</h3>
                <p className="mt-1 text-[0.84rem] leading-[1.55] text-white/65">{offer.detail}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center sm:justify-end">
          <a
            href="#contact"
            className="group inline-flex min-h-11 items-center gap-3 border-b border-[#FFB000]/50 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FFB000] transition-colors hover:border-[#FFD063] hover:text-[#FFD063] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB000]"
          >
            {copy.services.cta}
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Section>

      <section id="contact" className="relative overflow-hidden border-t border-[#FFB000]/20 bg-[#11100e] px-5 py-16 text-center md:px-10 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,176,0,0.11),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl">
          <Eyebrow>{copy.contact.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-3xl break-words font-['Bebas_Neue'] text-[clamp(2.7rem,5.5vw,4.7rem)] leading-[1.03] tracking-[0.045em] text-white">
            {copy.contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-[1.8] text-white/70 md:text-base">
            {copy.contact.intro}
          </p>
          <div className="mx-auto mt-9 grid max-w-3xl gap-4 sm:grid-cols-2">
            <a href={creatorLinks.email} className="group flex min-h-[115px] items-center justify-between gap-4 rounded-lg border border-[#FFB000]/70 bg-[#FFB000] p-5 text-left text-[#0B0B0B] transition-transform duration-200 hover:-translate-y-1 hover:bg-[#FFD063] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FFB000] md:p-6">
              <span className="min-w-0"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"><Mail size={18}/>{copy.contact.partnershipEmail}</span><span className="mt-2 block break-all text-sm font-semibold">dj@toszan.com.br</span></span>
              <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={creatorLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex min-h-[115px] items-center justify-between gap-4 rounded-lg border border-white/25 bg-white/[0.055] p-5 text-left text-white transition-transform duration-200 hover:-translate-y-1 hover:border-[#FFB000]/60 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FFB000] md:p-6">
              <span className="min-w-0"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFB000]"><MessageCircle size={18}/>WhatsApp</span><span className="mt-2 block text-sm font-semibold">+39 342 836 9444</span></span>
              <ArrowRight size={22} className="shrink-0 text-[#FFB000] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
            <a href={creatorLinks.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[#FFB000] focus-visible:outline-2 focus-visible:outline-[#FFB000]"><Instagram size={16}/>{copy.contact.instagram}<ExternalLink size={13}/></a>
            <a href={creatorLinks.analytics} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[#FFB000] focus-visible:outline-2 focus-visible:outline-[#FFB000]"><BarChart3 size={16}/>{copy.contact.analytics}<ArrowRight size={14}/></a>
          </div>
          <footer className="mt-14 border-t border-white/10 pt-6 text-[0.69rem] uppercase tracking-[0.08em] text-white/45">
            <div className="flex flex-col items-center justify-between gap-2 sm:flex-row"><span>{copy.contact.footerLocation}</span><span>{copy.contact.footerRoles}</span></div>
          </footer>
        </div>
      </section>
    </div>
  );
}
