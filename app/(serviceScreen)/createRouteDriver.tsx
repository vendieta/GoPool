import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import ZonaSelector from "@/components/driver/ZonaSelector";
import { View , Text, TextInput , StyleSheet, Alert , Image, Button , Dimensions , useColorScheme, Platform  } from "react-native";

export default function CreateRoutesDriver() {

  const handleZonaSelect = (zona: string) => {
    console.log("Zona seleccionada:", zona);
    // Aquí puedes guardar la zona seleccionada en tu estado o base de datos
  };

  return(
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Crea tu viaje</Text>
        <View style={styles.inputContainer}>
          {/* <Text  style={styles.text}>hora de salidas</Text>
          <TextInput 
            placeholder="hola"
            style={styles.input}/> */}
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
            <TimeInput />
            <TimeInput/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
            <View style={{width: '45%'}}>
              <Text style={styles.zonaText}>De que zona partes?</Text>
              <Desplegable />
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.zonaText}>A que zona vas?</Text>
              <Desplegable />
            </View>
          </View>

          <TextInput
            placeholder="Norte"
            style={styles.input}
          />
        </View>
      </View>
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
    height: '80%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%'
    
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