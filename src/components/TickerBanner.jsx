import { useLang } from '../contexts/LanguageContext'

export default function TickerBanner() {
  const { t } = useLang()
  const items = t.ticker.items
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="bg-kalkoot-primary/10 border-y border-kalkoot-primary/20 py-3 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-kalkoot-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-kalkoot-dark to-transparent z-10 pointer-events-none" />

      <div className="ticker-wrapper">
        <div className="ticker-content">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-8 text-kalkoot-light/80 font-body text-sm">
              {item}
              <span className="text-kalkoot-primary/40 mx-2">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
