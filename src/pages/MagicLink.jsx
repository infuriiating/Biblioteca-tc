import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Mail, AlertCircle, CheckCircle2, ArrowLeft, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logo from '../assets/logo.png'

const MagicLink = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    })

    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="bg-bg-surface border border-border/60 rounded-3xl shadow-sm p-7 space-y-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
              <Zap size={18} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-text-main">Acesso por link</h1>
              <p className="text-xs text-text-muted mt-0.5">Sem password — aceda pelo seu email</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/8 border border-red-400/20 p-3 rounded-xl flex items-start gap-2.5 text-red-400 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p className="font-normal leading-snug">{error}</p>
            </div>
          )}

          {sent ? (
            <div className="space-y-4">
              <div className="bg-green-500/8 border border-green-400/20 p-4 rounded-xl flex items-start gap-3 text-green-400">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Link enviado!</p>
                  <p className="text-xs mt-1 text-green-400/80">
                    Verifique a sua caixa de entrada em <strong>{email}</strong>. Clique no link para entrar instantaneamente.
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="w-full bg-bg-main border border-border/60 text-text-muted py-3 rounded-xl text-sm font-medium hover:bg-bg-surface transition-all"
              >
                Reenviar link
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted ml-1">{t('auth.emailLabel')}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-bg-main border border-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 transition-all text-text-main placeholder:text-text-muted/60"
                    placeholder={t('auth.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-xl font-medium text-sm shadow-sm hover:bg-yellow-400 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Zap size={16} /> Enviar link mágico</>
                )}
              </button>
            </form>
          )}

          <Link to="/entrar" className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Voltar ao início de sessão
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MagicLink
