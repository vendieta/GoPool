import { View , Text  , StyleSheet, Alert , Image, Button , Dimensions , useColorScheme, Platform  } from "react-native";
import MapView , { Marker , Region } from "react-native-maps";
import React , { useState , useRef , useEffect } from "react";
import * as Location from 'expo-location';
import ActionPannel from "@/components/ActionPannel";

const { width , height } = Dimensions.get('window')

interface Coordinate {
  latitude : number;
  longitude : number;
};




export default function Map () {
  // const [ centerCoordinate , setCenterCoordinate ] = useState<Coordinate>({
  //   latitude: 4,//  logitud inicial en el mapa
  //   longitude: 3, // logitud inicial en el mapa 
  // });

  const [ centerCoordinate , setCenterCoordinate ] = useState<Coordinate | null>(null); // Ubicación actual del usuario
  const defaultCoordinates = {
    latitude: -2.147464,
    longitude: -79.968125,
  };
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
    // Obtener la ubicación actual del usuario
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      // optener la ultima ubicacion optenida primero
      let lastLocation = await Location.getLastKnownPositionAsync({});
      if(lastLocation) {
        console.log('Usando la ultima ubicacion conocida:     ', lastLocation)
        // Aqui se usa el lastLocation.coords que da las cordenadas de latitude y longitude pero en un orden similar
        // si llegase a tener problemas con respecto a coordenadas mal puede ser esto se reemplazaria con:
        //setCenterCoordinate({
        //  latitude: lastLocation.coords.latitude,
        //  longitude: lastLocation.coords.longitude,
        //  });

        setCenterCoordinate(lastLocation.coords)

        mapRef.current?.animateToRegion({
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.001,
        },
        1000
        );
      };

      let location = await Location.getCurrentPositionAsync({});
      setCenterCoordinate(location.coords);
      // ✅ Mueve el mapa a la ubicación obtenida
      mapRef.current?.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.001,
        },
        1000 // Duración de la animación (opcional)
      );
    })();
  }, []);

  // Si no se obtuvo la ubicación, usa las coordenadas predeterminadas
  const region = centerCoordinate || defaultCoordinates;

  const mapRef = useRef<MapView>(null); // Correcto: Se usa useRef en vez de RefObject directamente

  // esta funcion se usa para extraer las coordenadas cuando el usuario termina de mover o hacer zoom en el mapa
  const handleRegionChangeComplete = ( point : Region ) => {
    // Extraemos las coordenadas del centro del mapa

    const center : Coordinate = {
      latitude : point.latitude, // latitude del centro
      longitude : point.longitude, // longitud del centro
    };
    // actualizamos el estado con las nuevas coordenadas del centro
    setCenterCoordinate(center)
    // mostramos las coordenadas por la consola
    console.log('Coordenada del centro del mapa:  ', center);
  };


  // funcion para manejar la confimacion de la ubicacion seleccionada
  const handleConfirmLocation = () => {
    // Mostramos las coodenadas seleccionadas en la consola
    console.log( 'Ubicacion seleccionada: ' , centerCoordinate)
    // Mostramos una alerta con las coordenadas
    Alert.alert(`Ubicacion seleccionada:  ${region.latitude}  ,  ${region.longitude}`)
  };

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
        }}
        onRegionChangeComplete = {handleRegionChangeComplete} // escucha los cambiops en la region del mapa
      >
        {/* Marcador en el centro del mapa */}
        <Marker coordinate={region}>
          {/* puntero personalizado */}
        </Marker>
      </MapView>

      {/* puntero */}
          <View style = {styles.pointerContainer}>
            <Image
              source={require('../../assets/images/icon_chayanne.jpg')}
              style = {styles.pointer}/>
          </View>
      
      {/* Boron para confirmar la ubicacion seleccionada */}
      <View style = { styles.buttonContainer}>
        <Button
          title="Confirmar Ubicacion"
          onPress={handleConfirmLocation}
          />
      </View>
      
      <ActionPannel  pointStart={region.longitude.toString()} pointEnd={`${region.latitude}`}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex : 1
  },
  map : {
    width : '100%',
    height : '100%'
  },
  pointer : {
    width : 40,
    height : 40,
    resizeMode : 'contain', // ajusta la imagen al tamano sin deformar 
  },
  buttonContainer : { 
    position : 'absolute', // posision absoluta sobrepone el boton
    bottom : 20 , // Distancia desde la parte inferior
    alignSelf : 'center' , // centra el boton horizontalmente
  },
  pointerContainer : {
    position : 'absolute',
    // centra el puntero en la pantalla se modifica segun las dimensiones del puntero
    top : (height/2)-70, 
    left : (width/2)-20,
  }

})







// // import { View , Text } from "react-native";


// // export default function CreateRouterUser(){
// //     return(
// //         <View style={{flex:1}}>
// //             <Text style={{margin:'auto' , color: 'white' }}>pantalla de usuario</Text>
// //         </View>
// //     )
// // }


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
//           // esta porcion de codigo hace que el usuario pueda direccionar el punto de destino
//           onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate) }
//           onPress={(e) => setDestination(e.nativeEvent.coordinate)}
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
