import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function userRoute(){
    const controler = true
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.cotainer}>
                {controler ? 
                <>
                    <Text style={styles.text}>martes</Text>
                    <View style={styles.subContainer}>
                        
                    </View>
                </> :
                <Text style={styles.text}>
                    No hay viajes registrados por ahora.
                </Text>
                }
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:  '#2A2A2C'
    },
    subContainer: {
        width: '96%',
        backgroundColor: '#1C1C1E',
        borderRadius: 8,
        padding: 10,
    },
    text: {
        textAlign: 'center',
        color: 'white'
    },


})