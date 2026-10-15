import { useCallback, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { bookingCopy } from "../../data/bookingCopy";
import "../../styles/music-live.css";
import { InlineVideo } from "./InlineVideo";

type LiveContext = "general" | "booking";

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

const reelTranslations: Record<Language, Array<Pick<Reel, "title" | "subtitle">>> = {
  en: [
    { title: "Room Proof", subtitle: "Wide crowd and room atmosphere" },
    { title: "Booth Presence", subtitle: "Close performance at the booth" },
    { title: "Booth Control", subtitle: "Hands on decks" },
    { title: "Crowd Command", subtitle: "Mic, booth and response" },
    { title: "Pride Identity", subtitle: "Camera proximity" },
    { title: "Dancefloor Heat", subtitle: "Room atmosphere" },
    { title: "Peak Moment", subtitle: "Wide stage view" },
    { title: "Raised Hands Cue", subtitle: "Balcony and stage" },
    { title: "Extended Booth Run", subtitle: "Performance preview" },
  ],
  pt: [
    { title: "Prova da pista", subtitle: "Visão ampla do público e da casa" },
    { title: "Presença na cabine", subtitle: "Apresentação de perto na cabine" },
    { title: "Controle da cabine", subtitle: "Mãos nos equipamentos" },
    { title: "Comando da pista", subtitle: "Microfone, cabine e resposta do público" },
    { title: "Identidade Pride", subtitle: "Proximidade com a câmera" },
    { title: "Calor da pista", subtitle: "Atmosfera da casa" },
    { title: "Momento de ápice", subtitle: "Visão ampla do palco" },
    { title: "Mãos ao alto", subtitle: "Varanda e palco" },
    { title: "Sequência na cabine", subtitle: "Prévia da apresentação" },
  ],
  it: [
    { title: "Prova della pista", subtitle: "Pubblico e atmosfera della sala" },
    { title: "Presenza in console", subtitle: "Performance ravvicinata in console" },
    { title: "Controllo della console", subtitle: "Mani sui deck" },
    { title: "Comando della pista", subtitle: "Microfono, console e risposta del pubblico" },
    { title: "Identità Pride", subtitle: "Vicinanza alla videocamera" },
    { title: "Calore in pista", subtitle: "Atmosfera della sala" },
    { title: "Momento di punta", subtitle: "Vista ampia del palco" },
    { title: "Mani alzate", subtitle: "Balconata e palco" },
    { title: "Sessione in console", subtitle: "Anteprima della performance" },
  ],
  es: [
    { title: "Prueba de pista", subtitle: "Público y ambiente de la sala" },
    { title: "Presencia en cabina", subtitle: "Actuación de cerca en la cabina" },
    { title: "Control de cabina", subtitle: "Manos en los decks" },
    { title: "Mando de la pista", subtitle: "Micrófono, cabina y respuesta del público" },
    { title: "Identidad Pride", subtitle: "Cercanía con la cámara" },
    { title: "Calor en la pista", subtitle: "Ambiente de la sala" },
    { title: "Momento culminante", subtitle: "Vista amplia del escenario" },
    { title: "Manos arriba", subtitle: "Balcón y escenario" },
    { title: "Sesión en cabina", subtitle: "Avance de la actuación" },
  ],
  fr: [
    { title: "Preuve de la piste", subtitle: "Public et ambiance de la salle" },
    { title: "Présence en cabine", subtitle: "Performance au plus près des platines" },
    { title: "Maîtrise des platines", subtitle: "Les mains sur les decks" },
    { title: "Direction de la piste", subtitle: "Micro, cabine et réponse du public" },
    { title: "Identité Pride", subtitle: "Proximité avec la caméra" },
    { title: "Chaleur de la piste", subtitle: "Ambiance de la salle" },
    { title: "Moment fort", subtitle: "Vue large de la scène" },
    { title: "Mains levées", subtitle: "Balcon et scène" },
    { title: "Session en cabine", subtitle: "Aperçu de la performance" },
  ],
};

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
  inventory: string;
  supporting: string;
  previous: string;
  next: string;
}> = {
  en: { intro: "Nine real performance clips, from the booth to the dancefloor. Select a moment, play it with sound and see the live energy directly.", clips: "Real clips", featured: "Featured", audio: "One audio source", liveProof: "Live proof", play: "Play with sound", retry: "Tap again for sound", mute: "Mute", soundOn: "Sound on", official: "Open on Instagram", ready: "For promoters", readyBody: "Continue to formats, technical details and a direct booking enquiry.", openBooking: "Open booking", inventory: "Live media inventory", supporting: "More live moments", previous: "Previous live video", next: "Next live video" },
  it: { intro: "Nove video reali, dalla console alla pista. Seleziona un momento, attiva l’audio e guarda direttamente l’energia dal vivo.", clips: "Video reali", featured: "In evidenza", audio: "Una fonte audio", liveProof: "Prova dal vivo", play: "Riproduci con audio", retry: "Tocca ancora per l’audio", mute: "Disattiva audio", soundOn: "Audio attivo", official: "Apri su Instagram", ready: "Per gli organizzatori", readyBody: "Continua con formati, dettagli tecnici e una richiesta diretta di ingaggio.", openBooking: "Vai agli ingaggi", inventory: "Archivio video delle esibizioni", supporting: "Altri momenti dal vivo", previous: "Video precedente", next: "Video successivo" },
  pt: { intro: "Nove vídeos reais, da cabine à pista. Selecione um momento, ative o som e veja diretamente a energia ao vivo.", clips: "Vídeos reais", featured: "Destaques", audio: "Uma fonte de áudio", liveProof: "Prova ao vivo", play: "Reproduzir com som", retry: "Toque novamente para o som", mute: "Silenciar", soundOn: "Som ligado", official: "Abrir no Instagram", ready: "Para contratantes", readyBody: "Veja os formatos, as informações técnicas e faça um pedido direto de contratação.", openBooking: "Ver contratações", inventory: "Arquivo de vídeos ao vivo", supporting: "Mais momentos ao vivo", previous: "Vídeo anterior", next: "Próximo vídeo" },
  es: { intro: "Nueve vídeos reales, de la cabina a la pista. Selecciona un momento, activa el sonido y mira directamente la energía en vivo.", clips: "Vídeos reales", featured: "Destacados", audio: "Una fuente de audio", liveProof: "Prueba en directo", play: "Reproducir con sonido", retry: "Toca de nuevo para el sonido", mute: "Silenciar", soundOn: "Sonido activo", official: "Abrir en Instagram", ready: "Para promotores", readyBody: "Continúa con los formatos, los datos técnicos y una solicitud de contratación directa.", openBooking: "Ver contrataciones", inventory: "Archivo de vídeos en directo", supporting: "Más momentos en directo", previous: "Vídeo anterior", next: "Vídeo siguiente" },
  fr: { intro: "Neuf vidéos réelles, de la cabine à la piste. Sélectionnez un moment, activez le son et découvrez directement l’énergie en direct.", clips: "Vidéos réelles", featured: "À la une", audio: "Une source audio", liveProof: "Preuve en direct", play: "Lire avec le son", retry: "Touchez encore pour le son", mute: "Couper le son", soundOn: "Son activé", official: "Ouvrir sur Instagram", ready: "Pour les organisateurs", readyBody: "Découvrez les formats, les informations techniques et envoyez une demande de réservation directe.", openBooking: "Voir les réservations", inventory: "Archive des vidéos en direct", supporting: "Autres moments en direct", previous: "Vidéo précédente", next: "Vidéo suivante" },
};

function AutoplayVideoCard({ reel, active }: { reel: Reel; active: boolean }) {
  return <article className={`live-card ${active ? "is-active" : ""}`} data-reel-id={reel.id}>
    <InlineVideo kind="dj" source={reel.video} poster={reel.poster} title={reel.title} active={active} />
  </article>;
}

export function LiveExperience({ context = "general" }: { context?: LiveContext }) {
  const { language, t } = useLanguage();
  const copy = liveUi[language];
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(reels[0].id);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const mouseStart = useRef<number | null>(null);
  const localizedReels = reels.map((reel, index) => ({ ...reel, ...reelTranslations[language][index] }));
  const heading = context === "booking" ? bookingCopy[language].experienceTitle : t("experience.title");
  const eyebrow = context === "booking" ? bookingCopy[language].experienceLabel : t("experience.label");
  const intro = context === "booking" ? bookingCopy[language].experienceIntro : copy.intro;

  const activateReel = useCallback((id: string) => setActiveId(id), []);

  const moveCarousel = useCallback((step: number) => {
    const next = (carouselIndex + step + reels.length) % reels.length;
    activateReel(reels[next].id);
    setCarouselIndex(next);
  }, [activateReel, carouselIndex]);

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

        <div className="live-infinite-window" role="region" aria-label={copy.inventory} aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); moveCarousel(-1); } if (event.key === "ArrowRight") { event.preventDefault(); moveCarousel(1); } }}
          onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={event => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 35) moveCarousel(distance < 0 ? 1 : -1); touchStart.current = null; }}
          onMouseDown={event => { mouseStart.current = event.clientX; }}
          onMouseUp={event => { if (mouseStart.current === null) return; const distance = event.clientX - mouseStart.current; if (Math.abs(distance) > 50) moveCarousel(distance < 0 ? 1 : -1); mouseStart.current = null; }}>
          <div className="live-carousel-gesture-cue" aria-hidden="true">
            <span>←</span>
            <span>{language === "pt" ? "DESLIZE PARA VER MAIS" : language === "it" ? "SCORRI PER VEDERE ALTRI VIDEO" : language === "es" ? "DESLIZA PARA VER MÁS" : language === "fr" ? "BALAYEZ POUR VOIR PLUS" : "SWIPE TO EXPLORE"}</span>
            <span>→</span>
          </div>
          <div className="live-infinite-track">
            {[-1, 0, 1].map(offset => {
              const index = (carouselIndex + offset + localizedReels.length) % localizedReels.length;
              const reel = localizedReels[index];
              return <div key={reel.id} className={`live-infinite-slide ${offset === 0 ? "is-center" : "is-side"}`}
                aria-label={`${reel.title}`}
                onClick={offset === 0 ? undefined : () => moveCarousel(offset)}>
                <AutoplayVideoCard reel={reel} active={offset === 0 && activeId === reel.id} />
              </div>;
            })}
          </div>
        </div>
        <nav className="live-carousel-navigation" aria-label={copy.inventory}>
          <button type="button" className="live-carousel-arrow" aria-label={copy.previous} onClick={() => moveCarousel(-1)}>
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
          <div className="live-carousel-progress">
            <span className="live-carousel-count" aria-live="polite">{String(carouselIndex + 1).padStart(2, "0")} / {String(localizedReels.length).padStart(2, "0")}</span>
            <div className="live-carousel-dots" aria-label={copy.inventory}>
              {localizedReels.map((reel, index) => (
                <button
                  type="button"
                  key={reel.id}
                  className={index === carouselIndex ? "is-current" : ""}
                  aria-label={`${index + 1} / ${localizedReels.length}: ${reel.title}`}
                  aria-current={index === carouselIndex ? "true" : undefined}
                  onClick={() => { setCarouselIndex(index); activateReel(reel.id); }}
                />
              ))}
            </div>
          </div>
          <button type="button" className="live-carousel-arrow" aria-label={copy.next} onClick={() => moveCarousel(1)}>
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </nav>
        <div className="live-carousel-caption" aria-live="polite">
          <span>{localizedReels[carouselIndex].title}</span>
          <p>{localizedReels[carouselIndex].subtitle}</p>
          {localizedReels[carouselIndex].url ? <a href={localizedReels[carouselIndex].url} target="_blank" rel="noopener noreferrer">{copy.official}<ExternalLink size={14} aria-hidden="true"/></a> : null}
        </div>
        <p className="live-swipe-hint">{language === "pt" ? "Deslize para a esquerda ou direita • reprodução contínua" : language === "it" ? "Scorri a sinistra o a destra • galleria continua" : language === "es" ? "Desliza a izquierda o derecha • galería continua" : language === "fr" ? "Balayez vers la gauche ou la droite • galerie continue" : "Swipe left or right • continuous gallery"}</p>

        <motion.div className="live-booking-cta" initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.55 }}>
          <div><span>{copy.ready}</span><p>{copy.readyBody}</p></div>
          <a href={contactHref}>{contactLabel}<ArrowRight size={16} aria-hidden="true" /></a>
        </motion.div>
      </div>
    </section>
  );
}
