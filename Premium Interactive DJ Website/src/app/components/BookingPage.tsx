import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Instagram,
  Mail,
  MessageCircle,
  Music,
  Play,
  ShieldCheck,
} from "lucide-react";
import { ToszanLogo } from "./ToszanLogo";

const BOOKING_DESCRIPTION =
  "Book TOSZAN, Brazilian DJ based in Milan, for Tribal, Circuit and Progressive House events across Europe.";

const promoMix = {
  title: "Promo DJ Set TOSZAN — Splash Roma",
  url: "https://soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash",
  embedUrl:
    "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/splash-roma-314855699/promo-dj-set-toszan-splash&color=%23FFB000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
};

const contactLinks = {
  email:
    "mailto:dj@toszan.com.br?subject=Booking%20Inquiry%20-%20TOSZAN&body=Date%3A%0ACity%20%2F%20Venue%3A%0AEvent%20format%3A%0ASet%20time%20%2F%20duration%3A%0AExpected%20capacity%3A%0ABudget%20range%3A%0A",
  whatsapp:
    "https://wa.me/393428369444?text=Hi%2C%20I%20want%20to%20book%20TOSZAN.%0ADate%3A%0ACity%20%2F%20Venue%3A%0AEvent%20format%3A%0ASet%20time%20%2F%20duration%3A%0AExpected%20capacity%3A%0A",
  instagram: "https://www.instagram.com/toszan.willian?igsh=Zm9md2s2ODB5cXp2&utm_source=qr",
  soundcloud: "https://soundcloud.com/dj-willian-toszan",
};

const bookingFormats = [
  "Circuit Parties",
  "Pride Events",
  "Beach Clubs",
  "Pool Parties",
  "Peak-Time Club Sets",
  "Opening Sets",
  "Brand Events",
  "Private Events",
];

const selectedExperience = [
  { event: "Manicomio Club Night", city: "Rome", year: "2026", format: "Peak-time club set" },
  { event: "Roma Pride Energy", city: "Rome", year: "2026", format: "Pride / circuit support" },
  { event: "European Booking Slot", city: "TBC", year: "2026", format: "Beach club / circuit party" },
  { event: "Brand / Private Event", city: "TBC", year: "2026", format: "DJ set + content package" },
];

const whyBook = [
  "Brazilian energy",
  "Milan-based European project",
  "Tribal / Circuit / Progressive House",
  "Cinematic intros and signature vocals",
  "Strong visual identity",
  "Social content creation",
  "Crowd-focused performance",
  "Available for Europe bookings",
];

const creatorValue = [
  "Instagram Stories",
  "Reels",
  "Behind the scenes",
  "Event cross-promotion",
  "Lifestyle / fitness / travel audience",
  "Premium visual content",
];

const technicalInfo = [
  "Performance format: DJ set",
  "USB / Rekordbox ready",
  "Promo mix available",
  "Press photos available",
  "Technical rider available on request",
];

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function setBookingMeta() {
  document.title = "Book TOSZAN | Brazilian DJ based in Milan";
  upsertMeta("name", "description", BOOKING_DESCRIPTION);
  upsertMeta("property", "og:title", "Book TOSZAN | Brazilian DJ based in Milan");
  upsertMeta("property", "og:description", BOOKING_DESCRIPTION);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", "https://toszan-media-kit.vercel.app/booking");
  upsertMeta("property", "og:image", "https://toszan-media-kit.vercel.app/reels/posters/09-wide-crowd-room-proof.webp");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "theme-color", "#0B0B0B");
  upsertCanonical("https://toszan-media-kit.vercel.app/booking");

  let schema = document.head.querySelector<HTMLScriptElement>('script[data-route-schema="booking"]');
  if (!schema) {
    schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.routeSchema = "booking";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "TOSZAN",
    alternateName: "Willian Toszan",
    description: BOOKING_DESCRIPTION,
    genre: ["Tribal House", "Circuit House", "Progressive House"],
    foundingLocation: "Milan, Italy",
    areaServed: "Europe",
    url: "https://toszan-media-kit.vercel.app/booking",
    image: "https://toszan-media-kit.vercel.app/reels/posters/09-wide-crowd-room-proof.webp",
    member: {
      "@type": "Person",
      name: "Willian Toszan",
      jobTitle: "DJ / Performing Artist",
    },
    sameAs: [
      "https://www.instagram.com/toszan.willian/",
      "https://soundcloud.com/dj-willian-toszan",
      "https://open.spotify.com/artist/27FuT8olmWQ5g51OEwMkWt",
    ],
  });
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
  compact = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section id={id} className={compact ? "py-10 md:py-12" : "py-14 md:py-18"}>
      <div className="mb-7">
        <div
          style={{
            color: "#FFB000",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.34em",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            color: "#ffffff",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 7vw, 4.2rem)",
            letterSpacing: "0.08em",
            lineHeight: 0.95,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function PrimaryLink({
  href,
  children,
  icon,
  external = false,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-center"
      style={{
        background: "linear-gradient(135deg, #FFB000, #FF8C00)",
        border: "1px solid rgba(255,176,0,0.7)",
        color: "#0B0B0B",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.66rem",
        fontWeight: 800,
        letterSpacing: "0.22em",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      {children}
      {icon}
    </a>
  );
}

function SecondaryLink({
  href,
  children,
  icon,
  external = false,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-center"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#ffffff",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.66rem",
        fontWeight: 800,
        letterSpacing: "0.22em",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      {children}
      {icon}
    </a>
  );
}

function ProofCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="h-full rounded-xl p-5"
      style={{
        background: "rgba(255,255,255,0.028)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.28)",
      }}
    >
      {children}
    </div>
  );
}

export function BookingPage() {
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => {
    setBookingMeta();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div style={{ background: "#0B0B0B", color: "#ffffff", minHeight: "100vh" }}>
      <main>
        <section
          className="relative isolate overflow-hidden px-5 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,176,0,0.12) 0%, transparent 36%), linear-gradient(180deg, #0B0B0B 0%, #050505 100%)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,176,0,0.42), transparent)" }}
          />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <div
                className="mb-4 inline-flex items-center gap-2"
                style={{
                  color: "#FFB000",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 800,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00A86B", boxShadow: "0 0 14px rgba(0,168,107,0.6)" }} />
                European Booking Page
              </div>
              <h1
                style={{
                  color: "#ffffff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(5.4rem, 21vw, 13rem)",
                  letterSpacing: "0.08em",
                  lineHeight: 0.76,
                  marginLeft: "-0.02em",
                }}
              >
                TOSZAN
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {["Brazilian DJ based in Milan", "Tribal / Circuit / Progressive House", "Welcome to My World"].map((item) => (
                  <span
                    key={item}
                    style={{
                      border: "1px solid rgba(255,176,0,0.22)",
                      color: item === "Welcome to My World" ? "#FFB000" : "rgba(255,255,255,0.7)",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      padding: "9px 11px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p
                className="mt-8 max-w-2xl"
                style={{
                  color: "rgba(255,255,255,0.58)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
                  lineHeight: 1.8,
                }}
              >
                A booking-first EPK for promoters who need a DJ that can deliver a club floor, circuit energy and usable event content without turning the artist into a lifestyle act.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryLink href="#promo-mix" icon={<Headphones size={16} />}>
                  Listen Promo Mix
                </PrimaryLink>
                <SecondaryLink href="#booking-contact" icon={<MessageCircle size={16} />}>
                  Contact for Booking
                </SecondaryLink>
              </div>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.032)", border: "1px solid rgba(255,176,0,0.16)" }}
            >
              <div className="mb-4 flex items-center justify-center">
                <ToszanLogo cssHeight="clamp(4.5rem, 18vw, 8rem)" gold={false} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Base", "Milan"],
                  ["Market", "Europe"],
                  ["Sound", "Tribal / Circuit"],
                  ["Role", "DJ first"],
                ].map(([label, value]) => (
                  <div key={label} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "13px" }}>
                    <div style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                      {label}
                    </div>
                    <div style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.08em", lineHeight: 1.05 }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <SectionShell id="promo-mix" eyebrow="01 / Audio Proof" title="Listen Promo Mix">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
              <ProofCard>
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                      Lightweight player
                    </div>
                    <h3 style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "0.08em", lineHeight: 1, marginTop: "8px" }}>
                      {promoMix.title}
                    </h3>
                    <p className="mt-3 max-w-xl" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", lineHeight: 1.75 }}>
                      The SoundCloud iframe is not loaded on initial page load. Promoters get the page instantly, then can open the player only when they want to listen.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                    <button
                      type="button"
                      onClick={() => setPlayerLoaded(true)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 px-5"
                      style={{
                        background: "linear-gradient(135deg, #FFB000, #FF8C00)",
                        border: "1px solid rgba(255,176,0,0.7)",
                        color: "#0B0B0B",
                        cursor: "pointer",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.66rem",
                        fontWeight: 800,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                      }}
                    >
                      <Play fill="currentColor" size={15} />
                      Load Player
                    </button>
                    <SecondaryLink href={promoMix.url} external icon={<ExternalLink size={15} />}>
                      Open SoundCloud
                    </SecondaryLink>
                  </div>
                </div>
                <div
                  className="mt-5 overflow-hidden rounded-lg"
                  style={{
                    background: "rgba(0,0,0,0.32)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    minHeight: "166px",
                  }}
                >
                  {playerLoaded ? (
                    <iframe
                      title={`${promoMix.title} SoundCloud player`}
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      loading="lazy"
                      allow="autoplay"
                      src={promoMix.embedUrl}
                      style={{ display: "block" }}
                    />
                  ) : (
                    <div className="flex min-h-[166px] flex-col items-center justify-center px-5 text-center">
                      <Music size={26} color="#FFB000" />
                      <p className="mt-3" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", lineHeight: 1.6 }}>
                        Player held for performance. Click Load Player or open SoundCloud in a new tab.
                      </p>
                    </div>
                  )}
                </div>
              </ProofCard>

              <ProofCard>
                <div className="flex h-full flex-col justify-between gap-8">
                  <div>
                    <ShieldCheck color="#FFB000" size={28} />
                    <h3 className="mt-4" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", letterSpacing: "0.08em", lineHeight: 1 }}>
                      Buyer signal
                    </h3>
                    <p className="mt-3" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", lineHeight: 1.75 }}>
                      Start with the live set. Originals and remixes support the brand, but a promoter first needs to hear whether the DJ can hold a room.
                    </p>
                  </div>
                  <a
                    href="/#music"
                    className="inline-flex min-h-11 items-center gap-2"
                    style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.22em", textDecoration: "none", textTransform: "uppercase" }}
                  >
                    Full music section
                    <ArrowRight size={15} />
                  </a>
                </div>
              </ProofCard>
            </div>
          </SectionShell>

          <SectionShell id="watch-live" eyebrow="02 / Visual Proof" title="Watch Live Experience">
            <a
              href="/#experience"
              className="group grid overflow-hidden rounded-xl text-left md:grid-cols-[minmax(0,1fr)_380px]"
              style={{
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(255,176,0,0.16)",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              <div className="relative min-h-[260px] overflow-hidden md:min-h-[360px]">
                <img
                  src="/reels/posters/09-wide-crowd-room-proof.webp"
                  alt="TOSZAN live crowd proof"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "brightness(0.72) saturate(1.12) contrast(1.08)", transform: "scale(1.01)" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.78))" }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <span style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                    No Instagram embed loaded
                  </span>
                  <h3 className="mt-2" style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.4rem, 8vw, 4.8rem)", letterSpacing: "0.08em", lineHeight: 0.95 }}>
                    Room Proof
                  </h3>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-10 p-5 md:p-7">
                <div>
                  <p style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.92rem", lineHeight: 1.8 }}>
                    Lightweight poster link to the Live Experience section. It gives promoters a fast path to the reels without forcing Instagram or local video download on `/booking`.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {["Crowd", "Booth", "Stage", "Pride"].map((item) => (
                      <div key={item} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                        <div style={{ color: "#ffffff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.7rem", letterSpacing: "0.08em", lineHeight: 1 }}>
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="inline-flex min-h-12 items-center justify-center gap-2 px-5" style={{ background: "rgba(255,176,0,0.08)", border: "1px solid rgba(255,176,0,0.24)", color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  Watch Live Experience
                  <ArrowRight size={15} />
                </div>
              </div>
            </a>
          </SectionShell>

          <SectionShell eyebrow="03 / Formats" title="Booking Formats">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {bookingFormats.map((format) => (
                <div
                  key={format}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.026)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <CheckCircle2 size={18} color="#FFB000" />
                  <div className="mt-4" style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", lineHeight: 1.4, textTransform: "uppercase" }}>
                    {format}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell eyebrow="04 / Editable Proof" title="Selected Experience">
            <div className="overflow-hidden rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.026)" }}>
              <div className="hidden grid-cols-[1.2fr_0.8fr_0.5fr_1fr] gap-4 border-b border-white/10 px-5 py-4 md:grid">
                {["Event", "City", "Year", "Format"].map((label) => (
                  <div key={label} style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" }}>
                    {label}
                  </div>
                ))}
              </div>
              {selectedExperience.map((item) => (
                <div key={`${item.event}-${item.city}`} className="grid gap-3 border-b border-white/5 px-5 py-5 last:border-b-0 md:grid-cols-[1.2fr_0.8fr_0.5fr_1fr] md:gap-4">
                  {[
                    ["Event", item.event],
                    ["City", item.city],
                    ["Year", item.year],
                    ["Format", item.format],
                  ].map(([label, value]) => (
                    <div key={`${item.event}-${label}`}>
                      <div className="md:hidden" style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.5rem", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                        {label}
                      </div>
                      <div style={{ color: value === "TBC" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.76)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.86rem", lineHeight: 1.55 }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SectionShell>

          <div className="grid gap-8 lg:grid-cols-2">
            <SectionShell eyebrow="05 / Buyer Logic" title="Why Book TOSZAN" compact>
              <div className="grid gap-3">
                {whyBook.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.026)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <CheckCircle2 className="mt-0.5 shrink-0" size={18} color="#FFB000" />
                    <span style={{ color: "rgba(255,255,255,0.74)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", lineHeight: 1.55 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell eyebrow="06 / Added Value" title="Creator / Promotion Value" compact>
              <ProofCard>
                <div className="flex items-start gap-4">
                  <Camera className="shrink-0" color="#FFB000" size={28} />
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.76)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.7 }}>
                      The product is the DJ set. Creator output is the commercial amplifier.
                    </p>
                    <p className="mt-3" style={{ color: "rgba(255,255,255,0.48)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.86rem", lineHeight: 1.75 }}>
                      TOSZAN can support the booking with event visibility, social content and premium backstage/lifestyle material without weakening the music-first position.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {creatorValue.map((item) => (
                    <span
                      key={item}
                      style={{
                        border: "1px solid rgba(255,176,0,0.18)",
                        color: "rgba(255,255,255,0.66)",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        padding: "8px 10px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </ProofCard>
            </SectionShell>
          </div>

          <SectionShell eyebrow="07 / Professional Info" title="Technical / Professional Info">
            <div className="grid gap-3 md:grid-cols-5">
              {technicalInfo.map((item) => (
                <div key={item} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.026)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <CalendarDays size={18} color="#FFB000" />
                  <div className="mt-4" style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 700, lineHeight: 1.55 }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell id="booking-contact" eyebrow="08 / Direct Contact" title="Contact CTA">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <PrimaryLink href={contactLinks.email} external icon={<Mail size={16} />}>
                Email
              </PrimaryLink>
              <PrimaryLink href={contactLinks.whatsapp} external icon={<MessageCircle size={16} />}>
                WhatsApp
              </PrimaryLink>
              <SecondaryLink href={contactLinks.instagram} external icon={<Instagram size={16} />}>
                Instagram
              </SecondaryLink>
              <SecondaryLink href={contactLinks.soundcloud} external icon={<Music size={16} />}>
                SoundCloud
              </SecondaryLink>
              <button
                type="button"
                disabled
                className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-center disabled:cursor-not-allowed"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.42)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <Download size={15} />
                EPK PDF Coming Soon
              </button>
            </div>

            <div className="mt-6 rounded-xl p-5" style={{ background: "rgba(255,176,0,0.04)", border: "1px solid rgba(255,176,0,0.14)" }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div style={{ color: "#FFB000", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                    Download EPK PDF
                  </div>
                  <p className="mt-2" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.86rem", lineHeight: 1.65 }}>
                    PDF structure is ready. Add the final file later and this slot becomes the direct download button.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  <FileText size={16} color="#FFB000" />
                  EPK PDF coming soon
                </div>
              </div>
            </div>
          </SectionShell>
        </div>
      </main>
    </div>
  );
}
