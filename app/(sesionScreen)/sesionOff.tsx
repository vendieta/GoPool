import Botton from "@/components/Bottom";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet , View} from "react-native";

export default function sesionOff(){
  return(
    <ThemedView style={styles.container}>
      <View style={styles.containerBottom}>
        <Botton element={{title: 'Iniciar sesion', link: '/(sesionScreen)/startSesion'}}/>
        <Botton element={{title: 'Crear cuenta', link: '/(sesionScreen)/createCount'}}/>  
      </View>
    </ThemedView>
  );
}

const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  containerBottom:{
    width:'80%',
    margin: 'auto',
    flexDirection: 'column',
    gap: 15
  }
})
