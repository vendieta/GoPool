import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@/components/Themed/ContextTheme';
import Opcion from '@/components/TEST/Opcion';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme.name === 'light';

  // Colores basados en el tema
  const backgroundColor = isLightTheme ? '#f5f5f5' : '#121212';
  const textColor = isLightTheme ? '#333' : '#fff';
  const cardBackground = isLightTheme ? '#fff' : '#1e1e1e';
  const headerBgColor = isLightTheme ? '#1D3D47' : '#0d232a';
  const accentColor = '#4a90e2';

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={[headerBgColor, isLightTheme ? '#2a5a6a' : '#142f3a']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Image
          source={require('@/assets/images/tortuCar.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: '#fff' }]}>Explore</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>
            Elige tu tipo de viaje
          </Text>
        </View>
      </LinearGradient>

      {/* Contenido principal */}
      <View style={styles.contentContainer}>
        <View style={[styles.optionsCard, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            <MaterialIcons name="directions" size={20} color={accentColor} /> Opciones de Ruta
          </Text>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Selecciona una opción:</Text>
          <View style={styles.optionsContainer}>
            <Opcion
              element={{
                link: '/(serviceScreen)/createRouteUser',
                title: 'Ruta pasajero',
                icon: 'person',
                description: 'Busca un conductor para tu viaje',
                color: '#4CAF50'
              }}
              element1={{
                link: '/(serviceScreen)/createRouteDriver',
                title: 'Ruta conductor',
                icon: 'directions-car',
                description: 'Ofrece tus cupos disponibles',
                color: '#2196F3'
              }}
            />
          </View>
        </View>

        {/* Sección adicional (puedes agregar más contenido aquí) */}
        <View style={[styles.infoCard, { backgroundColor: cardBackground }]}>
          <Text style={[styles.infoTitle, { color: textColor }]}>
            <MaterialIcons name="info" size={18} color={accentColor} /> ¿Cómo funciona?
          </Text>
          <Text style={[styles.infoText, { color: isLightTheme ? '#666' : '#aaa' }]}>
            Selecciona si deseas buscar un viaje como pasajero u ofrecer tus cupos disponibles como conductor.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 220,
    paddingTop: 20,
    paddingHorizontal: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 150,
    height: 150,
    opacity: 0.75,
  },
  headerTextContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  optionsCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCard: {
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});