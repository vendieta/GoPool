import { StyleSheet, Image, View, Text, Dimensions, ScrollView, TouchableOpacity, Linking, Modal, ActivityIndicator } from 'react-native';
import { useTheme } from '@/components/Themed/ContextTheme';
import Opcion from '@/components/TEST/Opcion';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import UserCard from '@/components/TEST/UserCard';
import { useRoleContext } from '@/hooks/useRoleContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useApi } from '@/hooks/useApi';
import useStorage from '@/hooks/useStorage';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export interface User {
  id: string;
  nombre: string;
  lastname: string;
  disponible: boolean;
  numeroTelefono: string;
}

export interface Driver {
  users: User;
  fotodriver: string | null;
}

export interface Vehiculo {
  color: string;
  marca: string;
  placa: string;
  modelocar: string;
  fotovehiculo: string;
}

export interface RutaDriverBase {
  ZonaFinal: string;
  ZonaInicial: string;
  horasalida: string; // ISO string
  horaestimacionllegada: string; // ISO string
  id_vehiculo: string;
  finalizado: boolean;
  precio: number;
  vehiculo: Vehiculo;
}

// ----------------------
// PRIMERA RESPUESTA
// ----------------------
export interface RutaDriverResponseA {
  rutadriverid: string;
  saldo: number;
  cantidad_cupos: number;
  rutadriver: RutaDriverBase & {
    driver: Driver;
  };
}

// ----------------------
// SEGUNDA RESPUESTA
// ----------------------
export interface RutaDriverResponseB extends RutaDriverBase {
  driver: Driver;
  pasajeros: any[]; // puedes tipar mejor si sabes la forma de cada pasajero
}



export default function TabTwoScreen() {
  const [ isDriver, setIsDriver ] = useState<string | null>()
  const {
  storedValue: role,
  setItem: setRole,
} = useStorage('role');
  // const isDriver  = false;
  // const data  = true;
  const { theme } = useTheme();
  const isLightTheme = theme.name === 'light';
  const [modalVisible, setModalVisible] = useState(false);
  // Colores basados en el tema
  const backgroundColor = isLightTheme ? '#f5f5f5' : '#121212';
  const textColor = isLightTheme ? '#333' : '#fff';
  const cardBackground = isLightTheme ? '#fff' : '#1e1e1e';
  const headerBgColor = isLightTheme ? '#1D3D47' : '#0d232a';
  const accentColor = '#4a90e2';
  const [ cancelModal, setCancelModal ] = useState(false);
  const { data, loading, error, get } = useApi<RutaDriverResponseA | RutaDriverResponseB |null >();
  const {
      storedValue: userId,
      setItem: setId,
  } = useStorage('userId');



  useFocusEffect(
    useCallback(() => {
    console.log(`/api/user/me/viaje-actual/${userId}`)
        if (userId) {
      const a = async() => {
        await get(`/api/user/me/viaje-actual/${userId}`)
      }

      a()
      console.log('👾👾👾👾👾👾👾👾se actualizo la data')
    }
      // Si tu hook `useStorage` ya se encarga de leer el storage
      // con solo llamarlo basta; si no, podrías agregarle un método refresh()
    }, [userId])
  )

  // 
  useEffect(() => {
    setIsDriver(role);
  }, [role, userId,]);



  const handleCancel = () => {
    setCancelModal(false);
    console.log("Servicio cancelado");
  };
  console.log('🙏🙏🙏🙏🙏este es la daata',data)

  const handleContinue = () => {
    setCancelModal(false);
    console.log("El usuario sigue con el servicio");
  };

  if (data) {
  if ("rutadriver" in data) {
    // Aquí TS ya sabe que es RutaDriverResponseA
    console.log("Driver A:", data.rutadriver.driver.users.nombre);
  } else {
    // Aquí TS ya sabe que es RutaDriverResponseB
    console.log("Driver B:", data.driver.users.nombre);
  }
}

  console.log(loading)
  return (
    <View style={{flex: 1}}>
      <ScrollView style={[{ flex: 1 }]}>
        {/* Header con gradiente */}
        <LinearGradient
          colors={[headerBgColor, isLightTheme ? '#2a5a6a' : '#142f3a']}
          style={styles.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Image
            source={require('@/assets/images/tortuCarSinFondo.png')}
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
          <View style={[styles.optionsCard, { backgroundColor: cardBackground}]}>
            {isDriver === 'true' ? 
            <>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                <MaterialIcons name="directions" size={20} color={accentColor} /> { isDriver ? 'Opciones de Ruta' : 'Rutas por tomar' }
              </Text>
              {/* {isDriver? 
                <Text style={[styles.sectionTitle, { color: textColor }]}>Selecciona una opción:</Text>
                : 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity>
                    <AntDesign name="questioncircleo" size={25} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialIcons name="report-problem" size={29} color="red" />
                  </TouchableOpacity>
                </View>
              } */}
              <View style={styles.optionsContainer}>
                {(!data && !loading) ? 
                  <Opcion
                    element={{
                      link: '/(serviceScreen)/rutaUser',
                      title: 'Ver tus registro de rutas',
                      icon: 'history',
                      description: 'Mira los viajes que has realizado',
                      color: '#4CAF50'
                    }}
                    element1={{
                      link: '/(serviceScreen)/createRouteDriver',
                      title: 'Crear ruta conductor',
                      icon: 'car',
                      description: 'Ofrece tus cupos disponibles',
                      color: '#2196F3'
                    }}
                  /> 
                  :
                  <>
                  <View>

                  </View>
                  </>}
              </View>  
            </>
            : isDriver === 'false' ?
              <View style={styles.containerScroll}>
                    {(data && "rutadriver" in data) ? <>
                      <View style={[styles.containerHeader, { backgroundColor: theme.cardBackground }]}>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>precio</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]}>$ {data?.rutadriver.precio}</Text>
                        </View>
                        <View style={styles.profileHeader}>
                          <Image borderRadius={30} width={60} height={60} source={{uri:'https://gopool-img-2025.s3.us-east-2.amazonaws.com/3bc859a6-5c4f-42a3-b06d-0cd30b8325e6-21385a45-bf15-49b9-a2ad-ac7dfde3adb9.jpeg'}}/>
                          <Text style={[styles.userName, { color: theme.text }]}>{data?.rutadriver.driver.users.nombre} {data?.rutadriver.driver.users.lastname}</Text>
                          {/* <Text style={[styles.userName, { color: theme.text }]}>Max Atahualpa taguantisuyo Paquisha goku</Text> */}
                          <Text style={[styles.userStatus, { color: theme.labelText }]}>
                            {data?.cantidad_cupos} comprados
                          </Text>
                        </View>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>Fecha</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]}>{data?.rutadriver.horasalida.split('T')[0].replace(/-/g, '/')}</Text>
                        </View>
                      </View>
                      
                      <View style={[styles.section, {flexDirection: 'row', justifyContent: 'space-around', backgroundColor: theme.cardBackground, padding: 5, alignItems: 'center'}]}>
                        <View style={{flexDirection: 'column', gap: 5}}><Text  style={{color: theme.text}}>{data?.rutadriver.ZonaInicial}</Text><Text style={{color: theme.text}}>{data?.rutadriver.horasalida.split('T')[1].substring(0, 5)}</Text></View>
                          <FontAwesome name="long-arrow-right" size={25} color="#fff" />
                        <View style={{flexDirection: 'column', gap: 5}}><Text  style={{color: theme.text}}>{data?.rutadriver.ZonaFinal}</Text><Text  style={{color: theme.text}}>{data?.rutadriver.horaestimacionllegada.split('T')[1].substring(0, 5)}</Text></View>
                        {/* <View style={{alignItems: 'center'}}><Text style={{color: theme.text}}>{data.date}</Text></View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}><Text style={{color: theme.text}}>{data.zoneInit}</Text><Text style={{color: theme.text}}>{data.zoneEnd}</Text></View> */}
                      </View>
                      <View style={[styles.placa,{ backgroundColor: theme.cardBackground }]}>
                        <Text style={styles.textPlaca}>Placa: {data?.rutadriver.vehiculo.placa}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 15, alignItems: 'center'}}>
                        <TouchableOpacity style={{width: '50%', alignItems: 'center'}} onPress={() => setModalVisible(true)}>
                          <FontAwesome5 name="car-side" size={30} color="yellow" />
                          <Text style={styles.text}>Foto Vehiculo</Text>
                          <Text style={styles.text}>Informacion del carro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${data?.rutadriver.driver.users.numeroTelefono}`)} style={{width: '50%', alignItems: 'center'}}>
                          <FontAwesome5 name="whatsapp" size={30} color="green" />
                          <Text style={styles.text} >whatssap</Text>
                          <Text style={styles.text} >Contacta al conductor</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.containerCancelar}>
                        <TouchableOpacity style={styles.cancelar} onPress={() => setCancelModal(true)}>
                          <Text style={styles.textCancelar} >Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 5}}>
                          <MaterialIcons name="report-problem" size={29} color="red" />
                        </TouchableOpacity>
                      </View>
                    </> :
                    <>
                    <View style={{padding: 20}}>
                      <Text style={{color: 'white'}}>Querido usuario le recomendame que busque en la un viaje a su destino...</Text>
                    </View>
                    </>}
                  </View> :
                  <View>
                    <ActivityIndicator size="large" color="#00ff00" ></ActivityIndicator>
                  </View>
            }
          </View>
      
          {/* Sección adicional (puedes agregar más contenido aquí) */}
          {/* {isDriver ? 
            null :
            <View style={[styles.infoCard, { backgroundColor: cardBackground }]}>
              <Text style={[styles.infoTitle, { color: textColor }]}>
                <MaterialIcons name="info" size={18} color={accentColor} /> ¿Cómo funciona?
              </Text>
              <Text style={[styles.infoText, { color: isLightTheme ? '#666' : '#aaa' }]}>
                Selecciona si deseas buscar un viaje como pasajero u ofrecer tus cupos disponibles como conductor.
              </Text>
            </View>
          } */}
        </View>
      
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)} // Android back button
        >
          {/* Fondo semi-transparente clickeable */}
          <TouchableOpacity 
            style={styles.modalBackground} 
            activeOpacity={1} 
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Image 
                source={{ uri: (data && "rutadriver" in data) ? data?.rutadriver.vehiculo.fotovehiculo : 'https://bucket.s3.amazonaws.com/matriculas/matricula123.jpg' }} 
                style={styles.modalImage} 
                resizeMode="contain"
              /> 
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          transparent
          visible={cancelModal}
          animationType="fade"
          onRequestClose={() => setCancelModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>¿Esta seguro que deseas cancelar el servicio?</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                  <Text style={styles.buttonText}>Si</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
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
    padding: 10,
  },
  optionsCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '100%'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white'
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
  extraInfo:{
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 10
  },
  containerHeader: {
    padding: 16,

    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lateral: {
    justifyContent: 'center'
  },
  lateralTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  lateralValue: {
    fontSize: 16,
    textAlign: 'center'
  },
  profileHeader: {
    alignItems: 'center',
    width: '60%'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  userStatus: {
    fontSize: 14,
  },
  section: {
    borderRadius: 10,
  },
  containerScroll: {
    flexDirection: 'column',
    width: '100%',
    gap: 10
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  textPlaca: {
    color: 'white',
    fontSize: 17
  },
  placa: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  containerCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
    gap: 20,

  },
  cancelar: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%'
  },
  textCancelar: {
    fontSize: 20,
    color: 'white'
  },
    modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  modalImage: {
    width: '100%',
    height: '100%'
  },
  // modalBackground: {
  //   flex: 1,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: "#dc2626", // rojo
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  continueButton: {
    backgroundColor: "#16a34a", // verde
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});