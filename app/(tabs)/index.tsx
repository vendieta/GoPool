import { ScrollView , Image , StyleSheet , View , Alert , Text , FlatList} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  UserCard  from '../../components/TEST/UserCard';
import { Feather } from '@expo/vector-icons';
import { supabase } from '@/supabaseClient';
import { useEffect , useState } from 'react';
import ScrollRefresh from '@/components/ScrollRefresh';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// debo descomentar el codigo que esta en el archivo fontfaceobserver.standalone.js
{/*ESTA ES LA PANTALLLA DE INICIO SERIA COMO EL INDEX*/}


export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]); // Estado para almacenar los datos
  const [error, setError] = useState<string>(''); // Estado para manejar errores
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('cardData') // Especifica tu tabla aquí
        .select('*'); // O especifica las columnas que quieres recuperar
  
      if (error) {
        setError(error.message); // Si hay un error, lo guardamos en el estado
        return;
      }
  
      setData(data); // Si todo va bien, guardamos los datos
      // console.log(data)
    };
  
    fetchData();
  }, []); // Este efecto se ejecutará solo una vez, al montar el componente

  return (
    <GestureHandlerRootView>

    <ScrollRefresh
>
      

    {/* <FlatList style={styles.containerCard}
    data={data}
    keyExtractor={(data)=> data.id}
    renderItem={({item}) => <UserCard element={{
      user:item.user,
      price:item.precio,
      date:item.fechaStart,
      time: item.horaStart,
      free: item.cupos,
      initialZone: item.pointStart,
      endZone: item.pointFinish,
      }}></UserCard>}
    nestedScrollEnabled
    </FlatList>
    > */}

      {/* {data.length > 0 ? (
        data.map((item, index) => (
          <UserCard key={index}element={{
            user:item.user,
            price:item.precio,
            date:item.fechaStart,
            time:item.horaStart,
            free:item.cupos,
            initialZone:item.pointStart,
            endZone:item.pointFinish,
            }}
            ></UserCard>
            
            // <li key={index}>{JSON.stringify(item[0])}</li> // Muestra los datos en un <li>
            ))
            ) : (
              <Text>Cargando...</Text> // Muestra un mensaje de carga si no hay datos aún
              )} */}
              
              {/* <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
      <UserCard></UserCard> */}
      
    </ScrollRefresh>
  </GestureHandlerRootView>
)}
const styles = StyleSheet.create({

});



