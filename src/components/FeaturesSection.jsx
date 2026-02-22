import { useLang } from '../contexts/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Step({ step, isHindi, index }) {
  const ref = useScrollReveal('animate-slide-right')
  return (
    <div ref={ref} className="anim-hidden flex gap-8 group" style={{ animationDelay: `${index * 120}ms` }}>
      <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-full border-2 border-kalkoot-primary/40
                      flex items-center justify-center bg-kalkoot-dark
                      group-hover:border-kalkoot-primary group-hover:bg-kalkoot-primary/10
                      transition-all duration-300 relative z-10">
        <span className="font-display text-kalkoot-primary text-xl">{step.num}</span>
      </div>
      <div className="flex-1 py-3">
        <h3 className={`font-body font-bold text-white text-xl mb-2
                       group-hover:text-kalkoot-secondary transition-colors duration-200
                       ${isHindi ? 'lang-hi' : ''}`}>
          {step.title}
        </h3>
        <p className={`text-kalkoot-muted font-body text-base leading-relaxed max-w-2xl ${isHindi ? 'lang-hi' : ''}`}>
          {step.desc}
        </p>
      </div>
      <div className="hidden lg:flex items-center">
        <div className="w-16 h-px bg-white/5 group-hover:bg-kalkoot-primary/30 transition-colors" />
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const { t, isHindi } = useLang()
  const f = t.features
  const titleRef = useScrollReveal('animate-fade-up')
  return (
    <section id="how-it-works" className="relative bg-kalkoot-navy py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-96 bg-kalkoot-secondary/5 blur-[80px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="anim-hidden mb-16">
          <p className={`section-label mb-3 ${isHindi ? 'lang-hi' : ''}`}>{f.sectionLabel}</p>
          <h2 className="font-display leading-none">
            <span className="text-kalkoot-light text-5xl md:text-6xl block">{f.title1}</span>
            <span className="text-gradient-fire text-5xl md:text-6xl block">{f.title2}</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-[2.2rem] top-0 bottom-0 w-px bg-gradient-to-b from-kalkoot-primary via-kalkoot-secondary to-transparent hidden md:block" />
          <div className="space-y-8">
            {f.steps.map((step, i) => (
              <Step key={i} step={step} isHindi={isHindi} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
