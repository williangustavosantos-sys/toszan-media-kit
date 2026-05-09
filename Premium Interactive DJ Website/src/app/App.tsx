import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { LiveExperience } from "./components/LiveExperience";
import { BrandExperience } from "./components/BrandExperience";
import { MusicSection } from "./components/MusicSection";
import { MediaKit } from "./components/MediaKit";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.background = "#0B0B0B";
    document.body.style.overflowX = "hidden";
    document.body.style.color = "#ffffff";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

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
          <HeroSection />
          <LiveExperience />
          <BrandExperience />
          <MediaKit />
          <MusicSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  );
}
