import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  collaborationFormats,
  contentPillars,
  creatorLinks,
  creatorSnapshot,
  creatorStats,
  creatorVideos,
  followerAge,
  followerGender,
  topCities,
  topCountries,
  type AudienceBar,
} from "../../data/creatorStats";

const CREATOR_DESCRIPTION =
  "Brazilian creator based in Milan. European lifestyle, fitness, travel, menswear, nightlife and music for premium brand collaborations.";

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

function setCreatorMeta() {
  document.title = "WILLIAN TOSZAN | Brazilian Creator Based in Milan";
  upsertMeta("name", "description", CREATOR_DESCRIPTION);
  upsertMeta("property", "og:title", "WILLIAN TOSZAN | Brazilian Creator Based in Milan");
  upsertMeta("property", "og:description", CREATOR_DESCRIPTION);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", "https://toszan-media-kit.vercel.app/creator");
  upsertMeta("property", "og:image", "https://toszan-media-kit.vercel.app/creator/posters/winter-lifestyle-milan.jpg");
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
    <section id={id} className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            className="mt-3"
            style={{
              color: "#ffffff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5.8rem)",
              letterSpacing: "0.08em",
              lineHeight: 0.95,
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

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div
      className="min-h-[138px] p-5"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
      }}
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
        className="mt-4"
        style={{
          color: "#ffffff",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "2.8rem",
          letterSpacing: "0.06em",
          lineHeight: 0.9,
        }}
      >
        {value}
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
      </div>
    </div>
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
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [soundVideo, setSoundVideo] = useState<string | null>(null);
  const [blockedVideo, setBlockedVideo] = useState<string | null>(null);

  useEffect(() => {
    setCreatorMeta();
  }, []);

  const stopOtherVideos = (activeSource: string) => {
    Object.entries(videoRefs.current).forEach(([source, video]) => {
      if (!video || source === activeSource) return;
      video.pause();
      video.muted = true;
      video.volume = 0;
    });
    setActiveVideo((current) => (current && current !== activeSource ? null : current));
    setSoundVideo((current) => (current && current !== activeSource ? null : current));
    setBlockedVideo((current) => (current && current !== activeSource ? null : current));
  };

  const handlePortfolioPlay = async (source: string, hasAudio: boolean) => {
    const video = videoRefs.current[source];
    if (!video) return;

    stopOtherVideos(source);
    video.currentTime = video.currentTime || 0;

    if (!hasAudio) {
      video.muted = true;
      video.volume = 0;
      setActiveVideo(source);
      setSoundVideo(null);
      setBlockedVideo(null);
      try {
        await video.play();
      } catch {
        setActiveVideo(null);
        setBlockedVideo(source);
      }
      return;
    }

    video.muted = false;
    video.volume = 1;
    setActiveVideo(source);
    setBlockedVideo(null);

    try {
      await video.play();
      setSoundVideo(source);
    } catch {
      video.muted = true;
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
    setSoundVideo((current) => (current === source ? null : current));
  };

  const handlePortfolioError = (source: string) => {
    setActiveVideo((current) => (current === source ? null : current));
    setSoundVideo((current) => (current === source ? null : current));
    setBlockedVideo(source);
  };

  return (
    <div style={{ background: "#0B0B0B", minHeight: "100vh" }}>
      <section className="relative min-h-[92vh] overflow-hidden px-5 pb-12 pt-28 md:px-10 md:pt-32 lg:pb-16 lg:pt-36">
        <img
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
          src="/creator/posters/winter-lifestyle-milan.jpg"
          alt=""
          aria-hidden="true"
          style={{ objectPosition: "center top", opacity: 0.5 }}
        />
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <img
            className="h-full w-full object-contain object-right"
            src="/creator/posters/winter-lifestyle-milan.jpg"
            alt=""
            aria-hidden="true"
            style={{ opacity: 0.7 }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,11,11,0.97) 0%, rgba(11,11,11,0.78) 48%, rgba(11,11,11,0.34) 100%), linear-gradient(180deg, rgba(11,11,11,0.08) 0%, #0B0B0B 98%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end gap-8 lg:min-h-[72vh] lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Creator portfolio</Eyebrow>
            <h1
              className="mt-4"
              style={{
                color: "#ffffff",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 15vw, 10rem)",
                letterSpacing: "0.07em",
                lineHeight: 0.82,
              }}
            >
              WILLIAN TOSZAN
            </h1>
            <h2
              className="mt-5"
              style={{
                color: "#FFB000",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.05rem, 3vw, 1.6rem)",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Brazilian Creator Based in Milan
            </h2>
            <p
              className="mt-5 max-w-2xl"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.22rem)",
                lineHeight: 1.75,
              }}
            >
              European lifestyle, fitness, travel, menswear, nightlife and music. DJ identity is the differentiator, not the whole story.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryLink href="#contact" icon={<ArrowRight size={15} />}>
                Work With Me
              </PrimaryLink>
              <SecondaryLink href="/analytics" icon={<BarChart3 size={15} />}>
                View Analytics
              </SecondaryLink>
              <SecondaryLink href={creatorLinks.instagram} external icon={<Instagram size={15} />}>
                Instagram
              </SecondaryLink>
            </div>
          </div>

          <div
            className="grid w-full max-w-sm grid-cols-2 gap-3 lg:max-w-[330px]"
            style={{ color: "#ffffff" }}
          >
            {creatorSnapshot.slice(0, 4).map((metric) => (
              <div
                key={metric.label}
                className="p-4"
                style={{
                  background: "rgba(11,11,11,0.62)",
                  border: "1px solid rgba(255,176,0,0.22)",
                  borderRadius: "8px",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div style={{ color: "#FFB000", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.08em", lineHeight: 1 }}>
                  {metric.value}
                </div>
                <div style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        eyebrow="Audience snapshot"
        title="Real Instagram Numbers"
        intro={`Numbers based on recent Instagram Insights, ${creatorStats.dateRange}. Updated monthly.`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creatorSnapshot.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </Section>

      <Section
        id="work"
        eyebrow="Selected content"
        title="Premium Creator Portfolio"
        intro="Commercial samples for fashion, product, Milan lifestyle, fitness communication and DJ-adjacent nightlife identity."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {creatorVideos.map((video) => (
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
                onClick={() => {
                  if (isPlaying) {
                    videoRefs.current[video.source]?.pause();
                  }
                }}
                style={{ cursor: isPlaying ? "pointer" : "default" }}
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
                    {video.hasAudio ? "Content sample" : "Visual sample"}
                  </span>
                </div>
                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={() => handlePortfolioPlay(video.source, video.hasAudio)}
                    className="absolute left-4 right-4 top-1/2 flex min-h-12 -translate-y-1/2 items-center justify-center gap-2 px-4"
                    style={{
                      background: video.hasAudio ? "linear-gradient(135deg, #FFB000, #FF8C00)" : "rgba(255,255,255,0.88)",
                      border: "1px solid rgba(255,176,0,0.7)",
                      borderRadius: "8px",
                      color: "#0B0B0B",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 900,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
                    }}
                  >
                    <Play size={15} fill="currentColor" />
                    {blockedVideo === video.source
                      ? "Tap again to enable sound"
                      : !video.hasAudio
                        ? "View sample"
                        : "Play with sound"}
                  </button>
                ) : null}
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
        eyebrow="Content pillars"
        title="Lifestyle With a Point of View"
        intro="The audience follows a Brazilian creator living in Europe: Milan, body transformation, menswear, travel, nightlife and music all sit inside one recognizable identity."
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {contentPillars.map((pillar) => (
            <div
              key={pillar}
              className="min-h-[108px] p-5"
              style={{
                background: "linear-gradient(180deg, rgba(255,176,0,0.08), rgba(255,255,255,0.025))",
                border: "1px solid rgba(255,176,0,0.18)",
                borderRadius: "8px",
                color: "#ffffff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.92rem",
                fontWeight: 800,
                letterSpacing: "0.05em",
              }}
            >
              {pillar}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Audience profile"
        title="Brazilian Reach, European Context"
        intro="The core follower profile is male, 25-44, with strong Brazil and Italy signals plus visible Europe and US interest."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AudienceBars title="Follower gender" bars={followerGender} />
          <AudienceBars title="Follower age" bars={followerAge} />
          <AudienceBars title="Top countries" bars={topCountries} />
          <AudienceBars title="Top cities" bars={topCities} />
        </div>
      </Section>

      <Section
        eyebrow="Brand fit"
        title="Why Brands Work With This Profile"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="p-6 md:p-8"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
          >
            <Sparkles color="#FFB000" size={24} />
            <p
              className="mt-5"
              style={{
                color: "rgba(255,255,255,0.68)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.18rem)",
                lineHeight: 1.85,
              }}
            >
              Willian gives brands a creator who can speak to Brazil while living inside a European visual world. The content has a clear face, body transformation credibility, Milan styling, nightlife energy and a DJ edge that makes campaigns feel more alive than generic UGC.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {collaborationFormats.slice(0, 6).map((format) => (
              <div
                key={format}
                className="flex items-center gap-3 p-4"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.9rem",
                }}
              >
                <ShieldCheck color="#FFB000" size={18} />
                {format}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Request Collaboration"
        intro="For agencies, hotels, tourism boards, fashion, fitness, lifestyle, nightlife and event brands."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { icon: <Mail size={18} />, label: "Email", value: "dj@toszan.com.br", href: creatorLinks.email, external: false },
            { icon: <MessageCircle size={18} />, label: "WhatsApp", value: "+39 342 836 9444", href: creatorLinks.whatsapp, external: true },
            { icon: <Instagram size={18} />, label: "Instagram", value: "@toszan.willian", href: creatorLinks.instagram, external: true },
            { icon: <BriefcaseBusiness size={18} />, label: "Media Kit", value: "DJ + brand page", href: creatorLinks.mediaKit, external: false },
            { icon: <BarChart3 size={18} />, label: "Analytics", value: "Verified screenshots", href: creatorLinks.analytics, external: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="group flex min-h-[184px] flex-col justify-between p-5"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(255,176,0,0.12)", color: "#FFB000" }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.09em", lineHeight: 1 }}>
                  {item.label}
                </div>
                <div className="mt-3" style={{ color: "rgba(255,255,255,0.54)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.84rem", lineHeight: 1.55 }}>
                  {item.value}
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2" style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Open
                <ExternalLink size={13} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryLink href={creatorLinks.email} icon={<ArrowRight size={15} />}>
            Request Collaboration
          </PrimaryLink>
          <SecondaryLink href="/booking" icon={<MapPin size={15} />}>
            Book TOSZAN
          </SecondaryLink>
        </div>
      </Section>
    </div>
  );
}
