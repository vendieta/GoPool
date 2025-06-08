import GalleryFt from "@/components/imgs/GalleryFt";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import CarCard from "@/components/driver/RenderItems";

interface req {
    data: obj []
}

interface obj {
    id: string,
    placa: string,
    capacidadmax: number,
    fotovehiculo: string,
    modelocar: string,
    color: string
}

export default function Vehiculo () {
    const [ controler, setControler ] = useState(false);
    const [ ftMatricula, setFtMatricula ] = useState<string | undefined |  null>();
    const { data, loading, error, post } = useApi();
    const { data: data2, loading: loading2, error: error2, get } = useApi<req>();
    const [ marca, setMarca ] = useState<string>();
    const [ placa, setPlaca ] = useState<string>();
    const [ capMax, setCapMax ] = useState<string>();
    const [ modeloCar, setModeloCar] = useState<string>();
    const [ color, setColor] = useState<string>();
    const {
        storedValue: userId,
        setItem: setId,
    } = useStorage('userId');
    // se va a guardar los vehiculos obtenidos del back en una cadena de string y se va acomparar con los nuevos datos obtenidos
    const {
        storedValue: cars,
        setItem: setCars,
    } = useStorage('cars');

    useEffect(() => {
        if (userId) {
            console.log(`/api/vehiculo/listar/${userId}`)
            get(`/api/vehiculo/listar/${userId}`)
            console.log('el get de la lista vehiculo',data2)
        }
    }, [userId])
    

    // console.log(`fuera/api/vehiculo/listar/`, data2)
    const add = () => {
        console.log('add car        ',userId)
        console.log(data,error)
        post('/api/vehiculo/crear', {
            id_driver: userId,
            placa: placa,
            capacidadmax: capMax,
            fotovehiculo: ftMatricula,
            modelocar: modeloCar,
            color: color,
            // marca: kia
        });
    }
    return(
        <View style={styles.container}>
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
                            setImage={(x: string | null | undefined) => setFtMatricula(x)}
                            image={ftMatricula}
                            styleT={styles.inputFt}
                        />
                    </View>
                    
                </View>
                
                <TouchableOpacity onPress={add} style={styles.agg}><Text>Agregar</Text></TouchableOpacity>
            </View>
            :
            <>
                <Text style={{fontSize: 20}}>Carros registrados</Text>
                <View>
                    {data2? (
                        data2.data?.map((obj, index)=> (
                        <CarCard
                        key={index}
                        brand={obj.id}
                        model= {obj.modelocar}
                        color={obj.color}
                        capacity= {obj.capacidadmax}
                        plate= {obj.placa}
                        imageUrl="https://th.bing.com/th/id/OIP.rStTi56qv85qFlP-5LAZaAHaEK?r=0&rs=1&pid=ImgDetMain"
                        />
                    )) ): null}
                </View>
                <TouchableOpacity onPress={() => setControler(true)} style={styles.addCar}>
                    <Text style={{fontSize: 30}}>+</Text>
                </TouchableOpacity>
            </>
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        minHeight: '70%',
        width: '90%',
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
    }
})