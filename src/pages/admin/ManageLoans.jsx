import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus'
import { Clock, CheckCircle, XCircle, Search, Filter, AlertCircle, ExternalLink, Book as BookIcon, Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Select from '../../components/ui/Select'
import { useLanguage } from '../../context/LanguageContext'
import { useNotification } from '../../context/NotificationContext'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const ManageLoans = () => {
  const { t } = useLanguage()
  const { prompt, showToast } = useNotification()
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const fetchLoans = async (retryCount = 0) => {
    const now = Date.now()
    
    // Deadlock breaker: if a fetch claims to be in progress for > 15 seconds, assume it hung
    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      console.warn('[ManageLoans] Fetch lock exceeded 15s. Breaking deadlock.')
      fetchInProgress.current = false
    }

    if (fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }
    
    fetchInProgress.current = true
    lastFetchTime.current = now
    setError(null)

    if (loans.length === 0) {
      setLoading(true)
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('loans')
        .select(`
          *,
          profiles!fk_loans_user(name, email, role),
          books!fk_loans_book(id, title, author, cover_image)
        `)
        .order('id', { ascending: false })

      if (fetchError) throw fetchError
      
      // Auto-reject pending loans older than 24h
      const nowTime = new Date()
      const expiryLimit = 24 * 60 * 60 * 1000
      const expiredIds = (data || [])
        .filter(l => l.status === 'pending' && (nowTime - new Date(l.created_at)) > expiryLimit)
        .map(l => l.id)

      if (expiredIds.length > 0) {
        await supabase.from('loans').update({ status: 'rejected' }).in('id', expiredIds)
        // Refresh data after auto-rejection
        const { data: refreshedData, error: refreshError } = await supabase
          .from('loans')
          .select(`
            *,
            profiles!fk_loans_user(name, email, role),
            books!fk_loans_book(id, title, author, cover_image)
          `)
          .order('id', { ascending: false })
        
        if (refreshError) throw refreshError
        setLoans(refreshedData || [])
      } else {
        setLoans(data || [])
      }
    } catch (err) {
      console.warn('[ManageLoans] Fetch failed:', err.message || err)
      if (retryCount < 1) {
        fetchInProgress.current = false
        await new Promise(r => setTimeout(r, 1500))
        return fetchLoans(retryCount + 1)
      }
      setError(err.message)
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  useRefreshOnFocus(() => fetchLoans())

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

    if (error) {
      console.error('Error updating loan status:', error)
      return
    }

    // Stock management
    if (newStatus === 'active' && bookId) {
      const { data: book } = await supabase.from('books').select('available_qty').eq('id', bookId).single()
      if (book) {
        await supabase.from('books').update({ available_qty: book.available_qty - 1 }).eq('id', bookId)
      }
    } else if (newStatus === 'returned' && bookId) {
      const { data: book } = await supabase.from('books').select('available_qty').eq('id', bookId).single()
      if (book) {
        await supabase.from('books').update({ available_qty: book.available_qty + 1 }).eq('id', bookId)
      }
    }

    setLoans(prev => prev.map(l => l.id === loanId ? { ...l, ...updates } : l))
  }

  const filteredLoans = loans.filter(l => {
    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'overdue') {
        if (!(l.status === 'active' && l.due_date && new Date(l.due_date) < new Date())) return false
      } else {
        if (l.status !== statusFilter) return false
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const bookTitle = (l.books?.title || '').toLowerCase()
      const bookAuthor = (l.books?.author || '').toLowerCase()
      const userName = (l.profiles?.name || '').toLowerCase()
      const userEmail = (l.profiles?.email || '').toLowerCase()

      if (!bookTitle.includes(q) && !bookAuthor.includes(q) && !userName.includes(q) && !userEmail.includes(q)) {
        return false
      }
    }

    return true
  })

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{t('admin.loans.title')}</h1>
          <p className="text-text-muted text-lg font-medium mt-1">{t('admin.loans.subtitle')}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-bg-surface p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-border/50 flex flex-col md:flex-row gap-3 md:gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={t('admin.loans.searchPlaceholder') || 'Pesquisar...'}
            className="w-full h-12 md:h-14 bg-bg-main/50 border border-transparent rounded-xl md:rounded-[1.25rem] pl-14 pr-6 outline-none focus:bg-bg-surface focus:border-primary/30 transition-all text-sm font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64 min-w-0 md:min-w-[250px] flex-shrink-0">
          <Select
            options={[
              { id: 'all', name: t('admin.loans.all') },
              { id: 'pending', name: t('admin.loans.pending') },
              { id: 'active', name: t('admin.loans.active') },
              { id: 'returned', name: t('admin.loans.returned') },
              { id: 'rejected', name: t('admin.loans.rejected') },
              { id: 'overdue', name: t('admin.loans.overdue') }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder={t('admin.common.select.placeholder')}
          />
        </div>
      </div>

      <div className="hidden md:block bg-bg-surface rounded-[2rem] shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main/30">
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.loans.id')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.loans.user')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.loans.bookDetails')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">{t('admin.loans.borrowedDate') || 'REQUISITADO A'}</th>
                {statusFilter !== 'pending' && (
                  <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap text-center">{t('admin.loans.status')}</th>
                )}
                {statusFilter !== 'all' && statusFilter !== 'returned' && statusFilter !== 'rejected' && (
                  <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap text-right">{t('admin.loans.actions')}</th>
                )}
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
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 w-8 bg-bg-main rounded" /></td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-bg-main rounded" />
                        <div className="h-3 w-20 bg-bg-main rounded opacity-50" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-14 bg-bg-main rounded" />
                        <div className="space-y-2">
                          <div className="h-4 w-40 bg-bg-main rounded" />
                          <div className="h-3 w-24 bg-bg-main rounded opacity-50" />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-bg-main rounded" /></td>
                    <td className="px-8 py-6"><div className="h-8 w-24 bg-bg-main rounded-full" /></td>
                    <td className="px-8 py-6"><div className="h-8 w-20 bg-bg-main rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-bg-main/30 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono font-bold text-text-muted opacity-50">#{loan.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="font-bold text-text-main">
                            {(() => {
                              if (loan.profiles?.role === 'admin') return 'Admin'
                              return loan.profiles?.name || 'User'
                            })()}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase">
                              {loan.profiles?.role ? t(`admin.roles.${loan.profiles.role}`) : t('admin.loans.libMember')}
                            </p>
                            {loan.profiles?.email?.match(/^al(\d{5})@/i) && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <p className="text-[10px] text-primary font-bold">
                                  #{loan.profiles.email.match(/^al(\d{5})@/i)[1]}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Link 
                          to={`/livro/${loan.book_id}`}
                          className="w-12 h-16 bg-bg-main rounded-[0.75rem] shadow-sm border border-border/10 overflow-hidden flex-shrink-0 hover:scale-105 transition-transform group"
                        >
                          {loan.books?.cover_image ? (
                            <img
                              src={supabase.storage.from('capalivro').getPublicUrl(loan.books.cover_image).data.publicUrl}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted/30">
                              <BookIcon size={20} />
                            </div>
                          )}
                        </Link>
                        <div className="space-y-0.5">
                          <p className="font-extrabold text-text-main leading-tight line-clamp-1">{loan.books?.title}</p>
                          <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase tracking-widest">{loan.books?.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-bold text-text-main">{new Date(loan.created_at).toLocaleDateString()}</p>
                        <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase">{new Date(loan.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </td>
                    {statusFilter !== 'pending' && (
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        {(() => {
                          const isOverdue = loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()
                          return (
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest w-fit",
                              loan.status === 'pending' ? "bg-orange-500/10 text-orange-600" :
                                isOverdue ? "bg-red-500/10 text-red-600" :
                                  loan.status === 'active' ? "bg-green-500/10 text-green-600" :
                                    loan.status === 'rejected' ? "bg-red-500/10 text-red-600" :
                                      "bg-bg-main text-text-muted"
                            )}>
                              {isOverdue || loan.status === 'active' || loan.status === 'pending' ? <Clock size={10} className={cn(loan.status === 'pending' && "opacity-50")} /> : <CheckCircle size={10} />}
                              {isOverdue ? t('admin.loans.overdue') : t(`admin.loans.${loan.status}`)}
                            </span>
                          )
                        })()}
                        
                        {(loan.due_date && loan.status === 'active') && (
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span className={cn(new Date(loan.due_date) < new Date() ? "text-red-500" : "text-text-main")}>
                              {new Date(loan.due_date).toLocaleDateString()}
                            </span>
                            <span className="text-text-muted opacity-40">|</span>
                            <span className="text-text-muted opacity-60 uppercase">
                              {new Date(loan.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                        
                        {(loan.returned_at && loan.status === 'returned') && (
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span className="text-text-main">
                              {new Date(loan.returned_at).toLocaleDateString()}
                            </span>
                            <span className="text-text-muted opacity-40">|</span>
                            <span className="text-text-muted opacity-60 uppercase">
                              {new Date(loan.returned_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    )}
                    {statusFilter !== 'all' && statusFilter !== 'returned' && statusFilter !== 'rejected' && (
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
                            {/* Rejeitar button removed from pending view as per request */}
                          </>
                        )}
                        {loan.status === 'active' && (
                          <button
                            onClick={async () => {
                              const expectedPin = new Date(loan.created_at).getTime().toString().slice(-4)
                              const inputPin = await prompt({
                                title: "Confirmar Devolução",
                                message: "Insira o PIN de 4 dígitos fornecido pelo aluno no ecrã 'Meus Empréstimos':",
                                placeholder: "PIN (ex: 1234)",
                                type: "info"
                              })
                              if (inputPin === expectedPin) {
                                await updateLoanStatus(loan.id, 'returned', loan.book_id)
                                showToast("Livro devolvido com sucesso!", "success")
                              } else if (inputPin !== null) {
                                showToast("PIN incorreto! A devolução não foi registada.", "danger")
                              }
                            }}
                            className="px-4 py-2 bg-secondary text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                          >
                            {t('admin.common.returnBtn')}
                          </button>
                        )}
                      </div>
                    </td>
                    )}
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

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-bg-surface rounded-2xl border border-border/50 p-4 animate-pulse space-y-3">
              <div className="h-4 w-3/4 bg-bg-main rounded" />
              <div className="h-3 w-1/2 bg-bg-main rounded opacity-50" />
            </div>
          ))
        ) : filteredLoans.length > 0 ? filteredLoans.map((loan) => {
          const isOverdue = loan.status === 'active' && loan.due_date && new Date(loan.due_date) < new Date()
          return (
            <div key={loan.id} className="bg-bg-surface rounded-2xl border border-border/50 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Link to={`/livro/${loan.book_id}`} className="w-10 h-14 bg-bg-main rounded-xl overflow-hidden shrink-0 border border-border/10">
                  {loan.books?.cover_image ? (
                    <img src={supabase.storage.from('capalivro').getPublicUrl(loan.books.cover_image).data.publicUrl} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted/30"><BookIcon size={16} /></div>
                  )}
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-text-main text-sm line-clamp-1">{loan.books?.title}</p>
                  <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase">{loan.books?.author}</p>
                </div>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider shrink-0",
                  loan.status === 'pending' ? "bg-orange-500/10 text-orange-600" :
                    isOverdue ? "bg-red-500/10 text-red-600" :
                      loan.status === 'active' ? "bg-green-500/10 text-green-600" :
                        loan.status === 'rejected' ? "bg-red-500/10 text-red-600" :
                          "bg-bg-main text-text-muted"
                )}>
                  {isOverdue ? t('admin.loans.overdue') : t(`admin.loans.${loan.status}`)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-text-main">{loan.profiles?.name || 'User'}</p>
                  <p className="text-[10px] text-text-muted opacity-60">{new Date(loan.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  {loan.status === 'pending' && (
                    <button onClick={() => updateLoanStatus(loan.id, 'active', loan.book_id)} className="px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">
                      {t('admin.common.approve')}
                    </button>
                  )}
                  {loan.status === 'active' && (
                    <button onClick={async () => {
                      const expectedPin = new Date(loan.created_at).getTime().toString().slice(-4)
                      const inputPin = await prompt({ title: "Confirmar Devolução", message: "Insira o PIN de 4 dígitos:", placeholder: "PIN", type: "info" })
                      if (inputPin === expectedPin) { await updateLoanStatus(loan.id, 'returned', loan.book_id); showToast("Livro devolvido!", "success") }
                      else if (inputPin !== null) showToast("PIN incorreto!", "danger")
                    }} className="px-3 py-1.5 bg-secondary text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">
                      {t('admin.common.returnBtn')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        }) : (
          <div className="py-16 text-center text-text-muted opacity-30">
            <Inbox size={40} className="mx-auto mb-3" />
            <p className="font-bold uppercase tracking-widest text-sm">{t('admin.common.noRequests')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageLoans
