'use client'
import s from './HeroAurora.module.css'

export default function HeroAurora() {
  return (
    <div className={s.wrapper} aria-hidden="true">
      <div className={s.blob1} />
      <div className={s.blob2} />
      <div className={s.blob3} />
      <div className={s.blob4} />
      <div className={s.noise} />
      <div className={s.fadeLeft} />
      <div className={s.fadeBottom} />
    </div>
  )
}
