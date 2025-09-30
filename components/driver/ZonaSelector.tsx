import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const opciones = ['Norte', 'Sur', 'Este', 'Oeste', 'Espol'];

interface Props {
  backColor: string;
  save: (x: string) => void;
  initialValue?: string; // 👈 nuevo prop opcional
}

export default function Desplegable({ backColor, save, initialValue }: Props) {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [seleccionado, setSeleccionado] = useState<string | null>();

  useEffect(() => {
    if (initialValue) {
        setSeleccionado(initialValue);
    }
  }, [initialValue])

  const alternarDesplegar = () => setMostrarOpciones(prev => !prev);

  const seleccionarOpcion = (opcion: string) => {
    setSeleccionado(opcion);
    save(opcion);
    console.log(opcion);
    setMostrarOpciones(false); // Cierra el desplegable al seleccionar
  };
  return (
    <View>
      <TouchableOpacity
        onPress={alternarDesplegar}
        style={{
          backgroundColor: backColor,
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: '600', color: '#2d3436', textAlign: 'center' }}>
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
}
