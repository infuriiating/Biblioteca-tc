import React, { createContext, useContext, useState, useCallback } from 'react'
import GlobalModal from '../components/ui/GlobalModal'
import ToastContainer from '../components/ui/ToastContainer'

const NotificationContext = createContext({})

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null)
  const [modal, setModal] = useState(null)

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToast({ id, message, type })
    setTimeout(() => {
      setToast((current) => current?.id === id ? null : current)
    }, duration)
  }, [])

  const confirm = useCallback(({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'warning' }) => {
    return new Promise((resolve) => {
      setModal({
        title,
        message,
        confirmText,
        cancelText,
        type,
        onConfirm: () => {
          resolve(true)
          setModal(null)
        },
        onCancel: () => {
          resolve(false)
          setModal(null)
        }
      })
    })
  }, [])

  return (
    <NotificationContext.Provider value={{ showToast, confirm, toast, modal, setModal }}>
      {children}
      <GlobalModal />
      <ToastContainer />
    </NotificationContext.Provider>
  )
}
