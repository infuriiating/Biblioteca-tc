import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus'
import {
  BookOpen,
  Users,
  Clock,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  Star
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useLanguage } from '../../context/LanguageContext'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-bg-surface p-6 rounded-[2rem] shadow-sm border border-border/50 space-y-4 hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon className="text-white" size={22} />
      </div>
      {sub && (
        <span className="text-xs font-bold text-text-muted bg-bg-main px-2.5 py-1 rounded-lg">{sub}</span>
      )}
    </div>
    <div>
      <p className="text-text-muted text-[10px] font-extrabold uppercase tracking-[0.2em]">{label}</p>
      <h3 className="text-3xl font-extrabold text-text-main mt-1">{value}</h3>
    </div>
  </div>
)

const AdminDashboard = () => {
  const { signOut } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState({ totalBooks: 0, activeLoans: 0, pendingLoans: 0, overdueLoans: 0 })
  const [recentLoans, setRecentLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const getDisplayName = (profile) => {
    if (profile?.role === 'admin') return 'Admin'
    return profile?.name || profile?.email?.split('@')[0] || 'User'
  }

  useEffect(() => {
    fetchStats()
  }, [])

  useRefreshOnFocus(() => fetchStats())

  const fetchStats = async (retryCount = 0) => {
    const now = Date.now()
    
    // Deadlock breaker: if a fetch claims to be in progress for > 15 seconds, assume it hung
    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      console.warn('[AdminDashboard] Fetch lock exceeded 15s. Breaking deadlock.')
      fetchInProgress.current = false
    }

    if (fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }
    
    fetchInProgress.current = true
    lastFetchTime.current = now
    
    if (recentLoans.length === 0) {
      setLoading(true)
    }

    try {
      // 1. Fetch statistics
      const [booksRes, activeRes, pendingRes, overdueRes, recentRes] = await Promise.all([
        supabase.from('books').select('*', { count: 'exact', head: true }),
        supabase.from('loans').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('loans').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('loans').select('*', { count: 'exact', head: true }).eq('status', 'active').lt('due_date', new Date().toISOString()),
        supabase.from('loans').select('*, books!fk_loans_book(title), profiles!fk_loans_user(name, email, role)').order('id', { ascending: false }).limit(5)
      ])

      if (booksRes.error) throw booksRes.error
      if (activeRes.error) throw activeRes.error
      if (pendingRes.error) throw pendingRes.error
      if (overdueRes.error) throw overdueRes.error
      if (recentRes.error) throw recentRes.error

      setStats({
        totalBooks: booksRes.count || 0,
        activeLoans: activeRes.count || 0,
        pendingLoans: pendingRes.count || 0,
        overdueLoans: overdueRes.count || 0
      })
      setRecentLoans(recentRes.data || [])
    } catch (e) {
      console.warn('[AdminDashboard] Fetch failed:', e.message || e)
      if (retryCount < 1) {
        fetchInProgress.current = false
        await new Promise(r => setTimeout(r, 1500))
        return fetchStats(retryCount + 1)
      }
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20)-theme(spacing.6)-theme(spacing.12))] overflow-hidden space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 shrink-0">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-bg-surface p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-border/50 space-y-4 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-bg-main" />
              <div className="space-y-2">
                <div className="h-3 w-16 bg-bg-main rounded" />
                <div className="h-8 w-12 bg-bg-main rounded" />
              </div>
            </div>
          ))
        ) : (
          <>
            <StatCard icon={BookOpen} label={t('admin.dashboard.totalBooks')} value={stats.totalBooks} color="bg-primary" />
            <StatCard icon={Clock} label={t('admin.dashboard.activeLoans')} value={stats.activeLoans} color="bg-orange-500" />
            <StatCard icon={Users} label={t('admin.dashboard.pendingRequests')} value={stats.pendingLoans} color="bg-purple-500" />
            <StatCard icon={AlertCircle} label={t('admin.dashboard.overdue')} value={stats.overdueLoans} color="bg-red-500" />
          </>
        )}
      </div>

      {/* Quick Actions + Recent Loans */}
      <div className="grid lg:grid-cols-3 gap-8 flex-grow min-h-0">
        {/* Recent Loans */}
        <div className="lg:col-span-2 bg-bg-surface rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-8 py-6 border-b border-border/50 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-text-main">{t('admin.dashboard.recentActivity')}</h2>
            <Link to="/admin/emprestimos" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              {t('admin.dashboard.viewAll')} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border/30 overflow-y-auto flex-grow custom-scrollbar">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="px-8 py-4 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-bg-main" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-bg-main rounded" />
                      <div className="h-3 w-48 bg-bg-main rounded opacity-50" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-bg-main rounded-full" />
                </div>
              ))
            ) : recentLoans.length > 0 ? recentLoans.map((loan) => {
              const displayName = getDisplayName(loan.profiles)
              const initial = displayName.charAt(0).toUpperCase()
              
              return (
              <div key={loan.id} className="px-8 py-4 flex items-center justify-between hover:bg-bg-main/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary font-extrabold text-sm shrink-0">
                    {initial}
                  </div>
                  <div>
                    <p className="font-bold text-text-main text-sm">{displayName}</p>
                    <p className="text-xs text-text-muted line-clamp-1">{loan.books?.title || 'Unknown Book'}</p>
                  </div>
                </div>
                  <span className={cn(
                    "text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shrink-0",
                    (loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()) ? "bg-red-500/10 text-red-600" :
                    loan.status === 'pending' ? "bg-orange-500/10 text-orange-600" :
                    loan.status === 'active' ? "bg-green-500/10 text-green-600" :
                    loan.status === 'returned' ? "bg-bg-main text-text-muted" :
                    "bg-bg-main text-text-muted"
                  )}>
                    {(loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()) ? t('admin.dashboard.overdue') : t(`admin.loans.${loan.status}`)}
                  </span>
              </div>
              )
            }) : (
              <div className="px-8 py-16 text-center text-text-muted italic">No recent loan activity.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0a1629] rounded-[2.5rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp size={140} />
          </div>
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-6">{t('admin.dashboard.quickActions')}</h2>
            <div className="space-y-3">
              <Link
                to="/admin/livros/novo"
                className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all border border-white/5 group"
              >
                <div className="p-2 rounded-xl bg-primary/20 text-primary">
                  <Plus size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">{t('admin.dashboard.addNewBook')}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{t('admin.dashboard.updateCatalog')}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
              <Link
                to="/admin/livros"
                className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all border border-white/5 group"
              >
                <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">{t('admin.dashboard.manageBooks')}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{t('admin.dashboard.editOrRemove')}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
              <Link
                to="/admin/emprestimos"
                className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all border border-white/5 group"
              >
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Users size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">{t('admin.dashboard.manageLoans')}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{t('admin.dashboard.approveReject')}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
