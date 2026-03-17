import { useEffect, useRef } from 'react'

/**
 * Hook to trigger a callback when the window/tab is focused or becomes visible.
 * Uses a throttle to prevent excessive fetches.
 * 
 * @param {Function} onRefresh - The callback to execute (e.g., fetchData)
 * @param {number} throttleMs - Minimum time between refreshes (default 30s)
 */
export const useRefreshOnFocus = (onRefresh, throttleMs = 30000) => {
  const lastRefreshTime = useRef(0)
  const savedCallback = useRef(onRefresh)
  const timerRef = useRef(null)

  useEffect(() => {
    savedCallback.current = onRefresh
  }, [onRefresh])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now()
        if (now - lastRefreshTime.current >= throttleMs) {
          lastRefreshTime.current = now
          
          // Add delay to allow network/DB to reconnect (minimum 1000ms + 500ms jitter)
          const delay = 1000 + Math.floor(Math.random() * 500)
          
          if (timerRef.current) clearTimeout(timerRef.current)
          
          timerRef.current = setTimeout(() => {
            if (document.visibilityState === 'visible' && savedCallback.current) {
              console.log(`[useRefreshOnFocus] Triggering refresh (delay: ${delay}ms)...`)
              savedCallback.current()
            }
          }, delay)
        }
      } else {
        // Clear pending refresh if user switches away again quickly
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [throttleMs])
}
