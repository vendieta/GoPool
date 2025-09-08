import { View, Text, Touchable, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


interface Prop {
    visible : boolean;
    option : string [];
    select : string | undefined;
    setSelect : (x : string) => void;
    control: (x : boolean) => void;
}

export default function Box ({ visible , option, select, setSelect, control } : Prop) {

    return(
        <View style={styles.filter}>
            <TouchableOpacity style={styles.button} onPress={() => control(!visible)}>
                <Text style={{fontSize: 16}}>{select ? select : 'zona'}</Text>
                <MaterialIcons name="arrow-drop-down" size={20} color="black" />
            </TouchableOpacity>
            {visible ? 
                <View style={{alignItems: 'center'}}>
                    <View style={styles.bandeja}>
                        {option.map((text, index) => (
                            <TouchableOpacity key={index} style={styles.buttonConteiner} onPress={() => {setSelect(text); control(!visible)}}>
                                <Text style={styles.textBandeja}>{text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            : null}
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    button: {
        borderWidth: .5,
        borderRadius: 10,
        padding: 5,
        borderColor: 'green',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    bandeja: {
        position: 'absolute',
        zIndex: 999,
        backgroundColor: 'white',
        borderWidth: 0.4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        gap: 10,
        minWidth: 120
    },
    textBandeja: {
        fontSize: 16,
        marginVertical: 3
    },
    buttonConteiner: {
        borderBottomWidth: 0.3
    }
})