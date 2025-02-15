import { Text, View , StyleSheet } from "react-native";
import { Link, Route } from "expo-router";
import { ThemedText } from "./ThemedText";


interface DataProps{
  element: {
    title: string;
    link: Route;
  }
}

export default function Botton({element}:DataProps){
  return(
    <Link href={element.link}>
      <View style={styles.botton}>
        <ThemedText style={styles.text}>{element.title}</ThemedText>
      </View>
    </Link>
  );
};

const styles= StyleSheet.create({
  botton:{
    width: '100%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'orange',
  },
  text:{
    fontSize:25,
    textAlign: 'center'
  }

})