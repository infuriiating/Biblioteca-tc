import { useAuth } from '../../hooks/useAuth'
import TopBar from './TopBar'
import MobileNav from './MobileNav'

const DashboardLayout = ({ children }) => {
  const { user, isAdmin } = useAuth()

  return (
    <div className="h-screen bg-bg-main flex overflow-hidden">
      {/* Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <main className="flex-grow px-4 md:px-8 pt-4 md:pt-6 pb-24 md:pb-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}

export default DashboardLayout
