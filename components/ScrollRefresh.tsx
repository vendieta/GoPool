import React, { useState, useEffect } from 'react';
import { StyleSheet, View, RefreshControl, FlatList } from 'react-native';
import UserCard from './TEST/UserCard';
import { Link } from 'expo-router';
import { useTheme } from '@/components/Themed/ContextTheme';

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
  const { theme } = useTheme(); // Usamos el ThemeContext
  const [data, setData] = useState<any[]>([]); // Estado para almacenar los datos
  const [error, setError] = useState<string>(''); // Estado para manejar errores
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco

  const fetchData = async () => {
    
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
    return (
      <UserCard
        element={{
          user: item.userName,
          price: item.price,
          date: item.date,
          time: item.time,
          free: item.free,
          startZone: item.startZone,
          endZone: item.endZone,
        }}
      />
    );
  };

  // Colores basados en el tema
  const backgroundColor = theme.name === 'light' ? '#fff' : '#333';
  const refreshColors = theme.name === 'light' ? ['#FF0000', '#00FF00', '#0000FF'] : ['#FF5555', '#55FF55', '#5555FF']; // Colores del spinner ajustados por tema
  const refreshTintColor = theme.name === 'light' ? '#FF0000' : '#FF5555'; // Color del spinner (iOS)
  const refreshTitleColor = theme.name === 'light' ? '#0000FF' : '#5555FF'; // Color del título (iOS)

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.container}>
        <FlatList
          style={styles.containerCard}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={refreshColors} // Colores del spinner (Android)
              tintColor={refreshTintColor} // Color del spinner (iOS)
              title="Refrescando..." // Título (iOS)
              titleColor={refreshTitleColor} // Color del título (iOS)
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible
  },
  link: {},
});

export default ScrollRefresh;