import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { ToszanLogo } from "./ToszanLogo";

export function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.mediaKit"), href: "#mediakit" },
    { label: t("nav.music"), href: "#music" },
    { label: t("nav.booking"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        style={{
          background: scrolled ? "rgba(11,11,11,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,176,0,0.1)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo / Name */}
        <button
          onClick={() => handleLink("#hero")}
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            padding: 0, 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.1rem",
              letterSpacing: "0.22em",
              marginRight: "-0.22em",
              color: "#ffffff",
              lineHeight: 1,
              marginBottom: "-0.4rem",
              transition: "opacity 0.4s",
            }}
          >
            WILLIAN
          </span>
          <ToszanLogo
            logoHeight={24}
            gold={false}
          />
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className="relative group"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full"
                style={{ background: "linear-gradient(90deg, #FFB000, #FF8C00)", transition: "width 0.3s ease" }}
              />
            </button>
          ))}
        </div>

        {/* Desktop CTA & Language - RIGHT */}
        <div className="hidden lg:flex items-center gap-6 ml-auto">
          <button
            onClick={() => handleLink("#contact")}
            className="px-6 py-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0B0B0B",
              background: "linear-gradient(135deg, #FFB000, #FF8C00)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(255,176,0,0.25)",
              transition: "opacity 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(255,176,0,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,176,0,0.25)";
            }}
          >
            {t("nav.booking")}
          </button>

          {/* Language Selector */}
          <LanguageSelector />
        </div>

        {/* Mobile: Language + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSelector />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#FFB000", background: "none", border: "none", cursor: "pointer" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(11,11,11,0.97)", backdropFilter: "blur(30px)" }}
          >
            {/* Warm ambient */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,176,0,0.06) 0%, transparent 70%)" }} />

            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                onClick={() => handleLink(link.href)}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.8)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              onClick={() => handleLink("#contact")}
              className="mt-4 px-10 py-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#0B0B0B",
                background: "linear-gradient(135deg, #FFB000, #FF8C00)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 40px rgba(255,176,0,0.3)",
              }}
            >
              {t("nav.booking")}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
