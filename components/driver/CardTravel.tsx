import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView, Platform, ViewStyle } from "react-native";



interface Props {
    user: string;
    departureTime: string;
    arrivalTime: string;
    seats: number;
    price: number;
    zoneInit: string;
    zoneEnd: string
}

export default function CardTravel ({
    user,
    departureTime,
    arrivalTime,
    seats,
    price,
    zoneInit,
    zoneEnd,
    }: Props)  {


    return (
        <>
            <View
            style={[
                styles.card,
                styles.verticalCard,
            ]}
            >
            {/* <View style={styles.header}>
                <Text style={styles.user}>{user}</Text>
                </View> */}

            <View style={styles.subContainer}>
                <View style={styles.times}>
                    <View style={styles.timeBlock}>
                    <Ionicons name="time-outline" size={16} color="#0984e3" />
                    <Text style={styles.timeText}>Salida: {departureTime}</Text>
                    </View>
                    <View style={styles.timeBlock}>
                    <Ionicons name="time-outline" size={16} color="#00b894" />
                    <Text style={styles.timeText}>Llegada: {arrivalTime}</Text>
                    </View>
                </View>
                <View style={styles.containerPrice}>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                </View >
            </View>

            {/* <ScrollView
                horizontal
                contentContainerStyle={styles.routeScroll}
                showsHorizontalScrollIndicator={false}
            >
                {routePoints.map((point, index) => (
                <View key={index} style={styles.routePointContainer}>
                    {index > 0 && <View style={styles.routeLine} />}
                    <View style={styles.routePoint}>
                        <Ionicons name="location-sharp" size={12} color="#fff" />
                        <Text style={styles.routePointText} numberOfLines={1}>
                            {point}
                        </Text>
                    </View>
                </View>
                ))}
            </ScrollView> */}

            <View style={styles.footer}>
                <View style={{flexDirection: 'row', gap: 5}}>
                    <Ionicons name="people-outline" size={16} color="#636e72" />
                    <Text style={styles.seatsText}>Cupos: {seats}</Text>
                </View>
                <View>
                    <Text style={styles.seatsText}>{zoneInit}  ---  {zoneEnd}</Text>
                </View>
            </View>
            </View>
        </>
    );
    };

const cardBase: ViewStyle = {
backgroundColor: '#fff',
borderRadius: 14,
padding: 12,
shadowColor: '#000',
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 3,
marginBottom: 16,
// maxWidth: 500,
alignSelf: 'center',
...Platform.select({
    web: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
}),
};

const styles = StyleSheet.create({
card: {
    ...cardBase,
    width: '95%',
    borderWidth: 0.2
},
subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
verticalCard: {
    flexDirection: 'column',
},
horizontalCard: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column', // Soporta modo horizontal solo en dispositivos amplios
    alignItems: 'flex-start',
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
user: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3436',
},
price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#d63031',
    justifyContent: 'center',
    alignItems: 'center'
},
containerPrice: {
    justifyContent: 'center',
    paddingRight: 10
},
times: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
    marginBottom: 10,
},
timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
},
timeText: {
    fontSize: 14,
    color: '#636e72',
},
routeScroll: {
    alignItems: 'center',
    paddingVertical: 6,
},
routePointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35
},
routeLine: {
    width: 10,
    height: 2,
    backgroundColor: '#74b9ff',
    marginHorizontal: 4,
},
routePoint: {
    backgroundColor: '#0984e3',
    borderRadius: 15,
    paddingRight: 7,
    paddingLeft: 3,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 30,
},
routePointText: {
    color: 'white',
    fontSize: 13,
    height: '100%',
    maxWidth: 80,
},
footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
},
seatsText: {
    fontSize: 16,
    color: '#636e72',
},
});