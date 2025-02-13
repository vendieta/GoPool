import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

{/*esta parte extrae las dimensiones del dispositivo del usuario*/}
const { width, height } = Dimensions.get('window')
const dLabel = width > 500 ? 0.015 : 0.048;
const dValue = width > 500 ? 0.02 : 0.041;

interface DataProps {
    element: {
      user: string,
      price: Float,
      date: string,
      time: string,
      free: number,
      startZone: string,
      endZone: string,
    };
};




const UserCard: React.FC<DataProps> = ({element}) => {
  return (
    <View style={styles.card}>
      {/* User Info and Image */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>{element.user}</Text>
          <View style={styles.userAvatar} />
          <Text style={styles.priceText}>{element.price}$</Text>
        </View>
      </View>

      {/* central info */}
      <View style={styles.tripInfoContainer}>
          <View style={styles.line}>
            <View style={styles.infoColumn}>
              {/* <Text style={styles.infoLabel}>Hora de</Text> */}
              <Text style={styles.infoLabel}>Salida:</Text>
              <Text style={styles.infoValue}>{element.time}/{element.date}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Cupos</Text>
              {/* <Text style={styles.infoLabel}>Libres:</Text> */}
              <Text style={styles.infoValue}>{element.free}</Text>
            </View>
          </View>
          <View style={styles.line1}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>START:</Text>
              <Text style={styles.infoValue}>{element.startZone}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>FINISH:</Text>
              <Text style={styles.infoValue}>{element.endZone}</Text>
            </View>
          </View>
        </View>

      {/* Ratings and Navigation */}
      {/* <View style={styles.rightSection}>
            !!!el codidgo de las estrellas
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFC107" />
          ))}
        </View>
              !!!!el codigo de la flecha siguiente
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        
      </View> */}
      
    </View>
    
  );
};


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    height:150,
    // padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    width: width*0.95,
    marginHorizontal: width*0.025,
    marginTop: 1,
    marginBottom: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  userTextContainer: {
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: width*dLabel,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    marginTop: 8,
  },
  priceText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
  tripInfoContainer: {
    // flexDirection: 'column',
    margin: 'auto',
  },
  infoColumn: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  infoValue: {
    fontSize: 15,
    color: '#777',
    textAlign:'center',
  },
  rightSection: {
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  navButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 16,
  },
  line: {
    flexDirection: 'row',
    justifyContent:'space-between',
    gap:15,
  },
  line1: {
    flexDirection: 'column',
  }
});

export default UserCard;
