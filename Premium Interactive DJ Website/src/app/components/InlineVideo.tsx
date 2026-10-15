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

// Audio has one owner across DJ and Creator, including rapid navigation.
function claimAudio(owner: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-inline-video]").forEach(video => {
    if (video === owner) return;
    const hadAudio = !video.muted;
    video.muted = true;
    video.defaultMuted = true;
    if (hadAudio) video.pause();
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
  const [playing, setPlaying] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [sound, setSound] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "playing" | "blocked" | "error">("idle");

  const stop = useCallback(() => {
    request.current++;
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.pause();
    setSound(false);
    setPlaying(false);
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
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      visible.current = entry.isIntersecting && entry.intersectionRatio >= .15;
      if (!visible.current || !active) { stop(); return; }
      if (!reduced && !saveData) void play(false);
    }, { threshold: [0, .15], rootMargin: "0px" });
    observer.observe(video);
    const visibility = () => {
      if (document.hidden) stop();
      else if (visible.current && active && !reduced && !saveData) void play(false);
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      request.current++;
      video.muted = true;
      video.defaultMuted = true;
      video.pause();
    };
  }, [active, play, reduced, stop]);

  // Reveal only after the browser submits a decoded frame, not on play() alone.
  useEffect(() => {
    const video = ref.current;
    if (!video || !playing || !video.requestVideoFrameCallback) return;
    const frame = video.requestVideoFrameCallback(() => setRendered(true));
    return () => video.cancelVideoFrameCallback(frame);
  }, [playing]);

  const label = status === "error" ? copy.retry : !playing ? copy.play : sound ? copy.mute : copy.sound;
  return <div className={`inline-media ${kind === "dj" ? "live-inline-media" : "creator-work-media"} ${playing && rendered ? "is-preview-playing" : ""}`}
    data-playback={status} data-rendered={rendered}>
    <video ref={ref} src={source} poster={poster} loop muted playsInline preload={active ? "metadata" : "none"}
      className={kind === "dj" ? "live-card-video" : "creator-work-video"}
      data-inline-video={kind} data-live-video={kind === "dj" ? source : undefined}
      controls={false} disablePictureInPicture
      onPlaying={() => { setPlaying(true); setStatus("playing"); }}
      onTimeUpdate={event => { if (event.currentTarget.currentTime > 0 && event.currentTarget.readyState >= 2) setRendered(true); }}
      onPause={() => { setPlaying(false); setStatus(current => current === "error" ? current : "idle"); }}
      onVolumeChange={event => setSound(!event.currentTarget.muted)}
      onError={() => { setPlaying(false); setRendered(false); setStatus("error"); }} />
    <img className="inline-poster" src={poster} alt="" aria-hidden="true" loading="lazy" />
    <div className="inline-scrim" aria-hidden="true" />
    {children}
    {active && <button type="button" className={`inline-media-control ${status === "blocked" || status === "error" ? "is-fallback" : ""}`}
      aria-label={`${label}: ${title}`} aria-pressed={sound}
      onClick={event => {
        event.stopPropagation();
        const video = ref.current;
        if (playing && sound && video) { video.muted = true; video.defaultMuted = true; setSound(false); }
        else void play(playing ? true : false);
      }}>
      {!playing ? <Play size={16} fill="currentColor" /> : sound ? <VolumeX size={16} /> : <Volume2 size={16} />}
      <span>{label}</span>
    </button>}
  </div>;
}
