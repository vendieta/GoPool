import { View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BottomStyle from '@/components/BottomStyle';
import Input from '@/components/Input';
import { useState } from 'react';
import DateInputSimple from '@/components/InputDate';

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Encabezado */}
            <View style={styles.header}>
              <Text style={styles.title}>CREA TU CUENTA</Text>
              <Text style={styles.subtitle}>USUARIO ESPOL</Text>
            </View>

            {/* Inputs */}
            <View style={styles.inputsContainer}>
              <Input
                label="NOMBRE DE USUARIO"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholder="NOMBRE DE USUARIO ESPOL"
              />
              <Input
                label="CORREO ELECTRÓNICO ESPOL"
                value={formData.correo}
                onChangeText={(text) => handleInputChange('correo', text)}
                placeholder="CORREO ELECTRÓNICO ESPOL"
              />
              <DateInputSimple
                value={formData.fechaNacimiento}
                onChange={(dateString) => handleInputChange('fechaNacimiento', dateString)}
                placeholder="FECHA DE NACIMIENTO"
              />
              <Input
                label="CONTRASEÑA"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry
                placeholder="CONTRASEÑA SEGURA"
              />
            </View>
          </ScrollView>

          {/* Botón de registro */}
          <View style={styles.buttonContainer}>
            <BottomStyle
              element={{
                title: 'REGISTRARSE',
                link: '/',
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(105, 105, 105, 0.85)',
    padding: 25,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.05,
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});