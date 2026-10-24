# Refonte premium du site DELIKAN : analyse et plan

## 1. Ce qu'il y a aujourd'hui

- **Framework** : React 19 + Vite 8, une seule page, 11 composants dans `src/components`, contenu centralisé dans `src/data.js`, un seul fichier CSS avec des variables de couleurs.
- **Animations déjà installées** : GSAP 3.15 + ScrollTrigger (avec `@gsap/react`), Motion 14, Lenis. SplitText est inclus dans GSAP 3.15 (gratuit depuis la 3.13), donc rien à ajouter.
- **Points faibles** :
  - le JavaScript pèse 523 Ko (174 Ko compressé), trop lourd pour mobile ;
  - les photos sont en JPEG brut, jusqu'à 556 Ko pour l'entrée ;
  - les vidéos (2,5 Mo et 1,1 Mo) sont de basse définition et se chargent aussi sur mobile ;
  - l'identité visuelle actuelle (vert sauge, Fraunces) ne correspond pas à la palette demandée.

**Conclusion** : la base technique est saine et les bonnes librairies sont déjà là. Je garde l'architecture, `data.js` et les composants. Je refais l'identité visuelle, l'entrée en scène et la chorégraphie des animations. Ce n'est pas une reconstruction.

## 2. Qui fait quoi (librairies)

| Outil | Rôle |
|---|---|
| **GSAP + ScrollTrigger + SplitText** | Tout ce qui est lié au scroll ou chronométré : intro, révélation des titres ligne par ligne, parallaxe, transitions de couleur entre sections, visite épinglée. |
| **Motion** | Les interactions d'interface : menu, boutons magnétiques, survols, barre mobile, états ouvert/fermé. Chargé en version allégée (`LazyMotion`). |
| **Lenis** | Défilement fluide à la molette sur ordinateur uniquement. Défilement natif sur mobile, désactivé si « réduire les animations » est actif. |
| **React Bits** | Non utilisé : ses effets sont reconnaissables et vont à l'encontre du « pas d'effets prédéfinis ». Tout est fait sur mesure. |

## 3. Direction artistique

- **Palette** : blanc cassé `#FBFAF7`, bleu nuit `#0B1A2F` (et `#132640` en variante), or champagne `#C8B184` réservé aux filets, chiffres et survols, jamais en aplat.
- **Typographie** :
  - **Bodoni Moda** (serif à fort contraste) pour le mot-symbole DELIKAN et les grands titres ;
  - **Manrope** pour le texte courant ;
  - une échelle typographique stricte, avec des titres très grands et beaucoup d'air.
- **Mot-symbole DELIKAN** : capitales espacées, un fin filet champagne et la mention « Chirurgie dentaire · Saint-Estève ». Il apparaît en très grand à 3 endroits : l'intro, le hero et le pied de page.

## 4. Plan d'animation

1. **Entrée en scène (1,4 s max)** : les lettres D-E-L-I-K-A-N montent une à une derrière un masque, puis le filet champagne se trace et le rideau bleu nuit glisse vers le haut sur le hero. Elle n'est jouée qu'à la première visite de la session et ne bloque jamais le scroll.
2. **Hero** :
   - DELIKAN en pleine largeur ;
   - la vidéo du cabinet dans un cadre qui s'agrandit en plein écran quand on descend ;
   - l'accroche et les boutons arrivent en cascade, synchronisés sur la même timeline.
3. **Titres** : chaque titre de section se révèle ligne par ligne (SplitText + masque), précédé d'un petit index « 01 — Le cabinet » en champagne.
4. **Transitions entre sections** : le fond passe en douceur du blanc au bleu nuit en entrant dans les sections sombres (visite, pied de page), et l'inverse en sortant. La page paraît d'un seul tenant, sans coupures nettes.
5. **Images** : révélation par rideau (clip-path) puis légère parallaxe interne (±6 %) pour la profondeur. La parallaxe est réservée à l'ordinateur ; sur mobile, seule la révélation est conservée.
6. **Soins** : une liste éditoriale remplace les cartes. Sur ordinateur, au survol d'une ligne, une photo flotte et suit le curseur ; sur mobile, la liste devient un accordéon.
7. **Visite du cabinet** :
   - sur ordinateur, défilement horizontal épinglé conservé, avec un compteur 01/06 et la photo centrale légèrement agrandie ;
   - sur mobile, carrousel natif à balayer, sans détournement du scroll.
8. **Prise de rendez-vous** :
   - bouton Doctolib magnétique (souris uniquement), texte qui « roule » au survol et soulignement champagne ;
   - la navigation se masque quand on descend, réapparaît quand on remonte et indique la section active ;
   - sur mobile, la barre « Appeler / Rendez-vous » est conservée.
9. **Pied de page** : grand DELIKAN qui se dévoile au scroll, avec un dernier appel à prendre rendez-vous.

## 5. Performance et accessibilité

- Photos converties en AVIF/WebP en 2 tailles avec `<picture>`, soit environ 60 à 80 % de poids en moins.
- Vidéos : chargées seulement quand elles sont visibles. Sur mobile et en connexion lente, une photo fixe les remplace.
- On n'anime que `transform`, `opacity` et `clip-path` (pas de saccades), et le code des sections basses est découpé pour alléger le premier chargement.
- `prefers-reduced-motion` :
  - intro sautée, pas de parallaxe ni de Lenis ;
  - les textes s'affichent directement, les vidéos sont remplacées par leur image.
- Le scroll natif n'est jamais bloqué. Seule la visite est épinglée sur ordinateur, et elle reste traversable normalement.

## 6. Vidéos

Je n'ai pas d'outil de génération vidéo par IA dans cet environnement. Je peux en revanche :
- animer l'intro et le hero en code, ce qui est plus net et plus léger qu'une vidéo ;
- compresser et recadrer proprement vos 2 vidéos ;
- si tu veux un fichier vidéo de la séquence d'intro (pour les réseaux sociaux par exemple), l'enregistrer depuis le navigateur avec Playwright.

## 7. Vérification

Playwright sur 4 tailles (375, 768, 1440 et 1920 px), plus une passe avec « réduire les animations » activé. Il vérifie les erreurs console, l'absence de débordement horizontal et la lisibilité. Après la première version, je fais une vraie passe de finition sur les captures (alignements, rythme, timings) avant de te livrer.
