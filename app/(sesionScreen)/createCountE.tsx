import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import BottomStyle from '@/components/BottomStyle';
import Input from '@/components/Input';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function CreateCountE() {
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
        <View style={styles.header}>
          <Text style={styles.title}>CREA TU CUENTA</Text>
          <Text style={styles.subtitle}>USUARIO EXTERNO</Text>
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
    backgroundColor: 'rgba(105, 105, 105, 0.85)',
    padding: 25,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 0,
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  containerInput: {
    width: '100%',
    marginBottom: height * 0.05,
    gap: 20,
  },
});