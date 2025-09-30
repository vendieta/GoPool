import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from "@/components/Themed/ContextTheme";

interface Props {
  x?: number; // límite máximo
  save?: (x: number) => void;
  color?: string;
  initialValue?: number;
}

export default function SeatInput({ x, save, color, initialValue }: Props) {
  const [seats, setSeats] = useState(
    initialValue !== undefined ? Math.max(0, initialValue) : 0
  );
  const { theme } = useTheme();

  const updateSeats = (delta: number) => {
    setSeats((prev) => {
      const newSeats = Math.min(x || Infinity, Math.max(0, prev + delta));
      if (save) save(newSeats); // <-- pasar valor directo
      return newSeats;
    });
  };

  // sincronizar con el padre siempre al inicio o si cambia initialValue
  useEffect(() => {
    const init = initialValue !== undefined ? Math.max(0, initialValue) : 0;
    setSeats(init);
    if (save) save(init);
  }, [initialValue]);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: 'black' }]}>Asientos disponibles</Text>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff8b8bff' }]}
          onPress={() => updateSeats(-1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.seatBox}>
          <MaterialIcons name="event-seat" size={35} color={color || "#0984e3"} />
          <Text style={styles.seatNumber}>{seats}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#b4e9bfff' }]}
          onPress={() => updateSeats(1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    alignItems: 'center',
    paddingVertical: 8,
},
label: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
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