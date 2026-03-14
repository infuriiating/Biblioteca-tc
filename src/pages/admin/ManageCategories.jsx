import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, GripVertical, Check, X, AlertCircle, Save } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { useNotification } from '../../context/NotificationContext'

const ManageCategories = () => {
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
      title: 'Eliminar Categoria',
      message: 'Tem a certeza que deseja eliminar esta categoria? Isto pode afetar livros associados.',
      confirmText: 'Sim, Eliminar',
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
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-text-main tracking-tight">Categorias</h1>
          <p className="text-text-muted mt-1">Gerir as categorias do catálogo de livros.</p>
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
      <form onSubmit={handleAddCategory} className="bg-bg-surface p-6 rounded-3xl border border-border/40 shadow-sm flex gap-4">
        <input 
          type="text"
          placeholder="Nome da nova categoria..."
          className="flex-grow bg-bg-main border border-border/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary/50 outline-none transition-all"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Adicionar
        </button>
      </form>

      {/* Categories List */}
      <div className="bg-bg-surface rounded-3xl border border-border/40 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
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
                className="p-4 flex items-center gap-4 hover:bg-bg-main/40 transition-colors bg-bg-surface"
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
                    <div className="flex items-center gap-1">
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
        )}
      </div>

      <div className="flex justify-end gap-3 items-center">
        <p className="text-[10px] text-text-muted italic">
          Arraste os ícones <GripVertical size={10} className="inline" /> para reordenar
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
              
              showToast('Ordem guardada com sucesso!', 'success')
            } catch (err) {
              console.error(err)
              showToast('Erro ao guardar ordem.', 'error')
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
