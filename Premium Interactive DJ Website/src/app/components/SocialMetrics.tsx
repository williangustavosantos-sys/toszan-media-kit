import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TrendingUp, Users, Eye, MapPin, Heart, Zap } from "lucide-react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function fmt(count: number, suffix: string, kFmt: boolean) {
  if (kFmt && count >= 1000) {
    const k = count / 1000;
    return `${k % 1 === 0 ? k : k.toFixed(1)}K${suffix}`;
  }
  return `${count.toLocaleString()}${suffix}`;
}

interface CardProps {
  icon: React.ReactNode;
  value?: string;
  numericValue?: number;
  suffix?: string;
  kFormat?: boolean;
  label: string;
  sublabel: string;
  accent?: "gold" | "green" | "blue";
  delay: number;
}

function MetricCard({ icon, value, numericValue, suffix = "", kFormat = false, label, sublabel, accent = "gold", delay }: CardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(numericValue || 0, 2400, inView && !!numericValue);
  const [hovered, setHovered] = useState(false);

  const displayValue = numericValue ? fmt(count, suffix, kFormat) : value;

  const accentColor =
    accent === "green" ? "#00A86B" : accent === "blue" ? "#1E90FF" : "#FFB000";
  const accentRgb =
    accent === "green" ? "0,168,107" : accent === "blue" ? "30,144,255" : "255,176,0";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center cursor-pointer select-none"
      style={{
        background: hovered
          ? `linear-gradient(170deg, rgba(${accentRgb},0.1) 0%, rgba(11,11,11,0.98) 100%)`
          : "linear-gradient(170deg, rgba(255,255,255,0.03) 0%, rgba(8,8,8,0.98) 100%)",
        border: hovered
          ? `1px solid rgba(${accentRgb},0.55)`
          : `1px solid rgba(${accentRgb},0.18)`,
        borderRadius: "12px",
        padding: "2.5rem 1.25rem 2rem",
        backdropFilter: "blur(24px)",
        boxShadow: hovered
          ? `0 0 70px rgba(${accentRgb},0.15), 0 0 20px rgba(${accentRgb},0.08), inset 0 1px 0 rgba(${accentRgb},0.12)`
          : "0 0 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
        transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        minHeight: "280px",
        justifyContent: "space-between",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80%",
          height: "60%",
          background: hovered
            ? `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.14) 0%, transparent 70%)`
            : `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.04) 0%, transparent 70%)`,
          transition: "all 0.45s",
        }}
      />

      {/* Icon */}
      <div
        className="relative flex items-center justify-center z-10"
        style={{
          width: 60, height: 60, borderRadius: "50%",
          border: hovered ? `1.5px solid rgba(${accentRgb},0.75)` : `1.5px solid rgba(${accentRgb},0.32)`,
          background: hovered ? `rgba(${accentRgb},0.13)` : `rgba(${accentRgb},0.05)`,
          color: accentColor,
          boxShadow: hovered ? `0 0 24px rgba(${accentRgb},0.25)` : "none",
          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: "1.5rem", flexShrink: 0,
        }}
      >
        {hovered && (
          <motion.div
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: "absolute", inset: -2, borderRadius: "50%",
              border: `1px solid rgba(${accentRgb},0.4)`, pointerEvents: "none",
            }}
          />
        )}
        {icon}
      </div>

      {/* Value */}
      <motion.div
        animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className="z-10"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2rem, 3vw, 3rem)",
          letterSpacing: "0.04em",
          color: "#ffffff",
          lineHeight: 1,
          marginBottom: "0.7rem",
          textShadow: hovered ? `0 0 30px rgba(${accentRgb},0.3)` : "none",
          transition: "text-shadow 0.4s",
        }}
      >
        {displayValue}
      </motion.div>

      {/* Label */}
      <div
        className="z-10"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: hovered ? accentColor : `rgba(${accentRgb},0.8)`,
          marginBottom: "0.65rem",
          transition: "color 0.3s",
        }}
      >
        {label}
      </div>

      {/* Divider */}
      <div
        className="z-10"
        style={{
          width: hovered ? "56px" : "28px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          marginBottom: "0.7rem",
          transition: "width 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: hovered ? `0 0 8px rgba(${accentRgb},0.5)` : "none",
        }}
      />

      {/* Sublabel */}
      <div
        className="z-10"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.06em",
          color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)",
          lineHeight: 1.7,
          transition: "color 0.3s",
          padding: "0 0.25rem",
        }}
      >
        {sublabel}
      </div>
    </motion.div>
  );
}

const metrics: CardProps[] = [
  {
    icon: <Eye size={22} strokeWidth={1.5} />,
    numericValue: 131000,
    suffix: "+",
    kFormat: true,
    label: "Monthly Views",
    sublabel: "Content reach in the last 30 days",
    accent: "gold",
    delay: 0,
  },
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    numericValue: 6800,
    suffix: "",
    kFormat: true,
    label: "Interactions",
    sublabel: "Likes, comments, shares and saves",
    accent: "gold",
    delay: 0.1,
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    numericValue: 10000,
    suffix: "+",
    kFormat: true,
    label: "Followers",
    sublabel: "Growing community across borders",
    accent: "green",
    delay: 0.2,
  },
  {
    icon: <Zap size={22} strokeWidth={1.5} />,
    numericValue: 521,
    suffix: "+",
    kFormat: false,
    label: "Monthly Growth",
    sublabel: "New real followers every month",
    accent: "blue",
    delay: 0.3,
  },
  {
    icon: <MapPin size={22} strokeWidth={1.5} />,
    value: "MILAN",
    label: "Based In",
    sublabel: "Heart of European nightlife",
    accent: "gold",
    delay: 0.4,
  },
  {
    icon: <TrendingUp size={22} strokeWidth={1.5} />,
    value: "ORGANIC",
    label: "Growth",
    sublabel: "Real people. Real connections.",
    accent: "green",
    delay: 0.5,
  },
];

export function SocialMetrics() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#0E0E0E", position: "relative" }}
    >
      {/* Warm ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 40% at 15% 60%, rgba(255,176,0,0.05) 0%, transparent 60%), radial-gradient(ellipse 45% 50% at 85% 30%, rgba(255,140,0,0.04) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 50% 90%, rgba(0,168,107,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB000)" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FFB000" }}>
              Social Impact
            </span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #FFB000, transparent)" }} />
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "0.08em", color: "#ffffff", lineHeight: 1 }}>
            Numbers That Reflect{" "}
            <span style={{ color: "#FFB000" }}>The Movement</span>
          </h2>

          <p className="mt-5 max-w-lg mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            An audience built on authentic connection — pure energy, no shortcuts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
