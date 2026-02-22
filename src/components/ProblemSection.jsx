import { useLang } from '../contexts/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function SituationCard({ icon, title, desc, isHindi, delay }) {
  const ref = useScrollReveal('animate-fade-up')
  return (
    <div
      ref={ref}
      className={`anim-hidden card-dark group cursor-default ${delay}`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className={`font-body font-semibold text-white mb-2 ${isHindi ? 'lang-hi' : ''}`}>
        {title}
      </h3>
      <p className={`text-kalkoot-muted text-sm leading-relaxed font-body group-hover:text-kalkoot-light/70 transition-colors ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
        {desc}
      </p>
      <div className="mt-4 w-8 h-0.5 bg-kalkoot-primary/40 group-hover:w-16 group-hover:bg-kalkoot-primary transition-all duration-300" />
    </div>
  )
}

export default function ProblemSection() {
  const { t, isHindi } = useLang()
  const p = t.problems
  const titleRef = useScrollReveal('animate-fade-up')
  const delays = ['', 'delay-100', 'delay-200', 'delay-100', 'delay-200', 'delay-300']

  return (
    <section className="relative bg-kalkoot-navy py-24 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50 pointer-events-none" />
      {/* Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-kalkoot-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="anim-hidden mb-16 max-w-3xl">
          <p className={`section-label mb-3 ${isHindi ? 'lang-hi' : ''}`}>{p.sectionLabel}</p>
          <h2 className="font-display leading-none mb-4">
            <span className="text-kalkoot-light text-5xl md:text-6xl block">{p.title1}</span>
            <span className="text-gradient-fire text-5xl md:text-6xl block">{p.title2}</span>
          </h2>
          <p className={`text-kalkoot-muted font-body text-base leading-relaxed ${isHindi ? 'lang-hi' : ''}`}>
            {p.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {p.situations.map((s, i) => (
            <SituationCard
              key={i}
              {...s}
              isHindi={isHindi}
              delay={delays[i] || ''}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/5" />
          <p className={`text-kalkoot-muted text-sm font-body text-center max-w-lg ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
            {isHindi
              ? 'यह अक्षमता नहीं है — यह एक सत्ता संरचना है। KALKOOT इसे बदलने आया है।'
              : 'Yeh nakaamibi nahi hai — yeh ek power structure hai. KALKOOT isse badalne aaya hai.'}
          </p>
          <div className="flex-1 h-px bg-white/5" />
        </div>
      </div>
    </section>
  )
}
