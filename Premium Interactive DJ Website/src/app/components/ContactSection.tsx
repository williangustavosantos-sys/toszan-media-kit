import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Instagram, MessageCircle, Mail, MapPin, Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const contactItems = [
    {
      icon: <Instagram size={18} />,
      label: "Instagram",
      value: "@toszan.willian",
      href: "https://www.instagram.com/toszan.willian?igsh=Zm9md2s2ODB5cXp2&utm_source=qr",
      cta: "Follow",
      accent: "#FFB000",
      accentRgb: "255,176,0",
    },
    {
      icon: <MessageCircle size={18} />,
      label: "WhatsApp",
      value: "+39 342 836 9444",
      href: "https://wa.me/393428369444?text=Ciao%2C%20vorrei%20avere%20pi%C3%B9%20informazioni",
      cta: "Message",
      accent: "#00A86B",
      accentRgb: "0,168,107",
    },
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "dj@toszan.com.br",
      href: "mailto:dj@toszan.com.br",
      cta: "Send",
      accent: "#FFB000",
      accentRgb: "255,176,0",
    },
    {
      icon: <Music size={18} />,
      label: "SoundCloud",
      value: "@dj-willian-toszan",
      href: "https://soundcloud.com/dj-willian-toszan",
      cta: "Listen",
      accent: "#FF8C00",
      accentRgb: "255,140,0",
    },
    {
      icon: <MapPin size={18} />,
      label: "Based In",
      value: "Milan, Italy",
      href: null as null,
      cta: null,
      accent: "#FFB000",
      accentRgb: "255,176,0",
    },
  ];

  const footerNavLinks = [
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.mediaKit"), href: "#mediakit" },
    { label: t("nav.music"), href: "#music" },
    { label: t("nav.booking"), href: "#contact" },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#0B0B0B", position: "relative" }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,176,0,0.07) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,176,0,0.35), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
              {t("contact.label")}
            </span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "0.08em", color: "#ffffff", lineHeight: 1 }}>
            {t("contact.title")}
          </h2>
          <p className="mt-3" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.6rem", color: "rgba(255,176,0,0.6)" }}>
            {t("contact.tagline")}
          </p>
          <p className="mt-4 max-w-md mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", lineHeight: 1.85, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">


          {/* Icons row instead of cards */}
          <div className="flex flex-wrap items-center justify-center gap-8 py-10">
            {contactItems.filter(item => item.href).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={item.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 flex items-center justify-center relative group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "50%",
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = item.accent;
                    el.style.borderColor = item.accent;
                    el.style.background = `rgba(${item.accentRgb},0.05)`;
                    el.style.boxShadow = `0 0 40px rgba(${item.accentRgb},0.15)`;
                    el.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "rgba(255,255,255,0.6)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ transform: "scale(1.5)" }}>{item.icon}</div>
                  
                  {/* Tooltip-like label */}
                  <span 
                    className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif", 
                      fontSize: "0.55rem", 
                      letterSpacing: "0.2em", 
                      textTransform: "uppercase", 
                      color: item.accent 
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </motion.div>
            ))}
          </div>


        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-28 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Name + tagline */}
            <div className="text-center md:text-left">

              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: "4px" }}>
                {t("footer.tagline")}
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {footerNavLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB000")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              {[
                { href: "https://www.instagram.com/toszan.willian?igsh=Zm9md2s2ODB5cXp2&utm_source=qr", icon: <Instagram size={17} /> },
                { href: "https://wa.me/393428369444?text=Ciao%2C%20vorrei%20avere%20pi%C3%B9%20informazioni", icon: <MessageCircle size={17} /> },
                { href: "mailto:dj@toszan.com.br", icon: <Mail size={17} /> },
                { href: "https://soundcloud.com/dj-willian-toszan", icon: <Music size={17} /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.28)", transition: "color 0.3s, transform 0.3s" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#FFB000";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "rgba(255,255,255,0.28)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
              © 2025 Willian Toszan — All Rights Reserved
            </span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem", color: "rgba(255,176,0,0.3)" }}>
              Feito com energia brasileira em Milão 🇧🇷🇮🇹
            </span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}