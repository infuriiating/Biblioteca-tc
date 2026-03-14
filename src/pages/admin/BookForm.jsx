import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ChevronLeft, Upload, Save, Loader2, Image as ImageIcon } from 'lucide-react'
import Select from '../../components/ui/Select'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { useNotification } from '../../context/NotificationContext'

const BookForm = () => {
  const { showToast } = useNotification()
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    year_edition: new Date().getFullYear(),
    category_id: '',
    quantity: 5,
    available_qty: 5,
    cover_image: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    fetchCategories()
    if (isEdit) fetchBook()
  }, [id])

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true })
    setCategories(data || [])
  }

  const fetchBook = async () => {
    const { data, error } = await supabase.from('books').select('*').eq('id', id).single()
    if (data && !error) {
      setFormData(data)
      if (data.cover_image) {
        setImagePreview(supabase.storage.from('capalivro').getPublicUrl(data.cover_image).data.publicUrl)
      }
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverFilename = formData.cover_image

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        coverFilename = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('capalivro')
          .upload(coverFilename, imageFile)

        if (uploadError) throw uploadError
      }

      const finalData = { ...formData, cover_image: coverFilename }
      delete finalData.categories

      if (isEdit) {
        const { error } = await supabase.from('books').update(finalData).eq('id', id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('books').insert([finalData])
        if (error) throw error
      }

      navigate('/admin/books')
      showToast(isEdit ? 'Livro atualizado com sucesso!' : 'Livro adicionado com sucesso!', 'success')
    } catch (error) {
      showToast('Error saving book: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-10">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white hover:bg-bg-surface rounded-2xl shadow-sm border border-border/50 transition-all text-text-muted hover:text-primary"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{isEdit ? 'Edit Book' : 'Add New Book'}</h1>
          <p className="text-text-muted text-lg">{isEdit ? 'Update details for this catalog item' : 'Create a new entry in the library system'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
        {/* Cover Upload */}
        <div className="space-y-6">
          <div className="aspect-[3/4.5] bg-white border-2 border-dashed border-border/50 rounded-[2.5rem] overflow-hidden relative group shadow-sm">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" alt="Preview" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted gap-4">
                <div className="p-6 rounded-full bg-bg-main border border-border/10">
                  <ImageIcon size={48} className="opacity-20" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] opacity-50">No Cover</p>
                  <p className="text-[10px] opacity-30 mt-1 uppercase tracking-widest font-bold">Image Preview</p>
                </div>
              </div>
            )}
            <label className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer gap-3 backdrop-blur-sm">
              <div className="p-4 rounded-2xl bg-white/20 text-white">
                <Upload size={32} />
              </div>
              <span className="text-white text-xs font-extrabold uppercase tracking-[0.2em]">Upload Cover</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div className="p-6 bg-white rounded-[2rem] border border-border/50 space-y-3 shadow-sm">
             <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">Guidelines</h4>
             <ul className="text-xs text-text-muted space-y-2 opacity-60 font-medium">
                <li>• Higher resolution images are preferred</li>
                <li>• Recommended aspect ratio: 3:4</li>
                <li>• Max file size: 5MB (JPG, PNG)</li>
             </ul>
          </div>
        </div>

        {/* Data Fields */}
        <div className="lg:col-span-2 bg-white border border-border/50 p-10 rounded-[3rem] space-y-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-[0.2em] text-text-muted ml-1">Full Title</label>
              <input 
                required
                className="w-full bg-bg-main/50 border border-transparent rounded-[1.25rem] py-4 px-6 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-text-main text-lg shadow-inner focus:shadow-none"
                placeholder="The Great Gatsby"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-[0.2em] text-text-muted ml-1">Author Name</label>
              <input 
                className="w-full bg-bg-main/50 border border-transparent rounded-[1.25rem] py-4 px-6 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold shadow-inner focus:shadow-none"
                placeholder="F. Scott Fitzgerald"
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-[0.2em] text-text-muted ml-1">ISBN Reference</label>
              <input 
                className="w-full bg-bg-main/50 border border-transparent rounded-[1.25rem] py-4 px-6 outline-none focus:bg-white focus:border-primary/30 transition-all font-mono font-bold shadow-inner focus:shadow-none"
                placeholder="978-0-..."
                value={formData.isbn}
                onChange={e => setFormData({...formData, isbn: e.target.value})}
              />
            </div>

            <div className="space-y-0">
              <Select 
                label="Primary Category"
                placeholder="Select genre..."
                options={categories}
                value={formData.category_id}
                onChange={val => setFormData({...formData, category_id: val})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-[0.2em] text-text-muted ml-1">Publisher</label>
              <input 
                className="w-full bg-bg-main/50 border border-transparent rounded-[1.25rem] py-4 px-6 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold shadow-inner focus:shadow-none"
                placeholder="Charles Scribner's Sons"
                value={formData.publisher}
                onChange={e => setFormData({...formData, publisher: e.target.value})}
              />
            </div>



            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-[0.2em] text-text-muted ml-1">Inventory Quantity</label>
              <input 
                type="number"
                className="w-full bg-bg-main/50 border border-transparent rounded-[1.25rem] py-4 px-6 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold shadow-inner focus:shadow-none"
                value={formData.quantity}
                onChange={e => setFormData({...formData, quantity: parseInt(e.target.value), available_qty: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-extrabold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {isEdit ? 'Update Book' : 'Add to Collection'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BookForm
