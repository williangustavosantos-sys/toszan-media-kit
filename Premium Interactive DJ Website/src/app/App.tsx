import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { LiveExperience } from "./components/LiveExperience";
import { BrandExperience } from "./components/BrandExperience";
import { MusicSection } from "./components/MusicSection";
import { MediaKit } from "./components/MediaKit";
import { ContactSection } from "./components/ContactSection";
import { BookingPage } from "./components/BookingPage";
import { CreatorPage } from "./components/CreatorPage";
import { AnalyticsPage } from "./components/AnalyticsPage";

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

  const isBookingRoute = routePath === "/booking";
  const isCreatorRoute = routePath === "/creator";
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
          {isBookingRoute ? (
            <BookingPage />
          ) : isCreatorRoute ? (
            <CreatorPage />
          ) : isAnalyticsRoute ? (
            <AnalyticsPage />
          ) : (
            <>
              <HeroSection />
              <MusicSection context="general" />
              <LiveExperience context="general" />
              <BrandExperience />
              <MediaKit />
              <ContactSection />
            </>
          )}
        </main>
      </div>
    </LanguageProvider></MotionConfig>
  );
}
