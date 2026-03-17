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
      console.log('[useRefreshOnFocus] Session version updated, triggering component refresh...')
      lastVersion.current = sessionVersion
      onRefresh()
    }
  }, [sessionVersion, onRefresh])
}
