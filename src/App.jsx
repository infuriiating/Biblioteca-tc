import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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

import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
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
          <ScrollToTop />
          <Routes>
            {/* Standalone pages — no sidebar */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Main app with sidebar layout */}
            <Route 
              path="/*" 
              element={
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route 
                      path="/my-loans" 
                      element={
                        <ProtectedRoute>
                          <MyLoans />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notifications" element={<Notifications />} />

                    {/* Admin routes — local auth guard */}
                    <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                    <Route path="/admin/books" element={<AdminProtectedRoute><ManageBooks /></AdminProtectedRoute>} />
                    <Route path="/admin/categories" element={<AdminProtectedRoute><ManageCategories /></AdminProtectedRoute>} />
                    <Route path="/admin/loans" element={<AdminProtectedRoute><ManageLoans /></AdminProtectedRoute>} />
                    <Route path="/admin/books/new" element={<AdminProtectedRoute><BookForm /></AdminProtectedRoute>} />
                    <Route path="/admin/books/edit/:id" element={<AdminProtectedRoute><BookForm /></AdminProtectedRoute>} />
                  </Routes>
                </DashboardLayout>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
