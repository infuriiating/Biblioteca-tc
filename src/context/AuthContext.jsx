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
    // Manual session check if explicitly requested
    try {
      await supabase.auth.getSession()
    } catch (e) {
      console.warn('[AuthContext] Manual refresh check failed')
    }
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 6000)

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          setLoading(false)
        }
      } catch (error) {
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
      
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutId)
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
    isAdmin: profile?.role === 'admin'
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
