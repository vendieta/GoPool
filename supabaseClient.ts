import { createClient } from '@supabase/supabase-js';
import Constants  from 'expo-constants';
import { Database } from '@/db_types';


const SUPABASE_URL= 'https://hpgixpjawpbiqfmsvxfo.supabase.co'
const SUPABASE_ANON_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZ2l4cGphd3BiaXFmbXN2eGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NTIzMzksImV4cCI6MjA1MTAyODMzOX0.c7Z-L9IWJU5S8v1rxjuZ8OBM9-ezvaan1kcDrFqxejw'
        

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
