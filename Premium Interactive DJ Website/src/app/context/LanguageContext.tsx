import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "pt" | "it" | "es" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("willian-toszan-language");
      return (saved as Language) || "en";
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("willian-toszan-language", lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

const translations: Record<Language, any> = {
  en: {
    nav: {
      experience: "Experience",
      music: "Music",
      lifestyle: "Lifestyle",
      partnerships: "Partnerships",
      mediaKit: "Media Kit",
      booking: "Booking",
    },
    hero: {
      subtitle: "WELCOME TO MY WORLD!",
      tag: "Music\u00a0\u00a0•\u00a0\u00a0Lifestyle\u00a0\u00a0•\u00a0\u00a0Culture\u00a0\u00a0•\u00a0\u00a0Performance",
      booking: "Booking",
      mediaKit: "Media Kit",
      watchLive: "Watch Live",
    },
    moments: {
      label: "Captured Energy",
      title: "MOMENTS THAT MOVE",
      subtitle: "Brazilian energy. European nightlife. Real presence.",
    },
    experience: {
      label: "Visual Archive",
      title: "Live Experience",
      categories: {
        all: "All",
      },
    },

    music: {
      label: "Latest Releases",
      title: "Music",
    },

    lifestyle: {
      label: "The World of Willian",
      title1: "Experience &",
      title2: "Lifestyle",
      stories: {
        s1: { title: "La Dolce Vita Notturna", desc: "Where fashion bleeds into the dancefloor. Milan doesn't sleep — it transforms. Every corner breathes style, every club breathes life.", cat: "Milano", hand: "Tutto è possibile." },
        s2: { title: "Stage Presence", desc: "Every set is a ritual. The crowd becomes one. The music becomes fire. This is what happens when Brazilian heat meets European concrete.", cat: "On Stage" },
        s3: { title: "Where Two Worlds Collide", desc: "Born in Brazil. Built in Europe. The energy of Carnival meets the precision of Milan. The result is something the world has never heard before.", cat: "Brasil × Europa", hand: "Vem comigo." },
        s4: { title: "Style Without Borders", desc: "Music is a visual experience. The aesthetic is part of the art — editorial, intentional, impossible to ignore. Fashion as language.", cat: "Fashion" },
        s5: { title: "Sunrise in Paradise", desc: "From Milan to Ibiza — the journey never stops. Premium venues, premium energy, premium audiences. The world is the stage.", cat: "Ibiza", hand: "O mundo é pequeno." },
        s6: { title: "Before The Storm", desc: "The calm before the beat drops. Deep focus. Headphones on. The crowd is waiting. This moment right here — this is everything.", cat: "Backstage" },
      }
    },

    brand: {
      label: "The Essence",
      title: "EXPERIENCE",
      desc1: "Brazilian energy shaped by life and European nightlife.",
      desc2: "Between Milan, Rome and different experiences across Europe, my goal is to create moments that people truly remember — through music, presence, movement and connection.",
      desc3: "More than a set, it's an atmosphere.\nMore than content, it's personality.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "More than a style, it's a contagious energy.\n\nEvery set is built to create real connection with the audience through dance, tension, emotion and fun, transforming the dance floor into a unique and intense experience.",
        contentTitle: "CONTENT",
        contentText: "Content focused on lifestyle, music, fitness, travel and real experiences, always with a strong organic connection to the audience.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Presence at events, clubs, private experiences and creative collaborations across Brazil and Europe.",
        communityTitle: "COMMUNITY",
        communityText: "Building an audience through authenticity, human energy and experiences that generate true identification."
      },
      quote1: "I don't just create content to be seen.",
      quote2: "I create a presence impossible to ignore."
    },
    media: {
      label: "Press & Media",
      title: "Media Kit",
      subtitle: "Everything you need to work with Willian.",
      desc: "Available for worldwide bookings, brand campaigns, media appearances, and creative partnerships.",
      instagramPeriod: "Instagram · Last 30 Days",
      stats: {
        views: "Monthly Views",
        followers: "Followers",
        interactions: "Interactions / mo",
        growth: "New Followers / mo",
        organic: "Organic Audience",
        based: "Based in",
        milan: "Milan"
      },
      photos: {
        title: "Press Photos",
        p1: "On Stage · Energy",
        p2: "Artist Portrait",
        p3: "DJ Booth · Rome",
        p4: "Official Photo"
      },
      downloads: {
        title: "Downloads",
        d1Title: "Full Press Kit",
        d1Sub: "PDF · Biography + Stats + Photos",
        d2Title: "Technical Rider",
        d2Sub: "Technical requirements for shows",
        d3Title: "Instagram Media Kit",
        d3Sub: "Engagement, demographics, rates",
        d4Title: "SoundCloud Profile",
        d4Sub: "Latest sets and studio tracks"
      }
    },
    live: {
      cats: {
        all: "Todos",
        onStage: "En el Escenario",
        backstage: "Entre Bastidores",
        milano: "Milán",
        lifestyle: "Estilo de Vida",
        travel: "Viajes",
        audience: "Público"
      },
      labels: {
        l1: "Energía · En Vivo",
        l2: "En el Escenario — Roma",
        l3: "La Vibe",
        l4: "Club Night · Milán",
        l5: "Detrás de los Platos",
        l6: "Modo Festival",
        l7: "Rendimiento",
        l8: "Enfoque",
        l9: "Noches Italianas",
        l10: "En la Carretera",
        l11: "Estética",
        l12: "La Multitud"
      }
    },
    contact: {
      label: "Connect",
      title: "Get In Touch",
      tagline: "Let's work together?",
      description: "Available for bookings, collaborations, brand partnerships and creative projects worldwide.",
      bookingTitle: "Booking Inquiry",
      bookingSubtitle: "Tell me about your event.",
      send: "Send Booking Inquiry",
      form: {
        name: "Name",
        namePh: "Your name",
        email: "Email",
        emailPh: "your@email.com",
        event: "Event / Venue",
        eventPh: "Event name and venue",
        date: "Date",
        datePh: "Preferred date",
        message: "Message",
        messagePh: "Tell us about your event...",
      },
    },
    partnerships: {
      label: "Collaborate",
      title: "Partnerships",
      subtitle: "Willian is more than a DJ.",
      desc: "Building premium creative alliances across music, fashion, nightlife and culture. DJ, creator, entertainer, lifestyle personality.",
      enquire: "Enquire",
      cta: "Let's Create Something Exceptional",
      ctaDesc: "Premium partnerships for premium experiences.",
      getInTouch: "Get in Touch",
      cats: {
        nightlife: "Nightlife",
        events: "Events",
        fashion: "Fashion",
        lifestyle: "Lifestyle",
        travel: "Travel",
        hospitality: "Hospitality",
        creators: "Creators",
        campaigns: "Campaigns",
        nightlifeTitle: "Nightlife Residencies",
        nightlifeDesc: "Club residencies, weekly nights, and exclusive bookings at Europe's most magnetic venues — from Milan to Ibiza.",
        eventsTitle: "Event Partnerships",
        eventsDesc: "Headline bookings, festival stages, private events. Built for promoters and venues that demand unforgettable energy.",
        fashionTitle: "Fashion Collabs",
        fashionDesc: "Visual storytelling at the intersection of club culture and high fashion. Campaigns, editorials, brand activations.",
        lifestyleTitle: "Lifestyle Brand Deals",
        lifestyleDesc: "Sponsored content, product placement, and authentic lifestyle storytelling for premium brands.",
        travelTitle: "Travel Partnerships",
        travelDesc: "Luxury destination events, travel brand collabs, and branded experiences across premier European destinations.",
        hospitalityTitle: "Hospitality & F&B",
        hospitalityDesc: "Hotel and restaurant collaborations, rooftop events, exclusive dining experiences, premium venue partnerships.",
        creatorsTitle: "Creator Synergies",
        creatorsDesc: "Co-productions, creative direction, and digital content creation with artists across music and visual arts.",
        campaignsTitle: "Brand Campaigns",
        campaignsDesc: "Ambassador programs, paid partnerships, and long-term creative alliances with brands that match his world."
      }
    },
    footer: {
      tagline: "Brazilian Energy · European Nightlife · Milan",
    },
  },
  pt: {
    nav: {
      experience: "Experiência",
      music: "Música",
      lifestyle: "Lifestyle",
      partnerships: "Parcerias",
      mediaKit: "Media Kit",
      booking: "Contrate",
    },
    hero: {
      subtitle: "BEM-VINDOS AO MEU MUNDO!",
      tag: "Música\u00a0\u00a0•\u00a0\u00a0Lifestyle\u00a0\u00a0•\u00a0\u00a0Cultura\u00a0\u00a0•\u00a0\u00a0Performance",
      booking: "Contratar",
      mediaKit: "Media Kit",
      watchLive: "Assistir ao Vivo",
    },
    moments: {
      label: "Energia Capturada",
      title: "MOMENTOS QUE MOVEM",
      subtitle: "Energia brasileira. Nightlife europeia. Presença real.",
    },
    experience: {
      label: "Arquivo Visual",
      title: "Experiência ao Vivo",
      categories: {
        all: "Todos",
      },
    },

    music: {
      label: "Últimos Lançamentos",
      title: "Música",
    },

    lifestyle: {
      label: "O Mundo de Willian",
      title1: "Experiência &",
      title2: "Estilo de Vida",
      stories: {
        s1: { title: "La Dolce Vita Notturna", desc: "Onde a moda se mistura à pista. Milão não dorme — ela se transforma. Cada esquina respira estilo, cada club respira vida.", cat: "Milão", hand: "Tutto è possibile." },
        s2: { title: "Presença de Palco", desc: "Cada set é um ritual. O público se torna um só. A música se torna fogo. É o que acontece quando o calor brasileiro encontra o concreto europeu.", cat: "No Palco" },
        s3: { title: "Onde Dois Mundos Colidem", desc: "Nascido no Brasil. Construído na Europa. A energia do Carnaval encontra a precisão de Milão. O resultado é algo inédito.", cat: "Brasil × Europa", hand: "Vem comigo." },
        s4: { title: "Estilo Sem Fronteiras", desc: "Música é uma experiência visual. A estética faz parte da arte — editorial, intencional, impossível de ignorar. Moda como linguagem.", cat: "Moda" },
        s5: { title: "Amanhecer no Paraíso", desc: "De Milão a Ibiza — a jornada nunca para. Venues premium, energia premium, público premium. O mundo é o palco.", cat: "Ibiza", hand: "O mundo é pequeno." },
        s6: { title: "Antes da Tempestade", desc: "A calma antes do beat cair. Foco profundo. Fones no ouvido. O público espera. Este momento aqui — é tudo.", cat: "Bastidores" },
      }
    },

    brand: {
      label: "A Essência",
      title: "EXPERIÊNCIA",
      desc1: "Energia brasileira moldada pela vida e pela nightlife europeia.",
      desc2: "Entre Milão, Roma e diferentes experiências na Europa, meu foco é criar momentos que as pessoas realmente lembram — através da música, presença, movimento e conexão.",
      desc3: "Mais do que um set, é atmosfera.\nMais do que conteúdo, é personalidade.",
      cards: {
        musicTitle: "MÚSICA",
        musicText: "Mais do que um estilo, é uma energia contagiante.\n\nCada set é construído para criar conexão real com o público através da dança, tensão, emoção e diversão, transformando a pista em uma experiência única e intensa.",
        contentTitle: "CONTEÚDO",
        contentText: "Conteúdo voltado para lifestyle, música, fitness, viagens e experiências reais, sempre com forte conexão orgânica com o público.",
        liveTitle: "PRESENÇA AO VIVO",
        liveText: "Presença em eventos, clubes, experiências privadas e colaborações criativas entre Brasil e Europa.",
        communityTitle: "COMUNIDADE",
        communityText: "Construindo uma audiência através da autenticidade, energia humana e experiências que geram verdadeira identificação."
      },
      quote1: "Eu não crio apenas conteúdo para ser visto.",
      quote2: "Eu crio uma presença impossível de ignorar."
    },
    media: {
      label: "Imprensa e Mídia",
      title: "Media Kit",
      subtitle: "Tudo o que você precisa para trabalhar com o Willian.",
      desc: "Disponível para bookings no mundo todo, campanhas de marca, aparições na mídia e parcerias criativas.",
      instagramPeriod: "Instagram · Últimos 30 Dias",
      stats: {
        views: "Visualizações mensais",
        followers: "Seguidores",
        interactions: "Interações / mês",
        growth: "Novos seguidores / mês",
        organic: "Público Orgânico",
        based: "Baseado em",
        milan: "Milão"
      },
      photos: {
        title: "Fotos de Imprensa",
        p1: "No Palco · Energia",
        p2: "Retrato do Artista",
        p3: "DJ Booth · Roma",
        p4: "Foto Oficial"
      },
      downloads: {
        title: "Downloads",
        d1Title: "Press Kit Completo",
        d1Sub: "PDF · Biografia + Estatísticas + Fotos",
        d2Title: "Rider Técnico",
        d2Sub: "Requisitos técnicos para shows",
        d3Title: "Media Kit Instagram",
        d3Sub: "Engajamento, demografia, tarifas",
        d4Title: "Perfil SoundCloud",
        d4Sub: "Últimos sets e faixas de estúdio"
      }
    },
    live: {
      cats: {
        all: "Todos",
        onStage: "En el Escenario",
        backstage: "Entre Bastidores",
        milano: "Milán",
        lifestyle: "Estilo de Vida",
        travel: "Viajes",
        audience: "Público"
      },
      labels: {
        l1: "Energía · En Vivo",
        l2: "En el Escenario — Roma",
        l3: "La Vibe",
        l4: "Club Night · Milán",
        l5: "Detrás de los Platos",
        l6: "Modo Festival",
        l7: "Rendimiento",
        l8: "Enfoque",
        l9: "Noches Italianas",
        l10: "En la Carretera",
        l11: "Estética",
        l12: "La Multitud"
      }
    },
    contact: {
      label: "Contato",
      title: "Entre em Contato",
      tagline: "Vamos trabalhar juntos?",
      description: "Disponível para shows, colaborações, parcerias de marca e projetos criativos no mundo todo.",
      bookingTitle: "Solicitar Booking",
      bookingSubtitle: "Me conte sobre o seu evento.",
      send: "Enviar Solicitação",
      form: {
        name: "Nome",
        namePh: "Seu nome",
        email: "E-mail",
        emailPh: "seu@email.com",
        event: "Evento / Venue",
        eventPh: "Nome do evento e local",
        date: "Data",
        datePh: "Data preferencial",
        message: "Mensagem",
        messagePh: "Conte-nos sobre o seu evento...",
      },
    },
    partnerships: {
      label: "Colabore",
      title: "Parcerias",
      subtitle: "Willian é mais que um DJ.",
      desc: "Construindo alianças criativas premium em música, moda, vida noturna e cultura. DJ, criador, entertainer, personalidade lifestyle.",
      enquire: "Consultar",
      cta: "Vamos Criar Algo Excepcional",
      ctaDesc: "Parcerias premium para experiências premium.",
      getInTouch: "Entrar em Contato",
      cats: {
        nightlife: "Nightlife",
        events: "Eventos",
        fashion: "Moda",
        lifestyle: "Estilo de Vida",
        travel: "Viagens",
        hospitality: "Hospitalidade",
        creators: "Criadores",
        campaigns: "Campanhas",
        nightlifeTitle: "Residências em Clubs",
        nightlifeDesc: "Residências, noites semanais e bookings exclusivos nos locais mais magnéticos da Europa — de Milão a Ibiza.",
        eventsTitle: "Parcerias em Eventos",
        eventsDesc: "Headline bookings, palcos de festivais, eventos privados. Feito para promotores e venues que exigem energia inesquecível.",
        fashionTitle: "Collabs de Moda",
        fashionDesc: "Storytelling visual na intersecção da cultura de club e alta moda. Campanhas, editoriais, ativações de marca.",
        lifestyleTitle: "Marcas Lifestyle",
        lifestyleDesc: "Conteúdo patrocinado, product placement e storytelling autêntico de lifestyle para marcas premium.",
        travelTitle: "Parcerias de Viagem",
        travelDesc: "Eventos em destinos de luxo, collabs com marcas de viagem e experiências exclusivas nos principais destinos europeus.",
        hospitalityTitle: "Hospitalidade e F&B",
        hospitalityDesc: "Colaborações com hotéis e restaurantes, eventos em rooftops, experiências gastronômicas e parcerias com venues premium.",
        creatorsTitle: "Sinergia de Criadores",
        creatorsDesc: "Coproduções, direção criativa e criação de conteúdo digital com artistas da música e artes visuais.",
        campaignsTitle: "Campanhas de Marca",
        campaignsDesc: "Programas de embaixador, parcerias pagas e alianças criativas de longo prazo com marcas que combinam com seu mundo."
      }
    },
    footer: {
      tagline: "Energia Brasileira · Nightlife Europeia · Milão",
    },
  },
  it: {
    nav: {
      experience: "Esperienza",
      music: "Musica",
      lifestyle: "Lifestyle",
      partnerships: "Partnership",
      mediaKit: "Media Kit",
      booking: "Prenota",
    },
    hero: {
      subtitle: "BENVENUTI NEL MIO MONDO!",
      tag: "Musica\u00a0\u00a0•\u00a0\u00a0Lifestyle\u00a0\u00a0•\u00a0\u00a0Cultura\u00a0\u00a0•\u00a0\u00a0Performance",
      booking: "Prenota",
      mediaKit: "Media Kit",
      watchLive: "Guarda Live",
    },
    moments: {
      label: "Energia Catturata",
      title: "MOMENTI CHE MUOVONO",
      subtitle: "Energia brasiliana. Nightlife europea. Presenza reale.",
    },
    experience: {
      label: "Archivio Visuale",
      title: "Live Experience",
      categories: {
        all: "Tutti",
      },
    },

    music: {
      label: "Ultime Uscite",
      title: "Musica",
    },

    lifestyle: {
      label: "Il Mondo di Willian",
      title1: "Esperienza &",
      title2: "Lifestyle",
      stories: {
        s1: { title: "La Dolce Vita Notturna", desc: "Dove la moda si fonde con la pista. Milano non dorme — si trasforma. Ogni angolo respira stile, ogni club respira vita.", cat: "Milano", hand: "Tutto è possibile." },
        s2: { title: "Presenza scenica", desc: "Ogni set è un rituale. La folla diventa un tutt'uno. La musica diventa fuoco. Questo è ciò che accade quando il calore brasiliano incontra il cemento europeo.", cat: "Sul Palco" },
        s3: { title: "Dove due mondi si scontrano", desc: "Nato in Brasile. Costruito in Europa. L'energia del Carnevale incontra la precisione di Milano. Il risultato è qualcosa che il mondo non ha mai sentito prima.", cat: "Brasile × Europa", hand: "Vem comigo." },
        s4: { title: "Stile senza confini", desc: "La musica è un'esperienza visiva. L'estetica fa parte dell'arte — editoriale, intenzionale, impossibile da ignorare. La moda come linguaggio.", cat: "Moda" },
        s5: { title: "Alba in Paradiso", desc: "Da Milano a Ibiza — il viaggio non si ferma mai. Location premium, energia premium, pubblico premium. Il mondo è il palcoscenico.", cat: "Ibiza", hand: "O mundo é pequeno." },
        s6: { title: "Prima della tempesta", desc: "La calma prima che il beat esploda. Concentrazione profonda. Cuffie accese. La folla sta aspettando. Questo momento qui — è tutto.", cat: "Dietro le quinte" },
      }
    },

    brand: {
      label: "L'Essenza",
      title: "ESPERIENZA",
      desc1: "Energia brasiliana plasmata dalla vita e dalla nightlife europea.",
      desc2: "Tra Milano, Roma e diverse esperienze in Europa, il mio obiettivo è creare momenti che le persone ricorderanno davvero — attraverso la musica, la presenza, il movimento e la connessione.",
      desc3: "Più che un set, è un'atmosfera.\nPiù che contenuti, è personalità.",
      cards: {
        musicTitle: "MUSICA",
        musicText: "Più che uno stile, è un'energia contagiosa.\n\nOgni set è costruito per creare una vera connessione con il pubblico attraverso danza, tensione, emozione e divertimento, trasformando la pista da ballo in un'esperienza unica e intensa.",
        contentTitle: "CONTENUTO",
        contentText: "Contenuti focalizzati su lifestyle, musica, fitness, viaggi ed esperienze reali, sempre con una forte connessione organica con il pubblico.",
        liveTitle: "PRESENZA LIVE",
        liveText: "Presenza a eventi, club, esperienze private e collaborazioni creative tra Brasile ed Europa.",
        communityTitle: "COMUNITÀ",
        communityText: "Costruire un pubblico attraverso l'autenticità, l'energia umana ed esperienze che generano vera identificazione."
      },
      quote1: "Non creo contenuti solo per essere visto.",
      quote2: "Creo una presenza impossibile da ignorare."
    },
    media: {
      label: "Stampa e Media",
      title: "Media Kit",
      subtitle: "Tutto ciò di cui hai bisogno per lavorare con Willian.",
      desc: "Disponibile per booking, campagne brand, apparizioni sui media e partnership creative in tutto il mondo.",
      instagramPeriod: "Instagram · Ultimi 30 Giorni",
      stats: {
        views: "Visualizzazioni mensili",
        followers: "Follower",
        interactions: "Interazioni / mese",
        growth: "Nuovi follower / mese",
        organic: "Pubblico Organico",
        based: "Basato a",
        milan: "Milano"
      },
      photos: {
        title: "Foto Stampa",
        p1: "Sul Palco · Energia",
        p2: "Ritratto Artista",
        p3: "DJ Booth · Roma",
        p4: "Foto Ufficiale"
      },
      downloads: {
        title: "Download",
        d1Title: "Press Kit Completo",
        d1Sub: "PDF · Biografia + Statistiche + Foto",
        d2Title: "Technical Rider",
        d2Sub: "Requisiti tecnici per gli show",
        d3Title: "Media Kit Instagram",
        d3Sub: "Engagement, demografia, tariffe",
        d4Title: "Profilo SoundCloud",
        d4Sub: "Ultimi set e brani in studio"
      }
    },
    live: {
      cats: {
        all: "Tutti",
        onStage: "Sul Palco",
        backstage: "Dietro le Quinte",
        milano: "Milano",
        lifestyle: "Lifestyle",
        travel: "Viaggi",
        audience: "Pubblico"
      },
      labels: {
        l1: "Energia · Dal Vivo",
        l2: "Sul Palco — Roma",
        l3: "La Vibe",
        l4: "Club Night · Milano",
        l5: "Dietro la Consolle",
        l6: "Modalità Festival",
        l7: "Performance",
        l8: "Focus",
        l9: "Notti Italiane",
        l10: "In Viaggio",
        l11: "Estetica",
        l12: "La Folla"
      }
    },
    contact: {
      label: "Contatti",
      title: "Scrivimi",
      tagline: "Lavoriamo insieme?",
      description: "Disponibile per booking, collaborazioni, partnership con brand e progetti creativi in tutto il mondo.",
      bookingTitle: "Richiesta di Booking",
      bookingSubtitle: "Parlami del tuo evento.",
      send: "Invia Richiesta",
      form: {
        name: "Nome",
        namePh: "Il tuo nome",
        email: "Email",
        emailPh: "tua@email.com",
        event: "Evento / Venue",
        eventPh: "Nome evento e location",
        date: "Data",
        datePh: "Data preferita",
        message: "Messaggio",
        messagePh: "Raccontaci del tuo evento...",
      },
    },
    partnerships: {
      label: "Collabora",
      title: "Partnership",
      subtitle: "Willian è più di un DJ.",
      desc: "Costruire alleanze creative premium tra musica, moda, vita notturna e cultura. DJ, creatore, entertainer, personalità lifestyle.",
      enquire: "Richiedi",
      cta: "Creiamo Qualcosa di Eccezionale",
      ctaDesc: "Partnership premium per esperienze premium.",
      getInTouch: "Contattami",
      cats: {
        nightlife: "Nightlife",
        events: "Eventi",
        fashion: "Moda",
        lifestyle: "Lifestyle",
        travel: "Viaggi",
        hospitality: "Ospitalità",
        creators: "Creatori",
        campaigns: "Campagne",
        nightlifeTitle: "Residenze nei Club",
        nightlifeDesc: "Residenze nei club, serate settimanali e booking esclusivi nei locali più magnetici d'Europa — da Milano a Ibiza.",
        eventsTitle: "Partnership per Eventi",
        eventsDesc: "Headline booking, palchi di festival, eventi privati. Creato per promotori e locali che richiedono un'energia indimenticabile.",
        fashionTitle: "Collab di Moda",
        fashionDesc: "Storytelling visivo all'intersezione tra cultura da club e alta moda. Campagne, editoriali, attivazioni di brand.",
        lifestyleTitle: "Brand Lifestyle",
        lifestyleDesc: "Contenuti sponsorizzati, product placement e storytelling lifestyle autentico per brand premium.",
        travelTitle: "Partnership di Viaggio",
        travelDesc: "Eventi in destinazioni di lusso, collab con brand di viaggio ed esperienze di marca nelle principali destinazioni europee.",
        hospitalityTitle: "Ospitalità & F&B",
        hospitalityDesc: "Collaborazioni con hotel e ristoranti, eventi sui rooftop, esperienze culinarie esclusive, partnership con locali premium.",
        creatorsTitle: "Sinergie tra Creatori",
        creatorsDesc: "Coproduzioni, direzione creativa e creazione di contenuti digitali con artisti del mondo della musica e delle arti visive.",
        campaignsTitle: "Campagne di Brand",
        campaignsDesc: "Programmi ambassador, partnership retribuite e alleanze creative a lungo termine con brand in linea con il suo mondo."
      }
    },
    footer: {
      tagline: "Energia Brasiliana · Nightlife Europea · Milano",
    },
  },
  es: {
    nav: {
      experience: "Experiencia",
      music: "Música",
      lifestyle: "Lifestyle",
      partnerships: "Alianzas",
      mediaKit: "Media Kit",
      booking: "Reservar",
    },
    hero: {
      subtitle: "¡BIENVENIDOS A MI MUNDO!",
      tag: "Música\u00a0\u00a0•\u00a0\u00a0Lifestyle\u00a0\u00a0•\u00a0\u00a0Cultura\u00a0\u00a0•\u00a0\u00a0Performance",
      booking: "Reservar",
      mediaKit: "Media Kit",
      watchLive: "Ver en Vivo",
    },
    moments: {
      label: "Energía Capturada",
      title: "MOMENTOS QUE MUEVEN",
      subtitle: "Energía brasileña. Nightlife europea. Presencia real.",
    },
    experience: {
      label: "Archivo Visual",
      title: "Experiencia en Vivo",
      categories: {
        all: "Todos",
      },
    },

    music: {
      label: "Últimos Lanzamientos",
      title: "Música",
    },

    lifestyle: {
      label: "El Mundo de Willian",
      title1: "Experiencia &",
      title2: "Estilo de Vida",
      stories: {
        s1: { title: "La Dolce Vita Notturna", desc: "Donde la moda se funde con la pista. Milán no duerme, se transforma. Cada rincón respira estilo, cada club respira vida.", cat: "Milán", hand: "Tutto è possibile." },
        s2: { title: "Presencia en el escenario", desc: "Cada set é um ritual. El público se vuelve uno. La música se vuelve fuego. Esto es lo que sucede cuando el calor brasileño se encuentra con el concreto europeo.", cat: "En Escenario" },
        s3: { title: "Donde dos mundos chocan", desc: "Nacido en Brasil. Construido en Europa. La energía del Carnaval se une a la precisión de Milán. El resultado es algo que el mundo nunca ha escuchado antes.", cat: "Brasil × Europa", hand: "Vem comigo." },
        s4: { title: "Estilo sin fronteras", desc: "La música es una experiencia visual. La estética es parte del arte: editorial, intencional, imposible de ignorar. La moda como lenguaje.", cat: "Moda" },
        s5: { title: "Amanecer en el paraíso", desc: "De Milán a Ibiza, el viaje nunca se detiene. Lugares premium, energía premium, audiencias premium. El mundo es el escenario.", cat: "Ibiza", hand: "O mundo é pequeno." },
        s6: { title: "Antes de la tormenta", desc: "La calma antes de que caiga el ritmo. Enfoque profundo. Auriculares puestos. El público está esperando. Este momento aquí lo es todo.", cat: "Backstage" },
      }
    },

    brand: {
      label: "La Esencia",
      title: "EXPERIENCIA",
      desc1: "Energía brasileña moldeada por la vida y la nightlife europea.",
      desc2: "Entre Milán, Roma y diferentes experiencias en Europa, mi objetivo es crear momentos que la gente realmente recuerde — a través de la música, la presencia, el movimiento y la conexión.",
      desc3: "Más que un set, es una atmósfera.\nMás que contenido, es personalidad.",
      cards: {
        musicTitle: "MÚSICA",
        musicText: "Más que un estilo, es una energía contagiosa.\n\nCada set está construido para crear una conexión real con el público a través del baile, la tensión, la emoción y la diversión, transformando la pista en una experiencia única e intensa.",
        contentTitle: "CONTENIDO",
        contentText: "Contenido centrado en estilo de vida, música, fitness, viajes y experiencias reales, siempre con una fuerte conexión orgánica con el público.",
        liveTitle: "PRESENCIA EN VIVO",
        liveText: "Presencia en eventos, clubes, experiencias privadas y colaboraciones creativas entre Brasil y Europa.",
        communityTitle: "COMUNIDAD",
        communityText: "Construyendo una audiencia a través de la autenticidad, la energía humana y las experiencias que generan una verdadera identificación."
      },
      quote1: "No solo creo contenido para ser visto.",
      quote2: "Creo una presencia imposible de ignorar."
    },
    media: {
      label: "Prensa y Medios",
      title: "Media Kit",
      subtitle: "Todo lo que necesitas para trabajar con Willian.",
      desc: "Disponible para bookings, campañas de marca, apariciones en medios y asociaciones creativas en todo el mundo.",
      instagramPeriod: "Instagram · Últimos 30 Días",
      stats: {
        views: "Vistas mensuales",
        followers: "Seguidores",
        interactions: "Interacciones / mes",
        growth: "Nuevos seguidores / mes",
        organic: "Audiencia Orgánica",
        based: "Basado en",
        milan: "Milán"
      },
      photos: {
        title: "Fotos de Prensa",
        p1: "En el Escenario · Energía",
        p2: "Retrato del Artista",
        p3: "DJ Booth · Roma",
        p4: "Foto Oficial"
      },
      downloads: {
        title: "Descargas",
        d1Title: "Press Kit Completo",
        d1Sub: "PDF · Biografía + Estadísticas + Fotos",
        d2Title: "Rider Técnico",
        d2Sub: "Requisitos técnicos para shows",
        d3Title: "Media Kit Instagram",
        d3Sub: "Engagement, demografía, tarifas",
        d4Title: "Perfil SoundCloud",
        d4Sub: "Últimos sets y pistas de estudio"
      }
    },
    live: {
      cats: {
        all: "Todos",
        onStage: "En el Escenario",
        backstage: "Entre Bastidores",
        milano: "Milán",
        lifestyle: "Estilo de Vida",
        travel: "Viajes",
        audience: "Público"
      },
      labels: {
        l1: "Energía · En Vivo",
        l2: "En el Escenario — Roma",
        l3: "La Vibe",
        l4: "Club Night · Milán",
        l5: "Detrás de los Platos",
        l6: "Modo Festival",
        l7: "Rendimiento",
        l8: "Enfoque",
        l9: "Noches Italianas",
        l10: "En la Carretera",
        l11: "Estética",
        l12: "La Multitud"
      }
    },
    contact: {
      label: "Contacto",
      title: "Contáctame",
      tagline: "¿Trabajamos juntos?",
      description: "Disponible para bookings, colaboraciones, alianzas de marca y proyectos creativos en todo el mundo.",
      bookingTitle: "Solicitud de Booking",
      bookingSubtitle: "Cuéntame sobre tu evento.",
      send: "Enviar Solicitud",
      form: {
        name: "Nombre",
        namePh: "Tu nombre",
        email: "Correo",
        emailPh: "tu@correo.com",
        event: "Evento / Venue",
        eventPh: "Nombre del evento y lugar",
        date: "Fecha",
        datePh: "Fecha preferida",
        message: "Mensaje",
        messagePh: "Cuéntanos sobre tu evento...",
      },
    },
    partnerships: {
      label: "Colabora",
      title: "Alianzas",
      subtitle: "Willian es más que un DJ.",
      desc: "Construyendo alianzas creativas premium en música, moda, vida nocturna y cultura. DJ, creador, entertainer, personalidad de estilo de vida.",
      enquire: "Consultar",
      cta: "Creemos Algo Excepcional",
      ctaDesc: "Asociaciones premium para experiencias premium.",
      getInTouch: "Ponerse en Contacto",
      cats: {
        nightlife: "Nightlife",
        events: "Eventos",
        fashion: "Moda",
        lifestyle: "Estilo de Vida",
        travel: "Viajes",
        hospitality: "Hospitalidad",
        creators: "Creadores",
        campaigns: "Campañas",
        nightlifeTitle: "Residencias en Clubes",
        nightlifeDesc: "Residencias, noches semanales y reservas exclusivas en los lugares más magnéticos de Europa — desde Milán hasta Ibiza.",
        eventsTitle: "Asociaciones de Eventos",
        eventsDesc: "Headline bookings, escenarios de festivales, eventos privados. Hecho para promotores y lugares que exigen energía inolvidable.",
        fashionTitle: "Colaboraciones de Moda",
        fashionDesc: "Narración visual en la intersección de la cultura de club y la alta costura. Campañas, editoriales, activaciones de marca.",
        lifestyleTitle: "Marcas Lifestyle",
        lifestyleDesc: "Contenido patrocinado, colocación de productos y narración auténtica de estilo de vida para marcas premium.",
        travelTitle: "Alianzas de Viaje",
        travelDesc: "Eventos en destinos de lujo, colaboraciones con marcas de viaje y experiencias exclusivas en los principales destinos europeos.",
        hospitalityTitle: "Hospitalidad y F&B",
        hospitalityDesc: "Colaboraciones con hoteles y restaurantes, eventos en rooftops, experiencias gastronómicas exclusivas, asociaciones con lugares premium.",
        creatorsTitle: "Sinergias de Creadores",
        creatorsDesc: "Coproducciones, dirección creativa y creación de contenido digital con artistas de la música y las artes visuales.",
        campaignsTitle: "Campañas de Marca",
        campaignsDesc: "Programas de embajadores, asociaciones pagadas y alianzas creativas a largo plazo con marcas que coinciden con su mundo."
      }
    },
    footer: {
      tagline: "Energía Brasileña · Nightlife Europea · Milán",
    },
  },
  fr: {
    nav: {
      experience: "Expérience",
      music: "Musique",
      lifestyle: "Lifestyle",
      partnerships: "Partenariats",
      mediaKit: "Media Kit",
      booking: "Réserver",
    },
    hero: {
      subtitle: "BIENVENUE DANS MON MONDE !",
      tag: "Musique\u00a0\u00a0•\u00a0\u00a0Lifestyle\u00a0\u00a0•\u00a0\u00a0Culture\u00a0\u00a0•\u00a0\u00a0Performance",
      booking: "Réserver",
      mediaKit: "Media Kit",
      watchLive: "Regarder en Direct",
    },
    moments: {
      label: "Énergie Capturée",
      title: "MOMENTS QUI BOUGENT",
      subtitle: "Énergie brésilienne. Nightlife européenne. Présence réelle.",
    },
    experience: {
      label: "Archive Visuelle",
      title: "Expérience Live",
      categories: {
        all: "Tous",
      },
    },

    music: {
      label: "Dernières Sorties",
      title: "Musique",
    },

    lifestyle: {
      label: "Le Monde de Willian",
      title1: "Expérience &",
      title2: "Lifestyle",
      stories: {
        s1: { title: "La Dolce Vita Notturna", desc: "Où la mode se fond dans la piste de danse. Milan ne dort pas — elle se transforme. Chaque coin respire le style, chaque club respire la vie.", cat: "Milan", hand: "Tutto è possibile." },
        s2: { title: "Présence Scénique", desc: "Chaque set est un rituel. La foule ne fait qu'un. La musique devient feu. C'est ce qui arrive quand la chaleur brésilienne rencontre le béton européen.", cat: "Sur Scène" },
        s3: { title: "Quand Deux Mondes se Rencontrent", desc: "Né au Brésil. Construit en Europe. L'énergie du Carnaval rencontre la précision de Milan. Le résultat est quelque chose que le monde n'a jamais entendu auparavant.", cat: "Brésil × Europe", hand: "Vem comigo." },
        s4: { title: "Style Sans Frontières", desc: "La musique est une expérience visuelle. L'esthétique fait partie de l'art — éditorial, intentionnel, impossible à ignorer. La mode comme langage.", cat: "Mode" },
        s5: { title: "Lever de Soleil au Paradis", desc: "De Milan à Ibiza — le voyage ne s'arrête jamais. Lieux premium, énergie premium, public premium. Le monde est la scène.", cat: "Ibiza", hand: "O mundo é pequeno." },
        s6: { title: "Avant la Tempête", desc: "Le calme avant que le beat ne tombe. Concentration profonde. Casque allumé. La foule attend. Ce moment précis — c'est tout.", cat: "Coulisses" },
      }
    },

    brand: {
      label: "L'Essence",
      title: "EXPÉRIENCE",
      desc1: "L'énergie brésilienne façonnée par la vie et la nightlife européenne.",
      desc2: "Entre Milan, Rome et différentes expériences à travers l'Europe, mon objectif est de créer des moments dont les gens se souviendront vraiment — grâce à la musique, la présence, le mouvement et la connexion.",
      desc3: "Plus qu'un set, c'est une atmosphère.\nPlus que du contenu, c'est de la personnalité.",
      cards: {
        musicTitle: "MUSIQUE",
        musicText: "Plus qu'un style, c'est une énergie contagieuse.\n\nChaque set est construit pour créer une véritable connexion avec le public à travers la danse, la tension, l'émotion et le plaisir, transformant la piste de danse en une expérience unique et intense.",
        contentTitle: "CONTENU",
        contentText: "Contenu axé sur le style de vie, la musique, le fitness, les voyages et les expériences réelles, toujours avec une forte connexion organique au public.",
        liveTitle: "PRÉSENCE LIVE",
        liveText: "Présence à des événements, des clubs, des expériences privées et des collaborations créatives à travers le Brésil et l'Europe.",
        communityTitle: "COMMUNAUTÉ",
        communityText: "Construire un public par l'authenticité, l'énergie humaine et des expériences qui génèrent une véritable identification."
      },
      quote1: "Je ne crée pas seulement du contenu pour être vu.",
      quote2: "Je crée une présence impossible à ignorer."
    },
    media: {
      label: "Presse et Médias",
      title: "Media Kit",
      subtitle: "Tout ce dont vous avez besoin pour travailler avec Willian.",
      desc: "Disponible pour des bookings dans le monde entier, des campagnes de marque, des apparitions dans les médias et des partenariats créatifs.",
      instagramPeriod: "Instagram · 30 Derniers Jours",
      stats: {
        views: "Vues mensuelles",
        followers: "Abonnés",
        interactions: "Interactions / mois",
        growth: "Nouveaux abonnés / mois",
        organic: "Audience Organique",
        based: "Basé à",
        milan: "Milan"
      },
      photos: {
        title: "Photos de Presse",
        p1: "Sur Scène · Énergie",
        p2: "Portrait de l'Artiste",
        p3: "DJ Booth · Rome",
        p4: "Photo Officielle"
      },
      downloads: {
        title: "Téléchargements",
        d1Title: "Kit de Presse Complet",
        d1Sub: "PDF · Biographie + Stats + Photos",
        d2Title: "Fiche Technique",
        d2Sub: "Exigences techniques pour les spectacles",
        d3Title: "Media Kit Instagram",
        d3Sub: "Engagement, démographie, tarifs",
        d4Title: "Profil SoundCloud",
        d4Sub: "Derniers sets et titres studio"
      }
    },
    live: {
      cats: {
        all: "Tous",
        onStage: "Sur Scène",
        backstage: "Coulisses",
        milano: "Milan",
        lifestyle: "Lifestyle",
        travel: "Voyages",
        audience: "Public"
      },
      labels: {
        l1: "Énergie · Live",
        l2: "Sur Scène — Rome",
        l3: "La Vibe",
        l4: "Club Night · Milan",
        l5: "Derrière les Platines",
        l6: "Mode Festival",
        l7: "Performance",
        l8: "Focus",
        l9: "Nuits Italiennes",
        l10: "Sur la Route",
        l11: "Esthétique",
        l12: "La Foule"
      }
    },
    contact: {
      label: "Contact",
      title: "Contactez-moi",
      tagline: "Travaillons ensemble ?",
      description: "Disponible pour des bookings, collaborations, partenariats de marque et projets créatifs dans le monde entier.",
      bookingTitle: "Demande de Booking",
      bookingSubtitle: "Parlez-moi de votre événement.",
      send: "Envoyer la Demande",
      form: {
        name: "Nom",
        namePh: "Votre nom",
        email: "Email",
        emailPh: "votre@email.com",
        event: "Événement / Venue",
        eventPh: "Nom de l'événement et lieu",
        date: "Date",
        datePh: "Date préférée",
        message: "Message",
        messagePh: "Parlez-nous de votre événement...",
      },
    },
    partnerships: {
      label: "Collaborer",
      title: "Partenariats",
      subtitle: "Willian est plus qu'un DJ.",
      desc: "Créer des alliances créatives premium à travers la musique, la mode, la vie nocturne et la culture. DJ, créateur, entertainer, personnalité lifestyle.",
      enquire: "Demander",
      cta: "Créons Quelque Chose d'Exceptionnel",
      ctaDesc: "Partenariats premium pour des expériences premium.",
      getInTouch: "Prendre Contact",
      cats: {
        nightlife: "Nightlife",
        events: "Événements",
        fashion: "Mode",
        lifestyle: "Lifestyle",
        travel: "Voyages",
        hospitality: "Hospitalité",
        creators: "Créateurs",
        campaigns: "Campagnes",
        nightlifeTitle: "Résidences en Club",
        nightlifeDesc: "Résidences, soirées hebdomadaires et bookings exclusifs dans les lieux les plus magnétiques d'Europe — de Milan à Ibiza.",
        eventsTitle: "Partenariats Événementiels",
        eventsDesc: "Headline bookings, scènes de festivals, événements privés. Conçu pour les promoteurs et les lieux qui exigent une énergie inoubliable.",
        fashionTitle: "Collabs Mode",
        fashionDesc: "Storytelling visuel à l'intersection de la culture club et de la haute couture. Campagnes, éditoriaux, activations de marque.",
        lifestyleTitle: "Marques Lifestyle",
        lifestyleDesc: "Contenu sponsorisé, placement de produits et storytelling lifestyle authentique pour des marques premium.",
        travelTitle: "Partenariats de Voyage",
        travelDesc: "Événements dans des destinations de luxe, collabs avec des marques de voyage et expériences exclusives dans les meilleures destinations européennes.",
        hospitalityTitle: "Hospitalité & F&B",
        hospitalityDesc: "Collaborations avec des hôtels et restaurants, événements sur les toits, expériences culinaires exclusives, partenariats avec des lieux premium.",
        creatorsTitle: "Synergies de Créateurs",
        creatorsDesc: "Coproductions, direction créative et création de contenu numérique avec des artistes de la musique et des arts visuels.",
        campaignsTitle: "Campagnes de Marque",
        campaignsDesc: "Programmes d'ambassadeurs, partenariats rémunérés et alliances créatives à long terme avec des marques qui correspondent à son univers."
      }
    },
    footer: {
      tagline: "Énergie Brésilienne · Nightlife Européenne · Milan",
    },
  },
};