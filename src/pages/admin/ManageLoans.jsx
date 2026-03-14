import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { RefreshCw, CheckCircle, Clock, User, Book as BookIcon, Filter, Inbox, XCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useLanguage } from '../../context/LanguageContext'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const ManageLoans = () => {
  const { t } = useLanguage()
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchLoans = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('loans')
        .select(`
          *,
          profiles!fk_loans_user(username),
          books!fk_loans_book(title, author, cover_image)
        `)
        .order('id', { ascending: false })

      if (fetchError) throw fetchError
      setLoans(data || [])
    } catch (err) {
      console.error('Error fetching loans:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  const updateLoanStatus = async (loanId, newStatus, bookId) => {
    const updates = { 
      status: newStatus,
      ...(newStatus === 'active' && { 
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() 
      }),
      ...(newStatus === 'returned' && { returned_at: new Date().toISOString() })
    }

    const { error } = await supabase
      .from('loans')
      .update(updates)
      .eq('id', loanId)

    if (!error) {
      // Stock management
      if (newStatus === 'active') {
        const { data: book } = await supabase.from('books').select('available_qty').eq('id', bookId).single()
        if (book) {
          await supabase.from('books').update({ available_qty: book.available_qty - 1 }).eq('id', bookId)
        }
      } else if (newStatus === 'returned') {
        const { data: book } = await supabase.from('books').select('available_qty').eq('id', bookId).single()
        if (book) {
          await supabase.from('books').update({ available_qty: book.available_qty + 1 }).eq('id', bookId)
        }
      }
      
      setLoans(loans.map(l => l.id === loanId ? { ...l, ...updates } : l))
    }
  }

  const filteredLoans = loans.filter(l => {
    if (statusFilter === 'all') return true
    if (statusFilter === 'overdue') {
      return l.status === 'active' && l.due_date && new Date(l.due_date) < new Date()
    }
    return l.status === statusFilter
  })

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{t('admin.loans.title')}</h1>
          <p className="text-text-muted text-lg font-medium mt-1">{t('admin.loans.subtitle')}</p>
        </div>
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-border/50 flex gap-1">
          {['all', 'pending', 'active', 'returned', 'rejected', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-nowrap",
                statusFilter === status 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-transparent text-text-muted hover:text-text-main hover:bg-bg-main"
              )}
            >
              {status === 'all' ? t('admin.loans.all') : t(`admin.loans.${status}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main/30">
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.loans.id')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.loans.user')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.loans.bookDetails')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.loans.status')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted text-right">{t('admin.loans.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {error && (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center bg-red-500/5 text-red-500 text-xs font-bold uppercase tracking-widest">
                    Query Error: {error}
                  </td>
                </tr>
              )}
              {loading ? (
                <tr>
                   <td colSpan="5" className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center gap-4 animate-pulse text-text-muted">
                        <div className="w-12 h-12 rounded-full bg-secondary/50" />
                        <p className="font-bold uppercase tracking-widest text-xs">{t('admin.common.loadingRequests')}</p>
                      </div>
                   </td>
                </tr>
              ) : filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-bg-main/30 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono font-bold text-text-muted opacity-50">#{loan.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold">
                          {loan.profiles?.username?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-text-main">{loan.profiles?.username || 'User'}</p>
                          <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase">{t('admin.loans.libMember')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-14 bg-bg-main rounded shadow-sm border border-border/10 overflow-hidden flex-shrink-0">
                            {loan.books?.cover_image && (
                                <img 
                                  src={supabase.storage.from('capalivro').getPublicUrl(loan.books.cover_image).data.publicUrl} 
                                  className="w-full h-full object-cover"
                                  alt=""
                                />
                            )}
                         </div>
                         <div className="space-y-0.5">
                           <p className="font-extrabold text-text-main leading-tight line-clamp-1">{loan.books?.title}</p>
                           <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase tracking-widest">{loan.books?.author}</p>
                         </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      {(() => {
                        const isOverdue = loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()
                        return (
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest",
                            loan.status === 'pending' ? "bg-orange-500/10 text-orange-600" :
                            isOverdue ? "bg-red-500/10 text-red-600" :
                            loan.status === 'active' ? "bg-green-500/10 text-green-600" :
                            loan.status === 'rejected' ? "bg-red-500/10 text-red-600" :
                            "bg-bg-main text-text-muted"
                          )}>
                            {isOverdue || loan.status === 'active' || loan.status === 'pending' ? <Clock size={12} className={cn(loan.status === 'pending' && "opacity-50")} /> : <CheckCircle size={12} />}
                            {isOverdue ? t('admin.loans.overdue') : t(`admin.loans.${loan.status}`)}
                          </span>
                        )
                      })()}
                      {loan.due_date && loan.status === 'active' && (
                        <p className={cn(
                          "text-[9px] mt-1.5 font-bold uppercase tracking-tighter",
                          new Date(loan.due_date) < new Date() ? "text-red-500" : "text-text-muted"
                        )}>
                          Vence: {new Date(loan.due_date).toLocaleDateString()}
                        </p>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2">
                          {loan.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateLoanStatus(loan.id, 'active', loan.book_id)}
                                className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                              >
                                {t('admin.common.approve')}
                              </button>
                              <button 
                                onClick={() => updateLoanStatus(loan.id, 'rejected', loan.book_id)}
                                className="px-4 py-2 bg-red-500/10 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                              >
                                {t('admin.common.reject')}
                              </button>
                            </>
                          )}
                          {loan.status === 'active' && (
                            <button 
                              onClick={() => updateLoanStatus(loan.id, 'returned', loan.book_id)}
                              className="px-4 py-2 bg-secondary text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                              {t('admin.common.returnBtn')}
                            </button>
                          )}
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="px-8 py-32 text-center text-text-muted">
                      <div className="flex flex-col items-center gap-4 opacity-30">
                        <Inbox size={48} />
                        <p className="font-bold uppercase tracking-widest text-sm">{t('admin.common.noRequests')}</p>
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

export default ManageLoans
