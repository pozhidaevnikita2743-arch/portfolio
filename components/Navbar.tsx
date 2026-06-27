'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'
import s from './Navbar.module.css'

const INDICATOR = { type: 'spring', stiffness: 280, damping: 18 } as const

export default function Navbar() {
  const { lang, toggle } = useLang()
  const tr = t[lang]

  const NAV = [
    { href: '#about',    label: tr.nav.about,    id: 'about'    },
    { href: '#projects', label: tr.nav.projects,  id: 'projects' },
    { href: '#skills',   label: tr.nav.skills,    id: 'skills'   },
    { href: '#contact',  label: tr.nav.contact,   id: 'contact'  },
  ]

  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const ids = ['hero', ...NAV.map(n => n.id)]
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const intersecting = new Map<string, boolean>()

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          intersecting.set((entry.target as HTMLElement).id, entry.isIntersecting)
        })
        const found = ids.find(id => intersecting.get(id)) ?? null
        setActiveSection(found && found !== 'hero' ? found : null)
      },
      { rootMargin: '-40% 0px -59% 0px', threshold: 0 }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const onHero = activeSection === null

  return (
    <header className={s.header}>
      <motion.div
        layout
        className={`${s.pill} ${scrolled ? s.pillScrolled : ''}`}
        transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 0.8 }}
      >
        {/* Left — badge + logo */}
        <div className={s.leftGroup}>
          <span className={`${s.available} ${scrolled ? s.availableGone : ''}`}>
            <span className={s.availableDot} />
            {tr.available}
          </span>

          <a href="#" className={`${s.logo} ${onHero ? s.logoActive : ''}`}>
            {onHero && (
              <motion.span
                layoutId="navIndicator"
                className={s.navIndicator}
                transition={INDICATOR}
              />
            )}
            <span className={s.navLinkText}>
              <span className={s.logoSlash}>&lt;</span>NP<span className={s.logoSlash}>/&gt;</span>
            </span>
          </a>
        </div>

        {/* Center — nav */}
        <nav className={s.nav}>
          {NAV.map(({ href, label, id }) => {
            const isActive = activeSection === id
            return (
              <a
                key={href}
                href={href}
                className={`${s.navLink} ${isActive ? s.navLinkActive : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className={s.navIndicator}
                    transition={INDICATOR}
                  />
                )}
                <span className={s.navLinkText}>{label}</span>
              </a>
            )
          })}
        </nav>

        {/* Right — lang toggle + GitHub */}
        <div className={s.rightGroup}>
          <button className={s.langToggle} onClick={toggle} aria-label="Switch language">
            <span className={lang === 'ru' ? s.langActive : s.langInactive}>RU</span>
            <span className={s.langSep}>/</span>
            <span className={lang === 'en' ? s.langActive : s.langInactive}>EN</span>
          </button>
          <a
            href="https://github.com/pozhidaevnikita2743-arch"
            target="_blank"
            rel="noopener noreferrer"
            className={s.ctaBtn}
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </header>
  )
}
