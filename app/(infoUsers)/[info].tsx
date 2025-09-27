import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/Themed/ContextTheme";
import { MaterialIcons } from "@expo/vector-icons";
import SeatsInput from "@/components/driver/SeatsInput";
import RoutesPannel from "@/components/user/RoutesPannel";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { useRouter } from "expo-router";

interface Producto {
  user: string;
  price: number;
  date: string;
  departureTime: string;
  seats: number;
  arrivalTime: string;
  routePoints: string[];
  zoneInit: string;
  zoneEnd: string;
  id: string;
};

interface data {
  msg: string,
  viaje: boolean,
  registro: {
    message: string
  }
}

export default function Info() {
  const router = useRouter();
  const { info } = useLocalSearchParams();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { data: data2, loading, error: error2, post } = useApi<data>();
  const [seats, setSeats] = useState<number>(0);
  const {
    storedValue: userId,
  } = useStorage('userId');

  const data: Producto = typeof info === "string"
    ? JSON.parse(decodeURIComponent(info))
    : ({} as Producto);
  
    useEffect(() => {
      if (data2) {
        router.push({ pathname: "/send", params: { steps: 2 , direction: 'true' } });
      }
    },[data2])
    
    useEffect(() => {
    console.log(data)
    if (Object.keys(data).length > 0) {
      navigation.setOptions({
        title: `Detalles de ${data.user}`,
        headerTitleAlign: "center",
        headerTintColor: theme.text,
        headerStyle: { backgroundColor: theme.cardBackground },
      });
    }
  }, [navigation, data, theme]);


  const aceptar = async (idViaje: string, userId: string | null, cupos: number) => {
    if (data.seats <= 0) {
      Alert.alert(
      "Atención", // título
      "Este viaje no tiene asientos disponibles", // mensaje
      [
        { text: "OK", onPress: () => console.log("Usuario presionó OK") }
      ],
      { cancelable: true }
    );

      return
    }

    console.log(cupos)
    console.log(!idViaje || !userId || cupos <= 0 || !cupos)
    if (!idViaje || !userId || cupos <= 0 || !cupos) {
      Alert.alert(
      "Atención", // título
      "Indique el número de asientos, por favor", // mensaje
      [
        { text: "OK", onPress: () => console.log("Usuario presionó OK") }
      ],
      { cancelable: true }
    );
      return
    }
    try {
      await post('/api/viajes/unirse', {
        id_viaje : idViaje,
        userid: userId,
        cantidad_cupos: cupos 
      });
    } catch (error) {
      console.error(error2);
      Alert.alert('Algo salio mal intentelo otra vez')
    }
    
  }
  console.log('🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬', error2)
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} style={[styles.container, { backgroundColor: theme.subtleBackground }]}>
      <View style={styles.center}>
        {Object.keys(data).length > 0 ? (
          <View style={styles.content}>
            <View style={[styles.containerHeader, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.lateral}>
                <Text style={[styles.lateralTitle, { color: theme.labelText }]}>Precio</Text>
                <Text style={[styles.lateralValue, { color: theme.text }]}>$ {data.price}</Text>
              </View>
              <View style={styles.profileHeader}>
                <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
                  {/* <Text style={styles.avatarText}>{data.user.charAt(0).toUpperCase()}</Text> */}
                </View>
                <Text style={[styles.userName, { color: theme.text }]}>{data.user}</Text>
                {/* <Text style={[styles.userName, { color: theme.text }]}>Max Atahualpa taguantisuyo Paquisha goku</Text> */}
                <Text style={[styles.userStatus, { color: theme.labelText }]}>
                  {data.seats > 0 ? `${data.seats} cupos disponibles` : 'Sin cupos'}
                </Text>
              </View>
              <View style={styles.lateral}>
                <Text style={[styles.lateralTitle, { color: theme.labelText }]}>Fecha</Text>
                <Text style={[styles.lateralValue, { color: theme.text }]}>{data.date}</Text>
              </View>
            </View>
        
            <View style={[styles.section, {flexDirection: 'row', justifyContent: 'space-around', backgroundColor: theme.cardBackground, padding: 5, alignItems: 'center'}]}>
              <View style={{flexDirection: 'column', gap: 5}}><Text  style={{color: theme.text}}>{data.zoneInit}</Text><Text style={{color: theme.text}}>{data.departureTime}</Text></View>
              <FontAwesome name="long-arrow-right" size={25} color="#fff" />
              <View style={{flexDirection: 'column', gap: 5}}><Text  style={{color: theme.text}}>{data.zoneEnd}</Text><Text  style={{color: theme.text}}>{data.arrivalTime}</Text></View>
              {/* <View style={{alignItems: 'center'}}><Text style={{color: theme.text}}>{data.date}</Text></View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}><Text style={{color: theme.text}}>{data.zoneInit}</Text><Text style={{color: theme.text}}>{data.zoneEnd}</Text></View> */}
            </View>
            
            <View style={[styles.section, {backgroundColor: theme.cardBackground, padding: 10}]}>
              <Text style={[styles.cardTitle, { color: theme.labelText}]}>Rutas</Text>
              <RoutesPannel routes={data.routePoints} />
            </View>

            <View style={[styles.section, {backgroundColor: theme.cardBackground, padding: 10}]}>
              <SeatsInput color="white" x={data.seats} save={setSeats} />
            </View>

            <TouchableOpacity style={[styles.contactButton, { backgroundColor: theme.accent }]} onPress={() => aceptar(data.id, userId, seats)}>
              <Text style={styles.contactButtonText}>Contactar a {data.user}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="error-outline" size={48} color={theme.labelText} />
            <Text style={[styles.emptyText, { color: theme.text }]}>No hay datos disponibles</Text>
          </View>
        )}
      </View>
      <LoadingOverlay visible={loading}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lateral: {
    justifyContent: 'center'
  },
  content: {
    padding: 16,
    gap: 20,
  },
  profileHeader: {
    alignItems: 'center',
    width: '60%'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  userStatus: {
    fontSize: 14,
  },
  section: {
    borderRadius: 10,
  },
  infoCard: {
    padding: 12,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  contactButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  lateralTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
    
  },
  lateralValue: {
    fontSize: 16,
    textAlign: 'center'
  }
});
