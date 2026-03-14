import { Bell, Inbox, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          className="p-3 bg-bg-surface hover:bg-white rounded-2xl shadow-sm border border-border/50 transition-all text-text-muted hover:text-primary"
        >
          <ChevronLeft size={22} />
        </Link>
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">Notificações</h1>
          <p className="text-text-muted text-lg font-medium mt-1">Fique a par das atualizações da sua biblioteca</p>
        </div>
      </div>

      <div className="bg-bg-surface rounded-[2.5rem] border border-border/40 shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-10">
        <div className="w-20 h-20 bg-bg-main rounded-full flex items-center justify-center mb-6 text-text-muted/20">
          <Inbox size={40} />
        </div>
        <h3 className="text-xl font-bold text-text-main">Tudo em dia!</h3>
        <p className="text-text-muted max-w-xs mt-2 font-medium">
          Ainda não tem notificações. Quando houver avisos sobre empréstimos ou novos livros, aparecerão aqui.
        </p>
        <Link 
          to="/" 
          className="mt-8 px-8 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95"
        >
          Explorar Catálogo
        </Link>
      </div>
    </div>
  )
}

export default Notifications
