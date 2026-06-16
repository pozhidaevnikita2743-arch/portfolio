'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import s from './Navbar.module.css'

const NAV = [
  { href: '#about',    label: 'About',    id: 'about'    },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills',   label: 'Skills',   id: 'skills'   },
  { href: '#contact',  label: 'Contact',  id: 'contact'  },
]

// Underdamped spring → slight overshoot = the "bounce" effect
const INDICATOR = { type: 'spring', stiffness: 280, damping: 18 } as const

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  // null = hero (logo is active), string = section id
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // `scrolled` flag (compact pill) is a plain scroll listener — cheap, no
  // layout reads involved.
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Active section via IntersectionObserver: shrink the root to a thin
  // horizontal line at 40% from the top of the viewport, then watch which
  // section currently crosses that line. Unlike reading offsetTop/offsetHeight
  // by hand, this is recomputed by the browser itself after every layout —
  // immune to async reflows (font swap, image load, etc.) briefly throwing
  // the numbers off mid-scroll.
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
  }, [])

  const onHero = activeSection === null

  return (
    <header className={s.header}>
      <motion.div
        layout
        className={`${s.pill} ${scrolled ? s.pillScrolled : ''}`}
        transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 0.8 }}
      >
        {/* Left — badge + logo (logo is also an "active" indicator for hero) */}
        <div className={s.leftGroup}>
          <span className={`${s.available} ${scrolled ? s.availableGone : ''}`}>
            <span className={s.availableDot} />
            Available for projects
          </span>

          {/* Logo — gets the same glass pill as nav items when on hero */}
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

        {/* Right — CTA */}
        <a
          href="https://github.com/pozhidaevnikita2743-arch"
          target="_blank"
          rel="noopener noreferrer"
          className={s.ctaBtn}
        >
          GitHub
        </a>
      </motion.div>
    </header>
  )
}
