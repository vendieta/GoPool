import PriceInput from "@/components/driver/PriceInput";
import RoutePointsInput from "@/components/driver/RoutePointsInput";
import SeatsInput from "@/components/driver/SeatsInput";
import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import { View , Text, TextInput , StyleSheet, ScrollView, Alert , Image, Button , Dimensions , useColorScheme, Platform, TouchableOpacity, Modal, ActivityIndicator  } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import CarCard from "@/components/driver/RenderItems";
import AddCar from "@/components/driver/AddCar";

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

export default function CreateRoutesDriver() {
  const router = useRouter();
  const [ horaSalida, setHoraSalida ] = useState<Date>();
  const [ horaLlegada, setHoraLlegada ] = useState<Date>();
  const [ zonaInicial, setZonaInicial ] = useState<string>();
  const [ zonaFinal, setZonaFinal ] = useState<string>();
  const [ precio, setPrecio ] = useState<number>(0);
  const [ asientos, setAcientos ] = useState<number>(0);
  const [ rutas, setRutas ] = useState<FormattedPoint[]>();
  const { data, loading, error, post } = useApi<DataViaje>();
  const { data: data2, loading: loading2, error: error2, get } = useApi<req>();
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ idCar, setIdCar ] = useState<string>();
  const [ imgCar, setImgCar ] = useState<string>();
  const [ model, setModel ] = useState<string>();
  const [ placa, setPlaca ] = useState<string>();
  const [ controler, setControler ] = useState<boolean>()
  const [ refresh , setRefresh ] = useState(true)

  const {
    storedValue: userId,
    setItem: setId,
    removeItem: removeId
  } = useStorage('userId');

  console.log('zonaInicial: ',zonaInicial,'zonaFinal:', zonaFinal,'precio:', precio,'asientos:', asientos,'horaEntrada',horaLlegada,'horaSalida',horaSalida,'listadepuntos:', rutas)

  useEffect(() => {
    if(userId) {
      get(`/api/vehiculo/listar/${userId}`)
      console.log('el get de la lista vehiculo',data2)
    }
  }, [refresh])

  const dataCar = () => {
    setVisible(true)
    console.log(`/api/vehiculo/listar/${userId}`)
    if (!data2) {
      get(`/api/vehiculo/listar/${userId}`)
    }
    console.log('el get de la lista vehiculo',data2)
  }
  
  const send = () => {
    // logica para publicar ruta
    if (!zonaInicial || !zonaFinal || !precio || !asientos || !horaSalida || !horaLlegada || !rutas) {
      Alert.alert(
        "error",
        "porfavor complete todos los campos.",
        [{ text: "Entendido" }]
      )
      return;
    }
    post('/api/viajes/crear', {
      id_driver: userId,
      zonaInicial: zonaInicial,
      zonaFinal: zonaFinal,
      precio: precio,
      asientos: asientos,
      horaSalida: horaSalida,
      horaLlegada: horaLlegada,
      Listapuntos: rutas
    })
    router.push("/send");
  };

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
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
              <TimeInput
              save={setHoraSalida}
              backColor="#fab1a0"
              SalEnt="Salida"/>
              <TimeInput
              save={setHoraLlegada}
              backColor="#81ecec"
              SalEnt="Llegada"/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>De que zona partes?</Text>
                <Desplegable 
                save={setZonaInicial}
                backColor= '#fab1a0'/>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.zonaText}>A que zona vas?</Text>
                <Desplegable 
                save={setZonaFinal}
                backColor= '#81ecec'/>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <PriceInput
              save={setPrecio}
              />
            </View>
            <View style={{width: '100%'}}>
              <SeatsInput save={setAcientos}/>
            </View>
            <View style={{width: '100%'}}>
              <RoutePointsInput save={setRutas}/>
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
            <TouchableOpacity style={styles.button} onPress={send}>
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
            <AddCar setControler={setRefresh}/>:
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