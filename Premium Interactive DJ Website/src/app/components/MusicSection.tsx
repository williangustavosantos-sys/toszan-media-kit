import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ExternalLink, Headphones, Music2, Play } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { bookingCopy } from "../../data/bookingCopy";
import "../../styles/music-live.css";

type Platform = "spotify" | "soundcloud";
type MusicContext = "general" | "booking";
type TrackType = "latest" | "new" | "live" | "remix" | "original" | "promo";

const soundcloudTracks = [
  {
    id: "promo-set-2026",
    title: "Promo DJ Set TOSZAN — Splash Roma",
    type: "latest" as TrackType,
    url: "https://soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-XDLKMpoYPopeyXs3-YI5G2Q-t500x500.jpg",
  },
  {
    id: "brasil",
    title: "BRASIL - Sente essa pressão!",
    type: "new" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/brasil",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/brasil&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-L5NlzlzzUIckkkFZ-3soezQ-t500x500.jpg",
  },
  {
    id: "jamaican-bam-bam",
    title: "Jamaican (Bam Bam) — TOSZAN Remix",
    type: "new" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/jamaican-bam-bam-toszan-remix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/jamaican-bam-bam-toszan-remix&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-cnwDhLdEQTjyxQDm-Iyp7Xg-t500x500.jpg",
  },
  {
    id: "manicomio",
    title: "TOSZAN Live at Manicomio",
    type: "live" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/toszan-live-at-manicomio",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-live-at-manicomio&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-F2H6wqLJLwayfNrU-m09i1g-t500x500.jpg",
  },
  {
    id: "g-latina",
    title: "G-LATINA (TOSZAN Remix)",
    type: "remix" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/g-latina-pedro-sampaio-remix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/g-latina-pedro-sampaio-remix&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-542RIF8EbM1nUUlq-2bMAVg-t500x500.png",
  },
  {
    id: "sesso",
    title: "Sesso e Samba (Toszan Remix)",
    type: "remix" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/sesso-e-samba-toszan-remix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/sesso-e-samba-toszan-remix&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-WjT8DtlDzkBe0QtJ-E5syGg-t500x500.jpg",
  },
  {
    id: "solta",
    title: "Solta Mais Pressão",
    type: "original" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/toszan-solta-mais-pressa-o",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-solta-mais-pressa-o&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-emfkIvI2m5iWFLse-of9TRw-t500x500.png",
  },
  {
    id: "batte-forte",
    title: "BATTE FORTE",
    type: "original" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/toszan-batte-forte",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-batte-forte&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-ed2jJzMb6mrwA35r-EU3FuQ-t500x500.png",
  },
  {
    id: "opera",
    title: "TOSZAN - OPERA",
    type: "original" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/toszan-opera",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-opera&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-xDLDWQ0GdZy9CIIp-k3V5fQ-t500x500.jpg",
  },
  {
    id: "thundr",
    title: "THUNDR Promo Set",
    type: "promo" as TrackType,
    url: "https://soundcloud.com/dj-willian-toszan/toszan-thundr-promo-set",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-willian-toszan/toszan-thundr-promo-set&color=%23bd9c6a&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    cover: "https://i1.sndcdn.com/artworks-oZbHbD2A479EpjKK-uzgAfg-t500x500.png",
  },
] as const;

const SPOTIFY_EMBED = "https://open.spotify.com/embed/artist/27FuT8olmWQ5g51OEwMkWt?utm_source=generator&theme=0";

export const serviceLinks = [
  { label: "Spotify", href: "https://open.spotify.com/artist/27FuT8olmWQ5g51OEwMkWt" },
  { label: "Apple Music", href: "https://music.apple.com/it/artist/toszan/1885295317" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCrCCo8QaWMrpkCO9yzSUrPg" },
  { label: "Amazon Music", href: "https://music.amazon.com/artists/B0GSM5H6VV/toszan" },
  { label: "Deezer", href: "https://www.deezer.com/artist/379581851" },
] as const;

const musicUi: Record<Language, {
  intro: string;
  catalog: string;
  selected: string;
  previous: string;
  next: string;
  swipe: string;
  openTrack: string;
  soundcloudTitle: string;
  spotifyTitle: string;
  services: string;
  platformLabel: string;
  types: Record<TrackType, string>;
}> = {
  en: { intro: "Ten real sets, remixes and originals. Choose a cover, switch platforms and listen without leaving the experience.", catalog: "10 selectable tracks", selected: "Selected", previous: "Previous track", next: "Next track", swipe: "Swipe or use the arrows", openTrack: "Open selected track on SoundCloud", soundcloudTitle: "SoundCloud player", spotifyTitle: "TOSZAN artist player on Spotify", services: "Listen on your platform", platformLabel: "Music platform", types: { latest: "Latest release", new: "New release", live: "Live set", remix: "TOSZAN remix", original: "Original", promo: "Promotional set" } },
  it: { intro: "Dieci set, remix e originali reali. Scegli una cover, cambia piattaforma e ascolta senza uscire dall’esperienza.", catalog: "10 tracce selezionabili", selected: "Selezionata", previous: "Traccia precedente", next: "Traccia successiva", swipe: "Scorri o usa le frecce", openTrack: "Apri la traccia selezionata su SoundCloud", soundcloudTitle: "Player SoundCloud", spotifyTitle: "Player artista TOSZAN su Spotify", services: "Ascolta sulla tua piattaforma", platformLabel: "Piattaforma musicale", types: { latest: "Ultima uscita", new: "Nuova uscita", live: "Set dal vivo", remix: "Remix TOSZAN", original: "Originale", promo: "Set promozionale" } },
  pt: { intro: "Dez sets, remixes e faixas autorais reais. Escolha uma capa, troque de plataforma e ouça sem sair da experiência.", catalog: "10 faixas selecionáveis", selected: "Selecionada", previous: "Faixa anterior", next: "Próxima faixa", swipe: "Deslize ou use as setas", openTrack: "Abrir faixa selecionada no SoundCloud", soundcloudTitle: "Player do SoundCloud", spotifyTitle: "Player do artista TOSZAN no Spotify", services: "Ouça na sua plataforma", platformLabel: "Plataforma de música", types: { latest: "Lançamento mais recente", new: "Novo lançamento", live: "Set ao vivo", remix: "Remix de TOSZAN", original: "Faixa autoral", promo: "Set promocional" } },
  es: { intro: "Diez sets, remixes y temas originales reales. Elige una portada, cambia de plataforma y escucha sin salir de la experiencia.", catalog: "10 pistas seleccionables", selected: "Seleccionada", previous: "Pista anterior", next: "Pista siguiente", swipe: "Desliza o usa las flechas", openTrack: "Abrir pista seleccionada en SoundCloud", soundcloudTitle: "Reproductor de SoundCloud", spotifyTitle: "Reproductor del artista TOSZAN en Spotify", services: "Escucha en tu plataforma", platformLabel: "Plataforma musical", types: { latest: "Último lanzamiento", new: "Nuevo lanzamiento", live: "Set en directo", remix: "Remix de TOSZAN", original: "Tema original", promo: "Set promocional" } },
  fr: { intro: "Dix sets, remixes et titres originaux réels. Choisissez une pochette, changez de plateforme et écoutez sans quitter l’expérience.", catalog: "10 titres à sélectionner", selected: "Sélectionné", previous: "Titre précédent", next: "Titre suivant", swipe: "Balayez ou utilisez les flèches", openTrack: "Ouvrir le titre sélectionné sur SoundCloud", soundcloudTitle: "Lecteur SoundCloud", spotifyTitle: "Lecteur de l’artiste TOSZAN sur Spotify", services: "Écoutez sur votre plateforme", platformLabel: "Plateforme musicale", types: { latest: "Dernière sortie", new: "Nouveau titre", live: "Set live", remix: "Remix TOSZAN", original: "Titre original", promo: "Set promotionnel" } },
};

function MusicCoverCard({ track, active, selectedLabel, typeLabel, onSelect, reducedMotion }: {
  track: (typeof soundcloudTracks)[number];
  active: boolean;
  selectedLabel: string;
  typeLabel: string;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      className="music-cover-button"
      data-track-id={track.id}
      aria-pressed={active}
      aria-label={`${active ? `${selectedLabel}: ` : ""}${track.title}`}
      onClick={onSelect}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      whileTap={reducedMotion ? undefined : { scale: 0.975 }}
      transition={{ duration: 0.22 }}
    >
      <span className="music-cover-art">
        <img src={track.cover} alt="" loading="lazy" decoding="async" />
        <span className="music-cover-play" aria-hidden="true"><Play size={25} fill="currentColor" /></span>
        {active ? <span className="music-cover-selected">{selectedLabel}</span> : null}
      </span>
      <span className="music-cover-title">{track.title}</span>
      <span className="music-cover-type">{typeLabel}</span>
    </motion.button>
  );
}

export function MusicSection({ context = "general" }: { context?: MusicContext }) {
  const { language, t } = useLanguage();
  const copy = musicUi[language];
  const reducedMotion = Boolean(useReducedMotion());
  const titleRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const interacted = useRef(false);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const [platform, setPlatform] = useState<Platform>("soundcloud");
  const [activeTrackId, setActiveTrackId] = useState<(typeof soundcloudTracks)[number]["id"]>("promo-set-2026");
  const activeIndex = soundcloudTracks.findIndex((track) => track.id === activeTrackId);
  const activeTrack = soundcloudTracks[activeIndex];
  const heading = context === "booking" ? bookingCopy[language].soundTitle : t("music.title");
  const eyebrow = context === "booking" ? bookingCopy[language].soundLabel : t("music.label");
  const intro = context === "booking" ? bookingCopy[language].soundIntro : copy.intro;

  const selectTrack = (id: (typeof soundcloudTracks)[number]["id"]) => {
    interacted.current = true;
    setActiveTrackId(id);
  };

  useEffect(() => {
    if (!interacted.current) return;
    const selected = railRef.current?.querySelector<HTMLElement>(`[data-track-id="${activeTrackId}"]`);
    selected?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, [activeTrackId, reducedMotion]);

  return (
    <section id="music" className="music-editorial" data-context={context} aria-labelledby={`music-title-${context}`}>
      <span id="promo-mix" className="music-anchor" aria-hidden="true" />
      <div className="music-ambient" aria-hidden="true" />
      <div className="music-shell">
        <motion.div
          ref={titleRef}
          className="music-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div><p className="music-eyebrow">{eyebrow}</p><h2 id={`music-title-${context}`}>{heading}</h2></div>
          <div className="music-heading-side"><p>{intro}</p><span><Music2 size={15} aria-hidden="true" />{copy.catalog}</span></div>
        </motion.div>

        <div className="music-platform-row">
          <div className="music-platform-tabs" role="tablist" aria-label={copy.platformLabel}>
            {(["soundcloud", "spotify"] as Platform[]).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={platform === item} aria-controls={`music-panel-${item}`} onClick={() => setPlatform(item)}>{item}</button>
            ))}
          </div>

        </div>

        <AnimatePresence mode="wait" initial={!reducedMotion}>
          {platform === "soundcloud" ? (
            <motion.div key="soundcloud" id="music-panel-soundcloud" role="tabpanel" className="music-platform-panel" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reducedMotion ? 0 : 0.38 }}>
              <div ref={railRef} className="music-cover-rail" aria-label={copy.catalog}>
                {soundcloudTracks.map((track) => <MusicCoverCard key={track.id} track={track} active={activeTrackId === track.id} selectedLabel={copy.selected} typeLabel={copy.types[track.type]} onSelect={() => selectTrack(track.id)} reducedMotion={reducedMotion} />)}
              </div>
              <p className="music-swipe-note">{language === "pt" ? "Deslize pelas capas e toque na música para ouvir" : language === "it" ? "Scorri le copertine e tocca per ascoltare" : language === "es" ? "Desliza las portadas y toca para escuchar" : language === "fr" ? "Faites défiler les pochettes et touchez pour écouter" : "Swipe covers and tap a track to listen"}</p>
              <div className="music-player-stage">
                <div className="music-player-meta">
                  <span className="music-player-count">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <div aria-live="polite"><span>{copy.types[activeTrack.type]}</span><h3>{activeTrack.title}</h3></div>

                  <a href={activeTrack.url} target="_blank" rel="noopener noreferrer" className="music-fallback-link">{copy.openTrack}<ExternalLink size={15} aria-hidden="true" /></a>
                </div>
                <AnimatePresence mode="wait" initial={!reducedMotion}>
                  <motion.div key={activeTrackId} className="music-player-frame" initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }} transition={{ duration: reducedMotion ? 0 : 0.32 }}>
                    <iframe title={`${copy.soundcloudTitle} — ${activeTrack.title}`} width="100%" height="166" scrolling="no" frameBorder="0" allow="autoplay; encrypted-media" src={activeTrack.embedUrl} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div key="spotify" id="music-panel-spotify" role="tabpanel" className="music-platform-panel music-spotify-panel" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reducedMotion ? 0 : 0.38 }}>
              <div className="music-spotify-heading"><Headphones size={20} aria-hidden="true" /><span>TOSZAN / Spotify</span></div>
              <div className="music-player-frame"><iframe title={copy.spotifyTitle} src={SPOTIFY_EMBED} width="100%" height="450" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="music-services" aria-label={copy.services}>
          <strong className="music-services-heading">{copy.services}</strong>
          <div>{serviceLinks.map((service) => <motion.a key={service.label} href={service.href} aria-label={`${service.label} — ${copy.services}`} target="_blank" rel="noopener noreferrer" whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }}>
            <img src={`/platform-icons/${service.label === "Apple Music" ? "applemusic" : service.label === "Amazon Music" ? "amazonmusic" : service.label.toLowerCase()}.svg`} alt="" aria-hidden="true" />
            <span>{service.label}</span><ExternalLink size={14} aria-hidden="true" />
          </motion.a>)}</div>
        </div>
      </div>
    </section>
  );
}
