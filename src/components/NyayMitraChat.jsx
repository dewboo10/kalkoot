import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, RefreshCw, AlertCircle, Loader2, Copy, Check, Zap } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function renderMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^(\d+)\. /gm, '<span class="text-kalkoot-primary font-semibold">$1.</span> ')
    .replace(/^- /gm, '<span class="text-kalkoot-primary">•</span> ')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
}

function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false)
  const isAI = msg.role === 'assistant'
  const copy = () => { navigator.clipboard.writeText(msg.content); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-kalkoot-primary/15 border border-kalkoot-primary/30 flex items-center justify-center mt-1">
          <Zap className="w-4 h-4 text-kalkoot-primary" />
        </div>
      )}
      <div className={`group max-w-[85%] ${isAI ? '' : 'ml-auto'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm font-body leading-relaxed ${isAI ? 'bg-kalkoot-charcoal border border-white/6 text-kalkoot-light rounded-tl-sm' : 'bg-kalkoot-primary text-white rounded-tr-sm'}`}>
          {isAI
            ? <div dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }} />
            : <p>{msg.content}</p>}
          {msg.streaming && <span className="inline-block w-1.5 h-4 bg-kalkoot-primary/70 ml-1 animate-pulse rounded-sm" />}
        </div>
        {isAI && !msg.streaming && (
          <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-1 text-kalkoot-muted hover:text-white text-xs font-body px-1">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  )
}

const QUICK_REPLIES = {
  police:     { hi: ['FIR नहीं ली', 'झूठा मामला', 'पुलिस ने मारा', 'गिरफ्तारी का डर'], hinglish: ['FIR nahi li', 'Jhoota maamla', 'Police ne maara', 'Giraftari ka dar'] },
  government: { hi: ['रिश्वत माँगी', 'काम नहीं होता', 'RTI कैसे करें', 'दस्तावेज़ खोया'], hinglish: ['Rishwat maangi', 'Kaam nahi hota', 'RTI kaise karen', 'Document khoya'] },
  civic:      { hi: ['बिजली नहीं आती', 'सड़क टूटी है', 'पानी की समस्या', 'सफाई नहीं होती'], hinglish: ['Bijli nahi aati', 'Sadak tooti hai', 'Paani ki problem', 'Safai nahi hoti'] },
  general:    { hi: ['पुलिस से समस्या', 'सरकारी काम अटका', 'उपभोक्ता शिकायत', 'मजदूरी नहीं मिली'], hinglish: ['Police se problem', 'Sarkari kaam atka', 'Consumer complaint', 'Majdoori nahi mili'] },
}

export default function NyayMitraChat({ issueType = 'general' }) {
  const { isHindi, lang } = useLang()
  const langKey = isHindi ? 'hi' : 'hinglish'
  const [messages, setMessages]   = useState([])
  const [input, setInput]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]         = useState(null)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)
  const abortRef  = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  useEffect(() => {
    loadGreeting()
    return () => abortRef.current?.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueType, lang])

  async function loadGreeting() {
    try {
      const res = await fetch(`${API_BASE}/api/chat/greeting?issueType=${issueType}&lang=${lang}`)
      const data = await res.json()
      setMessages([{ role: 'assistant', content: data.message }])
    } catch {
      setMessages([{ role: 'assistant', content: isHindi ? 'नमस्ते! मैं न्याय मित्र हूँ। आपकी क्या समस्या है?' : 'Namaste! Main Nyay Mitra hoon. Aapki kya samasya hai?' }])
    }
  }

  const sendMessage = useCallback(async (text) => {
    const userText = text || input.trim()
    if (!userText || isLoading) return
    setInput(''); setError(null); setShowQuick(false); setIsLoading(true)
    const userMsg = { role: 'user', content: userText }
    setMessages(prev => [...prev, userMsg])
    const history = messages.map(m => ({ role: m.role, content: m.content }))
    const aiMsgId = Date.now()
    setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true, id: aiMsgId }])

    try {
      const controller = new AbortController()
      abortRef.current = controller
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ message: userText, history, issueType, lang, stream: true }),
      })
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.errorHi || e.error || 'Error') }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (!line.startsWith('data: ')) continue
          try {
            const json = JSON.parse(line.slice(6))
            if (json.type === 'delta' && json.text) {
              accumulated += json.text
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: accumulated } : m))
            }
            if (json.type === 'done') {
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, streaming: false } : m))
            }
          } catch { /* incomplete chunk */ }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(isHindi ? 'कुछ गलत हुआ। दोबारा कोशिश करें।' : 'Kuch galat hua. Dobara koshish karo.')
      setMessages(prev => prev.filter(m => m.id !== aiMsgId))
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }, [input, isLoading, messages, issueType, lang, isHindi])

  function handleKeyDown(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  function resetChat() {
    abortRef.current?.abort()
    setMessages([]); setInput(''); setError(null); setShowQuick(true); setIsLoading(false)
    setTimeout(loadGreeting, 100)
  }

  const quickReplies = QUICK_REPLIES[issueType]?.[langKey] || QUICK_REPLIES.general[langKey]

  return (
    <div className="flex flex-col h-full bg-kalkoot-navy rounded-xl border border-white/8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-kalkoot-charcoal">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-kalkoot-primary/15 border border-kalkoot-primary/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-kalkoot-primary" />
          </div>
          <div>
            <p className="text-white font-body font-semibold text-sm">न्याय मित्र</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-body">{isHindi ? 'उपलब्ध है' : 'Online'}</span>
            </div>
          </div>
        </div>
        <button onClick={resetChat} className="p-1.5 rounded-lg text-kalkoot-muted hover:text-white hover:bg-white/5 transition-all">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, i) => <MessageBubble key={msg.id || i} msg={msg} />)}
        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 text-sm font-body">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
          </div>
        )}
        {showQuick && messages.length === 1 && (
          <div className="pt-2">
            <p className={`text-kalkoot-muted text-xs font-body mb-2 ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
              {isHindi ? 'या इनमें से चुनें:' : 'Ya in mein se chuno:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, i) => (
                <button key={i} onClick={() => sendMessage(reply)}
                  className={`px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-kalkoot-light/80 hover:border-kalkoot-primary/40 hover:bg-kalkoot-primary/10 hover:text-white text-xs font-body transition-all ${isHindi ? 'lang-hi hindi-sm' : ''}`}>
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-1.5 border-t border-white/5 bg-kalkoot-dark/40">
        <p className={`text-kalkoot-muted/60 text-[10px] font-body text-center ${isHindi ? 'lang-hi' : ''}`}>
          {isHindi ? '⚠️ यह legal advice नहीं है। गंभीर मामलों में वकील से मिलें।' : '⚠️ Yeh legal advice nahi hai. Serious matters mein vakeel se milo.'}
        </p>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/6 bg-kalkoot-charcoal">
        <div className="flex gap-2 items-end">
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            disabled={isLoading} rows={1} placeholder={isHindi ? 'अपनी समस्या लिखें...' : 'Apni samasya likho...'}
            className={`flex-1 bg-kalkoot-navy border border-white/10 rounded-xl px-4 py-2.5 text-white font-body text-sm placeholder-kalkoot-muted/60 resize-none focus:outline-none focus:border-kalkoot-primary/50 transition-colors disabled:opacity-50 max-h-32 leading-relaxed ${isHindi ? 'lang-hi' : ''}`}
            style={{ minHeight: '42px' }}
            onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px' }}
          />
          <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-kalkoot-primary disabled:opacity-40 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center">
            {isLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
          </button>
        </div>
        <p className="text-kalkoot-muted/50 text-[10px] font-body mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}