import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useLanguage, type Language } from "../context/LanguageContext";

const labels: Record<Language, { play: string; sound: string; mute: string; retry: string }> = {
  pt: { play: "Reproduzir", sound: "Ativar som", mute: "Silenciar", retry: "Tentar novamente" },
  en: { play: "Play", sound: "Sound on", mute: "Mute", retry: "Try again" },
  it: { play: "Riproduci", sound: "Attiva audio", mute: "Disattiva audio", retry: "Riprova" },
  es: { play: "Reproducir", sound: "Activar sonido", mute: "Silenciar", retry: "Reintentar" },
  fr: { play: "Lire", sound: "Activer le son", mute: "Couper le son", retry: "Réessayer" },
};

// Every actually visible preview should play; off-screen media is paused.
// Prefetch only when approaching the viewport to avoid a cold first frame.
type PlaybackEntry = {
  video: HTMLVideoElement;
  kind: "dj" | "creator";
  active: boolean;
  ratio: number;
  auto: boolean;
  manualOrder: number;
  admitted: boolean;
  start: () => void;
  stop: () => void;
};

const mediaEntries = new Map<HTMLVideoElement, PlaybackEntry>();
let manualOrder = 0;

function rebalancePlayback() {
  const eligible = (entry: PlaybackEntry) =>
    entry.active && entry.ratio >= 0.15 && !document.hidden && (entry.auto || entry.manualOrder > 0);
  for (const entry of mediaEntries.values()) {
    const next = eligible(entry);
    if (next === entry.admitted) continue;
    entry.admitted = next;
    if (next) entry.start();
    else entry.stop();
  }
}

function prioritizeVideo(video: HTMLVideoElement) {
  const entry = mediaEntries.get(video);
  if (!entry) return;
  entry.manualOrder = ++manualOrder;
  rebalancePlayback();
}

// Audio has one owner across DJ and Creator, including rapid navigation.
function claimAudio(owner: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-inline-video]").forEach(video => {
    if (video === owner) return;
    // Muting the previous owner must NOT pause its visual preview.
    // Paused admitted videos used to stay frozen until the next scroll.
    video.muted = true;
    video.defaultMuted = true;
  });
}

export function InlineVideo({ source, poster, title, active = true, kind, children }: {
  source: string; poster: string; title: string; active?: boolean;
  kind: "dj" | "creator"; children?: ReactNode;
}) {
  const { language } = useLanguage();
  const copy = labels[language];
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const request = useRef(0);
  const visible = useRef(false);
  const retryCount = useRef(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [sound, setSound] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "playing" | "blocked" | "error">("idle");

  const stop = useCallback(() => {
    request.current++;
    if (retryTimer.current !== null) clearTimeout(retryTimer.current);
    retryTimer.current = null;
    retryCount.current = 0;
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.pause();
    setSound(false);
    setPlaying(false);
    setRendered(false);
    setStatus("idle");
  }, []);

  const play = useCallback(async (withSound: boolean) => {
    const video = ref.current;
    if (!video || !active || !visible.current || document.hidden) return;
    const version = ++request.current;
    if (withSound) claimAudio(video);
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "");
    video.defaultMuted = !withSound;
    video.muted = !withSound;
    setSound(withSound);
    setStatus("pending");
    if (video.error) video.load();
    try {
      await video.play();
      if (version !== request.current) return;
      if (!visible.current || document.hidden) { stop(); return; }
      setPlaying(!video.paused);
      setStatus("playing");
    } catch (error) {
      if (version !== request.current || (error as DOMException).name === "AbortError") return;
      video.muted = true;
      video.defaultMuted = true;
      setSound(false);
      setPlaying(false);
      setStatus(video.error ? "error" : "blocked");
    }
  }, [active, stop]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.setAttribute("webkit-playsinline", "");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const entry: PlaybackEntry = {
      video, kind, active, ratio: 0, auto: !reduced && !saveData,
      manualOrder: 0, admitted: false,
      start: () => { void play(false); },
      stop,
    };
    mediaEntries.set(video, entry);

    // Warm up metadata near the viewport. Loading *all* site videos on first
    // paint wastes bandwidth; loading only when already visible makes users
    // wait for the first decoded frame (then it works on a return visit).
    const preloadObserver = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting || !active || reduced || saveData || entry.admitted) return;
      preloadObserver.disconnect();
      if (video.readyState < 1 && !video.error) {
        video.preload = "metadata";
        video.load();
      }
    }, { rootMargin: "500px 0px", threshold: 0 });
    preloadObserver.observe(video);

    const observer = new IntersectionObserver(entries => {
      const observed = entries[0];
      entry.ratio = observed.isIntersecting ? observed.intersectionRatio : 0;
      visible.current = entry.ratio >= 0.15;
      if (!visible.current) entry.manualOrder = 0;
      rebalancePlayback();
    }, { threshold: [0, 0.15, 0.5, 0.75, 1], rootMargin: "0px" });
    observer.observe(video);
    document.addEventListener("visibilitychange", rebalancePlayback);
    return () => {
      observer.disconnect();
      preloadObserver.disconnect();
      document.removeEventListener("visibilitychange", rebalancePlayback);
      mediaEntries.delete(video);
      stop();
      rebalancePlayback();
    };
  }, [active, kind, play, reduced, stop]);

  // Reveal only after the browser submits a decoded frame, not on play() alone.
  useEffect(() => {
    const video = ref.current;
    if (!video || !playing || !video.requestVideoFrameCallback) return;
    const frame = video.requestVideoFrameCallback(() => setRendered(true));
    return () => video.cancelVideoFrameCallback(frame);
  }, [playing]);

  const recoverFromError = () => {
    const video = ref.current;
    if (!video || !mediaEntries.get(video)?.admitted || document.hidden) {
      setStatus("error");
      return;
    }
    if (retryCount.current >= 2) { setStatus("error"); return; }
    const delay = 900 * (2 ** retryCount.current++);
    setStatus("pending");
    if (retryTimer.current !== null) clearTimeout(retryTimer.current);
    retryTimer.current = setTimeout(() => {
      retryTimer.current = null;
      if (!mediaEntries.get(video)?.admitted || !visible.current || document.hidden) return;
      video.load();
      void play(false);
    }, delay);
  };

  const label = status === "error" ? copy.retry : !playing ? copy.play : sound ? copy.mute : copy.sound;
  return <div className={`inline-media ${kind === "dj" ? "live-inline-media" : "creator-work-media"} ${playing && rendered ? "is-preview-playing" : ""}`}
    data-playback={status} data-rendered={rendered}>
    <video ref={ref} src={source} poster={poster} loop muted playsInline preload="none"
      className={kind === "dj" ? "live-card-video" : "creator-work-video"}
      data-inline-video={kind} data-live-video={kind === "dj" ? source : undefined}
      controls={false} disablePictureInPicture
      onPlaying={() => {
        retryCount.current = 0;
        if (retryTimer.current !== null) clearTimeout(retryTimer.current);
        retryTimer.current = null;
        setPlaying(true);
        setStatus("playing");
      }}
      onTimeUpdate={event => { if (event.currentTarget.currentTime > 0 && event.currentTarget.readyState >= 2) setRendered(true); }}
      onPause={() => { setPlaying(false); setStatus(current => current === "error" || current === "pending" ? current : "idle"); }}
      onVolumeChange={event => setSound(!event.currentTarget.muted)}
      onError={() => { setPlaying(false); setRendered(false); recoverFromError(); }} />
    <img className="inline-poster" src={poster} alt="" aria-hidden="true" loading="lazy" />
    <div className="inline-scrim" aria-hidden="true" />
    {children}
    {active && <button type="button" className={`inline-media-control ${status === "blocked" || status === "error" ? "is-fallback" : ""}`}
      aria-label={`${label}: ${title}`} aria-pressed={sound}
      onClick={event => {
        event.stopPropagation();
        const video = ref.current;
        if (!video) return;
        if (status === "error") retryCount.current = 0;
        prioritizeVideo(video);
        if (playing && sound) { video.muted = true; video.defaultMuted = true; setSound(false); }
        else void play(true);
      }}>
      {!playing ? <Play size={16} fill="currentColor" /> : sound ? <VolumeX size={16} /> : <Volume2 size={16} />}
      <span>{label}</span>
    </button>}
  </div>;
}
