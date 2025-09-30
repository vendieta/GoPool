import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

interface Props {
  setSelectedDate: (date: Date) => void;
}

const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export default function WeekPicker({ setSelectedDate }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const today = new Date();
  const todayIndex = today.getDay(); // 0 = domingo ... 6 = sábado

  // Reordenar array para que empiece desde el día actual
  const rotatedDays = [
    ...daysOfWeek.slice(todayIndex),
    ...daysOfWeek.slice(0, todayIndex),
  ];

  // Obtener fecha real para cada posición del rotatedDays
  const getDateForRotatedDay = (offset: number): Date => {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);
    return targetDate;
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const date = getDateForRotatedDay(index);
    const formatted = `${date.toLocaleDateString("es-ES", { month: "short", day: "numeric" })}`;

    const isSelected = selectedIndex === index;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selected]}
        onPress={() => {
          setSelectedIndex(index);
          setSelectedDate(date);
          console.log('📅📅📅📅📅📅📅📅📅📅📅📅📅📅Selected date:', date);
        }}
      >
        <Text style={styles.day}>{item}</Text>
        <Text style={styles.date}>{formatted}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rotatedDays}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    height: 65,
  },
  item: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 90,
  },
  selected: {
    backgroundColor: "#007AFF",
  },
  day: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});
