import { View, Text, StyleSheet,Dimensions } from 'react-native';
import ButtomStyle from '@/components/BottomStyle'
import ImgCard from '@/components/ImgCard';
const { width, height } = Dimensions.get('window');

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
            link: '/createCountU' // pagina donde se registran los usuarios de espol
        }}/>
        <ButtomStyle element={{
            title: 'Usuario externo',
            link: '/createCountE' //pagina donde se regitran los usuarios externos a espol
        }}/>
      </View>
    </ImgCard>
  );
};

const styles = StyleSheet.create({
  containerText: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.03,
    alignItems: 'center',
    

  },
  containerBottom: {
    flexDirection: 'column',
    gap: 25,
    width: '100%', // Aumentado para que los botones sean más anchos
    alignItems: 'center',
    paddingHorizontal: width * 0.01, // Corregido de height a width

  },
  text: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    lineHeight: width * 0.06,
  },
});
