import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import "../../styles/cinematic.css";
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Headphones, Instagram, Mail, MapPin, MessageCircle, Music2, Download } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { bookingCopy, type BookingCopy } from "../../data/bookingCopy";

const media = {
  mix: "https://soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash",
  embed: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash&color=%23FFB000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
  instagram: "https://www.instagram.com/toszan.willian/",
  soundcloud: "https://soundcloud.com/dj-willian-toszan",
};
const liveImages = [
  "/reels/posters/09-wide-crowd-room-proof.webp",
  "/optimized/dj/foto_dj2.webp",
  "/optimized/dj/foto_dj1.webp",
];
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
  meta("property", "og:url", "https://toszan-media-kit.vercel.app/booking");
  meta("property", "og:image", "https://toszan-media-kit.vercel.app/foto_dj4.JPG");
  meta("name", "twitter:card", "summary_large_image");
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = "https://toszan-media-kit.vercel.app/booking";
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
    url: "https://toszan-media-kit.vercel.app/booking",
    image: "https://toszan-media-kit.vercel.app/foto_dj4.JPG",
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
  it: { subject: "Richiesta booking DJ TOSZAN", whatsappIntro: "Ciao TOSZAN, vorrei parlare di un booking DJ.", fields: ["Data", "Città / locale", "Tipo di evento", "Durata del set", "Budget"] },
  pt: { subject: "Contratação DJ TOSZAN", whatsappIntro: "Olá TOSZAN, gostaria de conversar sobre uma contratação como DJ.", fields: ["Data", "Cidade / local", "Tipo de evento", "Duração do set", "Orçamento"] },
  es: { subject: "Contratación DJ TOSZAN", whatsappIntro: "Hola TOSZAN, quisiera hablar de una contratación como DJ.", fields: ["Fecha", "Ciudad / local", "Tipo de evento", "Duración del set", "Presupuesto"] },
  fr: { subject: "Demande de booking DJ TOSZAN", whatsappIntro: "Bonjour TOSZAN, je souhaite discuter d'un booking DJ.", fields: ["Date", "Ville / lieu", "Type d'événement", "Durée du set", "Budget"] },
};
export function BookingPage() {
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();
  const copy = bookingCopy[language];
  const details = detailsByLanguage[language];
  const fields = details.fields.map((label) => `${label}:`).join("\n");
  const email = `mailto:dj@toszan.com.br?subject=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(fields)}`;
  const whatsapp = `https://wa.me/393428369444?text=${encodeURIComponent(`${details.whatsappIntro}\n${fields}`)}`;
  useEffect(() => { updateMeta(copy); }, [copy]);

  const reveal = { initial: { opacity: 0, y: reduced ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: reduced ? 0 : 0.65 } };
  return <div className="cinematic-booking">
    <section className="cine-hero" aria-labelledby="booking-title">
      <div className="cine-hero-photo">
        <picture><source media="(max-width: 600px)" srcSet="/editorial/booking-hero-800.webp"/><img src="/editorial/booking-hero.webp" alt={`TOSZAN — ${copy.location}`} fetchPriority="high" decoding="async" width={1200} height={1200}/></picture>
      </div>
      <div className="cine-hero-shade"/>
      <div className="cine-hero-index" aria-hidden="true">45°27′51″ N · 09°11′25″ E</div>
      <motion.div className="cine-hero-copy cine-wrap" initial={{opacity:0,y:reduced?0:20}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:0.8,delay:reduced?0:0.12}}>
        <p className="cine-kicker"><span className="cine-dot"/>{copy.eyebrow}</p>
        <h1 id="booking-title">TOSZAN<span className="sr-only"> — {copy.location}</span></h1>
        <p className="cine-hero-location">{copy.location}</p>
        <p className="cine-hero-intro">{copy.heroIntro}</p>
        <div className="cine-actions"><Action href="#promo-mix" icon={<Headphones size={17}/>}>{copy.listen}</Action><Action href="#booking-contact" secondary>{copy.contact}</Action></div>
      </motion.div>
      <div className="cine-hero-bottom cine-wrap"><p>{copy.genre}</p><a href="#experience"><span>{copy.watchLive}</span><span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="music" className="cine-section cine-sound">
      <div id="promo-mix" className="cine-anchor"/>
      <motion.div {...reveal} className="cine-wrap cine-sound-grid">
        <SectionTitle label={copy.soundLabel} title={copy.soundTitle} intro={copy.soundIntro}/>
        <div className="cine-player">
          <div className="cine-player-heading"><span className="cine-kicker">{copy.setLabel}</span><Headphones size={22} strokeWidth={1}/></div>
          <h3>{copy.setTitle}</h3>
          <iframe title={copy.playerTitle} width="100%" height="166" loading="lazy" allow="autoplay" src={media.embed.replace("%23FFB000","%23bd9c6a")} className="cine-soundcloud"/>
          <a href={media.mix} target="_blank" rel="noopener noreferrer" className="cine-text-link">{copy.openSoundcloud}<ArrowUpRight size={17}/></a>
        </div>
      </motion.div>
      <div className="cine-wrap cine-sound-note"><span>{copy.musicFirst}</span><p>{copy.musicFirstDesc}</p><a href="/#music" className="cine-text-link">{copy.musicLink}<ArrowRight size={17}/></a></div>
    </section>

    <section id="experience" className="cine-section cine-experience">
      <motion.div {...reveal} className="cine-wrap">
        <div className="cine-heading-row"><SectionTitle label={copy.experienceLabel} title={copy.experienceTitle}/><p className="cine-intro">{copy.experienceIntro}</p></div>
        <div className="cine-live-spread">
          <figure className="cine-stage-wide"><img src="/optimized/foto_2.webp" alt={copy.visualAlt[2]} width={1600} height={896} loading="lazy" decoding="async"/><figcaption><span>01 / {copy.visualLabels[2]}</span><span>TOSZAN</span></figcaption></figure>
          <div className="cine-live-film"><video controls playsInline preload="none" poster="/reels/posters/09-wide-crowd-room-proof.webp" aria-label={copy.watchLive}><source src="/reels/videos/09-wide-crowd-room-proof.mp4" type="video/mp4"/></video><span className="cine-film-caption">02 / {copy.visualLabels[0]}</span></div>
        </div>
        <div className="cine-live-foot"><span className="cine-kicker">{copy.genre}</span><a className="cine-text-link" href="/#experience">{copy.watchLive}<ArrowUpRight size={18}/></a></div>
        <div className="cine-photo-story">
          {liveImages.slice(1).map((src,i)=><figure key={src}><img src={src} alt={copy.visualAlt[i+1]} loading="lazy" width={1600} height={1300}/><figcaption>0{i+3} / {copy.visualLabels[i+1]}</figcaption></figure>)}
        </div>
      </motion.div>
    </section>

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
        <div className="cine-heading-row"><SectionTitle label="TOSZAN / PRESS" title={copy.mediaKit}/><p className="cine-intro">{copy.technicalItems[2]}</p></div>
        <div className="cine-press-grid">
          <div><h3>{copy.technical}</h3><ul className="cine-tech-list">{copy.technicalItems.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul>
            <a className="cine-text-link" href="/foto_dj4.JPG" download="TOSZAN-official-live-photo.jpg">{t("media.label")} · JPG<Download size={17}/></a>
            <a className="cine-text-link" href="/#mediakit">{copy.mediaKit}<ArrowUpRight size={17}/></a>
          </div>
          <div><h3>{copy.extraTitle}</h3><p className="cine-intro">{copy.extraDesc}</p><a className="cine-text-link" href="/creator">{copy.creator}<ArrowUpRight size={17}/></a></div>
        </div>
      </motion.div>
    </section>

    <section id="booking-contact" className="cine-section cine-contact">
      <div className="cine-contact-photo" aria-hidden="true"/>
      <motion.div {...reveal} className="cine-wrap">
        <p className="cine-kicker">{copy.contactLabel}</p><h2>{copy.contactTitle}</h2><p className="cine-intro">{copy.contactIntro}</p>
        <div className="cine-actions"><Action href={email} icon={<Mail size={17}/>}>{copy.email}</Action><Action href={whatsapp} secondary external icon={<MessageCircle size={17}/>}>{copy.whatsapp}</Action></div>
        <a href={email} className="cine-contact-email">dj@toszan.com.br<ArrowUpRight size={30}/></a>
        <div className="cine-socials"><a href={media.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={15}/>{copy.instagram}<ArrowUpRight size={14}/></a><a href={media.soundcloud} target="_blank" rel="noopener noreferrer"><Music2 size={15}/>SoundCloud<ArrowUpRight size={14}/></a><a href="/#mediakit">{copy.mediaKit}<ArrowUpRight size={14}/></a></div>
      </motion.div>
    </section>
    <footer className="cine-footer cine-wrap"><span>{copy.footer}</span><a href="#booking-title">TOSZAN ↑</a></footer>
  </div>;
}
