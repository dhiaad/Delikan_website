# DELIKAN · site du cabinet de chirurgie dentaire du Dr Ibrahim Delikan (Saint-Estève)

Site vitrine une page en React 19 + Vite. Identité : blanc, bleu nuit, touches d'or champagne ; Bodoni Moda pour le mot-symbole et les titres, Manrope pour le texte.

## Animations : qui fait quoi

- **GSAP + ScrollTrigger + SplitText** : intro DELIKAN, timeline du hero, titres révélés ligne par ligne (`components/Heading.jsx`), photos dévoilées avec profondeur (`RevealImage.jsx`), visite épinglée horizontale, fond qui passe au bleu nuit dans les sections sombres (`App.jsx`, attribut `data-theme="dark"`).
- **Motion** (chargé via `LazyMotion`) : boutons magnétiques (`Button.jsx`), menu plein écran, accordéon des soins, barre mobile.
- **Lenis** : défilement fluide à la souris uniquement ; défilement natif sur écran tactile.
- `prefers-reduced-motion` : intro sautée, aucune animation au scroll, pas de Lenis, vidéo remplacée par une photo, visite en carrousel simple.

## Lancer en local

```bash
npm install
npm run dev
```

## Mettre en ligne

`npm run build` génère `dist/`, à déposer sur n'importe quel hébergeur statique (Netlify, Vercel, OVH…).

## Photos

Les originaux sont dans `public/media/*.jpg`. Après avoir ajouté ou remplacé une photo, régénérer les versions AVIF/WebP :

```bash
node scripts/optimize-images.mjs
```

## Vérifier le rendu

Avec `npx vite preview --port 4173` lancé, `npm run check` prend des captures à 375, 768, 1440 et 1920 px plus une passe « réduire les animations », dans `screenshots/`, et signale erreurs console et débordements horizontaux (Edge par défaut, `CHANNEL=chrome` pour Chrome).

## Modifier le contenu

Textes, adresse, horaires, soins, photos de la visite et étapes : `src/data.js`.
