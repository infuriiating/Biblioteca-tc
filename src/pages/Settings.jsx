import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { User, Sun, Moon, LogOut, Check, Shield, MessageSquare, Send, X, Mail } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useLanguage } from '../context/LanguageContext'
import { useNotification } from '../context/NotificationContext'
import Select from '../components/ui/Select'
import PageHeader from '../components/ui/PageHeader'
import SettingsPanel from '../components/ui/SettingsPanel'

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
  const [newsletterEnabled, setNewsletterEnabled] = useState(true)
  const [newsletterCats, setNewsletterCats] = useState(['books', 'history', 'philosophy', 'world'])
  const [savingNewsletter, setSavingNewsletter] = useState(false)
  const [weeklyPicksEnabled, setWeeklyPicksEnabled] = useState(true)
  const NEWSLETTER_OPTIONS = [
    { id: 'books', labelKey: 'settings.newsletter.catBooks' },
    { id: 'history', labelKey: 'settings.newsletter.catHistory' },
    { id: 'philosophy', labelKey: 'settings.newsletter.catPhilosophy' },
    { id: 'world', labelKey: 'settings.newsletter.catWorld' },
  ]

  useEffect(() => {
    if (!user) return
    supabase
      .from('newsletter_preferences')
      .select('enabled, categories, weekly_picks_enabled')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setNewsletterEnabled(data.enabled)
          setNewsletterCats(data.categories || newsletterCats)
          if (data.weekly_picks_enabled !== null) setWeeklyPicksEnabled(data.weekly_picks_enabled)
        }
      })
  }, [user])

  const saveNewsletter = async () => {
    if (!user) return
    setSavingNewsletter(true)
    await supabase.from('newsletter_preferences').upsert({
      user_id: user.id,
      enabled: newsletterEnabled,
      categories: newsletterCats,
      weekly_picks_enabled: weeklyPicksEnabled,
      updated_at: new Date().toISOString(),
    })
    setSavingNewsletter(false)
    showToast(t('settings.newsletter.saved'), 'success')
  }

  const toggleNewsletterCat = (id) => {
    setNewsletterCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

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
       showToast(t('settings.feedback.errorToast'), 'danger')
    } else {
       showToast(t('settings.feedback.successToast'), 'success')
       setFeedbackText('')
       setShowFeedback(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full min-w-0 page-stack">
      <PageHeader title={t('settings.title')} subtitle={t('settings.subtitle')} />

      {user && (
        <SettingsPanel icon={User} title={t('settings.profile')}>
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted block mb-2">
                {t('settings.name')}
              </label>
              <div className="bg-surface-container-low border border-outline-variant rounded-lg px-5 py-4 text-on-surface-variant text-body-md cursor-not-allowed select-none">
                {user?.user_metadata?.full_name || user?.user_metadata?.display_name || user?.user_metadata?.username || profile?.name || 'Utilizador'}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted block mb-2">
                {t('settings.email')}
              </label>
              <div className="bg-surface-container-low border border-outline-variant rounded-lg px-5 py-4 text-on-surface-variant text-body-md">
                {user?.email || '—'}
              </div>
            </div>
          </div>
        </SettingsPanel>
      )}

      <SettingsPanel icon={Sun} title={t('settings.appearance')}>
        <div className="space-y-6 pb-6 border-b border-outline-variant mb-6">
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

        <div>
          <p className="text-label-sm text-on-surface-variant mb-4">{t('settings.theme')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light */}
            <button
              onClick={() => setTheme('light')}
              className={cn(
                "relative flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all",
                theme === 'light'
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant hover:border-primary/30 bg-surface-container-low"
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
                "relative flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all",
                theme === 'dark'
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant hover:border-primary/30 bg-surface-container-low"
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
      </SettingsPanel>

      {user && (
        <SettingsPanel icon={Mail} title={t('settings.newsletter.title')}>
          <p className="text-text-muted text-sm mb-4">{t('settings.newsletter.desc')}</p>
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={newsletterEnabled}
              onChange={(e) => setNewsletterEnabled(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-medium">{t('settings.newsletter.enabled')}</span>
          </label>
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={weeklyPicksEnabled}
              onChange={(e) => setWeeklyPicksEnabled(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-medium">{t('settings.newsletter.weeklyPicks')}</span>
          </label>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted mb-2">
            {t('settings.newsletter.categories')}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {NEWSLETTER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleNewsletterCat(opt.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-bold border transition-colors',
                  newsletterCats.includes(opt.id)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-outline-variant text-text-muted'
                )}
              >
                {t(opt.labelKey)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={saveNewsletter}
            disabled={savingNewsletter}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold disabled:opacity-50"
          >
            {t('settings.newsletter.save')}
          </button>
        </SettingsPanel>
      )}

      {user && (
        <SettingsPanel icon={MessageSquare} title={t('settings.feedback.title')}>
            {!showFeedback ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-main text-sm">{t('settings.feedback.question')}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t('settings.feedback.questionDesc')}</p>
                  </div>
                  <button
                    onClick={() => setShowFeedback(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-2xl font-bold text-sm transition-all active:scale-95 shrink-0"
                  >
                    <MessageSquare size={15} />
                    {t('settings.feedback.writeBtn')}
                  </button>
                </div>

                {isAdmin && (
                  <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-main text-sm flex items-center gap-2">
                        <Shield size={16} className="text-primary" />
                        {t('settings.feedback.viewTitle')}
                      </p>
                      <p className="text-text-muted text-xs mt-0.5">{t('settings.feedback.viewDesc')}</p>
                    </div>
                    <button
                      onClick={() => navigate('/console/feedback')}
                      className="flex items-center gap-2 px-5 py-3 bg-primary text-white hover:bg-primary-hover rounded-2xl font-bold text-sm transition-all active:scale-95 shrink-0"
                    >
                      <MessageSquare size={15} />
                      {t('settings.feedback.viewBtn')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder={t('settings.feedback.placeholder')}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 text-body-md text-on-surface resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary input-inset min-h-[120px]"
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => { setShowFeedback(false); setFeedbackText(''); }}
                    className="flex items-center gap-2 px-5 py-2.5 text-text-muted hover:text-text-main font-bold text-sm transition-colors"
                  >
                    <X size={15} />
                    {t('settings.feedback.cancelBtn')}
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
                    {t('settings.feedback.sendBtn')}
                  </button>
                </div>
              </div>
            )}
        </SettingsPanel>
      )}

      {user && (
        <SettingsPanel icon={LogOut} title={t('settings.account')}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
        </SettingsPanel>
      )}
    </div>
  )
}

export default Settings
