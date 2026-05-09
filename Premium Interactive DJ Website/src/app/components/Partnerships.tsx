import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function PartnerCard({ item, index, t }: { item: any; index: number; t: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const accentRgb =
    item.accent === "#00A86B" ? "0,168,107" : item.accent === "#1E90FF" ? "30,144,255" : "255,176,0";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.01)",
        padding: "2rem",
        transition: "border-color 0.4s, background 0.4s, box-shadow 0.4s",
        borderRadius: "4px",
        zIndex: 1,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `rgba(${accentRgb},0.3)`;
        el.style.background = `rgba(${accentRgb},0.04)`;
        el.style.boxShadow = `0 0 50px rgba(${accentRgb},0.08)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.background = "rgba(255,255,255,0.01)";
        el.style.boxShadow = "none";
      }}
    >
      <div className="mb-5" style={{ fontSize: "1.2rem", color: `rgba(${accentRgb},0.55)` }}>
        {item.icon}
      </div>

      <div className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.52rem", letterSpacing: "0.35em", textTransform: "uppercase", color: item.accent }}>
        {item.category}
      </div>

      <h3 className="mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.08em", color: "#ffffff", lineHeight: 1.2 }}>
        {item.title}
      </h3>

      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", lineHeight: 1.85, color: "rgba(255,255,255,0.38)", letterSpacing: "0.03em" }}>
        {item.description}
      </p>

      <div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1" style={{ transition: "opacity 0.3s, transform 0.3s" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: item.accent }}>
          {t("partnerships.enquire")}
        </span>
        <ArrowRight size={11} color={item.accent} />
      </div>

      <div className="absolute bottom-3 right-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: `rgba(${accentRgb},0.08)`, letterSpacing: "0.1em" }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export function Partnerships() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const categories = [
    {
      id: 1, category: t("partnerships.cats.nightlife"),
      title: t("partnerships.cats.nightlifeTitle"),
      description: t("partnerships.cats.nightlifeDesc"),
      icon: "◆",
      accent: "#FFB000",
    },
    {
      id: 2, category: t("partnerships.cats.events"),
      title: t("partnerships.cats.eventsTitle"),
      description: t("partnerships.cats.eventsDesc"),
      icon: "✦",
      accent: "#FFB000",
    },
    {
      id: 3, category: t("partnerships.cats.fashion"),
      title: t("partnerships.cats.fashionTitle"),
      description: t("partnerships.cats.fashionDesc"),
      icon: "▲",
      accent: "#FFB000",
    },
    {
      id: 4, category: t("partnerships.cats.lifestyle"),
      title: t("partnerships.cats.lifestyleTitle"),
      description: t("partnerships.cats.lifestyleDesc"),
      icon: "●",
      accent: "#00A86B",
    },
    {
      id: 5, category: t("partnerships.cats.travel"),
      title: t("partnerships.cats.travelTitle"),
      description: t("partnerships.cats.travelDesc"),
      icon: "◈",
      accent: "#1E90FF",
    },
    {
      id: 6, category: t("partnerships.cats.hospitality"),
      title: t("partnerships.cats.hospitalityTitle"),
      description: t("partnerships.cats.hospitalityDesc"),
      icon: "◉",
      accent: "#FFB000",
    },
    {
      id: 7, category: t("partnerships.cats.creators"),
      title: t("partnerships.cats.creatorsTitle"),
      description: t("partnerships.cats.creatorsDesc"),
      icon: "◎",
      accent: "#00A86B",
    },
    {
      id: 8, category: t("partnerships.cats.campaigns"),
      title: t("partnerships.cats.campaignsTitle"),
      description: t("partnerships.cats.campaignsDesc"),
      icon: "◑",
      accent: "#FFB000",
    },
  ];

  return (
    <section id="partnerships" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: "#0B0B0B", position: "relative" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 70%, rgba(255,176,0,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-center text-center gap-8"
        >
          <div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
                {t("partnerships.label")}
              </span>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "0.06em", color: "#ffffff", lineHeight: 1 }}>
              {t("partnerships.title")}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.4rem", color: "rgba(255,176,0,0.6)" }}>
              {t("partnerships.subtitle")}
            </p>
          </div>

          <p className="max-w-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", lineHeight: 1.85, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
            {t("partnerships.desc")}
          </p>
        </motion.div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((item, i) => (
            <PartnerCard key={item.id} item={item} index={i} t={t} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(255,176,0,0.1), rgba(255,140,0,0.06))",
            border: "1px solid rgba(255,176,0,0.25)",
            borderRadius: "6px",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,176,0,0.09) 0%, transparent 60%)" }} />

          <div className="relative z-10">
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "0.1em", color: "#ffffff", marginBottom: "8px" }}>
              {t("partnerships.cta")}
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>
              {t("partnerships.ctaDesc")}
            </p>
          </div>

          <a
            href="mailto:dj@toszan.com.br"
            className="relative z-10 flex items-center gap-3 px-8 py-4 shrink-0"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#0B0B0B",
              background: "linear-gradient(135deg, #FFB000, #FF8C00)",
              textDecoration: "none",
              transition: "opacity 0.3s, transform 0.3s",
              boxShadow: "0 0 30px rgba(255,176,0,0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            {t("partnerships.getInTouch")} <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
