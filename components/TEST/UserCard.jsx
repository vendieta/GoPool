import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

{/*esta parte extrae las dimensiones del dispositivo del usuario*/}
const { width, height } = Dimensions.get('window')
// alert(width)
// alert(height)


const UserCard = () => {
  return (

    <View style={styles.card}>
      {/* User Info and Image */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>USER 1</Text>
          <View style={styles.userAvatar} />
          <Text style={styles.priceText}>PRICE: 0.5$</Text>
        </View>
      </View>

      {/* central info */}
      <View style={styles.tripInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TIME OF START:</Text>
            <Text style={styles.infoValue}>00/00/00 00:00</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>AVAILABLE SEATS:</Text>
            <Text style={styles.infoValue}>#</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>START:</Text>
            <Text style={styles.infoValue}>POINT 1</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>FINISH:</Text>
            <Text style={styles.infoValue}>POINT 2</Text>
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
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    width: width*0.95,
    marginHorizontal: width*0.025,
    fontSize:5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTextContainer: {
    alignItems: 'center',
    marginRight: 5,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
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
    marginTop: 8,
  },
  tripInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  infoValue: {
    marginLeft: 8,
    color: '#777',
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
});

export default UserCard;
