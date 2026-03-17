import { useEffect, useRef } from 'react'

/**
 * Hook to trigger a callback when the window/tab regains focus or visibility.
 * Includes a mandatory throttle to prevent aggressive refetching.
 * 
 * @param {Function} onRefresh - The callback to execute (e.g., fetchData)
 * @param {number} throttleMs - Minimum time between refreshes in milliseconds (default: 10000)
 */
export const useRefreshOnFocus = (onRefresh, throttleMs = 10000) => {
  const lastRefreshTime = useRef(0)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now()
        if (now - lastRefreshTime.current >= throttleMs) {
          console.log('[useRefreshOnFocus] Tab became visible, triggering refresh...')
          lastRefreshTime.current = now
          onRefresh()
        } else {
          console.log('[useRefreshOnFocus] Tab visible but throttled (last refresh was < ' + (throttleMs / 1000) + 's ago)')
        }
      }
    }

    const handleFocus = () => {
      // Sometimes visibilityState is already 'visible' but focus is just regained
      const now = Date.now()
      if (now - lastRefreshTime.current >= throttleMs) {
        console.log('[useRefreshOnFocus] Window focused, triggering refresh...')
        lastRefreshTime.current = now
        onRefresh()
      }
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [onRefresh, throttleMs])
}
