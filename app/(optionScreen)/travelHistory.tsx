import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardTravel from "@/components/driver/CardTravel";


interface viajes {
    viajes: historyTravel[]
}

interface historyTravel {
    id: string,
    cuposdisponibles: number,
    driver: string,
    horaestimacionllegada: string,
    bloqueopasajeros: false,
    ZonaInicial: string,
    ZonaFinal: string,
    precio: number,
    horasalida: string
}


export default function travelHistory () {
    const { data, loading, error, get } = useApi<viajes>();
    const {
        storedValue: access_token,
        setItem: setAccess_token,
    } = useStorage('access_token');
    
    const {
        storedValue: userId,
        setItem: setId,
        removeItem: removeId
    } = useStorage('userId');

    useEffect(() => {
        if (userId && access_token) {
            get(`/api/viajes/lista/${userId}`, undefined,{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      })
            console.log('el get de la lista viajes',data?.viajes.length)
        }
    }, [userId,access_token])
    console.log('el get de la lista viajes',data)
    console.log('el get de la lista viajes',data?.viajes.length)

    return(
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
                <Text style={styles.header}>Historial de viajes</Text>
                {data && data.viajes && data?.viajes?.length > 0 ? (
                data.viajes.map((viaje) => (
                    <CardTravel key={viaje.id} user={viaje.driver} departureTime={viaje.horasalida} arrivalTime={viaje.horaestimacionllegada}
                        seats={viaje.cuposdisponibles}
                        price={viaje.precio}
                        zoneEnd={viaje.ZonaFinal}
                        zoneInit={viaje.ZonaInicial}/>
                ))) : null}
            
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        fontSize: 22,
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 800
    }
})