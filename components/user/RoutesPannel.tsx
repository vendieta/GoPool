import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface Props {
    routes: string[]
}

export default function RoutesPannel({routes}: Props) {

    return(
        <View style={styles.container}>
                {routes.map((ruta, index) => (
                    <View key={index} style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <Ionicons name="location-sharp" size={12} color="#fff" />
                        <Text style={styles.text}>{ruta}</Text>
                    </View>
                ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white',
        textAlign: 'left',
        paddingVertical:5 
    }
})