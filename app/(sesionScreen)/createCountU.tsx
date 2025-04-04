import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import ImgCard from '@/components/ImgCard';
import BottomStyle from '@/components/BottomStyle';
import Input from '@/components/Input';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function CreateCountU() {
  const [formData, setFormData] = useState({
    username: '',
    correo: '',
    fechaNacimiento: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ImageBackground
      source={require('@/assets/images/tortucar.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        
          <View style={styles.containerText}>
            <Text style={styles.title}>CREA TU CUENTA </Text>
            <Text style={styles.subtitle}>USUARIO ESPOL</Text>
          </View>

          <View style={styles.containerInput}>
            <Input
              label="NOMBRE DE USUARIO"
              value={formData.username}
              onChangeText={(text) => handleInputChange('username', text)}
              placeholder="Ingresa tu nombre de usuario"
            />
            <Input
              label="CORREO ELECTRÓNICO"
              value={formData.correo}
              onChangeText={(text) => handleInputChange('correo', text)}
              placeholder="ejemplo@correo.com"
            />
            <Input
              label="FECHA DE NACIMIENTO"
              value={formData.fechaNacimiento}
              onChangeText={(text) => handleInputChange('fechaNacimiento', text)}
              placeholder="DD/MM/AAAA"
            />
            <Input
              label="CONTRASEÑA"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              placeholder="Crea una contraseña segura"
            />
          </View>

          <BottomStyle
            element={{
              title: 'REGISTRARSE',
              link: '/',
            }}
          />
        
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'center',
  },
  containerText: {
    width: '100%',
    marginBottom: height * 0.05,
    alignItems: 'center',
    
  },
  title: {
    fontSize: width * 0.08,
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
    textAlign: 'center',
  },
  containerInput: {
    width: '100%',
    marginBottom: height * 0.05,
    gap: 20,
  },
});