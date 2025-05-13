import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Link, Route } from 'expo-router';
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
// Importamos el componente BottomStyle (ajusta la ruta según tu estructura)
import BottomStyle from '../../components/BottomStyle'; // Ajusta esta ruta si es necesario
import useStorage from '@/hooks/useStorage';
import { useLoginContext } from '@/hooks/useLoginContext';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');



interface LoginForm {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  }
}

export default function LoginScreen() {
  const router = useRouter();
  const { data, loading, error, post } = useApi<LoginForm>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, toggleState } = useLoginContext()
  const {
    storedValue: access_token,
    setItem: setAccess_token,
  } = useStorage('access_token');
  const {
    storedValue: refresh_token,
    setItem: setRefresh_token,
  } = useStorage('refresh_token');
  const {
    storedValue: userId,
    setItem: setId,
  } = useStorage('userId');
  const {
    storedValue: userEmail,
    setItem: setUserEmail,
  } = useStorage('userEmail');



  // Definimos el objeto con el título y la ruta para el botón
  const loginButtonData: { title: string; link: Route, onPress: () => void } = {
    title: 'LOG IN',
    link: '/', // Cambia la ruta según tu estructura de navegación	
    onPress: () => createTrip(email, password)
  };

  // Función para login
  const createTrip = async (email: string, password: string) => {
    console.log('credenciales: ',email, password)
    post('/api/auth/login', {
      email: email,
      password: password
    });}
  //! hay que manejar mejor estoooooooooooooooooooooooooooooooooooooooo
  useEffect(() => {
    console.log('estoy el useEffect')
    if (data) {
    const handleLoginSuccess = async () => {
      toggleState();
      await setUserEmail('userId', data.user.email);
      await setId('userEmail', data.user.id);
      await setAccess_token('access_token', data.access_token);
      await setRefresh_token('refresh_token', data.refresh_token);
      console.log('este es el state del login:  ', state)
      console.log('este es el state del login:  ', state);
      router.replace('/');
    };
    handleLoginSuccess();
    }
  }, [data]);
  //   if (data) {
  //     toggleState()
  //     await setUserEmail('userId', data.user.email);
  //     await setId('userEmail', data.user.id);
  //     await setAccess_token('access_token', data.access_token);
  //     await setRefresh_token('refresh_token', data.refresh_token);
  //     console.log('este es el state del login:  ', state)
  //   }
  //   console.log('data sesion: ', data)
  //   console.log('storage total: ', access_token, refresh_token, 'userid y email:  ', userEmail, userId)
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a GoPool comenzemos tu viaje!</Text>
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
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          // value={formData.password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón con BottomStyle */}
      <BottomStyle element={loginButtonData} />

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>No tienes cuenta? </Text>
        <Link href="/createCount" asChild>
          <Text style={styles.createAccountLink}>REGISTRATE</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: 17,
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
    fontSize: 15,
    color: '#000',
  },
  forgotPassword: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 15,
    color: '#666',
  },
  createAccountLink: {
    fontSize: 15,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});