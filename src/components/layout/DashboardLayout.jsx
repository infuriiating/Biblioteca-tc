import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg-main flex">
      {/* Persistent Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Persistent Top Bar */}
        <TopBar onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-grow px-8 pb-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
