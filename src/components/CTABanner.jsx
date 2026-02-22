import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTABanner() {
  const { t, isHindi } = useLang()
  const c = t.ctaBanner
  const ref = useScrollReveal('animate-fade-up')

  return (
    <section className="relative bg-kalkoot-dark py-24 overflow-hidden">
      {/* Big fire gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-kalkoot-primary/15 via-kalkoot-dark to-kalkoot-secondary/10" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-kalkoot-primary via-kalkoot-secondary to-transparent" />
      </div>

      <div ref={ref} className="anim-hidden relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display leading-none mb-6">
          <span className="text-kalkoot-light text-6xl md:text-8xl block">{c.title1}</span>
          <span className="text-gradient-fire text-6xl md:text-8xl block">{c.title2}</span>
        </h2>

        <p className={`text-kalkoot-muted font-body text-lg max-w-xl mx-auto mb-10 ${isHindi ? 'lang-hi' : ''}`}>
          {c.desc}
        </p>

        <Link
          to="/start"
          className="btn-primary glow-cta text-lg px-10 py-4 inline-flex items-center gap-3"
        >
          <span className={isHindi ? 'lang-hi' : ''}>{c.cta}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
