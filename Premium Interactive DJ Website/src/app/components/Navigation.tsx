import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { ToszanLogo } from "./ToszanLogo";
import { creatorCopy, getCreatorLanguage } from "../../data/creatorCopy";
import { bookingCopy } from "../../data/bookingCopy";
import "../../styles/cinematic.css";

export function Navigation() {
  const { t, language } = useLanguage();
  const text = creatorCopy[getCreatorLanguage(language)];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const brand = path === "/creator" || path === "/analytics";
  const booking = path === "/booking";
  const routeLabels = {
    general: language === "pt" ? "Geral" : language === "it" ? "Generale" : language === "es" ? "General" : language === "fr" ? "Accueil" : "General",
    booking: language === "pt" ? "Booking" : language === "it" ? "Booking" : language === "es" ? "Booking" : language === "fr" ? "Booking" : "Booking",
    creator: "Creator",
  };
  const cta = brand ? text.nav.cta : bookingCopy[language].contact;
  const ctaHref = brand ? "/creator#contact" : booking ? "#booking-contact" : "/booking";
  const routeLinks = [
    { label: routeLabels.general, href: "/", current: path === "/" },
    { label: routeLabels.booking, href: "/booking", current: booking },
    { label: routeLabels.creator, href: "/creator", current: path === "/creator" },
  ];
  const localLinks = brand ? [
    { label: text.nav.work, href: "/creator#work" },
    { label: text.nav.audience, href: "/creator#audience" },
    { label: text.nav.services, href: "/creator#services" },
  ] : [
    { label: t("nav.music"), href: "#music" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.mediaKit"), href: "#mediakit" },
  ];
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>35); onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); return()=>window.removeEventListener("scroll",onScroll); },[]);
  useEffect(() => {
    if(!menuOpen) return;
    const old=document.documentElement.style.overflow;
    document.documentElement.style.overflow="hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key=(e:KeyboardEvent)=>{
      if(e.key==="Escape") {setMenuOpen(false);toggle.current?.focus();}
      if(e.key==="Tab") {
        const items=[toggle.current,...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a")||[])].filter(Boolean) as HTMLElement[];
        const first=items[0],last=items[items.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first?.focus();}
      }
    };
    window.addEventListener("keydown",key);
    const resize=()=>{if(window.innerWidth>=1100)setMenuOpen(false);};
    window.addEventListener("resize",resize);
    return()=>{document.documentElement.style.overflow=old;window.removeEventListener("keydown",key);window.removeEventListener("resize",resize);};
  },[menuOpen]);
  const close=()=>setMenuOpen(false);
  return <>
    <a href="#main-content" className="cine-skip">{language==="it"?"Vai al contenuto":language==="pt"?"Ir para o conteúdo":"Skip to content"}</a>
    <nav className={`cine-navigation ${scrolled||menuOpen?"is-scrolled":""}`} aria-label={language==="it"?"Navigazione principale":language==="pt"?"Navegação principal":"Main navigation"}>
      <a href="/" className="cine-nav-logo" aria-label="TOSZAN home" onClick={close}><ToszanLogo logoHeight={24} gold={false}/></a>
      <div className="cine-nav-links">
        <div className="cine-nav-routes">{routeLinks.map(link=><a href={link.href} key={link.href} aria-current={link.current?"page":undefined}>{link.label}</a>)}</div>
        <div className="cine-nav-local">{localLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div>
      </div>
      <div className="cine-nav-tools"><a className="cine-nav-cta" href={ctaHref}>{cta} ↗</a><LanguageSelector creatorLanguagesOnly={brand}/><button ref={toggle} type="button" className="cine-menu-toggle" aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} aria-controls="toszan-mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button></div>
    </nav>
    {menuOpen&&<div ref={menu} id="toszan-mobile-menu" className="cine-menu"><div className="cine-menu-routes">{routeLinks.map(link=><a key={link.href} href={link.href} aria-current={link.current?"page":undefined} onClick={close}>{link.label}</a>)}</div><div className="cine-menu-local">{localLinks.map(link=><a key={link.href} href={link.href} onClick={close}>{link.label}</a>)}</div><a className="cine-menu-cta" href={ctaHref} onClick={close}>{cta} ↗</a></div>}
  </>;
}
