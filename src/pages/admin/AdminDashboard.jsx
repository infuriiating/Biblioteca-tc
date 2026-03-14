import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import {
  BookOpen,
  Users,
  Clock,
  AlertCircle,
  LogOut,
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
  const [stats, setStats] = useState({ totalBooks: 0, activeLoans: 0, pendingLoans: 0, overdueLoans: 0 })
  const [recentLoans, setRecentLoans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [booksRes, activeRes, pendingRes, overdueRes, recentRes] = await Promise.all([
        supabase.from('books').select('*', { count: 'exact', head: true }),
        supabase.from('loans').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('loans').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('loans').select('*', { count: 'exact', head: true }).eq('status', 'active').lt('due_date', new Date().toISOString()),
        supabase.from('loans').select('*, books!fk_loans_book(title), profiles!fk_loans_user(username)').order('id', { ascending: false }).limit(6)
      ])

      setStats({
        totalBooks: booksRes.count || 0,
        activeLoans: activeRes.count || 0,
        pendingLoans: pendingRes.count || 0,
        overdueLoans: overdueRes.count || 0
      })
      setRecentLoans(recentRes.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} label="Total Books" value={stats.totalBooks} color="bg-primary" />
        <StatCard icon={Clock} label="Active Loans" value={stats.activeLoans} color="bg-orange-500" />
        <StatCard icon={Users} label="Pending Requests" value={stats.pendingLoans} color="bg-purple-500" />
        <StatCard icon={AlertCircle} label="Overdue" value={stats.overdueLoans} color="bg-red-500" />
      </div>

      {/* Quick Actions + Recent Loans */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Loans */}
        <div className="lg:col-span-2 bg-bg-surface rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-bold text-text-main">Recent Loan Activity</h2>
            <Link to="/admin/loans" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border/30">
            {loading ? (
              <div className="px-8 py-16 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
              </div>
            ) : recentLoans.length > 0 ? recentLoans.map((loan) => (
              <div key={loan.id} className="px-8 py-4 flex items-center justify-between hover:bg-bg-main/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary font-extrabold text-sm shrink-0">
                    {loan.profiles?.username?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-text-main text-sm">{loan.profiles?.username || 'Unknown User'}</p>
                    <p className="text-xs text-text-muted line-clamp-1">{loan.books?.title || 'Unknown Book'}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shrink-0",
                  (loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()) ? "bg-red-500/10 text-red-600" :
                  loan.status === 'pending' ? "bg-orange-500/10 text-orange-600" :
                  loan.status === 'active' ? "bg-green-500/10 text-green-600" :
                  "bg-bg-main text-text-muted"
                )}>
                  {(loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()) ? 'overdue' : loan.status}
                </span>
              </div>
            )) : (
              <div className="px-8 py-16 text-center text-text-muted italic">No recent loan activity.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0a1629] rounded-[2.5rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp size={140} />
          </div>
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/books/new"
                className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all border border-white/5 group"
              >
                <div className="p-2 rounded-xl bg-primary/20 text-primary">
                  <Plus size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">Add New Book</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Update catalog</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
              <Link
                to="/admin/books"
                className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all border border-white/5 group"
              >
                <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">Manage Books</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Edit or remove</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
              <Link
                to="/admin/loans"
                className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all border border-white/5 group"
              >
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Users size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">Manage Loans</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Approve / reject</p>
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
