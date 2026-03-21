import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus'
import { Book, ChevronLeft, Sparkles, CheckCircle2, MessageSquare, Star, Edit } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useNotification } from '../context/NotificationContext'
import StarRating from '../components/StarRating'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAdmin, loading: authLoading } = useAuth()
  const { t, translateCategory } = useLanguage()
  const { showToast } = useNotification()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState(null)
  const [isRequesting, setIsRequesting] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null)
  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState(null)
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const getCoverUrl = (filename) => {
    if (!filename) return null
    return supabase.storage.from('capalivro').getPublicUrl(filename).data.publicUrl
  }

  useEffect(() => {
    if (authLoading) return
    fetchBook()
  }, [id, authLoading])

  useEffect(() => {
    if (user && reviews.length > 0) {
      const myReview = reviews.find(r => r.user_id === user.id)
      if (myReview) {
        setUserReview(myReview)
        setReviewForm({ rating: myReview.rating, comment: myReview.comment || '' })
      }
    }
  }, [user, reviews])

  useRefreshOnFocus(() => fetchBook())

  const fetchBook = async (retryCount = 0) => {
    const now = Date.now()
    
    // Deadlock breaker: if a fetch claims to be in progress for > 15 seconds, assume it hung
    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      console.warn('[BookDetails] Fetch lock exceeded 15s. Breaking deadlock.')
      fetchInProgress.current = false
    }

    if (authLoading || fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }
    
    fetchInProgress.current = true
    lastFetchTime.current = now

    if (!book) {
      setLoading(true)
    }

    try {
      const { data, error } = await supabase
        .from('books')
        .select('*, categories(name)')
        .eq('id', id)
        .single()
      
      if (error) throw error

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*, profiles(name)')
        .eq('book_id', id)
        .order('created_at', { ascending: false })

      setReviews(reviewsData || [])
      
      setBook({ ...data, category_name: data.categories?.name, cover_url: getCoverUrl(data.cover_image) })
    } catch (error) {
      console.warn('[BookDetails] Fetch failed:', error.message || error)
      
      if (retryCount < 1) {
        console.log('[BookDetails] Retrying in 1.5s...')
        fetchInProgress.current = false
        await new Promise(r => setTimeout(r, 1500))
        return fetchBook(retryCount + 1)
      }
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  const handleLoan = async () => {
    if (!user) { navigate('/entrar'); return }
    if (book.available_qty <= 0) return
    setIsRequesting(true)
    try {
      const { error: loanError } = await supabase.from('loans').insert([
        { book_id: id, user_id: user.id, status: 'pending' }
      ])
      if (loanError) throw loanError
      
      setRequestStatus('success')
    } catch (error) {
      console.error('Error requesting loan:', error)
      setRequestStatus('error')
    } finally {
      setIsRequesting(false)
    }
  }

  const handleToggleFeatured = async () => {
    const newVal = !book.is_featured
    const { error } = await supabase.from('books').update({ is_featured: newVal }).eq('id', id)
    if (error) {
      showToast('Erro ao actualizar destaque', 'danger')
    } else {
      setBook(prev => ({ ...prev, is_featured: newVal }))
      showToast(newVal ? 'Livro marcado como destaque ⭐' : 'Destaque removido', 'success')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user || reviewForm.rating === 0) return
    setIsSubmittingReview(true)
    
    try {
      if (userReview) {
        // Update existing review
        const { error } = await supabase
          .from('reviews')
          .update({ rating: reviewForm.rating, comment: reviewForm.comment })
          .eq('id', userReview.id)
        if (error) throw error
      } else {
        // Insert new review
        const { error } = await supabase
          .from('reviews')
          .insert([{ 
            book_id: id, 
            user_id: user.id, 
            rating: reviewForm.rating, 
            comment: reviewForm.comment 
          }])
        if (error) throw error
      }
      
      // Refresh the page data
      await fetchBook()
      setShowReviewForm(false)
      showToast(t('bookDetails.reviewSuccess'), 'success')
    } catch (err) {
      console.error(err)
      showToast(t('bookDetails.reviewError'), 'danger')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true)
    setSummaryError(null)

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      setSummaryError('A chave de API OpenAI não está configurada. Adicione VITE_OPENAI_API_KEY ao ficheiro .env')
      setIsGeneratingSummary(false)
      return
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: `Escreve um resumo curto e cativante em português (3-4 frases) do livro "${book.title}" de ${book.author}. Foca-te no tema central e no que o livro tem de especial para os leitores. Não uses aspas nem formatação especial.`
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || 'Erro na API OpenAI')
      }

      const data = await response.json()
      const summary = data.choices[0]?.message?.content?.trim()

      if (summary) {
        await supabase.from('books').update({ ai_summary: summary }).eq('id', id)
        setBook(prev => ({ ...prev, ai_summary: summary }))
      }
    } catch (error) {
      console.error('OpenAI error:', error)
      setSummaryError(error.message || 'Erro ao gerar resumo. Verifique a sua chave de API.')
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  if (loading) return (
    <div className="animate-pulse space-y-8 max-w-4xl mx-auto py-12">
      <div className="h-5 w-20 bg-bg-surface rounded-lg" />
      <div className="bg-bg-surface rounded-[2.5rem] h-[500px] shadow-sm" />
    </div>
  )

  if (!book) return (
    <div className="py-20 text-center space-y-5">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto text-primary opacity-30">
        <Book size={32} />
      </div>
      <h2 className="text-xl font-semibold text-text-main">{t('bookDetails.bookNotFound')}</h2>
      <Link to="/" className="text-primary hover:underline inline-flex items-center gap-1.5 text-sm font-medium">
        <ChevronLeft size={16} /> {t('bookDetails.backToStart')}
      </Link>
    </div>
  )

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary text-sm font-medium transition-colors">
        <ChevronLeft size={18} /> {t('bookDetails.backToCatalog')}
      </Link>

      {/* Main Detail Card */}
      <div className="bg-[#0a1629] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center py-12 px-8 text-center text-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        {/* Book Cover */}
        <div className="w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 transform hover:scale-105 transition-transform duration-500">
          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
        </div>

        {/* Title & Author */}
        <div className="space-y-4 mb-10 max-w-2xl">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">{book.title}</h1>
            <p className="text-white/50 font-normal mt-2">{book.author}</p>
          </div>
          
          <div className="flex items-center justify-center gap-3">
             <StarRating rating={averageRating} size={18} />
             <span className="text-white/70 text-sm font-medium">
               {averageRating > 0 ? averageRating.toFixed(1) : t('bookDetails.noReviews')} 
               {reviews.length > 0 && ` (${reviews.length})`}
             </span>
          </div>

          {book.category_name && (
            <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white/60 font-medium">
              {translateCategory(book.category_name)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs mb-10">
          {requestStatus === 'success' ? (
            <div className="bg-green-500/20 border border-green-500/30 py-3.5 px-8 rounded-2xl w-full text-green-400 font-medium flex items-center justify-center gap-2 text-sm">
              <CheckCircle2 size={18} /> {t('bookDetails.requestedSuccess')}
            </div>
          ) : (
            <button 
              onClick={handleLoan}
              disabled={isRequesting || book.available_qty <= 0}
              className="w-full bg-primary text-white py-3.5 rounded-2xl font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2.5 disabled:opacity-30 disabled:grayscale text-sm"
            >
              {isRequesting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Book size={16} /> {book.available_qty <= 0 ? t('bookDetails.outOfStock') : t('bookDetails.requestBook')}</>
              )}
            </button>
          )}
          <p className="text-[11px] text-white/30 font-normal">
            {t('bookDetails.availableOf').replace('{available}', book.available_qty).replace('{total}', book.quantity)}
          </p>
        </div>

        {/* Admin Action Bar */}
        {isAdmin && (
          <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-10">
            <button
              onClick={handleToggleFeatured}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-bold border transition-all",
                book.is_featured
                  ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              <Star size={15} fill={book.is_featured ? 'currentColor' : 'none'} />
              {book.is_featured ? 'Destacado' : 'Destacar'}
            </button>
            <Link
              to={`/console/livros?q=${encodeURIComponent(book.title)}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-bold border bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
            >
              <Edit size={15} />
              Editar
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="w-full max-w-md space-y-6">
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-center">
            <div className="space-y-1">
              <p className="text-[10px] text-white/40 uppercase font-medium tracking-widest">{t('bookDetails.yearEdition')}</p>
              <p className="text-lg font-semibold">{book.year_edition || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-bg-surface rounded-[2rem] p-8 shadow-sm border border-border/30 space-y-4">
        <div className="flex items-center gap-2.5 text-text-main">
          <Sparkles size={18} className="text-primary" />
          <h3 className="text-lg font-semibold">{t('bookDetails.aboutBook')}</h3>
          {book.ai_summary && (
            <span className="ml-auto text-[10px] font-medium text-primary/60 bg-primary/8 px-2 py-1 rounded-full uppercase tracking-wider">{t('bookDetails.aiSummary')}</span>
          )}
        </div>
        <p className="text-text-muted leading-relaxed text-sm font-normal">
          {book.ai_summary || book.description || t('bookDetails.noDescription')}
        </p>
        
        {summaryError && (
          <p className="text-red-400 text-xs font-normal bg-red-500/8 border border-red-400/20 rounded-xl px-4 py-3">{summaryError}</p>
        )}

        {!book.ai_summary && (
          <button 
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className="flex items-center gap-1.5 text-primary font-medium text-sm hover:underline disabled:opacity-50"
          >
            {isGeneratingSummary ? (
              <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            {isGeneratingSummary ? t('bookDetails.generatingAiSummary') : t('bookDetails.generateAiSummary')}
          </button>
        )}
      </div>

      {/* Details Grid */}
      <div className="w-full">
        <div className="bg-bg-surface p-7 rounded-[2rem] shadow-sm border border-border/30 space-y-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('bookDetails.bookMetadata')}</p>
          <div className="space-y-2">
            {[
              { label: t('bookDetails.isbn'), value: book.isbn },
              { label: t('bookDetails.publisher'), value: book.publisher },
              { label: t('bookDetails.yearEdition'), value: book.year_edition }
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-border/20 last:border-0">
                <span className="text-text-muted text-sm font-normal">{label}</span>
                <span className="text-sm font-medium text-text-main">{value || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-bg-surface rounded-[2rem] p-8 shadow-sm border border-border/30 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-text-main">
            <MessageSquare size={18} className="text-primary" />
            <h3 className="text-lg font-semibold">{t('bookDetails.reviewsTitle')}</h3>
          </div>
          {user && !showReviewForm && (
            <button 
              onClick={() => setShowReviewForm(true)}
              className="text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors"
            >
              {userReview ? t('bookDetails.editReview') : t('bookDetails.writeReview')}
            </button>
          )}
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-bg-main/50 p-6 rounded-2xl border border-border/50 space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-main block">{t('bookDetails.ratingLabel')} <span className="text-red-500">*</span></label>
              <StarRating 
                rating={reviewForm.rating} 
                interactive={true} 
                onChange={(rating) => setReviewForm(prev => ({ ...prev, rating }))} 
                size={24}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-main block">{t('bookDetails.commentLabel')}</label>
              <textarea 
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="..."
                className="w-full bg-bg-surface border border-border/50 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 min-h-[100px] resize-y"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button 
                type="submit" 
                disabled={isSubmittingReview || reviewForm.rating === 0}
                className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmittingReview ? '...' : t('bookDetails.submitReview')}
              </button>
              <button 
                type="button" 
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-muted hover:bg-border/50 transition-colors"
              >
                {t('bookDetails.cancelReview')}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-text-muted italic">{t('bookDetails.noReviews')}</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="border-b border-border/20 last:border-0 pb-5 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                      {review.profiles?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main">
                        {review.profiles?.name || 'Utilizador'}
                        {user?.id === review.user_id && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">{t('bookDetails.youReviewed')}</span>}
                      </p>
                      <p className="text-[10px] text-text-muted">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>
                {review.comment && (
                  <p className="text-sm text-text-muted ml-10 mt-1 leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetails
