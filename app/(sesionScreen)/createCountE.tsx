import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ImgCard from '@/components/ImgCard';
import BottomStyle from '@/components/BottomStyle';
import Input from '@/components/Input';

// Agrego useState para manejar el estado del formulario
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function createCountU() {
  // Agrego el estado para manejar los valores de los inputs
  const [formData, setFormData] = useState({
    username: '',
    correo: '',
    fechaNacimiento: '',
    password: '',
  });

  // Agrego una función para actualizar el estado cuando el usuario escribe
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ImgCard
      color="#22121"
      img={require('@/assets/images/partial-react-logo.png')}
    >
      <View style={styles.containerText}>
        <Text style={styles.text}>Username</Text>
        <View style={styles.containerInput}>
          {/* Agrego las props value y onChangeText a cada Input */}
          <Input
            element="Username"
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
          />
          <Input
            element="correo"
            value={formData.correo}
            onChangeText={(text) => handleInputChange('correo', text)}
          />
          <Input
            element="fecha de nacimiento"
            value={formData.fechaNacimiento}
            onChangeText={(text) => handleInputChange('fechaNacimiento', text)}
          />
          <Input
            element="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry // Agrego secureTextEntry para el campo de contraseña
          />
        </View>
      </View>
      <BottomStyle
        element={{
          title: 'crear cuenta',
          link: '/createCountU', 
        }}
      />
    </ImgCard>
  );
}

const styles = StyleSheet.create({
  containerText: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  containerInput: {
    width: '100%',
    marginBottom: height * 0.02, // Más espacio debajo de los inputs
  },
  text: {
    fontSize: width * 0.07, // Tamaño más grande para el título
    textAlign: 'center',
    color: '#2c3e50', // Un color más oscuro y elegante
    fontWeight: '700', // Negrita para que destaque
    marginBottom: height * 0.03, // Más espacio debajo del título
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.02, // Espacio arriba del botón
  },
});