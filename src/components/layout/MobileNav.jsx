import { Link, useLocation } from 'react-router-dom'
import { Home, Library, Settings, Grid, HelpCircle, Bell } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const MobileNav = () => {
  const { user, isAdmin } = useAuth()
  const location = useLocation()

  const isActive = (path) =>
    path === '/console'
      ? location.pathname.startsWith('/console')
      : location.pathname === path

  const NavItem = ({ to, icon: Icon }) => (
    <Link
      to={to}
      className={`flex items-center justify-center flex-1 h-full transition-colors ${
        isActive(to) ? 'text-primary' : 'text-text-muted hover:text-text-main'
      }`}
    >
      <Icon size={22} strokeWidth={isActive(to) ? 2.5 : 1.8} />
    </Link>
  )

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 h-14 bg-bg-main/95 backdrop-blur-lg border-t border-border/50 flex items-stretch"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <NavItem to="/catalogo" icon={Home} />

      {user && isAdmin && <NavItem to="/console" icon={Grid} />}
      {user && !isAdmin && <NavItem to="/emprestimos" icon={Library} />}
      {user && <NavItem to="/notificacoes" icon={Bell} />}

      <NavItem to="/docs" icon={HelpCircle} />
      <NavItem to="/definicoes" icon={Settings} />
    </nav>
  )
}

export default MobileNav
