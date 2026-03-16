import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const lastFetchedUserId = useRef(null)
  const initialized = useRef(false)
  // True while initAuth() is still running — prevents the auth listener
  // from prematurely clearing the loading gate during page-reload session restore.
  const isInitializing = useRef(true)

  const fetchProfile = async (userId, userObject = null) => {
    // Prevent double-fetching for the same user if already in progress or completed
    if (lastFetchedUserId.current === userId && profile && !profileLoading) return
    
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

      if (error && error.code === 'PGRST116') {
        // Profile missing - auto create default
        console.log('[AuthContext] Profile missing, creating default for:', userId)
        
        // Use userObject if provided, else fallback to current user
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

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Safety timeout: ensure loading state is cleared even if Supabase hangs
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 4000)

    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          if (error.message.includes('refresh_token_not_found') || error.message.includes('Invalid Refresh Token')) {
             console.warn('[AuthContext] Session invalid, clearing...')
             await supabase.auth.signOut()
          }
          throw error
        }

        const currentUser = session?.user ?? null
        setUser(currentUser)
        
        if (currentUser) {
          await fetchProfile(currentUser.id, currentUser)
        } else {
          setProfile(null)
          lastFetchedUserId.current = null
        }
      } catch (error) {
        console.error('[AuthContext] Error initializing auth:', error)
        setUser(null)
        setProfile(null)
      } finally {
        isInitializing.current = false
        setLoading(false)
        clearTimeout(timeoutId)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[AuthContext] State change: ${event}`)

      // During initial boot, initAuth() owns the loading gate.
      // If we're still initializing, skip updating state here to avoid
      // a race condition where the listener fires before getSession() resolves.
      if (isInitializing.current) return
      
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await fetchProfile(currentUser.id, currentUser)
      } else {
        setProfile(null)
        setProfileLoading(false)
        lastFetchedUserId.current = null
      }
      
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutId)
    }
  }, []) // Empty dependency array to ensure listener only sets up once

  const signOut = async () => {
    try {
      lastFetchedUserId.current = null
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setProfileLoading(false)
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
        queryParams: {
          prompt: 'select_account',
          hd: 'agr-tc.pt'
        }
      }
    }),
    signOut,
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
