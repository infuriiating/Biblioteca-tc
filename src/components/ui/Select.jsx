import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { useLanguage } from '../../context/LanguageContext'

const Select = ({ options, value, onChange, label, placeholder, triggerClassName }) => {
  const { t } = useLanguage()
  const defaultPlaceholder = placeholder || t('admin.common.select.placeholder')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const selectedOption = options.find(opt => opt.id.toString() === value.toString())

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn("relative", label && "space-y-3")} ref={containerRef}>
      {label && (
        <label className="text-xs font-extrabold uppercase tracking-[0.2em] text-text-muted ml-1">
          {label}
        </label>
      )}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-14 bg-bg-main/50 border border-transparent rounded-[1.25rem] px-6 text-sm flex items-center justify-between cursor-pointer transition-all shadow-inner hover:bg-bg-main/70",
          isOpen ? "bg-bg-surface border-primary/30 shadow-none ring-4 ring-primary/5" : "",
          triggerClassName
        )}
      >
        <span className={cn(
          "font-bold truncate",
          selectedOption ? "text-text-main" : "text-text-muted opacity-60"
        )}>
          {selectedOption ? selectedOption.name : defaultPlaceholder}
        </span>
        <ChevronDown 
          size={18} 
          className={cn(
            "text-text-muted transition-transform duration-300",
            isOpen ? "rotate-180 text-primary" : ""
          )} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[100] left-0 right-0 mt-2 bg-bg-surface/90 backdrop-blur-xl border border-border/50 rounded-[1.5rem] shadow-2xl custom-select-shadow overflow-hidden p-2"
          >
            <div className="max-h-[240px] overflow-y-auto custom-scrollbar-h space-y-1">
              {options.length > 0 ? options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    onChange(option.id.toString())
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all",
                    value.toString() === option.id.toString()
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-text-main hover:bg-bg-main/60 hover:text-text-main font-medium"
                  )}
                >
                  <span className="text-sm tracking-tight truncate">{option.name}</span>
                </div>
              )) : (
                <div className="px-6 py-4 text-text-muted text-xs uppercase tracking-widest font-bold text-center opacity-40">
                  {t('admin.common.select.noOptions')}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select
