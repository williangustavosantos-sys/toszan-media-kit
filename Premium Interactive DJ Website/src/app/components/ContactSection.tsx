import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import { useLanguage, type Language } from "../context/LanguageContext";
import "../../styles/general-editorial.css";

const contactUi: Record<Language, {
  bridge: string;
  bridgeBody: string;
  booking: string;
  email: string;
  emailAction: string;
  whatsappAction: string;
  instagramAction: string;
  soundcloudAction: string;
  requestHint: string;
  requestFields: string;
  overview: string;
  creator: string;
  rights: string;
  location: string;
  emailSubject: string;
  emailBody: string;
  whatsappBody: string;
}> = {
  en: { bridge: "DJ booking", bridgeBody: "Music, real live proof, formats and direct contact in one promoter-ready page.", booking: "Open booking", email: "Direct email", emailAction: "Send a booking enquiry", whatsappAction: "Message on WhatsApp", instagramAction: "Open Instagram", soundcloudAction: "Open SoundCloud", requestHint: "For a faster reply", requestFields: "Include date, city, venue, event format and budget.", overview: "General", creator: "Creator", rights: "All rights reserved", location: "Brazilian energy · Milan base", emailSubject: "TOSZAN DJ booking", emailBody: "Date:\nCity / venue:\nEvent format:\nSet duration:\nBudget:", whatsappBody: "Hello TOSZAN, I would like to discuss a DJ booking.\nDate:\nCity / venue:\nEvent format:\nSet duration:\nBudget:" },
  pt: { bridge: "Contratação de DJ", bridgeBody: "Música, apresentações reais, formatos e contato direto reunidos em uma página para contratantes.", booking: "Ver página de contratação", email: "E-mail direto", emailAction: "Enviar pedido de contratação", whatsappAction: "Conversar pelo WhatsApp", instagramAction: "Abrir Instagram", soundcloudAction: "Abrir SoundCloud", requestHint: "Para responder mais rápido", requestFields: "Informe data, cidade, local, formato do evento e orçamento.", overview: "Visão geral", creator: "Criador", rights: "Todos os direitos reservados", location: "Energia brasileira · Base em Milão", emailSubject: "Contratação de DJ TOSZAN", emailBody: "Data:\nCidade / local:\nFormato do evento:\nDuração do set:\nOrçamento:", whatsappBody: "Olá TOSZAN, gostaria de conversar sobre uma contratação como DJ.\nData:\nCidade / local:\nFormato do evento:\nDuração do set:\nOrçamento:" },
  it: { bridge: "Ingaggi DJ", bridgeBody: "Musica, esibizioni reali, formati e contatto diretto in una pagina pensata per gli organizzatori.", booking: "Apri la pagina ingaggi", email: "E-mail diretta", emailAction: "Invia una richiesta di ingaggio", whatsappAction: "Scrivi su WhatsApp", instagramAction: "Apri Instagram", soundcloudAction: "Apri SoundCloud", requestHint: "Per una risposta più rapida", requestFields: "Indica data, città, locale, formato dell’evento e budget.", overview: "Generale", creator: "Creatore", rights: "Tutti i diritti riservati", location: "Energia brasiliana · Base a Milano", emailSubject: "Richiesta di ingaggio DJ TOSZAN", emailBody: "Data:\nCittà / locale:\nFormato evento:\nDurata del set:\nBudget:", whatsappBody: "Ciao TOSZAN, vorrei parlare di un ingaggio DJ.\nData:\nCittà / locale:\nFormato evento:\nDurata del set:\nBudget:" },
  es: { bridge: "Contratación de DJ", bridgeBody: "Música, actuaciones reales, formatos y contacto directo en una página para promotores.", booking: "Ver página de contratación", email: "Correo directo", emailAction: "Enviar solicitud de contratación", whatsappAction: "Escribir por WhatsApp", instagramAction: "Abrir Instagram", soundcloudAction: "Abrir SoundCloud", requestHint: "Para responder más rápido", requestFields: "Incluye fecha, ciudad, local, formato del evento y presupuesto.", overview: "General", creator: "Creador", rights: "Todos los derechos reservados", location: "Energía brasileña · Base en Milán", emailSubject: "Contratación DJ TOSZAN", emailBody: "Fecha:\nCiudad / local:\nFormato del evento:\nDuración del set:\nPresupuesto:", whatsappBody: "Hola TOSZAN, quisiera hablar de una contratación como DJ.\nFecha:\nCiudad / local:\nFormato del evento:\nDuración del set:\nPresupuesto:" },
  fr: { bridge: "Réservation DJ", bridgeBody: "Musique, performances réelles, formats et contact direct sur une page conçue pour les organisateurs.", booking: "Voir la page de réservation", email: "E-mail direct", emailAction: "Envoyer une demande de réservation", whatsappAction: "Écrire sur WhatsApp", instagramAction: "Ouvrir Instagram", soundcloudAction: "Ouvrir SoundCloud", requestHint: "Pour une réponse plus rapide", requestFields: "Indiquez la date, la ville, le lieu, le format et le budget.", overview: "Accueil", creator: "Créateur", rights: "Tous droits réservés", location: "Énergie brésilienne · Basé à Milan", emailSubject: "Demande de réservation DJ TOSZAN", emailBody: "Date :\nVille / lieu :\nFormat de l’événement :\nDurée du set :\nBudget :", whatsappBody: "Bonjour TOSZAN, je souhaite discuter d’une réservation DJ.\nDate :\nVille / lieu :\nFormat de l’événement :\nDurée du set :\nBudget :" },
};

export function ContactSection() {
  const { t, language } = useLanguage();
  const reducedMotion = Boolean(useReducedMotion());
  const copy = contactUi[language];
  const bookingNav = language === "pt" ? "Contratação" : language === "it" ? "Ingaggi" : language === "es" ? "Contratación" : language === "fr" ? "Réservation DJ" : "Booking";
  const emailHref = `mailto:dj@toszan.com.br?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(copy.emailBody)}`;
  const whatsappHref = `https://wa.me/393428369444?text=${encodeURIComponent(copy.whatsappBody)}`;
  const contacts = [
    { label: copy.email, value: "dj@toszan.com.br", action: copy.emailAction, href: emailHref, icon: Mail, external: false },
    { label: "WhatsApp", value: "+39 342 836 9444", action: copy.whatsappAction, href: whatsappHref, icon: MessageCircle, external: true },
    { label: "Instagram", value: "@toszan.willian", action: copy.instagramAction, href: "https://www.instagram.com/toszan.willian/", icon: Instagram, external: true },
    { label: "SoundCloud", value: "@dj-willian-toszan", action: copy.soundcloudAction, href: "https://soundcloud.com/dj-willian-toszan", icon: Music2, external: true },
  ];

  return (
    <section id="contact" className="general-contact" aria-labelledby="general-contact-title">
      <div className="general-shell">
        <motion.div className="general-contact-heading" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reducedMotion ? 0 : 0.7 }}>
          <p className="general-eyebrow">{t("contact.label")}</p>
          <h2 id="general-contact-title">{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
        </motion.div>

        <div className="general-booking-bridge">
          <div><span>{copy.bridge}</span><p>{copy.bridgeBody}</p></div>
          <a href="/booking">{copy.booking}<ArrowRight size={17} aria-hidden="true" /></a>
        </div>

        <div className="general-contact-list">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a key={contact.label} href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.04 }}>
                <span className="general-contact-icon"><Icon size={17} aria-hidden="true" /></span>
                <span className="general-contact-name"><small>{contact.label}</small><strong>{contact.value}</strong></span>
                <span className="general-contact-action">{contact.action}<ArrowRight size={15} aria-hidden="true" /></span>
              </motion.a>
            );
          })}
        </div>

        <div className="general-request-note"><span>{copy.requestHint}</span><p>{copy.requestFields}</p></div>

        <footer className="general-footer">
          <nav aria-label={t("contact.label")}><a href="/">{copy.overview}</a><a href="/booking">{bookingNav}</a><a href="/creator">{copy.creator}</a></nav>
          <div><span>© 2026 Willian Toszan · {copy.rights}</span><span>{copy.location}</span></div>
        </footer>
      </div>
    </section>
  );
}
