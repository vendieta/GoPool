import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/Themed/ContextTheme';
import UserCard from './TEST/UserCard';
import Box from './TEST/Box';
import AntDesign from '@expo/vector-icons/AntDesign';
import Input from './Input';
import InputSeach from './InputSearch';


interface Item {
  id: string;
  userName: string;
  price: number;
  date: string;
  time: string;
  free: number;
  startZone: string;
  endZone: string;
}

const ScrollRefresh = () => {
  const { theme } = useTheme();
  const [ box1 , setBox1 ] = useState(false);
  const [ box2 , setBox2 ] = useState(false);
  const [ select1 , setSelect1 ] = useState<string>();
  const [ select2 , setSelect2 ] = useState<string>();
  const [ search , setSearch ] = useState<string>('');
  const [ action , setAction ] = useState<boolean>(true);
  console.log(select1);
  console.log(select2);
  const [data, setData] = useState<Item[]>([
    {
      id: '1',
      userName: 'Juan Pérez',
      price: 5,
      date: '2023-05-15',
      time: '08:30',
      free: 3,
      startZone: 'Centro',
      endZone: 'Norte'
    },
    {
      id: '2',
      userName: 'María García',
      price: 16,
      date: '2023-05-16',
      time: '14:15',
      free: 2,
      startZone: 'Sur',
      endZone: 'Este'
    },
    {
      id: '3',
      userName: 'Carlos López',
      price: 2,
      date: '2023-05-17',
      time: '10:45',
      free: 4,
      startZone: 'Oeste',
      endZone: 'Centro'
    },
    {
      id: '4',
      userName: 'Ana Martínez',
      price: 17,
      date: '2023-05-18',
      time: '16:20',
      free: 1,
      startZone: 'Norte',
      endZone: 'Sur'
    },
    {
      id: '5',
      userName: 'Carlos López',
      price: 2,
      date: '2023-05-17',
      time: '10:45',
      free: 4,
      startZone: 'Oeste',
      endZone: 'Centro'
    },
    {
      id: '6',
      userName: 'Carlos López',
      price: 2,
      date: '2023-05-17',
      time: '10:45',
      free: 4,
      startZone: 'Oeste',
      endZone: 'Centro'
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(false);
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

  const renderItem = ({ item }: { item: Item }) => (
    <UserCard 
      user= {item.userName}
      price= {item.price}
      routePoints= {['Mucho Lote 2 (todas las urbanizaciones)',
        'Horizonte Dorado',
        'Jardines del Río' ,
        'La Romareda',
        'La Perla',
        'Oasis',
        '...',
        'Urb. Veranda',
        'Ciudad del Río 1 y 2' ,
        '🔺Metrópolis 1 y 2',
        '🔺Guamote',
        '🔺Mall El Fortin',
        '🔺Tía Lomas de la Florida',
        '🔺Metrópolis 1 (solo en retorno paso)',
        '🔺Ciudad del Río 1 (solo en retorno paso)',
        'espol'
        ]
      }
      arrivalTime= {item.time}
      departureTime= '07:00'
      seats= {item.free}
      date='6/5/25'
      zoneInit= 'Norte'
      zoneEnd='Espols'
    />
  );

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.background,
      }
    ]}>
      <View style={styles.containerBox}>
        {action ? 
          <>
            <Box visible={box1} control={setBox1} select={select1} setSelect={setSelect1} option={['Norte', 'Sur', 'Oeste', 'Via la costa']}/>
              <Text>--a--</Text>
            <Box visible={box2} control={setBox2} select={select2} setSelect={setSelect2} option={['Norte', 'Sur', 'Oeste', 'Via la costa']}/>
            <TouchableOpacity onPress={() => {setAction(!action); console.log("hola", action)}}>
              <AntDesign name="search1" size={25} color="green" />
            </TouchableOpacity>
          </> :
          <>
            <View style={{height: '100%', width: '80%', justifyContent: 'center'}}>
              <InputSeach value={search} onChangeText={setSearch} label={''} placeholder='Busca tu punto'></InputSeach>
            </View> 
            <TouchableOpacity onPress={() => {setAction(!action); console.log("hola", action)}}>
              <AntDesign name="filter" size={25} color="green" />
            </TouchableOpacity>
          </>
        }
      </View>
      {/* <View style={styles.subContainer}> */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // numColumns={2}
          // columnWrapperStyle={{ justifyContent: 'space-around', paddingBottom: 10, gap: 10 }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator= {false}
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
        />
      </View>
    // </View>
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
    backgroundColor: 'white', 
    height: 40, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
  }

});

export default ScrollRefresh;