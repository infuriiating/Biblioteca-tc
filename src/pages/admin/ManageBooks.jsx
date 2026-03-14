import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
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
  const { t } = useLanguage()
  const { confirm, showToast } = useNotification()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('0')
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true })
    setCategories(data || [])
  }

  const fetchBooks = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('books')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })

    if (!error) setBooks(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

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
        <Link
          to="/admin/livros/novo"
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest text-xs"
        >
          <Plus size={18} /> {t('admin.dashboard.addNewBook')}
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-border/50 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={t('admin.books.searchPlaceholder')}
            className="w-full bg-bg-main/50 border border-transparent rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary/30 transition-all text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select 
            options={[{ id: '0', name: t('admin.books.allCategories') }, ...categories]}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder={t('admin.books.filterPlaceholder')}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-border/50 overflow-hidden">
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
                <tr>
                  <td colSpan="5" className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 text-text-muted">
                      <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                      <p className="italic font-medium">{t('admin.common.fetchingCollection')}</p>
                    </div>
                  </td>
                </tr>
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
                          to={`/admin/livros/editar/${book.id}`}
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
