import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/Themed/ContextTheme';
import UserCard from './TEST/UserCard';
import Box from './TEST/Box';
import AntDesign from '@expo/vector-icons/AntDesign';
import Input from './Input';
import InputSeach from './InputSearch';
import { useApi } from '@/hooks/useApi';
import LoadingOverlay from './loading/LoadingOverlay';


interface Item {
  id: string;
  userName: string;
  price: number;
  date: string;
  time: string;
  free: number;
  startZone: string;
  endZone: string;
};

interface data {
  msg: string;
  data: obj[];
};

interface DriverInfo {
  users: UserInfo;
  fotodriver: string | null;
};

interface UserInfo {
  nombre: string;
  lastname: string;
};

interface obj {
  id: string;
  cuposdisponibles: number;
  horaestimacionllegada: string; // ISO date string
  bloqueopasajeros: boolean;
  ZonaInicial: string;
  ZonaFinal: string;
  precio: number;
  horasalida: string; // ISO date string
  puntosruta: PuntoRuta[];
  driver: DriverInfo
};

interface PuntoRuta {
  id: string;
  orden: string; // Podría ser number si se convierte
  latitud: number | null;
  longitud: number | null;
  descripcion: string;
  idrutadriver: string;
};


const ScrollRefresh = () => {
  const { theme } = useTheme();
  const [ box1 , setBox1 ] = useState(false);
  const [ box2 , setBox2 ] = useState(false);
  const [ select1 , setSelect1 ] = useState<string>();
  const [ select2 , setSelect2 ] = useState<string>();
  const [ search , setSearch ] = useState<string>('');
  const [ action , setAction ] = useState<boolean>(true);
  const { data, loading, error, get } = useApi<data>();
  const [refreshing, setRefreshing] = useState(false);
  // console.log('esta es la data',data?.data[4]);
  // console.log('esta es la data',data?.data[4].puntosruta.sort((a, b) => parseInt(a.orden) - parseInt(b.orden)).map(punto => punto.descripcion));

  const fetchData = async () => {
    try {
      get(`/api/rutas/`)
      setRefreshing(false);
      console.log('datos actualizados')
    } catch (err) {
      console.error('Error fetching data:', err);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData();
    }, 1500);
  };

interface FiltroRutas {
  zonaInicial?: string;
  zonaFinal?: string;
  puntoRuta?: string;
  conductor?: string;
}

const filtrarRutas = (rutas: any[], filtros: FiltroRutas) => {
  return rutas.filter(ruta => {
    let coincide = true;  // Empieza asumiendo que coincide
    
    // Filtro por Zona Inicial
    if (filtros.zonaInicial) {
      coincide &&= ruta.ZonaInicial.toLowerCase().includes(filtros.zonaInicial.toLowerCase());
    }
    
    // Filtro por Zona Final  
    if (filtros.zonaFinal) {
      coincide &&= ruta.ZonaFinal.toLowerCase().includes(filtros.zonaFinal.toLowerCase());
    }
    
    // Filtro por Punto de Ruta
    if (filtros.puntoRuta) {
      coincide &&= ruta.puntosruta.some(punto => 
        punto.descripcion.toLowerCase().includes(filtros.puntoRuta!.toLowerCase())
      );
    }
    
    // Filtro por Conductor
    if (filtros.conductor) {
      const nombreCompleto = `${ruta.driver.users.nombre} ${ruta.driver.users.lastname}`.toLowerCase();
      coincide &&= nombreCompleto.includes(filtros.conductor.toLowerCase());
    }
    
    return coincide;
  });
};
//   const filtrarRutas = (rutas: obj[], busqueda: string) => {
//   return rutas.filter(ruta => 
//     ruta.ZonaInicial.toLowerCase().includes(busqueda.toLowerCase()) ||
//     ruta.ZonaFinal.toLowerCase().includes(busqueda.toLowerCase()) ||
//     ruta.puntosruta.some(punto => 
//       punto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
//     )
//   );
// };

  const renderItem = ({ item }: { item: obj }) => (
    (item.cuposdisponibles != 0) ? <UserCard 
      id = {item.id}
      user= {item?.driver?.users?.nombre}
      price= {item.precio}
      routePoints= {item.puntosruta.sort((a, b) => 
        (+a.orden || (a.orden === 'inicio' ? 0 : 999)) - (+b.orden || (b.orden === 'inicio' ? 0 : 999))
        ).map(p => p.descripcion )|| []
      }
      // routePoints= {item.puntosruta.sort((a, b) => parseInt(a.orden) - parseInt(b.orden)).map(punto => punto.descripcion) || []} 
      arrivalTime= {item.horaestimacionllegada.split('T')[1].substring(0, 5)}
      departureTime= {item.horasalida.split('T')[1].substring(0, 5)}
      seats= {item.cuposdisponibles}
      date= {item.horasalida.split('T')[0].replace(/-/g, '/') }
      zoneInit= {item.ZonaInicial}
      zoneEnd= {item.ZonaFinal}
    />
    : null
  );

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.background,
      }
    ]}>
      <View style={[styles.containerBox, {backgroundColor: theme.cardBackground}]}>
        {!action ? 
          <>
            <Box visible={box1} control={setBox1} select={select1} setSelect={setSelect1} option={['Norte', 'Sur', 'Este','Oeste', 'Via la costa', 'Espol']}/>
              <Text style={{color: theme.text}}>--a--</Text>
            <Box visible={box2} control={setBox2} select={select2} setSelect={setSelect2} option={['Norte', 'Sur', 'Este', 'Oeste', 'Via la costa', 'Espol']}/>
            <TouchableOpacity onPress={() => {setAction(!action); setSelect1('');setSelect2('') }}>
              <AntDesign name="search1" size={25} color={theme.text} />
            </TouchableOpacity>
          </> :
          <>
            <View style={{height: '100%', width: '85%', justifyContent: 'center'}}>
              <InputSeach value={search} onChangeText={setSearch} label={''} placeholder='Busca tu punto'></InputSeach>
            </View> 
            <TouchableOpacity onPress={() => {setAction(!action); setSearch('')}}>
              <AntDesign name="filter" size={25} color={theme.text} />
            </TouchableOpacity>
          </>
        }
      </View>
      {/* <View style={styles.subContainer}> */}
        {!loading? <FlatList
          data={filtrarRutas(data?.data || [], {
            zonaInicial: select1,
            zonaFinal: select2,
            puntoRuta: search,
          })}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // numColumns={2}
          // columnWrapperStyle={{ justifyContent: 'space-around', paddingBottom: 10, gap: 10 }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator= {false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          }
          // ItemSeparatorComponent={() => (
          //   <View style={{ height: 0, backgroundColor: 'transparent' }} />
          // )}
        /> : 
        <LoadingOverlay visible={loading}/>}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 0,
    alignItems: 'center'
  },
  listContent: {
    paddingTop: 6,
  },
  cardContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  subContainer: {
    flex: 1,
  },
  containerBox: {
    height: 50, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 5,
    paddingHorizontal: 15,
  }

});

export default ScrollRefresh;