import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";

export default function Sent() {
    const router = useRouter();
    const { steps } = useLocalSearchParams<{ steps?: string }>(); // recibes steps como string
    const backSteps = parseInt(steps ?? "1", 10); // default = 1

    const position = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(position, {
                    toValue: 1.7,
                    duration: 6000,
                    useNativeDriver: true,
                }),
                Animated.timing(position, {
                    toValue: 0,
                    duration: 3500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const timer = setTimeout(() => {
            for (let i = 0; i < backSteps; i++) {
                router.back();
            }
        }, 3000);

        return () => {
            clearTimeout(timer);
            position.stopAnimation();
        };
    }, [backSteps]);

    const translateX = position.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, { transform: [{ translateX }] }]}>
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
        justifyContent: 'center',
    },
    imageContainer: {},
    img: {
        height: 150,
        width: 150,
    },
    text: {
        fontSize: 20,
    },
});
