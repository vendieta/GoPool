<<<<<<< HEAD
import { View, Text, StyleSheet, Alert, Image, Dimensions,TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import React, { useState, useRef, useEffect } from "react";
=======
import { View , Text  , StyleSheet, Alert , Image, Button , Dimensions , useColorScheme, Platform  } from "react-native";
import MapView , { Marker , Region } from "react-native-maps";
import React , { useState , useRef , useEffect } from "react";
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
import * as Location from 'expo-location';
import ActionPannel from "@/components/ActionPannel";
import { useLocation } from "@/hooks/useLocation";

const { width, height } = Dimensions.get('window');
const ruta = "/createRouteUser"; // Cambia la ruta según tu estructura de navegación
interface Coordinate {
  latitude: number;
  longitude: number;
}

<<<<<<< HEAD
// Función para convertir string a Route (si la necesitas más adelante, aunque aquí no la usamos)
const toRoute = (path: string): string => path;

export default function Map() {
  const [centerCoordinate, setCenterCoordinate] = useState<Coordinate | null>(null);
=======
interface locationPoint {
  id : string,
  coordinate : Coordinate,
  isStrat? : boolean,
  isDestination? : boolean
}


export default function Map () {
  const { location , error } = useLocation(); 
  const [ centerCoordinate , setCenterCoordinate ] = useState<Coordinate | null>(null); // Ubicación actual del usuario
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
  const defaultCoordinates = {
    latitude: -2.147464,
    longitude: -79.968125,
  };
<<<<<<< HEAD
  console.log(ruta);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let lastLocation = await Location.getLastKnownPositionAsync({});
      if (lastLocation) {
        console.log('Usando la última ubicación conocida: ', lastLocation);
        setCenterCoordinate(lastLocation.coords);
        mapRef.current?.animateToRegion({
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.01,
        }, 1000);
      }

      let location = await Location.getCurrentPositionAsync({});
      setCenterCoordinate(location.coords);
      mapRef.current?.animateToRegion(
=======
  const mapRef = useRef<MapView>(null); // Correcto: Se usa useRef en vez de RefObject directamente
  const [ markers , setMarkers ] = useState<locationPoint[]>([])
  
                    // ESTE ES EL CODIGO PARA PONER EL MAPA NATIVO EN MODO OSCURO AUN QUE HAY QUE PERFECCIONAR EL CODIGO
                    // const colorScheme = useColorScheme(); // Detecta si el sistema está en modo oscuro


                    // Estilos personalizados para Google Maps (modo oscuro)
                    // const darkMapStyle = [
                    //   { elementType: "geometry", stylers: [{ color: "#212121" }] },
                    //   { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
                    //   { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                    //   { featureType: "road", elementType: "geometry", stylers: [{ color: "#424242" }] },
                    // ];
  useEffect(() => {

  // pide acceso a la ubicación del usuario
    if (location && mapRef.current) {
      console.log('puto location que cambia:  ' , location)
      setCenterCoordinate(location)
      mapRef.current.animateCamera(
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
        {
          center: location,
          zoom: 16,
        },
<<<<<<< HEAD
        1000
=======
        { duration: 1000 } // Duracion de la animacion
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
      );
    }
    }, [location]);


  const region = centerCoordinate || defaultCoordinates;
<<<<<<< HEAD

  const handleRegionChangeComplete = (point: Region) => {
    const center: Coordinate = {
      latitude: point.latitude,
      longitude: point.longitude,
=======
  
  // esta funcion se usa para extraer las coordenadas cuando el usuario termina de mover o hacer zoom en el mapa
  const handleRegionChangeComplete = ( point : Region ) => {
    // Extraemos las coordenadas del centro del mapa

    const center : Coordinate = {
      latitude : point.latitude, // latitude del centro
      longitude : point.longitude, // longitud del centro
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
    };
    setCenterCoordinate(center);
    console.log('Coordenada del centro del mapa: ', center);
  };
  
  // const addMarker = () => {

<<<<<<< HEAD
  const handleConfirmLocation = () => {
    console.log('Ubicación seleccionada: ', centerCoordinate);
    Alert.alert(`Ubicación seleccionada: ${region.latitude}, ${region.longitude}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu ubicación</Text>
      <Text style={styles.subtitle}>Mueve el mapa para elegir el punto deseado</Text>

      <MapView
        pitchEnabled={false}
        rotateEnabled={false}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: defaultCoordinates.latitude,
          longitude: defaultCoordinates.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.01,
=======

  // }

  const confCoordinate = ( data : string ) => {


    let newLocation : locationPoint;

    if (data === 'startPoint'){
      setMarkers(prev => prev.filter(loc => !loc.isStrat));
      newLocation = {
        id: 'startPoint',
        coordinate: region,
        // title: 'punto de partida',
        isStrat: true
      }
    } else if  (data === 'endPoint') {
      // Remover cualquier ubicación de destino existente
      setMarkers(prev => prev.filter(loc => !loc.isDestination));
      newLocation = {
        id: 'endPoint',
        coordinate:region,
        isDestination: true
      };} 
      // else {
      //   newLocation = {
      //     id: ''
      //   }
      // }
      setMarkers(prev => [...prev, newLocation]);
  }
  console.log(markers)
  // Renderizamos la interfaz de la aplicacion
  return(
    <View>
      {/* Usamos la componente de MapView para mostrar el mapa */}
      <MapView
                    // mapType={Platform.OS === "ios" ? (colorScheme === "dark" ? "mutedStandard" : "standard") : "standard"}
                    // customMapStyle={Platform.OS === "android" && colorScheme === "dark" ? darkMapStyle : []}
                    // // iOS: Usa "mutedStandard" para modo oscuro en Apple Maps
                    // // Android: Aplica customMapStyle cuando el tema es oscuro
        pitchEnabled = {false} // bloquea la inclinacion en 3d
        rotateEnabled = {false} // bloquea la rotacion del mapa
        ref = {mapRef}
        style = {styles.map}
        initialRegion = {{
          latitude: defaultCoordinates.latitude, // latitud inicial
          longitude: defaultCoordinates.longitude, // longitud inicial
          latitudeDelta: 0.01, // El delta es para la el zoom inical (ajusta el nivle del zoom )
          longitudeDelta: 0.001,
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
<<<<<<< HEAD
        <Marker coordinate={region} />
      </MapView>

      <View style={styles.pointerContainer}>
        <Image
          source={require('../../assets/images/icon_chayanne.jpg')}
          style={styles.pointer}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
          <Text style={styles.buttonText}>CONFIRMAR UBICACIÓN</Text>
        </TouchableOpacity>
      </View>

      <ActionPannel />
=======
        
      {/* Renderizar marcadores si existen */}
      {markers.map(marker => (
        <Marker
        key={marker.id}
        coordinate={marker.coordinate}
        >

        </Marker>
      ))}
      </MapView>

      {/* puntero */}
          <View style = {styles.pointerContainer}>
            <Image
              source={require('../../assets/images/puntero.png')}
              style = {styles.pointer}/>
          </View>
      
      {/* Boton para confirmar la ubicacion seleccionada
      <View style = { styles.buttonContainer}>
        <Button
          title="Confirmar Ubicacion"
          onPress={handleConfirmLocation}
          />
      </View> */}
      
      <ActionPannel region={region} confCoordinate={confCoordinate}/>
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
<<<<<<< HEAD
  subtitle: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.03,
    textAlign: 'center',
=======
  pointer : {
    width : 60,
    height : 60,
    resizeMode : 'contain', // ajusta la imagen al tamano sin deformar 
>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
  },
  map: {
    width: '100%',
    height: '70%', // Ajustamos la altura para dejar espacio al título, botón y ActionPannel
    borderRadius: 10, // Bordes redondeados como los inputs de homeLogin
  },
<<<<<<< HEAD
  pointerContainer: {
    position: 'absolute',
    top: height / 2 - 70,
    left: width / 2 - 20,
  },
  pointer: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.15, // Ajustado para dejar espacio al ActionPannel
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ff4d4d', // Color rojo igual que homeLogin
    borderRadius: 25, // Bordes redondeados
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    width: width * 0.8, // 80% del ancho como en homeLogin
    alignItems: 'center',
    shadowColor: '#000', // Sombra como en BottomStyle
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff', // Texto blanco como en homeLogin
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
=======
  pointerContainer : {
    position : 'absolute',
    // centra el puntero en la pantalla se modifica segun las dimensiones del puntero
    top : (height/2)-88, 
    left : (width/2)-30,
  }
})





>>>>>>> bf56fbdfc8bd7157df15e22a5dfc328eb2c61e42
