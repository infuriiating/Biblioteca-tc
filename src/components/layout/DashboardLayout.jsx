import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const DashboardLayout = ({ children }) => {
  const { user, isAdmin } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-bg-main flex overflow-hidden">
      {/* Sidebar - Only show if user is admin */}
      {user && isAdmin && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      {/* Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        {/* Top Bar */}
        <TopBar onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-grow px-4 md:px-8 pt-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
