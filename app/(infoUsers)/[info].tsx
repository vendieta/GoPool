import { useLocalSearchParams } from "expo-router";
import { View, Text , StyleSheet , Button } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";






interface Producto {
  user: string,
  price: number,
  date: string,
  time: string,
  free: number,
  startZone: string,
  endZone: string,
}



export default function Info(){

  const { info } = useLocalSearchParams();
  console.log('string:   ', info)

  
  
  // Convertir el parámetro JSON de vuelta a un array
  const data: Producto = typeof info === 'string'
  ? JSON.parse(decodeURIComponent(info))
  : {} as Producto;;  // Si no es un string, usamos un array vacío como valor predeterminado


  console.log(data)
  console.log(data.user)

  if (Object.keys(data).length  > 0) {

    const navigation = useNavigation();
    // Modificar el header dentro del hook `useEffect`
    useEffect(() => {
      navigation.setOptions({ 
        title: data.user, // Cambiar el título del header
        headerTitleAlign: "center", // Centrar el título
        // headerRight: () => (
        //   <Button
        //     onPress={() => alert("Botón del header presionado")}
        //     title="Botón"
        //     color="#fff"
        //   />
        // ),
        // headerStyle: {
        //   backgroundColor: "#4CAF50", // Cambiar el color de fondo del header
        // },
        
        headerTintColor: "#fff", // Cambiar el color de los textos en el header
      });
    }, [navigation]);
    return(
      <ThemedView style={styles.container}>
          <Text style={styles.text}>{data.user}</Text>
      </ThemedView>
    );
  } else {
      <ThemedView style={styles.container}>
        <Text style={styles.text}>No hay datos disponibles</Text>
      </ThemedView>
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    margin: 'auto',
    color: 'red'
  }

  }
)