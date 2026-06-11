'use client'
import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Project } from '@/lib/types'
import s from './HorizontalMarquee.module.css'

interface Props { projects: Project[] }

// px of scroll to advance 1 card
const SCROLL_PER_CARD = 320
// px between card centers (coverflow spacing)
const CARD_SPACING    = 500
// spring config — smooth but responsive
const SPRING = { stiffness: 120, damping: 20, mass: 0.6 }

export default function HorizontalMarquee({ projects }: Props) {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const rawProgress = useMotionValue(0)                   // 0 … N-1, set imperatively
  const progress    = useSpring(rawProgress, SPRING)      // spring-smoothed version
  const [activeDot, setActiveDot] = useState(0)

  const MAX_PROGRESS = projects.length - 1

  // Wheel hijack + snap-to-card
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let snapTimer: ReturnType<typeof setTimeout>

    function handleWheel(e: WheelEvent) {
      const rect = section!.getBoundingClientRect()
      if (rect.top > 0 || rect.bottom < window.innerHeight) return

      const cur = rawProgress.get()
      if (cur >= MAX_PROGRESS && e.deltaY > 0) return
      if (cur <= 0            && e.deltaY < 0) return

      e.preventDefault()
      rawProgress.set(
        Math.min(Math.max(cur + e.deltaY / SCROLL_PER_CARD, 0), MAX_PROGRESS)
      )

      // After scroll stops, snap to nearest card
      clearTimeout(snapTimer)
      snapTimer = setTimeout(() => {
        rawProgress.set(Math.round(Math.min(Math.max(rawProgress.get(), 0), MAX_PROGRESS)))
      }, 150)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(snapTimer)
    }
  }, [MAX_PROGRESS, rawProgress])

  // Desktop: sync nav dots from spring progress value
  useEffect(() => {
    const unsub = progress.on('change', v => {
      setActiveDot(Math.round(Math.min(Math.max(v, 0), MAX_PROGRESS)))
    })
    return unsub
  }, [progress, MAX_PROGRESS])

  // Mobile: sync nav dots from native scroll position.
  // Uses scrollLeft percentage — avoids offsetLeft issues with positioned children.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return
      const idx = Math.round((scrollLeft / maxScroll) * (projects.length - 1))
      setActiveDot(Math.max(0, Math.min(idx, projects.length - 1)))
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [projects.length])

  return (
    <section ref={sectionRef} className={s.marqueeSection} id="projects">
      <div className={s.stickyViewport}>
        <header className={s.sectionHeader}>
          <p className={s.sectionLabel}>// selected work</p>
          <h2 className={s.sectionTitle}>Projects</h2>
        </header>

        <div className={s.windowTrack} ref={trackRef}>
          {projects.map((project, i) => (
            <CardSlot key={project.id} index={i} progress={progress}>
              <MacWindow project={project} />
            </CardSlot>
          ))}
        </div>

        <div className={s.navDots}>
          {projects.map((_, i) => (
            <div
              key={i}
              className={`${s.navDot} ${i === activeDot ? s.navDotActive : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll spacer — keeps section sticky during hijack + quick exit after last card */}
      <div className={s.scrollSpacer} />
    </section>
  )
}

// ── Card slot ─────────────────────────────────────────────────────
// Derives x / scale / opacity / filter from shared spring progress value.
// No React re-renders — all animation is pure motion values.

interface SlotProps {
  index:    number
  progress: MotionValue<number>
  children: React.ReactNode
}

function CardSlot({ index, progress, children }: SlotProps) {
  const x = useTransform(progress, p => (index - p) * CARD_SPACING)

  const scale = useTransform(progress, p => {
    const d = Math.abs(index - p)
    if (d <= 1) return 1 - d * 0.28
    return Math.max(1 - d * 0.28, 0.55)
  })

  const opacity = useTransform(progress, p => {
    const d = Math.abs(index - p)
    if (d <= 1)  return 1 - d * 0.35
    if (d <= 1.8) return (1.8 - d) / 0.8 * 0.65
    return 0
  })

  const filter = useTransform(progress, p => {
    const d = Math.abs(index - p)
    const b = d <= 1 ? 1 - d * 0.45 : 0.3
    return `brightness(${b.toFixed(3)})`
  })

  const zIndex = useTransform(progress, p =>
    Math.round(20 - Math.abs(index - p) * 5)
  )

  return (
    <motion.div
      className={s.windowCard}
      style={{ x, scale, opacity, filter, zIndex }}
    >
      {children}
    </motion.div>
  )
}

// ── MacBook window ────────────────────────────────────────────────

function MacWindow({ project }: { project: Project }) {
  const displayUrl = project.live
    ? project.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `github.com/${project.githubBase}`

  return (
    <div className={s.macWindow}>
      {/* Title bar */}
      <div className={s.titleBar}>
        <div className={s.trafficLights}>
          <span className={`${s.dot} ${s.dotRed}`}    />
          <span className={`${s.dot} ${s.dotYellow}`} />
          <span className={`${s.dot} ${s.dotGreen}`}  />
        </div>
        <span className={s.windowTitle}>{project.title}</span>
      </div>

      {/* URL bar */}
      <div className={s.urlBar}>
        <div className={s.urlInput}>
          <LockIcon />
          <span className={s.urlText}>{displayUrl}</span>
        </div>
      </div>

      {/* Screenshot — main visual */}
      <div className={s.screenshotWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image ?? ''}
          alt={project.title}
          className={s.screenshot}
          style={{ objectPosition: project.previewPosition ?? 'top' }}
        />
      </div>

      {/* Info */}
      <div className={s.windowBody}>
        <div className={s.projectMeta}>
          <span className={s.projectYear}>{project.year}</span>
          <span className={s.projectCategory}>{project.category}</span>
        </div>
        <h3 className={s.projectTitle}>{project.title}</h3>
        <p className={s.projectDesc}>{project.description}</p>
        <div className={s.techStack}>
          {project.tech.map(t => <span key={t} className={s.techBadge}>{t}</span>)}
        </div>
        <div className={s.projectLinks}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={s.linkBtn}>
              Live ↗
            </a>
          )}
          {project.github && (
            <a
              href={`${project.githubBase}/${project.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={s.linkBtnGhost}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className={s.urlLock}>
      <rect x="1" y="5" width="8" height="7" rx="1.5" fill="currentColor" opacity="0.4" />
      <path d="M3 5V3.5a2 2 0 114 0V5" stroke="currentColor" strokeWidth="1.3"
            opacity="0.4" strokeLinecap="round" />
    </svg>
  )
}
