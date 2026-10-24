// Génère des versions AVIF/WebP en 2 tailles pour chaque photo de public/media.
import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const SRC = 'public/media'
const OUT = 'public/media/opt'
mkdirSync(OUT, { recursive: true })

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg'))) {
  const { name } = parse(file)
  for (const width of [800, 1600]) {
    const img = sharp(join(SRC, file)).rotate().resize({ width, withoutEnlargement: true })
    await img.clone().avif({ quality: 55 }).toFile(join(OUT, `${name}-${width}.avif`))
    await img.clone().webp({ quality: 78 }).toFile(join(OUT, `${name}-${width}.webp`))
  }
  const meta = await sharp(join(SRC, file)).metadata()
  console.log(name, meta.width, 'x', meta.height)
}
