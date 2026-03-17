import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )

  if (!user) {
    return <Navigate to={adminOnly ? "/console/entrar" : "/entrar"} replace />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/console/entrar" replace />
  }

  return children
}

export default ProtectedRoute
