import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider, useLanguage, type Language } from "./context/LanguageContext";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { BookingPage } from "./components/BookingPage";
import { CreatorPage } from "./components/CreatorPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import "../styles/three-path.css";
import "../styles/single-page.css";
import "../styles/premium-ui-finisher.css";

function PDFDownloads() {
  const {language} = useLanguage();
  const labels: Record<Language, [string, string]> = {
    en: ["DOWNLOAD DJ BOOK · PDF", "DOWNLOAD COMPLETE MEDIA KIT · PDF"],
    pt: ["BAIXAR BOOK DJ · PDF", "BAIXAR MEDIA KIT COMPLETO · PDF"],
    it: ["SCARICA IL BOOK DJ · PDF", "SCARICA IL MEDIA KIT COMPLETO · PDF"],
    es: ["DESCARGAR BOOK DJ · PDF", "DESCARGAR MEDIA KIT COMPLETO · PDF"],
    fr: ["TÉLÉCHARGER LE BOOK DJ · PDF", "TÉLÉCHARGER LE MEDIA KIT COMPLET · PDF"],
  };
  return <div className="single-page-downloads" id="downloads">
    <a href="/pdf/TOSZAN-BOOK-DJ.pdf" download="TOSZAN-BOOK-DJ.pdf">{labels[language][0]}</a>
    <a href="/pdf/TOSZAN-MEDIA-KIT-COMPLETO.pdf" download="TOSZAN-MEDIA-KIT-COMPLETO.pdf">{labels[language][1]}</a>
  </div>;
}

function getRoutePath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export default function App() {
  const [routePath, setRoutePath] = useState(getRoutePath);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    document.body.style.background = "#0B0B0B";
    document.body.style.color = "#ffffff";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const handleRoute = () => setRoutePath(getRoutePath());
    window.addEventListener("popstate", handleRoute);
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  // Deep links may arrive before React has mounted their target section.
  // Re-apply anchor navigation after route content is present.
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(decodeURIComponent(hash));
      target?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    };
    const frame = window.requestAnimationFrame(scrollToHash);
    const retry = window.setTimeout(scrollToHash, 350);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [routePath]);

  useEffect(() => {
    if (routePath === "/booking" || routePath === "/creator") {
      window.location.replace("/#" + (routePath === "/booking" ? "dj-booking" : "creator"));
    }
  }, [routePath]);
  const isAnalyticsRoute = routePath === "/analytics";

  return (
    <MotionConfig reducedMotion="user"><LanguageProvider>
      <div
        className="min-h-screen w-full"
        style={{
          background: "#0B0B0B",
          color: "#ffffff",
          position: "relative",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {isAnalyticsRoute ? <AnalyticsPage /> : (
            <>
              <div id="top"><HeroSection /></div>
              <div id="dj-booking" className="single-page-section"><BookingPage /></div>
              <div id="creator" className="single-page-section"><CreatorPage /></div>
              <PDFDownloads />
            </>
          )}
        </main>
      </div>
    </LanguageProvider></MotionConfig>
  );
}
