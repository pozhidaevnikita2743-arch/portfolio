'use client'
import { useEffect, useRef, useState } from 'react'
import { Skill } from '@/lib/types'
import s from './SkillBadge.module.css'

interface Props {
  skill: Skill
  index: number
  inView: boolean
}

export default function SkillBadge({ skill, index, inView }: Props) {
  const barRef     = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [hovered, setHovered] = useState(false)

  // Fill bar + count up number
  useEffect(() => {
    if (!inView) return
    const delay = index * 60 + 200
    const timer = setTimeout(() => {
      // Fill bar
      barRef.current?.style.setProperty('--bar-w', `${skill.level}%`)

      // Count up
      const duration = 1000
      const steps = 40
      const stepTime = duration / steps
      let current = 0
      const interval = setInterval(() => {
        current += 1
        const eased = Math.round(skill.level * easeOut(current / steps))
        setCount(eased)
        if (current >= steps) clearInterval(interval)
      }, stepTime)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, skill.level, index])

  return (
    <div
      className={`${s.badge} ${inView ? s.visible : ''} ${hovered ? s.hovered : ''}`}
      style={{ '--delay': `${index * 60}ms` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={s.top}>
        <span className={s.name}>{skill.name}</span>
        <span className={s.level}>{count}%</span>
      </div>
      <div className={s.track}>
        <div
          ref={barRef}
          className={`${s.bar} ${hovered ? s.barHover : ''}`}
          style={{ '--bar-w': '0%' } as React.CSSProperties}
        />
        <div
          className={s.dot}
          style={{ '--bar-w': `${inView ? skill.level : 0}%` } as React.CSSProperties}
        />
      </div>
    </div>
  )
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}
