import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

async function getColumns() {
  const { data, error } = await supabase.from('loans').select('*').limit(1)
  if (error) {
    console.error('Error:', error)
  } else {
    // If there's no data, we might not get keys, so maybe we can do an options request or just log the keys of the first row
    console.log('Columns:', data && data.length > 0 ? Object.keys(data[0]) : 'No data')
  }
}

getColumns()
