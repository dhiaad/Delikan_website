export const CABINET = {
  name: 'DELIKAN',
  doctor: 'Dr Ibrahim Delikan',
  title: 'Chirurgien-dentiste',
  diploma: 'D.U. Implantologie orale (Lyon) · C.E.S. Parodontologie (Nantes)',
  rpps: '10108619593',
  annuaire: 'https://www.sante.fr/chirurgie-dentaire/saint-esteve/dr-delikan-ibrahim',
  street: '9 rue de l’Industrie',
  city: '66240 Saint-Estève',
  phone: '04 48 22 14 24',
  phoneHref: 'tel:+33448221424',
  doctolib: 'https://www.doctolib.fr/dentiste/saint-esteve/ibrahim-delikan',
  maps: 'https://www.google.com/maps/place/Dr.+Delikan+Ibrahim+-+Chirurgien+Dentiste/@42.7161408,2.8527608,17z',
  mapsEmbed: 'https://www.google.com/maps?q=42.7161369,2.8553357&z=16&output=embed',
}

// Le site est découpé en pages courtes, dans l'ordre du parcours d'un patient. Chaque page liste ses sections.
// `bar` : libellé dans la barre du haut. L'accueil reste accessible par le logo.
export const PAGES = [
  {
    id: 'accueil',
    label: 'Accueil',
    desc: 'Le cabinet en un coup d’œil',
    sections: ['bienvenue', 'explorer'],
  },
  {
    id: 'cabinet',
    label: 'Le cabinet',
    bar: 'Le cabinet',
    desc: 'Les lieux, nos engagements, votre première visite',
    title: 'Votre cabinet',
    em: 'à Saint-Estève.',
    lead: 'Deux salles de soins, une radio 3D et une caméra d’empreinte numérique sur place, et une équipe qui prend le temps de vous recevoir et de vous expliquer.',
    sections: ['visite', 'engagements', 'etapes'],
  },
  {
    id: 'soins',
    label: 'Les soins',
    bar: 'Soins',
    desc: 'Implants, chirurgie et soins de la famille',
    title: 'Les soins',
    em: 'au cabinet.',
    lead: 'L’implantologie et la chirurgie orale au cœur de la pratique, et tous les soins du quotidien autour.',
    sections: ['soins'],
  },
  {
    id: 'implantologie',
    label: 'Implantologie',
    bar: 'Implantologie',
    desc: 'Le traitement implantaire, pas à pas',
    title: 'Implantologie',
    em: '& chirurgie.',
    lead: 'Remplacer une ou plusieurs dents par des implants, de l’étude du cas jusqu’au suivi, chirurgie comprise.',
    sections: ['implants'],
  },
  {
    id: 'docteur',
    label: 'Dr Delikan',
    bar: 'Dr Delikan',
    desc: 'Parcours, formation et approche',
    title: 'Dr Ibrahim Delikan,',
    em: 'chirurgien-dentiste.',
    lead: 'Bac +12, quatre diplômes universitaires en implantologie et en parodontologie, vingt ans de formation de Créteil à Nantes puis à Lyon.',
    sections: ['docteur'],
  },
  {
    id: 'contact',
    label: 'Contact',
    bar: 'Contact',
    desc: 'Horaires, plan d’accès, questions fréquentes',
    title: 'Contact',
    em: '& accès.',
    lead: 'Prendre rendez-vous, venir au cabinet, et trouver les réponses aux questions les plus fréquentes.',
    sections: ['infos', 'faq'],
  },
]

export const SECTIONS = [
  { id: 'bienvenue', label: 'Bienvenue', desc: 'Notre approche du soin' },
  { id: 'explorer', label: 'Explorer', desc: 'Les pages du site' },
  { id: 'visite', label: 'Visite du cabinet', desc: 'Accueil, salles de soins, radio 3D en images' },
  { id: 'engagements', label: 'Nos engagements', desc: 'Hygiène, transparence, suivi dans la durée' },
  { id: 'etapes', label: 'Votre première visite', desc: 'Du rendez-vous au plan de traitement' },
  { id: 'soins', label: 'Les soins', desc: 'Implants, chirurgie et soins' },
  { id: 'implants', label: 'Le traitement', desc: 'Avantages et étapes' },
  { id: 'docteur', label: 'Le praticien', desc: 'Parcours et formation' },
  { id: 'infos', label: 'Nous trouver', desc: 'Horaires, plan d’accès, téléphone' },
  { id: 'faq', label: 'Questions fréquentes', desc: 'Remboursements, urgences, implants' },
]

export const pageOf = (sectionId) => PAGES.find((p) => p.sections.includes(sectionId)) || PAGES[0]

// Index affiché dans les étiquettes de section (« 02 — Engagements »), relatif à sa page.
export const sectionIndex = (id) => String(pageOf(id).sections.indexOf(id) + 1).padStart(2, '0')

// Photos à prendre. Tant que `ready` est faux, le site affiche un cadre avec la consigne à la place.
// Pour mettre une photo en place : déposer `public/media/<nom>.jpg`, lancer `node scripts/optimize-images.mjs`,
// puis passer `ready: true`.
export const PHOTOS = {
  portrait: {
    title: 'Portrait officiel du Dr Delikan',
    format: 'Vertical 4:5',
    brief:
      'Le Dr Delikan en costume sombre, chemise claire, debout et bras croisés ou mains jointes, cadré à mi-cuisses. Regard assuré vers l’objectif, fond sobre (mur clair du cabinet ou fond studio), lumière douce sur le côté.',
    tips: ['Photographe conseillé', 'Costume ajusté, sans cravate voyante', 'Pas de flash direct'],
  },
  hero: {
    title: 'Le praticien au travail',
    format: 'Horizontal 16:9',
    brief:
      'Le Dr Delikan au fauteuil avec son assistante, en plein soin. Le patient est vu de dos ou de profil, sans visage reconnaissable. Toute la salle est éclairée.',
    tips: ['Un membre de l’équipe peut jouer le patient', 'Plan large, à hauteur d’yeux', 'Aucun écran ni dossier lisible'],
  },
  entree: {
    title: 'L’entrée du cabinet',
    format: 'Vertical 4:5',
    brief:
      'La façade et la porte d’entrée en plein jour, avec la plaque lisible et les arbres. Prise du trottoir d’en face, le matin, quand le soleil éclaire la façade.',
    tips: ['Aucune voiture devant', 'Ciel dégagé', 'Téléphone bien droit'],
  },
  accueil: {
    title: 'L’accueil',
    format: 'Vertical 4:5',
    brief: 'Le comptoir d’accueil, rangé, avec si possible la secrétaire souriante derrière.',
    tips: ['Ranger papiers et câbles', 'Lumières allumées'],
  },
  attente: {
    title: 'La salle d’attente',
    format: 'Vertical 4:5',
    brief: 'La salle d’attente vide et lumineuse, prise depuis un angle de la pièce pour montrer l’espace.',
    tips: ['Coussins et magazines bien rangés', 'Lumière du jour'],
  },
  'soins-2': {
    title: 'La salle de soins',
    format: 'Vertical 4:5',
    brief: 'Le fauteuil principal en position d’accueil, plateau propre, scialytique éteint, vu de trois quarts.',
    tips: ['Plans de travail dégagés', 'Pas d’instruments visibles'],
  },
  'soins-1': {
    title: 'La seconde salle de soins',
    format: 'Vertical 4:5',
    brief: 'Le second fauteuil, dans le même cadrage que la première salle pour que les deux photos se répondent.',
    tips: ['Même heure et même lumière que la photo précédente'],
  },
  radio: {
    title: 'La radio 3D',
    format: 'Vertical 4:5',
    brief: 'L’appareil de radiographie 3D en entier, porte ouverte, pièce bien éclairée. Si possible, l’écran affiche une image 3D anonyme.',
    tips: ['Reculer au maximum', 'Aucun écran patient visible'],
  },
}

// Le praticien. Bio rédigée à partir des diplômes connus : à faire relire par le Dr Delikan.
export const DOCTOR = {
  chiffres: [
    { n: 'Bac +12', t: 'années d’études supérieures' },
    { n: '4', t: 'diplômes universitaires en implantologie et parodontologie' },
    { n: '20', t: 'ans de formation continue, de 2003 à 2023' },
    { n: '3', t: 'universités : Créteil, Nantes et Lyon' },
  ],
  intro:
    'L’implantologie et la chirurgie orale sont au cœur de sa pratique. Formé à l’implantologie chirurgicale dès 2003, le Dr Ibrahim Delikan n’a jamais cessé de se perfectionner : quatre diplômes universitaires en vingt ans, de Créteil à Nantes puis à Lyon.',
  approche:
    'Au cabinet de Saint-Estève, il réalise lui-même chaque étape, de la chirurgie à la pose de la dent définitive, et soigne aussi toute la famille au quotidien. Sa règle : expliquer avant d’agir, proposer plusieurs options quand elles existent, et ne jamais presser une décision.',
  domaines: [
    { title: 'Implantologie', text: 'Le cœur de sa pratique : trois diplômes universitaires, de la dent unitaire à l’arcade complète.' },
    { title: 'Chirurgie orale', text: 'Extractions complexes, dents de sagesse, greffes osseuses et comblements de sinus.' },
    { title: 'Parodontologie', text: 'C.E.S. de l’université de Nantes : gencives, déchaussement, maintenance.' },
    { title: 'Soins de toute la famille', text: 'Prévention, soins courants, prothèses et blanchiment.' },
  ],
}

// Formations universitaires du Dr Delikan (liste fournie par le cabinet), de la plus récente à la plus ancienne.
export const FORMATIONS = [
  { year: '2023', title: 'D.U. Implantologie orale', school: 'Faculté de médecine de Lyon' },
  {
    year: '2021',
    title: 'D.U. Clinique d’Implantologie et de Parodontologie (DUCIP)',
    school: 'Faculté de chirurgie dentaire de Lyon',
  },
  { year: '2019', title: 'C.E.S. Parodontologie', school: 'Faculté de chirurgie dentaire de Nantes' },
  {
    year: '2003',
    title: 'D.U. Implantologie chirurgicale orale et maxillo-faciale',
    school: 'Faculté de médecine de Créteil',
  },
]

// Qualifications vérifiables (annuaire santé.fr, Assurance Maladie).
export const QUALIFS = [
  {
    key: 'ordre',
    sigle: 'CD',
    title: 'Chirurgien-dentiste inscrit à l’Ordre',
    org: 'RPPS n° 10108619593',
    link: { href: 'https://www.sante.fr/chirurgie-dentaire/saint-esteve/dr-delikan-ibrahim', label: 'Vérifier sur santé.fr' },
  },
  {
    key: 'conv',
    sigle: 'AM',
    title: 'Cabinet conventionné',
    org: 'Assurance Maladie',
  },
]

// Horaires issus de l'annuaire public (Askara) : à faire valider par le cabinet.
export const HOURS = [
  { day: 'Lundi', time: '8h30 – 13h00' },
  { day: 'Mardi', time: '8h30 – 13h00' },
  { day: 'Mercredi', time: '8h30 – 13h00' },
  { day: 'Jeudi', time: '8h30 – 13h00' },
  { day: 'Vendredi', time: '8h30 – 13h00' },
  { day: 'Samedi', time: 'Fermé' },
  { day: 'Dimanche', time: 'Fermé' },
]

// L'implantologie et la chirurgie orale sont le cœur de la pratique : elles ouvrent la liste.
export const SOINS = [
  {
    title: 'Implantologie',
    text: 'Le cœur de la pratique du Dr Delikan, titulaire de trois diplômes universitaires en implantologie. Remplacer une ou plusieurs dents manquantes par des implants, avec un plan de traitement clair et personnalisé.',
    tag: 'Cœur de pratique',
    points: [
      'Remplacement d’une dent, de plusieurs dents ou de toute une arcade',
      'Étude du volume osseux en 3D, grâce à la radio 3D du cabinet',
      'Pose de l’implant au cabinet, sous anesthésie locale',
      'Couronne ou bridge fixé sur implants : une dent fixe, sans toucher aux dents voisines',
    ],
  },
  {
    title: 'Chirurgie orale',
    text: 'Extractions, dents de sagesse et interventions chirurgicales réalisées au cabinet, sous anesthésie locale, avec des consignes claires avant et après.',
    tag: 'Cœur de pratique',
    points: [
      'Extractions simples et complexes',
      'Dents de sagesse, y compris incluses',
      'Dégagement de dents retenues dans l’os',
      'Consignes écrites et suivi après l’intervention',
    ],
  },
  {
    title: 'Greffe osseuse et sinus',
    text: 'Quand l’os manque pour poser un implant, il peut être reconstruit. Ces interventions préparent un terrain solide et durable.',
    tag: 'Chirurgie',
    points: [
      'Greffe et comblement osseux',
      'Comblement de sinus (sinus lift)',
      'Préservation de l’os au moment d’une extraction',
      'Choix de la technique d’après l’examen en 3D',
    ],
  },
  {
    title: 'Parodontologie',
    text: 'Traiter les gencives et l’os qui soutiennent les dents. Des gencives qui saignent ou des dents qui se déchaussent sont des signaux à ne pas laisser de côté. Le Dr Delikan est titulaire d’un C.E.S. de parodontologie.',
    points: [
      'Bilan parodontal complet : mesure des poches, radiographies',
      'Détartrage approfondi et surfaçage des racines',
      'Chirurgie parodontale lorsque c’est nécessaire',
      'Maintenance régulière pour stabiliser les résultats',
    ],
  },
  {
    title: 'Prothèses',
    text: 'Couronnes, bridges et prothèses pour retrouver confort de mastication et sourire, sur dents naturelles ou sur implants. Un devis détaillé vous est remis avant tout traitement.',
    points: [
      'Empreintes numériques à la caméra intra-orale, sans pâte',
      'Couronnes et bridges sur implants',
      'Prothèses amovibles stabilisées sur implants',
      'Couronnes céramiques, inlays et onlays sur dents naturelles',
      'Prothèses amovibles partielles ou complètes',
      'Solutions du panier « 100 % Santé » quand elles sont adaptées',
    ],
  },
  {
    title: 'Suivi des implants',
    text: 'Un implant se soigne comme une dent naturelle. Des contrôles réguliers permettent de le garder en bonne santé sur la durée.',
    points: [
      'Contrôle clinique et radiographique',
      'Nettoyage professionnel autour des implants',
      'Prévention et traitement de la péri-implantite',
    ],
  },
  {
    title: 'Soins conservateurs',
    text: 'Caries, dévitalisations, reconstitutions : préserver vos dents naturelles reste toujours la priorité.',
    points: [
      'Traitement des caries avec des matériaux couleur dent',
      'Traitement de racine (dévitalisation)',
      'Reconstitution des dents fragilisées',
      'Prise en charge des douleurs dentaires',
    ],
  },
  {
    title: 'Blanchiment',
    text: 'Éclaircir la teinte de vos dents en toute sécurité, après un bilan de santé des dents et des gencives.',
    points: ['Bilan préalable et choix de la méthode', 'Blanchiment encadré par le praticien', 'Conseils pour garder le résultat'],
  },
  {
    title: 'Prévention & détartrage',
    text: 'Bilans réguliers, détartrage et conseils d’hygiène pour garder des dents saines longtemps.',
    points: [
      'Contrôle et détartrage conseillés une fois par an',
      'Conseils de brossage adaptés à chacun',
      'Examens de prévention M’T dents pour les enfants et les jeunes',
    ],
  },
]

// Mise en avant : le traitement implantaire, du bilan au suivi.
export const FOCUS = {
  avantages: [
    { title: 'Des dents fixes', text: 'Fini la prothèse qui bouge : on mange, on parle et on sourit sans y penser.' },
    { title: 'Les dents voisines préservées', text: 'Contrairement à un bridge classique, il n’est pas nécessaire de tailler les dents saines.' },
    { title: 'L’os entretenu', text: 'L’implant sollicite l’os de la mâchoire, qui se résorbe moins qu’en l’absence de dent.' },
    { title: 'Un résultat naturel', text: 'La couronne est réalisée sur mesure, dans la teinte de vos dents.' },
  ],
  etapes: [
    { title: 'Consultation et bilan', text: 'Examen, puis radio 3D au cabinet pour mesurer précisément l’os disponible.' },
    { title: 'Plan de traitement et devis', text: 'Les options vous sont expliquées, avec un devis détaillé avant toute décision.' },
    { title: 'Pose de l’implant', text: 'Sous anesthésie locale, au cabinet. Une dent provisoire peut être prévue.' },
    { title: 'Cicatrisation', text: 'L’implant se lie à l’os pendant quelques mois, selon les situations.' },
    { title: 'Dent définitive', text: 'La couronne ou le bridge est fixé sur l’implant.' },
    { title: 'Suivi', text: 'Des contrôles réguliers pour garder l’implant en bonne santé.' },
  ],
}

// Ce sur quoi le cabinet s'engage au quotidien.
export const ENGAGEMENTS = [
  {
    title: 'Hygiène et stérilisation',
    text: 'Instruments stérilisés et tracés, matériel à usage unique dès que possible : le protocole est le même pour chaque patient.',
  },
  {
    title: 'Équipement de pointe',
    text: 'Radio 3D et caméra d’empreinte numérique au cabinet : un diagnostic précis dès la première consultation, et des empreintes sans pâte.',
  },
  {
    title: 'Des devis clairs',
    text: 'Cabinet conventionné : chaque traitement est expliqué et chiffré avant de commencer, avec la part remboursée.',
  },
  {
    title: 'Le temps d’expliquer',
    text: 'Vous savez ce qui est fait, pourquoi, et quelles sont les alternatives. Aucune décision n’est prise à votre place.',
  },
  {
    title: 'Un suivi sur le long terme',
    text: 'Le traitement ne s’arrête pas à la pose : contrôles réguliers, maintenance des implants et des gencives, pour des résultats qui durent.',
  },
]

export const FAQ = [
  {
    q: 'Comment prendre rendez-vous ?',
    a: 'En ligne sur Doctolib, à toute heure, ou par téléphone au secrétariat. Les consultations se font uniquement sur rendez-vous.',
  },
  {
    q: 'Que faut-il apporter au premier rendez-vous ?',
    a: 'Votre carte Vitale, votre attestation de mutuelle, vos radiographies récentes si vous en avez, et la liste de vos traitements en cours.',
  },
  {
    q: 'Mes soins sont-ils remboursés ?',
    a: 'Le cabinet est conventionné. Les soins courants (consultation, détartrage, caries, extractions) sont remboursés par l’Assurance Maladie sur la base des tarifs conventionnels. Pour les prothèses et les implants, un devis détaillé vous est remis pour que votre mutuelle puisse vous indiquer sa participation.',
  },
  {
    q: 'Que faire en cas d’urgence dentaire ?',
    a: 'Appelez le cabinet aux heures d’ouverture : nous faisons notre possible pour vous recevoir rapidement. Le soir, le week-end et les jours fériés, composez le 15.',
  },
  {
    q: 'La pose d’un implant est-elle douloureuse ?',
    a: 'L’intervention se fait sous anesthésie locale et n’est pas douloureuse. Les jours suivants, une gêne ou un gonflement modérés sont possibles ; ils se gèrent avec les médicaments prescrits.',
  },
  {
    q: 'On m’a dit que je n’avais pas assez d’os pour un implant. Est-ce possible quand même ?',
    a: 'Souvent, oui. Une greffe osseuse ou un comblement de sinus permet de reconstruire l’os avant ou pendant la pose de l’implant. Le bilan radiologique indique la technique adaptée à votre cas.',
  },
  {
    q: 'Combien de temps dure un implant ?',
    a: 'Environ 95 % des implants sont toujours en place 10 ans après leur pose, et beaucoup durent bien au-delà de 20 ans. Une bonne hygiène, des contrôles réguliers et l’arrêt du tabac comptent beaucoup dans cette longévité.',
  },
  {
    q: 'Mes gencives saignent au brossage, est-ce grave ?',
    a: 'C’est le signe d’une inflammation. Prise tôt, elle se soigne bien ; laissée sans traitement, elle peut entraîner un déchaussement. Un bilan parodontal permet de faire le point.',
  },
  {
    q: 'Recevez-vous les enfants ?',
    a: 'Oui, le cabinet prend en charge toute la famille. Les examens de prévention M’T dents de l’Assurance Maladie sont pris en charge à 100 %.',
  },
]

// `img` correspond aux fichiers générés par scripts/optimize-images.mjs.
export const VISITE = [
  { img: 'entree', title: 'L’entrée', text: 'Un cabinet au calme, à l’ombre des arbres, facile d’accès.' },
  { img: 'accueil', title: 'L’accueil', text: 'Notre équipe vous reçoit et répond à toutes vos questions.' },
  { img: 'attente', title: 'La salle d’attente', text: 'Un espace chaleureux pour patienter en toute sérénité.' },
  { img: 'soins-2', title: 'La salle de soins', text: 'Un équipement moderne dans un environnement lumineux.' },
  { img: 'soins-1', title: 'Le second fauteuil', text: 'Deux salles de soins pour mieux vous recevoir.' },
  { img: 'radio', title: 'La radio 3D', text: 'Une imagerie en trois dimensions sur place, pour un diagnostic précis.' },
]

export const ETAPES = [
  { n: '01', title: 'Prenez rendez-vous', text: 'En ligne sur Doctolib, à toute heure, ou par téléphone auprès du secrétariat.' },
  { n: '02', title: 'Premier bilan', text: 'Examen complet, radiographie si besoin et écoute de vos attentes.' },
  { n: '03', title: 'Un plan clair', text: 'Vous repartez avec un plan de traitement et un devis expliqués simplement.' },
]
