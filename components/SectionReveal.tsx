'use client'
import { useInView } from '@/lib/hooks/useInView'
import s from './SectionReveal.module.css'

interface Props { children: React.ReactNode }

export default function SectionReveal({ children }: Props) {
  const { ref, inView } = useInView(0.08)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${s.wrap} ${inView ? s.visible : ''}`}>
      {children}
    </div>
  )
}
