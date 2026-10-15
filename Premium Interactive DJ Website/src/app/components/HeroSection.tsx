import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import "../../styles/general-editorial.css";

import { WhatsAppLink } from "./WhatsAppLink";

const heroBg = "/optimized/foto_2.webp";

const heroUi: Record<Language, {
  location: string;
  role: string;
  intro: string;
  booking: string;
  music: string;
  live: string;
  imageAlt: string;
}> = {
  en: {
    location: "Milan, Italy · Available across Europe",
    role: "Brazilian DJ · Tribal · Progressive · Circuit",
    intro: "Music first. Real performances. A direct path from the sound to your dancefloor.",
    booking: "Book TOSZAN",
    music: "Listen to the music",
    live: "Watch live proof",
    imageAlt: "TOSZAN performing live at a DJ booth",
  },
  pt: {
    location: "Milão, Itália · Disponível na Europa",
    role: "DJ brasileiro · Tribal · Progressive · Circuit",
    intro: "Música em primeiro lugar. Apresentações reais. Um caminho direto do som para a sua pista.",
    booking: "Contratar TOSZAN",
    music: "Ouvir a música",
    live: "Ver apresentações reais",
    imageAlt: "TOSZAN se apresentando ao vivo em uma cabine de DJ",
  },
  it: {
    location: "Milano, Italia · Disponibile in Europa",
    role: "DJ brasiliano · Tribal · Progressive · Circuit",
    intro: "Prima la musica. Performance reali. Un percorso diretto dal sound alla tua pista.",
    booking: "Prenota TOSZAN",
    music: "Ascolta la musica",
    live: "Guarda le performance",
    imageAlt: "TOSZAN durante una performance dal vivo alla console",
  },
  es: {
    location: "Milán, Italia · Disponible en Europa",
    role: "DJ brasileño · Tribal · Progressive · Circuit",
    intro: "La música primero. Actuaciones reales. Un camino directo del sonido a tu pista.",
    booking: "Contratar a TOSZAN",
    music: "Escuchar la música",
    live: "Ver actuaciones reales",
    imageAlt: "TOSZAN actuando en directo en una cabina de DJ",
  },
  fr: {
    location: "Milan, Italie · Disponible en Europe",
    role: "DJ brésilien · Tribal · Progressive · Circuit",
    intro: "La musique d’abord. Des performances réelles. Un lien direct entre le son et votre piste.",
    booking: "Réserver TOSZAN",
    music: "Écouter la musique",
    live: "Voir les performances",
    imageAlt: "TOSZAN en performance live derrière les platines",
  },
};

export function HeroSection() {
  const { language } = useLanguage();
  const reducedMotion = Boolean(useReducedMotion());
  const copy = heroUi[language];

  return (
    <section id="hero" className="general-hero" aria-labelledby="general-hero-title">
      <motion.img
        src={heroBg}
        alt={copy.imageAlt}
        className="general-hero-image"
        initial={reducedMotion ? false : { scale: 1.045 }}
        animate={{ scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 8, ease: "easeOut" }}
        decoding="async"
      />
      <div className="general-hero-scrim" aria-hidden="true" />
      <div className="general-shell general-hero-content">
        <motion.div
          className="general-hero-meta"
          initial={reducedMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.12 }}
        >
          <span>{copy.location}</span>
          <span>{copy.role}</span>
        </motion.div>

        <motion.div
          className="general-hero-brand"
          initial={reducedMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>WILLIAN</p>
          <h1 id="general-hero-title">TOSZAN</h1>
          <p className="general-hero-intro">{copy.intro}</p>
        </motion.div>

        <motion.div
          className="general-hero-actions"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.38 }}
        >
          <WhatsAppLink className="general-primary-link hero-whatsapp" />
          <a href="#dj-booking" className="general-primary-link">{copy.booking}<ArrowRight size={17} aria-hidden="true" /></a>
          <div className="general-hero-text-links">
            <a href="#music">{copy.music}<ArrowDown size={14} aria-hidden="true" /></a>
            <a href="#experience">{copy.live}<ArrowDown size={14} aria-hidden="true" /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
