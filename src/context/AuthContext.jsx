import { createContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const initialized = useRef(false)
  const abortControllerRef = useRef(null)

  const fetchProfile = async (currentUser) => {
    // Skip if we already have this exact user's profile to avoid unnecessary fetches on every tab switch
    if (profile && profile.id === currentUser.id) {
      return
    }

    setProfileLoading(true)

    // Abort any existing ongoing fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    // Safety timeout to abort network request after 8 seconds if it hangs
    const timeoutId = setTimeout(() => {
      abortController.abort(new Error('Profile fetch timeout'))
    }, 8000)

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .abortSignal(abortController.signal)
        .single()

      if (error) {
        if (error.code === 'PGRST116') { // Not found - create one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([{
              id: currentUser.id,
              name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
              email: currentUser.email,
              role: 'aluno' // Default role for auto-created profiles
            }])
            .select()
            .single()
          
          if (createError) throw createError
          
          if (!abortController.signal.aborted) {
            setProfile(newProfile)
          }
          return
        }
        throw error
      }

      if (!abortController.signal.aborted) {
        setProfile(data)
      }
    } catch (error) {
      if (error.name === 'AbortError' || error.message?.includes('AbortError') || error.message === 'Profile fetch timeout') {
        console.warn('[AuthContext] Profile fetch aborted or timed out due to network hang:', error.message)
      } else {
        console.error('[AuthContext] Error in fetchProfile:', error)
      }
      // Don't arbitrarily clear an existing profile if it just failed a background refresh
    } finally {
      clearTimeout(timeoutId)
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null
        setProfileLoading(false)
      }
    }
  }

  const refreshSession = async () => {
    try {
      await supabase.auth.getSession()
    } catch (e) {
      console.warn('[AuthContext] Manual session refresh failed:', e)
    }
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Fallback timer: ensure the app ALWAYS loads after 5s even if Supabase is down
    const appLoadTimeout = setTimeout(() => {
      setLoading(false)
    }, 5000)

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          // We don't await fetchProfile here to avoid blocking UI render
          fetchProfile(session.user)
        }
      } catch (error) {
        console.warn('[AuthContext] Initial getSession failed:', error)
      } finally {
        setLoading(false)
        clearTimeout(appLoadTimeout)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`[AuthContext] Auth event: ${event}`)
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        // Non-blocking call
        fetchProfile(currentUser).then(() => {
          setLoading(false)
        })
      } else {
        // Logged out
        setProfile(null)
        setLoading(false)
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
      }
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(appLoadTimeout)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array as this should only run once

  const signOut = async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
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
    isAdmin: profile?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
