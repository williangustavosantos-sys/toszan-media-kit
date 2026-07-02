import { useEffect, useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { LiveExperience } from "./components/LiveExperience";
import { BrandExperience } from "./components/BrandExperience";
import { MusicSection } from "./components/MusicSection";
import { MediaKit } from "./components/MediaKit";
import { ContactSection } from "./components/ContactSection";
import { BookingPage } from "./components/BookingPage";

function getRoutePath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export default function App() {
  const [routePath, setRoutePath] = useState(getRoutePath);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.background = "#0B0B0B";
    document.body.style.overflowX = "hidden";
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

  const isBookingRoute = routePath === "/booking";

  return (
    <LanguageProvider>
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
        <main>
          {isBookingRoute ? (
            <BookingPage />
          ) : (
            <>
              <HeroSection />
              <LiveExperience />
              <MusicSection />
              <BrandExperience />
              <MediaKit />
              <ContactSection />
            </>
          )}
        </main>
      </div>
    </LanguageProvider>
  );
}
