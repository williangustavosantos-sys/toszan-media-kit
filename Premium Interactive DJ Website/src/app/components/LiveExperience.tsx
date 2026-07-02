import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ExternalLink, Radio, Users, VolumeX, Zap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Reel = {
  id: string;
  title: string;
  subtitle: string;
  proof: string;
  score: string;
  duration: string;
  poster: string;
  video: string;
  url?: string;
  format?: "vertical" | "wide";
  featured?: boolean;
};

const reels: Reel[] = [
  {
    id: "wide-crowd-room-proof",
    title: "Room Proof",
    subtitle: "Wide crowd density",
    proof: "Fastest proof that the room is active: visible floor, lights, bodies and momentum.",
    score: "Best first signal",
    duration: "0:14",
    poster: "/reels/posters/09-wide-crowd-room-proof.webp",
    video: "/reels/videos/09-wide-crowd-room-proof.mp4",
    format: "wide",
    featured: true,
  },
  {
    id: "front-booth-energy",
    title: "Booth Presence",
    subtitle: "Close DJ control",
    proof: "Strong close-up performance clip: clear face, hands, booth confidence and camera-ready energy.",
    score: "Best visual authority",
    duration: "0:16",
    poster: "/reels/posters/01-booth-control-front-closeup.webp",
    video: "/reels/videos/01-booth-control-front-closeup.mp4",
    featured: true,
  },
  {
    id: "DXuofeFjbEw",
    title: "Booth Control",
    subtitle: "Hands on decks",
    proof: "Close proof that he is working the booth, not only posing for camera.",
    score: "Best DJ authority",
    duration: "0:13",
    poster: "/reels/posters/03-deck-control-overhead.webp",
    video: "/reels/videos/03-deck-control-overhead.mp4",
    url: "https://www.instagram.com/reel/DXuofeFjbEw/",
    featured: true,
  },
  {
    id: "DVq5qliDUiC",
    title: "Crowd Command",
    subtitle: "Mic, booth and response",
    proof: "Shows stage command, crowd contact and DJ presence in the same clip.",
    score: "Best for promoters",
    duration: "0:18",
    poster: "/reels/posters/08-mic-crowd-command-booth.webp",
    video: "/reels/videos/08-mic-crowd-command-booth.mp4",
    url: "https://www.instagram.com/reel/DVq5qliDUiC/",
  },
  {
    id: "DZ7HQMft0Qg",
    title: "Pride Identity",
    subtitle: "Camera proximity",
    proof: "Strong face, queer-nightlife fit and social clip potential without replacing the DJ story.",
    score: "Commercial identity",
    duration: "0:12",
    poster: "/reels/posters/02-crowd-proximity-selfie-booth.webp",
    video: "/reels/videos/02-crowd-proximity-selfie-booth.mp4",
    url: "https://www.instagram.com/reel/DZ7HQMft0Qg/",
  },
  {
    id: "DXpFqK1jfeI",
    title: "Dancefloor Heat",
    subtitle: "Room atmosphere",
    proof: "Club atmosphere with smoke, lights and crowd movement in a short buyer-safe preview.",
    score: "Energy support",
    duration: "0:16",
    poster: "/reels/posters/07-yellow-fog-crowd-support.webp",
    video: "/reels/videos/07-yellow-fog-crowd-support.mp4",
    url: "https://www.instagram.com/reel/DXpFqK1jfeI/",
  },
  {
    id: "DXzr2dDoBJx",
    title: "Peak Moment",
    subtitle: "Wide stage proof",
    proof: "Useful supporting clip for stage scale, lights and peak-time atmosphere.",
    score: "Peak support",
    duration: "0:16",
    poster: "/reels/posters/04-wide-stage-manicomio-smoke.webp",
    video: "/reels/videos/04-wide-stage-manicomio-smoke.mp4",
    url: "https://www.instagram.com/reel/DXzr2dDoBJx/",
  },
  {
    id: "raised-hands-cue",
    title: "Raised Hands Cue",
    subtitle: "Balcony command",
    proof: "Short clip with stage gesture and room response; useful as a fast secondary proof point.",
    score: "Stage cue",
    duration: "0:15",
    poster: "/reels/posters/06-balcony-stage-raised-hands.webp",
    video: "/reels/videos/06-balcony-stage-raised-hands.mp4",
  },
  {
    id: "extended-booth-run",
    title: "Extended Booth Run",
    subtitle: "Preview cut",
    proof: "A shorter cut from the long source for agencies that want extra raw performance texture.",
    score: "Archive asset",
    duration: "0:16",
    poster: "/reels/posters/05-peak-booth-camera-presence-long.webp",
    video: "/reels/videos/05-peak-booth-camera-presence-long.mp4",
  },
];

const bookingSignals = [
  { icon: <Radio size={18} />, label: "Controls the room", value: "floor, booth and stage proof" },
  { icon: <Users size={18} />, label: "Built for crowds", value: "club, circuit and beach energy" },
  { icon: <Zap size={18} />, label: "Fast on mobile", value: "one active video at a time" },
];

function AutoplayVideoCard({
  reel,
  active,
  onActivate,
  index,
  saveData,
  reduceMotion,
  variant = "standard",
}: {
  reel: Reel;
  active: boolean;
  onActivate: (id: string) => void;
  index: number;
  saveData: boolean;
  reduceMotion: boolean;
  variant?: "feature" | "standard";
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const isWide = reel.format === "wide";
  const isFeature = variant === "feature";
  const shouldPlayVideo = active && !saveData && !reduceMotion;

  useEffect(() => {
    setVideoReady(false);
  }, [reel.id, shouldPlayVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlayVideo) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => undefined);

    return () => {
      video.pause();
    };
  }, [shouldPlayVideo]);

  const activate = () => onActivate(reel.id);

  return (
    <motion.article
      data-reel-id={reel.id}
      data-featured={reel.featured ? "true" : "false"}
      tabIndex={0}
      aria-label={`${reel.title}: ${reel.proof}`}
      onPointerEnter={activate}
      onFocus={activate}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("a")) activate();
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.52, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      className="group relative isolate overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB000]/80"
      style={{
        aspectRatio: isWide ? "4 / 3" : "9 / 16",
        borderRadius: "14px",
        border: active ? "1px solid rgba(255,176,0,0.58)" : "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.025)",
        boxShadow: active
          ? "0 26px 90px rgba(255,176,0,0.14), 0 20px 72px rgba(0,0,0,0.44)"
          : "0 16px 44px rgba(0,0,0,0.28)",
        contain: "layout paint style",
        cursor: "pointer",
        transform: "translateZ(0)",
      }}
    >
      <img
        src={reel.poster}
        alt=""
        aria-hidden="true"
        loading={reel.featured ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={reel.featured ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "brightness(0.78) saturate(1.12) contrast(1.08)",
          transform: "scale(1.01)",
        }}
      />

      {shouldPlayVideo ? (
        <video
          ref={videoRef}
          key={reel.video}
          poster={reel.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          className="autoplay-video absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "brightness(0.78) saturate(1.14) contrast(1.08)",
            opacity: videoReady ? 1 : 0,
            transform: "scale(1.01)",
            transition: "opacity 220ms ease",
          }}
        >
          <source src={reel.video} type="video/mp4" />
        </video>
      ) : null}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.04) 0%, rgba(5,5,5,0.18) 38%, rgba(5,5,5,0.88) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-24 opacity-80" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)" }} />

      <div className="absolute left-3 top-3 flex max-w-[calc(100%-24px)] items-center gap-2 md:left-4 md:top-4">
        <span
          style={{
            border: "1px solid rgba(255,176,0,0.42)",
            background: "rgba(11,11,11,0.74)",
            color: "#FFB000",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.22em",
            padding: "6px 8px",
            textTransform: "uppercase",
          }}
        >
          Live Proof
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.76)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.56rem",
            padding: "6px 8px",
          }}
        >
          {reel.duration}
        </span>
      </div>

      <div
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full md:right-4 md:top-4"
        style={{
          background: "rgba(11,11,11,0.58)",
          border: active ? "1px solid rgba(255,176,0,0.36)" : "1px solid rgba(255,255,255,0.1)",
          color: active ? "#FFB000" : "#ffffff",
        }}
      >
        <VolumeX size={17} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <div
          style={{
            color: "#FFB000",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.54rem",
            letterSpacing: "0.28em",
            marginBottom: "9px",
            textTransform: "uppercase",
          }}
        >
          {reel.score}
        </div>
        <h3
          style={{
            color: "#ffffff",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isFeature ? "clamp(2.35rem, 4.8vw, 4.9rem)" : "clamp(1.9rem, 3.2vw, 2.85rem)",
            letterSpacing: "0.08em",
            lineHeight: 0.94,
            marginBottom: "8px",
          }}
        >
          {reel.title}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            marginBottom: "9px",
            textTransform: "uppercase",
          }}
        >
          {reel.subtitle}
        </p>
        <p
          className={isWide ? "hidden sm:block" : undefined}
          style={{
            color: "rgba(255,255,255,0.54)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.78rem",
            lineHeight: 1.55,
            maxWidth: isWide ? "560px" : "none",
          }}
        >
          {reel.proof}
        </p>
        {reel.url ? (
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 px-4"
            style={{
              border: "1px solid rgba(255,176,0,0.24)",
              background: "rgba(255,176,0,0.06)",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Official Reel
            <ExternalLink size={14} />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function LiveExperience() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const reducedMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string | null>(reels[0].id);
  const [saveData, setSaveData] = useState(false);
  const featuredReels = reels.slice(0, 3);
  const supportingReels = reels.slice(3);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const visibility = new Map<string, { ratio: number; rect: DOMRectReadOnly; featured: boolean }>();
    let frame = 0;

    const selectActive = () => {
      frame = 0;
      const viewportCenter = window.innerHeight * 0.5;
      let bestId: string | null = null;
      let bestScore = -Infinity;

      visibility.forEach((entry, id) => {
        if (entry.ratio < 0.12) return;

        const center = entry.rect.top + entry.rect.height / 2;
        const centerPenalty = Math.abs(center - viewportCenter) / Math.max(window.innerHeight, 1);
        const wideBonus = entry.rect.width > entry.rect.height ? 0.05 : 0;
        const featuredBonus = entry.featured ? 0.04 : 0;
        const score = entry.ratio + wideBonus + featuredBonus - centerPenalty * 0.32;

        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      });

      setActiveId((current) => (current === bestId ? current : bestId));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const id = target.dataset.reelId;
          if (!id) return;

          visibility.set(id, {
            ratio: entry.intersectionRatio,
            rect: entry.boundingClientRect,
            featured: target.dataset.featured === "true",
          });
        });

        if (!frame) frame = window.requestAnimationFrame(selectActive);
      },
      {
        root: null,
        rootMargin: "180px 0px 180px 0px",
        threshold: [0, 0.12, 0.25, 0.45, 0.65, 0.85, 1],
      },
    );

    section.querySelectorAll<HTMLElement>("[data-reel-id]").forEach((card) => observer.observe(card));

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const activateReel = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden px-5 py-24 md:px-12"
      style={{ background: "#0B0B0B" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,176,0,0.06) 0%, transparent 48%), radial-gradient(circle at 85% 32%, rgba(0,168,107,0.05) 0%, transparent 34%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          ref={titleRef}
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
              {t("experience.label")}
            </span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "0.06em", color: "#ffffff", lineHeight: 1 }}>
            {t("experience.title")}
          </h2>
          <p className="mt-5 max-w-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.92rem", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", letterSpacing: "0.03em" }}>
            Fast live proof for buyers: short local previews, instant posters and one active muted video to protect mobile FPS.
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {bookingSignals.map((signal, index) => (
            <motion.div
              key={signal.label}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: index * 0.04 }}
              className="flex items-center gap-4 rounded-xl px-5 py-4"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ color: "#FFB000", background: "rgba(255,176,0,0.08)" }}>
                {signal.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#ffffff", fontSize: "1.4rem", letterSpacing: "0.08em", lineHeight: 1 }}>
                  {signal.label}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.42)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {signal.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <div className="md:col-span-2 lg:col-span-6">
            <AutoplayVideoCard reel={featuredReels[0]} active={activeId === featuredReels[0].id} onActivate={activateReel} index={0} saveData={saveData} reduceMotion={reducedMotion} variant="feature" />
          </div>
          <div className="md:col-span-1 lg:col-span-3">
            <AutoplayVideoCard reel={featuredReels[1]} active={activeId === featuredReels[1].id} onActivate={activateReel} index={1} saveData={saveData} reduceMotion={reducedMotion} variant="feature" />
          </div>
          <div className="md:col-span-1 lg:col-span-3">
            <AutoplayVideoCard reel={featuredReels[2]} active={activeId === featuredReels[2].id} onActivate={activateReel} index={2} saveData={saveData} reduceMotion={reducedMotion} variant="feature" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supportingReels.map((reel, index) => (
            <AutoplayVideoCard
              key={reel.id}
              reel={reel}
              active={activeId === reel.id}
              onActivate={activateReel}
              index={index + 3}
              saveData={saveData}
              reduceMotion={reducedMotion}
            />
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-5 rounded-xl p-5 md:flex-row md:items-center md:p-6"
          style={{
            background: "rgba(255,176,0,0.045)",
            border: "1px solid rgba(255,176,0,0.16)",
          }}
        >
          <div>
            <div
              style={{
                color: "#FFB000",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.56rem",
                fontWeight: 800,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Ready for promoters
            </div>
            <p
              className="mt-2 max-w-2xl"
              style={{
                color: "rgba(255,255,255,0.62)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              If the live proof is enough, go straight to formats, contacts, promo mix and professional booking details.
            </p>
          </div>
          <a
            href="/booking"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 px-5"
            style={{
              background: "linear-gradient(135deg, #FFB000, #FF8C00)",
              border: "1px solid rgba(255,176,0,0.7)",
              color: "#0B0B0B",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.64rem",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Open Booking Page
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
