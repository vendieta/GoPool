import { StyleSheet, Image, Platform , View , Text , Dimensions } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Opcion from '@/components/TEST/Opcion';


const {width , height} = Dimensions.get('window')

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.headerImage} />
      </View>
      <View style={styles.containerLink}>
        <Text style={styles.titleContainer}>Explore</Text>
        <View style={styles.containerOpcion}>
          <Opcion 
          element={{
            link:'/(serviceScreen)/createRouteUser',
            title: 'Ruta pasajero',
            }}
            element1={{
            link:'/(serviceScreen)/createRouteDriver',
            title:'Ruta conductor',
          }}/>

        </View>
      </View>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  headerImage: {
    width:290,
    height: 178,
    color: '#808080',
    top: 72,
    left: 0,
    position: 'absolute',
    
  },
  titleContainer: {
    fontSize: 25,
    color: 'white',
  },
  image:{
    height: 250,
    width: width,
  },
  containerLink:{
    alignItems: 'center',
    marginVertical: 'auto',
  },
  container:{
    flex:1,
  },
  containerImage:{
    height: 250,
    width: width,
    backgroundColor: '#1D3D47',
  },
  containerOpcion:{

  }
});
