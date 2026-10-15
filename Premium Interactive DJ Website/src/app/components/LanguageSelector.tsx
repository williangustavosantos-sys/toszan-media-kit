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

export function LanguageSelector({ creatorLanguagesOnly = false }: { creatorLanguagesOnly?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visibleLanguages = languages;
  const selectedLanguage = visibleLanguages.some((item) => item.code === language)
    ? language
    : "en";
  const activeLang = visibleLanguages.find((item) => item.code === selectedLanguage)!;
  const selectorLabel: Record<Language, string> = {
    en: "Change language",
    pt: "Alterar idioma",
    it: "Cambia lingua",
    es: "Cambiar idioma",
    fr: "Changer de langue",
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const items = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') || []);
        const index = items.indexOf(document.activeElement as HTMLButtonElement);
        items[(index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${selectorLabel[selectedLanguage]}. ${activeLang.name}`}
        className="flex min-h-11 items-center gap-2 px-3 py-2"
        style={{
          background: isOpen ? "rgba(189,156,106,0.12)" : "rgba(255,255,255,0.035)",
          backdropFilter: "blur(20px)",
          border: isOpen ? "1px solid rgba(189,156,106,0.55)" : "1px solid rgba(255,255,255,0.12)",
          borderRadius: "2px",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isOpen ? "0 0 30px rgba(189,156,106,0.13)" : "none",
        }}
      >
        <Globe size={16} style={{ color: isOpen ? "#bd9c6a" : "rgba(255,255,255,0.5)" }} />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            fontWeight: 600,
            color: isOpen ? "#d8ba8a" : "rgba(255,255,255,0.7)",
          }}
        >
          {activeLang.label}
        </span>
        <span style={{ fontSize: "0.9rem" }}>{activeLang.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 z-[200]"
            style={{
              minWidth: "180px",
              background: "rgba(11,11,11,0.95)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(189,156,106,0.28)",
              borderRadius: "2px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(189,156,106,0.12), 0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div className="py-2">
              {visibleLanguages.map((lang, i) => (
                <motion.button
                  type="button"
                  role="menuitem"
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full flex items-center justify-between px-4 py-3"
                  style={{
                    background: selectedLanguage === lang.code ? "rgba(189,156,106,0.12)" : "transparent",
                    borderLeft: selectedLanguage === lang.code ? "2px solid #bd9c6a" : "2px solid transparent",
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
                        color: selectedLanguage === lang.code ? "#d8ba8a" : "rgba(255,255,255,0.85)",
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
          type="button"
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: language === lang.code ? "#d8ba8a" : "rgba(255,255,255,0.5)",
            background: language === lang.code ? "rgba(189,156,106,0.1)" : "rgba(255,255,255,0.02)",
            border: language === lang.code ? "1px solid rgba(189,156,106,0.45)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "2px",
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
