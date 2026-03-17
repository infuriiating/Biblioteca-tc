import { NavLink } from 'react-router-dom'
import { 
  Compass, 
  Grid, 
  Library, 
  Settings,
  BookOpen,
  ShieldCheck,
  Tags,
  Users
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import logo from '../../assets/logo.png'
import { useLanguage } from '../../context/LanguageContext'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin } = useAuth()
  const { t } = useLanguage()

  const adminItems = [
    { icon: Grid, label: t('sidebar.overview'), path: '/console', exact: true },
    { icon: BookOpen, label: t('sidebar.books'), path: '/console/livros' },
    { icon: Tags, label: t('sidebar.categories'), path: '/console/categorias' },
    { icon: Library, label: t('sidebar.loans'), path: '/console/emprestimos' },
    { icon: Users, label: t('sidebar.users'), path: '/console/utilizadores' },
  ]

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.exact || item.path === '/'}
      onClick={onClose}
      className={({ isActive }) => cn(
        "flex items-center gap-3.5 px-5 py-2.5 mx-3 rounded-xl text-sm font-medium transition-all",
        isActive 
          ? "text-primary bg-primary/8 font-semibold" 
          : "text-text-muted hover:text-text-main hover:bg-bg-main"
      )}
    >
      <item.icon size={19} className="shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  )

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed lg:static top-0 left-0 z-50 shrink-0 w-60 h-screen bg-bg-surface border-r border-border/40 flex flex-col py-6 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="px-5 mb-8 flex items-center justify-center">
          <div className="w-16 h-16 overflow-hidden">
            <img src={logo} alt="BibliotecaTC Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-grow space-y-0.5">
          <NavItem item={{ icon: Compass, label: t('sidebar.discover'), path: '/' }} />
          
          {!isAdmin && user && (
            <NavItem item={{ icon: Library, label: t('sidebar.myLibrary'), path: '/emprestimos' }} />
          )}

          {/* Admin Section */}
          {isAdmin && (
            <div className="pt-6">
              <p className="px-5 text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">{t('sidebar.administration')}</p>
              {adminItems.map((item, idx) => (
                <NavItem key={idx} item={item} />
              ))}
            </div>
          )}
        </nav>

        <div className="mx-5 my-3">
          <div className="h-px bg-border/50" />
        </div>

        {/* Bottom — Settings + Admin shortcut */}
        <nav className="space-y-0.5">
          <NavItem item={{ icon: Settings, label: t('sidebar.settings'), path: '/definicoes' }} />
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
