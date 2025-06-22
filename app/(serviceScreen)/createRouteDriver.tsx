import PriceInput from "@/components/driver/PriceInput";
import RoutePointsInput from "@/components/driver/RoutePointsInput";
import SeatsInput from "@/components/driver/SeatsInput";
import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import { View , Text, TextInput , StyleSheet, ScrollView, Alert , Image, Button , Dimensions , useColorScheme, Platform, TouchableOpacity  } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

const {width} = Dimensions.get('window')

interface RouteData {
inicio: string;
final: string;
[key: string]: string;
}

export default function CreateRoutesDriver() {
  const router = useRouter();
  const [ horaSalida, setHoraSalida ] = useState<Date>();
  const [ horaEntrada, setHoraEntrada ] = useState<Date>();
  const [ zonaInicial, setZonaInicial ] = useState<string>();
  const [ zonaFinal, setZonaFinal ] = useState<string>();
  const [ precio, setPrecio ] = useState<any>(0);
  const [ asientos, setAcientos ] = useState<any>(0);
  const [ rutas, setRutas ] = useState<RouteData>();

  console.log(zonaInicial, zonaFinal, precio, asientos, horaEntrada, horaSalida, rutas)
  const handleZonaSelect = (zona: string) => {
    console.log("Zona seleccionada:", zona);
    // Aquí puedes guardar la zona seleccionada en tu estado o base de datos
  };

  const send = () => {
    // logica para publicar ruta
    
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
              save={setHoraEntrada}
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