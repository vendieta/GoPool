import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { useTheme } from '../../components/Themed/ContextTheme';

interface DataProps {
  element: {
    user: string;
    price: number;
    date: string;
    time: string;
    free: number;
    startZone: string;
    endZone: string;
  };
}

const UserCard: React.FC<DataProps> = ({ element }) => {
  const jsonData = encodeURIComponent(JSON.stringify(element));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { theme } = useTheme();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.mainContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={[theme.gradientStart, theme.gradientEnd]}
        style={styles.borderContainer}
      >
        <Link href={`../${jsonData}`} asChild>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={styles.link}
          >
            <View style={styles.card}>
              {/* Sección izquierda */}
              <LinearGradient
                colors={[theme.subtleBackground, `${theme.subtleBackground}33`]}
                style={styles.leftSection}
              >
                <Text style={[styles.userName, { color: theme.text }]} numberOfLines={1} ellipsizeMode="tail">
                  {element.user}
                </Text>
                <View style={[styles.userAvatar, { borderColor: theme.accent, backgroundColor: theme.cardBackground }]}>
                  <Text style={[styles.avatarInitial, { color: theme.text }]}>
                    {element.user.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.priceText, { color: theme.accent }]}>
                  ${element.price}
                </Text>
              </LinearGradient>

              {/* Sección central */}
              <View style={[styles.centerSection, { backgroundColor: theme.cardBackground }]}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme.labelText }]}>SALIDA</Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>
                    {element.time} / {element.date}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme.labelText }]}>INICIO</Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>{element.startZone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme.labelText }]}>FIN</Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>{element.endZone}</Text>
                </View>
              </View>

              {/* Sección derecha */}
              <View style={[styles.rightSection, { backgroundColor: theme.subtleBackground }]}>
                <Text style={[styles.cuposLabel, { color: theme.labelText }]}>CUPOS</Text>
                <Text style={[styles.cuposValue, { color: theme.accent }]}>
                  {element.free}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  borderContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  link: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    height: 'auto',
  },
  leftSection: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  centerSection: {
    width: '45%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  rightSection: {
    width: '25%',
    alignItems: 'center',
    paddingTop: 10,
  },
  infoRow: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: '700',
    fontSize: 13,
    maxWidth: '100%',
    textAlign: 'center',
    marginBottom: 4,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '400',
  },
  cuposLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  cuposValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default UserCard;
