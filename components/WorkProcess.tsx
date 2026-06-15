'use client'
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import s from './WorkProcess.module.css'

const STEPS = [
  { label: 'Brief',        sub: 'Scope & discovery'  },
  { label: 'Design',       sub: 'Mockups & UI'        },
  { label: 'Development',  sub: 'Code & layout'       },
  { label: 'Integrations', sub: 'CRM · bots · APIs'   },
  { label: 'Deploy',       sub: 'Launch & handoff'    },
]

const TOTAL_MS = 4200
const HOLD_MS  = 1800
const N = STEPS.length

export default function WorkProcess() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: false, margin: '-60px' })
  const [progress, setProgress] = useState(-0.5)

  useEffect(() => {
    if (!inView) { setProgress(-0.5); return }

    let cancelled = false

    async function run() {
      while (!cancelled) {
        const start = performance.now()
        await new Promise<void>(resolve => {
          function tick(now: number) {
            if (cancelled) { resolve(); return }
            const p = ((now - start) / TOTAL_MS) * (N - 1)
            if (p >= N - 1) { setProgress(N - 1); resolve() }
            else            { setProgress(p); requestAnimationFrame(tick) }
          }
          requestAnimationFrame(tick)
        })
        if (cancelled) break
        await new Promise(r => setTimeout(r, HOLD_MS))
        if (cancelled) break
        setProgress(-0.5)
        await new Promise(r => setTimeout(r, 350))
      }
    }

    run()
    return () => { cancelled = true }
  }, [inView])

  const nodePos  = (i: number) => `${(i / (N - 1)) * 100}%`
  const segFill  = (i: number) => Math.max(0, Math.min(1, progress - i))
  const pulsePct = (Math.max(0, Math.min(N - 1, progress)) / (N - 1)) * 100
  const showPulse = progress > -0.05 && progress < N - 1 - 0.02

  return (
    <div ref={ref} className={s.wrapper}>
      <div className={s.heading}>
        <span className={s.headingLabel}>// process</span>
        <span className={s.headingTitle}>How I Work</span>
      </div>

      {/* Cable track */}
      <div className={s.trackContainer}>
        <div className={s.trackBg} />

        {STEPS.slice(0, -1).map((_, i) => (
          <div
            key={i}
            className={s.trackFill}
            style={{
              left:  nodePos(i),
              width: `calc(${nodePos(i + 1)} - ${nodePos(i)})`,
              transform: `scaleX(${segFill(i)})`,
            }}
          />
        ))}

        {showPulse && (
          <div className={s.pulse} style={{ left: `${pulsePct}%` }} />
        )}

        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`${s.node} ${progress >= i - 0.02 ? s.nodeLit : ''}`}
            style={{ left: nodePos(i) }}
          />
        ))}
      </div>

      {/* Labels — absolutely aligned to node positions */}
      <div className={s.labelsContainer}>
        {STEPS.map((step, i) => (
          <div
            key={i}
            className={`${s.stepLabel} ${progress >= i - 0.02 ? s.stepLabelLit : ''} ${
              i === 0 ? s.labelFirst : i === N - 1 ? s.labelLast : ''
            }`}
            style={{ left: nodePos(i) }}
          >
            <div className={s.stepName}>{step.label}</div>
            <div className={s.stepSub}>{step.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
