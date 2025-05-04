import React, { useState } from 'react';
import {
View,
Text,
TouchableOpacity,
Platform,
StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

// Web dropdowns personalizados
const WebDropdown = ({
label,
items,
value,
onChange,
}: {
label: string;
items: (number | string)[];
value: number | string;
onChange: (v: any) => void;
}) => (
<View style={styles.dropdownContainer}>
    {label ? <Text style={styles.dropdownLabel}>{label}</Text> : null}
    <select
    value={value}
    onChange={(e) => onChange(isNaN(Number(e.target.value)) ? e.target.value : parseInt(e.target.value))}
    style={styles.select}
    >
    {items.map((item) => (
        <option key={item} value={item}>
        {typeof item === 'number'
            ? item.toString().padStart(2, '0')
            : item.toString()}
        </option>
    ))}
    </select>
</View>
);

const TimeInput: React.FC = () => {
const [hora, setHora] = useState<Date | null>(null);
const [mostrarPicker, setMostrarPicker] = useState(false);

// Web selectors
const [webHora, setWebHora] = useState(12);
const [webMinuto, setWebMinuto] = useState(0);
const [webPeriodo, setWebPeriodo] = useState<'AM' | 'PM'>('AM');

const horas12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
const minutos = Array.from({ length: 60 }, (_, i) => i); // 0-59

const abrirPicker = () => setMostrarPicker(true);

const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setMostrarPicker(false);
    if (selectedDate) {
    setHora(selectedDate);
    }
};

const formatearHora12 = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

const handleWebConfirm = () => {
    let h = webHora % 12;
    if (webPeriodo === 'PM') h += 12;
    const nuevaHora = new Date();
    nuevaHora.setHours(h);
    nuevaHora.setMinutes(webMinuto);
    nuevaHora.setSeconds(0);
    setHora(nuevaHora);
};

return (
    <View style={[styles.container, Platform.OS === 'web' ? {padding: 5} : {padding: 20}]}>
    {Platform.OS === 'web' ? (
        <View style={styles.webSelectorContainer}>
            <Text style={styles.title}>Hora de salida</Text>
            <View style={styles.webSelectRow}>
                <WebDropdown label="Hora" items={horas12} value={webHora} onChange={setWebHora} />
                <WebDropdown label="Minuto" items={minutos} value={webMinuto} onChange={setWebMinuto} />
                <WebDropdown label="AM/PM" items={['AM', 'PM']} value={webPeriodo} onChange={setWebPeriodo} />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleWebConfirm}>
                <Ionicons name="checkmark-circle" size={24} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
            {hora && (
                <Text style={styles.resultado}>Salida: {formatearHora12(hora)}</Text>
            )}
        </View>
    ) : (
        <>
        <TouchableOpacity style={styles.button} onPress={abrirPicker}>
            <Ionicons name="time-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>
            {hora ? `Entrada: ${formatearHora12(hora)}` : 'Hora de salida'}
            </Text>
        </TouchableOpacity>

        {mostrarPicker && (
            <DateTimePicker
            value={hora || new Date()}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange}
            />
        )}
        </>
    )}
    </View>
);
};

export default TimeInput;;

const styles: any = StyleSheet.create({
container: {
    alignItems: 'center',
    width: '50%'
},
title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2d3436',
},
button: {
    backgroundColor: '#6c5ce7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 6,
    width: '100%'
},
buttonText: {
    color: 'white',
    fontSize: 16,
},
icon: {
    marginRight: 10,
},
webSelectorContainer: {
    backgroundColor: '#dfe6e9',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: '100%'
},
webSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
dropdownContainer: {
    flex: 1,
    marginRight: 5,
},
dropdownLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#636e72',
},
select: {
    width: '100%',
    padding: 5,
    borderRadius: 8,
    borderColor: '#6c5ce7',
    borderWidth: 1,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#2d3436',
},
confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#00b894',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
},
resultado: {
    marginTop: 15,
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
},
});
