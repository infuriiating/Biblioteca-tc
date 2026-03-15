import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-bg-main flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Bar */}
        <TopBar onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-grow px-4 md:px-8 pt-6 pb-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
