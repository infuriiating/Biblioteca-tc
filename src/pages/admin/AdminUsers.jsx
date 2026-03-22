import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { Search, User, Inbox, RefreshCw } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useLanguage } from '../../context/LanguageContext'
import { useNotification } from '../../context/NotificationContext'
import Select from '../../components/ui/Select'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const AdminUsers = () => {
  const { t } = useLanguage()
  const { showNotification } = useNotification()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [updating, setUpdating] = useState(null)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const fetchUsers = async (retryCount = 0) => {
    const now = Date.now()
    if (fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }
    
    fetchInProgress.current = true
    lastFetchTime.current = now
    setError(null)
    
    if (users.length === 0) {
      setLoading(true)
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .order('id', { ascending: false })

      if (fetchError) throw fetchError
      const sortedData = (data || []).sort((a, b) => {
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (b.role === 'admin' && a.role !== 'admin') return 1;
        return 0;
      })
      setUsers(sortedData)
    } catch (err) {
      console.warn('[AdminUsers] Fetch failed:', err.message || err)
      if (retryCount < 1) {
        fetchInProgress.current = false
        await new Promise(r => setTimeout(r, 1500))
        return fetchUsers(retryCount + 1)
      }
      setError(err.message)
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId, newRole) => {
    setUpdating(userId)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      showNotification(t('admin.users.updateSuccess') || 'Role updated successfully', 'success')
    } catch (err) {
      console.error('Error updating role:', err)
      showNotification(t('admin.users.updateError') || 'Error updating role', 'error')
    } finally {
      setUpdating(null)
    }
  }

  const filteredUsers = users.filter(u => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase().trim()
    const nameVal = (u.name || '').toLowerCase()
    const emailVal = (u.email || '').toLowerCase()
    return nameVal.includes(q) || emailVal.includes(q)
  })

  const getDisplayName = (user) => {
    if (user?.role === 'admin') return 'Admin'
    return user?.name || user?.email?.split('@')[0] || 'User'
  }

  const getDisplayEmail = (user) => {
    return user?.email || 'N/A'
  }

  // Exclude 'membro' from being selectable as it's just a fallback, the main roles are aluno, professor. Admins cannot make other admins here.
  const roleOptions = [
    { id: 'aluno', name: t('admin.roles.aluno') || 'Aluno' },
    { id: 'professor', name: t('admin.roles.professor') || 'Professor' }
  ]

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black text-text-main tracking-tight">{t('admin.users.title') || 'Users'}</h1>
          <p className="text-text-muted text-lg font-medium mt-1">{t('admin.users.subtitle') || 'Manage system access and roles'}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-bg-surface p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-border/50 flex flex-col md:flex-row gap-3 md:gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={t('admin.users.searchPlaceholder') || 'Search name or email...'}
            className="w-full h-12 md:h-14 bg-bg-main/50 border border-transparent rounded-xl md:rounded-[1.25rem] pl-14 pr-6 outline-none focus:bg-bg-surface focus:border-primary/30 transition-all text-sm font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block bg-bg-surface rounded-[2rem] shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main/30">
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.users.nameDetails') || 'USER DETAILS'}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.users.joined') || 'JOINED'}</th>
                <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">{t('admin.users.role') || 'ROLE'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {error && (
                <tr>
                  <td colSpan="3" className="px-8 py-10 text-center bg-red-500/5 text-red-500 text-xs font-bold uppercase tracking-widest">
                    Query Error: {error}
                  </td>
                </tr>
              )}
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-bg-main" />
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-32 bg-bg-main rounded" />
                          <div className="h-3 w-48 bg-bg-main rounded opacity-50" />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-bg-main rounded" /></td>
                    <td className="px-8 py-6"><div className="h-10 w-48 bg-bg-main rounded-xl" /></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const displayName = getDisplayName(user)
                  const displayEmail = getDisplayEmail(user)
                  const initial = displayName.charAt(0).toUpperCase()
                  
                  return (
                  <tr key={user.id} className="hover:bg-bg-main/30 transition-colors group">
                    <td className="px-8 py-6 w-1/2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center font-bold text-lg shrink-0">
                          {initial}
                        </div>
                        <div className="min-w-0 flex flex-col">
                          <p className="font-bold text-text-main text-base truncate">
                            {displayName}
                          </p>
                          <div className="flex items-center gap-2">
                             <p className="text-xs text-text-muted font-medium truncate mt-0.5">{displayEmail}</p>
                             {user.email?.match(/^al(\d{5})@/i) && (
                               <>
                                 <span className="w-1 h-1 rounded-full bg-border" />
                                 <p className="text-[10px] text-primary font-bold mt-0.5">
                                   #{user.email.match(/^al(\d{5})@/i)[1]}
                                 </p>
                               </>
                             )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-text-main">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                       </div>
                    </td>
                    <td className="px-8 py-6 w-64">
                      <div className={cn(
                        "transition-opacity", 
                        updating === user.id ? "opacity-50 pointer-events-none" : "",
                        user.role === 'admin' ? "opacity-60 pointer-events-none" : ""
                      )}>
                        <Select 
                          options={user.role === 'admin' ? [{ id: 'admin', name: t('admin.roles.admin') || 'Administrator' }] : roleOptions}
                          value={user.role || 'aluno'}
                          onChange={(newRole) => handleRoleChange(user.id, newRole)}
                          placeholder={t('admin.common.select.placeholder')}
                        />
                      </div>
                    </td>
                  </tr>
                  )
                })
              ) : (
                <tr>
                   <td colSpan="3" className="px-8 py-32 text-center text-text-muted">
                      <div className="flex flex-col items-center gap-4 opacity-30">
                        <Inbox size={48} />
                        <p className="font-bold uppercase tracking-widest text-sm">{t('admin.users.noUsers') || 'No users found'}</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-bg-surface rounded-2xl border border-border/50 p-4 flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-bg-main shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-bg-main rounded" />
                <div className="h-3 w-3/4 bg-bg-main rounded opacity-50" />
              </div>
            </div>
          ))
        ) : filteredUsers.map((user) => {
          const displayName = getDisplayName(user)
          const displayEmail = getDisplayEmail(user)
          const initial = displayName.charAt(0).toUpperCase()
          return (
            <div key={user.id} className="bg-bg-surface rounded-2xl border border-border/50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-base shrink-0">
                  {initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-main text-sm truncate">{displayName}</p>
                  <p className="text-xs text-text-muted truncate">{displayEmail}</p>
                </div>
                <p className="text-[10px] text-text-muted opacity-60 shrink-0">{user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</p>
              </div>
              <div className={cn("transition-opacity", updating === user.id ? "opacity-50 pointer-events-none" : "", user.role === 'admin' ? "opacity-60 pointer-events-none" : "")}>
                <Select
                  options={user.role === 'admin' ? [{ id: 'admin', name: t('admin.roles.admin') || 'Administrator' }] : roleOptions}
                  value={user.role || 'aluno'}
                  onChange={(newRole) => handleRoleChange(user.id, newRole)}
                  placeholder={t('admin.common.select.placeholder')}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminUsers
