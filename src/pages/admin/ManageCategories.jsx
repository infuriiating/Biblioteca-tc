import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, GripVertical, Check, X, AlertCircle, Save, Search } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { useNotification } from '../../context/NotificationContext'
import { useLanguage } from '../../context/LanguageContext'

const ManageCategories = () => {
  const { t } = useLanguage()
  const { confirm, showToast } = useNotification()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      // We try to order by display_order if it exists, otherwise by name
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true })
        .order('name')
      
      if (error) throw error
      setCategories(data)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newCategoryName.trim() }])
        .select()

      if (error) throw error
      setCategories([...categories, ...data])
      setNewCategoryName('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdateCategory = async (id) => {
    if (!editValue.trim()) return

    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: editValue.trim() })
        .eq('id', id)

      if (error) throw error
      setCategories(categories.map(c => c.id === id ? { ...c, name: editValue.trim() } : c))
      setEditingId(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteCategory = async (id) => {
    const isConfirmed = await confirm({
      title: t('admin.categories.deleteTitle'),
      message: t('admin.categories.deleteMsg'),
      confirmText: t('admin.categories.deleteBtn'),
      type: 'danger'
    })
    
    if (!isConfirmed) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCategories(categories.filter(c => c.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }
  

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{t('admin.categories.title')}</h1>
          <p className="text-text-muted text-lg font-medium mt-1">{t('admin.categories.subtitle')}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} />
          <p>{error}</p>
          <button onClick={() => setError(null)} className="ml-auto hover:text-red-300">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="bg-bg-surface p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-border/50 flex flex-col md:flex-row gap-3 md:gap-4 items-center">
        <div className="relative flex-grow w-full">
          <input 
            type="text"
            placeholder={t('admin.categories.addPlaceholder')}
            className="w-full h-12 md:h-14 bg-bg-main/50 border border-transparent rounded-xl md:rounded-[1.25rem] pl-6 pr-6 text-sm font-bold focus:bg-bg-surface focus:border-primary/30 outline-none transition-all"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto flex-shrink-0">
          <button 
            type="submit"
            className="w-full md:w-auto h-12 md:h-14 bg-primary text-white px-8 rounded-xl md:rounded-[1.25rem] text-xs font-bold uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-primary/20"
          >
            <Plus size={18} /> {t('admin.categories.addBtn')}
          </button>
        </div>
      </form>


      {/* Categories List */}
      <div className="bg-bg-surface rounded-[1.5rem] md:rounded-[2rem] border border-border/50 overflow-hidden shadow-sm">
        {loading ? (
          <div className="divide-y divide-border/20">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
                <div className="w-6 h-6 bg-bg-main rounded-lg" /> {/* Grip icon placeholder */}
                <div className="flex-grow h-5 bg-bg-main rounded-lg" /> {/* Category name placeholder */}
                <div className="w-8 h-8 bg-bg-main rounded-lg" /> {/* Edit button placeholder */}
                <div className="w-8 h-8 bg-bg-main rounded-lg" /> {/* Delete button placeholder */}
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <Reorder.Group 
            axis="y" 
            values={categories} 
            onReorder={setCategories}
            className="divide-y divide-border/20"
          >
            {categories.map((category) => (
              <Reorder.Item 
                key={category.id} 
                value={category}
                className="p-4 flex items-center gap-4 hover:bg-bg-main/40 transition-colors bg-bg-surface group"
              >
                <div className="text-text-muted cursor-grab active:cursor-grabbing p-2 hover:bg-bg-main rounded-lg transition-colors">
                  <GripVertical size={18} />
                </div>
                
                {editingId === category.id ? (
                  <div className="flex-grow flex gap-2">
                    <input 
                      type="text"
                      className="flex-grow bg-bg-main border border-primary/40 rounded-lg px-3 py-1.5 text-sm outline-none"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <button onClick={() => handleUpdateCategory(category.id)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg">
                      <Check size={18} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-grow text-sm font-medium text-text-main">{category.name}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingId(category.id); setEditValue(category.name) }}
                        className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <div className="p-8 text-center text-text-muted italic">
            {t('admin.common.noData') || 'Nenhuma categoria encontrada.'}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 items-center">
        <p className="text-[10px] text-text-muted italic">
          {t('admin.categories.dragToReorder')} <GripVertical size={10} className="inline" />
        </p>
        <button 
          onClick={async () => {
            setLoading(true)
            try {
              const updates = categories.map((cat, index) => ({
                id: cat.id,
                display_order: index
              }))

              // Update all categories with their new order
              for (const update of updates) {
                const { error } = await supabase
                  .from('categories')
                  .update({ display_order: update.display_order })
                  .eq('id', update.id)
                if (error) throw error
              }
              
              showToast(t('admin.common.orderSaved'), 'success')
            } catch (err) {
              console.error(err)
              showToast(t('admin.common.orderError'), 'error')
            } finally {
              setLoading(false)
            }
          }}
          disabled={loading}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2"
        >
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
          Salvar Ordem
        </button>
      </div>
    </div>
  )
}

export default ManageCategories
