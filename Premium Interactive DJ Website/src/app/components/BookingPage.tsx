import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import "../../styles/cinematic.css";
import { ArrowUpRight, Check, Headphones, Instagram, Mail, MapPin, MessageCircle, Music2, Download } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { bookingCopy, type BookingCopy } from "../../data/bookingCopy";
import { MusicSection } from "./MusicSection";
import { LiveExperience } from "./LiveExperience";

const media = {
  mix: "https://soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash",
  embed: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash&color=%23bd9c6a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
  instagram: "https://www.instagram.com/toszan.willian/",
  soundcloud: "https://soundcloud.com/dj-willian-toszan",
};
function updateMeta(copy: BookingCopy) {
  document.title = copy.metaTitle;
  const meta = (attribute: "name" | "property", name: string, content: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };
  meta("name", "description", copy.metaDescription);
  meta("property", "og:title", copy.metaTitle);
  meta("property", "og:description", copy.metaDescription);
  meta("property", "og:type", "website");
  meta("property", "og:url", "https://toszan.com.br/booking");
  meta("property", "og:image", "https://toszan.com.br/foto_dj4.JPG");
  meta("name", "twitter:card", "summary_large_image");
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = "https://toszan.com.br/booking";
  let schema = document.head.querySelector<HTMLScriptElement>('script[data-route-schema="booking"]');
  if (!schema) {
    schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.routeSchema = "booking";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Willian Toszan",
    alternateName: "TOSZAN",
    jobTitle: "DJ",
    description: copy.metaDescription,
    url: "https://toszan.com.br/booking",
    image: "https://toszan.com.br/foto_dj4.JPG",
    sameAs: [media.instagram, media.soundcloud, "https://open.spotify.com/artist/27FuT8olmWQ5g51OEwMkWt"],
  });
}

function Action({ href, children, icon, secondary = false, external = false }: {
  href: string; children: ReactNode; icon?: ReactNode; secondary?: boolean; external?: boolean;
}) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
    className={`cine-action ${secondary ? "cine-action-secondary" : ""}`}>{icon}{children}<ArrowUpRight size={16} aria-hidden="true"/></a>;
}
function SectionTitle({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return <div className="cine-section-title">
    <p className="cine-kicker">{label}</p><h2>{title}</h2>
    {intro && <p className="cine-intro">{intro}</p>}
  </div>;
}
const detailsByLanguage: Record<Language, { fields: string[]; subject: string; whatsappIntro: string }> = {
  en: { subject: "DJ Booking TOSZAN", whatsappIntro: "Hello TOSZAN, I'd like to discuss a DJ booking.", fields: ["Date", "City / venue", "Event type", "Set duration", "Budget"] },
  it: { subject: "Richiesta di ingaggio DJ TOSZAN", whatsappIntro: "Ciao TOSZAN, vorrei parlare di un ingaggio DJ.", fields: ["Data", "Città / locale", "Tipo di evento", "Durata del set", "Budget"] },
  pt: { subject: "Contratação DJ TOSZAN", whatsappIntro: "Olá TOSZAN, gostaria de conversar sobre uma contratação como DJ.", fields: ["Data", "Cidade / local", "Tipo de evento", "Duração do set", "Orçamento"] },
  es: { subject: "Contratación DJ TOSZAN", whatsappIntro: "Hola TOSZAN, quisiera hablar de una contratación como DJ.", fields: ["Fecha", "Ciudad / local", "Tipo de evento", "Duración del set", "Presupuesto"] },
  fr: { subject: "Demande de réservation DJ TOSZAN", whatsappIntro: "Bonjour TOSZAN, je souhaite discuter d'une réservation DJ.", fields: ["Date", "Ville / lieu", "Type d'événement", "Durée du set", "Budget"] },
};
export function BookingPage() {
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();
  const copy = bookingCopy[language];
  const details = detailsByLanguage[language];
  const fields = details.fields.map((label) => `${label}:`).join("\n");
  const email = `mailto:dj@toszan.com.br?subject=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(fields)}`;
  const whatsapp = `https://wa.me/393428369444?text=${encodeURIComponent(`${details.whatsappIntro}\n${fields}`)}`;
  useEffect(() => { if (window.location.pathname === "/booking") updateMeta(copy); }, [copy]);

  const reveal = { initial: { opacity: 0, y: reduced ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: reduced ? 0 : 0.65 } };
  return <div className="cinematic-booking">
    <section className="cine-hero" aria-labelledby="booking-title">
      <div className="cine-hero-photo">
        <picture><source media="(max-width: 600px)" srcSet="/editorial/booking-hero-800.webp"/><img src="/editorial/booking-hero.webp" alt={`TOSZAN — ${copy.location}`} decoding="async" width={1200} height={1200}/></picture>
      </div>
      <div className="cine-hero-shade"/>

      <motion.div className="cine-hero-copy cine-wrap" initial={{opacity:0,y:reduced?0:20}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:0.8,delay:reduced?0:0.12}}>
        <p className="cine-kicker"><span className="cine-dot"/>{copy.eyebrow}</p>
        <h1 id="booking-title">TOSZAN<span className="sr-only"> — {copy.location}</span></h1>
        <p className="cine-hero-location">{copy.location}</p>
        <p className="cine-hero-intro">{copy.heroIntro}</p>
        <div className="cine-actions"><Action href="#music" icon={<Headphones size={17}/>}>{copy.listen}</Action><Action href="#booking-contact" secondary>{copy.contact}</Action></div>
      </motion.div>
      <div className="cine-hero-bottom cine-wrap"><p>{copy.genre}</p><a href="#experience" aria-label={copy.watchLive}><span>{copy.watchLive}</span><span aria-hidden="true">↓</span></a></div>
    </section>

    <MusicSection context="booking" />
    <LiveExperience context="booking" />

    <section className="cine-section cine-journey">
      <motion.div {...reveal} className="cine-wrap cine-journey-grid">
        <div className="cine-journey-image"><img src="/optimized/dj/foto_dj3.webp" alt={copy.visualAlt[1]} width={1600} height={1191} loading="lazy"/><span>{copy.based} / {copy.europe}</span></div>
        <div className="cine-journey-copy"><SectionTitle label={copy.formatsLabel} title={copy.formatsTitle} intro={copy.formatsIntro}/>
          <ol className="cine-format-list">{copy.formats.map((format,i)=><li key={format}><span>0{i+1}</span><h3>{format}</h3><span aria-hidden="true">—</span></li>)}</ol>
          <p className="cine-location-line"><MapPin size={15}/>{copy.based}<span>·</span>{copy.europe}</p>
        </div>
      </motion.div>
    </section>

    <section id="mediakit" className="cine-section cine-press">
      <motion.div {...reveal} className="cine-wrap">
        <div className="cine-heading-row"><SectionTitle label={copy.pressLabel} title={copy.mediaKit}/><p className="cine-intro">{copy.technicalItems[2]}</p></div>
        <div className="cine-press-grid">
          <div><h3>{copy.technical}</h3><ul className="cine-tech-list">{copy.technicalItems.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul>
            <a className="cine-text-link" href="/pdf/TOSZAN-BOOK-DJ.pdf" download="TOSZAN-BOOK-DJ.pdf">{language === "pt" ? "BAIXAR BOOK COMPLETO · PDF" : language === "it" ? "SCARICA IL BOOK · PDF" : language === "es" ? "DESCARGAR BOOK · PDF" : language === "fr" ? "TÉLÉCHARGER LE BOOK · PDF" : "DOWNLOAD DJ BOOK · PDF"}<Download size={17}/></a>

          </div>
          <div><h3>{copy.extraTitle}</h3><p className="cine-intro">{copy.extraDesc}</p><a className="cine-text-link" href="/#creator">{copy.creator}<ArrowUpRight size={17}/></a></div>
        </div>
      </motion.div>
    </section>

    <section id="booking-contact" className="cine-section cine-contact">
      <div className="cine-contact-photo" aria-hidden="true"/>
      <motion.div {...reveal} className="cine-wrap">
        <p className="cine-kicker">{copy.contactLabel}</p><h2>{copy.contactTitle}</h2><p className="cine-intro">{copy.contactIntro}</p>
        <div className="premium-contact-buttons">
          <a href={email} aria-label={copy.email}><Mail size={36} /><strong>E-mail</strong></a>
          <a href={whatsapp} aria-label={copy.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={36} /><strong>WhatsApp</strong></a>
          <a href={media.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram size={36} /><strong>Instagram</strong></a>
          <a href={media.soundcloud} aria-label="SoundCloud" target="_blank" rel="noopener noreferrer"><Music2 size={36} /><strong>SoundCloud</strong></a>
        </div>
      </motion.div>
    </section>

  </div>;
}
