import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

function StoryCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const isLarge = item.size === "large";
  const isMedium = item.size === "medium";
  const isLeft = item.position === "left";
  const imageHeight = isLarge ? "540px" : isMedium ? "400px" : "290px";
  const accentRgb =
    item.accent === "#00A86B" ? "0,168,107" : item.accent === "#1E90FF" ? "30,144,255" : "255,176,0";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-start gap-8 md:gap-16 flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.03, y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden group ${isLeft ? "md:w-7/12" : "md:w-6/12"} w-full cursor-pointer`}
        style={{ height: imageHeight, zIndex: 10 }}
      >
        <motion.div className="w-full h-full" style={{ y, scale: 1.1 }}>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.6) saturate(1.2)",
              transition: "filter 0.5s ease, transform 0.7s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.75) saturate(1.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.6) saturate(1.2)"; }}
          />
        </motion.div>

        {/* Warm vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 80%, rgba(${accentRgb},0.08) 0%, transparent 70%)` }}
        />

        {/* Category badge */}
        <div
          className="absolute top-6 left-6"
          style={{ background: "rgba(11,11,11,0.75)", backdropFilter: "blur(10px)", border: `1px solid rgba(${accentRgb},0.35)`, padding: "4px 14px" }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: item.accent }}>
            {item.category}
          </span>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "2px", background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
      </motion.div>

      {/* Text */}
      <div className={`flex flex-col justify-center ${isLeft ? "md:w-5/12" : "md:w-6/12"} py-8 md:py-0`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ width: "30px", height: "2px", background: item.accent, marginBottom: "1rem" }} />

          <h3
            className="mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "0.07em",
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h3>

          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", lineHeight: 1.9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.03em" }}>
            {item.description}
          </p>

          {item.handwritten && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-6"
            >
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: `rgba(${accentRgb},0.75)`,
                  letterSpacing: "0.01em",
                }}
              >
                {item.handwritten}
              </span>
            </motion.div>
          )}

          <div className="mt-8" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "5rem", color: `rgba(${accentRgb},0.05)`, lineHeight: 1, userSelect: "none" }}>
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ExperienceLifestyle() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const stories = [
    {
      id: 1,
      category: t("lifestyle.stories.s1.cat"),
      title: t("lifestyle.stories.s1.title"),
      description: t("lifestyle.stories.s1.desc"),
      image: "/optimized/dj/foto_dj2.webp",
      accent: "#FFB000",
      position: "left",
      size: "large",
      handwritten: t("lifestyle.stories.s1.hand"),
    },
    {
      id: 2,
      category: t("lifestyle.stories.s2.cat"),
      title: t("lifestyle.stories.s2.title"),
      description: t("lifestyle.stories.s2.desc"),
      image: "/optimized/dj/foto_dj3.webp",
      accent: "#FFB000",
      position: "right",
      size: "medium",
    },
    {
      id: 3,
      category: t("lifestyle.stories.s3.cat"),
      title: t("lifestyle.stories.s3.title"),
      description: t("lifestyle.stories.s3.desc"),
      image: "/optimized/dj/foto_dj4.webp",
      accent: "#00A86B",
      position: "left",
      size: "medium",
      handwritten: t("lifestyle.stories.s3.hand"),
    },
    {
      id: 4,
      category: t("lifestyle.stories.s4.cat"),
      title: t("lifestyle.stories.s4.title"),
      description: t("lifestyle.stories.s4.desc"),
      image: "/optimized/dj/foto_dj5.webp",
      accent: "#FFB000",
      position: "right",
      size: "large",
    },
    {
      id: 5,
      category: t("lifestyle.stories.s5.cat"),
      title: t("lifestyle.stories.s5.title"),
      description: t("lifestyle.stories.s5.desc"),
      image: "/optimized/foto_1.webp",
      accent: "#1E90FF",
      position: "left",
      size: "small",
      handwritten: t("lifestyle.stories.s5.hand"),
    },
    {
      id: 6,
      category: t("lifestyle.stories.s6.cat"),
      title: t("lifestyle.stories.s6.title"),
      description: t("lifestyle.stories.s6.desc"),
      image: "/optimized/foto_3.webp",
      accent: "#FFB000",
      position: "right",
      size: "small",
    },
  ];

  return (
    <section id="lifestyle" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: "#0E0E0E", position: "relative" }}>
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
              {t("lifestyle.label")}
            </span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "0.06em", color: "#ffffff", lineHeight: 1 }}>
            {t("lifestyle.title1")}
            <br />
            <span style={{ color: "#FFB000" }}>{t("lifestyle.title2")}</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-36">
          {stories.map((item, i) => (
            <StoryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
