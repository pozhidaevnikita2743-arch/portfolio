'use client'
import { useState, useEffect } from 'react'
import s from './Navbar.module.css'

const NAV = [
  { href: '#about',    label: 'About'    },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills'   },
  { href: '#contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <div className={`container ${s.inner}`}>
        <a href="#" className={s.logo}>
          <span className={s.logoSlash}>&lt;</span>
          NP
          <span className={s.logoSlash}>/&gt;</span>
        </a>

        <nav className={s.nav}>
          {NAV.map(({ href, label }) => (
            <a key={href} href={href} className={s.navLink}>
              {label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/pozhidaevnikita2743-arch"
          target="_blank"
          rel="noopener noreferrer"
          className={s.ctaBtn}
        >
          GitHub
        </a>
      </div>
    </header>
  )
}
