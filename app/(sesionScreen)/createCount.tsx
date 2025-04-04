import BottomStyle from '@/components/BottomStyle';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CreateCount() {
  console.log('CreateCount');
  const buttonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={require('@/assets/images/tortucar.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>¡BIENVENIDO A GO POOL!</Text>
          <Text style={styles.subtitle}>Tu viaje comienza aquí</Text>
        </View>

        {/* Mensaje descriptivo */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            REGÍSTRATE COMO:
          </Text>
        </View>

        {/* Botones de selección */}
        <View style={styles.buttonsContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.7}
            >
              <BottomStyle 
                element={{
                  title: 'USUARIO ESPOL',
                  link: '/createCountU',
                }}
              />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>O</Text>
            <View style={styles.line} />
          </View>

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.7}
            >
              <BottomStyle 
                element={{
                  title: 'USUARIO EXTERNO',
                  link: '/createCountE',
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
          <Link href="/homeLogin" asChild>
            <Text style={styles.loginLink}>INICIA SESIÓN</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(105, 105, 105, 0.85)', 
    padding: 25,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  messageContainer: {
    marginBottom: height * 0.05,
  },
  messageText: {
    fontSize: width * 0.06,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    letterSpacing: 1,
    
  },
  buttonsContainer: {
    marginBottom: height * 0.1,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
  },
  separatorText: {
    width: 50,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  loginLink: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: width * 0.04,
    textDecorationLine: 'underline',
  },
});