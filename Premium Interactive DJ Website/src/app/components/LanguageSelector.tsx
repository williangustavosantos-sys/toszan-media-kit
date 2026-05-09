import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";

const languages = [
  { code: "en" as Language, label: "EN", flag: "🇬🇧", name: "English" },
  { code: "pt" as Language, label: "PT", flag: "🇧🇷", name: "Português" },
  { code: "it" as Language, label: "IT", flag: "🇮🇹", name: "Italiano" },
  { code: "es" as Language, label: "ES", flag: "🇪🇸", name: "Español" },
  { code: "fr" as Language, label: "FR", flag: "🇫🇷", name: "Français" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.code === language)!;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2"
        style={{
          background: isOpen ? "rgba(255,176,0,0.12)" : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: isOpen ? "1px solid rgba(255,176,0,0.5)" : "1px solid rgba(255,255,255,0.12)",
          borderRadius: "6px",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isOpen ? "0 0 30px rgba(255,176,0,0.15)" : "none",
        }}
      >
        <Globe size={16} style={{ color: isOpen ? "#FFB000" : "rgba(255,255,255,0.5)" }} />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            fontWeight: 600,
            color: isOpen ? "#FFB000" : "rgba(255,255,255,0.7)",
          }}
        >
          {activeLang.label}
        </span>
        <span style={{ fontSize: "0.9rem" }}>{activeLang.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 z-[200]"
            style={{
              minWidth: "180px",
              background: "rgba(11,11,11,0.95)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255,176,0,0.25)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(255,176,0,0.15), 0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div className="py-2">
              {languages.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full flex items-center justify-between px-4 py-3"
                  style={{
                    background: language === lang.code ? "rgba(255,176,0,0.12)" : "transparent",
                    borderLeft: language === lang.code ? "2px solid #FFB000" : "2px solid transparent",
                    transition: "all 0.3s",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "1.1rem" }}>{lang.flag}</span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: language === lang.code ? "#FFB000" : "rgba(255,255,255,0.85)",
                      }}
                    >
                      {lang.name}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LanguageSelectorMobile() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: language === lang.code ? "#FFB000" : "rgba(255,255,255,0.5)",
            background: language === lang.code ? "rgba(255,176,0,0.1)" : "rgba(255,255,255,0.02)",
            border: language === lang.code ? "1px solid rgba(255,176,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
