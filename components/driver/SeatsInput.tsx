import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Platform,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Props {
    x?: number;
    save?: (x: any) => void
}

export default function SeatInput ({x, save}: Props) {
const [seats, setSeats] = useState(0);

const updateSeats = (delta: number) => {
    setSeats((prev) => Math.min(x || Infinity, Math.max(0, prev + delta)));
    if (save){
        save((prev) => Math.min(x || Infinity, Math.max(0, prev + delta)));
    }
};

return (
    <View style={styles.container}>
    <Text style={styles.label}>Asientos disponibles</Text>
    <View style={styles.buttonsRow}>
        <TouchableOpacity
        style={[styles.button, { backgroundColor: '#fab1a0' }]}
        onPress={() => updateSeats(-1)}
        >
        <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.seatBox}>
        <MaterialIcons name="event-seat" size={35} color="#0984e3" />
        <Text style={styles.seatNumber}>{seats}</Text>
        </View>
        
        <TouchableOpacity
        style={[styles.button, { backgroundColor: '#81ecec' }]}
        onPress={() => updateSeats(1)}
        >
        <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    </View>
    </View>
);
};


const styles = StyleSheet.create({
container: {
    alignItems: 'center',
    paddingVertical: 8,
},
label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#636e72',
    marginBottom: 8,
},
seatBox: {
    backgroundColor: '#dfe6e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 120,
    marginHorizontal: 8,
    shadowColor: '#95afc0',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
},
seatNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0984e3',
    marginLeft: 8,
},
buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'web' ? 12 : 8,
},
button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#b2bec3',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
},
buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3436',
},
});