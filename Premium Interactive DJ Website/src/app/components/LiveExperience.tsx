import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ExternalLink, Play, Volume2, VolumeX } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { bookingCopy } from "../../data/bookingCopy";
import "../../styles/music-live.css";

type LiveContext = "general" | "booking";
type AudioStatus = "muted" | "playing" | "blocked";

type Reel = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  poster: string;
  video: string;
  url?: string;
  format?: "vertical" | "wide";
  featured?: boolean;
};

const reels: Reel[] = [
  { id: "wide-crowd-room-proof", title: "Room Proof", subtitle: "Wide crowd and room atmosphere", duration: "0:14", poster: "/reels/posters/09-wide-crowd-room-proof.webp", video: "/reels/videos/09-wide-crowd-room-proof.mp4", format: "wide", featured: true },
  { id: "front-booth-energy", title: "Booth Presence", subtitle: "Close performance at the booth", duration: "0:16", poster: "/reels/posters/01-booth-control-front-closeup.webp", video: "/reels/videos/01-booth-control-front-closeup.mp4", featured: true },
  { id: "DXuofeFjbEw", title: "Booth Control", subtitle: "Hands on decks", duration: "0:13", poster: "/reels/posters/03-deck-control-overhead.webp", video: "/reels/videos/03-deck-control-overhead.mp4", url: "https://www.instagram.com/reel/DXuofeFjbEw/", featured: true },
  { id: "DVq5qliDUiC", title: "Crowd Command", subtitle: "Mic, booth and response", duration: "0:18", poster: "/reels/posters/08-mic-crowd-command-booth.webp", video: "/reels/videos/08-mic-crowd-command-booth.mp4", url: "https://www.instagram.com/reel/DVq5qliDUiC/" },
  { id: "DZ7HQMft0Qg", title: "Pride Identity", subtitle: "Camera proximity", duration: "0:12", poster: "/reels/posters/02-crowd-proximity-selfie-booth.webp", video: "/reels/videos/02-crowd-proximity-selfie-booth.mp4", url: "https://www.instagram.com/reel/DZ7HQMft0Qg/" },
  { id: "DXpFqK1jfeI", title: "Dancefloor Heat", subtitle: "Room atmosphere", duration: "0:16", poster: "/reels/posters/07-yellow-fog-crowd-support.webp", video: "/reels/videos/07-yellow-fog-crowd-support.mp4", url: "https://www.instagram.com/reel/DXpFqK1jfeI/" },
  { id: "DXzr2dDoBJx", title: "Peak Moment", subtitle: "Wide stage view", duration: "0:16", poster: "/reels/posters/04-wide-stage-manicomio-smoke.webp", video: "/reels/videos/04-wide-stage-manicomio-smoke.mp4", url: "https://www.instagram.com/reel/DXzr2dDoBJx/" },
  { id: "raised-hands-cue", title: "Raised Hands Cue", subtitle: "Balcony and stage", duration: "0:15", poster: "/reels/posters/06-balcony-stage-raised-hands.webp", video: "/reels/videos/06-balcony-stage-raised-hands.mp4" },
  { id: "extended-booth-run", title: "Extended Booth Run", subtitle: "Performance preview", duration: "0:16", poster: "/reels/posters/05-peak-booth-camera-presence-long.webp", video: "/reels/videos/05-peak-booth-camera-presence-long.mp4" },
];

const liveUi: Record<Language, {
  intro: string;
  clips: string;
  featured: string;
  audio: string;
  liveProof: string;
  play: string;
  retry: string;
  mute: string;
  soundOn: string;
  official: string;
  ready: string;
  readyBody: string;
  openBooking: string;
}> = {
  en: { intro: "Nine real performance clips, from the booth to the dancefloor. Select a moment, play it with sound and see the live energy directly.", clips: "Real clips", featured: "Featured first", audio: "Audio owner", liveProof: "Live proof", play: "Play with sound", retry: "Tap again for sound", mute: "Mute", soundOn: "Sound on", official: "Official reel", ready: "For promoters", readyBody: "Continue to formats, technical details and a direct booking enquiry.", openBooking: "Open booking" },
  it: { intro: "Nove clip reali, dalla console alla pista. Seleziona un momento, attiva l’audio e guarda direttamente l’energia live.", clips: "Clip reali", featured: "In evidenza", audio: "Audio attivo", liveProof: "Prova live", play: "Riproduci con audio", retry: "Tocca ancora per l’audio", mute: "Disattiva audio", soundOn: "Audio attivo", official: "Reel ufficiale", ready: "Per i promoter", readyBody: "Continua con formati, dettagli tecnici e richiesta di booking diretta.", openBooking: "Vai al booking" },
  pt: { intro: "Nove vídeos reais, da cabine à pista. Selecione um momento, ative o som e veja diretamente a energia ao vivo.", clips: "Vídeos reais", featured: "Destaques", audio: "Áudio ativo", liveProof: "Prova ao vivo", play: "Reproduzir com som", retry: "Toque novamente para o som", mute: "Silenciar", soundOn: "Som ligado", official: "Reel oficial", ready: "Para promoters", readyBody: "Continue para formatos, detalhes técnicos e contato direto de booking.", openBooking: "Abrir Booking" },
  es: { intro: "Nueve vídeos reales, de la cabina a la pista. Selecciona un momento, activa el sonido y mira directamente la energía en vivo.", clips: "Vídeos reales", featured: "Destacados", audio: "Audio activo", liveProof: "Prueba en vivo", play: "Reproducir con sonido", retry: "Toca de nuevo para el sonido", mute: "Silenciar", soundOn: "Sonido activo", official: "Reel oficial", ready: "Para promotores", readyBody: "Continúa con formatos, detalles técnicos y una solicitud de booking directa.", openBooking: "Abrir Booking" },
  fr: { intro: "Neuf vidéos réelles, de la cabine au dancefloor. Sélectionnez un moment, activez le son et découvrez directement l’énergie live.", clips: "Vidéos réelles", featured: "À la une", audio: "Audio actif", liveProof: "Preuve live", play: "Lire avec le son", retry: "Touchez encore pour le son", mute: "Couper le son", soundOn: "Son activé", official: "Reel officiel", ready: "Pour les promoteurs", readyBody: "Continuez vers les formats, les détails techniques et la demande de booking directe.", openBooking: "Ouvrir Booking" },
};

function AutoplayVideoCard({
  reel,
  active,
  onActivate,
  soundEnabledForId,
  setSoundEnabledForId,
  index,
  saveData,
  reduceMotion,
  copy,
  variant = "standard",
}: {
  reel: Reel;
  active: boolean;
  onActivate: (id: string) => void;
  soundEnabledForId: string | null;
  setSoundEnabledForId: (id: string | null) => void;
  index: number;
  saveData: boolean;
  reduceMotion: boolean;
  copy: (typeof liveUi)[Language];
  variant?: "feature" | "standard";
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>("muted");
  const isThisVideoSoundEnabled = soundEnabledForId === reel.id;
  const shouldPlayVideo = active && !saveData && !reduceMotion;
  const isWide = reel.format === "wide";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlayVideo) {
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.defaultMuted = !isThisVideoSoundEnabled;
      video.muted = !isThisVideoSoundEnabled;
      video.volume = isThisVideoSoundEnabled ? 1 : 0;
      void video.play().catch(() => undefined);
      return;
    }

    if (!isThisVideoSoundEnabled) {
      video.pause();
      video.currentTime = 0;
    }
  }, [isThisVideoSoundEnabled, shouldPlayVideo]);

  useEffect(() => {
    if (!isThisVideoSoundEnabled && audioStatus !== "muted") setAudioStatus("muted");
  }, [audioStatus, isThisVideoSoundEnabled]);

  const pauseOtherVideos = useCallback(() => {
    document.querySelectorAll<HTMLVideoElement>("video[data-live-video]").forEach((video) => {
      if (video.dataset.liveVideo === reel.id) return;
      video.pause();
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    });
  }, [reel.id]);

  const handlePlayWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    onActivate(reel.id);
    pauseOtherVideos();
    setSoundEnabledForId(reel.id);
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.defaultMuted = false;
    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      setAudioStatus("playing");
    } catch {
      setAudioStatus("blocked");
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      setSoundEnabledForId(null);
    }
  }, [onActivate, pauseOtherVideos, reel.id, setSoundEnabledForId]);

  const handleMuteToggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.muted && video.volume > 0) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      setSoundEnabledForId(null);
      setAudioStatus("muted");
      return;
    }

    await handlePlayWithSound();
  }, [audioStatus, handlePlayWithSound, isThisVideoSoundEnabled, setSoundEnabledForId]);

  return (
    <motion.article
      className={`live-card ${active ? "is-active" : ""} ${isWide ? "is-wide" : "is-vertical"} ${variant === "feature" ? "is-feature" : ""}`}
      data-reel-id={reel.id}
      data-featured={reel.featured ? "true" : "false"}
      data-autoplay-eligible={shouldPlayVideo ? "true" : "false"}
      tabIndex={0}
      aria-label={`${reel.title}: ${reel.subtitle}`}
      onPointerEnter={() => onActivate(reel.id)}
      onPointerDown={(event) => { if (event.pointerType !== "mouse") onActivate(reel.id); }}
      onFocus={() => onActivate(reel.id)}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : index * 0.035, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={reel.poster} alt="" aria-hidden="true" loading={reel.featured ? "eager" : "lazy"} decoding="async" fetchPriority={reel.featured ? "high" : "auto"} className="live-card-poster" />
      <video
        ref={videoRef}
        key={reel.video}
        poster={reel.poster}
        muted={!isThisVideoSoundEnabled}
        defaultMuted
        loop
        playsInline
        preload={saveData || reduceMotion ? "none" : active ? "auto" : "metadata"}
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        data-live-video={reel.id}
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        className="live-card-video"
        style={{ opacity: videoReady && active ? 1 : 0 }}
      >
        <source src={reel.video} type="video/mp4" />
      </video>

      <div className="live-card-scrim" aria-hidden="true" />
      <div className="live-card-topline" aria-hidden="true"><span>{copy.liveProof}</span><span>{reel.duration}</span></div>

      {audioStatus !== "playing" ? (
        <button type="button" className="live-play-control" onClick={handlePlayWithSound} aria-label={`${copy.play}: ${reel.title}`}>
          <Play size={18} fill="currentColor" aria-hidden="true" /><span>{audioStatus === "blocked" ? copy.retry : copy.play}</span>
        </button>
      ) : (
        <span className="live-sound-status"><Volume2 size={14} aria-hidden="true" />{copy.soundOn}</span>
      )}

      <button
        type="button"
        className="live-mute-control"
        aria-label={isThisVideoSoundEnabled && audioStatus === "playing" ? `${copy.mute}: ${reel.title}` : `${copy.play}: ${reel.title}`}
        aria-pressed={isThisVideoSoundEnabled && audioStatus === "playing"}
        onClick={handleMuteToggle}
      >
        {isThisVideoSoundEnabled && audioStatus === "playing" ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <div className="live-card-copy">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{reel.title}</h3>
        <p>{reel.subtitle}</p>
        {reel.url ? <a href={reel.url} target="_blank" rel="noopener noreferrer">{copy.official}<ExternalLink size={13} aria-hidden="true" /></a> : null}
      </div>
    </motion.article>
  );
}

export function LiveExperience({ context = "general" }: { context?: LiveContext }) {
  const { language, t } = useLanguage();
  const copy = liveUi[language];
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef<string | null>(reels[0].id);
  const soundOwnerRef = useRef<string | null>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(reels[0].id);
  const [soundEnabledForId, setSoundEnabledForId] = useState<string | null>(null);
  const [saveData, setSaveData] = useState(false);
  const featuredReels = reels.slice(0, 3);
  const supportingReels = reels.slice(3);
  const heading = context === "booking" ? bookingCopy[language].experienceTitle : t("experience.title");
  const eyebrow = context === "booking" ? bookingCopy[language].experienceLabel : t("experience.label");
  const intro = context === "booking" ? bookingCopy[language].experienceIntro : copy.intro;

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  const updateSoundOwner = useCallback((id: string | null) => {
    soundOwnerRef.current = id;
    setSoundEnabledForId(id);
  }, []);

  const activateReel = useCallback((id: string) => {
    if (activeIdRef.current !== id && soundOwnerRef.current && soundOwnerRef.current !== id) updateSoundOwner(null);
    activeIdRef.current = id;
    setActiveId(id);
  }, [updateSoundOwner]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const visibility = new Map<string, { ratio: number; rect: DOMRectReadOnly; featured: boolean }>();
    let frame = 0;

    const selectActive = () => {
      frame = 0;
      if (soundOwnerRef.current) return;
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
        if (score > bestScore) { bestScore = score; bestId = id; }
      });

      if (bestId && activeIdRef.current !== bestId) activateReel(bestId);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const id = target.dataset.reelId;
        if (!id) return;
        visibility.set(id, { ratio: entry.intersectionRatio, rect: entry.boundingClientRect, featured: target.dataset.featured === "true" });
      });
      if (!frame) frame = window.requestAnimationFrame(selectActive);
    }, { rootMargin: "180px 0px 180px 0px", threshold: [0, 0.12, 0.25, 0.45, 0.65, 0.85, 1] });

    section.querySelectorAll<HTMLElement>("[data-reel-id]").forEach((card) => observer.observe(card));
    return () => { if (frame) window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, [activateReel]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.querySelectorAll<HTMLVideoElement>("video[data-live-video]").forEach((video) => {
      const shouldHaveSound = soundEnabledForId !== null && video.dataset.liveVideo === soundEnabledForId;
      video.muted = !shouldHaveSound;
      video.defaultMuted = !shouldHaveSound;
      video.volume = shouldHaveSound ? 1 : 0;
      if (!shouldHaveSound && video.dataset.liveVideo !== activeId) video.pause();
    });
  }, [activeId, soundEnabledForId]);

  const cardProps = { soundEnabledForId, setSoundEnabledForId: updateSoundOwner, onActivate: activateReel, saveData, reduceMotion: reducedMotion, copy };
  const contactHref = context === "booking" ? "#booking-contact" : "/booking";
  const contactLabel = context === "booking" ? bookingCopy[language].contact : copy.openBooking;

  return (
    <section ref={sectionRef} id="experience" className="live-editorial" data-context={context} aria-labelledby={`live-title-${context}`}>
      <div className="live-ambient" aria-hidden="true" />
      <div className="live-shell">
        <motion.div ref={headingRef} className="live-heading" initial={reducedMotion ? false : { opacity: 0, y: 30 }} animate={headingInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <div><p className="live-eyebrow">{eyebrow}</p><h2 id={`live-title-${context}`}>{heading}</h2></div>
          <p>{intro}</p>
        </motion.div>

        <div className="live-facts" aria-label="Live media inventory">
          {[{ value: "09", label: copy.clips }, { value: "03", label: copy.featured }, { value: "01", label: copy.audio }].map((fact, index) => (
            <motion.div key={fact.label} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.06 }}><strong>{fact.value}</strong><span>{fact.label}</span></motion.div>
          ))}
        </div>

        <div className="live-featured-grid">
          {featuredReels.map((reel, index) => <div key={reel.id} className={`live-featured-item live-featured-${index + 1}`}><AutoplayVideoCard reel={reel} active={activeId === reel.id} index={index} variant="feature" {...cardProps} /></div>)}
        </div>

        <div className="live-support-heading"><span>04—09</span><p>{copy.clips}</p></div>
        <div className="live-support-grid">
          {supportingReels.map((reel, index) => <div key={reel.id} className="live-support-item"><AutoplayVideoCard reel={reel} active={activeId === reel.id} index={index + 3} {...cardProps} /></div>)}
        </div>

        <motion.div className="live-booking-cta" initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.55 }}>
          <div><span>{copy.ready}</span><p>{copy.readyBody}</p></div>
          <a href={contactHref}>{contactLabel}<ArrowRight size={16} aria-hidden="true" /></a>
        </motion.div>
      </div>
    </section>
  );
}
