import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'

export default function NotFound() {
  const { isHindi } = useLang()
  return (
    <main className="min-h-screen bg-kalkoot-dark flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-[8rem] text-kalkoot-primary/20 leading-none select-none">404</p>
        <h1 className="font-display text-4xl text-white mb-3 -mt-6">
          {isHindi ? 'पेज नहीं मिला' : 'Page nahi mila'}
        </h1>
        <p className={`text-kalkoot-muted font-body text-sm mb-8 ${isHindi ? 'lang-hi' : ''}`}>
          {isHindi
            ? 'यह पेज मौजूद नहीं है। वापस जाएँ।'
            : 'Yeh page maujood nahi hai. Wapas jao.'}
        </p>
        <Link to="/" className="btn-primary">
          {isHindi ? 'होम पर जाएँ' : 'Home par jao'}
        </Link>
      </div>
    </main>
  )
}
