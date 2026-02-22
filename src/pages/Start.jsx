import { useParams } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'

const ISSUE_META = {
  police:     { emoji: '👮', label: 'Police Issue',      labelHi: 'पुलिस का मामला' },
  government: { emoji: '🏛️', label: 'Government Issue', labelHi: 'सरकारी मामला' },
  civic:      { emoji: '🏙️', label: 'Civic Issue',       labelHi: 'नागरिक मामला' },
}

export default function StartPage() {
  const { type } = useParams()
  const { isHindi } = useLang()
  const meta = ISSUE_META[type] || { emoji: '⚡', label: 'New Issue', labelHi: 'नई समस्या' }

  return (
    <main className="min-h-screen bg-kalkoot-dark pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-kalkoot-muted hover:text-white 
                                font-body text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {isHindi ? 'वापस जाएँ' : 'Wapas jao'}
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">{meta.emoji}</div>
          <h1 className={`font-display text-4xl text-white mb-2 ${isHindi ? '' : 'tracking-wider'}`}>
            {isHindi ? meta.labelHi : meta.label}
          </h1>
          <p className={`text-kalkoot-muted font-body text-sm ${isHindi ? 'lang-hi' : ''}`}>
            {isHindi
              ? 'यह सुविधा जल्द ही उपलब्ध होगी। हमारा AI न्याय मित्र तैयार हो रहा है।'
              : 'Yeh feature jald available hoga. Hamara AI Nyay Mitra taiyaar ho raha hai.'}
          </p>
        </div>

        {/* Coming soon card */}
        <div className="bg-kalkoot-charcoal border border-kalkoot-primary/20 rounded-xl p-8 text-center">
          <div className="w-14 h-14 bg-kalkoot-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-kalkoot-primary" />
          </div>
          <h2 className={`font-body font-bold text-white text-xl mb-3 ${isHindi ? 'lang-hi' : ''}`}>
            {isHindi ? 'न्याय मित्र आ रहा है' : 'Nyay Mitra aa raha hai'}
          </h2>
          <p className={`text-kalkoot-muted font-body text-sm leading-relaxed mb-6 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
            {isHindi
              ? 'हमारी AI प्रणाली निर्माणाधीन है। जब तैयार होगी, आप सीधे यहाँ से अपना मामला दर्ज कर सकेंगे।'
              : 'Hamara AI system nirmaanadheen hai. Jab taiyaar hoga, aap seedha yahan se apna maamla darj kar sakenge.'}
          </p>
          {/* Notify form placeholder */}
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder={isHindi ? 'आपका ईमेल' : 'Aapka email'}
              className="flex-1 bg-kalkoot-navy border border-white/10 rounded-sm px-4 py-2.5 
                         text-white font-body text-sm placeholder-kalkoot-muted 
                         focus:outline-none focus:border-kalkoot-primary/50 transition-colors"
            />
            <button className="btn-primary text-sm whitespace-nowrap">
              {isHindi ? 'सूचित करें' : 'Notify Karo'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
