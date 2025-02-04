import { View , Text , StyleSheet , Dimensions} from 'react-native';
import { Link, Route } from 'expo-router';

const {width , height} = Dimensions.get('window')

interface DataProps{
    element:{
        link: Route,
        title: string,
    };
    element1:{
        link:Route,
        title:string,
    };
}


export default function Opcion({element,element1}:DataProps){
    return(
        <View style={styles.container}>
            <Link href={element.link} style={styles.text}>
                <Text>{element.title}</Text>
            </Link>
            <Link href={element1.link} style={styles.text1}>
                <Text>{element1.title}</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0f0f0',
        width: width*0.90,
        marginHorizontal: width*0.05,
        flexDirection: 'column',
        marginVertical: 'auto',
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    text:{
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 50,
        borderBottomWidth: 1, // Grosor del borde
        borderColor: '#696969', // Color del borde
        borderStyle: 'solid', 
    },
    text1:{
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 50,
        borderTopWidth: 1, // Grosor del borde
        borderColor: '#696969', // Color del borde
        borderStyle: 'solid', 
    },

})

