import { View , Text , StyleSheet} from 'react-native';



export default function createCount(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienbenido a GoPool comenzemos tu viaje</Text>
            <Text style={styles.text}>Te ayudare a contactar con otras personas con las que compartes una ruta</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        margin: 'auto',
        padding: 50,
        backgroundColor: 'orange',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    }
    
})