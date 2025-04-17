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
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/user.png')}
            style={styles.headerImage}
          />
        </View>
      }
    >
      <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.userText, { color: theme.text }]}>¡Hola!</Text>
        
        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Collapsible title={section.title}>
                <View style={styles.itemsContainer}>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity 
                      key={itemIndex}
                      style={[styles.item, { backgroundColor: theme.cardBackground }]}
                      activeOpacity={0.8}
                      onPress={() => router.push(item.link as any)}
                    >
                      <item.Component name={item.icon} size={20} color={theme.text} />
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

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.primary }]}
          onPress={outSession}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: height * 0.25,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mainContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  userText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionsContainer: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  itemsContainer: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 15,
    marginLeft: 12,
  },
  logoutButton: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});