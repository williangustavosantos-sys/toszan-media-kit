import { ArrowUpRight, Disc3, Film, Users } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import creatorPortrait from "../../imports/creator-portrait-premium.webp";
import { serviceLinks } from "./MusicSection";
import "../../styles/three-path.css";

const messages: Record<Language, {intro:string;dj:string;djBody:string;djLink:string;creator:string;creatorBody:string;creatorLink:string;listen:string;live:string}> = {
  pt:{intro:"Escolha a experiência",dj:"DJ / Contratação",djBody:"Sets, lançamentos, apresentações reais e tudo para contratar TOSZAN.",djLink:"Explorar o DJ",creator:"Creator / Marcas",creatorBody:"Conteúdo, campanhas, vídeos e resultados verificados para marcas.",creatorLink:"Ver portfólio Creator",listen:"10 músicas",live:"9 vídeos reais"},
  en:{intro:"Choose your experience",dj:"DJ / Booking",djBody:"Sets, releases, real live performances and booking details.",djLink:"Explore DJ booking",creator:"Creator / Brands",creatorBody:"Content, campaigns, video work and verified results for brands.",creatorLink:"Explore Creator portfolio",listen:"10 tracks",live:"9 real videos"},
  it:{intro:"Scegli l'esperienza",dj:"DJ / Ingaggi",djBody:"Set, uscite, esibizioni reali e informazioni per gli ingaggi.",djLink:"Esplora DJ",creator:"Creator / Brand",creatorBody:"Contenuti, campagne, video e risultati verificati per i brand.",creatorLink:"Scopri il portfolio",listen:"10 brani",live:"9 video reali"},
  es:{intro:"Elige tu experiencia",dj:"DJ / Contratación",djBody:"Sets, lanzamientos, actuaciones reales y detalles de contratación.",djLink:"Explorar DJ",creator:"Creador / Marcas",creatorBody:"Contenido, campañas, vídeos y resultados verificados.",creatorLink:"Ver el portafolio",listen:"10 temas",live:"9 vídeos reales"},
  fr:{intro:"Choisissez votre univers",dj:"DJ / Booking",djBody:"Sets, sorties, performances réelles et informations de réservation.",djLink:"Découvrir le DJ",creator:"Créateur / Marques",creatorBody:"Contenus, campagnes, vidéos et résultats vérifiés pour les marques.",creatorLink:"Voir le portfolio",listen:"10 titres",live:"9 vidéos réelles"}
};

export function PortalSection() {
  const {language}=useLanguage();
  const c=messages[language];
  return <section id="explore" className="toszan-portals" aria-label={c.intro}>
    <div className="general-shell">
      <p className="general-eyebrow">{c.intro}</p>
      <div className="toszan-portal-grid">
        <a href="/booking" className="toszan-portal toszan-portal-dj">
          <img src="/editorial/booking-hero.webp" alt="" aria-hidden="true" loading="lazy"/>
          <div className="toszan-portal-overlay"/>
          <span className="toszan-portal-index"><Disc3 size={20}/>{c.listen} <span>·</span> <Film size={20}/>{c.live}</span>
          <div className="toszan-portal-copy"><span>01 / TOSZAN</span><h2>{c.dj}</h2><p>{c.djBody}</p><strong>{c.djLink}<ArrowUpRight size={25}/></strong></div>
        </a>
        <a href="/creator" className="toszan-portal toszan-portal-creator">
          <div className="toszan-portal-creator-light" aria-hidden="true"/>
          <img src={creatorPortrait} alt="" aria-hidden="true" loading="lazy"/>
          <div className="toszan-portal-overlay"/>
          <span className="toszan-portal-index"><Users size={20}/> WILLIAN TOSZAN</span>
          <div className="toszan-portal-copy"><span>02 / WILLIAN</span><h2>{c.creator}</h2><p>{c.creatorBody}</p><strong>{c.creatorLink}<ArrowUpRight size={25}/></strong></div>
        </a>
      </div>
      <div className="toszan-platform-bar">
        <h3>{language === "pt" ? "OUÇA TOSZAN NAS PRINCIPAIS PLATAFORMAS" : language === "es" ? "ESCUCHA TOSZAN EN LAS PLATAFORMAS" : language === "fr" ? "ÉCOUTEZ TOSZAN SUR LES PLATEFORMES" : language === "it" ? "ASCOLTA TOSZAN SULLE PIATTAFORME" : "LISTEN TO TOSZAN ON EVERY PLATFORM"}</h3>
        <div>{[...serviceLinks, {label:"SoundCloud",href:"https://soundcloud.com/dj-willian-toszan"}].map(item =>
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
            <img src={`/platform-icons/${item.label === "Apple Music" ? "applemusic" : item.label === "Amazon Music" ? "amazonmusic" : item.label.toLowerCase()}.svg`} alt="" /><strong>{item.label}</strong><ArrowUpRight size={15}/>
          </a>
        )}</div>
      </div>
    </div>
  </section>;
}
