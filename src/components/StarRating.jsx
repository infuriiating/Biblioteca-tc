import { useState } from 'react'
import { Star } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const StarRating = ({ 
  rating = 0, 
  max = 5, 
  interactive = false, 
  onChange, 
  size = 20,
  className 
}) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div 
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1
        const isFilled = interactive 
          ? starValue <= (hoverRating || rating)
          : starValue <= Math.round(rating)

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            className={cn(
              "transition-all duration-200 focus:outline-none",
              interactive ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-default"
            )}
            aria-label={`Ratar ${starValue} de 5`}
          >
            <Star 
              size={size} 
              className={cn(
                "transition-colors",
                isFilled ? "fill-primary text-primary" : "fill-transparent text-text-muted/30"
              )} 
            />
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
