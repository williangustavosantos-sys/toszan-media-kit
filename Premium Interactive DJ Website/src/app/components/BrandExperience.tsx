import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { Music, Smartphone, Zap, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function BrandExperience() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const CARDS = [
    {
      title: t("brand.cards.musicTitle"),
      icon: <Music size={24} className="text-[#FFB000]" />,
      text: t("brand.cards.musicText"),
      delay: 0.1,
    },
    {
      title: t("brand.cards.contentTitle"),
      icon: <Smartphone size={24} className="text-[#1E90FF]" />,
      text: t("brand.cards.contentText"),
      delay: 0.2,
    },
    {
      title: t("brand.cards.liveTitle"),
      icon: <Zap size={24} className="text-[#00A86B]" />,
      text: t("brand.cards.liveText"),
      delay: 0.3,
    },
    {
      title: t("brand.cards.communityTitle"),
      icon: <Users size={24} className="text-[#FFB000]" />,
      text: t("brand.cards.communityText"),
      delay: 0.4,
    },
  ];





  return (
    <section id="experience-brand" className="relative py-32 px-6 md:px-12 overflow-hidden bg-[#050505]">
      {/* Background Media Grid (Autoplay Silent) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ filter: "saturate(1.2) contrast(1.1)" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 h-full w-full gap-1">
          <div className="relative h-full w-full overflow-hidden">
            <video src="/optimized/videos/video_ugc_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
          <div className="relative h-full w-full overflow-hidden hidden md:block">
            <img src="/optimized/foto_1.webp" alt="bg" className="w-full h-full object-cover" />
          </div>
          <div className="relative h-full w-full overflow-hidden">
            <video src="/optimized/videos/video_ugc_4.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Dark Overlay with Glass/Blur */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      <div className="absolute inset-0 z-0" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
              {t("brand.label")}
            </span>
            <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "0.08em", color: "#ffffff", lineHeight: 0.9, textShadow: "0 0 60px rgba(255,176,0,0.15)", marginBottom: "1.5rem" }}>
            {t("brand.title")}
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 500, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            {t("brand.desc1")}
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "800px", margin: "0 auto" }}>
            {t("brand.desc2")}
            <br /><br />
            <span className="text-white/90 font-medium" style={{ whiteSpace: "pre-line" }}>{t("brand.desc3")}</span>
          </p>
        </motion.div>

        {/* Value Props Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: card.delay, ease: [0.16, 1, 0.3, 1] } }}
              whileHover={{ scale: 1.04, y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-500 hover:border-white/20"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${card.icon.props.className.includes('FFB000') ? 'rgba(255,176,0,0.08)' : card.icon.props.className.includes('1E90FF') ? 'rgba(30,144,255,0.08)' : 'rgba(0,168,107,0.08)'}, transparent 70%)` }} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-3 rounded-full inline-flex w-fit" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {card.icon}
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.12em", color: "#fff", marginBottom: "1rem" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}
