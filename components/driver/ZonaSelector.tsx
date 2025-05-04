import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const opciones = ['Norte', 'Sur', 'Este', 'Oeste', 'Espol'];

const Desplegable = () => {
const [mostrarOpciones, setMostrarOpciones] = useState(false);
const [seleccionado, setSeleccionado] = useState< null| string >(null);

const alternarDesplegar = () => setMostrarOpciones(prev => !prev);

const seleccionarOpcion = (opcion: string) => {
    setSeleccionado(opcion);
    setMostrarOpciones(false); // Cierra el desplegable al seleccionar
};

return (
    <View>
        <TouchableOpacity
            onPress={alternarDesplegar}
            style={{
            backgroundColor: '#3498db',
            padding: 15,
            borderRadius: 10,
            }}
        >
            <Text style={{ color: 'white', textAlign: 'center' }}>
            {seleccionado ? `Dirección: ${seleccionado}` : 'Selecciona una dirección'}
            </Text>
        </TouchableOpacity>

        {mostrarOpciones && (
            <View
            style={{
                backgroundColor: '#ecf0f1',
                borderRadius: 10,
                padding: 10,
            }}
            >
            {opciones.map((opcion, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => seleccionarOpcion(opcion)}
                style={{
                    paddingVertical: 10,
                    borderBottomWidth: index < opciones.length - 1 ? 1 : 0,
                    borderColor: '#bdc3c7',
                }}
                >
                <Text style={{ textAlign: 'center' }}>{opcion}</Text>
                </TouchableOpacity>
            ))}
            </View>
        )}
    </View>
);
};

export default Desplegable;
