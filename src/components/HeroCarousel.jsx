import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroCarousel = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + books.length) % books.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 8000)
    return () => clearInterval(timer)
  }, [currentIndex, books.length])

  if (!books || books.length === 0) return null

  const currentBook = books[currentIndex]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-[2rem] shadow-xl bg-bg-surface group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Blur/Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 group-hover:scale-100"
            style={{ backgroundImage: `url(${currentBook.cover_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/90 to-primary/40 backdrop-blur-[2px]" />

          {/* Content Container */}
          <div className="relative h-full container mx-auto px-8 flex items-center">
            <div className="grid lg:grid-cols-2 lg:gap-12 items-center w-full">
              
              {/* Book Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-center lg:text-left"
              >
                <span className="inline-block bg-yellow-400 text-bg-main px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">Novidade</span>
                <h2 className="text-4xl lg:text-6xl font-extrabold text-white drop-shadow-md leading-tight">
                  {currentBook.title}
                </h2>
                <p className="text-xl text-white/80 flex items-center justify-center lg:justify-start gap-2 italic">
                  <span>por</span> <span className="font-semibold text-white not-italic">{currentBook.author}</span>
                </p>
                <div className="pt-4 flex justify-center lg:justify-start">
                  <Link 
                    to={`/book/${currentBook.id}`}
                    className="bg-primary text-bg-main px-8 py-4 rounded-full font-bold hover:bg-primary-hover transition-all flex items-center gap-2 transform hover:-translate-y-1 active:scale-95 shadow-xl"
                  >
                    <BookOpen size={20} /> Ver Detalhes
                  </Link>
                </div>
              </motion.div>

              {/* Book Cover with 3D effect */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                 animate={{ opacity: 1, scale: 1, rotateY: -15 }}
                 transition={{ delay: 0.3 }}
                 className="hidden lg:flex justify-center perspective-[1000px]"
              >
                <img 
                  src={currentBook.cover_url} 
                  alt={currentBook.title}
                  className="h-[380px] w-auto rounded-lg shadow-[25px_25px_50px_rgba(0,0,0,0.5)] transform preserve-3d transition-transform duration-500 hover:rotate-y-0 hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button 
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-bg-main transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-bg-main transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
