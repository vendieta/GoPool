import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Collapsible } from '@/components/Collapsible';
import DataPerfil from "@/components/TEST/DataPerfil";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import LinkCard from '@/components/TEST/LinkCard';
import { useRouter } from "expo-router";
import { useTheme } from '../../components/Themed/ContextTheme';

const { width, height } = Dimensions.get('window');

export default function Perfil() {
  const router = useRouter();
  const { theme } = useTheme();

  const outSession = () => {
    //ARIELAT123 AÑADIR LOGICA DE CERRAR SESION
    // Por ahora solo redirigimos a la pantalla de inicio
      router.replace('/');
  };

  const headerBackgroundColor = theme.background;

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/user.png')}
          style={styles.headerImage}
        />
      }
    >
      <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
        <View style={styles.topContent}>
          <Text style={[styles.userText, { color: theme.text }]}>Welcome</Text>
          
          {/* Sección: Configuraciones y Temas (existente) */}
          <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
            <Collapsible title="Configuraciones y temas">
              <View style={[styles.containerLink, { backgroundColor: theme.background }]}>
                {[
                  {
                    icon: <Feather name="settings" size={24} color={theme.text} />,
                    title: 'Configuraciones',
                    link: '/(optionScreen)/config',
                  },
                  {
                    icon: <Feather name="user-check" size={24} color={theme.text} />,
                    title: 'Estado de cuenta',
                    link: '/(optionScreen)/accountStatement',
                  },
                  {
                    icon: <FontAwesome5 name="user" size={24} color={theme.text} />,
                    title: 'Temas',
                    link: '/(optionScreen)/themes',
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                  >
                    <DataPerfil
                      element={{
                        iconComponent: item.icon,
                        title: item.title,
                        link: item.link,
                      }}
                      textColor={theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Nueva Sección: Mis Viajes */}
          <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
            <Collapsible title="Mis Viajes">
              <View style={[styles.containerLink, { backgroundColor: theme.background }]}>
                {[
                  {
                    icon: <MaterialIcons name="history" size={24} color={theme.text} />,
                    title: 'Historial de Viajes',
                    link: '/(optionScreen)/travelHistory',
                  },
                  {
                    icon: <MaterialIcons name="schedule" size={24} color={theme.text} />,
                    title: 'Viajes Programados',
                    link: '/(optionScreen)/scheduledTrips',
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    
                  >
                    <DataPerfil
                      element={{
                        iconComponent: item.icon,
                        title: item.title,
                        link: item.link,
                      }}
                      textColor={theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Nueva Sección: Métodos de Pago */}
          <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
            <Collapsible title="Métodos de Pago">
              <View style={[styles.containerLink, { backgroundColor: theme.background }]}>
                {[
                  {
                    icon: <MaterialIcons name="credit-card" size={24} color={theme.text} />,
                    title: 'Agregar Método de Pago',
                    link: '/(optionScreen)/addPaymentMethod',
                  },
                  {
                    icon: <MaterialIcons name="payment" size={24} color={theme.text} />,
                    title: 'Ver Métodos de Pago',
                    link: '/(optionScreen)/viewPaymentMethods',
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                  >
                    <DataPerfil
                      element={{
                        iconComponent: item.icon,
                        title: item.title,
                        link: item.link,
                      }}
                      textColor={theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Nueva Sección: Soporte */}
          <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
            <Collapsible title="Soporte">
              <View style={[styles.containerLink, { backgroundColor: theme.background }]}>
                {[
                  {
                    icon: <MaterialIcons name="support-agent" size={24} olor={theme.text} />,
                    title: 'Contactar Soporte',
                    link: '/(optionScreen)/contactSupport',
                  },
                  {
                    icon: <MaterialIcons name="help-outline" size={24} color={theme.text} />,
                    title: 'Preguntas Frecuentes',
                    link: '/(optionScreen)/faq',
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                  >
                    <DataPerfil
                      element={{
                        iconComponent: item.icon,
                        title: item.title,
                        link: item.link,
                      }}
                      textColor={theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Nueva Sección: Privacidad */}
          <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
            <Collapsible title="Privacidad">
              <View style={[styles.containerLink, { backgroundColor: theme.background }]}>
                {[
                  {
                    icon: <MaterialIcons name="privacy-tip" size={24} color={theme.text} />,
                    title: 'Política de Privacidad',
                    link: '/(optionScreen)/privacyPolicy',
                  },
                  {
                    icon: <MaterialIcons name="security" size={24} color={theme.text} />,
                    title: 'Configuración de Privacidad',
                    link: '/(optionScreen)/privacySettings',
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                  >
                    <DataPerfil
                      element={{
                        iconComponent: item.icon,
                        title: item.title,
                        link: item.link,
                      }}
                      textColor={theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Nueva Sección: About Us */}
          <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
            <Collapsible title="About Us">
              <View style={[styles.containerLink, { backgroundColor: theme.background }]}>
                {[
                  {
                    icon: <MaterialIcons name="info" size={24} color={theme.text} />,
                    title: 'Sobre Nosotros',
                    link: '/(optionScreen)/aboutUs',
                  },
                  {
                    icon: <MaterialIcons name="description" size={24} color={theme.text} />,
                    title: 'Términos y Condiciones',
                    link: '/(optionScreen)/termsAndConditions',
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                  >
                    <DataPerfil
                      element={{
                        iconComponent: item.icon,
                        title: item.title,
                        link: item.link,
                      }}
                      textColor={theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>
        </View>

        {/* Footer con botón de cerrar sesión */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.primary }]}
            onPress={outSession}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height * 0.25,
    resizeMode: 'cover',
  },
  mainContainer: {
    minHeight: height * 0.75,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: height * 0.02,
  },
  topContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  userText: {
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: width * 0.03,
    width: width,
    borderRadius: 20,
    paddingVertical: height * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: height * 0.015, // Espacio entre secciones
  },
  containerLink: {
    flexDirection: 'column',
    gap: 15,
    marginVertical: height * 0.015,
    padding: width * 0.03,
    borderRadius: 20,
  },
  buttonStyle: {
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  footerContainer: {
    paddingHorizontal: width * 0.03,
    paddingBottom: height * 0.03,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: height * 0.02,
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});