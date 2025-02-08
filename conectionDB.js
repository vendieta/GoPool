import { supabase } from './supabaseClient';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

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
