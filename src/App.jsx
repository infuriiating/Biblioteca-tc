import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import MyLoans from './pages/MyLoans'
import Notifications from './pages/Notifications'

import ManageBooks from './pages/admin/ManageBooks'
import ManageLoans from './pages/admin/ManageLoans'
import ManageCategories from './pages/admin/ManageCategories'
import BookForm from './pages/admin/BookForm'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminUsers from './pages/admin/AdminUsers'

import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Scroll window (for standalone pages like Login/Signup)
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Scroll the main content area (for DashboardLayout pages)
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])
  return null
}
// Main Content Wrapper to handle global states like Auth Loading
function AppContent() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="fixed inset-0 bg-bg-main flex flex-col items-center justify-center z-[9999] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] animate-pulse">A Carregar Biblioteca...</p>
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Standalone pages — no sidebar */}
        <Route path="/entrar" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/entrar" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Main app with sidebar layout */}
        <Route 
          path="/*" 
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/livro/:id" element={<BookDetails />} />
                <Route 
                  path="/emprestimos" 
                  element={
                    <ProtectedRoute>
                      <MyLoans />
                     </ProtectedRoute>
                  } 
                />
                <Route path="/definicoes" element={<Settings />} />
                <Route path="/notificacoes" element={<Notifications />} />

                {/* Admin routes — local auth guard */}
                <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/livros" element={<AdminProtectedRoute><ManageBooks /></AdminProtectedRoute>} />
                <Route path="/admin/categorias" element={<AdminProtectedRoute><ManageCategories /></AdminProtectedRoute>} />
                <Route path="/admin/emprestimos" element={<AdminProtectedRoute><ManageLoans /></AdminProtectedRoute>} />
                <Route path="/admin/utilizadores" element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} />
                <Route path="/admin/livros/novo" element={<AdminProtectedRoute><BookForm /></AdminProtectedRoute>} />
                <Route path="/admin/livros/editar/:id" element={<AdminProtectedRoute><BookForm /></AdminProtectedRoute>} />
              </Routes>
            </DashboardLayout>
          } 
        />
      </Routes>
    </>
  )
}

function App() {
  // Theme Persistence
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
