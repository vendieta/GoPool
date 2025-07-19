import GalleryFt from "@/components/imgs/GalleryFt";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import CarCard from "@/components/driver/RenderItems";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import * as FileSystem from 'expo-file-system';

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


interface img {
    img: string| null| undefined,
    uri: string,
    name: string | undefined | null ,
    type?: string
}

interface url {
    success: string,
	uploadUrl: string,
	publicUrl: string
}

export default function Vehiculo () {
    const [ controler, setControler ] = useState(false);
    const [ modal, setModal ] = useState(false)
    const [ ftMatricula, setFtMatricula ] = useState<img>();
    const { data, loading, error, post } = useApi();
    const { loading: loadingS3, error: errorS3, put } = useApi();
    const { data: data2, loading: loading2, error: error2, get } = useApi<req>();
    const { data: dataUrl, loading: loadingUrl, error: errorUrl, post : postUrl } = useApi<url>();
    const [ marca, setMarca ] = useState<string>();
    const [ placa, setPlaca ] = useState<string>();
    const [ capMax, setCapMax ] = useState<string>();
    const [ modeloCar, setModeloCar] = useState<string>();
    const [ color, setColor] = useState<string>();
    const {
        storedValue: userId,
        setItem: setId,
    } = useStorage('userId');
    useEffect(() => {
        if (userId) {
            console.log(`/api/vehiculo/listar/${userId}`)
            get(`/api/vehiculo/listar/${userId}`)
            console.log('el get de la lista vehiculo',data2)
        }
    }, [userId, data])

    console.log(ftMatricula?.uri)
    const add = async () => {

        console.log('add car        ',userId)
        if (!userId || !placa || !capMax || !ftMatricula || !modeloCar || !color || !marca || !ftMatricula.uri) {
            Alert.alert("Error", "Por favor complete todos los campos.");
        return;
        }

        console.log(data,error);

        await postUrl('/api/s3/upload-url', {
            fileName: `${userId}-${ftMatricula?.name}`,
            fileType: ftMatricula?.type
        })
        console.log('rulaaaaaaaaaaaaaaaaaaaaaa',dataUrl)
        setModal(true)
    }


    const ok = async () => {
        if (!dataUrl?.publicUrl || !dataUrl.uploadUrl ) {
        console.log('error en pedir urls: ', errorUrl);
        Alert.alert("Error", "No se pudo obtener la URL de carga.");
        return;
        }

        console.log( 'fileName: ',`${userId}-${ftMatricula?.name}`,'fileType:', ftMatricula?.type)
        console.log('error en pedir urls: ',errorUrl)
        console.log('error en pedir urls: ',dataUrl)
        console.log('urls: ', dataUrl)
        const fileUri = ftMatricula?.uri
        const response = await fetch(fileUri);
        const blob = await response.blob(); // 👈 convertimos a blob binario
        await fetch(`${dataUrl?.uploadUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg', // o el tipo correcto según tu archivo
            },
            body: blob, // 👈 se manda el binario directamente
            });

        await post('/api/vehiculo/crear', {
            id_driver: userId,
            placa: placa,
            capacidadmax: capMax,
            fotovehiculo: dataUrl?.publicUrl,
            modelocar: modeloCar,
            color: color,
            marca: marca
        });
        setControler(!controler)
        console.log('url: ', data)
        setModal(false);
        // borrar los datos una ves se suba los datos
        // setPlaca('')
        // setCapMax('')
    }    
    
    return(
        <View style={styles.container}>
            {!loading2?
            <View style={styles.subContainer}>
            {controler ? 
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Agrega un nuevo Vehiculo</Text>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: '40%'}}>
                        <Text style={styles.subTitle}>Marca del carro</Text>
                        <TextInput
                            value={marca}
                            onChangeText={setMarca}
                            placeholder="marca"
                            style={styles.input}
                            />
                    </View>
                    <View style={{width: '40%'}}>
                        <Text style={styles.subTitle}>Modelo</Text>
                        <TextInput
                            value={modeloCar}
                            onChangeText={setModeloCar}
                            placeholder="model"
                            style={styles.input}
                            />
                    </View>
                </View>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: '40%'}}>
                        <Text style={styles.subTitle}>Color</Text>
                        <TextInput
                            value={color}
                            onChangeText={setColor}
                            placeholder="color"
                            style={styles.input}
                            />
                    </View>
                    <View style={{width: '40%'}}>
                        <Text style={styles.subTitle}>Capacidad max</Text>
                        <TextInput
                            value={capMax}
                            onChangeText={setCapMax}
                            placeholder="0"
                            keyboardType= 'phone-pad'
                            style={styles.input}
                            />
                    </View>
                </View>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: '40%'}}>
                        <Text style={styles.subTitle}>Placa</Text>
                        <TextInput
                            value={placa}
                            onChangeText={setPlaca}
                            placeholder="xyz-1234"
                            style={styles.input}
                            autoCapitalize= 'none'
                            />
                    </View>
                    
                    <View style={{width: '40%'}}>
                        <Text style={styles.subTitle}>Foto del vehiculo</Text>
                        <GalleryFt
                            text='Foto del vehiculo'
                            setImage={(x: img) => setFtMatricula(x)}
                            image={ftMatricula}
                            styleT={styles.inputFt}
                        />
                    </View>
                    
                </View>
                
                <TouchableOpacity onPress={add} style={styles.agg}><Text>Agregar</Text></TouchableOpacity>
            </View>
            :
            <>
                <Text style={{fontSize: 20, marginTop: 10}}>Carros registrados</Text>
                <View style={{marginTop: 20, width: '95%', alignItems: 'center'}}>
                    {data2? (
                        data2.data?.map((obj, index)=> (
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
                    )) ): null}
                </View>
                {(data2?.data?.length?? 0 ) < 3  ?
                    <TouchableOpacity onPress={() => setControler(true)} style={styles.addCar}>
                        <Text style={{fontSize: 30}}>+</Text>
                    </TouchableOpacity> 
                    :
                    null
                }
            </>
            }
            </View>: null}
            <LoadingOverlay visible={loading2 || loading || loadingUrl}/>
            <Modal
                transparent
                animationType="fade"
                visible={modal}
                onRequestClose={ () => setModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModal(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <Text style={[styles.title, {marginBottom: 10}]}>¿Estás seguro que los datos del vehiculo son correctos?</Text>

                        <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => setModal(false)} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ok} style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Aceptar</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        minHeight: '70%',
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 10
    },
    addCar: {
        backgroundColor: 'rgba(167, 167, 167, 0.53)',
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        paddingVertical: 8
    },
    subTitle: {
        width: '100%',
        textAlign: 'center',
        marginTop: 15
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        fontSize: 16,
        color: '#000',
        padding: 10
    },
    inputContainer: {
        padding: 5,
        width: '90%',
        alignItems: 'center'
    },
    inputFt: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        color: '#000',
        height: 40,
        padding: 5,
        justifyContent: 'center'
    },
    agg: {
        padding: 10,
        marginTop: 10,
        backgroundColor: ' rgb(255, 166, 0)',
        borderRadius: 10
    },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  acceptButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
})