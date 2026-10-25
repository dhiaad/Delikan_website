"""Génère src/flows.css : des rubans dorés ondulants, tracés au hasard (graine fixe pour un résultat stable).

Chaque composition contient 2 ou 3 rubans. Un ruban est un faisceau de lignes qui suivent une même courbe de
Bézier, avec des écarts différents à chaque point de contrôle : le faisceau se resserre, s'élargit et se vrille
comme un ruban de soie. Quelques paillettes d'or complètent l'atmosphère.

Usage : python scripts/gen-flows.py   (depuis le dossier site/)
"""
import math
import random
import urllib.parse

W, H = 1600, 1000
GOLD = '#bf9f6c'


def edge_point(rng, side):
    if side == 'left':
        return (rng.uniform(-80, -20), rng.uniform(0, H))
    if side == 'right':
        return (rng.uniform(W + 20, W + 80), rng.uniform(0, H))
    if side == 'top':
        return (rng.uniform(0, W), rng.uniform(-80, -20))
    return (rng.uniform(0, W), rng.uniform(H + 20, H + 80))


def ribbon(rng, start, end, lines, strength):
    (x0, y0), (x3, y3) = start, end
    dx, dy = x3 - x0, y3 - y0
    length = math.hypot(dx, dy)
    nx, ny = -dy / length, dx / length  # normale au trajet
    # Points de contrôle : la courbe s'écarte franchement du trajet direct (vagues amples).
    c1 = (x0 + dx * 0.3 + nx * rng.uniform(-420, 420), y0 + dy * 0.3 + ny * rng.uniform(-420, 420))
    c2 = (x0 + dx * 0.7 + nx * rng.uniform(-420, 420), y0 + dy * 0.7 + ny * rng.uniform(-420, 420))
    # Écart entre lignes à chaque point : des signes différents créent la torsion du ruban.
    spread = [rng.uniform(4, 16), rng.uniform(-22, 26), rng.uniform(-22, 26), rng.uniform(4, 16)]
    pts = [(x0, y0), c1, c2, (x3, y3)]
    out = []
    for i in range(lines):
        k = i - (lines - 1) / 2
        p = [(x + nx * k * s, y + ny * k * s) for (x, y), s in zip(pts, spread)]
        # Les lignes du bord du faisceau sont plus pâles : effet de volume.
        edge = abs(k) / ((lines - 1) / 2 or 1)
        opacity = round(0.65 * strength * (1 - 0.75 * edge) * rng.uniform(0.8, 1.1), 3)
        width = round(rng.uniform(0.6, 1.3) * (1.2 - 0.5 * edge), 2)
        d = 'M{:.0f} {:.0f}C{:.0f} {:.0f} {:.0f} {:.0f} {:.0f} {:.0f}'.format(*p[0], *p[1], *p[2], *p[3])
        out.append(f"<path d='{d}' stroke-opacity='{opacity}' stroke-width='{width}'/>")
    return out


def composition(seed, ribbons):
    rng = random.Random(seed)
    parts = []
    for sides, lines, strength in ribbons:
        parts += ribbon(rng, edge_point(rng, sides[0]), edge_point(rng, sides[1]), lines, strength)
    dust = ''.join(
        f"<circle cx='{rng.uniform(0, W):.0f}' cy='{rng.uniform(0, H):.0f}' r='{rng.uniform(0.8, 2.2):.1f}' "
        f"fill-opacity='{rng.uniform(0.15, 0.4):.2f}'/>"
        for _ in range(26)
    )
    svg = (
        f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {W} {H}' preserveAspectRatio='xMidYMid slice' "
        f"fill='none' stroke='{GOLD}' stroke-linecap='round'>{''.join(parts)}<g fill='{GOLD}' stroke='none'>{dust}</g></svg>"
    )
    return 'url("data:image/svg+xml,' + urllib.parse.quote(svg, safe="/:=' ") + '")'


# Quatre ambiances : diagonale montante, grande vague horizontale, chute en biais, croisement.
FLOWS = [
    composition(11, [(('left', 'top'), 12, 0.6), (('bottom', 'right'), 8, 0.35)]),
    composition(23, [(('left', 'right'), 14, 0.55), (('top', 'bottom'), 7, 0.25)]),
    composition(37, [(('top', 'right'), 11, 0.55), (('left', 'bottom'), 9, 0.4), (('bottom', 'right'), 6, 0.22)]),
    composition(52, [(('left', 'right'), 10, 0.5), (('bottom', 'top'), 10, 0.45)]),
]

# Section → composition, et sens de dérive, pour que deux sections voisines ne se ressemblent jamais.
SECTIONS = [
    ('bienvenue', 0, 'drift-a'),
    ('explorer', 2, 'drift-b'),
    ('engagements', 1, 'drift-a'),
    ('etapes', 3, 'drift-b'),
    ('soins', 2, 'drift-a'),
    ('implants', 0, 'drift-b'),
    ('docteur', 3, 'drift-a'),
    ('infos', 1, 'drift-b'),
    ('faq', 2, 'drift-a'),
]

css = ['/* Généré par scripts/gen-flows.py : ne pas modifier à la main. */', ':root {']
css += [f'  --flow-{i + 1}: {f};' for i, f in enumerate(FLOWS)]
css.append('}')
sel = ',\n'.join(f'#{s}' for s, _, _ in SECTIONS)
css.append(f'''{sel} {{
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: 125% auto, 240px 240px;
  animation: drift-a 46s ease-in-out infinite alternate;
}}''')
for s, i, drift in SECTIONS:
    css.append(f'#{s} {{\n  background-image: var(--flow-{i + 1}), var(--grain);\n  animation-name: {drift};\n}}')
css.append('''#implants {
  background-color: var(--paper);
}
/* Dérive lente du ruban dans son cadre : l'or semble flotter. */
@keyframes drift-a {
  from {
    background-position: 0% 20%, 0 0;
  }
  to {
    background-position: 100% 70%, 0 0;
  }
}
@keyframes drift-b {
  from {
    background-position: 100% 75%, 0 0;
  }
  to {
    background-position: 0% 25%, 0 0;
  }
}
@media (max-width: 720px) {
  ''' + ',\n  '.join(f'#{s}' for s, _, _ in SECTIONS) + ''' {
    background-size: 260% auto, 240px 240px;
  }
}
@media (prefers-reduced-motion: reduce) {
  ''' + ',\n  '.join(f'#{s}' for s, _, _ in SECTIONS) + ''' {
    animation: none;
  }
}''')
open('src/flows.css', 'w', encoding='utf-8').write('\n'.join(css) + '\n')
print('src/flows.css', sum(len(f) for f in FLOWS), 'octets de motifs')
