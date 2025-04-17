import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect } from "react";
import { useTheme } from "@/components/Themed/ContextTheme";
import { MaterialIcons } from "@expo/vector-icons";

interface Producto {
  user: string;
  price: number;
  date: string;
  time: string;
  free: number;
  startZone: string;
  endZone: string;
}

export default function Info() {
  const { info } = useLocalSearchParams();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const data: Producto = typeof info === "string"
    ? JSON.parse(decodeURIComponent(info))
    : ({} as Producto);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      navigation.setOptions({
        title: `Detalles de ${data.user}`,
        headerTitleAlign: "center",
        headerTintColor: theme.text,
        headerStyle: { backgroundColor: theme.cardBackground },
      });
    }
  }, [navigation, data, theme]);

  const InfoCard = ({ title, value }: { title: string; value: string | number }) => (
    <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: theme.labelText }]}>{title}</Text>
      <Text style={[styles.cardValue, { color: theme.text }]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.subtleBackground }]}>
      {Object.keys(data).length > 0 ? (
        <View style={styles.content}>
          <View style={[styles.profileHeader, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
              <Text style={styles.avatarText}>{data.user.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={[styles.userName, { color: theme.text }]}>{data.user}</Text>
            <Text style={[styles.userStatus, { color: theme.labelText }]}>
              {data.free > 0 ? `${data.free} cupos disponibles` : 'Sin cupos'}
            </Text>
          </View>

          <View style={styles.section}>
            <InfoCard title="Origen" value={data.startZone} />
            <InfoCard title="Destino" value={data.endZone} />
            <InfoCard title="Precio" value={`$${data.price}`} />
          </View>

          <View style={styles.section}>
            <InfoCard title="Fecha" value={data.date} />
            <InfoCard title="Hora" value={data.time} />
          </View>

          <View style={[styles.contactButton, { backgroundColor: theme.accent }]}>
            <Text style={styles.contactButtonText}>Contactar a {data.user}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="error-outline" size={48} color={theme.labelText} />
          <Text style={[styles.emptyText, { color: theme.text }]}>No hay datos disponibles</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
  },
  userStatus: {
    fontSize: 14,
  },
  section: {
    gap: 12,
  },
  infoCard: {
    padding: 12,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  contactButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
