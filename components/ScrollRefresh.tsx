import React, { useState , useEffect } from 'react';
import { StyleSheet, View , RefreshControl , FlatList } from 'react-native';
import UserCard from './TEST/UserCard';
import { ThemedView } from './ThemedView';
import { supabase } from '@/supabaseClient';
import { Link } from 'expo-router';
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) 
// const HEADER_HEIGHT = 250;

interface Item {
  id: string;
  userName: string;
  price: number;
  date: string; // O Date dependiendo del formato que usas
  time: string; // O Date dependiendo de tu formato
  free: number;
  startZone: string;
  endZone: string;
}


const ScrollRefresh = () => {

  const [ data , setData] = useState<any[]>([]); // Estado para almacenar los datos
  const [error, setError] = useState<string>(''); // Estado para manejar errores
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco

  const fetchData = async () => {
    const { data, error } = await supabase
    .from('cardData') // Especifica tu tabla aquí
    .select('*'); // O especifica las columnas que quieres recuperar
    
    if (error) {
      setError(error.message); // Si hay un error, lo guardamos en el estado
      return;
    }
    
    setData(data); // Si todo va bien, guardamos los datos
    console.log(data[2])
  };

  useEffect(() => {
    fetchData();
  }, []); // Este efecto se ejecutará solo una vez, al montar el componente


  
  // Función que simula una actualización de datos
  const onRefresh = () => {
  setRefreshing(true);
  setTimeout(() => {
    fetchData();
    setRefreshing(false);
  }, 2500);
};
   // Renderiza cada elemento de la lista
  const renderItem = ({ item }: { item: Item }) => {
    // * Este codigo permite mostrar en consola la key de cada tarjeta
    // console.log('id       :',item)
    // console.log('startzone       :',item.startZone)
    return(
      <UserCard element={{
        user:item.userName,
        price:item.price,
        date:item.date,
        time: item.time,
        free: item.free,
        startZone: item.startZone,
        endZone: item.endZone,
      }}
      />
)}
  
  return (

      <ThemedView style={{flex:1,}}>
        <View style={styles.container}>
          <FlatList
            style={styles.containerCard}
            // contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
            data={data}
            keyExtractor={(item)=> item.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#FF0000', '#00FF00', '#0000FF']} // Colores del spinner (Android)
                tintColor="#FF0000" // Color del spinner (iOS)
                title="Refrescando..." // Título (iOS)
                titleColor="#0000FF" // Color del título (iOS)
                />
              }
            >
        </FlatList>
        </View>
      </ThemedView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  },
  containerCard:{
    flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible
  },
  link: {
  }
});

export default ScrollRefresh;