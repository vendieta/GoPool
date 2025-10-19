import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatearHora12 } from "@/scripts/compareTime";

interface Props {
  backColor: string;
  SalEnt: string;
  save: (x: Date) => void;
  initialValue?: Date | string;
}

const isWeb = Platform.OS === "web";

export default function TimeInput({ backColor, SalEnt, save, initialValue }: Props) {
  const [hora, setHora] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  const horas12 = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutos = Array.from({ length: 60 }, (_, i) => i);
  const periodos: ("AM" | "PM")[] = ["AM", "PM"];

  // Cargar valor inicial
  useEffect(() => {
    if (initialValue) {
      let date: Date;
      if (initialValue instanceof Date) {
        date = initialValue;
      } else if (/^\d{2}:\d{2}$/.test(initialValue)) {
        const [hh, mm] = initialValue.split(":").map(Number);
        date = new Date();
        date.setHours(hh);
        date.setMinutes(mm);
        date.setSeconds(0);
      } else {
        date = new Date(initialValue);
      }

      if (!isNaN(date.getTime())) {
        setHora(date);

        let h = date.getHours();
        const periodo: "AM" | "PM" = h >= 12 ? "PM" : "AM";
        h = h % 12;
        h = h === 0 ? 12 : h;

        setSelectedHour(h);
        setSelectedMinute(date.getMinutes());
        setSelectedPeriod(periodo);
      }
    }
  }, [initialValue]);

  const confirmar = () => {
    let h = selectedHour % 12;
    if (selectedPeriod === "PM") h += 12;

    const nueva = new Date();
    nueva.setHours(h);
    nueva.setMinutes(selectedMinute);
    nueva.setSeconds(0);

    setHora(nueva);
    save(nueva);
    console.log('⏰⏰⏰ Selected time:', nueva);
    setModalVisible(false);
  };

  // Selector universal con clicks (funciona igual en web y mobile)
  const renderPicker = (
    data: number[] | string[],
    selected: number | string,
    onSelect: (v: any) => void,
    label: string
  ) => {
    return (
      <View style={styles.column}>
        <Text style={styles.label}>{label}</Text>
        <ScrollView 
          style={styles.scroll} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((item) => {
            const isSelected = selected === item;
            return (
              <TouchableOpacity
                key={item.toString()}
                style={[
                  styles.option,
                  isSelected && { backgroundColor: backColor },
                ]}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {typeof item === "number" ? item.toString().padStart(2, "0") : item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: backColor }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="time-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>
          {hora ? `${SalEnt}: \n${formatearHora12(hora)}` : `${SalEnt}`}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={[styles.modalCard, isWeb && styles.modalCardWeb]}>
            {/* Header minimalista */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{SalEnt}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Preview grande y limpio */}
            <View style={[styles.previewBox, { backgroundColor: `${backColor}10` }]}>
              <Text style={[styles.previewText, { color: backColor }]}>
                {`${selectedHour.toString().padStart(2, "0")}:${selectedMinute
                  .toString()
                  .padStart(2, "0")}`}
              </Text>
              <Text style={[styles.previewPeriod, { color: backColor }]}>
                {selectedPeriod}
              </Text>
            </View>

            {/* Selectores */}
            <View style={styles.row}>
              {renderPicker(horas12, selectedHour, setSelectedHour, "Hora")}
              {renderPicker(minutos, selectedMinute, setSelectedMinute, "Minuto")}
              {renderPicker(periodos, selectedPeriod, setSelectedPeriod, "Período")}
            </View>

            {/* Botón de confirmación minimalista */}
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: backColor }]}
              onPress={confirmar}
            >
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "45%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginRight: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "85%",
  },
  modalCardWeb: {
    maxHeight: 600,
    alignSelf: "center",
    width: "90%",
    maxWidth: 500,
    borderRadius: 24,
    marginBottom: "5%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  previewBox: {
    marginBottom: 24,
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  previewText: {
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: 2,
  },
  previewPeriod: {
    fontSize: 24,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    justifyContent: "center",
  },
  column: {
    flex: 1,
    maxWidth: 120,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "#999",
    textAlign: "center",
    textTransform: "uppercase",
  },
  scroll: {
    maxHeight: 250,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingVertical: 4,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  optionTextSelected: {
    color: "#fff",
    fontSize: 18,
  },
  confirmButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});