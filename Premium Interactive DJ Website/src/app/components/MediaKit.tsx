import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { creatorStats } from "../../data/creatorStats";
import "../../styles/general-editorial.css";

const proofImages = [
  "/optimized/instagram_3.webp",
  "/optimized/instagram_1.webp",
  "/optimized/instagram_4.webp",
  "/optimized/instagram_2.webp",
] as const;

const mediaUi: Record<Language, {
  period: string;
  source: string;
  analytics: string;
  creator: string;
  imageAlt: string;
}> = {
  en: { period: "June 5 to July 4, 2026", source: "Historical Instagram Professional Insights", analytics: "Open verified analytics", creator: "Open Creator portfolio", imageAlt: "TOSZAN creator portfolio image" },
  pt: { period: "5 de junho a 4 de julho de 2026", source: "Dados históricos profissionais do Instagram", analytics: "Ver métricas verificadas", creator: "Ver portfólio de criador", imageAlt: "Imagem do portfólio de criador de TOSZAN" },
  it: { period: "Dal 5 giugno al 4 luglio 2026", source: "Dati professionali storici di Instagram", analytics: "Apri i dati verificati", creator: "Apri il portfolio del creatore", imageAlt: "Immagine del portfolio del creatore TOSZAN" },
  es: { period: "Del 5 de junio al 4 de julio de 2026", source: "Datos profesionales históricos de Instagram", analytics: "Ver métricas verificadas", creator: "Ver portfolio de creador", imageAlt: "Imagen del portfolio de creador de TOSZAN" },
  fr: { period: "Du 5 juin au 4 juillet 2026", source: "Données professionnelles historiques d’Instagram", analytics: "Voir les données vérifiées", creator: "Voir le portfolio créateur", imageAlt: "Image du portfolio créateur de TOSZAN" },
};

function AnimatedMetric({ value, locale, reducedMotion }: { value: string; locale: string; reducedMotion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const amount = Number(value.replace(/[,.]/g, ""));
  const [display, setDisplay] = useState(reducedMotion ? value : "0");

  useEffect(() => {
    if (reducedMotion) { setDisplay(value); return; }
    if (!inView) return;
    let frame = 0;
    const started = performance.now();
    const formatter = new Intl.NumberFormat(locale);
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 1350);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(progress === 1 ? value : formatter.format(Math.round(amount * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [amount, inView, locale, reducedMotion, value]);

  return <span ref={ref} data-final-value={value}>{display}</span>;
}

export function MediaKit() {
  const { t, language } = useLanguage();
  const reducedMotion = Boolean(useReducedMotion());
  const [selectedProof, setSelectedProof] = useState<number | null>(null);
  const copy = mediaUi[language];
  const locale = language === "pt" ? "pt-BR" : language === "it" ? "it-IT" : language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : "en-US";
  const metrics = [
    { value: creatorStats.monthlyViewsExact, label: t("media.stats.views") },
    { value: creatorStats.followersExact, label: t("media.stats.followers") },
    { value: creatorStats.interactionsExact, label: t("media.stats.interactions") },
    { value: creatorStats.accountsReachedExact, label: t("media.stats.reach") },
    { value: creatorStats.newFollowersExact, label: t("media.stats.growth") },
  ];

  return (
    <section id="mediakit" className="general-media" aria-labelledby="general-media-title">
      <div className="general-shell">
        <motion.div className="general-media-heading" initial={reducedMotion ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.7 }}>
          <div><p className="general-eyebrow">{t("media.label")}</p><h2 id="general-media-title">{t("media.title")}</h2></div>
          <div><p className="general-media-script">{t("media.subtitle")}</p><p className="general-body-copy">{t("media.desc")}</p></div>
        </motion.div>

        <div className="general-proof-rail" aria-label={t("media.title")}>
          {proofImages.map((image, index) => (
            <motion.figure key={image} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : index * 0.05 }}>
              <button type="button" className="general-proof-open" onClick={() => setSelectedProof(index)} aria-label={`${copy.imageAlt} ${index + 1}`}><img src={image} alt={`${copy.imageAlt} ${index + 1}`} loading="lazy" decoding="async" /></button>
              <figcaption>{String(index + 1).padStart(2, "0")} / 04</figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="general-metric-strip">
          {metrics.map((metric, index) => (
            <motion.div key={metric.label} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.05 }}>
              <strong><AnimatedMetric value={metric.value} locale={locale} reducedMotion={reducedMotion} /></strong>
              <span>{metric.label}</span>
            </motion.div>
          ))}
          <div className="general-metric-location"><strong>{t("media.stats.milan")}</strong><span>{t("media.stats.based")}</span></div>
        </div>

        <div className="general-media-source">
          <p><span>{copy.source}</span>{copy.period}</p>
          <div><a href="/creator#performance">{copy.analytics}<ArrowRight size={15} aria-hidden="true" /></a><a href="/creator">{copy.creator}<ExternalLink size={14} aria-hidden="true" /></a></div>
        </div>
      </div>
      {selectedProof !== null && <div className="creator-evidence-modal" role="dialog" aria-modal="true" aria-label={copy.imageAlt} onClick={() => setSelectedProof(null)}>
        <div onClick={event => event.stopPropagation()}><button type="button" onClick={() => setSelectedProof(null)} aria-label="Fechar">✕</button><img src={proofImages[selectedProof]} alt={`${copy.imageAlt} ${selectedProof + 1}`} /></div>
      </div>}
    </section>
  );
}
