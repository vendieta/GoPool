import { StyleSheet, Image, View, Text, Dimensions, ScrollView, TouchableOpacity, Linking, Modal, ActivityIndicator, Alert } from 'react-native';
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
import { checkTime, getNowInGuayaquil } from '@/scripts/compareTime';
import {ComvertDateZone, ComvertTimeZone} from '@/scripts/time';

const { height, width } = Dimensions.get('window');

// Breakpoints responsivos
const isSmallScreen = width < 350;
const isMediumScreen = width >= 350 && width < 768;
const isLargeScreen = width >= 768;

console.log('Screen dimensions:', { isSmallScreen, isMediumScreen, isLargeScreen });

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
  horasalida: string;
  horaestimacionllegada: string;
  id_vehiculo: string;
  finalizado: boolean;
  cuposdisponibles: number;
  precio: number;
  vehiculo: Vehiculo;
}

interface Usuarios {
  nombre: string;
  lastname: string;
  nummatricula: string;
  fotomatricula: string;
  numeroTelefono: string;
}

interface ViajeUsuario {
  user: Usuarios;
  userid: string;
  recogido: boolean;
  cantidad_cupos: number;
}

export interface RutaDriverResponseA {
  rutadriverid: string;
  saldo: number;
  cantidad_cupos: number;
  rutadriver: RutaDriverBase & {
    driver: Driver;
  };
}

export interface RutaDriverResponseB extends RutaDriverBase {
  id: string;
  driver: Driver;
  pasajeros: ViajeUsuario[];
}

function getTimeInGuayaquil() {
  const now = new Date()
  return new Intl.DateTimeFormat("es-EC", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "America/Guayaquil",
  }).format(now)
}

export default function TabTwoScreen() {
  const [ isDriver, setIsDriver ] = useState<string | null>()
  const {
    storedValue: role,
    setItem: setRole,
  } = useStorage('role');
  const { theme } = useTheme();
  const isLightTheme = theme.name === 'light';
  const [modalVisible, setModalVisible] = useState(false);
  const backgroundColor = isLightTheme ? '#f5f5f5' : '#121212';
  const textColor = isLightTheme ? '#333' : '#fff';
  const cardBackground = isLightTheme ? '#fff' : '#1e1e1e';
  const headerBgColor = isLightTheme ? '#1D3D47' : '#0d232a';
  const accentColor = '#4a90e2';
  const [ cancelModal, setCancelModal ] = useState(false);
  const [ cancelUser, setCancelUser ] = useState(false);
  const [ nameUser, setNameUser ] = useState<string>(''); 
  const [ block, setBlock ] = useState<boolean>(false);
  const [ finish, setFinish ] = useState<boolean>(false);
  const [ idUserDelete, setIdUserDelete ] = useState<string>('');
  const { data, loading, error, get } = useApi<RutaDriverResponseA | RutaDriverResponseB |null >(); 
  const { data: finishDAta, loading: finishLoading, error: finishError, post } = useApi(); 
  const { data: dataCancel, loading: loadingCancel, error: errorCancel, delete: cancelViaje } = useApi();
  const {
      storedValue: userId,
      setItem: setId,
  } = useStorage('userId');
  const {
    storedValue: access_token,
    setItem: setAccess_token,
  } = useStorage('access_token');

  useFocusEffect(
    useCallback(() => {
      console.log(`/api/user/me/viaje-actual/${userId}`)
      if (userId && access_token) {
        const a = async() => {
          await get(`/api/user/me/viaje-actual/${userId}`, undefined,{ 
            headers: { Authorization: `Abduzcan ${access_token}` }
          });
        }
        a()
      }
    }, [userId, dataCancel, finishDAta, access_token]),
  )

  useFocusEffect(
    useCallback(() => {
      if (data) {
        const a = async() => {
          if (checkTime(data && "rutadriver" in data ? new Date(data.rutadriver.horasalida).toISOString() : data && !("rutadriver" in data) ? new Date(data.horasalida).toISOString() : '') === 'expired') {
            console.log('El viaje ya no busca mas usuarios');
            setBlock(true);
          };
          if (data && checkTime(data && "rutadriver" in data ? new Date(data.rutadriver.horaestimacionllegada).toISOString() : data && !("rutadriver" in data) ? new Date(data.horaestimacionllegada).toISOString()  : '') === 'expired') {
            console.log('El viaje ya finalizo');
            setFinish(true);
          };
        }
        a()
      }
    }, [data]),
  )

  useEffect(() => {
    setIsDriver(role);
  }, [role, userId,]);

  useEffect(() => {
    if (data && finish && access_token){
      const x = async() => {
        await post('/api/viajes/finalizar',{
          idViaje: ("rutadriver" in data) ? data.rutadriverid : data?.id
        },{ 
          headers: { Authorization: `Abduzcan ${access_token}` }
        });
      }
      x();
      setFinish(false);
    }
  },[finish,data,access_token])

  const handleCancel = () => {
    setCancelModal(false);
    setCancelUser(false);
    console.log("El usuario sigue con el servicio");
  };
  
  const handleContinue = async() => {
    if (data && !("rutadriver" in data)) {
      try {
        await cancelViaje(`/api/viajes/eliminar/${data.id}`,{ 
          headers: { Authorization: `Abduzcan ${access_token}` }
        })
        console.log('RUTA CANCELADA')
      } catch (error) {
        console.log(error);
        Alert.alert('Algo salio mal intentalo de nuevo')
      }
    }
    if (data && "rutadriver" in data) {
      try {
        await cancelViaje(`/api/viajes/salir/${data.rutadriverid}/${userId}`,{ 
          headers: { Authorization: `Abduzcan ${access_token}` }
        })
      } catch {
        Alert.alert('No se pudo cancelar su viaje, intentalo de nuevo')
      }
    }
    setCancelModal(false);
    console.log("Servicio cancelado");
  };

  const deleteUser = async(idUser: string) => {
    if (data && !("rutadriver" in data)) {
      try {
        await cancelViaje(`/api/viajes/salir/${data.id}/${idUser}`,{ 
          headers: { Authorization: `Abduzcan ${access_token}` }
        })
        console.log('usuario eliminado')
      } catch (error) {
        console.log(error);
        Alert.alert('Algo salio mal intentalo de nuevo')
      }
    }
    setCancelModal(false);
    setCancelUser(false);
    console.log("Servicio cancelado");
  };

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
                <MaterialIcons name="directions" size={isSmallScreen ? 18 : 20} color={accentColor} /> { isDriver ? 'Opciones de Ruta' : 'Rutas por tomar' }
              </Text>
              <View style={styles.optionsContainer}>
                {(!data && !loading && !finishLoading) ? 
                  <Opcion
                    element={{
                      link: '/(serviceScreen)/viajes',
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
                  : (data && !("rutadriver" in data) && !finishLoading) ?
                  <>
                  <View style={[styles.containerHeader, { backgroundColor: theme.cardBackground, width: '100%'}]}>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>precio</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]}>$ {data?.precio}</Text>
                        </View>
                        <View style={styles.profileHeader}>
                          <Image borderRadius={isSmallScreen ? 25 : 30} width={isSmallScreen ? 50 : 60} height={isSmallScreen ? 50 : 60} source={{uri: data.vehiculo.fotovehiculo}}/>
                          <Text style={[styles.userName, { color: theme.text }]} numberOfLines={2}>
                            {data.driver.users.nombre} {data.driver.users.lastname}
                          </Text>
                          <Text style={[styles.userStatus, { color: theme.labelText }]}>
                            {data.cuposdisponibles} Cupos disponibles
                          </Text>
                        </View>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>Fecha</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]} numberOfLines={1}>
                            {ComvertDateZone(data.horasalida)}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.section, {flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-around', backgroundColor: theme.cardBackground, padding: isSmallScreen ? 8 : 5, alignItems: 'center', width: '100%', gap: isSmallScreen ? 8 : 0}]}>
                        <View style={{flexDirection: 'column', gap: 5, alignItems: isSmallScreen ? 'flex-start' : 'center'}}>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>{data.ZonaInicial}</Text>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}}>{ComvertTimeZone(data.horasalida)}</Text>
                        </View>
                        <FontAwesome name={isSmallScreen ? "long-arrow-down" : "long-arrow-right"} size={isSmallScreen ? 20 : 25} color={theme.text} />
                        <View style={{flexDirection: 'column', gap: 5, alignItems: isSmallScreen ? 'flex-start' : 'center'}}>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>{data.ZonaFinal}</Text>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}}>{ComvertTimeZone(data.horaestimacionllegada)}</Text>
                        </View>
                      </View>
                      <View style={{ width: '100%', paddingVertical: isSmallScreen ? 10 : 15, alignItems: 'center'}}>
                        <TouchableOpacity style={{width: isSmallScreen ? '70%' : '50%', alignItems: 'center'}} onPress={() => setModalVisible(true)}>
                          <FontAwesome5 name="car-side" size={isSmallScreen ? 25 : 30} color="yellow" />
                          <Text style={[styles.text, {color: theme.text}]}>Foto Vehiculo</Text>
                          <Text style={[styles.text, {color: theme.text}]}>Informacion del carro</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={{color: theme.text, fontSize: isSmallScreen ? 15 : 16, fontWeight: '600', marginBottom: 5}}>Pasajeros</Text>
                      {data.pasajeros.map((user, index) => (
                        <View key={index} style={[styles.pasajeroCard, {backgroundColor: theme.cardBackground, borderColor: theme.text}]}>
                          <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${user.user.numeroTelefono}`)} style={{alignItems: 'center'}}>
                            <FontAwesome5 name="whatsapp" size={isSmallScreen ? 30 : 40} color="green" />
                          </TouchableOpacity>
                          <View style={{flex: 1, paddingHorizontal: 8}}>
                            <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>
                              {user.user.nombre} {user.user.lastname}
                            </Text>
                            <Text style={{color: theme.text, fontSize: isSmallScreen ? 12 : 14}}>cupos: {user.cantidad_cupos}</Text>
                          </View>
                          <TouchableOpacity onPress={()=> {setCancelUser(true); setNameUser(`${user.user.nombre} ${user.user.lastname}`); setIdUserDelete(user.userid)}}>
                            <MaterialIcons name="cancel" size={isSmallScreen ? 25 : 30} color={theme.text} />
                          </TouchableOpacity>
                        </View>
                      ))}
                      <View style={styles.containerCancelar}>
                        <TouchableOpacity style={styles.cancelar} onPress={() => setCancelModal(true)}>
                          <Text style={styles.textCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                      </View>
                  </> : (data && "rutadriver" in data && !finishLoading) ? <>
                      <View style={[styles.containerHeader, { backgroundColor: theme.cardBackground, width: '100%' }]}>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>precio</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]}>$ {data?.rutadriver.precio}</Text>
                        </View>
                        <View style={styles.profileHeader}>
                          <Image borderRadius={isSmallScreen ? 25 : 30} width={isSmallScreen ? 50 : 60} height={isSmallScreen ? 50 : 60} source={{uri:'https://gopool-img-2025.s3.us-east-2.amazonaws.com/3bc859a6-5c4f-42a3-b06d-0cd30b8325e6-21385a45-bf15-49b9-a2ad-ac7dfde3adb9.jpeg'}}/>
                          <Text style={[styles.userName, { color: theme.text }]} numberOfLines={2}>
                            {data?.rutadriver.driver.users.nombre} {data?.rutadriver.driver.users.lastname}
                          </Text>
                          <Text style={[styles.userStatus, { color: theme.labelText }]}>
                            {data?.cantidad_cupos} comprados
                          </Text>
                        </View>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>Fecha</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]} numberOfLines={1}>
                            {ComvertDateZone(data?.rutadriver.horasalida)}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={[styles.section, {flexDirection: isSmallScreen ? 'column' : 'row', width: '100%', justifyContent: 'space-around', backgroundColor: theme.cardBackground, padding: isSmallScreen ? 8 : 5, alignItems: 'center', gap: isSmallScreen ? 8 : 0}]}>
                        <View style={{flexDirection: 'column', gap: 5, alignItems: isSmallScreen ? 'flex-start' : 'center'}}>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>{data?.rutadriver.ZonaInicial}</Text>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}}>{ComvertTimeZone(data?.rutadriver.horasalida)}</Text>
                        </View>
                        <FontAwesome name={isSmallScreen ? "long-arrow-down" : "long-arrow-right"} size={isSmallScreen ? 20 : 25} color={theme.text} />
                        <View style={{flexDirection: 'column', gap: 5, alignItems: isSmallScreen ? 'flex-start' : 'center'}}>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>{data?.rutadriver.ZonaFinal}</Text>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}}>{ComvertTimeZone(data?.rutadriver.horaestimacionllegada)}</Text>
                        </View>
                      </View>
                      <View style={[styles.placa,{ backgroundColor: theme.cardBackground, width: '100%' }]}>
                        <Text style={[styles.textPlaca, {color: theme.text}]}>Placa: {data?.rutadriver.vehiculo.placa}</Text>
                      </View>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
                          <FontAwesome5 name="car-side" size={isSmallScreen ? 25 : 30} color="yellow" />
                          <Text style={[styles.text, {color: theme.text}]}>Foto Vehiculo</Text>
                          <Text style={[styles.text, {color: theme.text, fontSize: isSmallScreen ? 11 : 13}]}>Informacion del carro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${data?.rutadriver.driver.users.numeroTelefono}`)} style={styles.actionButton}>
                          <FontAwesome5 name="whatsapp" size={isSmallScreen ? 25 : 30} color="green" />
                          <Text style={[styles.text, {color: theme.text}]}>whatssap</Text>
                          <Text style={[styles.text, {color: theme.text, fontSize: isSmallScreen ? 11 : 13}]}>Contacta al conductor</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.containerCancelar}>
                          {block? null: <TouchableOpacity style={styles.cancelar} onPress={() => setCancelModal(true)}>
                          <Text style={styles.textCancelar}>Cancelar</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={{padding: 5}}>
                          <MaterialIcons name="report-problem" size={isSmallScreen ? 24 : 29} color="red" />
                        </TouchableOpacity>
                      </View>
                    </> :  <ActivityIndicator size="large" color="#00ff00" ></ActivityIndicator> }
              </View>  
            </>
            : (isDriver === 'false' ) ?
              <View style={styles.containerScroll}>
                    {(data && "rutadriver" in data && !loading) ? 
                    <>
                      <View style={[styles.containerHeader, { backgroundColor: theme.cardBackground }]}>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>precio</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]}>$ {data?.rutadriver.precio}</Text>
                        </View>
                        <View style={styles.profileHeader}>
                          <Image borderRadius={isSmallScreen ? 25 : 30} width={isSmallScreen ? 50 : 60} height={isSmallScreen ? 50 : 60} source={{uri:'https://gopool-img-2025.s3.us-east-2.amazonaws.com/3bc859a6-5c4f-42a3-b06d-0cd30b8325e6-21385a45-bf15-49b9-a2ad-ac7dfde3adb9.jpeg'}}/>
                          <Text style={[styles.userName, { color: theme.text }]} numberOfLines={2}>
                            {data?.rutadriver.driver.users.nombre} {data?.rutadriver.driver.users.lastname}
                          </Text>
                          <Text style={[styles.userStatus, { color: theme.labelText }]}>
                            {data?.cantidad_cupos} comprados
                          </Text>
                        </View>
                        <View style={styles.lateral}>
                          <Text style={[styles.lateralTitle, { color: theme.labelText }]}>Fecha</Text>
                          <Text style={[styles.lateralValue, { color: theme.text }]} numberOfLines={1}>
                            {data?.rutadriver.horasalida.split('T')[0].replace(/-/g, '/')}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={[styles.section, {flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-around', backgroundColor: theme.cardBackground, padding: isSmallScreen ? 8 : 5, alignItems: 'center', gap: isSmallScreen ? 8 : 0}]}>
                        <View style={{flexDirection: 'column', gap: 5, alignItems: isSmallScreen ? 'flex-start' : 'center'}}>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>{data?.rutadriver.ZonaInicial}</Text>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}}>{data?.rutadriver.horasalida.split('T')[1].substring(0, 5)}</Text>
                        </View>
                        <FontAwesome name={isSmallScreen ? "long-arrow-down" : "long-arrow-right"} size={isSmallScreen ? 20 : 25} color={theme.text} />
                        <View style={{flexDirection: 'column', gap: 5, alignItems: isSmallScreen ? 'flex-start' : 'center'}}>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}} numberOfLines={1}>{data?.rutadriver.ZonaFinal}</Text>
                          <Text style={{color: theme.text, fontSize: isSmallScreen ? 13 : 15}}>{data?.rutadriver.horaestimacionllegada.split('T')[1].substring(0, 5)}</Text>
                        </View>
                      </View>
                      <View style={[styles.placa,{ backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.textPlaca, {color: theme.text}]}>Placa: {data?.rutadriver.vehiculo.placa}</Text>
                      </View>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
                          <FontAwesome5 name="car-side" size={isSmallScreen ? 25 : 30} color="yellow" />
                          <Text style={[styles.text, {color: theme.text}]}>Foto Vehiculo</Text>
                          <Text style={[styles.text, {color: theme.text, fontSize: isSmallScreen ? 11 : 13}]}>Informacion del carro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${data?.rutadriver.driver.users.numeroTelefono}`)} style={styles.actionButton}>
                          <FontAwesome5 name="whatsapp" size={isSmallScreen ? 25 : 30} color="green" />
                          <Text style={[styles.text, {color: theme.text}]}>whatssap</Text>
                          <Text style={[styles.text, {color: theme.text, fontSize: isSmallScreen ? 11 : 13}]}>Contacta al conductor</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.containerCancelar}>
                        {block? null: <TouchableOpacity style={styles.cancelar} onPress={() => setCancelModal(true)}>
                          <Text style={styles.textCancelar}>Cancelar</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={{padding: 5}}>
                          <MaterialIcons name="report-problem" size={isSmallScreen ? 24 : 29} color="red" />
                        </TouchableOpacity>
                      </View>
                    </> : (!data && !loading && !finishLoading) ?
                    <>
                    <View style={{padding: isSmallScreen ? 15 : 20}}>
                      <Text style={{color: theme.text, textAlign: 'center', fontSize: isSmallScreen ? 14 : 16, lineHeight: isSmallScreen ? 22 : 25}}>
                        Querido usuario le recomendamos que busque un viaje que lo lleve a su destino a su destino...
                      </Text>
                    </View>
                    </> : <ActivityIndicator size="large" color="#00ff00" ></ActivityIndicator>}
                  </View> :
                    <ActivityIndicator size="large" color="#00ff00" ></ActivityIndicator>
            }
          </View>
        </View>
      
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalBackground} 
            activeOpacity={1} 
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Image 
                source={{ uri: (data && "rutadriver" in data) ? data?.rutadriver.vehiculo.fotovehiculo : data?.vehiculo.fotovehiculo }} 
                style={styles.modalImage} 
                resizeMode="contain"
              /> 
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          transparent
          visible={cancelModal || cancelUser}
          animationType="fade"
          onRequestClose={() => {setCancelModal(false); setCancelUser(false)}}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>
                {cancelUser ? `Esta seguro que quiere eliminar a ${nameUser}`: '¿Esta seguro que deseas cancelar el servicio?'}
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={cancelUser ? () => deleteUser(idUserDelete) : handleContinue}>
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
    height: isSmallScreen ? 180 : isMediumScreen ? 220 : 280,
    paddingTop: isSmallScreen ? 15 : 20,
    paddingHorizontal: isSmallScreen ? 15 : 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: isSmallScreen ? 120 : isMediumScreen ? 180 : 250,
    height: isSmallScreen ? 120 : isMediumScreen ? 180 : 250,
    opacity: 0.75,
  },
  headerTextContainer: {
    flex: 1,
    paddingLeft: isSmallScreen ? 10 : 20,
  },
  headerTitle: {
    fontSize: isSmallScreen ? 24 : isMediumScreen ? 27 : 29,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 17 : 20,
  },
  contentContainer: {
    flex: 1,
    padding: isSmallScreen ? 8 : isMediumScreen ? 12 : 16,
  },
  optionsCard: {
    borderRadius: isSmallScreen ? 12 : isMediumScreen ? 14 : 15,
    padding: isSmallScreen ? 10 : isMediumScreen ? 13 : 15,
    marginBottom: isSmallScreen ? 15 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '100%'
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 16 : isMediumScreen ? 17 : 18,
    fontWeight: '600',
    marginBottom: isSmallScreen ? 12 : 15,
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
    borderRadius: isSmallScreen ? 12 : 15,
    padding: isSmallScreen ? 15 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: isSmallScreen ? 13 : 14,
    lineHeight: isSmallScreen ? 18 : 20,
  },
  extraInfo:{
    backgroundColor: '#F5F5F5',
    borderRadius: isSmallScreen ? 15 : 20,
    padding: isSmallScreen ? 8 : 10,
  },
  containerHeader: {
    padding: isSmallScreen ? 10 : isMediumScreen ? 14 : 16,
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-around',
    gap: isSmallScreen ? 10 : isMediumScreen ? 8 : 0,
  },
  lateral: {
    justifyContent: 'center',
    alignItems: isSmallScreen ? 'flex-start' : 'center',
  },
  lateralTitle: {
    fontSize: isSmallScreen ? 13 : isMediumScreen ? 15 : 16,
    textAlign: 'center',
    marginBottom: isSmallScreen ? 5 : 10,
  },
  lateralValue: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 15 : 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  profileHeader: {
    alignItems: 'center',
    width: isSmallScreen ? '100%' : '60%',
    paddingVertical: isSmallScreen ? 8 : 0,
  },
  avatar: {
    width: isSmallScreen ? 50 : isMediumScreen ? 55 : 60,
    height: isSmallScreen ? 50 : isMediumScreen ? 55 : 60,
    borderRadius: isSmallScreen ? 25 : isMediumScreen ? 27.5 : 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: isSmallScreen ? 20 : isMediumScreen ? 24 : 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 5,
    marginTop: 4,
  },
  userStatus: {
    fontSize: isSmallScreen ? 11 : isMediumScreen ? 13 : 14,
    marginTop: 2,
  },
  section: {
    borderRadius: isSmallScreen ? 8 : 10,
  },
  containerScroll: {
    flexDirection: 'column',
    width: '100%',
    gap: isSmallScreen ? 8 : 10,
  },
  text: {
    fontSize: isSmallScreen ? 11 : isMediumScreen ? 13 : 14,
    color: 'white',
    textAlign: 'center',
  },
  textPlaca: {
    color: 'white',
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 17,
    fontWeight: '600',
  },
  placa: {
    padding: isSmallScreen ? 8 : isMediumScreen ? 9 : 10,
    borderRadius: isSmallScreen ? 8 : 10,
    alignItems: 'center',
  },
  pasajeroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isSmallScreen ? 8 : isMediumScreen ? 12 : 15,
    paddingVertical: isSmallScreen ? 8 : isMediumScreen ? 10 : 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: isSmallScreen ? 6 : isMediumScreen ? 10 : 15,
    borderWidth: 1,
    borderRadius: isSmallScreen ? 8 : 10,
  },
  actionButtons: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: isSmallScreen ? 8 : isMediumScreen ? 12 : 15,
    alignItems: 'center',
    gap: isSmallScreen ? 12 : isMediumScreen ? 10 : 0,
  },
  actionButton: {
    width: isSmallScreen ? '100%' : '50%',
    alignItems: 'center',
    paddingVertical: isSmallScreen ? 8 : 0,
  },
  containerCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: isSmallScreen ? 10 : isMediumScreen ? 12 : 15,
    gap: isSmallScreen ? 8 : isMediumScreen ? 12 : 20,
  },
  cancelar: {
    backgroundColor: 'green',
    padding: isSmallScreen ? 8 : isMediumScreen ? 10 : 12,
    borderRadius: isSmallScreen ? 15 : 20,
    alignItems: 'center',
    width: '80%',
  },
  textCancelar: {
    fontSize: isSmallScreen ? 15 : isMediumScreen ? 18 : 20,
    color: 'white',
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: isSmallScreen ? '95%' : isMediumScreen ? '92%' : '90%',
    height: isSmallScreen ? '55%' : isMediumScreen ? '65%' : '70%',
    borderRadius: isSmallScreen ? 8 : 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: isSmallScreen ? 15 : isMediumScreen ? 18 : 20,
    padding: isSmallScreen ? 15 : isMediumScreen ? 18 : 20,
    width: isSmallScreen ? "92%" : isMediumScreen ? "85%" : "80%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalText: {
    fontSize: isSmallScreen ? 15 : isMediumScreen ? 17 : 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: isSmallScreen ? 15 : isMediumScreen ? 18 : 20,
    lineHeight: isSmallScreen ? 21 : isMediumScreen ? 23 : 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: isSmallScreen ? 8 : isMediumScreen ? 10 : 12,
  },
  cancelButton: {
    backgroundColor: "#dc2626",
    paddingVertical: isSmallScreen ? 8 : isMediumScreen ? 10 : 12,
    paddingHorizontal: isSmallScreen ? 16 : isMediumScreen ? 20 : 24,
    borderRadius: isSmallScreen ? 10 : 12,
    minWidth: isSmallScreen ? 80 : 100,
  },
  continueButton: {
    backgroundColor: "#16a34a",
    paddingVertical: isSmallScreen ? 8 : isMediumScreen ? 10 : 12,
    paddingHorizontal: isSmallScreen ? 16 : isMediumScreen ? 20 : 24,
    borderRadius: isSmallScreen ? 10 : 12,
    minWidth: isSmallScreen ? 80 : 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 15 : 16,
    textAlign: 'center',
  },
});