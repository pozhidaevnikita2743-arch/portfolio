import HeroAurora    from '@/components/HeroAurora'
import HeroTerminal  from '@/components/HeroTerminal'
import s from './page.module.css'

export default function HeroTest() {
  return (
    <main className={s.main}>
      {/* ── Option A: Aurora ── */}
      <section className={s.screen}>
        <HeroAurora />
        <div className={s.content}>
          <p className={s.label}>// Вариант A — Aurora</p>
          <h1 className={s.name}>Nikita<br/>Pozhidaev</h1>
          <p className={s.tag}>Web Developer / Russia</p>
        </div>
      </section>

      {/* ── Option B: Terminal ── */}
      <section className={s.screen}>
        <HeroTerminal />
        <div className={s.content}>
          <p className={s.label}>// Вариант B — Terminal</p>
          <h1 className={s.name}>Nikita<br/>Pozhidaev</h1>
          <p className={s.tag}>Web Developer / Russia</p>
        </div>
      </section>
    </main>
  )
}
