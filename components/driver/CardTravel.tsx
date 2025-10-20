import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView, Platform, ViewStyle, useWindowDimensions } from "react-native";
import { ComvertTimeZone } from "@/scripts/time";

interface Props {
  user: string;
  departureTime: string;
  arrivalTime: string;
  seats: number;
  price: number;
  zoneInit: string;
  zoneEnd: string;
}

export default function CardTravel({
  user,
  departureTime,
  arrivalTime,
  seats,
  price,
  zoneInit,
  zoneEnd,
}: Props) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768; // se considera grande si es tablet o web

  return (
      <View
        style={[
          styles.card,
          styles.verticalCard,
          {
            width: isLargeScreen ? "70%" : "95%",
          },
        ]}
      >
        <View style={styles.subContainer}>
          <View style={styles.times}>
            <View style={styles.timeBlock}>
              <Ionicons name="time-outline" size={16} color="#0984e3" />
              <Text style={styles.timeText}>
                Salida: {ComvertTimeZone(departureTime)}
              </Text>
            </View>
            <View style={styles.timeBlock}>
              <Ionicons name="time-outline" size={16} color="#00b894" />
              <Text style={styles.timeText}>
                Llegada: {ComvertTimeZone(arrivalTime)}
              </Text>
            </View>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="people-outline" size={16} color="#636e72" />
            <Text style={styles.seatsText}>Cupos: {seats}</Text>
          </View>
          <View style={{ maxWidth: "70%" }}>
            <Text
              style={styles.seatsText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {zoneInit} --- {zoneEnd}
            </Text>
          </View>
        </View>
      </View>
  );
}

const cardBase: ViewStyle = {
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: 12,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginBottom: 16,
  alignSelf: "center",
  ...Platform.select({
    web: {
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  }),
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    ...cardBase,
    borderWidth: 0.2,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  verticalCard: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d3436",
  },
  price: {
    fontSize: 17,
    fontWeight: "700",
    color: "#d63031",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPrice: {
    justifyContent: "center",
    paddingRight: 10,
  },
  times: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
    marginBottom: 10,
  },
  timeBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#636e72",
    flexShrink: 1,
  },
  footer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
    flexWrap: "wrap",
  },
  seatsText: {
    fontSize: 16,
    color: "#636e72",
  },
});
