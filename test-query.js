import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_APP_URL'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_APP_KEY'

// We will read env from .env
import test from 'node:test'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function test() {
  const { data, error } = await supabase
    .from('loans')
    .select('*, books(*)')
    .order('created_at', { ascending: false })
    .limit(1)

  console.log('Query with created_at:', { error: error?.message, data })
  
  const { data: data2, error: error2 } = await supabase
    .from('loans')
    .select('*, books!fk_loans_book(*)')
    .order('id', { ascending: false })
    .limit(1)

  console.log('Query with id and specific fk:', { error: error2?.message, data2 })
}

test()
