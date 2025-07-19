import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function userRoute(){
    
    return(
        // <SafeAreaView style={{flex: 1}}>
            <View style={styles.cotainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.text}>Viajes </Text>
                </View>
            </View>
        // </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        width: '96%',
        backgroundColor: 'gray',
        borderRadius: 8,
        padding: 10,
    },
    text: {
        textAlign: 'center',
    }

})