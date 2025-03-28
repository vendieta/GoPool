// app/homeLogin.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>Bienvenido a GoPol comenzemos tu viaje!</Text>
      <Text style={styles.subtitle}>Te ayudaré a contactar con otras personas con las que compartes una ruta</Text>
      <Text style={styles.subtitle}>Sign In to your account</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Log In Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LOG IN</Text>

      </TouchableOpacity>

      {/* Create Account Link */}
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account? </Text>
        <Link href="/createCount" asChild>
          <Text style={styles.createAccountLink}>CREATE</Text>
        </Link>
      </View>

      
    </View>
  );
}

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
  button: {
    backgroundColor: '#ff4d4d',
    borderRadius: 25,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    width: '80%',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
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