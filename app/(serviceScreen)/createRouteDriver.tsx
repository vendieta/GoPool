import { View , Text  , StyleSheet, Alert , Image, Button , Dimensions , useColorScheme, Platform  } from "react-native";
import MapView , { Marker , Region } from "react-native-maps";
import React , { useState , useRef , useEffect } from "react";
import * as Location from 'expo-location';
import ActionPannelDriver from "@/components/driver/ActionPannelDriver"; 
import { useLocation } from "@/hooks/useLocation";

const { width , height } = Dimensions.get('window')

interface Coordinate {
  latitude : number;
  longitude : number;
};

interface locationPoint {
  id : string,
  coordinate : Coordinate,
  isStart? : boolean,
  isDestination? : boolean
}


export default function Map () {
  const { location , error } = useLocation(); 
  const [ centerCoordinate , setCenterCoordinate ] = useState<Coordinate | null>(null); // Ubicación actual del usuario
  const defaultCoordinates = {
    latitude: -2.147464,
    longitude: -79.968125,
  };
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
        {
          center: location,
          zoom: 16,
        },
        { duration: 1000 } // Duracion de la animacion
      );
    }
    }, [location]);


  // Si no se obtuvo la ubicación, usa las coordenadas predeterminadas
  const region = centerCoordinate || defaultCoordinates;
  
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

  const confCoordinate = ( data : string ) => {

    let newLocation : locationPoint;

    if (data === 'startPoint'){
      setMarkers(prev => prev.filter(loc => !loc.isStart));
      newLocation = {
        id: 'startPoint',
        coordinate: region,
        // title: 'punto de partida',
        isStart: true
      };
    } else if  (data === 'endPoint') {
      // Remover cualquier ubicación de destino existente
      setMarkers(prev => prev.filter(loc => !loc.isDestination));
      newLocation = {
        id: 'endPoint',
        coordinate:region,
        isDestination: true
      };
    } else if (data === "point1" || data === "point2" || data === "point3") {
        setMarkers(prev => prev.filter(loc => !(loc.id === data)));
        newLocation = {
          id: data,
          coordinate: region,
        }
      }
      setMarkers(prev => [...prev, newLocation]);
  }
  console.log('estos son los markers: ',markers)
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
      <ActionPannelDriver region={region} confCoordinate={confCoordinate} Markers={markers}/>
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
    width : 60,
    height : 60,
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
    top : (height/2)-49, 
    left : (width/2)-30,
  }
})