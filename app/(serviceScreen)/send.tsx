import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Sent() {
    const router = useRouter();
    const { steps, direction } = useLocalSearchParams<{ steps?: string, direction?: string }>();
    const backSteps = parseInt(steps ?? "1", 10);

    const position = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(position, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(position, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const timer = setTimeout(() => {
            for (let i = 0; i < backSteps; i++) {
                router.back();
            }
            if (direction === "true") {
                router.replace("/(tabs)/rutas");
            }
        }, 3000);

        return () => {
            clearTimeout(timer);
            position.stopAnimation();
        };
    }, [backSteps]);

    const translateX = position.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, 150],
    });

    return (
        <LinearGradient
            colors={["#4caf50", "#2e7d32", "#1b5e20"]}// verde oscuro degradado
            style={styles.container}
        >
            <Animated.View style={[styles.imageContainer, { transform: [{ translateX }] }]}>
                <Image
                    style={styles.img}
                    source={require("@/assets/images/tortuCarSinFondo.png")}
                />
            </Animated.View>


        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        marginBottom: 40,
    },
    img: {
        height: 160,
        width: 160,
        resizeMode: "contain",
    },
    ground: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 120,
        backgroundColor: "#0d260d", // suelo aún más oscuro
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    text: {
        fontSize: 20,
        color: "#e8f5e9",
        fontWeight: "600",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        position: "absolute",
        bottom: 30,
    },
});
