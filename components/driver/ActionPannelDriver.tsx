import { useState } from "react";
import { View , StyleSheet , Text, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 

interface Coordinate {
    latitude : number;
    longitude : number;
};


interface Props {
    region : Coordinate;
    confCoordinate: (data: "startPoint" | "endPoint" | "point1" | "point2" | "point3") => void;
    Markers: locationPoint[];
    delete: (data: "point1" | "point2" | "point3") => void;
}

interface locationPoint {
    id : string,
    coordinate : Coordinate,
    isStart? : boolean,
    isDestination? : boolean
}



export default function ActionPannelDriver (data : Props){
    const router = useRouter();
    const [ controler , setControler ] = useState('startPoint')
    const [components, setComponents] = useState<number[]>([]);
    console.log(controler)
    // estas constantes van a alvergar las coordenadas
    const [ startPoint , setStartPoint ] = useState<string>('     ')
    const [ endPoint , setEndPoint ] = useState<string>('     ')
    const [ points , setPoints ] = useState<locationPoint[]>([])

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
    
    const point = (x : "point1" | "point2" | "point3") => {
        data.confCoordinate(x)
        setControler('menu')
        console.log('puntos: ',points)
    }

    const send = () => {
        router.push("/send");
    } 

    const plus = () => {
        if (components.length < 3) {
            setComponents(prev => [...prev, prev.length + 2]);
            console.log(components)
        } else {
            console.log('Ya llegaste al máximo de 3 componentes');
            console.log(components)
        }
        console.log('plus')
    }

    const deleteMarkers = (x: "point1" | "point2" | "point3") => {
        data.delete(x)
        console.log(x)
        if (components.length > 0) {
            components.pop();
            console.log(components);
        }
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
                    {components.map((comp, index) => (
                        <View key={index}>
                            <Text style={styles.textUbi}>Tu ubicacion</Text>
                            <View style={{flexDirection: 'row', gap: 13}}>
                                <Pressable style={{width: '100%'}} onPress={() => setControler(`point${comp-1}`)}>
                                    <Text style={styles.ubi}>{data.Markers.find((p) => p.id === `point${comp-1}`)?.coordinate?.longitude ?? " "} </Text>
                                </Pressable>
                                <TouchableOpacity onPress={() => deleteMarkers(`point${comp-1}` as "point1" | "point2" | "point3")} style={{justifyContent: 'center', paddingHorizontal: 12, borderRadius: 50, backgroundColor: 'red'}} >
                                    <Text style={{fontSize: 17, }}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.textUbi}>Tu destino</Text>
                    <Pressable onPress={() => setControler('endPoint')}>
                        <Text style = { styles.ubi} >{endPoint}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.subContainerPlus}>
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={send}>
                    <Text style = { styles.aceptar } >Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={plus}>
                    <Text style={styles.plus}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

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
        </> : controler === "point1" || controler === "point2" || controler === "point3" ?
        <>
            <Text style = {styles.text}>Punto de destino</Text>
            <Text style = {styles.ubi}>{data.region.longitude}</Text>
            {/* aqui va el input del lugar de partida y envia los datos a la api con el algoritmo 
                aqui podriamos usar la api de google la cual me da el nombre de la ubicacion por las coodenadas*/}
            {/* <Text style = { styles.text } >Punto de destino</Text>
            <Text style = {styles.ubi}>{data.pointEnd}</Text> */}
        
            {/* aqui va el inpunt del lugar de destino y envia los dato a la api con el algoritmo
                aqui tambien hacemos lo mismo de arriba*/}
        
            <Pressable onPress={() => point(controler)}>
                <Text style = {styles.button} >Confirmar</Text>
            </Pressable>
        </> :
        <></>
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
        justifyContent: 'flex-end',
        backgroundColor: 'red',
        width: '70%',
        flexDirection: 'row',
        gap: '30%',
        marginTop: 20,
    },
    plus: {
        fontSize: 25,
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    textUbi: {
        fontSize: 16,
        paddingLeft: 10
    }

}
);
