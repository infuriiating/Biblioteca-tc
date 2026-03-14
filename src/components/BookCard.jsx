import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Extract dominant color from an image using canvas
function extractDominantColor(imgEl) {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = 40
    canvas.width = size
    canvas.height = size
    ctx.drawImage(imgEl, 0, 0, size, size)
    const data = ctx.getImageData(0, 0, size, size).data
    let r = 0, g = 0, b = 0, count = 0
    for (let i = 0; i < data.length; i += 16) {
      // Skip near-white and near-black pixels for a more interesting color
      const pr = data[i], pg = data[i + 1], pb = data[i + 2]
      const brightness = (pr + pg + pb) / 3
      if (brightness > 30 && brightness < 220) {
        r += pr; g += pg; b += pb; count++
      }
    }
    if (count === 0) return null
    return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) }
  } catch {
    return null
  }
}

const BookCard = ({ book, variant = 'catalog', onClick }) => {
  const isRecommended = variant === 'recommended'
  const imgRef = useRef(null)
  const [accentColor, setAccentColor] = useState(null)

  const handleImageLoad = useCallback(() => {
    if (!isRecommended || !imgRef.current) return
    const color = extractDominantColor(imgRef.current)
    if (color) setAccentColor(color)
  }, [isRecommended])

  const bgStyle = accentColor
    ? { backgroundColor: `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.85)` }
    : { backgroundColor: '#e8edf5' }

  const borderStyle = accentColor
    ? { borderColor: `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.4)` }
    : {}

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={() => onClick && onClick(book.id)}
      className={cn(
        "cursor-pointer group select-none transition-all",
        isRecommended ? "w-full max-w-[200px] shrink-0" : "w-full"
      )}
    >
      {isRecommended ? (
        <div
          className="rounded-[1.75rem] overflow-hidden shadow-sm border border-border/40 transition-all duration-300 group-hover:shadow-xl bg-bg-surface"
        >
          <div
            className="aspect-[3/4] overflow-hidden"
          >
            <img 
              ref={imgRef}
              src={book.cover_url} 
              alt={book.title}
              crossOrigin="anonymous"
              onLoad={handleImageLoad}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-0.5 px-4 py-3.5">
            <h3 className="font-semibold text-text-main text-sm line-clamp-1">{book.title}</h3>
            <p className="text-text-muted text-[12px] line-clamp-1 font-normal">{book.author}</p>
          </div>
        </div>
      ) : (
        /* Catalog Variant */
        <div className="space-y-3">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-surface shadow-sm border-[5px] border-bg-surface ring-1 ring-border/20 group-hover:shadow-md group-hover:ring-primary/20 transition-all duration-300">
            <img 
              src={book.cover_url} 
              alt={book.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-0.5 px-1">
            <h3 className="font-medium text-text-main text-sm line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
            <p className="text-text-muted text-[11px] line-clamp-1 font-normal">{book.author}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default BookCard
