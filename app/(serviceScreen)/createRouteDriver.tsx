import PriceInput from "@/components/driver/PriceInput";
import RoutePointsInput from "@/components/driver/RoutePointsInput";
import SeatsInput from "@/components/driver/SeatsInput";
import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import { View , Text, TextInput , StyleSheet, ScrollView, Alert , Image, Button , Dimensions , useColorScheme, Platform, TouchableOpacity, Modal, ActivityIndicator  } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import CarCard from "@/components/driver/RenderItems";
import AddCar from "@/components/driver/AddCar";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import WeekPicker from "@/components/driver/WeekPicker";
import { combinarFechaYHora } from "@/scripts/compareTime";


const {width} = Dimensions.get('window')

interface FormattedPoint {
    orden: string | number;
    descripcion: string;
}

interface DataViaje {
	msg: string,
	data: {
		viaje: {
			message: string,
			id: string
		},
		puntos: number
  }
}

interface req {
    data: obj []
}

interface obj {
    id: string,
    marca: string,
    placa: string,
    capacidadmax: number,
    fotovehiculo: string,
    modelocar: string,
    color: string
}

interface HistoryData {
  departureTime: Date;
  arrivalTime: Date;
  zoneInit: string;
  zoneEnd: string;
  price: number;
  seats: number;
  routePoints: FormattedPoint[];
  routePointsObj: FormattedPoint[];
}


interface RouteData {
inicio: string;
final: string;
[key: string]: string;
}

export default function CreateRoutesDriver() {
  const router = useRouter();
  const { info } = useLocalSearchParams();
  const [ horaSalida, setHoraSalida ] = useState<Date>();
  const [ selectDate, setSelectedDate ] = useState<Date>();
  const [ horaLlegada, setHoraLlegada ] = useState<Date>();
  const [ zonaInicial, setZonaInicial ] = useState<string>();
  const [ zonaFinal, setZonaFinal ] = useState<string>();
  const [ precio, setPrecio ] = useState<number>(0);
  const [ asientos, setAsientos ] = useState<number>(0);
  const [ rutas, setRutas ] = useState<FormattedPoint[]>();
  const { data, loading, error, post } = useApi<DataViaje>();
  const { data: data2, loading: loading2, error: error2, get } = useApi<req>();
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ idCar, setIdCar ] = useState<string>();
  const [ imgCar, setImgCar ] = useState<string>();
  const [ model, setModel ] = useState<string>();
  const [ placa, setPlaca ] = useState<string>();
  const [ controler, setControler ] = useState<boolean>();
  const [ refresh , setRefresh ] = useState(true);
  const [ wait, setWait ] = useState<boolean>(false);
  const {
    storedValue: access_token,
    setItem: setAccess_token,
  } = useStorage('access_token');
  console.log('access_token en createRoute', access_token);

  const historyData: HistoryData  = typeof info === "string"
  ? JSON.parse(decodeURIComponent(info))
  : ({} as HistoryData);

  useEffect(() => {
    console.log('info:', info);
    console.log('historyData:', historyData);
    if (historyData) {
      setHoraSalida(historyData.departureTime);
      setHoraLlegada(historyData.arrivalTime);
      setZonaInicial(historyData.zoneInit);
      setZonaFinal(historyData.zoneEnd);
      setPrecio(historyData.price);
      setAsientos(historyData.seats);
      setRutas(historyData.routePoints);
    };
  }, []);
  

  const {
    storedValue: userId,
    setItem: setId,
    removeItem: removeId
  } = useStorage('userId');

  console.log('zonaInicial: ',zonaInicial,'zonaFinal:', zonaFinal,'precio:', precio,'asientos:', asientos,'horaEntrada',horaLlegada,'horaSalida',horaSalida,'listadepuntos:', rutas)

  useEffect(() => {
    if(userId) {
        get(`/api/vehiculo/listar/`, undefined,{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      })
      console.log('el get de la lista vehiculo',data2)
    }
  }, [refresh]);

  useEffect(() => {

    console.log(!error && data?.data)
    const number : number = historyData? 3 : 2;
    if (!error && data?.data) {
      router.push({ pathname: "/send", params: { steps: number } })
    }
  },[data])



  const dataCar = () => {
    setVisible(true)
    console.log(`/api/vehiculo/listar/${userId}`)
    if (!data2) {
         get(`/api/vehiculo/listar/`, undefined,{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      })
    }
    console.log('el get de la lista vehiculo',data2)
  }
  
  const send = async () => {
    if (wait) return; // evita múltiples ejecuciones
    setWait(true);
    // logica para publicar ruta
    if (!zonaInicial || !zonaFinal || !precio || !asientos || !horaSalida || !horaLlegada || !rutas || !idCar || !selectDate) {
      Alert.alert(
        "error",
        "porfavor complete todos los campos.",
        [{ text: "Entendido" }]
      )
      setWait(false);
      return;
    }

    await post('/api/viajes/crear', {
      // id_driver: userId,
      zonaInicial: zonaInicial,
      zonaFinal: zonaFinal,
      precio: precio,
      asientos: asientos,
      horaSalida: combinarFechaYHora(selectDate, new Date(horaSalida)),
      horaLlegada: combinarFechaYHora(selectDate, new Date(horaLlegada)),
      Listapuntos: rutas,
      id_vehiculo: idCar
    },{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      })
    setWait(false); 
  };
  console.log('🚗🚗🚗👺👺👺👺', selectDate && horaLlegada ? combinarFechaYHora(selectDate, new Date(horaLlegada)): '');

  const save =(idCar: string,img: string, model: string, placa: string) => {
    setImgCar(img);
    setModel(model);
    setPlaca(placa);
    setIdCar(idCar);
    setVisible(false);
  };
      useEffect(() => {
        console.log(loading)
        console.log(data2)   
        console.log(data2?.data[0])   
      }, [loading, data2])


  return(
    <View style={styles.container}>
      <ScrollView  
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.95,
      }}>
        <View style={[styles.subContainer, Platform.OS === 'web' ? { width: '100%',} : { width: '95%',}]}>
          <View style={styles.inputContainer}>
             <WeekPicker setSelectedDate={setSelectedDate} />
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
              <TimeInput
              initialValue={horaSalida}
              save={setHoraSalida}
              backColor="#fab1a0"
              SalEnt="Salida"/>
              <TimeInput
              initialValue={horaLlegada}
              save={setHoraLlegada}
              backColor="#81ecec"
              SalEnt="Llegada"/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>De que zona partes?</Text>
                <Desplegable 
                initialValue={zonaInicial}
                save={setZonaInicial}
                backColor= '#fab1a0'/>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>A que zona vas?</Text>
                <Desplegable
                initialValue={zonaFinal}
                save={setZonaFinal}
                backColor= '#81ecec'/>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <PriceInput
              initialValue={precio}
              save={setPrecio}
              />
            </View>
            <View style={{width: '100%'}}>
              <SeatsInput initialValue={asientos} save={setAsientos}/>
            </View>
            <View style={{width: '100%'}}>
              <RoutePointsInput initialValue={historyData.routePointsObj} save={setRutas}/>
            </View>
            <TouchableOpacity style={{marginVertical: 5, width: '80%', borderRadius: 10, borderColor: 'black', borderWidth: 1, padding: 5, justifyContent: 'center'}} onPress={dataCar}>
              {imgCar && model && placa ? 
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Image height={50} width={50} borderRadius={5} source={{uri:imgCar}}/>
                <View style={{justifyContent: 'center'}}>
                  <Text>Modelo:</Text>
                  <Text>{model}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text>Placa:</Text>
                  <Text>{placa}</Text>
                </View>
              </View> :
              <View style={{alignItems: 'center', padding: 5}}>
                <Text>Seleccione el vehiculo</Text>
              </View>
              }
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, wait && { opacity: 0.6 }]} onPress={send} disabled={wait}>
              <Text style={{fontWeight: '700', fontSize: 18}}>Publicar ruta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal visible={visible}
        transparent
        animationType='fade'
        onRequestClose={() => {setVisible(false); setControler(false)}}
        >
        <View style={styles.modalContainer}>
          <View style={{width: '95%', alignItems:'center', backgroundColor: 'white', paddingVertical: 15, borderRadius: 10}}>
            {loading2?
            <ActivityIndicator size="large" color="#00ff00" /> :
            data2?.data[0]? (
              data2.data?.map((obj, index)=> (
              <TouchableOpacity key={index} onPress={() => save(obj.id,obj.fotovehiculo,obj.modelocar,obj.placa)}>
                <CarCard
                key={index}
                brand={obj.marca}
                model= {obj.modelocar}
                color={obj.color}
                capacity= {obj.capacidadmax}
                plate= {obj.placa}
                // imageUrl="https://th.bing.com/th/id/OIP.rStTi56qv85qFlP-5LAZaAHaEK?r=0&rs=1&pid=ImgDetMain"
                imageUrl= {obj.fotovehiculo}
                />
              </TouchableOpacity>
            )) ):
            controler ? 
            <AddCar setControler={setRefresh} refresh={setRefresh}/>:
            <View>
              <Text style={{fontSize: 18, marginBottom: 10}}>Usted no tiene vehiculos registrados.</Text>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', padding: 5, borderWidth: .3, borderRadius: 5, backgroundColor: '#58c05bff'}} onPress={() => setControler(!controler)} >
                <Text style={{fontSize: 15}}>Registra vehiculo</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        </View>
      </Modal>
      <LoadingOverlay visible={loading || wait}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  subContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '1%',
    padding: 5
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    width: '95%',
    padding: 10,
    backgroundColor: '#6f6'
  },
  text: {
    textAlign: 'left',
    width: '95%'
  },
  zonaText: {
    width: '100%',
    textAlign: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: '#58c05bff',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }

  
})