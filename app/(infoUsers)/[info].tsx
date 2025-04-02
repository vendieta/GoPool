import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTheme } from "@/components/Themed/ContextTheme";

interface Producto {
  user: string;
  price: number;
  date: string;
  time: string;
  free: number;
  startZone: string;
  endZone: string;
}

export default function Info() {
  const { info } = useLocalSearchParams();
  console.log('string:   ', info);

  // Convertir el parámetro JSON de vuelta a un objeto
  const data: Producto = typeof info === 'string'
    ? JSON.parse(decodeURIComponent(info))
    : ({} as Producto); // Si no es un string, usamos un objeto vacío como predeterminado

  console.log(data);
  console.log(data.user);

  const { theme } = useTheme(); // Usamos el contexto de tema
  const navigation = useNavigation();

  // Colores basados en el tema
  const isLightTheme = theme.name === 'light';
  const backgroundColor = isLightTheme ? '#fff' : '#333'; // Fondo según tema
  const textColor = isLightTheme ? '#000' : '#fff'; // Texto según tema (reemplaza 'red')

  // Modificar el header dentro del hook `useEffect`
  useEffect(() => {
    if (Object.keys(data).length > 0) {
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
    }
  }, [navigation, data]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {Object.keys(data).length > 0 ? (
        <Text style={[styles.text, { color: textColor }]}>{data.user}</Text>
      ) : (
        <Text style={[styles.text, { color: textColor }]}>
          No hay datos disponibles
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centramos el contenido verticalmente
    alignItems: 'center', // Centramos el contenido horizontalmente
  },
  text: {
    fontSize: 16, // Tamaño de texto más legible
  },
});