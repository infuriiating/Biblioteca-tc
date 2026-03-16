import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import BookCard from '../components/BookCard'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Home = () => {
  const navigate = useNavigate()
  const { user, loading: authLoading, refreshSession } = useAuth()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const cat = searchParams.get('c') || '0'

  const [books, setBooks] = useState([])
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState(cat)
  const fetchInProgress = useRef(false)

  useEffect(() => {
    setCategoryFilter(cat)
  }, [cat])

  const getCoverUrl = (filename) => {
    if (!filename) return null
    return supabase.storage.from('capalivro').getPublicUrl(filename).data.publicUrl
  }

  // Initial load
  useEffect(() => {
    if (!authLoading) {
      fetchData()
    }
  }, [authLoading, user])

  // Re-fetch books when the user returns to this tab after switching apps/tabs
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && !authLoading && !fetchInProgress.current) {
        console.log('[Home] Tab focused, ensuring fresh session...')
        await refreshSession()
        // Small buffer to allow auth state to settle
        await new Promise(r => setTimeout(r, 100))
        fetchData()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [authLoading, refreshSession])

  const fetchData = async (catId, retryCount = 0) => {
    if (authLoading || fetchInProgress.current) return
    
    fetchInProgress.current = true
    const currentCat = catId || categoryFilter
    console.log('[Home] Fetching data for category:', currentCat, retryCount > 0 ? `(retry ${retryCount})` : '')
    setLoading(true)
    
    // Safety timeout
    const timeoutId = setTimeout(() => {
      if (fetchInProgress.current) {
        console.warn('[Home] Data fetching timed out after 12s')
        setLoading(false)
        fetchInProgress.current = false
      }
    }, 12000)

    try {
      // Ensure we have a fresh session context before querying
      const { session } = await supabase.auth.getSession()
      
      const [catRes, bookRes] = await Promise.all([
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
        supabase.from('books').select('*, categories(name)').order('created_at', { ascending: false })
      ])

      if (catRes.error) throw catRes.error
      if (bookRes.error) throw bookRes.error

      setCategories(catRes.data || [])
      
      const processedBooks = (bookRes.data || []).map(b => ({
        ...b,
        category_name: b.categories?.name,
        cover_url: getCoverUrl(b.cover_image)
      }))

      setBooks(processedBooks)
      setFeaturedBooks(processedBooks.filter(b => b.is_featured).slice(0, 6))
      console.log('[Home] Successfully fetched', processedBooks.length, 'books')
    } catch (err) {
      console.error('[Home] Fetch error:', err)
      
      // Auto-retry once for transient network/auth issues
      if (retryCount < 1) {
        console.log('[Home] Attempting auto-retry for category:', currentCat)
        fetchInProgress.current = false
        clearTimeout(timeoutId)
        // Wait a bit before retrying
        await new Promise(r => setTimeout(r, 500))
        return fetchData(currentCat, retryCount + 1)
      }

      setBooks([])
      setFeaturedBooks([])
      setCategories([])
    } finally {
      setLoading(false)
      fetchInProgress.current = false
      clearTimeout(timeoutId)
    }
  }

  const filteredBooks = books.filter(b => {
    const matchesSearch = !query || b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author?.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = categoryFilter === '0' || b.category_id.toString() === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-10 pb-12">
      {/* Recommended */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-semibold text-text-main">Recomendados</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar-h px-1">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[200px] aspect-[3/4] bg-bg-surface rounded-[1.75rem] animate-pulse shrink-0" />
            ))
          ) : (
            featuredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                variant="recommended"
                onClick={(id) => navigate(`/livro/${id}`)}
              />
            ))
          )}
        </div>
      </section>

      {/* Catalog */}
      <section className="space-y-10 pt-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-text-main tracking-tight">Catálogo</h2>
          <p className="text-text-muted text-lg font-medium mt-1">Explore todos os livros disponíveis na nossa biblioteca</p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => setCategoryFilter('0')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0",
              categoryFilter === '0'
                ? "bg-primary text-white shadow-sm"
                : "bg-bg-surface border border-border/60 text-text-muted hover:border-primary/30 hover:text-primary"
            )}
          >
            Todos
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id.toString())}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0",
                categoryFilter === c.id.toString()
                  ? "bg-primary text-white shadow-sm"
                  : "bg-bg-surface border border-border/60 text-text-muted hover:border-primary/30 hover:text-primary"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
          {loading ? (
            [...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-bg-surface rounded-2xl animate-pulse" />
            ))
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                variant="catalog"
                onClick={(id) => navigate(`/livro/${id}`)}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-4 bg-bg-surface/50 rounded-2xl border border-dashed border-border/50">
              <p className="text-text-muted text-sm italic">Nenhum livro encontrado.</p>
              <button 
                onClick={() => fetchData()}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
