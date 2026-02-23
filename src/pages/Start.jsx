import { useParams } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NyayMitraChat from '../components/NyayMitraChat'

const ISSUE_META = {
  police:     { emoji: '👮', label: 'Police Issue',      labelHi: 'पुलिस का मामला',  color: 'text-red-400',           border: 'border-red-500/20' },
  government: { emoji: '🏛️', label: 'Government Issue', labelHi: 'सरकारी मामला',    color: 'text-kalkoot-primary',   border: 'border-kalkoot-primary/20' },
  civic:      { emoji: '🏙️', label: 'Civic Issue',       labelHi: 'नागरिक मामला',    color: 'text-kalkoot-secondary', border: 'border-kalkoot-secondary/20' },
  general:    { emoji: '⚡',  label: 'New Issue',         labelHi: 'नई समस्या',       color: 'text-white',             border: 'border-white/10' },
}

export default function StartPage() {
  const { type } = useParams()
  const { isHindi } = useLang()
  const issueType = ISSUE_META[type] ? type : 'general'
  const meta = ISSUE_META[issueType]

  return (
    <main className="min-h-screen bg-kalkoot-dark pt-20 pb-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>

        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-kalkoot-muted hover:text-white font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isHindi ? 'वापस जाएँ' : 'Wapas jao'}
          </Link>

          {/* Issue type badge */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${meta.border} bg-white/3`}>
            <span>{meta.emoji}</span>
            <span className={`font-body font-semibold text-xs ${meta.color} ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
              {isHindi ? meta.labelHi : meta.label}
            </span>
          </div>
        </div>

        {/* Chat fills remaining height */}
        <div className="flex-1 min-h-0">
          <NyayMitraChat issueType={issueType} />
        </div>

      </div>
    </main>
  )
}
