'use client'
import { useRef } from 'react'
import { Project } from '@/lib/types'
import s from './ProjectCard.module.css'

function useTilt(intensity = 6) {
  const ref = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -intensity
    const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  intensity
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
    el.style.transition = ''
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s ease'
    el.style.transform = ''
    setTimeout(() => { if (ref.current) ref.current.style.transition = '' }, 500)
  }

  return { ref, onMouseMove, onMouseLeave }
}

interface Props {
  project: Project
  index: number
  inView: boolean
}

export default function ProjectCard({ project, index, inView }: Props) {
  const tilt = useTilt()
  const githubUrl = `${project.githubBase}/${project.github}`

  return (
    <div
      ref={tilt.ref}
      className={`${s.tiltWrap} ${inView ? s.revealed : ''}`}
      style={{ '--stagger': `${index * 80}ms` } as React.CSSProperties}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className={s.card}>
        <div className={s.accentLine} />

        <div className={s.body}>
          <div className={s.header}>
            <span className={s.category}>{project.category}</span>
            <span className={s.year}>{project.year}</span>
          </div>

          <h3 className={s.title}>{project.title}</h3>
          <p className={s.desc}>{project.description}</p>

          <div className={s.techList}>
            {project.tech.map(t => (
              <span key={t} className={s.techTag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={s.footer}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            aria-label={`View ${project.title} on GitHub`}
          >
            <IconGitHub />
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.link} ${s.linkLive}`}
              aria-label={`Open live demo of ${project.title}`}
            >
              <IconExternal />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function IconGitHub() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function IconExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
