import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useSearchParams, Link, useLocation } from 'react-router-dom'

const TopBar = ({ onOpenSidebar }) => {
  const { user, profile } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get('q') || ''
  const isDiscoverPage = location.pathname === '/'

  const handleSearch = (e) => {
    const val = e.target.value
    if (val) {
      setSearchParams({ q: val })
    } else {
      searchParams.delete('q')
      setSearchParams(searchParams)
    }
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-bg-main/90 backdrop-blur-lg flex items-center justify-between px-4 lg:px-8 gap-4">
      {/* Mobile Menu */}
      <button 
        onClick={onOpenSidebar}
        className="lg:hidden p-2 text-text-muted hover:text-primary transition-colors shrink-0"
      >
        <Menu size={22} />
      </button>

      {/* Search Bar - Only on Discover Page */}
      <div className="flex-1 min-w-[200px] max-w-xl relative group">
        {isDiscoverPage && (
          <>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={17} />
            <input 
              type="text" 
              placeholder="Pesquisar livros..."
              value={query}
              onChange={handleSearch}
              className="w-full bg-bg-surface border border-border/50 rounded-xl py-2.5 pl-11 pr-4 text-sm text-text-main placeholder:text-text-muted/60 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/8 transition-all"
            />
          </>
        )}
      </div>

      {/* Right — bell + avatar/auth */}
      <div className="flex items-center gap-3 shrink-0">
        {user && (
          <Link to="/notificacoes" className="relative p-2 bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-bg-surface" />
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-2.5 bg-bg-surface border border-border/40 px-2.5 py-1.5 rounded-xl transition-all">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary uppercase">
                {(() => {
                  const name = user.user_metadata?.full_name || user.user_metadata?.display_name || user.user_metadata?.username || profile?.username || user.email?.split('@')[0] || 'U'
                  const parts = name.trim().split(/\s+/)
                  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
                  return name.substring(0, 2).toUpperCase()
                })()}
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-text-main leading-tight">
                {user.user_metadata?.full_name || user.user_metadata?.display_name || user.user_metadata?.username || profile?.username || user.email?.split('@')[0] || 'Utilizador'}
              </p>
              <p className="text-[10px] text-text-muted capitalize font-medium">{profile?.role || 'Estudante'}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              Entrar
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95"
            >
              Registe-se
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopBar
