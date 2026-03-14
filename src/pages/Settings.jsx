import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { User, Sun, Moon, LogOut, Save, Check, Settings as SettingsIcon, Shield } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Settings = () => {
  const { user, profile, signOut, isAdmin } = useAuth()

  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  // Name
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile?.full_name) setDisplayName(profile.full_name)
  }, [profile])

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
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

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4 pb-20">
      {/* Header */}
      <div className="space-y-1 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <SettingsIcon size={22} />
          </div>
          <h1 className="text-4xl font-black text-text-main tracking-tight">Settings</h1>
        </div>
        <p className="text-text-muted ml-11">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <User size={18} className="text-primary" />
            <h2 className="font-bold text-text-main">Profile</h2>
          </div>
        </div>
        <div className="px-8 py-6 space-y-5">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted block mb-2">
              Name
            </label>
            <div className="bg-bg-main/40 border border-border/40 rounded-2xl px-5 py-4 text-text-muted font-medium text-sm cursor-not-allowed select-none">
              {user?.user_metadata?.full_name || user?.user_metadata?.display_name || user?.user_metadata?.username || profile?.username || 'Utilizador'}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted block mb-2">
              Email
            </label>
            <div className="bg-bg-main/60 border border-border/50 rounded-2xl px-5 py-4 text-text-muted font-medium text-sm">
              {user?.email || '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Sun size={18} className="text-primary" />
            <h2 className="font-bold text-text-main">Appearance</h2>
          </div>
        </div>
        <div className="px-8 py-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted mb-4">Theme</p>
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
                  Light
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
                  Dark
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

      {/* Admin Panel Link (if admin is logged in) */}
      {isAdmin && (
        <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-primary" />
              <h2 className="font-bold text-text-main">Administration</h2>
            </div>
          </div>
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-text-main text-sm">Admin Session Active</p>
              <p className="text-text-muted text-xs mt-0.5">You are logged in as administrator</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl font-bold text-sm transition-all"
            >
              <LogOut size={15} />
              Admin Logout
            </button>
          </div>
        </div>
      )}

      {/* Account Section */}
      <div className="bg-bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <LogOut size={18} className="text-accent" />
            <h2 className="font-bold text-text-main">Account</h2>
          </div>
        </div>
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-text-main text-sm">Sign out</p>
            <p className="text-text-muted text-xs mt-0.5">You'll be redirected to the login page</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
