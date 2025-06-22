import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Platform,
} from 'react-native';

const BUTTON_VALUES = [-1, -.5, -.25, .25, .5, 1];


interface Props {
    save: (x: any) => void
}

export default function PriceInput ({save}: Props)  {
const [price, setPrice] = useState(0);

const updatePrice = (delta: number) => {
    setPrice((prev) => {
    const newPrice = Math.max(0, parseFloat((prev + delta).toFixed(2)));
    return newPrice;
    });
    save((prev) => {
    const newPrice2 = Math.max(0, parseFloat((prev + delta).toFixed(2)));
    console.log(newPrice2)
    return newPrice2;
    });
};

return (
    <View style={styles.container}>
    <Text style={styles.label}>Precio del servicio</Text>
    <View style={styles.priceBox}>
        <Text style={styles.priceText}>${price.toFixed(2)}</Text>
    </View>
    <View style={styles.buttonsRow}>
        {BUTTON_VALUES.map((val, index) => (
        <TouchableOpacity
            key={index}
            onPress={() => updatePrice(val)}
            style={[
            styles.button,
            { backgroundColor: val > 0 ? '#81ecec' : '#fab1a0' },
            ]}
        >
            <Text style={styles.buttonText}>
            {val > 0 ? '+' : ''}
            {val}
            </Text>
        </TouchableOpacity>
        ))}
    </View>
    </View>
);
};


const styles = StyleSheet.create({
container: {
    alignItems: 'center',
    paddingVertical: 5,
},
label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#636e72',
    marginBottom: 10,
},
priceBox: {
    backgroundColor: '#dff9fb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#95afc0',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
},
priceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00b894',
},
buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    // gap: Platform.OS === 'web' ? 12 : 2,
},
button: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginVertical: 3,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#b2bec3',
    shadowOpacity: 0.2,
    width: '13.5%',
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
},
buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3436',
},
});
