import { View , StyleSheet , Text} from "react-native";
import { Link, Route } from "expo-router";
import { ThemedText } from "./ThemedText";


interface DataProps{
  element: {
    title: string;
    link: Route;
  }
}

export default function BottomStyle({element}:DataProps){
  return(
    <Link href={element.link} style={styles.container}>
      <View style={styles.botton}>
        <Text style={styles.text}>{element.title}</Text>
      </View>
    </Link>
  );
};

const styles= StyleSheet.create({
  container: {
  },
  botton:{
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'blue',
    width: '100%'
    
  },
  text:{
    fontSize:25,
    textAlign: 'center'
  }

})