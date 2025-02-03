import { StyleSheet, View , Text , Image , Platform , Dimensions , TouchableOpacity} from "react-native"; 
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ExternalLink } from '@/components/ExternalLink';
import { Link } from "expo-router";
import DataPerfil from "@/components/TEST/DataPerfil";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';


const { width , height } = Dimensions.get('window');




export default function Perfil() {
  return(
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
        <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
        />
        }>   
        <View style={styles.userInfo}>
          <View style={styles.userAvatar} />
          <Text style={styles.userText}>User!</Text>
        </View>
        <View>
          {/* Panel de configuraciones de la cuenta */}
          <Collapsible title="Configuraciones y temas">
            <View style={styles.containerLink}>
              {/* este pedazo de codigo me servira mas adelante
              {elementos.map((elemento) => (
                <TouchableOpacity
                  key={elemento.id}
                  onPress={() => navigation.navigate(elemento.destino)} // Navega a la pantalla correspondiente
                >
                  <Text style={styles.texto}>{elemento.nombre}</Text>
                </TouchableOpacity>
              ))} */}
              <DataPerfil element={ {
                iconComponent: <Feather name="settings" size={24} color="black" />, 
                title: 'Configuraciones',
                link: '/(secondaryTabs)/config'}}/>
                <DataPerfil element={ {
                iconComponent: <Feather name="user-check" size={24} color="black" />, 
                title: 'Estado de cuenta',
                link: '/(secondaryTabs)/accountStatement'}}/>
                <DataPerfil element={ {
                iconComponent: <FontAwesome5 name="user" size={24}/>, 
                title: 'Temas',
                link: '/(secondaryTabs)/themes'}}/>
            </View>
          </Collapsible>

          {/* Panel de soporte el cual los va a dirigir al whatssapp de la empresa */}
          <Collapsible title="Ayuda y soporte técnico">
            <View style={styles.containerLink}>
              <DataPerfil element={ {
                iconComponent: <Feather name="help-circle" size={24} color="black" />, 
                title: 'Servicios de ayuda',
                link: '/(secondaryTabs)/help'}}/>
                <DataPerfil element={ {
                iconComponent: <MaterialIcons name="report-gmailerrorred" size={24} color="black" />, 
                title: 'Reportar problema',
                link: '/(secondaryTabs)/problem'}}/>
                  {/* <DataPerfil element={ {
                  iconComponent: <FontAwesome5 name="user" size={24}/>, 
                  title: 'Aupicia tu marca',
                  link: '/(secondaryTabs)/buy'}}/> */}
            </View>
          </Collapsible>
          
          
          {/* Panel de informacion sobre la apk */}
          <Collapsible title="Info">
            <View style={styles.containerLink}>
              <DataPerfil element={ {
                iconComponent: <Feather name="info" size={24} color="black" />, 
                title: 'Quienes somos',
                link: '/(secondaryTabs)/aboutUs'}}/>
                <DataPerfil element={ {
                iconComponent: <FontAwesome5 name="copyright" size={24} color="black" />, 
                title: 'Creditos',
                link: '/(secondaryTabs)/credits'}}/>
                    {/* <DataPerfil element={ {
                    iconComponent: <FontAwesome5 name="user" size={24}/>, 
                    title: 'Temas',
                    link: '/(secondaryTabs)/themes'}}/> */}
            </View>
              {/* Esta aplicación ha sido diseñada para 
              facilitar el transporte de los usuarios, ofreciendo medidas 
              que priorizan su seguridad. Con una interfaz intuitiva y funcionalidades 
              avanzadas, buscamos hacer más eficientes y seguros los desplazamientos diarios. */}
              {/* Este pedazo de codigo puede servir para despues 
              <ThemedText>
                The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
                sets up the tab navigator.
              </ThemedText>
              <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="link">Learn more</ThemedText>
              </ExternalLink> */}
          </Collapsible>
            {/*        
          <Collapsible title="Custom fonts">
            <ThemedText>
              Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
              <ThemedText style={{ fontFamily: 'SpaceMono' }}>
                custom fonts such as this one.
              </ThemedText>
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title="Light and dark mode components">
            <ThemedText>
              This template has light and dark mode support. The{' '}
              <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
              what the user's current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title="Animations">
            <ThemedText>
              This template includes an example of an animated component. The{' '}
              <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
              the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
              library to create a waving hand animation.
            </ThemedText>
            {Platform.select({
              ios: (
                <ThemedText>
                  The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
                  component provides a parallax effect for the header image.
                </ThemedText>
              ),
            })}
          </Collapsible> */}
      </View>
    </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    userAvatar: {
      width: 60,
      height: 60,
      backgroundColor: 'red',
      borderRadius: 30,
      marginTop: 8,
    },
    userInfo:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      width: width*0.95,
      marginHorizontal: width*0.025,
    },
    userText: {
      fontSize: width*0.05,
      color:'#f0f0f0',
      margin: 'auto',
    },
    containerLink:{
      flexDirection: 'column',
      margin: 'auto',
      gap: 15,
    },
});
