import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';

interface DataProps {
    user: string;
    price: number;
    puntos: string[];
    horaSalida: string;
    horaLlegada: string;
    cupos: number;
}


export default function UserCard({user,price,puntos,horaSalida,horaLlegada,cupos}: DataProps) {
    const jsonData = encodeURIComponent(JSON.stringify({user,price,puntos,horaSalida,horaLlegada,cupos}))
    return(
        <Link href={`../${jsonData}`} asChild>
            <TouchableOpacity style={styles.container} >
                <View style={styles.header}>
                    <View style={styles.circle} />
                    <View style={styles.headerText}>
                        <Text style={styles.username}>{user}</Text>
                        <Text style={styles.details}>{horaSalida}       ${price}</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    {puntos.map((x, index) => {return(
                        <Text key={index} style={{justifyContent: 'center', fontWeight: '400'}}><FontAwesome name="map-marker" size={17} color="#003163" /> {x}</Text>
                    )})}
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.infoText}>cupos: {cupos}</Text>
                        <Text style={styles.infoText}>Llegada: {horaLlegada}</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={35} color="black" />
                </View>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>pedir</Text>
                </TouchableOpacity> */}
            </TouchableOpacity>
        </Link>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '48.7%',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#666',
        borderWidth: 1,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        

    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 16,
        backgroundColor: 'limegreen',
        marginRight: 10
    },
    headerText: {
        flexDirection: 'column'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16
    },
    details: {
        fontSize: 14,
        fontWeight: '500',
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'baseline',
        gap: 3,
        marginLeft: 1.5
    },
    infoText: {
        fontSize: 13,
        marginTop: 3,
        textAlign: 'left',
        width: '100%',
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    textPunto: {
        fontSize: 14,
        textAlign: 'left',
    },
    button: {
        backgroundColor: 'green',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#D5D5D5',
        borderBottomLeftRadius : 9,
        borderBottomRightRadius : 9

    }
})

