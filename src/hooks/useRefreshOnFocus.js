import { useEffect, useRef } from 'react'
import { useAuth } from './useAuth'

/**
 * Hook to trigger a callback when the global session is refreshed (e.g., on tab switch).
 * This relies on AuthContext handling the actual window listeners and session locking.
 * 
 * @param {Function} onRefresh - The callback to execute (e.g., fetchData)
 */
export const useRefreshOnFocus = (onRefresh) => {
  const { sessionVersion } = useAuth()
  const lastVersion = useRef(sessionVersion)

  useEffect(() => {
    // If the session version increased, it means the tab was focused
    // and the session was successfully validated/refreshed by AuthContext.
    if (sessionVersion > lastVersion.current) {
      lastVersion.current = sessionVersion
      
      // Add jitter (0-500ms) to prevent thundering herd / lock contention
      // if multiple components are listening to the same version change.
      const jitter = Math.floor(Math.random() * 500)
      
      const timer = setTimeout(() => {
        // Double check it's still visible before fetching
        if (document.visibilityState === 'visible') {
          console.log(`[useRefreshOnFocus] Triggering refresh with ${jitter}ms jitter...`)
          onRefresh()
        }
      }, jitter)

      return () => clearTimeout(timer)
    }
  }, [sessionVersion, onRefresh])
}
