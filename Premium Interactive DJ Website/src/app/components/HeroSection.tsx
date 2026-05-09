import { motion } from "motion/react";
import { ParticlesCanvas } from "./ParticlesCanvas";
import { useLanguage } from "../context/LanguageContext";
import { ToszanLogo } from "./ToszanLogo";
const heroBg = "/optimized/foto_2.webp";
const profileImg = "/optimized/foto_3.webp";

export function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "640px" }}
    >
      {/* Background — Ken Burns warm */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        style={{ zIndex: 0 }}
      >
        <img
          src={heroBg}
          alt="Willian Toszan Live"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.28) saturate(1.4) contrast(1.1)" }}
        />
      </motion.div>

      {/* Warm gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.05) 30%, rgba(11,11,11,0.45) 65%, rgba(11,11,11,1) 100%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 45% at 50% 55%, rgba(255,176,0,0.12) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      {/* Subtle Brazilian green vignette */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "30%",
          background:
            "linear-gradient(0deg, rgba(0,168,107,0.04) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      <ParticlesCanvas />

      {/* TOP BAR — location + genre */}
      <motion.div
        className="absolute top-28 left-0 right-0 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{ zIndex: 4 }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00A86B",
            display: "inline-block",
            boxShadow: "0 0 10px rgba(0,168,107,0.6)",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Milan, Italy
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 4px" }}>|</span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          DJ · Creator · Entertainer
        </span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#FFB000",
            display: "inline-block",
            boxShadow: "0 0 10px rgba(255,176,0,0.5)",
          }}
        />
      </motion.div>

      {/* Profile photo removed */}

      {/* MAIN CONTENT — bottom aligned */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center"
        style={{ zIndex: 3 }}
      >
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
              lineHeight: 1,
              letterSpacing: "0.25em",
              marginRight: "-0.25em",
              color: "#ffffff",
              textShadow: "0 0 80px rgba(255,176,0,0.1)",
              opacity: 0.85,
            }}
          >WILLIAN</h1>
          <div style={{ display: "flex", justifyContent: "center", filter: "drop-shadow(0 0 50px rgba(255,255,255,0.15))", marginTop: "-2.5rem" }}>
            <ToszanLogo
              cssHeight="clamp(6rem, 24vw, 17rem)"
              gold={false}
            />
          </div>


        </motion.div>

        {/* Divider line */}
        <motion.div
          className="mt-6 mb-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          style={{
            height: "1px",
            width: "clamp(80px, 25vw, 180px)",
            background: "linear-gradient(90deg, transparent, #FFB000, transparent)",
          }}
        />

        {/* Subtitle */}
        <motion.p
          className="mb-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.85rem, 2.5vw, 1.15rem)",
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Support text */}
        <motion.p
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.52rem, 1.3vw, 0.68rem)",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(255,176,0,0.7)",
          }}
        >
          {t("hero.tag")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
        >
          {/* BOOKING */}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.64rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#0B0B0B",
              background: "linear-gradient(135deg, #FFB000, #FF8C00)",
              border: "none",
              padding: "14px 36px",
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(255,176,0,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 70px rgba(255,176,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(255,176,0,0.4)";
            }}
          >
            {t("hero.booking")}
          </button>

          {/* MEDIA KIT */}
          <button
            onClick={() => scrollTo("#mediakit")}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.64rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "14px 36px",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,176,0,0.7)";
              e.currentTarget.style.color = "#FFB000";
              e.currentTarget.style.background = "rgba(255,176,0,0.09)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            {t("hero.mediaKit")}
          </button>

          {/* WATCH LIVE */}
          <button
            onClick={() => scrollTo("#music")}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.64rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {t("hero.watchLive")}
          </button>
        </motion.div>
      </div>

    </section>
  );
}