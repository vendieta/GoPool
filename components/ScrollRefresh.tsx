import React, { useState , useEffect, useCallback } from 'react';
import { Animated , Image, StyleSheet, Text, View , RefreshControl , FlatList} from 'react-native';
import type { PropsWithChildren, ReactElement } from 'react';
import UserCard from './TEST/UserCard';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from './ThemedView';
import { supabase } from '@/supabaseClient';
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) 
// const HEADER_HEIGHT = 250;



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
  const renderItem = ({ item }) => {
    // * Este codigo permite mostrar en consola la key de cada tarjeta
    console.log('id       :',item)
    return(
    <UserCard element={{
      user:item.user,
      price:item.price,
      date:item.date,
      time: item.time,
      free: item.free,
    initialZone: item.initZone,
    endZone: item.endZone,
  }}></UserCard>
)}
  
  return (

      <ThemedView style={{flexGrow:1,}}>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  reactLogo: {
    width: '100%',
    height: '100%',
  },
  item: {
    padding: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  container:{
    flexGrow:0.3,
  },
  containerCard:{
    flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible

  },
});

export default ScrollRefresh;
// import { ReactElement , PropsWithChildren} from "react";
// import Animated, {
//   interpolate,
//   useAnimatedRef,
//   useAnimatedStyle,
//   useScrollViewOffset,
// } from 'react-native-reanimated';
// import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
// import { useColorScheme } from '@/hooks/useColorScheme'
// import { View , StyleSheet } from "react-native";


// const HEADER_HEIGHT = 250;

// type Props = PropsWithChildren<{
//   headerImage: ReactElement;
//   headerBackgroundColor: { dark: string; light: string };
// }>;


// export default function ScrollImage ({
//   children,
//   headerImage,
//   headerBackgroundColor,
//   }: Props) {
//   const colorScheme = useColorScheme() ?? 'light';
//   const scrollRef = useAnimatedRef<Animated.ScrollView>();
//   const scrollOffset = useScrollViewOffset(scrollRef);
//   const bottom = useBottomTabOverflow();
//   const headerAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(
//             scrollOffset.value,
//             [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
//             [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
//           ),
//         },
//         {
//           scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
//         },
//       ],
//     };
//   });
  
  
//   return(
//     <View style={styles.container}>
//           <Animated.ScrollView
//             ref={scrollRef}
//             // 
//             >
//             <Animated.View
//               style={[
//                 styles.header,
//                 { backgroundColor: headerBackgroundColor[colorScheme] },
//                 headerAnimatedStyle,
//               ]}>
//               {headerImage}
//             </Animated.View>
//             <View style={styles.content}>{children}</View>
//           </Animated.ScrollView>
//         </View>

//   );
// }

// const styles = StyleSheet.create({
//   content:{

//   },
//   container:{
//     flex:1,

//   },
//   header:{

//   }
// })