import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { User, Sun, Moon, LogOut, Save, Check, Settings as SettingsIcon, Shield, Globe, MessageSquare, Send, X } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useLanguage } from '../context/LanguageContext'
import { useNotification } from '../context/NotificationContext'
import Select from '../components/ui/Select'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Settings = () => {
  const { user, profile, signOut, isAdmin } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const navigate = useNavigate()

  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  // Name
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Notification & Feedback
  const { showToast } = useNotification()
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  useEffect(() => {
    if (profile?.full_name) setDisplayName(profile.full_name)
  }, [profile])

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light'
    
    if (currentTheme === theme) return

    const applyTheme = () => {
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
    }

    if (!document.startViewTransition) {
      applyTheme()
    } else {
      document.startViewTransition(() => {
        applyTheme()
      })
    }
  }, [theme])

  const handleSaveName = async () => {
    if (!user) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: displayName })
      .eq('id', user.id)
    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  const handleSendFeedback = async () => {
    if (!feedbackText.trim() || !user) return
    setIsSubmittingFeedback(true)
    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      message: feedbackText.trim()
    })
    setIsSubmittingFeedback(false)
    
    if (error) {
       console.error(error)
       showToast('Erro ao enviar feedback', 'danger')
    } else {
       showToast('Obrigado pelo seu feedback!', 'success')
       setFeedbackText('')
       setShowFeedback(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-1 mb-10">
        <h1 className="text-4xl font-black text-text-main tracking-tight">{t('settings.title')}</h1>
        <p className="text-text-muted text-lg font-medium mt-1">{t('settings.subtitle')}</p>
      </div>

      {/* Profile Section */}
      {user && (
        <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <User size={18} className="text-primary" />
              <h2 className="font-bold text-text-main">{t('settings.profile')}</h2>
            </div>
          </div>
          <div className="px-8 py-6 space-y-5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted block mb-2">
                {t('settings.name')}
              </label>
              <div className="bg-bg-main/40 border border-border/40 rounded-2xl px-5 py-4 text-text-muted font-medium text-sm cursor-not-allowed select-none">
                {user?.user_metadata?.full_name || user?.user_metadata?.display_name || user?.user_metadata?.username || profile?.name || 'Utilizador'}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted block mb-2">
                {t('settings.email')}
              </label>
              <div className="bg-bg-main/60 border border-border/50 rounded-2xl px-5 py-4 text-text-muted font-medium text-sm">
                {user?.email || '—'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appearance Section */}
      <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm">
        <div className="px-8 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Sun size={18} className="text-primary" />
            <h2 className="font-bold text-text-main">{t('settings.appearance')}</h2>
          </div>
        </div>
        {/* Language Selection */}
        <div className="px-8 py-6 border-b border-border/50">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted mb-4">{t('settings.languageSection')}</p>
          <Select 
            options={[
              { id: 'pt', name: 'Português (PT)' },
              { id: 'en', name: 'English (EN)' },
              { id: 'es', name: 'Español (ES)' },
              { id: 'fr', name: 'Français (FR)' },
              { id: 'de', name: 'Deutsch (DE)' },
              { id: 'nl', name: 'Nederlands (NL)' }
            ]}
            value={language}
            onChange={(val) => setLanguage(val)}
          />
        </div>

        <div className="px-8 py-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted mb-4">{t('settings.theme')}</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Light */}
            <button
              onClick={() => setTheme('light')}
              className={cn(
                "relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all",
                theme === 'light'
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30 bg-bg-main/30"
              )}
            >
              <div className="w-full aspect-[3/2] bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm flex gap-1 p-1.5">
                <div className="w-1/4 bg-gray-100 rounded-lg h-full" />
                <div className="flex-1 space-y-1.5 py-1">
                  <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-1/2" />
                  <div className="h-2 bg-gray-100 rounded-full w-2/3" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun size={14} className={theme === 'light' ? 'text-primary' : 'text-text-muted'} />
                <span className={cn("text-sm font-bold", theme === 'light' ? 'text-primary' : 'text-text-muted')}>
                  {t('settings.light')}
                </span>
              </div>
              {theme === 'light' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>

            {/* Dark */}
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                "relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all",
                theme === 'dark'
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30 bg-bg-main/30"
              )}
            >
              <div className="w-full aspect-[3/2] bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden shadow-sm flex gap-1 p-1.5">
                <div className="w-1/4 bg-[#1e293b] rounded-lg h-full" />
                <div className="flex-1 space-y-1.5 py-1">
                  <div className="h-2 bg-[#334155] rounded-full w-3/4" />
                  <div className="h-2 bg-[#1e293b] rounded-full w-1/2" />
                  <div className="h-2 bg-[#1e293b] rounded-full w-2/3" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Moon size={14} className={theme === 'dark' ? 'text-primary' : 'text-text-muted'} />
                <span className={cn("text-sm font-bold", theme === 'dark' ? 'text-primary' : 'text-text-muted')}>
                  {t('settings.dark')}
                </span>
              </div>
              {theme === 'dark' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>


      {/* Feedback Section */}
      {user && (
        <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden mb-6">
          <div className="px-8 py-5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className="text-primary" />
              <h2 className="font-bold text-text-main">Enviar Feedback</h2>
            </div>
          </div>
          <div className="px-8 py-6">
            {!showFeedback ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main text-sm">Problemas ou Sugestões?</p>
                  <p className="text-text-muted text-xs mt-0.5">Ajude-nos a melhorar a plataforma descrevendo a sua experiência.</p>
                </div>
                <button
                  onClick={() => setShowFeedback(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-2xl font-bold text-sm transition-all active:scale-95"
                >
                  <MessageSquare size={15} />
                  Escrever
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Descreva o problema que encontrou ou a sua sugestão de melhoria..."
                  className="w-full bg-bg-main/50 border border-border/50 rounded-2xl p-4 text-sm text-text-main resize-none focus:outline-none focus:border-primary/50 transition-colors min-h-[120px]"
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => { setShowFeedback(false); setFeedbackText(''); }}
                    className="flex items-center gap-2 px-5 py-2.5 text-text-muted hover:text-text-main font-bold text-sm transition-colors"
                  >
                    <X size={15} />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSendFeedback}
                    disabled={isSubmittingFeedback || !feedbackText.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white hover:bg-primary-hover rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                  >
                    {isSubmittingFeedback ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                    Enviar Feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Account Section */}
      {user && (
        <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <LogOut size={18} className="text-accent" />
              <h2 className="font-bold text-text-main">{t('settings.account')}</h2>
            </div>
          </div>
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-text-main text-sm">{t('settings.signOutTitle')}</p>
              <p className="text-text-muted text-xs mt-0.5">{t('settings.signOutDesc')}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl font-bold text-sm transition-all active:scale-95"
            >
              <LogOut size={15} />
              {t('settings.logoutBtn')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
