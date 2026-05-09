const fs = require('fs');
const path = './src/app/context/LanguageContext.tsx';
let content = fs.readFileSync(path, 'utf8');

const partnerEn = `
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
    },`;

const partnerPt = `
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
    },`;

const partnerIt = `
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
        nightlifeTitle: "Residenze nei Club",
        nightlifeDesc: "Residenze nei club, serate settimanali e booking esclusivi nei locali più magnetici d'Europa — da Milano a Ibiza.",
        eventsTitle: "Partnership per Eventi",
        eventsDesc: "Headline booking, palchi di festival, eventi privati. Creato per promotori e locali che richiedono un'energia indimenticabile.",
        fashionTitle: "Collab di Moda",
        fashionDesc: "Storytelling visivo all'intersezione tra cultura da club e alta moda. Campagne, editoriali, attivazioni di brand.",
        lifestyleTitle: "Brand Lifestyle",
        lifestyleDesc: "Contenuti sponsorizzati, product placement e storytelling lifestyle autentico per brand premium.",
        travelTitle: "Partnership di Viaggio",
        travelDesc: "Eventos in destinazioni di lusso, collab con brand di viaggio ed esperienze di marca nelle principali destinazioni europee.",
        hospitalityTitle: "Ospitalità & F&B",
        hospitalityDesc: "Collaborazioni con hotel e ristoranti, eventi sui rooftop, esperienze culinarie esclusive, partnership con locali premium.",
        creatorsTitle: "Sinergie tra Creatori",
        creatorsDesc: "Coproduzioni, direzione creativa e creazione di contenuti digitali con artisti del mondo della musica e delle arti visive.",
        campaignsTitle: "Campagne di Brand",
        campaignsDesc: "Programmi ambassador, partnership retribuite e alleanze creative a lungo termine con brand in linea con il suo mondo."
      }
    },`;

const partnerEs = `
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
    },`;

const partnerFr = `
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
    },`;

content = content.replace(/    contact: \{/g, (match, offset, string) => {
  const segment = string.substring(Math.max(0, offset - 400), offset);
  
  if (segment.includes('en: {') || segment.includes('"The Essence"')) return partnerEn + '\n    contact: {';
  if (segment.includes('pt: {') || segment.includes('"A Essência"')) return partnerPt + '\n    contact: {';
  if (segment.includes('it: {') || segment.includes('"L\\'Essenza"')) return partnerIt + '\n    contact: {';
  if (segment.includes('es: {') || segment.includes('"La Esencia"')) return partnerEs + '\n    contact: {';
  if (segment.includes('fr: {') || segment.includes('"L\\'Essence"')) return partnerFr + '\n    contact: {';
  
  return match;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Language context updated for partnerships successfully.');
