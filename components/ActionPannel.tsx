import { View , StyleSheet , Text } from "react-native";


export default function ActionPannel (){

  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Punto de origen</Text>
      {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
        aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
      <Text style = { styles.text } >Punto de destino</Text>
      {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
        aqui tambien hacemos lo mismo de arriba*/}

      <Text style = { styles.text } >Enviar</Text>
      {/* Aqui esta el boton para enviar los datos a la api */}
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
      bottom: 0
    },
    text : {
      margin: 50,
      textAlign: 'center'
    }
  }
);
