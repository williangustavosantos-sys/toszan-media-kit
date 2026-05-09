const fs = require('fs');
let content = fs.readFileSync('src/app/context/LanguageContext.tsx', 'utf8');

const enBlock = `    brand: {
      label: "The Essence",
      title: "EXPERIENCE",
      desc1: "Brazilian energy shaped by life and European nightlife.",
      desc2: "Between Milan, Rome and different experiences across Europe, my goal is to create moments that people truly remember — through music, presence, movement and connection.",
      desc3: "More than a set, it's an atmosphere.\\nMore than content, it's personality.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "More than a style, it's a contagious energy.\\n\\nEvery set is built to create real connection with the audience through dance, tension, emotion and fun, transforming the dance floor into a unique and intense experience.",
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
    },`;

const ptBlock = `    brand: {
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
        liveText: "Presença em eventos, clubes, experiências privadas e colaborações criativas entre Brasil e Europa.",
        communityTitle: "COMMUNITY",
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
    },`;

const frBlock = `    brand: {
      label: "L'Essence",
      title: "EXPERIENCE",
      desc1: "L'énergie brésilienne façonnée par la vie et la nightlife européenne.",
      desc2: "Entre Milan, Rome et différentes expériences à travers l'Europe, mon objectif est de créer des moments dont les gens se souviendront vraiment — grâce à la musique, la présence, le mouvement et la connexion.",
      desc3: "Plus qu'un set, c'est une atmosphère.\\nPlus que du contenu, c'est de la personnalité.",
      cards: {
        musicTitle: "MUSIC",
        musicText: "Plus qu'un style, c'est une énergie contagieuse.\\n\\nChaque set est construit pour créer une véritable connexion avec le public à travers la danse, la tension, l'émotion et le plaisir, transformant la piste de danse en une expérience unique et intense.",
        contentTitle: "CONTENT",
        contentText: "Contenu axé sur le style de vie, la musique, le fitness, les voyages et les expériences réelles, toujours avec une forte connexion organique au public.",
        liveTitle: "LIVE PRESENCE",
        liveText: "Présence à des événements, des clubs, des expériences privées et des collaborations créatives à travers le Brésil et l'Europe.",
        communityTitle: "COMMUNITY",
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
    },`;

function replaceLanguageBlock(content, lang, newBlock) {
  const regex = new RegExp(`(${lang}: \\{[\\s\\S]*?)(    brand: \\{[\\s\\S]*?    downloads: \\{[\\s\\S]*?\\n      \\}\\n    \\},)`, 'g');
  return content.replace(regex, `$1${newBlock}`);
}

content = replaceLanguageBlock(content, 'en', enBlock);
content = replaceLanguageBlock(content, 'pt', ptBlock);
content = replaceLanguageBlock(content, 'fr', frBlock);

fs.writeFileSync('src/app/context/LanguageContext.tsx', content);
console.log('Language fixes done.');
