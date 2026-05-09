import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ExternalLink, Music2, Play, ChevronLeft, ChevronRight, Youtube, Headphones, Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/* ─── Track / platform data ─────────────────────────────────────────── */

type Platform = "spotify" | "soundcloud";

const soundcloudTracks = [
  {
    id: "manicomio",
    title: "TOSZAN Live at Manicomio",
    type: "Live Set",
    url: "https://soundcloud.com/dj-willian-toszan/toszan-live-at-manicomio",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-live-at-manicomio&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-F2H6wqLJLwayfNrU-m09i1g-t500x500.jpg"
  },
  {
    id: "g-latina",
    title: "G-LATINA (TOSZAN Remix)",
    type: "Toszan Remix",
    url: "https://soundcloud.com/dj-willian-toszan/g-latina-pedro-sampaio-remix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/g-latina-pedro-sampaio-remix&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-542RIF8EbM1nUUlq-2bMAVg-t500x500.png"
  },
  {
    id: "sesso",
    title: "Sesso e Samba (Toszan Remix)",
    type: "Toszan Remix",
    url: "https://soundcloud.com/dj-willian-toszan/sesso-e-samba-toszan-remix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/sesso-e-samba-toszan-remix&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-WjT8DtlDzkBe0QtJ-E5syGg-t500x500.jpg"
  },
  {
    id: "solta",
    title: "Solta Mais Pressão",
    type: "Original",
    url: "https://soundcloud.com/dj-willian-toszan/toszan-solta-mais-pressa-o",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-solta-mais-pressa-o&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-emfkIvI2m5iWFLse-of9TRw-t500x500.png"
  },
  {
    id: "batte-forte",
    title: "BATTE FORTE",
    type: "Original",
    url: "https://soundcloud.com/dj-willian-toszan/toszan-batte-forte",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-batte-forte&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-ed2jJzMb6mrwA35r-EU3FuQ-t500x500.png"
  },
  {
    id: "opera",
    title: "TOSZAN - OPERA",
    type: "Original",
    url: "https://soundcloud.com/dj-willian-toszan/toszan-opera",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-opera&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-xDLDWQ0GdZy9CIIp-k3V5fQ-t500x500.jpg"
  },
  {
    id: "thundr",
    title: "THUNDR Promo Set",
    type: "Promo Set",
    url: "https://soundcloud.com/dj-willian-toszan/toszan-thundr-promo-set",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-thundr-promo-set&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    cover: "https://i1.sndcdn.com/artworks-oZbHbD2A479EpjKK-uzgAfg-t500x500.png"
  },
];

const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/artist/27FuT8olmWQ5g51OEwMkWt?utm_source=generator&theme=0";

/* ─── Sub-components ─────────────────────────────────────────────────── */

function PlayerCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,176,0,0.18)",
        borderRadius: "12px",
        padding: "3px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </motion.div>
  );
}

function MusicCoverCard({
  track,
  active,
  onClick,
}: {
  track: (typeof soundcloudTracks)[0];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="shrink-0 cursor-pointer group"
      style={{
        width: "clamp(180px, 15vw, 240px)",
        position: "relative",
        zIndex: active ? 10 : 1,
      }}
    >
      <div
        style={{
          aspectRatio: "1/1",
          borderRadius: "12px",
          overflow: "hidden",
          border: active ? "3px solid #FFB000" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: active ? "0 0 30px rgba(255,176,0,0.3)" : "0 10px 30px rgba(0,0,0,0.3)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src={track.cover}
          alt={track.title}
          className="w-full h-full object-cover"
          style={{
            filter: active ? "grayscale(0)" : "grayscale(0.4) brightness(0.8)",
            transition: "all 0.4s",
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play fill="#FFB000" color="#FFB000" size={32} />
        </div>
      </div>

      <div className="mt-3 text-center px-1">
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: active ? "#FFB000" : "#ffffff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.3s",
          }}
        >
          {track.title}
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginTop: "2px",
          }}
        >
          {track.type}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

export function MusicSection() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const [platform, setPlatform] = useState<Platform>("soundcloud");
  const [activeTrackId, setActiveTrackId] = useState("manicomio");

  const activeTrack = soundcloudTracks.find((t) => t.id === activeTrackId)!;

  return (
    <section
      id="music"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 20%, rgba(255,176,0,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col items-center text-center gap-8"
        >
          <div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
                {t("music.label")}
              </span>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
            </div>
            <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "0.1em", color: "#ffffff", lineHeight: 1.1 }}>
              {t("music.title")}
            </h2>
          </div>

          <div
            className="flex gap-1 p-1"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px" }}
          >
            {(["soundcloud", "spotify"] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  background: platform === p ? "linear-gradient(135deg, rgba(255,176,0,0.2), rgba(255,140,0,0.1))" : "transparent",
                  color: platform === p ? "#FFB000" : "rgba(255,255,255,0.35)",
                  transition: "all 0.3s",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {platform === "soundcloud" && (
            <motion.div
              key="soundcloud"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cover Gallery */}
              <div className="flex gap-6 overflow-x-auto pb-10 mb-10 no-scrollbar mask-fade-right">
                {soundcloudTracks.map((track) => (
                  <MusicCoverCard
                    key={track.id}
                    track={track}
                    active={activeTrackId === track.id}
                    onClick={() => setActiveTrackId(track.id)}
                  />
                ))}
              </div>

              {/* Main Player */}
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTrackId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PlayerCard>
                      <iframe
                        width="100%"
                        height="400"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={activeTrack.embedUrl}
                        style={{ borderRadius: "10px", display: "block" }}
                      />
                    </PlayerCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {platform === "spotify" && (
            <motion.div
              key="spotify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <PlayerCard>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={SPOTIFY_EMBED}
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </PlayerCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Links — Brand Logos */}
        <div className="mt-20 pt-12 flex flex-wrap items-center justify-center gap-10 md:gap-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            {
              label: "Spotify",
              href: "https://open.spotify.com/artist/27FuT8olmWQ5g51OEwMkWt",
              color: "#1DB954",
              svg: <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            },
            {
              label: "Apple Music",
              href: "https://geo.music.apple.com/it/album/_/1885295537?app=music&at=1000lHKX&ct=linktree_http&i=1885295538&itscg=30200&itsct=lt_m&ls=1&mt=1",
              color: "#FA243C",
              svg: <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z" />
            },
            {
              label: "YouTube",
              href: "https://youtu.be/ShdGmmuUlGA?si=2Glk1wlQloGrysE6",
              color: "#FF0000",
              svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            },
            {
              label: "Amazon Music",
              href: "https://music.amazon.com/albums/B0GSMK1YRL?trackAsin=B0GSMPMJQM",
              color: "#00A8E1",
              svg: <path d="M16.14,15.65c-1.87,1.24-4.21,1.8-6.49,1.8C6.15,17.45,2.8,16.17,0.08,13.86c-0.25-0.21-0.21-0.58,0.05-0.76 c0.18-0.12,0.42-0.1,0.6,0.03c2.4,1.81,5.55,2.94,8.96,2.94c3.48,0,6.67-1,9-2.73c0.18-0.13,0.43-0.08,0.57,0.1 c0.13,0.16,0.13,0.39-0.02,0.54C18.23,14.65,17.15,15.22,16.14,15.65z M18.42,14.6c0.05,0,0.1,0.01,0.14,0.04 c0.33,0.22,0.61,0.52,0.81,0.88c0.07,0.13,0,0.3-0.14,0.36c-0.25,0.1-0.53,0.14-0.81,0.11c-0.4-0.04-0.75-0.26-0.97-0.59 c-0.07-0.11-0.06-0.26,0.02-0.36C17.65,14.83,18.01,14.61,18.42,14.6z" />
            },
            {
              label: "Deezer",
              href: "https://www.deezer.com/us/track/3901611181",
              color: "#A238FF",
              svg: <path d="M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z" />
            },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center p-2 cursor-pointer group gap-3"
              style={{
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="52"
                height="52"
                fill="currentColor"
                style={{
                  color: link.color,
                  transition: "all 0.4s",
                  filter: `drop-shadow(0 0 8px ${link.color}40)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = `drop-shadow(0 0 20px ${link.color}AA)`;
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = `drop-shadow(0 0 8px ${link.color}40)`;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {link.svg}
              </svg>

              <span
                className="text-center"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 600,
                  transition: "color 0.3s",
                }}
              >
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}