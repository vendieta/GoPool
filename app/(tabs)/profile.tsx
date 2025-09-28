import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Linking, Platform, ActivityIndicator } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Collapsible } from '@/components/Collapsible';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useTheme } from '../../components/Themed/ContextTheme';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';
import useStorage from "@/hooks/useStorage";
import { useLoginContext } from "@/hooks/useLoginContext";
import { useRoleContext } from "@/hooks/useRoleContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


const { width, height } = Dimensions.get('window');

export default function Perfil() {
  const { isDriver, toggleRole } = useRoleContext();
  const router = useRouter();
  const { theme } = useTheme();
  const { toggleState } = useLoginContext();
  const [ready, setReady] = useState<boolean>();
  const {
    storedValue: access_token,
    setItem: setAccess_token,
    removeItem: removeAccess_token,
    loadingStorage: loadingAccess_token
  } = useStorage('access_token');
  const {
    storedValue: refresh_token,
    setItem: setRefresh_token,
    removeItem: removeRefresh_token,
    loadingStorage: loadingRefresh_token
  } = useStorage('refresh_token');
  const {
    storedValue: userId,
    setItem: setId,
    removeItem: removeId,
    loadingStorage: loadingId
  } = useStorage('userId');
  const {
    storedValue: userEmail,
    setItem: setUserEmail,
    removeItem: removeUserEmail,
    loadingStorage: loadingUserEmail
  } = useStorage('userEmail');
  const {
    storedValue: role,
    setItem: setRole,
    removeItem: removeRole,
    loadingStorage: loadingRole
  } = useStorage('role');
  const {
    storedValue: name,
    setItem: setName,
    removeItem: removeName,
    loadingStorage: loadingName
  } = useStorage('name');
  const {
    storedValue: lastName,
    setItem: setLastName,
    removeItem: removeLastName,
    loadingStorage: loadingLastName,
  } = useStorage('lastName');
  // const {
  //   storedValue: cars,
  //   setItem: setCars,
  //   removeItem: removeCars
  // } = useStorage('cars');

  console.log('loading del storage',loadingAccess_token)
    // cada vez que entras al tab, vuelve a disparar la carga
  // useFocusEffect(
  //   useCallback(() => {
  //     // Si tu hook `useStorage` ya se encarga de leer el storage
  //     // con solo llamarlo basta; si no, podrías agregarle un método refresh()
  //     console.log("Refrescando datos desde storage...", access_token , userEmail , userId , lastName , name , refresh_token , role);
  //     console.log("Refrescando datos desde storage...", loadingAccess_token || loadingUserEmail || loadingId || loadingLastName || loadingName || loadingRefresh_token || loadingRole || loadingId);
      
  //   }, [loadingAccess_token])
  // );
  // console.log("💕Refrescando datos desde storage...", access_token , userEmail , userId , lastName , name , refresh_token , role);

  
  // useEffect (() => {
  //   setReady(loadingAccess_token || loadingUserEmail || loadingId || loadingLastName || loadingName || loadingRefresh_token || loadingRole || loadingId);
  //   console.log('este es el valor de ready: ' ,ready)
  //   console.log('este es el valor de lastname: ' ,lastName)
    
  // }, [lastName])

  // if (ready) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }
  
  const outSession = async () => {
      console.log(access_token,refresh_token,userEmail,userId,role)
      await removeRefresh_token('refresh_token')
      await removeAccess_token('access_token')
      await removeUserEmail('userEmail')
      await removeId('userId')
      await removeRole('role')
      await removeName('name')
      await removeLastName('lastName')
      // await removeCars('cars')
      toggleState()
      if (isDriver){toggleRole()}
      console.log(access_token,refresh_token,userEmail,userId,role)
    router.replace('/')
  };

  

  const sections = [ 
    role === 'true'? {
      title: "Configuración",
      items: [
        { icon: 'settings', Component: Feather, title: 'Ajustes', link: '/(optionScreen)/config' },
        { icon: 'user-check', Component: Feather, title: 'Cuenta', link: '/(optionScreen)/accountStatement' },
        { icon: 'user', Component: FontAwesome5, title: 'Temas', link: '/(optionScreen)/themes' },
        { icon: 'car', Component: FontAwesome5, title: 'Vehiculo', link: '/(optionScreen)/vehiculo' },
      ]
    }: {
      title: "Configuración",
      items: [
        { icon: 'settings', Component: Feather, title: 'Ajustes', link: '/(optionScreen)/config' },
        { icon: 'user-check', Component: Feather, title: 'Cuenta', link: '/(optionScreen)/accountStatement' },
        { icon: 'user', Component: FontAwesome5, title: 'Temas', link: '/(optionScreen)/themes' },
      ]
    },
    {
      title: "Viajes",
      items: [
        { icon: 'history', Component: MaterialIcons, title: 'Historial', link: '/(optionScreen)/travelHistory' },
        { icon: 'schedule', Component: MaterialIcons, title: 'Programados', link: '/(optionScreen)/scheduledTrips' }
      ]
    },
    // tipo ? {
    //   title: "Pagos",
    //   items: [
    //     { icon: 'credit-card', Component: MaterialIcons, title: 'Agregar pago', link: '/(optionScreen)/addPaymentMethod' },
    //     { icon: 'payment', Component: MaterialIcons, title: 'Métodos', link: '/(optionScreen)/viewPaymentMethods' }
    //   ]
    // } : null,
    {
      title: "Ayuda",
      items: [
        { icon: 'support-agent', Component: MaterialIcons, title: 'Soporte', link: 'https://api.whatsapp.com/send/?phone=593963102238&text=Hola%2C+quiero+contactarme+con+acessor&type=phone_number&app_absent=0' },
        { icon: 'help-outline', Component: MaterialIcons, title: 'FAQ', link: '/(optionScreen)/faq' },
        { icon: 'donate', Component: FontAwesome5, title: 'Donaciones', link: 'https://api.whatsapp.com/send/?phone=593963102238&text=Hola%2C+Me+gustaria+apoyar+en+el+proyecto&type=phone_number&app_absent=0' }
      ]
    },
    {
      title: "Privacidad",
      items: [
        { icon: 'privacy-tip', Component: MaterialIcons, title: 'Políticas', link: 'https://www.termsfeed.com/live/74b410ac-e6a5-408f-b926-f112b6af1160' },
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
        <Text style={[styles.userText, { color: theme.text }]}>{name}  {lastName}</Text>
        
        <View style={styles.scrollContent}>
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Collapsible title={section.title}>
                <View style={styles.itemsContainer}>
                  {section.items.map((item, itemIndex) => ( 
                    item.title === 'Soporte' ? (
                    <TouchableOpacity 
                    key={itemIndex}
                    style={[styles.item, { 
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.border
                    }]}
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL(item.link)}
                  >
                    <item.Component name={item.icon} size={22} color={theme.accent} />
                    <Text style={[styles.itemText, { color: theme.text }]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>) : (
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
                    </TouchableOpacity>)
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