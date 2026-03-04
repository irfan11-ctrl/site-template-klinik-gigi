import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase credentials missing. The app will fail to load data, but we are preventing a crash.')
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: 'Missing Credentials' }) }) }),
            insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: 'Missing Credentials' }) }) }),
            update: () => ({ eq: () => Promise.resolve({ data: null, error: 'Missing Credentials' }) })
        }),
        auth: {
            getUser: () => Promise.resolve({ data: { user: null } }),
            signOut: () => Promise.resolve()
        }
    };
