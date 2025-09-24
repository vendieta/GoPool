import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function Sent() {
    const router = useRouter();
    const position = useRef(new Animated.Value(0)).current; // Valor inicial de la posición X

    useEffect(() => {
        // Animación de izquierda a derecha
        Animated.loop(
            Animated.sequence([
                Animated.timing(position, {
                    toValue: 1.7,  // Valor final (derecha)
                    duration: 6000, // Duración de la animación en ms
                    useNativeDriver: true, // Mejor rendimiento
                }),
                Animated.timing(position, {
                    toValue: 0,  // Volver al inicio (izquierda)
                    duration: 3500,
                    useNativeDriver: true,
                })
            ])
        ).start();

        // Temporizador para redirección
        const timer = setTimeout(() => {
                router.back();  // Reemplazar la ruta y "reiniciar" la navegación
                router.back();  // Reemplazar la ruta y "reiniciar" la navegación
                router.back();  // Reemplazar la ruta y "reiniciar" la navegación
                }, 3000); // Reducí el tiempo a 10 segundos (10000ms) para el ejemplo

        return () => {
            clearTimeout(timer);
            position.stopAnimation(); // Detener la animación al desmontar
        };
    }, []);

    // Interpolación para el rango de movimiento
    const translateX = position.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100], // Ajusta estos valores según el movimiento deseado
    });

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.imageContainer,
                    { transform: [{ translateX }] }
                ]}
            >
                <Image style={styles.img} source={require('@/assets/images/tortuCarSinFondo.png')}/>
            </Animated.View>
            <Text style={styles.text}>Se buscara un driver para tu ruta</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        // Estilos adicionales si son necesarios
    },
    img: {
        height: 150,
        width: 150
    },
    text: {
        fontSize: 20
        
    }
});