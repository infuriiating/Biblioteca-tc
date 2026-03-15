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

    const fetchProfile = async (userId) => {
      setProfileLoading(true)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error && error.code === 'PGRST116') {
          // Profile missing - auto create default
          console.log('[AuthContext] Profile missing, creating default...')
          const { data: userData } = await supabase.auth.getUser()
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                name: userData?.user?.user_metadata?.full_name || userData?.user?.email?.split('@')[0] || 'User',
                email: userData?.user?.email,
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
      }
    }

    const initAuth = async () => {
      try {
        // Initial session check
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
          await fetchProfile(currentUser.id)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('[AuthContext] Error initializing auth:', error)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
        clearTimeout(timeout)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[AuthContext] State change: ${event}`, session?.user?.email)
      
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await fetchProfile(currentUser.id)
      } else {
        setProfile(null)
        setProfileLoading(false)
      }
      
      // If we got a session change AFTER initial load, make sure loading is false
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
