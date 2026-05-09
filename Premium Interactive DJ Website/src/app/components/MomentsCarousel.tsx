import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

// Imagens otimizadas WebP do diretório public/optimized
const img1 = "/optimized/instagram_3.webp";
const img2 = "/optimized/instagram_1.webp";
const img3 = "/optimized/instagram_4.webp";
const img4 = "/optimized/instagram_2.webp";

const moments = [
  { id: 1, image: img1, vibe: "Energy" },
  { id: 2, image: img2, vibe: "Presence" },
  { id: 3, image: img3, vibe: "Fire" },
  { id: 4, image: img4, vibe: "Alive" },
];

function InstagramCard({ moment, index }: { moment: typeof moments[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.04, y: -6, zIndex: 10 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full cursor-pointer group overflow-hidden"
      style={{
        aspectRatio: "4/5",
        borderRadius: "16px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,176,0,0.4)";
        el.style.boxShadow =
          "0 30px 80px rgba(255,176,0,0.25), 0 15px 40px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={moment.image}
          alt={`Willian Toszan ${moment.vibe}`}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.85) saturate(1.1)",
            transition: "filter 0.4s",
          }}
        />
        
        {/* Vignette bottom shadow always present */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(11,11,11,0.5) 0%, transparent 40%)",
          }}
        />

        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(0deg, rgba(11,11,11,0.8) 0%, transparent 50%)",
            transition: "opacity 0.4s",
          }}
        />

        {/* Vibe label - slides up and fades in on hover */}
        <div
          className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none"
          style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div
            style={{
              background: "rgba(11,11,11,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,176,0,0.3)",
              borderRadius: "12px",
              padding: "10px 18px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.3rem",
                letterSpacing: "0.1em",
                color: "#FFB000",
                textShadow: "0 0 20px rgba(255,176,0,0.3)",
              }}
            >
              {moment.vibe}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MomentsCarousel() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 relative z-10 w-full">
      {moments.map((moment, i) => (
        <InstagramCard key={moment.id} moment={moment} index={i} />
      ))}
    </div>
  );
}
