'use client'
import { useEffect, useRef } from 'react'
import { Skill } from '@/lib/types'
import s from './SkillBadge.module.css'

interface Props {
  skill: Skill
  index: number
  inView: boolean
}

export default function SkillBadge({ skill, index, inView }: Props) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView) return
    const bar = barRef.current
    if (!bar) return
    const delay = index * 60 + 200
    const timer = setTimeout(() => {
      bar.style.setProperty('--bar-w', `${skill.level}%`)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, skill.level, index])

  return (
    <div
      className={`${s.badge} ${inView ? s.visible : ''}`}
      style={{ '--delay': `${index * 60}ms` } as React.CSSProperties}
    >
      <div className={s.top}>
        <span className={s.name}>{skill.name}</span>
        <span className={s.level}>{skill.level}%</span>
      </div>
      <div className={s.track}>
        <div
          ref={barRef}
          className={s.bar}
          style={{ '--bar-w': '0%' } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
