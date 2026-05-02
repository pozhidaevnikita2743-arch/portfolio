'use client'
import { useRef, useEffect } from 'react'
import s from './HeroCanvas.module.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  pulsePhase: number
  pulseSpeed: number
}

const CONNECTION_DIST  = 140
const MOUSE_REPEL_DIST = 100
const MOUSE_REPEL_STR  = 0.04
const BASE_SPEED       = 0.35
const NEON_COLORS      = ['#00d4ff', '#00d4ff', '#00d4ff', '#39ff14', '#bf5fff']

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    function resize() {
      const dpr = window.devicePixelRatio || 1
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width  = W * dpr
      canvas!.height = H * dpr
      ctx!.scale(dpr, dpr)
    }

    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80
    let particles: Particle[] = []

    function spawnParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_SPEED * 2,
        radius: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.5 + 0.3,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
      }))
    }

    let mx = -9999, my = -9999
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    function onMouseLeave() { mx = -9999; my = -9999 }

    let raf: number
    function tick() {
      ctx!.clearRect(0, 0, W, H)

      const fog = ctx!.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.7)
      fog.addColorStop(0, 'rgba(0, 212, 255, 0.018)')
      fog.addColorStop(1, 'transparent')
      ctx!.fillStyle = fog
      ctx!.fillRect(0, 0, W, H)

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (1 - dist / MOUSE_REPEL_DIST) * MOUSE_REPEL_STR
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.998
        p.vy *= 0.998

        const speed = Math.hypot(p.vx, p.vy)
        if (speed > BASE_SPEED * 2) {
          p.vx = (p.vx / speed) * BASE_SPEED * 2
          p.vy = (p.vy / speed) * BASE_SPEED * 2
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        p.pulsePhase += p.pulseSpeed
        const pulse   = 0.5 + 0.5 * Math.sin(p.pulsePhase)
        const opacity = p.opacity * (0.6 + 0.4 * pulse)

        const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
        grd.addColorStop(0, p.color + 'ff')
        grd.addColorStop(0.4, p.color + '88')
        grd.addColorStop(1, p.color + '00')
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx!.fillStyle = grd
        ctx!.globalAlpha = opacity
        ctx!.fill()
        ctx!.globalAlpha = 1
      }

      ctx!.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d > CONNECTION_DIST) continue
          const alpha = (1 - d / CONNECTION_DIST) * 0.25
          const hex   = Math.round(alpha * 255).toString(16).padStart(2, '0')
          const grad  = ctx!.createLinearGradient(a.x, a.y, b.x, b.y)
          grad.addColorStop(0, a.color + hex)
          grad.addColorStop(1, b.color + hex)
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.strokeStyle = grad
          ctx!.stroke()
        }
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    spawnParticles()
    tick()

    const ro = new ResizeObserver(() => resize())
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
}
