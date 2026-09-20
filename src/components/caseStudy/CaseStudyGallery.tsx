import { useState } from 'react'
import type { CaseStudy } from '../../data/caseStudies'

interface GalleryImageProps {
  src: string
  fallback: string
  caption?: string
  alt: string
}

function GalleryImage({ src, fallback, caption, alt }: GalleryImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <figure className="case-study-gallery__item">
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (imgSrc !== fallback) setImgSrc(fallback)
        }}
      />
      {caption && (
        <figcaption className="case-study-gallery__caption">{caption}</figcaption>
      )}
    </figure>
  )
}

interface CaseStudyGalleryProps {
  caseStudy: CaseStudy
}

export function CaseStudyGallery({ caseStudy }: CaseStudyGalleryProps) {
  const images = caseStudy.media.gallery.filter((item) => item.type === 'image')

  if (images.length === 0) return null

  return (
    <section className="case-study-gallery" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="case-study-gallery__heading">
        Gallery
      </h2>
      <div className="case-study-gallery__grid">
        {images.map((item, i) => (
          <GalleryImage
            key={`${item.src}-${i}`}
            src={item.src}
            fallback={caseStudy.thumbnail}
            caption={item.caption}
            alt={item.caption ?? `${caseStudy.title} — design screen ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
