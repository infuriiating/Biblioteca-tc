import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Safety timeout: ensure loading state is cleared even if Supabase hangs
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false)
      }
    }, 5000)

    const initAuth = async () => {
      console.log('[AuthContext] Initializing auth...')
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        const currentUser = session?.user ?? null
        console.log('[AuthContext] Session user:', currentUser?.email)
        setUser(currentUser)
        
        if (currentUser) {
          await fetchProfile(currentUser.id)
        }
      } catch (error) {
        console.error('[AuthContext] Error initializing auth:', error)
      } finally {
        setLoading(false)
        console.log('[AuthContext] Initialization complete.')
        clearTimeout(timeout)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state changed:', event, session?.user?.email)
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await fetchProfile(currentUser.id)
      } else {
        setProfile(null)
        setProfileLoading(false)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const fetchProfile = async (userId) => {
    setProfileLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setProfileLoading(false)
    }
  }

  const signOut = async () => {
    try {
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
