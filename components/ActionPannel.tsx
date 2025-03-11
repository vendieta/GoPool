import { useState } from "react";
import { View , StyleSheet , Text, Pressable } from "react-native";

interface Coordinate {
  latitude : number;
  longitude : number;
};


interface Props {
  region : Coordinate
  confCoordinate: (data: "startPoint" | "endPoint") => void;
}


export default function ActionPannel (data : Props){
  const [ controler , setControler ] = useState('startPoint')
  
  const enviar = () => {
    data.confCoordinate('startPoint')
    setControler('endPoint')
  }

  return (
    <View style = {styles.container}>
      {controler === 'startPoint' ? <>
      
        <Text style = {styles.text}>Punto de origen</Text>
        <Text style = {styles.ubi}>{data.region.longitude}</Text>
        {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
          aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
        {/* <Text style = { styles.text } >Punto de destino</Text>
        <Text style = {styles.ubi}>{data.pointEnd}</Text> */}
  
        {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
          aqui tambien hacemos lo mismo de arriba*/}
  
        <Pressable onPress={enviar}>
          <Text style = { styles.button} >Enviar</Text>
        </Pressable>
        {/* Aqui esta el boton para enviar los datos a la api */}
      </> : <>
      
      
      <Text>start</Text>
      <Pressable onPress={() => setControler('startPoint')}>
        <Text style = { styles.ubi} >{} loremjadfjajfa;l flakjflajfjajfla;jkfl jflkjas lj</Text>
      </Pressable>
    
      <Text>end</Text>
      <Pressable onPress={() => setControler('startPoint')}>
        <Text style = { styles.ubi} >{} jsjsjsjjsjjsjsjsjsjsjjs</Text>
      </Pressable>
      </>}
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
    }

  }
);
