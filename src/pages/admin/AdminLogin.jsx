import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Lock, Mail, LogIn, AlertCircle, ShieldCheck, ChevronLeft } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { useLanguage } from '../../context/LanguageContext'

const AdminLogin = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await signIn({ email, password })
      if (signInError) throw signInError

      // After a successful login, we need to check if the user is an admin
      // This logic depends on AuthContext fetching the profile
      // We'll wait a brief moment for the profile to load or use a direct check
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw profileError

      if (profileData?.role !== 'admin') {
        const { error: signOutError } = await signOut()
        throw new Error(t('admin.login.accessDenied'))
      }

      navigate('/admin')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg relative z-10 space-y-4">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('admin.login.backToLibrary')}
        </Link>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-8 md:p-10 rounded-[3rem] shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/20 text-primary mb-1">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-3xl font-black text-white tracking-tight">{t('admin.login.title')}</h1>
              <p className="text-white/40 text-sm font-medium">{t('admin.login.subtitle')}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 text-red-400 text-sm">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40 ml-4">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:bg-white/10 focus:border-primary/50 text-white transition-all font-bold placeholder:text-white/10 text-sm"
                  placeholder="admin@exemplo.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40 ml-4">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:bg-white/10 focus:border-primary/50 text-white transition-all font-bold placeholder:text-white/10 text-sm"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm relative mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} strokeWidth={3} /> {t('admin.login.authorize')}
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default AdminLogin
