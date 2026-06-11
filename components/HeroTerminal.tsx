'use client'
import { useEffect, useRef, useState } from 'react'
import s from './HeroTerminal.module.css'

const LINES = [
  { text: 'const developer = {',         delay: 0 },
  { text: '  name: "Nikita Pozhidaev",', delay: 320 },
  { text: '  stack: ["Next.js", "TS"],',  delay: 640 },
  { text: '  location: "Russia",',        delay: 960 },
  { text: '  status: "available",',       delay: 1280 },
  { text: '}',                            delay: 1600 },
  { text: '',                             delay: 1800 },
  { text: 'console.log(developer)',       delay: 2000 },
  { text: '// → Building the web',       delay: 2600, comment: true },
  { text: '// → One commit at a time.',  delay: 3000, comment: true },
]

interface Line { text: string; comment?: boolean }

export default function HeroTerminal() {
  const [visible, setVisible] = useState<Line[]>([])
  const [typed, setTyped]     = useState('')
  const [phase, setPhase]     = useState(0)   // 0=typing lines, 1=done
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisible(prev => [...prev, { text: line.text, comment: line.comment }])
        if (i === LINES.length - 1) setPhase(1)
      }, line.delay + 400)
      timerRef.current.push(t)
    })
    return () => timerRef.current.forEach(clearTimeout)
  }, [])

  // blinking cursor line after all lines appear
  useEffect(() => {
    if (phase !== 1) return
    let idx = 0
    const str = '> █'
    const t = setInterval(() => {
      setTyped(idx % 2 === 0 ? '> █' : '> ')
      idx++
    }, 530)
    setTyped(str)
    return () => clearInterval(t)
  }, [phase])

  return (
    <div className={s.wrapper} aria-hidden="true">
      <div className={s.glow} />
      <div className={s.terminal}>
        {/* title bar */}
        <div className={s.bar}>
          <span className={`${s.dot} ${s.red}`}    />
          <span className={`${s.dot} ${s.yellow}`} />
          <span className={`${s.dot} ${s.green}`}  />
          <span className={s.barTitle}>portfolio.ts</span>
        </div>
        {/* code body */}
        <div className={s.body}>
          <div className={s.prompt}>
            <span className={s.ps}>~</span>
            <span className={s.cmd}> node portfolio.ts</span>
          </div>
          {visible.map((line, i) => (
            <div key={i} className={`${s.line} ${line.comment ? s.comment : ''}`}>
              {line.text}
            </div>
          ))}
          {phase === 1 && (
            <div className={s.cursor}>{typed}</div>
          )}
        </div>
      </div>
      <div className={s.fadeBottom} />
      <div className={s.fadeLeft} />
    </div>
  )
}
