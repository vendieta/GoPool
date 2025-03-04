// //  opcion video de youtube
// import React , { useState, useEffect } from "react";
// import { StyleSheet , View , Text } from "react-native";
// import MapView , { Marker , Polyline }from "react-native-maps";
// import * as Location from 'expo-location';


// interface LocationType {
//     latitude: number;
//     longitude: number;
//   }

// export default function Map() {
//   const [userLocation, setUserLocation] = useState<LocationType | null>(null); // Ubicación actual del usuario
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
//   const defaultCoordinates = {
//     latitude: -2.147464,
//     longitude: -79.968125,
//   };

//   const [destination, setDestination] = React.useState({
//     latitude: -2.130176,
//     longitude: -79.902367,
//   });
//   // Si no se obtuvo la ubicación, usa las coordenadas predeterminadas
//   const region = userLocation || defaultCoordinates;

//   return(
//     <View style = {styles.container}>
//       <MapView 
//         style = {styles.map}
//         initialRegion={{
//           latitude: region.latitude,
//           longitude: region.latitude,
//           latitudeDelta: 0.09,
//           longitudeDelta: 0.04,
//         }}>
//           <Marker
//           draggable
//           coordinate={region}
//           // esta porcion de codigo hace que el usuario pueda direccionar el punto de incio 
//           onDragEnd={(direction) => setUserLocation(direction.nativeEvent.coordinate) }
//           />
//           <Marker
//           draggable
//           coordinate={destination}
//           // esta porcion de codigo hace que el usuario pueda direccionar el punto de incio 
//           onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate) }
//           />
//           <Polyline
//             coordinates={[ region , destination ]}
//             strokeWidth={5}/>
//         </MapView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   }
// })


// opcion uno de chatgpt


// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import MapView, { Marker, Polyline, Region, LatLng } from 'react-native-maps';
// import * as Location from 'expo-location';

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// const map: React.FC = () => {
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

// export default map;



// opcion dos que aun nose 
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
