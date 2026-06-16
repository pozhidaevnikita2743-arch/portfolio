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

  // Single scroll handler: scrolled flag + active section by scroll position.
  // IntersectionObserver is unreliable for sticky/tall sections (projects),
  // so we compare scrollY against each section's offsetTop instead.
  useEffect(() => {
    const handler = () => {
      const y  = window.scrollY
      const vh = window.innerHeight

      setScrolled(y > 60)

      // Near the top → hero (logo active)
      if (y < vh * 0.25) {
        setActiveSection(null)
        return
      }

      // "Active point" = 40% from top of viewport
      const checkY = y + vh * 0.4

      let found: string | null = null
      for (const { id } of NAV) {
        const el = document.getElementById(id)
        if (!el) continue
        const top    = el.offsetTop
        const bottom = top + el.offsetHeight
        if (checkY >= top && checkY < bottom) {
          found = id
          break
        }
      }
      if (found) setActiveSection(found)
    }

    window.addEventListener('scroll', handler, { passive: true })

    // Custom fonts swap in after first paint (font-display: swap), which
    // reflows heading text and shifts every section's offsetTop. If the user
    // scrolls during that window, the calc above briefly lands on the wrong
    // section. Recompute once fonts finish loading + layout settles.
    document.fonts?.ready.then(() => requestAnimationFrame(handler))

    return () => window.removeEventListener('scroll', handler)
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
