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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now()
        if (now - lastRefreshTime.current >= throttleMs) {
          lastRefreshTime.current = now
          
          // Add jitter (0-500ms) to prevent thundering herd
          const jitter = Math.floor(Math.random() * 500)
          const timer = setTimeout(() => {
            if (document.visibilityState === 'visible') {
              console.log(`[useRefreshOnFocus] Triggering refresh (jitter: ${jitter}ms)...`)
              onRefresh()
            }
          }, jitter)
          
          return () => clearTimeout(timer)
        }
      }
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    return () => window.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [onRefresh, throttleMs])
}
