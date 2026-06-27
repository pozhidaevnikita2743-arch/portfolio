'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from './i18n'

interface LangCtxType {
  lang: Lang
  toggle: () => void
}

const LangCtx = createContext<LangCtxType>({ lang: 'ru', toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'ru' || saved === 'en') setLang(saved)
  }, [])

  function toggle() {
    setLang(l => {
      const next = l === 'ru' ? 'en' : 'ru'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return <LangCtx.Provider value={{ lang, toggle }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)
