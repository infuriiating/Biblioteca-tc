import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, UserCircle, LogOut, Book, List, RefreshCw, PlusCircle, XCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import logo from '../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
  const { user, profile, isAdmin, signOut } = useAuth()
  const { t, translateCategory } = useLanguage()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('0')
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*').order('name')
      setCategories(data || [])
    }
    fetchCategories()
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim() || category !== '0') {
      navigate(`/?q=${encodeURIComponent(search)}&c=${category}`)
    } else {
      navigate('/')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg-surface border-b border-border z-50 h-16 shadow-sm">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-12 transition-opacity hover:opacity-90" />
        </Link>

        {/* Search Container */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-2xl mx-8 bg-bg-surface border border-border rounded-full p-1 transition-all focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent border-0 text-secondary text-sm px-4 focus:ring-0 cursor-pointer min-w-[120px] group-focus-within:text-gray-800"
          >
            <option value="0">{t('navbar.all')}</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{translateCategory(c.name)}</option>
            ))}
          </select>
          <div className="w-px h-6 bg-border/50 self-center" />
          <input
            type="text"
            placeholder={t('navbar.searchPlaceholder')}
            className="flex-grow bg-transparent border-0 focus:ring-0 px-4 text-text-main group-focus-within:text-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="p-2 text-primary hover:text-primary-hover transition-colors">
            <Search size={22} />
          </button>
          {search && (
            <button type="button" onClick={() => setSearch('')} className="p-2 text-text-muted hover:text-gray-900">
              <XCircle size={22} />
            </button>
          )}
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative group">
              <button className="bg-white/5 border border-border px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
                <UserCircle size={24} />
                <span className="text-sm font-semibold hidden sm:inline">{profile?.name || user.email}</span>
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-bg-surface border border-border rounded-xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100">
                <div className="px-3 py-2 text-xs font-bold text-text-muted uppercase tracking-wider">{t('navbar.myAccount')}</div>
                {!isAdmin && (
                  <Link to="/emprestimos" className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                    <Book size={18} /> <span className="text-sm">{t('navbar.myLoans')}</span>
                  </Link>
                )}
                {isAdmin && (
                  <>
                    <div className="h-px bg-border my-2" />
                    <div className="px-3 py-2 text-xs font-bold text-text-muted uppercase tracking-wider">{t('navbar.adminMenu')}</div>
                    <Link to="/console/livros" className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                      <List size={18} /> <span className="text-sm">{t('navbar.manageBooks')}</span>
                    </Link>
                    <Link to="/console/emprestimos" className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                      <RefreshCw size={18} /> <span className="text-sm">{t('navbar.manageLoans')}</span>
                    </Link>
                    <Link to="/console/livros/novo" className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                      <PlusCircle size={18} /> <span className="text-sm">{t('navbar.newBook')}</span>
                    </Link>
                  </>
                )}
                <div className="h-px bg-border my-2" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <LogOut size={18} /> <span className="text-sm">{t('navbar.logout')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/entrar" className="px-4 py-2 rounded-full border border-border hover:bg-white/5 transition-colors text-sm font-semibold">{t('navbar.login')}</Link>
              <Link to="/registar" className="px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-bg-main transition-colors text-sm font-semibold">{t('navbar.register')}</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
