import { PHOTOS } from '../data'
import PhotoSlot from './PhotoSlot'

// Photo responsive : AVIF puis WebP (générés par scripts/optimize-images.mjs), JPEG en secours.
// Tant que la photo n'est pas prête (voir PHOTOS dans data.js), on affiche le cadre avec sa consigne.
export default function Picture({ name, alt, sizes = '100vw', eager = false, className, imgClassName }) {
  const photo = PHOTOS[name]
  if (!photo?.ready) return <PhotoSlot name={name} className={className} />

  const set = (ext) => `/media/opt/${name}-800.${ext} 800w, /media/opt/${name}-1600.${ext} 1600w`
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        className={imgClassName}
        src={`/media/${name}.jpg`}
        alt={alt}
        width="1200"
        height="1600"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
