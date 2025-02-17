import { View , Text , StyleSheet} from 'react-native';
import ButtomStyle from '@/components/BottomStyle'

export default function createCount(){
  return(
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.text}>Usted puede crear su cuenta con su correo de espol o pasar por una verificacion</Text>
      </View>
      <View style={styles.containerBottom}>
        <ButtomStyle element={{
            title: 'Usuario de espol',
            link: '/' // pagina donde se registran los usuarios de espol
        }}/>
        <ButtomStyle element={{
            title: 'Usuario externo',
            link: '/' //pagina donde se regitran los usuarios externos a espol
        }}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    margin: 'auto',
    backgroundColor: 'orange',
    borderRadius: 35,
    padding: 50,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 25
  },
  containerText:{

  },
  containerBottom: {
    flexDirection: 'column',
    gap: 25,
  },
  text: {
    fontSize: 25
  }
})