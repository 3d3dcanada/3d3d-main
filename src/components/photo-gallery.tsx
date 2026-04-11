'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Lightbox, type LightboxImage } from '@/components/lightbox'

export interface GalleryBucket {
  title: string
  description: string
  images: LightboxImage[]
}

interface PhotoGalleryProps {
  buckets: GalleryBucket[]
  accent?: string
}

export function PhotoGallery({ buckets, accent = '#E84A8A' }: PhotoGalleryProps) {
  const [activeBucket, setActiveBucket] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = (bucketIdx: number, imageIdx: number) => {
    setActiveBucket(bucketIdx)
    setActiveIndex(imageIdx)
  }

  const closeLightbox = () => setActiveBucket(null)

  return (
    <>
      <div className="gallery-grid">
        {buckets.map((bucket, bucketIdx) => {
          const previewThumbs = bucket.images.slice(0, 3)
          const remaining = bucket.images.length - previewThumbs.length

          return (
            <article
              key={bucket.title}
              className="gallery-card"
              style={{ '--card-accent': accent } as CSSProperties}
            >
              <h3 className="gallery-card__title">{bucket.title}</h3>
              <p className="gallery-card__copy">{bucket.description}</p>
              <div className="gallery-card__thumbs">
                {previewThumbs.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className="gallery-card__thumb"
                    onClick={() => openLightbox(bucketIdx, i)}
                    aria-label={`Open image ${i + 1}: ${img.alt}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </button>
                ))}
                {remaining > 0 && (
                  <button
                    type="button"
                    className="gallery-card__thumb gallery-card__more"
                    onClick={() => openLightbox(bucketIdx, 3)}
                    aria-label={`Open gallery — ${remaining} more`}
                  >
                    +{remaining}
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <Lightbox
        images={activeBucket !== null ? buckets[activeBucket].images : []}
        initialIndex={activeIndex}
        open={activeBucket !== null}
        onClose={closeLightbox}
      />
    </>
  )
}
