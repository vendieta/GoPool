import { TouchableOpacity, View, StyleSheet, Text, TextInput, Alert, TouchableWithoutFeedback, Modal } from "react-native";
import GalleryFt from "../imgs/GalleryFt";
import { useState } from "react";
import useStorage from "@/hooks/useStorage";
import { useApi } from "@/hooks/useApi";


interface img {
    img: string| null| undefined,
    uri: string,
    name: string | undefined | null ,
    type?: string
};

interface url {
    success: string,
	uploadUrl: string,
	publicUrl: string
}

interface Prop {
    setControler: (x: boolean) => void
}

export default function AddCar ({setControler}: Prop) {
    const [ marca, setMarca ] = useState<string>();
    const [ placa, setPlaca ] = useState<string>();
    const [ capMax, setCapMax ] = useState<string>();
    const { data, loading, error, post } = useApi();
    const { data: dataUrl, loading: loadingUrl, error: errorUrl, post : postUrl } = useApi<url>();
    const [ modeloCar, setModeloCar] = useState<string>();
    const [ color, setColor] = useState<string>();
    const [ ftMatricula, setFtMatricula ] = useState<img>();
    const [ modal, setModal ] = useState(false);

    const {
        storedValue: userId,
        setItem: setId,
    } = useStorage('userId');



    const add = async () => {
        console.log('add car        ',userId)
        if (!userId || !placa || !capMax || !ftMatricula || !modeloCar || !color || !marca || !ftMatricula.uri) {
            Alert.alert("Error", "Por favor complete todos los campos.");
        return;
        }
        console.log(data,error);
        await postUrl('/api/s3/upload-url', {
            fileName: `/${userId}${ftMatricula?.name?.slice(ftMatricula?.name?.lastIndexOf('.'))}`,
            fileType: ftMatricula?.type
        })
        console.log('URL 😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️',dataUrl)
        setModal(true)
    }

    const ok = async () => {
        if (!dataUrl?.publicUrl || !dataUrl.uploadUrl ) {
        console.log('error en pedir urls: ', errorUrl);
        Alert.alert("Error", "No se pudo obtener la URL de carga.");
        return;
        }

        console.log( 'fileName: ',`${userId}-${ftMatricula?.name?.slice(ftMatricula?.name?.lastIndexOf('.'))}`,'fileType:', ftMatricula?.type)
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

            console.log('🙏🙏🙏🙏🙏',userId?.trim(),
            placa?.trim(),
            capMax,
            dataUrl?.publicUrl,
            modeloCar?.trim(),
            color?.trim(),
            marca?.trim())
        await post('/api/vehiculo/crear', {
            id_driver: userId?.trim(),
            placa: placa?.trim(),
            capacidadmax: capMax,
            fotovehiculo: dataUrl?.publicUrl,
            modelocar: modeloCar?.trim(),
            color: color?.trim(),
            marca: marca?.trim()
        });
        setControler(false)
        console.log('url: ', data)
        setModal(false);
        // borrar los datos una ves se suba los datos
        // setPlaca('')
        // setCapMax('')
    }


    return(
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
    )
}


const styles = StyleSheet.create({
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