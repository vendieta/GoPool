import { View , Text , StyleSheet} from 'react-native';
import BottomStyle from '@/components/BottomStyle'
import ImgCard from '@/components/ImgCard';
import { useUserInfo } from '@/hooks/userContext';
//  no hay necesidad que este archivo se llame index pero lo puse para evitar problemas a futuro
//  


export default function LoginScreen(){
  const { session } = useUserInfo();
  console.log('estas esto es la sesion>                                                                                                                                             ',session)
  return(
    <ImgCard 
      color='orange'
      img={require('@/assets/images/partial-react-logo.png')}
    >
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
    </ImgCard>
  );

}

const styles = StyleSheet.create({
  text:{
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  containerBottom: {
    flexDirection: 'column',
    gap: 25,
  },
  containerText: {
    flexDirection: 'column',
    gap: 10,
  }
    
});