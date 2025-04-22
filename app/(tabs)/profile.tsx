import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Collapsible } from '@/components/Collapsible';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useTheme } from '../../components/Themed/ContextTheme';

const { width, height } = Dimensions.get('window');

export default function Perfil() {
  const router = useRouter();
  const { theme } = useTheme();

  const outSession = () => router.replace('/');

  const sections = [
    {
      title: "Configuración",
      items: [
        { icon: 'settings', Component: Feather, title: 'Ajustes', link: '/(optionScreen)/config' },
        { icon: 'user-check', Component: Feather, title: 'Cuenta', link: '/(optionScreen)/accountStatement' },
        { icon: 'user', Component: FontAwesome5, title: 'Temas', link: '/(optionScreen)/themes' }
      ]
    },
    {
      title: "Viajes",
      items: [
        { icon: 'history', Component: MaterialIcons, title: 'Historial', link: '/(optionScreen)/travelHistory' },
        { icon: 'schedule', Component: MaterialIcons, title: 'Programados', link: '/(optionScreen)/scheduledTrips' }
      ]
    },
    {
      title: "Pagos",
      items: [
        { icon: 'credit-card', Component: MaterialIcons, title: 'Agregar pago', link: '/(optionScreen)/addPaymentMethod' },
        { icon: 'payment', Component: MaterialIcons, title: 'Métodos', link: '/(optionScreen)/viewPaymentMethods' }
      ]
    },
    {
      title: "Ayuda",
      items: [
        { icon: 'support-agent', Component: MaterialIcons, title: 'Soporte', link: '/(optionScreen)/contactSupport' },
        { icon: 'help-outline', Component: MaterialIcons, title: 'FAQ', link: '/(optionScreen)/faq' }
      ]
    },
    {
      title: "Privacidad",
      items: [
        { icon: 'privacy-tip', Component: MaterialIcons, title: 'Políticas', link: '/(optionScreen)/privacyPolicy' },
        { icon: 'security', Component: MaterialIcons, title: 'Seguridad', link: '/(optionScreen)/privacySettings' }
      ]
    }
  ];

  return (
    <ParallaxScrollView
      headerImage={
        <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
          <Image
            source={require('@/assets/images/user.png')}
            style={styles.headerImage}
          />
        </View>
      }
      // headerHeight removed as it is not supported by ParallaxScrollView
    >
      <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.userText, { color: theme.text }]}>¡Hola!</Text>
        
        <View style={styles.scrollContent}>
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Collapsible title={section.title}>
                <View style={styles.itemsContainer}>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity 
                      key={itemIndex}
                      style={[styles.item, { 
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.border
                      }]}
                      activeOpacity={0.7}
                      onPress={() => router.push(item.link as any)}
                    >
                      <item.Component name={item.icon} size={22} color={theme.accent} />
                      <Text style={[styles.itemText, { color: theme.text }]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Collapsible>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.buttonBackground }]}
            onPress={outSession}
            activeOpacity={0.7}
          >
            <Text style={[styles.logoutButtonText, { color: '#FFF' }]}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: "auto"
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    marginHorizontal: -20,
    marginBottom: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 20,
  },
  userText: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  itemsContainer: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
  footer: {
    paddingBottom: 30,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});