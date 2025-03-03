import { useLocalSearchParams } from "expo-router";
import { View, Text , StyleSheet} from "react-native";


interface Producto {
  id: number;
  infouser: string;
  costo: number;
}


export default function Info(){

  const { info } = useLocalSearchParams();
  console.log('string:   ', info)

  
  
  // Convertir el parámetro JSON de vuelta a un array
  // Asegurarnos de que `data` sea un string antes de usarlo
  const dataArray: Producto[] = typeof info === 'string'
  ? JSON.parse(decodeURIComponent(info))  // Si es un string, lo parseamos
  : [];  // Si no es un string, usamos un array vacío como valor predeterminado

  // const dataArray: Producto[] = info ? JSON.parse(decodeURIComponent(info)) : [];


  return(
    <View style={styles.container}>
      <Text style={styles.text}> {info} </Text>
    </View>
  );
}

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