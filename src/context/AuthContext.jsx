import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const initialized = useRef(false)
  const isInitializing = useRef(true)
  const lastFetchedUserId = useRef(null)
  const [sessionVersion, setSessionVersion] = useState(0)
  const isRefreshing = useRef(false)

  const fetchProfile = async (userId, userObject = null) => {
    // If we're already fetching for this user, OR we already have this user's profile, skip.
    if (lastFetchedUserId.current === userId && (profileLoading || profile)) return
    
    setProfileLoading(true)
    lastFetchedUserId.current = userId

    const fetchTimeoutId = setTimeout(() => {
      setProfileLoading(prev => {
        if (prev) {
          console.warn('[AuthContext] fetchProfile timed out after 8s')
          return false
        }
        return prev
      })
    }, 8000)

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && (error.name === 'AbortError' || error.message?.includes('AbortError'))) {
        console.log('[AuthContext] fetchProfile aborted, assuming redundant.')
        return null
      }

      if (error && error.code === 'PGRST116') {
        const activeUser = userObject || (await supabase.auth.getUser()).data?.user
        if (!activeUser) throw new Error('No active user to create profile for')

        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              name: activeUser.user_metadata?.full_name || activeUser.email?.split('@')[0] || 'User',
              email: activeUser.email,
              role: 'student'
            }
          ])
          .select()
          .single()
        
        if (createError) throw createError
        setProfile(newProfile)
        return newProfile
      }

      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      console.error('[AuthContext] Error in fetchProfile:', error)
      setProfile(null)
      return null
    } finally {
      setProfileLoading(false)
      clearTimeout(fetchTimeoutId)
    }
  }

  const refreshSession = async () => {
    if (isRefreshing.current) return
    isRefreshing.current = true
    
    try {
      console.log('[AuthContext] Triggering session check...')
      await supabase.auth.getSession()
    } catch (error) {
      console.warn('[AuthContext] Session check failed:', error.message)
    } finally {
      // Debounce the boolean so we don't spam if multiple events fire
      setTimeout(() => {
        isRefreshing.current = false
      }, 1000)
    }
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 5000)

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          setLoading(false)
        }
      } catch (error) {
        console.error('[AuthContext] Error in initAuth:', error)
        setLoading(false)
      } finally {
        isInitializing.current = false
        clearTimeout(timeoutId)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[AuthContext] Auth event: ${event}`)
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await fetchProfile(currentUser.id, currentUser)
      } else {
        setProfile(null)
        lastFetchedUserId.current = null
      }
      
      setSessionVersion(v => v + 1)
      setLoading(false)
    })

    let lastVisibilityRefresh = 0
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now()
        // Throttle to once every 30s
        if (now - lastVisibilityRefresh > 30000) {
          lastVisibilityRefresh = now
          refreshSession()
        }
      }
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutId)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const signOut = async () => {
    try {
      lastFetchedUserId.current = null
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signInWithGoogle: () => supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: { prompt: 'select_account', hd: 'agr-tc.pt' }
      }
    }),
    signOut,
    refreshSession,
    user,
    profile,
    loading,
    profileLoading,
    sessionVersion,
    isAdmin: profile?.role === 'admin'
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
