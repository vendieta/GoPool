import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, FlatList } from "react-native";
import { useTheme } from '@/components/Themed/ContextTheme';
import HistoryCard from "@/components/driver/HistoryCard";



interface ViajesResponse {
  viajes: Viaje[];
}

interface Viaje {
  id: string;
  cuposdisponibles: number;
  driver: string;
  horaestimacionllegada: string; // formato ISO string
  bloqueopasajeros: boolean;
  ZonaInicial: string;
  ZonaFinal: string;
  precio: number;
  horasalida: string; // formato ISO string
  id_vehiculo: string;
  finalizado: boolean;
  fechaCreacion: string | null;
  puntosruta: RouteData[];
}


interface RouteData {
inicio: string;
final: string;
[key: string]: string;
}

// interface PuntoRuta {
//   id: string;
//   orden: string; // puede ser "inicio", "fin" o un número como string
//   latitud: number | null;
//   longitud: number | null;
//   descripcion: string;
//   idrutadriver: string;
// }

export default function Viajes(){
    const { data, loading, error, get } = useApi<ViajesResponse>();
    const { theme } = useTheme();
    const {
      storedValue: userId,
      setItem: setId,
    } = useStorage('userId');

    useEffect(() => {
        if (userId) {
            get(`/api/viajes/lista/${userId}`);
        }
    },[userId]);

    
    const renderItem = ({ item }: { item: Viaje }) => (
        (item.cuposdisponibles != 0) ? <HistoryCard 
        id = {item.id}
        user= {'Desconocido'}
        price= {item.precio}
        routePoints= {item.puntosruta.sort((a, b) => 
            (+a.orden || (a.orden === 'inicio' ? 0 : 999)) - (+b.orden || (b.orden === 'inicio' ? 0 : 999))
            ).map(p => p.descripcion )|| []
        }
        // routePoints= {item.puntosruta.sort((a, b) => parseInt(a.orden) - parseInt(b.orden)).map(punto => punto.descripcion) || []} 
        arrivalTime= {item.horaestimacionllegada}
        departureTime= {item.horasalida}
        seats= {item.cuposdisponibles}
        date= {item.horasalida.split('T')[0].replace(/-/g, '/') }
        zoneInit= {item.ZonaInicial}
        zoneEnd= {item.ZonaFinal}
        routePointsObj={item.puntosruta}
        />
        : null
    );


    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.cotainer, {backgroundColor: theme.background}]}>
                {data?.viajes[0] ? 
                <>
                <FlatList
                          data={data?.viajes || []}
                          keyExtractor={(item) => item.id}
                          renderItem={renderItem}
                          // numColumns={2}
                          // columnWrapperStyle={{ justifyContent: 'space-around', paddingBottom: 10, gap: 10 }}
                          contentContainerStyle={styles.listContent}
                          showsVerticalScrollIndicator= {false}
                          keyboardShouldPersistTaps="handled"
                        //   refreshControl={
                        //     <RefreshControl
                        //       refreshing={refreshing}
                        //       onRefresh={onRefresh}
                        //       colors={[theme.primary]}
                        //       tintColor={theme.primary}
                        //     />
                        //   }
                          // ItemSeparatorComponent={() => (
                          //   <View style={{ height: 0, backgroundColor: 'transparent' }} />
                          // )}
                        />
     
                    <Text style={[styles.text, {color: theme.text}]}>hoy</Text>
                    <View style={styles.subContainer}>
                        
                    </View>

                </> :
                <Text style={[styles.text, {color: theme.text}]}>
                    No hay viajes registrados por ahora...
                </Text>
                }
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:  '#2A2A2C'
    },
    subContainer: {
        width: '96%',
        backgroundColor: '#1C1C1E',
        borderRadius: 8,
        padding: 10,
    },
    text: {
        textAlign: 'center',
        color: 'white'
    },
    listContent: {
        paddingTop: 6,
    },


})