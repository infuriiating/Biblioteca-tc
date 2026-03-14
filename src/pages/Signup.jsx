import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, UserPlus, AlertCircle, BookOpen } from 'lucide-react'
import { supabase } from '../lib/supabase'
import logo from '../assets/logo.png'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { data: authData, error: authError } = await signUp({ 
      email, 
      password,
      options: { data: { username } }
    })
    
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        { id: authData.user.id, username, role: 'student' }
      ])
      if (profileError) {
        setError('Conta criada, mas erro ao criar perfil. Tente entrar.')
        setLoading(false)
      } else {
        navigate('/')
      }
    }
  }

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center gap-3 mb-8">
          <div className="w-20 h-20">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="bg-bg-surface border border-border/60 rounded-3xl shadow-sm p-7 space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-text-main">Criar conta</h1>
            <p className="text-sm text-text-muted font-normal">Junte-se à biblioteca escolar</p>
          </div>

          {error && (
            <div className="bg-red-500/8 border border-red-400/20 p-3 rounded-xl flex items-start gap-2.5 text-red-400 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p className="font-normal leading-snug">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-muted ml-1">Nome</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  required
                  className="w-full bg-bg-main border border-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 transition-all text-text-main placeholder:text-text-muted/60"
                  placeholder="O seu nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-muted ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="email" 
                  required
                  autoComplete="email"
                  className="w-full bg-bg-main border border-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 transition-all text-text-main placeholder:text-text-muted/60"
                  placeholder="exemplo@escola.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-muted ml-1">Palavra-passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="password" 
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full bg-bg-main border border-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 transition-all text-text-main placeholder:text-text-muted/60"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl font-medium text-sm shadow-sm hover:bg-primary-hover transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><UserPlus size={16} /> Criar Conta</>
              )}
            </button>
          </form>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-border/60" />
            <span className="mx-3 text-text-muted text-xs font-normal">ou</span>
            <div className="flex-grow border-t border-border/60" />
          </div>

          <button 
            type="button"
            onClick={() => signInWithGoogle()}
            className="w-full bg-bg-main border border-border/60 text-text-main py-3 rounded-xl text-sm font-medium hover:bg-bg-surface transition-all active:scale-[0.98] flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continuar com Google
          </button>

          <p className="text-center text-sm text-text-muted font-normal">
            Já tem conta?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
