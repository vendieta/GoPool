import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CarCardProps {
  brand: string;
  model: string;
  color: string;
  capacity: number;
  plate: string;
  imageUrl: string;
  horizontal?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  brand,
  model,
  color,
  capacity,
  plate,
  imageUrl,
}) => {
  return (
    <View
      style={[
        styles.card,
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.carImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.carTitle}>{brand} {model}</Text>

        <View style={styles.row}>
          <Ionicons name="color-palette-outline" size={16} color="#636e72" />
          <Text style={styles.detailText}>Color: {color}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="people-outline" size={16} color="#636e72" />
          <Text style={styles.detailText}>Capacidad: {capacity} personas</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="car-outline" size={16} color="#636e72" />
          <Text style={styles.detailText}>Placa: {plate}</Text>
        </View>
      </View>
    </View>
  );
};

export default CarCard;

const cardBase: ViewStyle = {
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 12,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginBottom: 16,
  ...Platform.select({
    web: {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      gap: 75,
      maxWidth: 500,
      paddingHorizontal: 40
    },
  }),
};

const styles = StyleSheet.create({
  card: {
    ...cardBase,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  carTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#636e72',
  },
});

// import { View, Text, StyleSheet } from "react-native";


// interface Props {
//     marcaCar: string,
//     modelCar: string,
//     colorCar: string,
//     capacityCar: string,
//     placaCar: string,
//     ft?: string
// }


// export default function RenderItems({marcaCar, modelCar, colorCar, capacityCar, placaCar, ft}: Props) {

//     return(
//         <View style={styles.container}>
//             <View style={styles.containerLeft}>
//                 {/* aqui debe estar la img del carro */}
//                 <Text style={styles.text}>{placaCar}</Text>
//             </View>
//             <View>

//             </View>
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',

//     },
//     containerLeft: {
//         flexDirection: 'column',
//         alignItems: 'center'
//     },
//     text: {

//     }
// })