'use client'
import { LangProvider, useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import HeroFigure from '@/components/HeroSprite'
import CursorGlow from '@/components/CursorGlow'
import SectionReveal from '@/components/SectionReveal'
import SkillBadge from '@/components/SkillBadge'
import HorizontalMarquee from '@/components/projects/HorizontalMarquee'
import WorkProcess from '@/components/WorkProcess'
import { useInView } from '@/lib/hooks/useInView'
import { projects } from '@/lib/projects'
import { skills } from '@/lib/skills'
import s from './page.module.css'

function SkillsSection() {
  const { lang } = useLang()
  const tr = t[lang].skills
  const { ref, inView } = useInView(0.1)
  return (
    <section
      className={s.skillsSection}
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className={s.sectionLabel}>{tr.label}</div>
        <h2 className={s.sectionTitle}>{tr.title}</h2>
        <div className={s.skillsGrid}>
          {skills.map((skill, i) => (
            <SkillBadge key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
        <WorkProcess />
      </div>
    </section>
  )
}

function PageContent() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <>
      <CursorGlow />
      <Navbar />

      {/* HERO */}
      <section className={s.hero} id="hero">
        <HeroFigure />
        <div className={`container ${s.heroContent}`}>
          <div className={s.heroEyebrow}>
            <span className={s.eyebrowDot} />
            {tr.available}
          </div>

          <h1 className={s.heroName}>
            <span className={s.heroNameGlitch} data-text="Nikita">Nikita</span>
            <br />
            <span className={s.heroNameGlitch} data-text="Pozhidaev">Pozhidaev</span>
          </h1>

          <p className={s.heroTagline}>
            {tr.hero.tagline}<span className={s.taglineSep}> / </span>{tr.hero.taglineLocation}
          </p>

          <p className={s.heroBio}>{tr.hero.bio}</p>

          <div className={s.heroCtas}>
            <a href="#projects" className={s.ctaPrimary}>{tr.hero.ctaPrimary}</a>
            <a href="#contact"  className={s.ctaSecondary}>{tr.hero.ctaSecondary}</a>
          </div>
        </div>

        <div className={s.scrollHint}>
          <div className={s.scrollLine} />
          <span>{tr.hero.scroll}</span>
        </div>
      </section>

      {/* ABOUT */}
      <SectionReveal>
        <section className={s.about} id="about">
          <div className="container">
            <div className={s.sectionLabel}>{tr.about.label}</div>
            <h2 className={s.sectionTitle}>{tr.about.title}</h2>
            <p className={s.aboutText}>{tr.about.text}</p>

            <div className={s.aboutStats}>
              <div className={s.statItem}>
                <div className={s.statNumber}>3+</div>
                <div className={s.statLabel}>{tr.about.stat1Label}</div>
              </div>
              <div className={s.statItem}>
                <div className={s.statNumber}>15+</div>
                <div className={s.statLabel}>{tr.about.stat2Label}</div>
              </div>
              <div className={s.statItem}>
                <div className={s.statNumber}>Full-stack</div>
                <div className={s.statLabel}>{tr.about.stat3Label}</div>
              </div>
            </div>

            <div className={s.aboutCards}>
              <div className={s.aboutCard}>
                <div className={s.aboutCardIcon}><IconFrontend /></div>
                <div className={s.aboutCardTitle}>{tr.about.card1Title}</div>
                <div className={s.aboutCardDesc}>{tr.about.card1Desc}</div>
              </div>
              <div className={s.aboutCard}>
                <div className={s.aboutCardIcon}><IconBackend /></div>
                <div className={s.aboutCardTitle}>{tr.about.card2Title}</div>
                <div className={s.aboutCardDesc}>{tr.about.card2Desc}</div>
              </div>
              <div className={s.aboutCard}>
                <div className={s.aboutCardIcon}><IconIntegrations /></div>
                <div className={s.aboutCardTitle}>{tr.about.card3Title}</div>
                <div className={s.aboutCardDesc}>{tr.about.card3Desc}</div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* PROJECTS */}
      <HorizontalMarquee projects={projects} />

      {/* SKILLS */}
      <SectionReveal>
        <SkillsSection />
      </SectionReveal>

      {/* CONTACT */}
      <SectionReveal>
        <section className={s.contact} id="contact">
          <div className="container">
            <div className={s.contactInner}>
              <div className={s.sectionLabel}>{tr.contact.label}</div>
              <h2 className={s.sectionTitle}>{tr.contact.title}</h2>
              <p className={s.contactText}>{tr.contact.text}</p>
              <div className={s.contactCards}>
                <a href="mailto:nftcollector2743@gmail.com" className={s.contactCard}>
                  <div className={s.cardLeft}>
                    <div className={s.contactCardIcon}><IconEmail /></div>
                    <div className={s.contactCardPlatform}>Email</div>
                  </div>
                  <div className={s.cardDivider} />
                  <div className={s.cardMiddle}>
                    <div className={s.contactCardHandle}>nftcollector2743@gmail.com</div>
                    <div className={s.contactCardDesc}>{tr.contact.emailDesc}</div>
                  </div>
                  <div className={s.cardRight}>
                    <span className={s.contactCardMeta}>{tr.contact.emailMeta}</span>
                    <span className={s.contactCardArrow}>→</span>
                  </div>
                </a>

                <a href="https://t.me/soleth_2743" target="_blank" rel="noopener noreferrer" className={s.contactCard}>
                  <div className={s.cardLeft}>
                    <div className={s.contactCardIcon}><IconTelegram /></div>
                    <div className={s.contactCardPlatform}>Telegram</div>
                  </div>
                  <div className={s.cardDivider} />
                  <div className={s.cardMiddle}>
                    <div className={s.contactCardHandle}>@soleth_2743</div>
                    <div className={s.contactCardDesc}>{tr.contact.telegramDesc}</div>
                  </div>
                  <div className={s.cardRight}>
                    <span className={s.contactCardMeta}>{tr.contact.telegramMeta}</span>
                    <span className={s.contactCardArrow}>→</span>
                  </div>
                </a>

                <a href="https://github.com/pozhidaevnikita2743-arch" target="_blank" rel="noopener noreferrer" className={s.contactCard}>
                  <div className={s.cardLeft}>
                    <div className={s.contactCardIcon}><IconGitHub /></div>
                    <div className={s.contactCardPlatform}>GitHub</div>
                  </div>
                  <div className={s.cardDivider} />
                  <div className={s.cardMiddle}>
                    <div className={s.contactCardHandle}>pozhidaevnikita2743-arch</div>
                    <div className={s.contactCardDesc}>{tr.contact.githubDesc}</div>
                  </div>
                  <div className={s.cardRight}>
                    <span className={s.contactCardMeta}>{tr.contact.githubMeta}</span>
                    <span className={s.contactCardArrow}>→</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <footer className={s.footer}>
        <div className="container">
          <span className={s.footerText}>
            © {new Date().getFullYear()} Nikita Pozhidaev — {tr.footer}
          </span>
        </div>
      </footer>
    </>
  )
}

export default function Page() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  )
}

function IconFrontend() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function IconBackend() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
    </svg>
  )
}

function IconIntegrations() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 7H6a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h3M15 7h3a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-3M8 10h8" />
    </svg>
  )
}

function IconEmail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
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
