import React, { useEffect, useState } from 'react';
import {
View,
Text,
StyleSheet,
TextInput,
TouchableOpacity,
ScrollView,
Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormattedPoint {
    orden: string | number;
    descripcion: string;
}

interface Props {
    save: (x: FormattedPoint[]) => void;
}

interface RouteData {
inicio: string;
final: string;
[key: string]: string;
}

export default function RoutePointsInput ({save}: Props) {
const [routeData, setRouteData] = useState<RouteData>({
    inicio: '',
    '2': '',
    final: '',
});

const getSortedPointKeys = () =>
    Object.keys(routeData)
    .filter((k) => !isNaN(Number(k)))
    .map(Number)
    .sort((a, b) => a - b)
    .map(String);

const addPoint = () => {
    const numericKeys = getSortedPointKeys();
    const nextIndex = numericKeys.length > 0 ? Math.max(...numericKeys.map(Number)) + 1 : 2;

    if (Object.keys(routeData).length >= 20) return;

    const newRoute: RouteData = {};
    for (const key of Object.keys(routeData)) {
    if (key === 'final') {
        newRoute[nextIndex.toString()] = '';
    }
    newRoute[key] = routeData[key];
    }

    setRouteData(newRoute);
};

const removePoint = (keyToRemove: string) => {
    const numericKeys = getSortedPointKeys();
    const newRoute: RouteData = {
    inicio: routeData.inicio,
    final: routeData.final,
    };

    let index = 2;
    for (const key of numericKeys) {
    if (key === keyToRemove) continue;
    newRoute[index.toString()] = routeData[key];
    index++;
    }

    setRouteData(newRoute);
};

const updatePoint = (key: string, value: string) => {
    setRouteData({ ...routeData, [key]: value });
    console.log('aaaaaaaaa',{ ...routeData, [key]: value })
};

const renderInputs = () => {
    const numericKeys = getSortedPointKeys();

    const orderedKeys = ['inicio', ...numericKeys, 'final'];
    // save(routeData)
    // console.log('eeeeeeeee', routeData)
    useEffect(() => {
        const formattedRoute = Object.entries(routeData).map(([key, value]) => {
            const orden = key === 'inicio' ? 'inicio' : key === 'final' ? 'fin' : Number(key);
            return { orden, descripcion: value };
        });

        save(formattedRoute);
        console.log('eeeeeeeee', formattedRoute);
    }, [routeData]);

    return orderedKeys.map((key) => {
    const label =
        key === 'inicio'
        ? 'Punto de inicio'
        : key === 'final'
        ? 'Punto final'
        : `Punto ${key}`;

    return (
        <View key={key} style={styles.inputRow}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={routeData[key]}
            onChangeText={(text) => updatePoint(key, text)}
            placeholder="Escribe aquí..."
            placeholderTextColor="#b2bec3"
        />
        {key !== 'inicio' && key !== 'final' && (
            <TouchableOpacity onPress={() => removePoint(key)}>
            <Ionicons name="close-circle-outline" size={24} color="#d63031" />
            </TouchableOpacity>
        )}
        </View>
    );
    });
};

return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Ruta del Servicio</Text>
    {renderInputs()}

    {Object.keys(routeData).length < 20 && (
        <TouchableOpacity style={styles.addButton} onPress={addPoint}>
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
            <Text style={styles.addButtonText}>Agregar punto</Text>
        </TouchableOpacity>
    )}
    </ScrollView>
);
};


const styles = StyleSheet.create({
container: {
    padding: 16,
    alignItems: 'stretch',
},
title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 12,
    textAlign: 'center',
},
inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#b2bec3',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
},
label: {
    flex: 1,
    fontSize: 14,
    color: '#636e72',
},
input: {
    flex: 2,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    color: '#2d3436',
    marginHorizontal: 10,
    ...Platform.select({
    web: {
        outlineStyle: 'none',
    },
    }),
},
addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 6,
},
addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
},
});
