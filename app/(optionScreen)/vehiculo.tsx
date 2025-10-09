import GalleryFt from "@/components/imgs/GalleryFt";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import CarCard from "@/components/driver/RenderItems";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import * as FileSystem from 'expo-file-system';
import AddCar from "@/components/driver/AddCar";

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



export default function Vehiculo () {
    const [ controler, setControler ] = useState(false);
    const { data: data2, loading: loading2, error: error2, get } = useApi<req>();
    const [ refresh , setRefresh ] = useState(true);
    const {
        storedValue: access_token,
        setItem: setAccess_token,
    } = useStorage('access_token'); 


    const {
        storedValue: userId,
        setItem: setId,
    } = useStorage('userId');

    useEffect(() => {
        if (userId) {
            console.log(`token ${access_token}`)
            get(`/api/vehiculo/listar/`, undefined,{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      })
            console.log('el get de la lista vehiculo',data2)
        }
    }, [userId, refresh])


    
    
    return(
        <View style={styles.container}>
            {!loading2?
            <View style={styles.subContainer}>
            {controler ? 
            <AddCar setControler={setControler} refresh={setRefresh}/>
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
            <LoadingOverlay visible={loading2}/>
            
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
 
})