import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link, Route } from 'expo-router';
import { useState } from 'react';

// Importamos el componente BottomStyle (ajusta la ruta según tu estructura)
import BottomStyle from '../../components/BottomStyle'; // Ajusta esta ruta si es necesario

const { width, height } = Dimensions.get('window');

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  message?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email,password)
  // Definimos el objeto con el título y la ruta para el botón
  const loginButtonData: { title: string; link: Route } = {
    title: 'LOG IN',
    link: '/', // Cambia la ruta según tu estructura de navegación	
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a GoPol comenzemos tu viaje!</Text>
      <Text style={styles.subtitle}>Te ayudaré a contactar con otras personas con las que compartes una ruta</Text>
      <Text style={styles.subtitle}>Sign In to your account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          // value={formData.email}
          // onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          // value={formData.password}
          // onChangeText={(text) => handleInputChange('password', text)}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón con BottomStyle */}
      <BottomStyle element={loginButtonData} />

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account? </Text>
        <Link href="/createCount" asChild>
          <Text style={styles.createAccountLink}>CREATE</Text>
        </Link>
      </View>
    </View>
  );
}

// Tus estilos existentes...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.03,
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.03,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.015,
    fontSize: width * 0.04,
    color: '#000',
  },
  forgotPassword: {
    color: '#666',
    fontSize: width * 0.035,
    textAlign: 'right',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  createAccountText: {
    fontSize: width * 0.035,
    color: '#666',
  },
  createAccountLink: {
    fontSize: width * 0.035,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});