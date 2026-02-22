import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

export default function Navbar() {
  const { t, toggleLang, isHindi } = useLang()
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const navItems = [
    { href: '/rights',     label: t.nav.rights },
    { href: '/documents',  label: t.nav.documents },
    { href: '/officials',  label: t.nav.officials },
    { href: '/tracker',    label: t.nav.tracker },
    { href: '/community',  label: t.nav.community },
    { href: '/about',      label: t.nav.about },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-kalkoot-dark/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-kalkoot-primary rounded-sm flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span
                className={`font-display text-2xl text-white tracking-wider leading-none ${
                  isHindi ? 'lang-hi lang-hi-serif text-xl' : ''
                }`}
              >
                {t.nav.brand}
              </span>
              <p className={`text-kalkoot-primary text-[10px] font-body font-semibold tracking-[0.15em] uppercase leading-none mt-0.5 ${isHindi ? 'lang-hi text-[9px]' : ''}`}>
                {t.nav.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link px-3 py-2 ${isHindi ? 'lang-hi hindi-sm' : ''} ${
                  location.pathname === item.href ? 'text-kalkoot-light' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 
                         text-kalkoot-muted hover:text-white hover:border-white/25 
                         transition-all duration-200 text-xs font-body font-medium"
              aria-label="Toggle language"
            >
              <span className="text-base">{isHindi ? '🇮🇳' : '🔤'}</span>
              {t.nav.langToggle}
            </button>

            <Link to="/start" className="btn-primary text-sm glow-cta">
              {t.nav.startNow}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded border border-white/10 text-kalkoot-muted text-xs"
            >
              {isHindi ? 'Eng' : 'हि'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-kalkoot-navy border-t border-white/5 mt-2">
          <div className="px-4 py-4 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-3 rounded-sm text-kalkoot-muted hover:text-white 
                            hover:bg-white/5 transition-colors font-body text-sm
                            ${isHindi ? 'lang-hi' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 pb-1">
              <Link to="/start" className="btn-primary w-full text-center block text-sm">
                {t.nav.startNow}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
