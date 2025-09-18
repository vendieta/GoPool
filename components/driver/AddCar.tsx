import { TouchableOpacity, View, StyleSheet, Text, TextInput, Alert } from "react-native";
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


export default function AddCar () {
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
                fileName: `${userId}-${ftMatricula?.name}`,
                fileType: ftMatricula?.type
            })
            console.log('rulaaaaaaaaaaaaaaaaaaaaaa',dataUrl)
            setModal(true)
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
})