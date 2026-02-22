import { useLang } from '../contexts/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function StatItem({ item, isHindi, index }) {
  const ref = useScrollReveal('animate-fade-up')
  return (
    <div ref={ref} className="anim-hidden text-center group" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="font-display text-4xl md:text-5xl text-gradient-fire mb-2
                      group-hover:scale-110 transition-transform duration-300 inline-block">
        {item.value}
      </div>
      <p className={`text-kalkoot-muted font-body text-sm ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
        {item.label}
      </p>
    </div>
  )
}

export default function StatsSection() {
  const { t, isHindi } = useLang()
  const s = t.stats
  const labelRef = useScrollReveal('animate-fade-up')
  return (
    <section className="relative bg-kalkoot-dark py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kalkoot-primary to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kalkoot-primary/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[300px] bg-kalkoot-primary/5 blur-[100px] rounded-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p ref={labelRef} className={`anim-hidden section-label text-center mb-12 ${isHindi ? 'lang-hi' : ''}`}>
          {s.sectionLabel}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {s.items.map((item, i) => (
            <StatItem key={i} item={item} isHindi={isHindi} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
