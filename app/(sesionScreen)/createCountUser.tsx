import { View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import DateInputSimple from '@/components/InputDate';
import GalleryFt from '@/components/imgs/GalleryFt';

const { width, height } = Dimensions.get('window');

interface RegisterFrom {
  email: string,
  password: string,
  metadata: {
    nombre: string,
    usuario: string,
    lastname: string,
    nummatricula: string,
    fechanacimiento: string,  // Opcional
    fotomatricula: string // Opcional
  }
}

export default function CreateCountUser() {
  const { data, loading, error, post } = useApi<RegisterFrom>();
  const [ userName, setUserName ] = useState('')
  const [ name, setName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ fechNa, setFechNa ] = useState('')
  const [ numMatricula, setNumMatricula ] = useState('')
  const [ ftMatricula, setFtMatricula ] = useState('')
  const [ confPassword, setConfPassword ] = useState('')
  
  
  const send = () => {
    if(userName && name && lastName && email && password && fechNa && numMatricula && confPassword) {
      post('/', {
      
      })
    } else {
      Alert.alert(
        "Error", // Título del alert
        "Hubo un problema, por favor intenta nuevamente.", // Mensaje
        [
          { text: "Aceptar", onPress: () => console.log("Error aceptado") }, // Botón de aceptación
        ],
      );
    }
  }


  return (
    <ImageBackground
      source={require('@/assets/images/tortucar.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TextInput
                  style={styles.inputPart}
                  value={name}
                  onChangeText={setName}
                  placeholder="NOMBRE"
                  placeholderTextColor="#999"
                  // secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.inputPart}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="APELLIDO"
                  placeholderTextColor="#999"
                  // secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                />
              </View>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="NICKNAME/APODO"
                placeholderTextColor="#999"
                // secureTextEntry={secureTextEntry}
                autoCapitalize="none"
              />
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TextInput
                  style={styles.inputMatricula}
                  value={numMatricula}
                  onChangeText={setNumMatricula}
                  placeholder="NUMERO DE MATRICULA"
                  placeholderTextColor="#999"
                  // secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                />
                <GalleryFt
                  setImage={setFtMatricula}
                  image={ftMatricula}
                  styleT={styles.inputFtMatricula}
                  />
              </View>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="CORREO ELECTRÓNICO ESPOL"
                placeholderTextColor="#999"
                // secureTextEntry={secureTextEntry}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="CONTRASEÑA"
                placeholderTextColor="#999"
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={confPassword}
                onChangeText={setConfPassword}
                placeholder="CONFIRME CONTRASEÑA"
                placeholderTextColor="#999"
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <DateInputSimple 
                    value={fechNa}
                    onChange={setFechNa}
                    placeholder='Fecha de nacimiento'
                    />
            </View>
          </ScrollView>

          {/* Botón de registro */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.containerButton}>
              <Text style={styles.textButton}>REGISTRARSE</Text>
            </TouchableOpacity>
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
    padding: 10,
    width: '100%',
    height: '100%'
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
    fontSize: 35,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    color: '#333',
    fontSize: 16,
    maxWidth: 777,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 25,
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
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 1
  },
  containerButton: {
  width: '100%',
  alignItems: 'center',
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 25,
  backgroundColor: '#ff4d4d',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,
  },
  textButton: {
  fontSize: 18,
  textAlign: 'center',
  color: '#fff',
  fontWeight: 'bold',
  },
  inputPart: {
    width: '49%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    color: '#333',
    fontSize: 16,
    maxWidth: 777,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  inputMatricula: {
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    color: '#333',
    fontSize: 15,
    maxWidth: 777,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    // paddingTop: 15,
  },
  inputFtMatricula: {
    width: '24%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    color: '#333',
    fontSize: 15,
    maxWidth: 777,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center'
    // paddingTop: 15,
  }
});