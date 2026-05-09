import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Download, ExternalLink, Instagram, Music, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MomentsCarousel } from "./MomentsCarousel";

export function MediaKit() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const stats = [
    { value: 131, suffix: "K+", label: t("media.stats.views"), accent: "#FFB000" },
    { value: 10, suffix: "K+", label: t("media.stats.followers"), accent: "#00A86B" },
    { value: 6.8, suffix: "K", label: t("media.stats.interactions"), accent: "#FFB000", isFloat: true },
    { value: 521, suffix: "+", label: t("media.stats.growth"), accent: "#1E90FF" },
    { value: 100, suffix: "%", label: t("media.stats.organic"), accent: "#FFB000" },
    { value: 0, suffix: t("media.stats.milan"), label: t("media.stats.based"), accent: "#00A86B", isStatic: true },
  ];



  function AnimatedNumber({ value, isFloat, isStatic }: { value: number, isFloat?: boolean, isStatic?: boolean }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
      if (inView && !isStatic) {
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const ease = 1 - Math.pow(1 - progress, 4);
          const current = start + (value - start) * ease;

          setCount(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
        };
        requestAnimationFrame(animate);
      } else if (isStatic) {
        setCount(value);
      }
    }, [inView, value, isStatic]);

    if (isStatic) return null;

    return (
      <span ref={ref}>
        {isFloat ? count.toFixed(1).replace(".", ",") : Math.floor(count)}
      </span>
    );
  }

  return (
    <section
      id="mediakit"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#111111", position: "relative" }}
    >
      {/* Background ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,176,0,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,176,0,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
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
                {t("media.label")}
              </span>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "0.06em", color: "#ffffff", lineHeight: 1 }}>
              {t("media.title")}
            </h2>
            <p className="mt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem", color: "rgba(255,176,0,0.65)" }}>
              {t("media.subtitle")}
            </p>
          </div>
          <p className="max-w-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", lineHeight: 1.85, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
            {t("media.desc")}
          </p>
        </motion.div>

        {/* Instagram Photos */}
        <MomentsCarousel />

        {/* Stats Row */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -6, zIndex: 10, transition: { duration: 0.3, ease: "easeOut" } }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative group flex flex-col items-center justify-center text-center py-7 px-4 rounded-xl cursor-pointer transition-colors duration-500 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,176,0,0.12)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", letterSpacing: "0.06em", color: stat.accent, lineHeight: 1 }}>
                  <AnimatedNumber value={stat.value} isFloat={stat.isFloat} isStatic={stat.isStatic} />
                  {stat.suffix}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "6px" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final Phrase / Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-28 text-center"
        >
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "#ffffff",
            lineHeight: 1.4,
            opacity: 0.9,
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            “{t("brand.quote1")}<br />
            <span style={{ color: "#FFB000" }}>{t("brand.quote2")}</span>”
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
