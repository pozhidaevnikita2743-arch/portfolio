'use client'
import { useRef, useEffect, useState } from 'react'
import s from './HeroFigure.module.css'

const CAPTURE_FPS = 30

export default function HeroFigure() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const framesRef  = useRef<ImageData[]>([])
  const targetT    = useRef(0.5)
  const currentT   = useRef(0.5)
  const raf        = useRef<number>(undefined)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas  = canvasRef.current
    const video   = videoRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !video || !wrapper) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })!
    const dpr = window.devicePixelRatio || 1
    let W = 0, H = 0
    let cancelled = false

    function setupCanvas() {
      W = wrapper!.offsetWidth
      H = wrapper!.offsetHeight
      canvas!.width  = W * dpr
      canvas!.height = H * dpr
      ctx.scale(dpr, dpr)
    }

    function drawVideoFrame() {
      const vW = video!.videoWidth  || 1920
      const vH = video!.videoHeight || 1080
      const vA = vW / vH
      const cA = W / H
      let sx = 0, sy = 0, sw = vW, sh = vH
      if (vA > cA) { sw = vH * cA; sx = (vW - sw) / 2 }
      else         { sh = vW / cA; sy = (vH - sh) / 2 }
      ctx.drawImage(video!, sx, sy, sw, sh, 0, 0, W, H)
    }

    async function captureFrames() {
      setupCanvas()
      const frames: ImageData[] = []
      const totalFrames = Math.ceil(video!.duration * CAPTURE_FPS)

      for (let i = 0; i < totalFrames; i++) {
        if (cancelled) return
        video!.currentTime = i / CAPTURE_FPS
        await new Promise<void>(resolve => {
          video!.addEventListener('seeked', () => resolve(), { once: true })
        })
        if (cancelled) return
        drawVideoFrame()
        frames.push(ctx.getImageData(0, 0, W * dpr, H * dpr))
      }

      framesRef.current = frames
      setReady(true)

      function loop() {
        if (cancelled) return
        currentT.current += (targetT.current - currentT.current) * 0.12
        const t   = Math.max(0, Math.min(1, currentT.current))
        const idx = Math.round(t * (framesRef.current.length - 1))
        ctx.putImageData(framesRef.current[idx], 0, 0)
        raf.current = requestAnimationFrame(loop)
      }
      raf.current = requestAnimationFrame(loop)
    }

    function onMouseMove(e: MouseEvent) {
      targetT.current = e.clientX / window.innerWidth
    }

    video.addEventListener('canplaythrough', captureFrames, { once: true })
    window.addEventListener('mousemove', onMouseMove)
    if (video.readyState >= 4) captureFrames()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf.current!)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={s.wrapper}>
      <video
        ref={videoRef}
        src="/hero-figure.mp4"
        muted
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />
      <canvas ref={canvasRef} className={`${s.canvas} ${ready ? s.visible : ''}`} aria-hidden="true" />
    </div>
  )
}
