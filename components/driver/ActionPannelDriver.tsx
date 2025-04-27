import { useState } from "react";
import { View , StyleSheet , Text, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 

interface Coordinate {
    latitude : number;
    longitude : number;
};


interface Props {
region : Coordinate
confCoordinate: (data: "startPoint" | "endPoint" | "menu") => void;
}


export default function ActionPannelDriver (data : Props){
const router = useRouter();
const [ controler , setControler ] = useState('startPoint')

// estas constantes van a alvergar las coordenadas
const [ startPoint , setStartPoint ] = useState<string>('     ')
const [ endPoint , setEndPoint ] = useState<string>('     ')

const pointStart = (x : Coordinate) => {
    data.confCoordinate('startPoint')
    setControler('menu')
    setStartPoint(data.region.longitude.toString())
}

const pointEnd = (x : Coordinate) => {
    data.confCoordinate('endPoint')
    setControler('menu')
    setEndPoint(data.region.longitude.toString())
}

const send = () => {
    router.push("/send");
} 

const plus = (x : Coordinate) => {
    
}



return (
    <View style = {styles.container}>
    {controler === 'startPoint' ? 
        <>
            <Text style = {styles.text}>Punto de origen</Text>
            <Text style = {styles.ubi}>{data.region.longitude}</Text>
            {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
                aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
            {/* <Text style = { styles.text } >Punto de destino</Text>
            <Text style = {styles.ubi}>{data.pointEnd}</Text> */}
        
            {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
                aqui tambien hacemos lo mismo de arriba*/}
        
            <Pressable onPress={() => pointStart(data.region)}>
                <Text style = {styles.button} >Confirmar</Text>
            </Pressable>
            {/* Aqui debe estar el boton para enviar los datos a la api */}
        </> : controler === 'menu' ? 
        <>
            <View style={styles.containerMenu}>
                <View style={styles.subContainerUbi}>
                    <Text style={styles.textUbi}>Tu ubicacion</Text>
                    <Pressable onPress={() => setControler('startPoint')}>
                        <Text style = { styles.ubi} >{startPoint}</Text>
                    </Pressable>
                    <Text style={styles.textUbi}>Tu destino</Text>
                    <Pressable onPress={() => setControler('endPoint')}>
                        <Text style = { styles.ubi} >{endPoint}</Text>
                    </Pressable>
                </View>
                <View style={styles.subContainerPlus}>
                    <TouchableOpacity onPress={() => plus}>
                        <Text style={styles.plus}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={send}>
                <Text style = { styles.aceptar } >Aceptar</Text>
            </TouchableOpacity>

        </> : controler === 'endPoint' ?
        <>
            <Text style = {styles.text}>Punto de destino</Text>
            <Text style = {styles.ubi}>{data.region.longitude}</Text>
            {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
                aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
            {/* <Text style = { styles.text } >Punto de destino</Text>
            <Text style = {styles.ubi}>{data.pointEnd}</Text> */}
        
            {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
                aqui tambien hacemos lo mismo de arriba*/}
        
            <Pressable onPress={() => pointEnd(data.region)}>
                <Text style = {styles.button} >Confirmar</Text>
            </Pressable>
        </> : 
        <>

        </>
        }
    </View>
);

};

const styles = StyleSheet.create(
{
    container : {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 25,
    position : 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
    bottom: 0,
    alignItems: 'center'
    },
    text : {
    margin: 10,
    textAlign: 'center'
    },
    ubi : {
    width: '100%',
    backgroundColor: "rgba(169, 169, 169, 0.8)",
    padding: 2,
    margin: 2,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 5
    },
    button: {
    margin: 10,
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'yellow'
    },
    aceptar : {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 100,
    marginTop: 15
    },
    containerMenu: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 10
    },
    subContainerUbi: {
        width: '85%'
    },
    subContainerPlus: {
        height: '100%',
        justifyContent: 'center'
    },
    plus: {
        fontSize: 25,
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        borderRadius: 20,
        marginLeft: 10 
    },
    textUbi: {
        fontSize: 16,
        paddingLeft: 10
    }

}
);
