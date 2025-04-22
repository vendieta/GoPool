import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function sent() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
        // Resetear el stack de navegación y redirigir a "/home"
        router.replace("/");
        // Alternativa con reset explícito (si usas navegación por stack):
        // router.navigate({
        //   pathname: "/home",
        //   params: { resetNavigation: true }, // (Opcional, si necesitas lógica adicional)
        // });
      }, 3000); // 3000 ms = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer al desmontar el componente
    }, []);
    return(
        <View style={styles.container}>
            <Text>listo se buscara un driver para tu ruta</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
})