import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Link, Route } from "expo-router";

interface DataProps {
  element: {
    title: string;
    link?: Route; // Hacerlo opcional
    onPress?: () => void; // Añadir soporte para onPress
  }
}

export default function BottomStyle({ element }: DataProps) {
  if (element.onPress) {
    return (
    <Link href={element.link!} style={styles.container} onPress={() => console.log('aaaaaaaaaaaaa')} asChild>
      <TouchableOpacity onPress={element.onPress} style={styles.container}>
        <View style={styles.botton}>
          <Text style={styles.text}>{element.title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
    );
  }

  return (
    <Link href={element.link!} style={styles.container}>
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#ff4d4d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 99
    
  },
  botton: {
    alignItems: 'center',
    width: '100%', // Cambio a 100% para que abarque todo el ancho del contenedor
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});