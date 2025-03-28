import { View, StyleSheet, Text } from "react-native";
import { Link, Route } from "expo-router";
import { ThemedText } from "./ThemedText";

interface DataProps {
  element: {
    title: string;
    link: Route;
  }
}

export default function BottomStyle({ element }: DataProps) {
  return (
    <Link href={element.link} style={styles.container}>
      <View style={styles.botton}>
        <Text style={styles.text}>{element.title}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    
  },
  botton: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#ff4d4d', // Color rojo como en homeLogin
    width: '100%', // Cambio a 100% para que abarque todo el ancho del contenedor
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});