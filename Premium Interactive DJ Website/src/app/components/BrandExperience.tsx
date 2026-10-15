import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import creatorPortrait from "../../imports/creator-portrait-editorial.webp";
import "../../styles/general-editorial.css";

const brandUi: Record<Language, { cta: string; index: string }> = {
  en: { cta: "Open Creator portfolio", index: "Creator profile" },
  pt: { cta: "Ver portfólio de criador", index: "Perfil de criador" },
  it: { cta: "Apri il portfolio del creatore", index: "Profilo del creatore" },
  es: { cta: "Ver portfolio de creador", index: "Perfil de creador" },
  fr: { cta: "Voir le portfolio créateur", index: "Profil créateur" },
};

export function BrandExperience() {
  const { t, language } = useLanguage();
  const reducedMotion = Boolean(useReducedMotion());
  const copy = brandUi[language];
  const capabilities = [
    t("brand.cards.musicTitle"),
    t("brand.cards.contentTitle"),
    t("brand.cards.liveTitle"),
    t("brand.cards.communityTitle"),
  ];

  return (
    <section id="experience-brand" className="general-creator-bridge" aria-labelledby="creator-bridge-title">
      <div className="general-shell general-creator-grid">
        <motion.figure
          className="general-creator-portrait"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.75 }}
        >
          <img src={creatorPortrait} alt="Willian Toszan" width={960} height={1280} loading="lazy" decoding="async" />
          <figcaption>{copy.index} · Milano</figcaption>
        </motion.figure>

        <motion.div
          className="general-creator-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.08 }}
        >
          <p className="general-eyebrow">{t("brand.label")}</p>
          <h2 id="creator-bridge-title">{t("brand.title")}</h2>
          <p className="general-creator-lead">{t("brand.desc1")}</p>
          <p className="general-body-copy">{t("brand.desc2")}</p>
          <div className="general-capability-list">
            {capabilities.map((capability, index) => <span key={capability}><i>{String(index + 1).padStart(2, "0")}</i>{capability}</span>)}
          </div>
          <a href="/creator" className="general-text-link">{copy.cta}<ArrowRight size={16} aria-hidden="true" /></a>
        </motion.div>
      </div>
    </section>
  );
}
