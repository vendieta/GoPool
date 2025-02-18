import { View , Text , StyleSheet } from "react-native";
import ImgCard from "@/components/ImgCard";
import Input from "@/components/Input";
import BottomStyle from "@/components/BottomStyle";

export default function createCountU(){

  return(
    <ImgCard 
      color="#212121"
      img={require('@/assets/images/partial-react-logo.png')}
    >   
    <View style={styles.containerText}>
      <Text style={styles.text}>INICIE SESION</Text>
    </View>
    <View style={styles.containerInput}>
      <Input element="Correo"/>
      <Input element="Password"/>
    </View>
    <BottomStyle element={{
      title: 'Crear cuenta',
      link: '/'
    }}/>

    </ImgCard>
  );
};

const styles= StyleSheet.create({
  containerText:{

  },
  containerInput:{
    flexDirection: 'column',
    gap: 30,
  },
  text:{
    fontSize: 30,
    color: 'white'
  }
})