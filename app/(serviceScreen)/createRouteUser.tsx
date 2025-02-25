// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import MapView, { Marker, Polyline, Region, LatLng } from 'react-native-maps';
// import * as Location from 'expo-location';

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// const App: React.FC = () => {
//   const [userLocation, setUserLocation] = useState<LocationType | null>(null); // Ubicación actual del usuario
//   const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null); // Ubicación seleccionada
//   const [route, setRoute] = useState<LocationType[]>([]); // Ruta que conecta los puntos

//   useEffect(() => {
//     // Obtener la ubicación actual del usuario
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation(location.coords);
//     })();
//   }, []);

//   const handleMapPress = (e: { nativeEvent: { coordinate: LatLng } }) => {
//     // Obtener las coordenadas donde el usuario tocó
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setSelectedLocation({ latitude, longitude });

//     // Actualizar la ruta con los puntos
//     if (userLocation) {
//       setRoute([userLocation, { latitude, longitude }]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {userLocation ? (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           onPress={handleMapPress}
//         >
//           {/* Marcador en la ubicación actual */}
//           <Marker coordinate={userLocation} title="Mi ubicación" />

//           {/* Si se seleccionó un punto, agregar un marcador */}
//           {selectedLocation && (
//             <Marker coordinate={selectedLocation} title="Destino seleccionado" />
//           )}

//           {/* Dibujar la línea entre los puntos */}
//           {route.length === 2 && (
//             <Polyline
//               coordinates={route}
//               strokeColor="#00BFFF"
//               strokeWidth={5}
//             />
//           )}
//         </MapView>
//       ) : (
//         <Text>Cargando mapa...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default App;


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// export default function map() {
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
