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
                            {/* Sección izquierda (40%) */}
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

                            {/* Sección derecha (60%) */}
                            <View style={styles.rightSection}>
                                {/* Fila superior */}
                                <View style={styles.gridRow}>
                                    <View style={styles.gridCell}>
                                        <Text style={styles.infoLabel}>SALIDA</Text>
                                        <Text style={styles.infoValue}>{element.time}</Text>
                                        <Text style={styles.infoValue}>{element.date}</Text>
                                    </View>
                                    <View style={styles.gridCell}>
                                        <Text style={styles.infoLabel}>CUPOS</Text>
                                        <Text style={[styles.infoValue, styles.freeText]}>{element.free}</Text>
                                    </View>
                                </View>

                                {/* Fila inferior */}
                                <View style={styles.gridRow}>
                                    <View style={styles.gridCell}>
                                        <Text style={styles.infoLabel}>INICIO</Text>
                                        <Text style={styles.infoValue}>{element.startZone}</Text>
                                    </View>
                                    <View style={styles.gridCell}>
                                        <Text style={styles.infoLabel}>FIN</Text>
                                        <Text style={styles.infoValue}>{element.endZone}</Text>
                                    </View>
                                </View>
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
        height: 130, // Aumentado ligeramente la altura
    },
    leftSection: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRightWidth: 0,
        borderRightColor: 'rgba(255,255,255,0.2)',
    },
    rightSection: {
        width: '67%',
        paddingVertical: 0,
        
    },
    gridRow: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 1,
    },
    gridCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        height: '100%',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 0,
    },
    userAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'rgba(255, 107, 107, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 6,
    },
    avatarInitial: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'rgb(248, 243, 243)',
    },
    userName: {
        fontWeight: '700',
        fontSize: 15,
        maxWidth: '90%',
        textAlign: 'center',
        marginBottom: 6,
        color: '#fff',
        textShadowColor: 'rgba(255, 255, 255, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    priceText: {
        color: '#00ff00',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 6,
        textShadowColor: 'rgba(14, 250, 250, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 3,
        textAlign: 'center',
    },
    infoValue: {
        fontSize: 13,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400',
    },
    freeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00ff00',
        textShadowColor: 'rgba(14, 250, 250, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default UserCard;