import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus'
import { Book as BookIcon, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}
const MyLoans = () => {
  const { user, loading: authLoading } = useAuth()
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const fetchMyLoans = async (retryCount = 0) => {
    if (!user) return
    const now = Date.now()
    
    // Deadlock breaker: if a fetch claims to be in progress for > 15 seconds, assume it hung
    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      console.warn('[MyLoans] Fetch lock exceeded 15s. Breaking deadlock.')
      fetchInProgress.current = false
    }

    if (authLoading || fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }
    
    fetchInProgress.current = true
    lastFetchTime.current = now
    if (loans.length === 0) {
      setLoading(true)
    }

    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*, books!fk_loans_book(*)')
        .eq('user_id', user.id)
        .order('id', { ascending: false })

      if (error) throw error
      
      setLoans(data || [])
    } catch (err) {
      console.warn('[MyLoans] Fetch failed:', err.message || err)
      
      if (retryCount < 1) {
        console.log('[MyLoans] Retrying in 1.5s...')
        fetchInProgress.current = false
        await new Promise(r => setTimeout(r, 1500))
        return fetchMyLoans(retryCount + 1)
      }
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  useRefreshOnFocus(() => fetchMyLoans())

  useEffect(() => {
    if (!authLoading && user) {
      fetchMyLoans()
    } else if (!authLoading && !user) {
      setLoading(false)
    }
  }, [authLoading, user])

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-text-main tracking-tight">Meus Empréstimos</h1>
        <p className="text-text-muted text-lg font-medium mt-1">Histórico completo das suas requisições</p>
      </div>

      {loading ? (
        <div className="space-y-4">
           {[1,2,3,4].map(i => (
             <div key={i} className="bg-bg-surface border border-border p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 animate-pulse">
               <div className="w-16 h-24 bg-bg-main rounded shrink-0" />
               <div className="flex-grow space-y-2 w-full">
                 <div className="h-5 bg-bg-main rounded w-1/2" />
                 <div className="h-4 bg-bg-main rounded w-1/4 opacity-50" />
               </div>
               <div className="w-24 h-8 bg-bg-main rounded-full" />
             </div>
           ))}
        </div>
      ) : loans.length > 0 ? (
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-bg-surface border border-border p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-colors shadow-sm">
              <div className="w-16 h-24 bg-bg-main rounded overflow-hidden flex-shrink-0 border border-border/50">
                {loan.books?.cover_image && (
                  <img 
                    src={supabase.storage.from('capalivro').getPublicUrl(loan.books.cover_image).data.publicUrl} 
                    className="w-full h-full object-cover" 
                    alt=""
                  />
                )}
              </div>
              
              <div className="flex-grow text-center md:text-left space-y-1">
                <Link to={`/livro/${loan.books?.id}`} className="text-lg font-bold hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2">
                  {loan.books?.title} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-sm text-text-muted">{loan.books?.author}</p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  loan.status === 'active' ? 'bg-orange-500/10 text-orange-500' : 
                  loan.status === 'pending' ? 'bg-blue-500/10 text-blue-500' :
                  loan.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                  'bg-green-500/10 text-green-500'
                )}>
                  {loan.status === 'active' ? <Clock size={14} /> : loan.status === 'pending' ? <Clock size={14} className="opacity-50" /> : <CheckCircle size={14} />}
                  {loan.status === 'active' ? 'Ativo' : 
                   loan.status === 'pending' ? 'Pendente' : 
                   loan.status === 'rejected' ? 'Recusado' : 'Devolvido'}
                </span>
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">Requisição #{loan.id}</p>
                {loan.status === 'active' && loan.due_date && (
                   <p className="text-[9px] text-orange-500/60 font-medium">Vence: {new Date(loan.due_date).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-6 bg-bg-surface/50 rounded-3xl border border-dashed border-border">
          <BookIcon size={64} className="mx-auto text-text-muted opacity-20" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Sem empréstimos</h3>
            <p className="text-text-muted">Ainda não requisitou nenhum livro do nosso catálogo.</p>
          </div>
          <Link to="/" className="inline-block bg-primary text-bg-main px-8 py-3 rounded-full font-bold hover:bg-primary-hover transition-all">
            Explorar Catálogo
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyLoans
