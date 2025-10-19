import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  // Picker as RNPicker // Solo para Android/iOS
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
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isWeb] = useState(Platform.OS === 'web');
  
  // Estados para el selector web
  const [selectedYear, setSelectedYear] = useState<number>(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(date.getDate());
  
  // Generar rangos para los selectores
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => i + 1);

  useEffect(() => {
    if (isWeb) {
      const newDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      const formattedDate = formatDateForWeb(newDate);
      onChange(formattedDate);
    }
  }, [selectedYear, selectedMonth, selectedDay, isWeb]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      updateDate(selectedDate);
    }
  };

  const updateDate = (newDate: Date) => {
    setDate(newDate);
    const formattedDate = formatDate(newDate);
    onChange(formattedDate);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatDateForWeb = (date: Date) => {
    return formatDate(date); // Mismo formato que la versión móvil
  };

  // Selector para web
  const renderWebDatePicker = () => (
    <View style={styles.webPickerContainer}>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        style={styles.webPicker}
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        style={styles.webPicker}
      >
        {months.map(month => (
          <option key={month} value={month}>
            {new Date(selectedYear, month - 1, 1).toLocaleString('es-ES', { month: 'long' })}
          </option>
        ))}
      </select>
      
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(Number(e.target.value))}
        style={styles.webPicker}
      >
        {days.map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
    </View>
  );

  return (
    <View style={styles.container}>
      {isWeb ? (
        renderWebDatePicker()
      ) : (
        <>
          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text style={value ? styles.textFilled : styles.textPlaceholder}>
              {value ? formatDate(new Date(value)) : placeholder}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              locale="es-ES"
            />
          )}
        </>
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
  webPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  webPicker: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    padding: 10,
    fontSize: 16,
  },
});