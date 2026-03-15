import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AdminProtectedRoute = ({ children }) => {
  const { isAdmin, user, loading, profileLoading } = useAuth()

  // During initial auth OR profile fetch, show a centered loader
  if (loading || profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest animate-pulse">Verificando Credenciais...</p>
      </div>
    )
  }

  if (!user || !isAdmin) {
    console.warn('[AdminProtectedRoute] Unauthorized access attempt detected. Redirecting...')
    return <Navigate to="/admin/entrar" replace />
  }

  return children
}

export default AdminProtectedRoute
