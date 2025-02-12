import { createClient } from '@supabase/supabase-js';
import Constants  from 'expo-constants';
import { Database } from '@/app/db_types.ts';

const SUPABASE_URL = Constants?.expoConfig?.extra?.supabaseUrl;
const SUPABASE_ANON_KEY = Constants?.expoConfig?.extra?.supabaseAnonKey;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);