import { creatorLinks } from "../../data/creatorStats";
import { useLanguage, type Language } from "../context/LanguageContext";

const copy: Record<Language, { label: string; message: string }> = {
  pt: { label: "Contato pelo WhatsApp", message: "Olá, TOSZAN! Gostaria de informações sobre contratações ou parcerias." },
  en: { label: "Contact on WhatsApp", message: "Hi, TOSZAN! I'd like information about bookings or partnerships." },
  it: { label: "Contatto su WhatsApp", message: "Ciao, TOSZAN! Vorrei informazioni su ingaggi o collaborazioni." },
  es: { label: "Contacto por WhatsApp", message: "¡Hola, TOSZAN! Me gustaría recibir información sobre contrataciones o colaboraciones." },
  fr: { label: "Contact sur WhatsApp", message: "Bonjour, TOSZAN ! Je souhaite des informations sur les réservations ou partenariats." },
};

// Derive the destination from the professional contact already in the project.
export function WhatsAppLink({ floating = false, className = "" }: { floating?: boolean; className?: string }) {
  const { language } = useLanguage();
  const text = copy[language];
  const url = new URL(creatorLinks.whatsapp);
  url.searchParams.set("text", text.message);
  return <a className={`${floating ? "whatsapp-floating" : "whatsapp-link"} ${className}`}
    href={url.toString()} target="_blank" rel="noopener noreferrer" aria-label={text.label} title={text.label}>
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01C18.64 23.84 24 18.49 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.04 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.96 9.87Zm5.45-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>
    {!floating && <span>WhatsApp</span>}
  </a>;
}
