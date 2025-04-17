import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTheme } from "@/components/Themed/ContextTheme";
import { MaterialIcons } from '@expo/vector-icons';

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

  // Convertir el parámetro JSON de vuelta a un objeto
  const data: Producto = typeof info === 'string'
    ? JSON.parse(decodeURIComponent(info))
    : ({} as Producto);

  // Colores basados en el tema
  const isLightTheme = theme.name === 'light';
  const backgroundColor = isLightTheme ? '#f5f5f5' : '#121212';
  const cardBackground = isLightTheme ? '#fff' : '#1e1e1e';
  const textColor = isLightTheme ? '#333' : '#fff';
  const secondaryTextColor = isLightTheme ? '#666' : '#aaa';
  const accentColor = '#4a90e2';

  // Modificar el header
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      navigation.setOptions({
        title: `Detalles de ${data.user}`,
        headerTitleAlign: "center",
        headerTintColor: isLightTheme ? "#000" : "#fff",
        headerStyle: {
          backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
        },
      });
    }
  }, [navigation, data, isLightTheme]);

  const InfoCard = ({ icon, title, value }: { icon: string, title: string, value: string | number }) => (
    <View style={[styles.infoCard, { backgroundColor: cardBackground }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
      </View>
      <Text style={[styles.cardValue, { color: textColor }]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} contentContainerStyle={styles.contentContainer}>
      {Object.keys(data).length > 0 ? (
        <View style={styles.content}>
          <View style={[styles.profileHeader, { backgroundColor: cardBackground }]}>
            <View style={[styles.avatar, { backgroundColor: accentColor }]}>
              <Text style={styles.avatarText}>{data.user.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={[styles.userName, { color: textColor }]}>{data.user}</Text>
            <Text style={[styles.userStatus, { color: secondaryTextColor }]}>
              {data.free > 0 ? `${data.free} cupos disponibles` : 'Sin cupos disponibles'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Información del Viaje</Text>
            <InfoCard icon="location-on" title="Origen" value={data.startZone} />
            <InfoCard icon="location-off" title="Destino" value={data.endZone} />
            <InfoCard icon="attach-money" title="Precio" value={`$${data.price}`} />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Fecha y Hora</Text>
            <InfoCard icon="calendar-today" title="Fecha" value={data.date} />
            <InfoCard icon="access-time" title="Hora" value={data.time} />
          </View>

          <View style={[styles.contactButton, { backgroundColor: accentColor }]}>
            <Text style={styles.contactButtonText}>Contactar a {data.user}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="error-outline" size={48} color={secondaryTextColor} />
          <Text style={[styles.emptyText, { color: textColor }]}>No hay datos disponibles</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    gap: 20,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 16,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoCard: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});