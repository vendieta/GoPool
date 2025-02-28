import { useLocalSearchParams } from "expo-router";
import { View, Text , StyleSheet} from "react-native";

export default function Info(){

  const { info } = useLocalSearchParams();
  console.log('string:   ', info)

  return(
    <View style={styles.container}>
      <Text style={styles.text}> {info} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    margin: 'auto',
    color: 'red'
  }

  }
)