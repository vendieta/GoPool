import { View , Text , StyleSheet} from 'react-native';
import ButtomStyle from '@/components/BottomStyle'
import ImgCard from '@/components/ImgCard';

export default function createCount(){
  return(
    <ImgCard
      color='red'
      img={require('@/assets/images/partial-react-logo.png')}
    >
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
    </ImgCard>
  );
};

const styles = StyleSheet.create({
  containerText:{

  },
  containerBottom: {
    flexDirection: 'column',
    gap: 25,
  },
  text: {
    fontSize: 25,
    textAlign: 'center'
  }
})