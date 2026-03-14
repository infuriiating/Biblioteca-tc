import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const ToastContainer = () => {
  const { toast } = useNotification()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-xl ${
              toast.type === 'success' ? 'bg-[#0f172a]/90 text-green-400 border-green-500/20' :
              toast.type === 'error' ? 'bg-[#0f172a]/90 text-red-400 border-red-500/20' :
              toast.type === 'info' ? 'bg-[#0f172a]/90 text-primary border-primary/20' :
              'bg-[#0f172a]/90 text-white border-white/10'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} className="text-green-500" /> : 
             toast.type === 'error' ? <AlertCircle size={18} className="text-red-500" /> : 
             <Info size={18} className="text-primary" />}
            <span className="text-sm font-bold tracking-tight text-white">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
