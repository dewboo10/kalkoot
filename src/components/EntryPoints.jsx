import { Link } from 'react-router-dom'
import { Shield, Building2, Users, ArrowRight } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

const CARD_META = [
  {
    key: 'police',
    icon: Shield,
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/20 hover:border-red-500/50',
    iconColor: 'text-red-400',
    badgeColor: 'bg-red-500/10 text-red-400',
    href: '/start/police',
  },
  {
    key: 'government',
    icon: Building2,
    color: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/20 hover:border-orange-500/50',
    iconColor: 'text-orange-400',
    badgeColor: 'bg-orange-500/10 text-orange-400',
    href: '/start/government',
  },
  {
    key: 'civic',
    icon: Users,
    color: 'from-yellow-500/20 to-yellow-500/5',
    border: 'border-yellow-500/20 hover:border-yellow-500/50',
    iconColor: 'text-yellow-400',
    badgeColor: 'bg-yellow-500/10 text-yellow-400',
    href: '/start/civic',
  },
]

function IssueCard({ meta, data, isHindi, delay }) {
  const ref = useScrollReveal('animate-fade-up')
  const Icon = meta.icon
  return (
    <div ref={ref} className={`anim-hidden ${delay}`}>
      <Link
        to={meta.href}
        className={`group flex flex-col h-full bg-kalkoot-charcoal border ${meta.border}
                    rounded-xl p-7 transition-all duration-300 hover:-translate-y-1
                    hover:shadow-2xl hover:shadow-black/40`}
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.color}
                         flex items-center justify-center mb-5
                         group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${meta.iconColor}`} />
        </div>
        <span className={`inline-flex self-start px-2.5 py-0.5 rounded-full text-xs font-body font-semibold mb-3 ${meta.badgeColor}`}>
          {data.label}
        </span>
        <p className={`text-kalkoot-muted text-sm font-body leading-relaxed mb-5 flex-1 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
          {data.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {data.examples.map((ex, j) => (
            <span key={j} className={`px-2 py-0.5 rounded-full bg-white/5 text-kalkoot-muted text-xs font-body border border-white/5 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
              {ex}
            </span>
          ))}
        </div>
        <div className={`flex items-center gap-2 font-body font-semibold text-sm ${meta.iconColor} group-hover:gap-3 transition-all duration-200 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
          {data.action}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  )
}

export default function EntryPoints() {
  const { t, isHindi } = useLang()
  const e = t.entryPoints
  const titleRef = useScrollReveal('animate-fade-up')
  const delays = ['', 'delay-200', 'delay-400']
  return (
    <section id="start" className="relative bg-kalkoot-dark py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-kalkoot-primary/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="anim-hidden text-center mb-16">
          <p className={`section-label mb-3 ${isHindi ? 'lang-hi' : ''}`}>{e.sectionLabel}</p>
          <h2 className="font-display leading-none mb-4">
            <span className="text-kalkoot-light text-5xl md:text-6xl">{e.title1} </span>
            <span className="text-gradient-fire text-5xl md:text-6xl">{e.title2}</span>
          </h2>
          <p className={`text-kalkoot-muted font-body text-base max-w-xl mx-auto ${isHindi ? 'lang-hi' : ''}`}>
            {e.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {CARD_META.map((meta, i) => (
            <IssueCard key={meta.key} meta={meta} data={e[meta.key]} isHindi={isHindi} delay={delays[i]} />
          ))}
        </div>
        <p className={`text-center text-kalkoot-muted text-sm font-body mt-10 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
          {isHindi ? '⚡ लॉगिन की ज़रूरत नहीं — बस शुरू करें' : '⚡ Login ki zaroorat nahi — bas shuru karo'}
        </p>
      </div>
    </section>
  )
}
