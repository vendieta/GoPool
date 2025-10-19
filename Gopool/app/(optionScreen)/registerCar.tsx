import GalleryFt from "@/components/imgs/GalleryFt";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";


interface response {
    message: string
}

export default function RegisterCar() {
    const router = useRouter();
    const [ placa, setPlaca ] = useState<string>();
    const [ modeloCar, setModeloCar ] = useState<string>();
    const [ colorCar, setColorCar ] = useState<string>();
    const [ capacidadMax, setCapacidadMax ] = useState<string>();
    const [ ftCar, setFtCar ] = useState<string | null | undefined>();
    const { data, loading, error, post } = useApi<response>();
    const {
        storedValue: access_token,
        setItem: setAccess_token,
    } = useStorage('access_token');
    

    console.log('pantalla del registro de carro 🤖')
    const {
        storedValue: userId,
        setItem: setId,
    } = useStorage('userId');
    const {
        storedValue: userEmail,
        setItem: setUserEmail,
    } = useStorage('userEmail');
    console.log('este es el user id: ', userId, userEmail)
    

    const send = () => {
        if (!placa || !modeloCar || !colorCar || !ftCar || !capacidadMax) {
        return Alert.alert("Error", "Por favor complete todos los campos.");
        }
        post('/api/vehiculo/crear', {
            id_driver: userId?.trim(),
            placa: placa.trim(),
            capacidadmax: capacidadMax.trim(),
            fotovehiculo: 'https://hola',
            modelocar: modeloCar.trim(),
            color: colorCar.trim()
        },{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      })
        console.log(data)
    }

    useEffect(() => {
    if (data && data.message === "Vehículo agregado correctamente") {
        router.back();
    }
    }, [data])
    return(
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="PLACA"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={placa}
                    onChangeText={setPlaca}
                    />
                <TextInput
                    style={styles.input}
                    placeholder="MODELO DEL CARRO"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={modeloCar}
                    onChangeText={setModeloCar}
                    />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput
                        style={styles.inputTwo}
                        placeholder="COLOR DEL CARRO"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={colorCar}
                        onChangeText={setColorCar}
                        />
                    <TextInput
                        style={styles.inputCap}
                        placeholder="CAPACIDAD"
                        placeholderTextColor="#999"
                        keyboardType= 'phone-pad'
                        autoCapitalize="none"
                        value={capacidadMax}
                        onChangeText={setCapacidadMax}
                        />
                </View>
                <GalleryFt
                    text='Foto de licencia'
                    setImage={(x: string | null | undefined) => setFtCar(x)}
                    image={ftCar}
                    styleT={styles.inputFtMatricula}
                    />
            </View>
            <TouchableOpacity style={styles.button} onPress={send}>
                <Text style={{color: 'white'}}>Registrar</Text>
            </TouchableOpacity>
            <LoadingOverlay visible={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainer: {
        flexDirection: 'column',
        gap: 10,
        width: '90%'
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        color: '#333',
        fontSize: 16,
        maxWidth: 777,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
    },
    inputTwo: {
        width: '56%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        color: '#333',
        fontSize: 16,
        maxWidth: 777,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
    },
    inputCap: {
        width: '39%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        color: '#333',
        fontSize: 16,
        maxWidth: 777,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
    },
    
    inputFtMatricula: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        color: '#333',
        fontSize: 15,
        maxWidth: 777,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'orange',
        borderRadius: 30,
    }
})