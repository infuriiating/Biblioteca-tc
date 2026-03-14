import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminProtectedRoute = ({ children }) => {
  const { isAdmin, user } = useAuth()

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminProtectedRoute
