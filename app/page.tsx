'use client'
import Navbar from '@/components/Navbar'
import HeroCanvas from '@/components/HeroCanvas'
import CursorGlow from '@/components/CursorGlow'
import SectionReveal from '@/components/SectionReveal'
import ProjectCard from '@/components/ProjectCard'
import SkillBadge from '@/components/SkillBadge'
import { useInView } from '@/lib/hooks/useInView'
import { projects } from '@/lib/projects'
import { skills } from '@/lib/skills'
import s from './page.module.css'

function ProjectsSection() {
  const { ref, inView } = useInView(0.05)
  return (
    <section
      className={s.projects}
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className={s.sectionLabel}>// projects</div>
        <h2 className={s.sectionTitle}>Selected Work</h2>
        <div className={s.projectGrid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const { ref, inView } = useInView(0.1)
  return (
    <section
      className={s.skillsSection}
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className={s.sectionLabel}>// skills</div>
        <h2 className={s.sectionTitle}>Tech Stack</h2>
        <div className={s.skillsGrid}>
          {skills.map((skill, i) => (
            <SkillBadge key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <CursorGlow />
      <Navbar />

      {/* HERO */}
      <section className={s.hero} id="hero">
        <HeroCanvas />
        <div className={`container ${s.heroContent}`}>
          <div className={s.heroEyebrow}>
            <span className={s.eyebrowDot} />
            Available for projects
          </div>

          <h1 className={s.heroName}>
            <span className={s.heroNameGlitch} data-text="Nikita">Nikita</span>
            <br />
            <span className={s.heroNameGlitch} data-text="Pozhidaev">Pozhidaev</span>
          </h1>

          <p className={s.heroTagline}>
            Web Developer<span className={s.taglineSep}> / </span>Tula, Russia
          </p>

          <p className={s.heroBio}>
            Building commercial web products from Tula.
            Full-stack focus on Next.js, TypeScript, and crafted UI.
          </p>

          <div className={s.heroCtas}>
            <a href="#projects" className={s.ctaPrimary}>View Work</a>
            <a href="#contact"  className={s.ctaSecondary}>Get in touch</a>
          </div>
        </div>

        <div className={s.scrollHint}>
          <div className={s.scrollLine} />
          <span>scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <SectionReveal>
        <section className={s.about} id="about">
          <div className="container">
            <div className={s.sectionLabel}>// about</div>
            <h2 className={s.sectionTitle}>Who I Am</h2>
            <p className={s.aboutText}>
              Web developer from Tula, Russia. I build commercial websites and
              web applications — from company landing pages to full e-commerce
              platforms. Everything I ship is custom-coded, no templates, no shortcuts.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* PROJECTS */}
      <ProjectsSection />

      {/* SKILLS */}
      <SectionReveal>
        <SkillsSection />
      </SectionReveal>

      {/* CONTACT */}
      <SectionReveal>
        <section className={s.contact} id="contact">
          <div className="container">
            <div className={s.sectionLabel}>// contact</div>
            <h2 className={s.sectionTitle}>Let&apos;s Work Together</h2>
            <p className={s.contactText}>
              Open for freelance projects and collaborations.
            </p>
            <div className={s.contactLinks}>
              <a
                href="https://github.com/pozhidaevnikita2743-arch"
                target="_blank"
                rel="noopener noreferrer"
                className={s.contactLink}
              >
                <IconGitHub />
                GitHub
              </a>
              <a
                href="https://t.me/"
                className={s.contactLink}
              >
                <IconTelegram />
                Telegram
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      <footer className={s.footer}>
        <div className="container">
          <span className={s.footerText}>
            © {new Date().getFullYear()} Nikita Pozhidaev — Built with Next.js
          </span>
        </div>
      </footer>
    </>
  )
}

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function IconTelegram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}
