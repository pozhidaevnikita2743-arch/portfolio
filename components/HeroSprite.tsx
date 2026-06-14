'use client'
import { useRef, useEffect, useState } from 'react'
import s from './HeroFigure.module.css'

interface SpriteMeta {
  frameCount: number
  frameWidth: number
  frameHeight: number
  fps: number
  cols: number
  rows: number
}

export default function HeroSprite() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const imgRef     = useRef<HTMLImageElement | null>(null)
  const metaRef    = useRef<SpriteMeta | null>(null)
  const targetT    = useRef(0.5)
  const currentT   = useRef(0.5)
  const raf        = useRef<number>(undefined)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    let W = 0, H = 0
    let cancelled = false

    function setupCanvas() {
      W = wrapper!.offsetWidth
      H = wrapper!.offsetHeight
      canvas!.width  = W * dpr
      canvas!.height = H * dpr
      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }

    function drawFrame(t: number) {
      const meta = metaRef.current
      const img  = imgRef.current
      if (!meta || !img || !img.complete) return

      const { frameCount, frameWidth: FW, frameHeight: FH, cols: COLS } = meta
      const idx = Math.round(Math.max(0, Math.min(1, t)) * (frameCount - 1))
      const col = idx % COLS
      const row = Math.floor(idx / COLS)

      // cover-fit: maintain aspect ratio of frame
      const fA = FW / FH
      const cA = W / H
      let sx = col * FW, sy = row * FH, sw = FW, sh = FH
      if (fA > cA) { sw = FH * cA; sx += (FW - sw) / 2 }
      else         { sh = FW / cA; sy += (FH - sh) / 2 }

      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)
    }

    function loop() {
      if (cancelled) return
      currentT.current += (targetT.current - currentT.current) * 0.12
      drawFrame(currentT.current)
      raf.current = requestAnimationFrame(loop)
    }

    function onMouseMove(e: MouseEvent) {
      targetT.current = e.clientX / window.innerWidth
    }

    async function init() {
      const [meta] = await Promise.all([
        fetch('/hero-sprite-meta.json').then(r => r.json()) as Promise<SpriteMeta>,
      ])
      if (cancelled) return
      metaRef.current = meta

      const img = new Image()
      img.src = '/hero-sprite.webp'
      imgRef.current = img

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
      })
      if (cancelled) return

      setupCanvas()
      drawFrame(0.5)
      setReady(true)
      loop()
    }

    init().catch(console.error)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf.current!)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={s.wrapper}>
      <canvas ref={canvasRef} className={`${s.canvas} ${ready ? s.visible : ''}`} aria-hidden="true" />
    </div>
  )
}
