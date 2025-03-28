import { useState } from "react";
import { View , StyleSheet , Text, Pressable } from "react-native";

interface Coordinate {
  latitude : number;
  longitude : number;
};


interface Props {
  region : Coordinate
  confCoordinate: (data: "startPoint" | "endPoint" | "menu") => void;
}


export default function ActionPannel (data : Props){
  const [ controler , setControler ] = useState('startPoint')
  
  // estas constantes van a alvergar las coordenadas
  const [ startPoint , setStartPoint ] = useState<string>('     ')
  const [ endPoint , setEndPoint ] = useState<string>('     ')
  
  const pointStart = (x : Coordinate) => {
    data.confCoordinate('startPoint')
    setControler('menu')
    setStartPoint(data.region.longitude.toString())
  }
  
  const pointEnd = (x : Coordinate) => {
    data.confCoordinate('endPoint')
    setControler('menu')
    setEndPoint(data.region.longitude.toString())
  }

  const plus = () => {
    
  }
  


  return (
    <View style = {styles.container}>
      {controler === 'startPoint' ? 
        <>
          <Text style = {styles.text}>Punto de origen</Text>
          <Text style = {styles.ubi}>{data.region.longitude}</Text>
          {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
            aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
          {/* <Text style = { styles.text } >Punto de destino</Text>
          <Text style = {styles.ubi}>{data.pointEnd}</Text> */}
    
          {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
            aqui tambien hacemos lo mismo de arriba*/}
    
          <Pressable onPress={() => pointStart(data.region)}>
            <Text style = {styles.button} >Enviar</Text>
          </Pressable>
          {/* Aqui debe estar el boton para enviar los datos a la api */}
        </> : controler === 'menu' ? 
        <>
          <Text>start</Text>
          <Pressable onPress={() => setControler('startPoint')}>
            <Text style = { styles.ubi} >{startPoint}</Text>
          </Pressable>
        
          <Text>end</Text>
          <Pressable onPress={() => setControler('endPoint')}>
            <Text style = { styles.ubi} >{endPoint}</Text>
          </Pressable>

          <Pressable onPress={() => setControler('endPoint')}>
            <Text style = { styles.plus } >+</Text>
          </Pressable>

        </> : controler === 'endPoint' ?
        <>
          <Text style = {styles.text}>Punto de destino</Text>
          <Text style = {styles.ubi}>{data.region.longitude}</Text>
          {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
            aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
          {/* <Text style = { styles.text } >Punto de destino</Text>
          <Text style = {styles.ubi}>{data.pointEnd}</Text> */}
    
          {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
            aqui tambien hacemos lo mismo de arriba*/}
    
          <Pressable onPress={() => pointEnd(data.region)}>
            <Text style = {styles.button} >Enviar</Text>
          </Pressable>
        </> : 
        <>

        </>
        }
    </View>
  );

};

const styles = StyleSheet.create(
  {
    container : {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 5,
      position : 'absolute',
      backgroundColor: 'white',
      width: '100%',
      height: 'auto',
      bottom: 0,
      alignItems: 'center'
    },
    text : {
      margin: 10,
      textAlign: 'center'
    },
    ubi : {
      width: '80%',
      backgroundColor: "rgba(169, 169, 169, 0.8)",
      padding: 2,
      fontSize: 20,
      textAlign: 'center',
      borderRadius: 5
    },
    button: {
      margin: 10,
      textAlign: 'center',
      padding: 10,
      backgroundColor: 'yellow'
    },
    plus : {
      padding: 10,
      backgroundColor: 'orange',
      borderRadius: 100,

    }

  }
);
