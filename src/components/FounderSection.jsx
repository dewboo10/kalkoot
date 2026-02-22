import { useLang } from '../contexts/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Quote } from 'lucide-react'

export default function FounderSection() {
  const { t, isHindi } = useLang()
  const f = t.founder
  const ref = useScrollReveal('animate-fade-up')

  return (
    <section className="relative bg-kalkoot-charcoal py-24 overflow-hidden">
      {/* Diagonal background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-kalkoot-primary/8 rounded-full blur-[60px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-kalkoot-secondary/8 rounded-full blur-[60px]" />
        {/* Diagonal stripe */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className="anim-hidden">
          <p className={`section-label mb-8 ${isHindi ? 'lang-hi' : ''}`}>{f.sectionLabel}</p>

          {/* Huge quote mark */}
          <Quote className="w-12 h-12 text-kalkoot-primary/30 mx-auto mb-6" />

          <blockquote
            className={`font-body text-xl md:text-2xl text-kalkoot-light/90 leading-relaxed 
                       italic mb-8 ${isHindi ? 'lang-hi lang-hi-serif hindi-lg not-italic' : ''}`}
          >
            {f.quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-kalkoot-primary" />
            <span className={`text-kalkoot-primary font-body font-semibold text-sm ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
              {f.name}
            </span>
            <div className="w-10 h-px bg-kalkoot-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
