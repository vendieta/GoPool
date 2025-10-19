import { View , Text , StyleSheet} from 'react-native';
import UserCard from '@/components/TEST/UserCard';

const aboutUs = () => {
    
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Esta aplicación ha sido diseñada para 
                facilitar el transporte de los usuarios, ofreciendo medidas 
                que priorizan su seguridad. Con una interfaz intuitiva y funcionalidades 
                avanzadas, buscamos hacer más eficientes y seguros los desplazamientos diarios.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text : {
        margin: 'auto',
        fontSize: 20,
        color: 'white',
        padding: 15,
    },
})

export default aboutUs;