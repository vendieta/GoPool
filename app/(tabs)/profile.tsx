import { StyleSheet, View, Text, Image, Platform, Dimensions, TouchableOpacity, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Collapsible } from '@/components/Collapsible';
import DataPerfil from "@/components/TEST/DataPerfil";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import LinkCard from '@/components/TEST/LinkCard';
import { supabase } from "@/supabaseClient";
import { Redirect, useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Perfil() {
  const router = useRouter();

  const outSession = () => {
    supabase.auth.signOut();
    setTimeout(() => {
      router.replace('/');
    }, 600);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#fff' }}
      headerImage={
        <Image
          source={require('@/assets/images/user.png')}
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.mainContainer}>
        <View style={styles.topContent}>
          <Text style={styles.userText}>Welcome</Text>

          <View style={styles.contentContainer}>
            <Collapsible title="Configuraciones y temas">
              <View style={styles.containerLink}>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <DataPerfil element={{
                    iconComponent: <Feather name="settings" size={24} color="#666" />,
                    title: 'Configuraciones',
                    link: '/(optionScreen)/config'
                  }} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <DataPerfil element={{
                    iconComponent: <Feather name="user-check" size={24} color="#666" />,
                    title: 'Estado de cuenta',
                    link: '/(optionScreen)/accountStatement'
                  }} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <DataPerfil element={{
                    iconComponent: <FontAwesome5 name="user" size={24} color="#666" />,
                    title: 'Temas',
                    link: '/(optionScreen)/themes'
                  }} />
                </TouchableOpacity>
              </View>
            </Collapsible>

            <Collapsible title="Ayuda y soporte técnico">
              <View style={styles.containerLink}>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <LinkCard element={{
                    iconComponent: <Feather name="help-circle" size={24} color="#666" />,
                    title: 'Servicios de ayuda',
                    link: 'https://www.youtube.com/watch?v=GVucDuNYViU'
                  }} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <LinkCard element={{
                    iconComponent: <MaterialIcons name="report-gmailerrorred" size={24} color="#666" />,
                    title: 'Reportar problema',
                    link: '/(secondaryTabs)/problem'
                  }} />
                </TouchableOpacity>
              </View>
            </Collapsible>
            
            <Collapsible title="Info">
              <View style={styles.containerLink}>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <DataPerfil element={{
                    iconComponent: <Feather name="info" size={24} color="#666" />,
                    title: 'Quienes somos',
                    link: '/(optionScreen)/aboutUs'
                  }} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                >
                  <DataPerfil element={{
                    iconComponent: <FontAwesome5 name="copyright" size={24} color="#666" />,
                    title: 'Creditos',
                    link: '/(optionScreen)/credits'
                  }} />
                </TouchableOpacity>
              </View>
            </Collapsible>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={styles.logoutButton} 
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
    backgroundColor: '#fff',
  },
  topContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  userText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  contentContainer: {
    paddingHorizontal: width * 0.03,
    width: width,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: height * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    color:'#fff',
  },
  containerLink: {
    flexDirection: 'column',
    gap: 15,
    marginVertical: height * 0.015,
    padding: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: '#f8f8f8',
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
    backgroundColor: '#ff4d4d',
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