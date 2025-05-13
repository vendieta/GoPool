import React from 'react';
import {
View,
Text,
StyleSheet,
ScrollView,
Platform,
ViewStyle,
Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { height, width } = Dimensions.get('window')

interface TripCardProps {
user: string;
departureTime: string;
arrivalTime: string;
seats: number;
price: number;
routePoints: string[]; // Max 7
date: string;
zoneInit: string;
zoneEnd: string;
horizontal?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({
user,
departureTime,
arrivalTime,
seats,
price,
routePoints,
date,
horizontal = false,
zoneInit,
zoneEnd,
}) => {

      // Validación rápida
    const isValid =
    user &&
    departureTime &&
    arrivalTime &&
    typeof seats === 'number' &&
    typeof price === 'number' &&
    Array.isArray(routePoints);

    if (!isValid) {
    return null; // O podrías mostrar un error en pantalla
    }

    const jsonData = encodeURIComponent(
    JSON.stringify({
        user,
        departureTime,
        arrivalTime,
        seats,
        price,
        routePoints,
        date,
        zoneEnd,
        zoneInit
    })
    );


    return (
        <Link href={{pathname: "../[info]", params: { info: jsonData} }}>
            <View
            style={[
                styles.card,
                horizontal ? styles.horizontalCard : styles.verticalCard,
            ]}
            >
            <View style={styles.header}>
                <Text style={styles.user}>{user}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>

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

            <ScrollView
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
            </ScrollView>

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
        </Link>
    );
    };

    export default TripCard;

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
    width: width*.95,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#d63031',
},
times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 15,
    color: '#636e72',
},
});
