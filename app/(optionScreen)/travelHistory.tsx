import CardTravel from "@/components/driver/CardTravel";
import { ThemedView } from "@/components/themed-view";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, useColorScheme } from "react-native";
import { Colors } from '@/constants/theme';

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
    const theme = useColorScheme();
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


    if (loading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error al cargar los viajes.</Text>;

   return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Text style={[styles.header, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
          Historial de viajes
        </Text>

        {data?.viajes?.length ? (
          data.viajes.map(viaje => (
            <CardTravel
              key={viaje.id}
              user={viaje.driver}
              departureTime={viaje.horasalida}
              arrivalTime={viaje.horaestimacionllegada}
              seats={viaje.cuposdisponibles}
              price={viaje.precio}
              zoneEnd={viaje.ZonaFinal}
              zoneInit={viaje.ZonaInicial}
            />
          ))
        ) : (
          <Text>No tienes viajes registrados.</Text>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '800',
  },
});