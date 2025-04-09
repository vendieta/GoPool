import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';

interface DataProps {
    element: {
        user: string,
        price: number,
        date: string,
        time: string,
        free: number,
        startZone: string,
        endZone: string,
    };
};

const UserCard: React.FC<DataProps> = ({ element }) => {
    const jsonData = encodeURIComponent(JSON.stringify(element));
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.mainContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <LinearGradient
                colors={['rgba(30, 30, 50, 0.9)', 'rgba(50, 50, 80, 0.9)']}
                style={styles.borderContainer}
            >
                <Link href={`../${jsonData}`} asChild>
                    <TouchableOpacity
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        activeOpacity={1}
                        style={styles.link}
                    >
                        <View style={styles.card}>
                            {/* Sección izquierda (20%) */}
                            <LinearGradient
                                colors={['rgba(255, 107, 107, 0.2)', 'rgba(255, 107, 107, 0.1)']}
                                style={styles.leftSection}
                            >
                                <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                                    {element.user}
                                </Text>
                                <View style={styles.userAvatar}>
                                    <Text style={styles.avatarInitial}>
                                        {element.user.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                                <Text style={styles.priceText}>${element.price}</Text>
                            </LinearGradient>

                            {/* Sección central (65%) */}
                            <View style={styles.centerSection}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>SALIDA</Text>
                                    <Text style={styles.infoValue}>{element.time} / <Text style={styles.infoValue}>{element.date}</Text></Text>
                                    
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>INICIO</Text>
                                    <Text style={styles.infoValue}>{element.startZone}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>FIN</Text>
                                    <Text style={styles.infoValue}>{element.endZone}</Text>
                                </View>
                            </View>

                            {/* Sección derecha (15%) - Cupos */}
                            <View style={styles.rightSection}>
                                <Text style={styles.cuposLabel}>CUPOS</Text>
                                <Text style={styles.cuposValue}>{element.free}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    borderContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
    },
    link: {
        width: '100%',
    },
    card: {
        flexDirection: 'row',
        height: "auto",
    },
    leftSection: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRightWidth: 0,
        borderRightColor: 'rgba(255,255,255,0.2)',
    },
    centerSection: {
        width: '45%',
        paddingVertical: 10,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },
    rightSection: {
        width: '25%',
        alignItems: 'center',
        paddingTop: 10,
        
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    infoRow: {
        marginBottom: 8,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 107, 107, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 4,
    },
    avatarInitial: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(248, 243, 243)',
    },
    userName: {
        fontWeight: '700',
        fontSize: 13,
        maxWidth: '100%',
        textAlign: 'center',
        marginBottom: 4,
        color: '#fff',
        textShadowColor: 'rgba(255, 255, 255, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    priceText: {
        color: '#00ff00',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 4,
        textShadowColor: 'rgba(14, 250, 250, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '400',
    },
    cuposLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 2,
    },
    cuposValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00ff00',
        textShadowColor: 'rgba(14, 250, 250, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default UserCard;