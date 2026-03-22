import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { MessageSquare, Mail, Calendar, User } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const ManageFeedback = () => {
  const { t } = useLanguage()
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('feedback')
      .select(`
        *,
        profiles!feedback_user_id_fkey(name, email)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching feedback:', error)
    } else {
      setFeedback(data || [])
    }
    setLoading(false)
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-text-main tracking-tight">{t('admin.feedback.title')}</h1>
        <p className="text-text-muted text-lg font-medium mt-1">{t('admin.feedback.subtitle')}</p>
      </div>

      <div className="bg-bg-surface rounded-[2rem] shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main/30">
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.feedback.user')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.feedback.message')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.feedback.date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 w-32 bg-bg-main rounded" /></td>
                    <td className="px-8 py-6"><div className="h-4 w-64 bg-bg-main rounded" /></td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-bg-main rounded" /></td>
                  </tr>
                ))
              ) : feedback.length > 0 ? (
                feedback.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-main/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-text-main flex items-center gap-2">
                          <User size={14} className="text-primary" />
                          {item.profiles?.name || 'User'}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-2 mt-1">
                          <Mail size={12} />
                          {item.profiles?.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-md">
                      <p className="text-sm text-text-main leading-relaxed italic">"{item.message}"</p>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-text-muted">
                        <Calendar size={14} />
                        <span className="text-xs font-bold">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center text-text-muted">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <MessageSquare size={48} />
                      <p className="font-bold uppercase tracking-widest text-sm">{t('admin.feedback.noFeedback')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageFeedback
