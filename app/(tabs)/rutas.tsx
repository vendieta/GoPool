import { StyleSheet, Image, Platform, View, Text, Dimensions } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Opcion from '@/components/TEST/Opcion';
import { useTheme } from '@/components/Themed/ContextTheme';

const { width, height } = Dimensions.get('window');

export default function TabTwoScreen() {
  const { theme } = useTheme(); // Obtenemos el tema del ThemeContext

  // Colores basados en el tema
  const backgroundColor = theme.name === 'light' ? '#fff' : '#333'; // Fondo principal
  const textColor = theme.name === 'light' ? '#000' : '#fff'; // Color del texto

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.containerImage}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.containerLink}>
        <Text style={[styles.titleContainer, { color: textColor }]}>
          Explore
        </Text>
        <View style={styles.containerOpcion}>
          <Opcion
            element={{
              link: '/(serviceScreen)/createRouteUser',
              title: 'Ruta pasajero',
            }}
            element1={{
              link: '/(serviceScreen)/createRouteDriver',
              title: 'Ruta conductor',
            }}
          />
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  headerImage: {
    width: 290,
    height: 178,
    color: '#808080',
    top: 72,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    fontSize: 25,
    color: 'white', // Este será sobrescrito por textColor dinámico
  },
  image: {
    height: 250,
    width: width,
  },
  containerLink: {
    alignItems: 'center',
    marginVertical: 'auto',
  },
  container: {
    flex: 1,
  },
  containerImage: {
    height: 250,
    width: width,
    backgroundColor: '#1D3D47', // Este podría hacerse dinámico si lo deseas
  },
  containerOpcion: {},
});