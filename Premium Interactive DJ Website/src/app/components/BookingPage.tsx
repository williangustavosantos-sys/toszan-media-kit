import { useEffect, type ReactNode } from "react";
import { ArrowRight, Check, ExternalLink, Headphones, Instagram, Mail, MapPin, MessageCircle, Music2 } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { bookingCopy, type BookingCopy } from "../../data/bookingCopy";

const media = {
  mix: "https://soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash",
  embed: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash&color=%23FFB000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
  instagram: "https://www.instagram.com/toszan.willian/",
  soundcloud: "https://soundcloud.com/dj-willian-toszan",
};
const liveImages = [
  "/reels/posters/09-wide-crowd-room-proof.webp",
  "/optimized/dj/foto_dj2.webp",
  "/optimized/dj/foto_dj1.webp",
];
function updateMeta(copy: BookingCopy) {
  document.title = copy.metaTitle;
  const meta = (attribute: "name" | "property", name: string, content: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };
  meta("name", "description", copy.metaDescription);
  meta("property", "og:title", copy.metaTitle);
  meta("property", "og:description", copy.metaDescription);
  meta("property", "og:type", "website");
  meta("property", "og:url", "https://toszan-media-kit.vercel.app/booking");
  meta("property", "og:image", "https://toszan-media-kit.vercel.app/optimized/dj/foto_dj4.webp");
  meta("name", "twitter:card", "summary_large_image");
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = "https://toszan-media-kit.vercel.app/booking";
  let schema = document.head.querySelector<HTMLScriptElement>('script[data-route-schema="booking"]');
  if (!schema) {
    schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.routeSchema = "booking";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Willian Toszan",
    alternateName: "TOSZAN",
    jobTitle: "DJ",
    description: copy.metaDescription,
    url: "https://toszan-media-kit.vercel.app/booking",
    image: "https://toszan-media-kit.vercel.app/optimized/dj/foto_dj4.webp",
    sameAs: [media.instagram, media.soundcloud, "https://open.spotify.com/artist/27FuT8olmWQ5g51OEwMkWt"],
  });
}

function Action({ href, children, icon, secondary = false, external = false }: {
  href: string; children: ReactNode; icon?: ReactNode; secondary?: boolean; external?: boolean;
}) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
    className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 sm:px-7 ${secondary ? "border border-white/20 bg-white/[0.035] text-white hover:border-amber-400/60 hover:bg-white/[0.08]" : "border border-amber-400/70 bg-[#FFB000] text-[#0B0B0B] hover:bg-[#FFD063]"}`}>
    {icon}{children}
  </a>;
}
function SectionTitle({ id, label, title, intro }: { id?: string; label: string; title: string; intro?: string }) {
  return <div id={id} className="mb-8 max-w-3xl md:mb-10">
    <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.24em] text-[#FFB000]">{label}</p>
    <h2 className="max-w-3xl break-words font-['Bebas_Neue'] text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[0.98] tracking-[0.035em] text-white">{title}</h2>
    {intro && <p className="mt-4 max-w-2xl text-[0.94rem] leading-[1.8] text-white/65 md:text-[1.03rem]">{intro}</p>}
  </div>;
}
const detailsByLanguage: Record<Language, { fields: string[]; subject: string; whatsappIntro: string }> = {
  en: { subject: "DJ Booking TOSZAN", whatsappIntro: "Hello TOSZAN, I'd like to discuss a DJ booking.", fields: ["Date", "City / venue", "Event type", "Set duration", "Budget"] },
  it: { subject: "Richiesta booking DJ TOSZAN", whatsappIntro: "Ciao TOSZAN, vorrei parlare di un booking DJ.", fields: ["Data", "Città / locale", "Tipo di evento", "Durata del set", "Budget"] },
  pt: { subject: "Contratação DJ TOSZAN", whatsappIntro: "Olá TOSZAN, gostaria de conversar sobre uma contratação como DJ.", fields: ["Data", "Cidade / local", "Tipo de evento", "Duração do set", "Orçamento"] },
  es: { subject: "Contratación DJ TOSZAN", whatsappIntro: "Hola TOSZAN, quisiera hablar de una contratación como DJ.", fields: ["Fecha", "Ciudad / local", "Tipo de evento", "Duración del set", "Presupuesto"] },
  fr: { subject: "Demande de booking DJ TOSZAN", whatsappIntro: "Bonjour TOSZAN, je souhaite discuter d'un booking DJ.", fields: ["Date", "Ville / lieu", "Type d'événement", "Durée du set", "Budget"] },
};
export function BookingPage() {
  const { language } = useLanguage();
  const copy = bookingCopy[language];
  const details = detailsByLanguage[language];
  const fields = details.fields.map((label) => `${label}:`).join("\n");
  const email = `mailto:dj@toszan.com.br?subject=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(fields)}`;
  const whatsapp = `https://wa.me/393428369444?text=${encodeURIComponent(`${details.whatsappIntro}\n${fields}`)}`;
  useEffect(() => { updateMeta(copy); }, [copy]);

  return <div className="min-w-0 overflow-x-clip bg-[#0B0B0B] text-white">
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_70%_10%,rgba(255,176,0,0.11),transparent_50%)] px-5 pb-14 pt-32 md:px-12 md:pb-20 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(340px,.88fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="mb-4 inline-flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.2em] text-[#FFB000]"><span className="h-1.5 w-1.5 rounded-full bg-[#FFB000]"/>{copy.eyebrow}</p>
          <h1 className="font-['Bebas_Neue'] text-[clamp(5.5rem,12vw,9.5rem)] leading-[0.78] tracking-[0.025em] text-white">TOSZAN</h1>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-sm border border-white/20 px-3 py-2 text-[0.66rem] font-semibold tracking-wide text-white/80">{copy.location}</span>
            <span className="rounded-sm border border-[#FFB000]/30 px-3 py-2 text-[0.66rem] font-semibold tracking-wide text-[#FFB000]">{copy.genre}</span>
          </div>
          <p className="mt-7 max-w-xl text-[1.04rem] leading-[1.8] text-white/75 md:text-lg">{copy.heroIntro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Action href="#promo-mix" icon={<Headphones size={17}/>} >{copy.listen}</Action>
            <Action href="#booking-contact" secondary icon={<Mail size={17}/>} >{copy.contact}</Action>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-[#FFB000]/20 bg-[#141414] shadow-[0_35px_90px_rgba(0,0,0,0.44)]">
          <div className="relative aspect-[5/4] lg:aspect-[4/4.3]">
            <img src="/optimized/dj/foto_dj4.webp" alt={copy.visualAlt[2]} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"/>
            <p className="absolute bottom-5 left-5 right-5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[#FFB000]">{copy.musicFirst}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="promo-mix" label={copy.soundLabel} title={copy.soundTitle} intro={copy.soundIntro} />
        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,.7fr)]">
          <div className="min-w-0 rounded-xl border border-white/10 bg-[#151515] p-5 md:p-7">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FFB000]">{copy.setLabel}</p>
            <h3 className="mt-3 font-['Bebas_Neue'] text-[clamp(1.8rem,3vw,2.8rem)] leading-tight tracking-[0.045em]">{copy.setTitle}</h3>
            <iframe title={copy.playerTitle} width="100%" height="166" loading="lazy" allow="autoplay" src={media.embed} className="mt-5 block w-full rounded-md border-0 bg-[#0B0B0B]" />
            <div className="mt-5"><Action href={media.mix} external secondary icon={<ExternalLink size={15}/>}>{copy.openSoundcloud}</Action></div>
          </div>
          <a href="/#music" className="group relative flex min-h-[290px] items-end overflow-hidden rounded-xl border border-white/10 bg-[#151515] p-6 focus-visible:outline-2 focus-visible:outline-amber-400">
            <img src="/optimized/dj/foto_dj3.webp" alt={copy.visualAlt[1]} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-[1.035]"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>
            <div className="relative z-10"><p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#FFB000]">{copy.musicFirst}</p><p className="mt-2 max-w-xs text-sm leading-6 text-white/85">{copy.musicFirstDesc}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFB000]">{copy.musicLink} <ArrowRight size={16}/></span></div>
          </a>
        </div>
      </div>
    </section>
    <section className="border-y border-white/10 bg-[#111111] px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="watch-live" label={copy.experienceLabel} title={copy.experienceTitle} intro={copy.experienceIntro} />
        <div className="grid gap-4 sm:grid-cols-3">
          {liveImages.map((src, i) => <a key={src} href="/#experience" className="group relative isolate block aspect-[4/4.6] overflow-hidden rounded-xl border border-white/10 bg-[#1A1A1A] focus-visible:outline-2 focus-visible:outline-amber-400 sm:aspect-[4/5]">
            <img src={src} alt={copy.visualAlt[i]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/5"/>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3"><span className="font-['Bebas_Neue'] text-[clamp(1.65rem,3vw,2.5rem)] leading-tight tracking-[0.06em]">{copy.visualLabels[i]}</span><ArrowRight size={20} className="shrink-0 text-[#FFB000]"/></div>
          </a>)}
        </div>
        <div className="mt-6"><Action href="/#experience" secondary icon={<ArrowRight size={16}/>}>{copy.watchLive}</Action></div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle label={copy.formatsLabel} title={copy.formatsTitle} intro={copy.formatsIntro}/>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copy.formats.map((format) => <div key={format} className="flex min-h-[88px] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-5 py-4 text-[0.9rem] font-semibold text-white/85"><Check size={19} className="shrink-0 text-[#FFB000]" />{format}</div>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[0.83rem] text-white/60"><span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#FFB000]"/>{copy.based}</span><span className="inline-flex items-center gap-2"><Check size={16} className="text-[#FFB000]"/>{copy.europe}</span></div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#151515] p-6 md:p-8">
            <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide text-white">{copy.extraTitle}</h3>
            <p className="mt-3 max-w-xl text-sm leading-[1.8] text-white/65">{copy.extraDesc}</p>
            <a className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFB000] hover:text-[#FFD063]" href="/creator">{copy.creator}<ArrowRight size={16}/></a>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#151515] p-6 md:p-8">
            <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide text-white">{copy.technical}</h3>
            <div className="mt-4 space-y-3">{copy.technicalItems.map((item) => <p className="flex items-start gap-3 text-sm leading-6 text-white/65" key={item}><Check size={17} className="mt-1 shrink-0 text-[#FFB000]"/>{item}</p>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="booking-contact" className="border-t border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(255,176,0,.11),transparent_65%)] px-5 py-20 text-center md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-[0.67rem] font-bold uppercase tracking-[0.23em] text-[#FFB000]">{copy.contactLabel}</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-['Bebas_Neue'] text-[clamp(2.8rem,7vw,5rem)] leading-[0.98] tracking-[0.035em]">{copy.contactTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-white/70">{copy.contactIntro}</p>
        <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
          <Action href={email} icon={<Mail size={17}/>} external>{copy.email}</Action>
          <Action href={whatsapp} icon={<MessageCircle size={17}/>} secondary external>{copy.whatsapp}</Action>
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-wide text-white/65">
          <a className="inline-flex items-center gap-2 hover:text-[#FFB000]" href={media.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16}/>{copy.instagram}</a>
          <a className="inline-flex items-center gap-2 hover:text-[#FFB000]" href={media.soundcloud} target="_blank" rel="noopener noreferrer"><Music2 size={16}/>SoundCloud</a>
          <a className="inline-flex items-center gap-2 hover:text-[#FFB000]" href="/#mediakit"><ArrowRight size={16}/>{copy.mediaKit}</a>
        </div>
      </div>
    </section>
    <footer className="border-t border-white/10 px-5 py-7 text-center text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white/40">{copy.footer}</footer>
  </div>;
}
