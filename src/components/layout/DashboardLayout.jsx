import { useAuth } from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import MobileNav from './MobileNav'
import Footer from '../Footer'

const DashboardLayout = ({ children }) => {
  const { user, isAdmin } = useAuth()
  const location = useLocation()
  
  const showFooter = ['/', '/catalogo', '/docs'].includes(location.pathname)

  return (
    <div className="h-screen bg-bg-main flex overflow-hidden">
      {/* Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <main className={`flex-grow px-4 md:px-8 pt-4 md:pt-6 ${showFooter ? '' : 'pb-24 md:pb-12'}`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Global Footer for specific pages */}
        {showFooter && <Footer />}
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}

export default DashboardLayout
