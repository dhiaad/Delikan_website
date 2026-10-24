// Vérifie le rendu du site : captures sur 4 largeurs + une passe « réduire les animations ».
// Usage : npm run build && npx vite preview --port 4173, puis `npm run check`
// Variables : URL, OUT (dossier), CHANNEL (msedge par défaut, ou chrome), ONLY (ex. "mobile,desktop").
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const URL = process.env.URL ?? 'http://localhost:4173'
const OUT = process.env.OUT ?? 'screenshots'
mkdirSync(OUT, { recursive: true })

const RUNS = [
  { name: 'mobile', viewport: { width: 375, height: 812 }, mobile: true },
  { name: 'tablet', viewport: { width: 768, height: 1024 }, mobile: true },
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'wide', viewport: { width: 1920, height: 1080 } },
  { name: 'reduced', viewport: { width: 1440, height: 900 }, reduced: true },
].filter((r) => !process.env.ONLY || process.env.ONLY.split(',').includes(r.name))

const browser = await chromium.launch({ channel: process.env.CHANNEL ?? 'msedge' })
const problems = []

for (const run of RUNS) {
  const context = await browser.newContext({
    viewport: run.viewport,
    isMobile: !!run.mobile,
    hasTouch: !!run.mobile,
    reducedMotion: run.reduced ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()
  page.on('console', (m) => m.type() === 'error' && problems.push(`[${run.name}] console : ${m.text()}`))
  page.on('pageerror', (e) => problems.push(`[${run.name}] erreur : ${e.message}`))
  await page.goto(URL, { waitUntil: 'networkidle' })

  if (!run.reduced && run.name === 'desktop') {
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${OUT}/${run.name}-00-intro.png` })
  }
  await page.waitForTimeout(run.reduced ? 600 : 3200)
  await page.screenshot({ path: `${OUT}/${run.name}-01.png` })

  // Défile écran par écran pour déclencher les animations au scroll.
  const step = Math.round(run.viewport.height * 0.85)
  let i = 1
  for (;;) {
    const before = await page.evaluate(() => window.scrollY)
    if (run.mobile) await page.evaluate((s) => window.scrollBy(0, s), step)
    else await page.mouse.wheel(0, step)
    await page.waitForTimeout(1100)
    const after = await page.evaluate(() => window.scrollY)
    await page.screenshot({ path: `${OUT}/${run.name}-${String(++i).padStart(2, '0')}.png` })
    if (after <= before + 5 || i > 40) break
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  if (overflow > 0) problems.push(`[${run.name}] débordement horizontal de ${overflow}px`)
  await context.close()
}

await browser.close()
console.log(problems.length ? problems.join('\n') : 'Aucun problème détecté')
