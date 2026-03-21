import { Search, Bell, ChevronDown, Menu, HelpCircle, Home, Settings, Library, Grid } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../context/LanguageContext'
import { useSearchParams, Link, useLocation } from 'react-router-dom'
import Select from '../ui/Select'
import logo from '../../assets/logo.png'

const TopBar = () => {
  const { user, profile, profileLoading, isAdmin } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get('q') || ''
  const isDiscoverPage = location.pathname === '/' || location.pathname === '/catalogo'

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
    <header className="sticky top-0 z-40 h-20 bg-bg-main/90 backdrop-blur-lg flex items-center justify-between px-4 lg:px-8 gap-4 py-4">
      {/* Mobile Menu */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Logo Wrapper */}
        <Link to="/landing" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 overflow-hidden">
            <img src={logo} alt="Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
          </div>
          <span className="hidden sm:block text-sm font-black text-text-main tracking-tight leading-none">
            Biblioteca<span className="text-primary italic">TC</span>
          </span>
        </Link>
      </div>

      {/* Search Bar - Only on Discover Page */}
      <div className="flex-1 min-w-[200px] max-w-xl relative group">
        {isDiscoverPage && (
          <>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={17} />
            <input
              type="text"
              placeholder={t('navbar.searchPlaceholder')}
              value={query}
              onChange={handleSearch}
              className="w-full bg-bg-surface border border-border/50 rounded-xl py-2.5 pl-11 pr-4 text-sm text-text-main placeholder:text-text-muted/60 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/8 transition-all"
            />
          </>
        )}
      </div>

      {/* Right — bell + avatar/auth */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-24 sm:w-32 hidden sm:block">
          <Select 
            options={[
              { id: 'pt', name: 'PT' },
              { id: 'en', name: 'EN' },
              { id: 'es', name: 'ES' },
              { id: 'fr', name: 'FR' },
              { id: 'de', name: 'DE' },
              { id: 'nl', name: 'NL' }
            ]}
            value={language}
            onChange={setLanguage}
            triggerClassName="!h-[38px] !px-3 !rounded-xl"
          />
        </div>

        {/* Admin Overview Hub */}
        {user && isAdmin && (
          <Link to="/console" className="p-2 bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all group" title={t('sidebar.overview')}>
            <Grid size={18} className="transition-transform" />
          </Link>
        )}

        {/* Home Icon for Everyone */}
        <Link to="/catalogo" className="p-2 bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all group" title={t('navbar.home')}>
          <Home size={18} className="transition-transform" />
        </Link>

        {/* My Library Button for Regular Users */}
        {user && !isAdmin && (
          <Link to="/emprestimos" className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-sm transition-all shadow-sm">
            <Library size={18} />
            <span className="hidden xl:inline">{t('sidebar.myLibrary')}</span>
          </Link>
        )}

        <Link to="/docs" className="p-2 bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all group" title={t('navbar.docs')}>
          <HelpCircle size={18} className="transition-transform" />
        </Link>

        {/* Settings Icon for Everyone */}
        <Link to="/definicoes" className="p-2 bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all group" title={t('navbar.settings')}>
          <Settings size={18} className="transition-transform" />
        </Link>
        {user && (
          <Link to="/notificacoes" className="relative p-2 bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all" title={t('navbar.notifications')}>
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-bg-surface" />
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-2.5 bg-bg-surface border border-border/40 px-2.5 py-1.5 rounded-xl transition-all">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary uppercase">
                {(() => {
                  const name = user.user_metadata?.full_name || user.user_metadata?.display_name || user.user_metadata?.username || profile?.name || user.email?.split('@')[0] || 'U'
                  const parts = name.trim().split(/\s+/)
                  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
                  return name.substring(0, 2).toUpperCase()
                })()}
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-text-main leading-tight">
                {user.user_metadata?.full_name || user.user_metadata?.display_name || user.user_metadata?.username || profile?.name || user.email?.split('@')[0] || 'Utilizador'}
              </p>
              <p className="text-[10px] text-text-muted capitalize font-medium">
                {profileLoading ? t('navbar.loading') : t(`admin.roles.${profile?.role || 'aluno'}`)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              {t('navbar.login')}
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95"
            >
              {t('navbar.register')}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopBar
