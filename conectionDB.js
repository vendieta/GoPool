import { supabase } from './supabaseClient';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('userData').select('*');
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Datos obtenidos:', data);
      }
    }
    fetchData();
  }, []);
}
