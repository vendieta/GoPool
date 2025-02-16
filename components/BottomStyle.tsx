import { View , StyleSheet } from "react-native";
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
        <ThemedText style={styles.text}>{element.title}</ThemedText>
      </View>
    </Link>
  );
};

const styles= StyleSheet.create({
  container: {

  },
  botton:{
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'blue',    
  },
  text:{
    fontSize:25,
    textAlign: 'center'
  }

})