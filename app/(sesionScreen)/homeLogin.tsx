import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { apiService, setAuthToken } from '../../api/api';
import BottomStyle from '../../components/BottomStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: keyof LoginForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    console.log('handleLogin', formData);
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    setLoading(true);

    try {
      // 1. Llamada al endpoint de login
      console.log('Llamando al endpoint de login...');
      const response = await apiService.post<LoginResponse>('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // 2. Guardar tokens
      if (response.access && response.refresh) {
        // Guardar tokens en AsyncStorage
        console.log('Guardando tokens...');
        await AsyncStorage.multiSet([
          ['accessToken', response.access],
          ['refreshToken', response.refresh]
        ]);

        // Configurar token en axios
        setAuthToken(response.access);
        console.log("llegue aqui");
        // 3. Navegar a la pantalla principal
        router.replace('/profile');

        Alert.alert('Éxito', 'Inicio de sesión correcto');
      } else {
        Alert.alert('Error', response.message || 'Credenciales incorrectas');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'Error al conectar con el servidor';
      if (error.response) {
        // Manejo específico de errores HTTP
        switch (error.response.status) {
          case 400:
            errorMessage = 'Datos inválidos';
            break;
          case 401:
            errorMessage = 'Credenciales incorrectas';
            break;
          case 500:
            errorMessage = 'Error del servidor';
            break;
        }
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
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
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity disabled={loading}>
        <BottomStyle element={{
          title: loading ? 'CARGANDO...' : 'LOG IN',
          onPress: () => {handleLogin()} // Opcional, ya que el TouchableOpacity padre maneja el press
        }} />
      </TouchableOpacity>

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