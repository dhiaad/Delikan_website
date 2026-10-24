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
  facebook: 'https://www.facebook.com/dribrahim.delikan/',
  maps: 'https://www.google.com/maps/place/Dr.+Delikan+Ibrahim+-+Chirurgien+Dentiste/@42.7161408,2.8527608,17z',
  mapsEmbed: 'https://www.google.com/maps?q=42.7161369,2.8553357&z=16&output=embed',
}

export const SECTIONS = [
  { id: 'diplomes', label: 'Diplômes' },
  { id: 'visite', label: 'Visite' },
  { id: 'infos', label: 'Infos pratiques' },
  { id: 'soins', label: 'Soins' },
  { id: 'cabinet', label: 'Le cabinet' },
]

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

export const SOINS = [
  {
    title: 'Implantologie',
    text: 'Remplacer une ou plusieurs dents manquantes par des implants, avec un plan de traitement clair et personnalisé. Le Dr Delikan est titulaire de trois diplômes universitaires en implantologie.',
    tag: 'Spécialité',
  },
  {
    title: 'Soins conservateurs',
    text: 'Caries, dévitalisations, reconstitutions : préserver vos dents naturelles reste toujours la priorité.',
  },
  {
    title: 'Prothèses',
    text: 'Couronnes, bridges et prothèses amovibles pour retrouver confort de mastication et sourire.',
  },
  {
    title: 'Esthétique du sourire',
    text: 'Blanchiment, facettes et soins esthétiques pour un sourire naturel et harmonieux.',
  },
  {
    title: 'Chirurgie orale',
    text: 'Extractions, dents de sagesse et petites chirurgies réalisées dans un cadre rassurant.',
  },
  {
    title: 'Prévention & détartrage',
    text: 'Bilans réguliers, détartrage et conseils d’hygiène pour garder des dents saines longtemps.',
  },
]

// `img` correspond aux fichiers générés par scripts/optimize-images.mjs.
export const VISITE = [
  { img: 'entree', title: 'L’entrée', text: 'Un cabinet au calme, à l’ombre des arbres, facile d’accès.' },
  { img: 'accueil', title: 'L’accueil', text: 'Notre équipe vous reçoit et répond à toutes vos questions.' },
  { img: 'attente', title: 'La salle d’attente', text: 'Un espace chaleureux pour patienter en toute sérénité.' },
  { img: 'soins-2', title: 'La salle de soins', text: 'Un équipement moderne dans un environnement lumineux.' },
  { img: 'soins-1', title: 'Le second fauteuil', text: 'Deux salles de soins pour mieux vous recevoir.' },
  { img: 'radio', title: 'La radiologie', text: 'Radio panoramique sur place pour un diagnostic précis.' },
]

export const ETAPES = [
  { n: '01', title: 'Prenez rendez-vous', text: 'En ligne sur Doctolib, à toute heure, ou par téléphone auprès du secrétariat.' },
  { n: '02', title: 'Premier bilan', text: 'Examen complet, radiographie si besoin et écoute de vos attentes.' },
  { n: '03', title: 'Un plan clair', text: 'Vous repartez avec un plan de traitement et un devis expliqués simplement.' },
]
