'use client'
import { useEffect, useRef } from 'react'
import s from './CursorGlow.module.css'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let x = 0, y = 0, tx = 0, ty = 0
    let raf: number

    function onMove(e: MouseEvent) { tx = e.clientX; ty = e.clientY }

    function animate() {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el!.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className={s.glow} aria-hidden="true" />
}
