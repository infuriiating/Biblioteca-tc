import { Bell, Inbox, ChevronLeft, Info, CheckCircle2, AlertTriangle, XCircle, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../context/LanguageContext'

const Notifications = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (!error && data) {
        setNotifications(data)
      }
      setLoading(false)
    }
    fetchNotifications()

    // Subscribe to new notifications
    const channel = supabase.channel('user_notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
        setNotifications(prev => [payload.new, ...prev])
      }).subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user])

  const markAsRead = async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    await supabase.from('notifications').update({ read: true }).eq('id', id)
  }

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id)
  }

  const getIcon = (type) => {
    if (type === 'success') return <CheckCircle2 className="text-green-500" size={20} />
    if (type === 'warning') return <AlertTriangle className="text-yellow-500" size={20} />
    if (type === 'error') return <XCircle className="text-red-500" size={20} />
    return <Info className="text-primary" size={20} />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{t('notifications.title')}</h1>
          <p className="text-text-muted text-lg font-medium mt-1">{t('notifications.subtitle')}</p>
        </div>
        {notifications.some(n => !n.read) && (
          <button onClick={markAllAsRead} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border/60 rounded-xl text-xs font-bold text-text-muted hover:text-text-main hover:bg-bg-main transition-all">
            <Check size={14} /> Marcar tudo como lido
          </button>
        )}
      </div>

      <div className="bg-bg-surface rounded-[2.5rem] border border-border/40 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="p-10 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-bg-main/50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-border/20">
            {notifications.map(n => (
              <div 
                key={n.id} 
                className={`p-6 flex gap-4 transition-colors ${!n.read ? 'bg-primary/5' : 'hover:bg-bg-main/30'}`}
                onClick={() => !n.read && markAsRead(n.id)}
              >
                <div className="shrink-0 mt-1">{getIcon(n.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className={`text-base font-bold ${!n.read ? 'text-text-main' : 'text-text-muted'}`}>{n.title}</h3>
                    <span className="text-[10px] uppercase font-bold text-text-muted/60 tracking-wider whitespace-nowrap">
                      {new Date(n.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm ${!n.read ? 'text-text-muted' : 'text-text-muted/70'}`}>{n.message}</p>
                </div>
                {!n.read && (
                  <div className="shrink-0 self-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-10 h-full min-h-[400px]">
            <div className="w-20 h-20 bg-bg-main rounded-full flex items-center justify-center mb-6 text-text-muted/20">
              <Inbox size={40} />
            </div>
            <h3 className="text-xl font-bold text-text-main">{t('notifications.emptyTitle')}</h3>
            <p className="text-text-muted max-w-xs mt-2 font-medium">
              {t('notifications.emptyDesc')}
            </p>
            <Link 
              to="/" 
              className="mt-8 px-8 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95"
            >
              {t('notifications.exploreCatalog')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
