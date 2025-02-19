import { View , StyleSheet } from "react-native";
import MapView from "react-native-maps";



export default function Map(){
  return(
    <View style={styles.container}>
      <MapView styles={styles.Map}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,

  },
  Map: {
    height: '100%',
    width: '100%'
  }
})
