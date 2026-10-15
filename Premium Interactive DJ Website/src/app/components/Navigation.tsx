import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { ToszanLogo } from "./ToszanLogo";
import { creatorCopy, getCreatorLanguage } from "../../data/creatorCopy";
import { bookingCopy } from "../../data/bookingCopy";
import "../../styles/cinematic.css";

export function Navigation() {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileTabs = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const brand = path === "/creator" || path === "/analytics";
  const booking = path === "/booking";
  const effectiveLanguage: Language = language;
  const text = creatorCopy[getCreatorLanguage(effectiveLanguage)];
  const navUi: Record<Language, { general: string; booking: string; creator: string; skip: string; nav: string; home: string; open: string; close: string }> = {
    en: { general: "GENERAL", booking: "DJ / BOOKING", creator: "CREATOR", skip: "Skip to content", nav: "Main navigation", home: "TOSZAN — General", open: "Open menu", close: "Close menu" },
    pt: { general: "GERAL", booking: "DJ / BOOKING", creator: "CREATOR", skip: "Ir para o conteúdo", nav: "Navegação principal", home: "TOSZAN — Visão geral", open: "Abrir menu", close: "Fechar menu" },
    it: { general: "GENERALE", booking: "DJ / BOOKING", creator: "CREATOR", skip: "Vai al contenuto", nav: "Navigazione principale", home: "TOSZAN — Generale", open: "Apri menu", close: "Chiudi menu" },
    es: { general: "GENERAL", booking: "DJ / BOOKING", creator: "CREATOR", skip: "Ir al contenido", nav: "Navegación principal", home: "TOSZAN — General", open: "Abrir menú", close: "Cerrar menú" },
    fr: { general: "GÉNÉRAL", booking: "DJ / BOOKING", creator: "CREATOR", skip: "Aller au contenu", nav: "Navigation principale", home: "TOSZAN — Accueil", open: "Ouvrir le menu", close: "Fermer le menu" },
  };
  const labels = navUi[effectiveLanguage];
  const cta = brand ? text.nav.cta : bookingCopy[language].contact;
  const ctaHref = brand ? "/#contact" : booking ? "/#booking-contact" : "/#booking-contact";
  const [activeSection, setActiveSection] = useState("top");
  useEffect(() => {
    if (path === "/analytics") return;
    const sections = ["top", "dj-booking", "creator"].map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const current = () => {
      const line = window.scrollY + parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height") || "114") + 32;
      const hit = [...sections].reverse().find(el => el.offsetTop <= line);
      setActiveSection(hit?.id || "top");
    };
    current(); window.addEventListener("scroll", current, { passive: true });
    return () => window.removeEventListener("scroll", current);
  }, [path]);

  useLayoutEffect(() => {
    const measure = () => {
      const bottom = Math.max(header.current?.getBoundingClientRect().bottom ?? 0,
        mobileTabs.current?.getBoundingClientRect().bottom ?? 0);
      document.documentElement.style.setProperty("--header-height", `${Math.ceil(bottom)}px`);
    };
    const observer = new ResizeObserver(measure);
    if (header.current) observer.observe(header.current);
    if (mobileTabs.current) observer.observe(mobileTabs.current);
    measure();
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (path !== "/analytics" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
        setActiveSection(id);
      }
      setMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (path !== "/analytics") {
      e.preventDefault();
      const target = document.getElementById("top");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", "/#top");
        setActiveSection("top");
      }
      setMenuOpen(false);
    } else {
      close();
    }
  };

  const routeLinks = [
    { label: labels.general, href: "/#top", current: path !== "/analytics" && activeSection === "top" },
    { label: labels.booking, href: "/#dj-booking", current: path !== "/analytics" && activeSection === "dj-booking" },
    { label: labels.creator, href: "/#creator", current: path !== "/analytics" && activeSection === "creator" },
  ];
  const localLinks: {label:string;href:string}[] = [];
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
    <a href="#main-content" className="cine-skip">{labels.skip}</a>
    <nav ref={header} className={`cine-navigation ${scrolled||menuOpen?"is-scrolled":""}`} aria-label={labels.nav}>
      <a href="/" className="cine-nav-logo" aria-label={labels.home} onClick={handleLogoClick}><ToszanLogo logoHeight={24} gold={false}/></a>
      <div className="cine-nav-links">
        <div className="cine-nav-routes">{routeLinks.map(link=><a href={link.href} key={link.href} aria-current={link.current?"page":undefined} onClick={(e)=>handleNavClick(e, link.href)}>{link.label}</a>)}</div>
        <div className="cine-nav-local">{localLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div>
      </div>
      <div className="cine-nav-tools"><a className="cine-nav-cta" href={ctaHref}>{cta} ↗</a><LanguageSelector/><button ref={toggle} type="button" className="cine-menu-toggle" aria-label={menuOpen?labels.close:labels.open} aria-expanded={menuOpen} aria-controls="toszan-mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button></div>
    </nav>
    <nav ref={mobileTabs} className="toszan-mobile-tabs" aria-label={labels.nav}>
      {routeLinks.map(link => <a key={link.href} href={link.href} aria-current={link.current ? "page" : undefined} onClick={(e)=>handleNavClick(e, link.href)}>{link.label}</a>)}
    </nav>
    {menuOpen&&<div ref={menu} id="toszan-mobile-menu" className="cine-menu"><div className="cine-menu-routes">{routeLinks.map(link=><a key={link.href} href={link.href} aria-current={link.current?"page":undefined} onClick={(e)=>handleNavClick(e, link.href)}>{link.label}</a>)}</div><div className="cine-menu-local">{localLinks.map(link=><a key={link.href} href={link.href} onClick={close}>{link.label}</a>)}</div><a className="cine-menu-cta" href={ctaHref} onClick={close}>{cta} ↗</a></div>}
  </>;
}
