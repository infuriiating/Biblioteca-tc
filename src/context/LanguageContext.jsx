import { createContext, useContext, useState, useEffect } from 'react'
import pt from '../locales/pt'
import en from '../locales/en'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'pt' // Portuguese default
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    const dictionary = language === 'en' ? en : pt
    const keys = key.split('.')
    let translation = dictionary
    
    for (const k of keys) {
      if (translation[k] === undefined) {
        console.warn(`Translation missing for key: ${key}`)
        return key // fallback to key
      }
      translation = translation[k]
    }
    
    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
