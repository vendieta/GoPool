import { View , Text , StyleSheet} from 'react-native';
import BottomStyle from '@/components/BottomStyle'
import { ThemedView } from '@/components/ThemedView';


export default function createCount(){
  return(
      <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.text}>Bienbenido a GoPool comenzemos tu viaje</Text>
            <Text style={styles.text}>Te ayudare a contactar con otras personas con las que compartes una ruta</Text>
          </View>
          <View style={styles.containerBottom}>
            <BottomStyle element={{
              title: 'INICIA SESION',
              link: '/(sesionScreen)/sesionOn'
            }}/>
            <BottomStyle element={{
              title: 'CREAR CUENTA',
              link: '/(sesionScreen)/createCount'
            }}/>
          </View>
      </View>
  );

}

const styles = StyleSheet.create({
  container:{
    width: '80%',
    margin: 'auto',
    backgroundColor: 'orange',
    borderRadius: 35,
    padding: 50,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 25
  },
  text: {
    fontSize: 20,
  },
  containerBottom: {
    flexDirection: 'column',
    gap: 25,

  },
  containerText: {

  }
    
});