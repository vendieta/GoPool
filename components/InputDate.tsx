import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  value: string | undefined;
  onChange: (dateString: string) => void;
  placeholder?: string;
}

export default function DateInputSimple({ 
  value, 
  onChange, 
  placeholder = 'DD-MM-AAAA' 
}: Props) {
  const [date, setDate] = useState(value ? new Date(value) : null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      // onChange(selectedDate.toLocaleDateString('es-ES')); // Formato DD/MM/AAAA
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      onChange(`${year}-${month}-${day}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={value ? styles.textFilled : styles.textPlaceholder}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          locale="es-ES"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  textFilled: {
    color: '#333',
    fontSize: 16,
  },
  textPlaceholder: {
    color: '#9e9e9e',
    fontSize: 16,
  },
});