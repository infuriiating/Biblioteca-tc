import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus'
import { Plus, Search, Star, Trash2, Edit, ExternalLink, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Select from '../../components/ui/Select'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}
import { useLanguage } from '../../context/LanguageContext'
import { useNotification } from '../../context/NotificationContext'

const ManageBooks = () => {
  const { t, translateCategory } = useLanguage()
  const { confirm, showToast } = useNotification()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('0')
  const [categories, setCategories] = useState([])
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true })
    setCategories(data || [])
  }

  const fetchBooks = async (retryCount = 0) => {
    const now = Date.now()
    
    // Deadlock breaker: if a fetch claims to be in progress for > 15 seconds, assume it hung
    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      console.warn('[ManageBooks] Fetch lock exceeded 15s. Breaking deadlock.')
      fetchInProgress.current = false
    }

    if (fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }
    
    fetchInProgress.current = true
    lastFetchTime.current = now
    
    if (books.length === 0) {
      setLoading(true)
    }

    try {
      const { data, error } = await supabase
        .from('books')
        .select('*, categories(name)')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (err) {
      console.warn('[ManageBooks] Fetch failed:', err.message || err)
      if (retryCount < 1) {
        fetchInProgress.current = false
        await new Promise(r => setTimeout(r, 1500))
        return fetchBooks(retryCount + 1)
      }
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  useRefreshOnFocus(() => fetchBooks())

  const toggleFeatured = async (id, currentStatus) => {
    const { error } = await supabase
      .from('books')
      .update({ is_featured: !currentStatus })
      .eq('id', id)

    if (!error) {
      setBooks(books.map(b => b.id === id ? { ...b, is_featured: !currentStatus } : b))
    }
  }

  const deleteBook = async (id) => {
    const isConfirmed = await confirm({
      title: t('admin.books.deleteTitle'),
      message: t('admin.books.deleteMsg'),
      confirmText: t('admin.books.deleteBtn'),
      type: 'danger'
    })

    if (isConfirmed) {
      const { error } = await supabase.from('books').delete().eq('id', id)
      if (!error) {
        setBooks(books.filter(b => b.id !== id))
        showToast(t('admin.books.toastDeleted') || 'Livro apagado com sucesso.', 'success')
      } else {
        showToast(t('admin.books.toastDeleteError') || 'Erro ao apagar o livro.', 'error')
      }
    }
  }

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === '0' || b.category_id.toString() === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{t('admin.dashboard.manageBooks')}</h1>
          <p className="text-text-muted text-lg font-medium mt-1">{t('admin.dashboard.updateCatalog')}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-bg-surface p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-border/50 flex flex-col md:flex-row gap-3 md:gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={t('admin.books.searchPlaceholder')}
            className="w-full h-12 md:h-14 bg-bg-main/50 border border-transparent rounded-xl md:rounded-[1.25rem] pl-14 pr-6 outline-none focus:bg-bg-surface focus:border-primary/30 transition-all text-sm font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 md:gap-4 flex-grow md:flex-grow-0">
          <Link
            to="/console/livros/novo"
            className="flex-shrink-0 bg-primary text-white h-12 md:h-14 px-5 md:px-8 rounded-xl md:rounded-[1.25rem] font-bold flex items-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest text-[10px] md:text-xs whitespace-nowrap"
          >
            <Plus size={18} /> {t('admin.dashboard.addNewBook')}
          </Link>
          <div className="w-full md:w-64 min-w-0 md:min-w-[250px] flex-shrink-0">
            <Select 
              options={[{ id: '0', name: t('admin.books.allCategories') }, ...categories.map(c => ({...c, name: translateCategory(c.name)}))]}
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder={t('admin.books.filterPlaceholder')}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-bg-surface rounded-[2rem] shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main/30">
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.books.id')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.books.bookInfo')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.books.inventory')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted text-center">{t('admin.books.featured')}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted text-right">{t('admin.books.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 w-8 bg-bg-main rounded" /></td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-20 bg-bg-main rounded-xl shrink-0" />
                        <div className="space-y-2">
                          <div className="h-4 w-40 bg-bg-main rounded" />
                          <div className="h-3 w-24 bg-bg-main rounded opacity-50" />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="h-2 w-20 bg-bg-main rounded" />
                        <div className="h-1.5 w-32 bg-bg-main rounded" />
                      </div>
                    </td>
                    <td className="px-8 py-6"><div className="h-10 w-10 bg-bg-main rounded-full mx-auto" /></td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2 justify-end">
                        <div className="h-10 w-10 bg-bg-main rounded-xl" />
                        <div className="h-10 w-10 bg-bg-main rounded-xl" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-bg-main/30 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono font-bold text-text-muted opacity-50">#{book.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-20 bg-bg-main rounded-xl overflow-hidden shadow-sm border border-border/10 flex-shrink-0">
                          {book.cover_image && (
                            <img
                              src={supabase.storage.from('capalivro').getPublicUrl(book.cover_image).data.publicUrl}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              alt=""
                            />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-extrabold text-text-main group-hover:text-primary transition-colors line-clamp-1">{book.title}</p>
                          <p className="text-xs text-text-muted font-bold opacity-60">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
                          <span>{t('admin.books.available')}</span>
                          <span>{book.available_qty}/{book.quantity}</span>
                        </div>
                        <div className="w-32 h-1.5 bg-bg-main rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-1000",
                              book.available_qty === 0 ? "bg-red-500" :
                                (book.available_qty / book.quantity) < 0.3 ? "bg-orange-500" : "bg-primary"
                            )}
                            style={{ width: `${(book.available_qty / book.quantity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => toggleFeatured(book.id, book.is_featured)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          book.is_featured ? "bg-yellow-50 text-yellow-500 shadow-sm" : "bg-bg-main text-text-muted hover:bg-yellow-50 hover:text-yellow-500"
                        )}
                      >
                        <Star size={18} fill={book.is_featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/console/livros/editar/${book.id}`}
                          className="p-3 bg-bg-main text-text-muted hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteBook(book.id)}
                          className="p-3 bg-bg-main text-text-muted hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-32 text-center text-text-muted">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <Search size={48} />
                      <p className="font-bold uppercase tracking-widest text-sm">{t('admin.common.noBooks')}</p>
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

export default ManageBooks
