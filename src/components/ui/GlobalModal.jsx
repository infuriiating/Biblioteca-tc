import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ShieldAlert, Info } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const GlobalModal = () => {
  const { modal } = useNotification()

  const icons = {
    warning: <AlertTriangle className="text-yellow-500" size={24} />,
    danger: <ShieldAlert className="text-red-500" size={24} />,
    success: <CheckCircle2 className="text-green-500" size={24} />,
    info: <Info className="text-accent" size={24} />
  }

  return (
    <AnimatePresence>
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={modal.onCancel}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 10 }} 
            className="bg-bg-surface border border-border/40 p-6 rounded-[2rem] shadow-2xl w-full max-w-sm relative z-10"
          >
            <div className="flex gap-4 mb-4">
              <div className={`p-3 rounded-full shrink-0 h-fit ${
                modal.type === 'danger' ? 'bg-red-500/10' :
                modal.type === 'warning' ? 'bg-yellow-500/10' :
                modal.type === 'success' ? 'bg-green-500/10' : 'bg-primary/10'
              }`}>
                {icons[modal.type] || icons.warning}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-extrabold text-text-main leading-tight">{modal.title}</h3>
                <p className="text-sm text-text-muted mt-2 font-medium leading-relaxed">{modal.message}</p>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end mt-8">
              <button 
                onClick={modal.onCancel}
                className="px-5 py-2.5 font-bold text-sm text-text-muted hover:text-text-main hover:bg-bg-main rounded-xl transition-all"
              >
                {modal.cancelText || 'Cancelar'}
              </button>
              <button 
                onClick={modal.onConfirm}
                className={`px-5 py-2.5 font-extrabold text-sm text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all ${
                  modal.type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' :
                  modal.type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20' :
                  modal.type === 'success' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' :
                  'bg-primary hover:bg-primary-hover shadow-primary/20'
                }`}
              >
                {modal.confirmText || 'Confirmar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default GlobalModal
