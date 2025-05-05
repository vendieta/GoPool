import PriceInput from "@/components/driver/PriceInput";
import RoutePointsInput from "@/components/driver/RoutePointsInput";
import SeatsInput from "@/components/driver/SeatsInput";
import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import { View , Text, TextInput , StyleSheet, ScrollView, Alert , Image, Button , Dimensions , useColorScheme, Platform, TouchableOpacity  } from "react-native";

export default function CreateRoutesDriver() {

  const handleZonaSelect = (zona: string) => {
    console.log("Zona seleccionada:", zona);
    // Aquí puedes guardar la zona seleccionada en tu estado o base de datos
  };

  return(
    <View style={styles.container}>
      <ScrollView  
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <View style={[styles.subContainer, Platform.OS === 'web' ? { width: '100%',} : { width: '95%',}]}>
          <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
              <TimeInput 
              backColor="#fab1a0"
              SalEnt="Salida"/>
              <TimeInput
              backColor="#81ecec"
              SalEnt="Llegada"/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>De que zona partes?</Text>
                <Desplegable 
                text="hola"
                backColor= '#fab1a0'/>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>A que zona vas?</Text>
                <Desplegable 
                text="hola"
                backColor= '#81ecec'/>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <PriceInput/>
            </View>
            <View style={{width: '100%'}}><SeatsInput/></View>
            <View style={{width: '100%'}}>
              <RoutePointsInput />
            </View>
            <TouchableOpacity>
              <Text>Crear</Text>
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
  }

  
})