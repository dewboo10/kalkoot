import { createContext, useContext, useState } from 'react'
import { translations, defaultLang } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLang)

  const toggleLang = () => setLang(prev => prev === 'hi' ? 'hinglish' : 'hi')

  const t = translations[lang]
  const isHindi = lang === 'hi'

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isHindi }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
