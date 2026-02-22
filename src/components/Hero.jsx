import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Shield, FileText, TrendingUp } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const raw = target.replace(/[^0-9]/g, '')
    const end = parseInt(raw, 10)
    if (isNaN(end)) { el.textContent = target; return }
    let start = 0
    const duration = 2000
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(eased * end).toLocaleString('en-IN') + (progress === 1 ? suffix : '')
    }
    const frame = (ts) => {
      step(ts)
      if ((Date.now() - (start || Date.now())) < duration + 100) requestAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { requestAnimationFrame(frame); observer.disconnect() }
    })
    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  return <span ref={ref}>{target}</span>
}

export default function Hero() {
  const { t, isHindi } = useLang()
  const h = t.hero

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-kalkoot-dark">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-kalkoot-dark via-kalkoot-navy/60 to-kalkoot-dark pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-kalkoot-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-kalkoot-secondary/5 blur-[100px] pointer-events-none" />

      {/* Diagonal accent bar */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-kalkoot-primary via-kalkoot-secondary to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Content ─────────────────────────── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-kalkoot-primary/10 border border-kalkoot-primary/25 
                            rounded-full px-4 py-1.5 mb-8 anim-hidden animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-kalkoot-primary animate-ping" />
              <span className={`text-kalkoot-primary text-xs font-body font-semibold tracking-wide uppercase ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
                {h.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="leading-none mb-6 anim-hidden animate-fade-up delay-100">
              {/* "AB" */}
              <span className="block font-display text-[clamp(4rem,10vw,9rem)] text-kalkoot-light tracking-wider">
                {h.headline1}
              </span>
              {/* "NAHIN" — fire gradient */}
              <span className="block font-display text-[clamp(4rem,10vw,9rem)] text-gradient-fire tracking-wider -mt-4">
                {h.headline2}
              </span>
              {/* "SAHENGE" */}
              <span className="block font-display text-[clamp(4rem,10vw,9rem)] text-kalkoot-light tracking-wider -mt-4">
                {h.headline3}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className={`text-kalkoot-secondary font-body font-semibold text-lg mb-4 
                          anim-hidden animate-fade-up delay-200
                          ${isHindi ? 'lang-hi' : ''}`}>
              {h.subHeadline}
            </p>

            {/* Description */}
            <p className={`text-kalkoot-muted font-body text-base leading-relaxed max-w-xl mb-10
                          anim-hidden animate-fade-up delay-300
                          ${isHindi ? 'lang-hi' : ''}`}>
              {h.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14 anim-hidden animate-fade-up delay-400">
              <Link
                to="/start"
                className="btn-primary glow-cta flex items-center gap-2 text-base"
              >
                {h.cta1}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="btn-secondary flex items-center gap-2 text-base"
              >
                {h.cta2}
              </a>
            </div>

            {/* Counter bar */}
            <div className="flex flex-wrap gap-8 anim-hidden animate-fade-up delay-500">
              {[
                { icon: <Shield className="w-4 h-4" />, value: '50,000', suffix: '+', label: h.counterCases },
                { icon: <FileText className="w-4 h-4" />, value: '100000', suffix: '+', label: h.counterDocs },
                { icon: <TrendingUp className="w-4 h-4" />, value: '10000', suffix: '+', label: h.counterWins },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-kalkoot-primary">{stat.icon}</span>
                  <div>
                    <div className="font-display text-2xl text-white tracking-wide">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className={`text-kalkoot-muted text-xs font-body ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Visual Card ──────────────────────── */}
          <div className="hidden lg:flex justify-end anim-hidden animate-fade-up delay-300">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="bg-kalkoot-charcoal border border-white/8 rounded-2xl p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-kalkoot-primary/15 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-kalkoot-primary" />
                  </div>
                  <div>
                    <p className="text-white font-body font-semibold text-sm">Nyay Mitra</p>
                    <p className="text-kalkoot-muted text-xs font-body">न्याय मित्र — AI Legal Guide</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-green-400 text-xs font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </span>
                </div>

                {/* Chat bubbles */}
                <div className="space-y-3 mb-6">
                  <div className="bg-kalkoot-navy rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-white/90 text-sm font-body leading-relaxed">
                      नमस्ते! आपकी क्या समस्या है? बिना किसी डर के बताएँ।
                    </p>
                  </div>
                  <div className="bg-kalkoot-primary/15 border border-kalkoot-primary/20 rounded-xl rounded-tr-sm px-4 py-3 max-w-[85%] ml-auto">
                    <p className="text-white/90 text-sm font-body leading-relaxed">
                      Police ne FIR likhne se mana kar diya...
                    </p>
                  </div>
                  <div className="bg-kalkoot-navy rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-white/90 text-sm font-body leading-relaxed">
                      समझ गया। Section 154 CrPC के तहत आपका अधिकार है कि FIR दर्ज हो। मैं आपके लिए SP को आवेदन तैयार करता हूँ।
                    </p>
                  </div>
                </div>

                {/* Action chips */}
                <div className="flex flex-wrap gap-2">
                  {['FIR शिकायत', 'RTI अर्जी', 'SC/ST Act'].map(chip => (
                    <span key={chip} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 
                                               text-kalkoot-muted text-xs font-body hover:border-kalkoot-primary/40 
                                               hover:text-white cursor-pointer transition-all">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-kalkoot-secondary text-kalkoot-dark 
                              font-body font-bold text-xs px-3 py-1.5 rounded-full shadow-lg z-20">
                ✊ 100% Free
              </div>
              <div className="absolute -bottom-4 -left-4 bg-kalkoot-charcoal border border-white/10 
                              text-white font-body text-xs px-3 py-2 rounded-lg shadow-lg z-20 flex items-center gap-2">
                <span className="text-green-400 text-base">🔒</span>
                End-to-End Encrypted
              </div>

              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-kalkoot-primary/10 
                              to-transparent pointer-events-none z-0 -m-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 
                      text-kalkoot-muted text-xs font-body animate-bounce">
        <span className={isHindi ? 'lang-hi hindi-sm' : ''}>{h.scroll}</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}
