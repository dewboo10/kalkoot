import { Link } from 'react-router-dom'
import { Construction, ArrowLeft } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

/**
 * Generic placeholder page.
 * Props: title (string), subtitle (string)
 */
export default function PlaceholderPage({ title, subtitle }) {
  const { isHindi } = useLang()

  return (
    <main className="min-h-screen bg-kalkoot-dark flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-xl">
        <div className="w-20 h-20 bg-kalkoot-primary/10 border border-kalkoot-primary/20 rounded-2xl 
                        flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-kalkoot-primary" />
        </div>

        <h1 className={`font-display text-5xl text-white mb-4 ${isHindi ? '' : 'tracking-wider'}`}>
          {title}
        </h1>

        <p className={`text-kalkoot-muted font-body text-base mb-8 leading-relaxed ${isHindi ? 'lang-hi' : ''}`}>
          {subtitle || (isHindi
            ? 'यह पेज जल्द ही आएगा। हम इस पर काम कर रहे हैं।'
            : 'Yeh page jald aayega. Hum iss par kaam kar rahe hain.'
          )}
        </p>

        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {isHindi ? 'होम पेज पर जाएँ' : 'Home Page par jao'}
        </Link>
      </div>
    </main>
  )
}
