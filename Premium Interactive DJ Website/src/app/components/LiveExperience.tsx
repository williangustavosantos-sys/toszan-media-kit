import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
const photo1 = "/optimized/foto_1.webp";
const photo2 = "/optimized/foto_3.webp";
const photo3 = "/optimized/foto_2.webp";

interface GalleryItemType {
  id: number;
  category: string;
  src: string;
  label: string;
  span: string;
  isVideo?: boolean;
}

function GalleryItem({ item, index }: { item: GalleryItemType; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.04, y: -5, zIndex: 10 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`${item.span} relative group overflow-hidden cursor-pointer`}
      style={{ minHeight: "200px", position: "relative" }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black/40">
        {(item as any).isVideo ? (
          <div
            className="w-full h-full"
            onMouseEnter={(e) => {
              const vid = e.currentTarget.querySelector("video");
              if (vid) {
                vid.style.transform = "scale(1.05)";
                vid.style.filter = "brightness(0.85) saturate(1.45)";
              }
            }}
            onMouseLeave={(e) => {
              const vid = e.currentTarget.querySelector("video");
              if (vid) {
                vid.style.transform = "scale(1)";
                vid.style.filter = "brightness(0.65) saturate(1.2)";
              }
            }}
            dangerouslySetInnerHTML={{
              __html: `
                <video
                  src="${item.src}"
                  autoplay
                  loop
                  muted
                  playsinline
                  style="width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease; filter: brightness(0.65) saturate(1.2);"
                ></video>
              `
            }}
          />
        ) : (
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
              filter: "brightness(0.55) saturate(1.2)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.transform = "scale(1.09)";
              el.style.filter = "brightness(0.75) saturate(1.45)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.transform = "scale(1)";
              el.style.filter = "brightness(0.55) saturate(1.2)";
            }}
          />
        )}
      </div>

      {/* Gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(180deg, transparent 25%, rgba(11,11,11,0.85) 100%)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Warm border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1.5px rgba(255,176,0,0.45)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Category badge */}
      <div
        className="absolute top-4 left-4"
        style={{
          background: "rgba(11,11,11,0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,176,0,0.25)",
          padding: "3px 10px",
          opacity: 0,
          transform: "translateY(-4px)",
          transition: "opacity 0.35s, transform 0.35s",
        }}
        ref={(el) => {
          if (el) el.closest(".group")?.addEventListener("mouseenter", () => {
            el.style.opacity = "1"; el.style.transform = "translateY(0)";
          });
          if (el) el.closest(".group")?.addEventListener("mouseleave", () => {
            el.style.opacity = "0"; el.style.transform = "translateY(-4px)";
          });
        }}
      >
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#FFB000" }}>
          {item.category}
        </span>
      </div>

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
        style={{ transition: "all 0.4s ease" }}
      >
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#FFB000" }}>
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}

export function LiveExperience() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const ALL_ITEMS: GalleryItemType[] = [
    { id: 1, category: "On Stage", src: "/optimized/videos/video_ugc_1.mp4", label: t("live.labels.l1"), span: "col-span-1 row-span-2", isVideo: true },
    { id: 2, category: "On Stage", src: photo1, label: t("live.labels.l2"), span: "col-span-1 row-span-1" },
    { id: 3, category: "Audience", src: "/optimized/videos/video_ugc_2.mp4", label: t("live.labels.l3"), span: "col-span-1 row-span-2", isVideo: true },
    { id: 4, category: "Milano", src: photo2, label: t("live.labels.l4"), span: "col-span-2 row-span-2" },
    { id: 6, category: "Lifestyle", src: "/optimized/videos/video_ugc_4.mp4", label: t("live.labels.l6"), span: "col-span-1 row-span-2", isVideo: true },
    { id: 7, category: "On Stage", src: "/optimized/dj/foto_dj1.webp", label: t("live.labels.l7"), span: "col-span-1 row-span-1" },
    { id: 8, category: "Backstage", src: "/optimized/dj/foto_dj2.webp", label: t("live.labels.l8"), span: "col-span-1 row-span-1" },
    { id: 9, category: "Milano", src: "/optimized/dj/foto_dj3.webp", label: t("live.labels.l9"), span: "col-span-1 row-span-1" },
    { id: 10, category: "Travel", src: "/optimized/dj/foto_dj4.webp", label: t("live.labels.l10"), span: "col-span-1 row-span-1" },
    { id: 11, category: "Lifestyle", src: "/optimized/dj/foto_dj5.webp", label: t("live.labels.l11"), span: "col-span-1 row-span-1" },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12" style={{ background: "#0B0B0B", position: "relative" }}>
      <div className="max-w-7xl mx-auto" style={{ position: "relative" }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
              {t("experience.label")}
            </span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "0.06em", color: "#ffffff", lineHeight: 1 }}>
            {t("experience.title")}
          </h2>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full pb-8"
          style={{
            gridAutoRows: "clamp(160px, 20vw, 240px)",
            gridAutoFlow: "dense",
          }}
        >
          {ALL_ITEMS.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Full-width artist strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 relative overflow-hidden group"
          style={{ height: "300px" }}
        >
          <img
            src={photo1}
            alt="Willian Toszan On Stage"
            className="w-full h-full object-cover object-center"
            style={{
              filter: "brightness(0.45) saturate(1.3)",
              transition: "transform 0.8s ease, filter 0.5s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.6) saturate(1.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.45) saturate(1.3)";
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,11,11,0.75) 0%, transparent 40%, transparent 60%, rgba(11,11,11,0.75) 100%)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 10vw, 7rem)",
                letterSpacing: "0.3em",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,176,0,0.25))",
              }}
            >
              THE ARTIST
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "2px", background: "linear-gradient(90deg, transparent, #FFB000, #FF8C00, transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}