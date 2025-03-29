import { View, Text, StyleSheet, Alert, Image, Dimensions,TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import React, { useState, useRef, useEffect } from "react";
import * as Location from 'expo-location';
import ActionPannel from "@/components/ActionPannel";

const { width, height } = Dimensions.get('window');
const ruta = "/createRouteUser"; // Cambia la ruta según tu estructura de navegación
interface Coordinate {
  latitude: number;
  longitude: number;
}

// Función para convertir string a Route (si la necesitas más adelante, aunque aquí no la usamos)
const toRoute = (path: string): string => path;

export default function Map() {
  const [centerCoordinate, setCenterCoordinate] = useState<Coordinate | null>(null);
  const defaultCoordinates = {
    latitude: -2.147464,
    longitude: -79.968125,
  };
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
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.01,
        },
        1000
      );
    })();
  }, []);

  const region = centerCoordinate || defaultCoordinates;

  const handleRegionChangeComplete = (point: Region) => {
    const center: Coordinate = {
      latitude: point.latitude,
      longitude: point.longitude,
    };
    setCenterCoordinate(center);
    console.log('Coordenada del centro del mapa: ', center);
  };

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
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
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
  subtitle: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '70%', // Ajustamos la altura para dejar espacio al título, botón y ActionPannel
    borderRadius: 10, // Bordes redondeados como los inputs de homeLogin
  },
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