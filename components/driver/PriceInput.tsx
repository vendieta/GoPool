import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

const BUTTON_VALUES = [-1, -0.5, -0.25, 0.25, 0.5, 1];

interface Props {
  save: (x: number) => void;
  initialValue?: number;
}

export default function PriceInput({ save, initialValue }: Props) {
  // Detecta si el sistema está en modo claro u oscuro
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  const [price, setPrice] = useState(
    initialValue !== undefined ? Math.max(0, parseFloat(initialValue.toFixed(2))) : 0
  );

  // 🔹 Notificar cambio al padre
  useEffect(() => {
    save(price);
  }, [price]);

  // 🔹 Actualizar si cambia el valor inicial
  useEffect(() => {
    if (initialValue !== undefined) {
      const init = Math.max(0, parseFloat(initialValue.toFixed(2)));
      setPrice(init);
    }
  }, [initialValue]);

  const updatePrice = (delta: number) => {
    setPrice((prev) => Math.max(0, parseFloat((prev + delta).toFixed(2))));
  };

  const textColor = isLight ? '#000' : '#fff';
  const boxColor = isLight ? '#dff9fb' : '#333';
  const shadowColor = isLight ? '#95afc0' : '#000';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>Precio del servicio</Text>

      <View style={[styles.priceBox, { backgroundColor: boxColor, shadowColor }]}>
        <Text style={styles.priceText}>${price.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonsRow}>
        {BUTTON_VALUES.map((val, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => updatePrice(val)}
            style={[
              styles.button,
              { backgroundColor: val > 0 ? '#b4e9bfff' : '#ff8b8bff' },
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
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  priceBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  button: {
    paddingVertical: 10,
    marginVertical: 3,
    borderRadius: 12,
    alignItems: 'center',
    width: '13.5%',
    shadowColor: '#b2bec3',
    shadowOpacity: 0.2,
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
