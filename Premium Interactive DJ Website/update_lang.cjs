const fs = require('fs');
const path = './src/app/context/LanguageContext.tsx';
let content = fs.readFileSync(path, 'utf8');

const brandAndMediaEn = `
    brand: {
      label: "The Essence",
      title: "EXPERIENCE",
      desc1: "Brazilian energy shaped by life and European nightlife.",
      desc2: "Between Milan, Rome and different experiences across Europe, my focus is to create moments that people actually remember — through music, presence, movement and connection.",
      desc3: "More than a set, it's an atmosphere.\\nMore than content, it's personality.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "More than a style, it's a contagious energy.\\n\\nEvery set is built to create real connection with the audience through dance, tension, emotion and fun, turning the dancefloor into a unique and intense experience.",
        contentTitle: "CONTENT",
        contentText: "Content focused on lifestyle, music, fitness, travel and real experiences, always with a strong organic connection to the audience.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Presence at events, clubs, private experiences and creative collaborations between Brazil and Europe.",
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
      desc: "Available for bookings, brand campaigns, media appearances and creative partnerships worldwide.",
      stats: {
        views: "Monthly Views",
        followers: "Followers",
        interactions: "Interactions / month",
        growth: "Monthly Growth",
        organic: "Organic Audience",
        based: "Based In",
        milan: "Milan"
      },
      photos: {
        title: "Press Photos",
        p1: "On Stage · Fire",
        p2: "Artist Portrait",
        p3: "DJ Booth · Rome",
        p4: "Media Shot"
      },
      downloads: {
        title: "Downloads",
        d1Title: "Full Press Kit",
        d1Sub: "PDF · Biography + Stats + Photos",
        d2Title: "Artist Rider",
        d2Sub: "Technical requirements for bookings",
        d3Title: "Instagram Media Kit",
        d3Sub: "Engagement, demographics, rates",
        d4Title: "SoundCloud Profile",
        d4Sub: "Latest sets and studio tracks"
      }
    },
    live: {
      cats: {
        all: "All",
        onStage: "On Stage",
        backstage: "Backstage",
        milano: "Milano",
        lifestyle: "Lifestyle",
        travel: "Travel",
        audience: "Audience"
      },
      labels: {
        l1: "Energy · Live",
        l2: "On Stage — Rome",
        l3: "The Vibe",
        l4: "Club Night · Milan",
        l5: "Behind the Decks",
        l6: "Festival Mode",
        l7: "Performance",
        l8: "Focus",
        l9: "Italian Nights",
        l10: "On The Road",
        l11: "Aesthetic",
        l12: "The Crowd"
      }
    },`;

const brandAndMediaPt = `
    brand: {
      label: "A Essência",
      title: "EXPERIENCE",
      desc1: "Energia brasileira moldada pela vida e pela nightlife europeia.",
      desc2: "Entre Milão, Roma e diferentes experiências na Europa, meu foco é criar momentos que as pessoas realmente lembram — através da música, presença, movimento e conexão.",
      desc3: "Mais do que um set, é atmosfera.\\nMais do que conteúdo, é personalidade.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "Mais do que um estilo, é uma energia contagiante.\\n\\nCada set é construído para criar conexão real com o público através da dança, tensão, emoção e diversão, transformando a pista em uma experiência única e intensa.",
        contentTitle: "CONTENT",
        contentText: "Conteúdo voltado para lifestyle, música, fitness, viagens e experiências reais, sempre com forte conexão orgânica com o público.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Presença em eventos, clubs, experiências privadas e colaborações criativas entre Brasil e Europa.",
        communityTitle: "COMMUNITY",
        communityText: "Construindo uma audiência através de autenticidade, energia humana e experiências que geram identificação verdadeira."
      },
      quote1: "Eu não crio conteúdo apenas para ser visto.",
      quote2: "Eu crio presença impossível de ignorar."
    },
    media: {
      label: "Imprensa e Mídia",
      title: "Media Kit",
      subtitle: "Tudo o que você precisa para trabalhar com Willian.",
      desc: "Disponível para bookings, campanhas de marca, aparições na mídia e parcerias criativas em todo o mundo.",
      stats: {
        views: "Visualizações mensais",
        followers: "Seguidores",
        interactions: "Interações / mês",
        growth: "Novos seguidores / mês",
        organic: "Audiência Orgânica",
        based: "Baseado na",
        milan: "Europa"
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
        d3Sub: "Engajamento, demografia, valores",
        d4Title: "Perfil SoundCloud",
        d4Sub: "Últimos sets e faixas de estúdio"
      }
    },
    live: {
      cats: {
        all: "Todos",
        onStage: "No Palco",
        backstage: "Bastidores",
        milano: "Milão",
        lifestyle: "Lifestyle",
        travel: "Viagens",
        audience: "Público"
      },
      labels: {
        l1: "Energia · Ao Vivo",
        l2: "No Palco — Roma",
        l3: "A Vibe",
        l4: "Club Night · Milão",
        l5: "Atrás das Pickups",
        l6: "Modo Festival",
        l7: "Performance",
        l8: "Foco",
        l9: "Noites Italianas",
        l10: "Na Estrada",
        l11: "Estética",
        l12: "A Multidão"
      }
    },`;

const brandAndMediaIt = `
    brand: {
      label: "L'Essenza",
      title: "EXPERIENCE",
      desc1: "Energia brasiliana plasmata dalla vita e dalla nightlife europea.",
      desc2: "Tra Milano, Roma e diverse esperienze in Europa, il mio obiettivo è creare momenti che le persone ricordino davvero — attraverso la musica, la presenza, il movimento e la connessione.",
      desc3: "Più che un set, è un'atmosfera.\\nPiù che contenuti, è personalità.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "Più di uno stile, è un'energia contagiosa.\\n\\nOgni set è costruito per creare una vera connessione con il pubblico attraverso il ballo, la tensione, l'emozione e il divertimento, trasformando la pista in un'esperienza unica e intensa.",
        contentTitle: "CONTENT",
        contentText: "Contenuti incentrati su lifestyle, musica, fitness, viaggi ed esperienze reali, sempre con una forte connessione organica con il pubblico.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Presenza ad eventi, club, esperienze private e collaborazioni creative tra Brasile ed Europa.",
        communityTitle: "COMMUNITY",
        communityText: "Costruire un pubblico attraverso l'autenticità, l'energia umana e le esperienze che generano una vera identificazione."
      },
      quote1: "Non creo contenuti solo per essere visti.",
      quote2: "Creo una presenza impossibile da ignorare."
    },
    media: {
      label: "Stampa & Media",
      title: "Media Kit",
      subtitle: "Tutto ciò di cui hai bisogno per lavorare con Willian.",
      desc: "Disponibile per booking, campagne di brand, apparizioni sui media e partnership creative in tutto il mondo.",
      stats: {
        views: "Visualizzazioni / mese",
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
        d2Title: "Artist Rider",
        d2Sub: "Requisiti tecnici per gli spettacoli",
        d3Title: "Media Kit Instagram",
        d3Sub: "Engagement, demografia, tariffe",
        d4Title: "Profilo SoundCloud",
        d4Sub: "Ultimi set e tracce in studio"
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
        l1: "Energia · Live",
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
    },`;

const brandAndMediaEs = `
    brand: {
      label: "La Esencia",
      title: "EXPERIENCE",
      desc1: "Energía brasileña moldeada por la vida y la nightlife europea.",
      desc2: "Entre Milán, Roma y diferentes experiencias en Europa, mi objetivo es crear momentos que la gente realmente recuerde — a través de la música, la presencia, el movimiento y la conexión.",
      desc3: "Más que un set, es una atmósfera.\\nMás que contenido, es personalidad.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "Más que un estilo, es una energía contagiosa.\\n\\nCada set está construido para crear una conexión real con el público a través del baile, la tensión, la emoción y la diversión, transformando la pista en una experiencia única e intensa.",
        contentTitle: "CONTENT",
        contentText: "Contenido centrado en estilo de vida, música, fitness, viajes y experiencias reales, siempre con una fuerte conexión orgánica con el público.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Presencia en eventos, clubes, experiencias privadas y colaboraciones creativas entre Brasil y Europa.",
        communityTitle: "COMMUNITY",
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
    },`;

const brandAndMediaFr = `
    brand: {
      label: "L'Essence",
      title: "EXPERIENCE",
      desc1: "L'énergie brésilienne façonnée par la vie et la nightlife européenne.",
      desc2: "Entre Milan, Rome et différentes expériences à travers l'Europe, mon objectif est de créer des moments dont les gens se souviennent vraiment — à travers la musique, la présence, le mouvement et la connexion.",
      desc3: "Plus qu'un set, c'est une atmosphère.\\nPlus que du contenu, c'est une personnalité.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "Plus qu'un style, c'est une énergie contagieuse.\\n\\nChaque set est construit pour créer une véritable connexion avec le public à travers la danse, la tension, l'émotion et le plaisir, transformant la piste en une expérience unique et intense.",
        contentTitle: "CONTENT",
        contentText: "Contenu axé sur le lifestyle, la musique, le fitness, les voyages et les expériences réelles, toujours avec une forte connexion organique au public.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Présence lors d'événements, clubs, expériences privées et collaborations créatives entre le Brésil et l'Europe.",
        communityTitle: "COMMUNITY",
        communityText: "Construire un public grâce à l'authenticité, à l'énergie humaine et aux expériences qui génèrent une véritable identification."
      },
      quote1: "Je ne crée pas seulement du contenu pour être vu.",
      quote2: "Je crée une présence impossible à ignorer."
    },
    media: {
      label: "Presse & Médias",
      title: "Media Kit",
      subtitle: "Tout ce dont vous avez besoin pour travailler avec Willian.",
      desc: "Disponible pour des bookings, des campagnes de marque, des apparitions dans les médias et des partenariats créatifs dans le monde entier.",
      stats: {
        views: "Vues mensuelles",
        followers: "Abonnés",
        interactions: "Interactions / mois",
        growth: "Croissance / mois",
        organic: "Audience Organique",
        based: "Basé à",
        milan: "Milan"
      },
      photos: {
        title: "Photos de Presse",
        p1: "Sur Scène · Énergie",
        p2: "Portrait d'Artiste",
        p3: "DJ Booth · Rome",
        p4: "Photo Officielle"
      },
      downloads: {
        title: "Téléchargements",
        d1Title: "Press Kit Complet",
        d1Sub: "PDF · Biographie + Stats + Photos",
        d2Title: "Fiche Technique",
        d2Sub: "Exigences techniques pour les spectacles",
        d3Title: "Media Kit Instagram",
        d3Sub: "Engagement, démographie, tarifs",
        d4Title: "Profil SoundCloud",
        d4Sub: "Derniers sets et morceaux studio"
      }
    },
    live: {
      cats: {
        all: "Tous",
        onStage: "Sur Scène",
        backstage: "Coulisses",
        milano: "Milan",
        lifestyle: "Style de Vie",
        travel: "Voyage",
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
    },`;

content = content.replace(/    contact: \{/g, (match, offset, string) => {
  const isEn = string.substring(offset - 150, offset).includes('en: {');
  const isPt = string.substring(offset - 150, offset).includes('pt: {');
  const isIt = string.substring(offset - 150, offset).includes('it: {');
  const isEs = string.substring(offset - 150, offset).includes('es: {');
  const isFr = string.substring(offset - 150, offset).includes('fr: {');
  
  if (isEn) return brandAndMediaEn + '\n    contact: {';
  if (isPt) return brandAndMediaPt + '\n    contact: {';
  if (isIt) return brandAndMediaIt + '\n    contact: {';
  if (isEs) return brandAndMediaEs + '\n    contact: {';
  if (isFr) return brandAndMediaFr + '\n    contact: {';
  return match;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Language context updated successfully.');
