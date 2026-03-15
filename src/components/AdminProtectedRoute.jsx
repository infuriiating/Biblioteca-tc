import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AdminProtectedRoute = ({ children }) => {
  const { isAdmin, user, loading, profileLoading } = useAuth()

  if (loading || (user && profileLoading)) return null

  if (!user || !isAdmin) {
    return <Navigate to="/admin/entrar" replace />
  }

  return children
}

export default AdminProtectedRoute
