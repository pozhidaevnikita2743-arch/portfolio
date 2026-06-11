'use client'
import { useRef, useEffect } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { Project } from '@/lib/types'
import s from './HorizontalMarquee.module.css'

interface HorizontalMarqueeProps {
  projects: Project[]
}

const CARD_WIDTH = 360

export default function HorizontalMarquee({ projects }: HorizontalMarqueeProps) {
  const MAX_SCROLL = projects.length * CARD_WIDTH / 2

  const accumulatedRef   = useRef(0)
  const offsetTopRef     = useRef(0)
  const offsetBottomRef  = useRef(0)
  const progressRef      = useRef(0)
  const rafRef           = useRef<number | undefined>(undefined)

  const topRowRef        = useRef<HTMLDivElement>(null)
  const bottomRowRef     = useRef<HTMLDivElement>(null)
  const progressFillRef  = useRef<HTMLDivElement>(null)
  const sectionRef       = useRef<HTMLElement>(null)

  const tripled = [...projects, ...projects, ...projects]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    function applyTransforms() {
      if (topRowRef.current) {
        topRowRef.current.style.transform = `translateX(${offsetTopRef.current}px)`
      }
      if (bottomRowRef.current) {
        bottomRowRef.current.style.transform = `translateX(${offsetBottomRef.current}px)`
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progressRef.current * 100}%`
      }
    }

    function handleWheel(e: WheelEvent) {
      const rect = section!.getBoundingClientRect()
      // Only hijack when the section is in the viewport
      if (rect.top > 0 || rect.bottom < window.innerHeight) return

      if (accumulatedRef.current >= MAX_SCROLL) {
        // Max scroll reached — let the page scroll normally
        return
      }

      e.preventDefault()

      accumulatedRef.current = Math.min(
        accumulatedRef.current + Math.abs(e.deltaY),
        MAX_SCROLL
      )

      offsetTopRef.current    += e.deltaY * 0.6
      offsetBottomRef.current -= e.deltaY * 0.6
      progressRef.current = accumulatedRef.current / MAX_SCROLL

      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(applyTransforms)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [MAX_SCROLL])

  return (
    <section ref={sectionRef} className={s.marqueeSection} id="projects">
      <div className={s.stickyViewport}>
        <header className={s.sectionHeader}>
          <p className={s.sectionLabel}>// selected work</p>
          <h2 className={s.sectionTitle}>Projects</h2>
        </header>

        <div ref={topRowRef} className={`${s.row} ${s.rowTop}`}>
          {tripled.map((project, i) => (
            <div key={`top-${i}`} className={s.cardWrap}>
              <ProjectCard
                project={project}
                index={i % projects.length}
                inView={true}
              />
            </div>
          ))}
        </div>

        <div ref={bottomRowRef} className={`${s.row} ${s.rowBottom}`}>
          {tripled.map((project, i) => (
            <div key={`bottom-${i}`} className={s.cardWrap}>
              <ProjectCard
                project={project}
                index={i % projects.length}
                inView={true}
              />
            </div>
          ))}
        </div>

        <div className={s.progressBar}>
          <div ref={progressFillRef} className={s.progressFill} />
        </div>
      </div>

      <div
        className={s.scrollSpacer}
        style={{ height: MAX_SCROLL + 'px' }}
      />
    </section>
  )
}
