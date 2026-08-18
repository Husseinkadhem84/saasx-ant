import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './env.js';

let supabase: SupabaseClient | null = null;

if (config.SUPABASE_URL && config.SUPABASE_ANON_KEY) {
  supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const supabaseClient = supabase;
