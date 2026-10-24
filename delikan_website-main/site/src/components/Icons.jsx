const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const Tooth = (p) => (
  <svg {...base} {...p}>
    <path d="M8 3C5 3 3.5 5.5 4 9c.4 3 1.5 4.5 2 7.5.4 2.5 1 4.5 2.3 4.5 1.5 0 1.6-3 2.3-5 .3-1 .7-1.5 1.4-1.5s1.1.5 1.4 1.5c.7 2 .8 5 2.3 5 1.3 0 1.9-2 2.3-4.5.5-3 1.6-4.5 2-7.5.5-3.5-1-6-4-6-2 0-2.8 1-4 1s-2-1-4-1z" />
  </svg>
)

export const Implant = (p) => (
  <svg {...base} {...p}>
    <path d="M7 3h10c0 3-1.5 5-5 5S7 6 7 3z" />
    <path d="M9 10h6M9.5 13h5M10 16h4M10.5 19h3M12 8v13" />
  </svg>
)

export const Crown = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8l3 3 5-6 5 6 3-3-1.5 11h-13z" />
    <path d="M6 19h12" />
  </svg>
)

export const Sparkle = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
)

export const Scalpel = (p) => (
  <svg {...base} {...p}>
    <path d="M20 4L9 15l-2 1 1-2L19 3z" />
    <path d="M7 16l-3 5M9 15l1.5 1.5" />
  </svg>
)

export const Shield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
)

export const Phone = (p) => (
  <svg {...base} width={20} height={20} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
  </svg>
)

export const Calendar = (p) => (
  <svg {...base} width={20} height={20} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
  </svg>
)

export const Pin = (p) => (
  <svg {...base} width={20} height={20} {...p}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

export const Clock = (p) => (
  <svg {...base} width={20} height={20} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const Arrow = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const SOIN_ICONS = {
  implant: Implant,
  soins: Tooth,
  prothese: Crown,
  esthetique: Sparkle,
  chirurgie: Scalpel,
  prevention: Shield,
}
