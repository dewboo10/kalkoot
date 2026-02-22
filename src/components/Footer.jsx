import { Link } from 'react-router-dom'
import { Zap, Twitter, Instagram, Youtube, Github } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

export default function Footer() {
  const { t, isHindi } = useLang()
  const f = t.footer
  const nav = t.nav

  const linkMap = {
    platform: [
      { label: f.links.platform.items[0], href: '/rights' },
      { label: f.links.platform.items[1], href: '/documents' },
      { label: f.links.platform.items[2], href: '/officials' },
      { label: f.links.platform.items[3], href: '/tracker' },
    ],
    company: [
      { label: f.links.company.items[0], href: '/about' },
      { label: f.links.company.items[1], href: '/team' },
      { label: f.links.company.items[2], href: '/careers' },
      { label: f.links.company.items[3], href: '/press' },
    ],
    legal: [
      { label: f.links.legal.items[0], href: '/privacy' },
      { label: f.links.legal.items[1], href: '/terms' },
      { label: f.links.legal.items[2], href: '/disclaimer' },
    ],
  }

  return (
    <footer className="bg-kalkoot-navy border-t border-white/5">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-kalkoot-primary rounded-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display text-2xl text-white tracking-wider">KALKOOT</span>
            </Link>
            <p className={`text-kalkoot-primary font-body font-semibold text-sm mb-4 ${isHindi ? 'lang-hi' : ''}`}>
              {f.tagline}
            </p>
            <p className={`text-kalkoot-muted font-body text-sm leading-relaxed mb-6 max-w-xs ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
              {f.disclaimer}
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: 'https://twitter.com/kalkoot_in', label: 'Twitter' },
                { Icon: Instagram, href: 'https://instagram.com/kalkoot_in', label: 'Instagram' },
                { Icon: Youtube, href: 'https://youtube.com/@kalkoot', label: 'YouTube' },
                { Icon: Github, href: 'https://github.com/kalkoot-in', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center
                             text-kalkoot-muted hover:text-white hover:border-kalkoot-primary/40
                             hover:bg-kalkoot-primary/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(linkMap).map(([key, links]) => (
            <div key={key}>
              <h4 className={`text-white font-body font-semibold text-sm mb-4 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
                {f.links[key].title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className={`text-kalkoot-muted hover:text-kalkoot-light font-body text-sm 
                                 transition-colors duration-200 ${isHindi ? 'lang-hi hindi-sm' : ''}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-kalkoot-muted font-body text-xs ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
            {f.copyright}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-kalkoot-muted font-body text-xs">
              {isHindi ? 'सेवा उपलब्ध है' : 'Service available'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
