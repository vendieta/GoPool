import PriceInput from "@/components/driver/PriceInput";
import RoutePointsInput from "@/components/driver/RoutePointsInput";
import SeatsInput from "@/components/driver/SeatsInput";
import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import { View , Text, TextInput , StyleSheet, ScrollView, Alert , Image, Button , Dimensions , useColorScheme, Platform, TouchableOpacity  } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";

const {width} = Dimensions.get('window')

interface FormattedPoint {
    orden: string | number;
    descripcion: string;
}

interface DataViaje {
	msg: string,
	data: {
		viaje: {
			message: string,
			id: string
		},
		puntos: number
  }
}

export default function CreateRoutesDriver() {
  const router = useRouter();
  const [ horaSalida, setHoraSalida ] = useState<Date>();
  const [ horaLlegada, setHoraLlegada ] = useState<Date>();
  const [ zonaInicial, setZonaInicial ] = useState<string>();
  const [ zonaFinal, setZonaFinal ] = useState<string>();
  const [ precio, setPrecio ] = useState<number>(0);
  const [ asientos, setAcientos ] = useState<number>(0);
  const [ rutas, setRutas ] = useState<FormattedPoint[]>();
  const { data, loading, error, post } = useApi<DataViaje>();

  const {
    storedValue: userId,
    setItem: setId,
    removeItem: removeId
  } = useStorage('userId');

  console.log('zonaInicial: ',zonaInicial,'zonaFinal:', zonaFinal,'precio:', precio,'asientos:', asientos,'horaEntrada',horaLlegada,'horaSalida',horaSalida,'listadepuntos:', rutas)
  const handleZonaSelect = (zona: string) => {
    console.log("Zona seleccionada:", zona);
    // Aquí puedes guardar la zona seleccionada en tu estado o base de datos
  };

  const send = () => {
    // logica para publicar ruta
    if (!zonaInicial || !zonaFinal || !precio || !asientos || !horaSalida || !horaLlegada || !rutas) {
      Alert.alert(
        "error",
        "porfavor complete todos los campos.",
        [{ text: "Entendido" }]
      )
      return;
    }
    post('/api/viajes/crear', {
      id_driver: userId,
      zonaInicial: zonaInicial,
      zonaFinal: zonaFinal,
      precio: precio,
      asientos: asientos,
      horaSalida: horaSalida,
      horaLlegada: horaLlegada,
      Listapuntos: rutas
    })
    router.push("/send");
  };

  return(
    <View style={styles.container}>
      <ScrollView  
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.95,
      }}>
        <View style={[styles.subContainer, Platform.OS === 'web' ? { width: '100%',} : { width: '95%',}]}>
          <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
              <TimeInput
              save={setHoraSalida}
              backColor="#fab1a0"
              SalEnt="Salida"/>
              <TimeInput
              save={setHoraLlegada}
              backColor="#81ecec"
              SalEnt="Llegada"/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>De que zona partes?</Text>
                <Desplegable 
                save={setZonaInicial}
                backColor= '#fab1a0'/>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>A que zona vas?</Text>
                <Desplegable 
                save={setZonaFinal}
                backColor= '#81ecec'/>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <PriceInput
              save={setPrecio}
              />
            </View>
            <View style={{width: '100%'}}><SeatsInput save={setAcientos}/></View>
            <View style={{width: '100%'}}>
              <RoutePointsInput save={setRutas}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={send}>
              <Text>Publicar ruta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  subContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '1%',
    padding: 5
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    width: '95%',
    padding: 10,
    backgroundColor: '#6f6'
  },
  text: {
    textAlign: 'left',
    width: '95%'
  },
  zonaText: {
    width: '100%',
    textAlign: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center'
  }

  
})