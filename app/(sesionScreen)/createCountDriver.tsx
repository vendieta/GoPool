import { View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import DateInputSimple from '@/components/InputDate';
import GalleryFt from '@/components/imgs/GalleryFt';
import { useRouter } from 'expo-router';
import LoadingOverlay from '@/components/loading/LoadingOverlay';
// import * as FileSystem from "expo-file-system";
import { numberCheck } from '@/scripts/numberCheck';
import useStorage from '@/hooks/useStorage';
import FileSystem from 'expo-file-system';



const { width, height } = Dimensions.get('window');

interface RegisterFrom {
  success: boolean,
  user: {
    email: string | undefined,
    password: string | undefined,
    metadata: {
      nombre: string | undefined,
      usuario: string | undefined,
      lastName: string | undefined,
      numMatricula: string | undefined,
      fechanacimiento: string | undefined,  // Opcional
      fotomatricula: string | undefined, // Opcional
      fotoDriver: string | undefined,
      fotoLicencia: string | undefined,
      numeroLicencia: string | undefined
      }
  };
};

interface url {
  success: string,
	uploadUrl: string,
	publicUrl: string
};

interface img {
    img: string| null| undefined,
    uri: string,
    name: string | undefined | null ,
    type?: string
};

// async function persistImage(uri: string) {
//   const fileName = uri.split("/").pop();
//   // error ignorable
//   const newPath = `${FileSystem.documentDirectory}${fileName}`;

//   await FileSystem.copyAsync({
//     from: uri,
//     to: newPath,
//   });

//   return newPath; // usa esta ruta para subir
// }
async function persistImage(uri?: string) {
  if (!uri) {
    console.warn("⚠️ No se proporcionó ninguna URI de imagen");
    return null;
  }

  try {
    const fileName = uri.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: uri,
      to: newPath,
    });

    console.log("✅ Imagen persistida en:", newPath);
    return newPath;
  } catch (error) {
    console.error("❌ Error al copiar la imagen:", error);
    return null;
  }
}


export default function CreateCountUser() {
  const router = useRouter();
  const { data, loading, error, post } = useApi<RegisterFrom>();
  const { data: dataUrl, loading: loadingUrl, error: errorUrl, post : postUrl } = useApi<url>();
  const { data: dataUrl2, loading: loadingUrl2, error: errorUrl2, post : postUrl2 } = useApi<url>();
  const [ userName, setUserName ] = useState<string>();
  const [ name, setName ] = useState<string | undefined>();
  const [ lastName, setLastName ] = useState<string | undefined>();
  const [ email, setEmail ] = useState<string | undefined>();
  const [ password, setPassword ] = useState<string | undefined>();
  const [ fechNa, setFechNa ] = useState<string | undefined>();
  const [ number, setNumber ] = useState<string | undefined>();
  const [ numMatricula, setNumMatricula ] = useState<string | undefined>();
  const [ ftMatricula, setFtMatricula ] = useState<img>();
  const [ ftLicencia, setFtLicencia ] = useState<img>();
  const [ numLicencia, setNumLicencia ] = useState<string | undefined>();
  const [ confPassword, setConfPassword ] = useState<string | undefined>();
  const [ modal, setModal ] = useState<boolean>(false);
  const [ wait, setWait ] = useState<boolean>(false);
  const [ localUri, setLocalUri ] = useState<string | null>();
  const [ localUri2, setLocalUri2 ] = useState<string | null>();
  const {
    storedValue: access_token,
    setItem: setAccess_token,
  } = useStorage('access_token');

useEffect(() => {
  const save = async () => {
    if (!ftMatricula?.uri || !ftLicencia?.uri) {
      console.warn("⚠️ Faltan imágenes (matrícula o licencia) antes de guardar");
      return;
    }

    try {
      const localUri = await persistImage(ftMatricula.uri);
      const localUri2 = await persistImage(ftLicencia.uri);

      setLocalUri(localUri);
      setLocalUri2(localUri2);
    } catch (error) {
      console.error("❌ Error al persistir las imágenes:", error);
    }
  };

  save();
}, [ftLicencia, ftMatricula]);

  const add = async () => {
    if (!userName || !name || !lastName || !email || !password || !confPassword || !fechNa || !numMatricula || !ftMatricula || !ftLicencia || !numLicencia || !number) {
      return Alert.alert("Error", "Por favor complete todos los campos.");
    }
    console.log('😎😎😎😎😎😎se estan extrayendo las url');
    const dataUrl = await postUrl('/api/s3/upload-url', {
      fileName: `MATRICULAS/${name}_${lastName}-${numMatricula}-${ftMatricula?.name}`,
      fileType: ftMatricula?.type 
    },{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      });
    const dataUrl2 = await postUrl2('/api/s3/upload-url', {
      fileName: `LICENCIAS/${name}_${lastName}-${numLicencia}-${ftLicencia?.name}`,
      fileType: ftMatricula?.type
    },{ 
        headers: { Authorization: `Abduzcan ${access_token}` }
      });
      console.log('URL 😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️', dataUrl);
      console.log('URL 😶‍🌫️😶‍🌫️', dataUrl2);
      setModal(true);
    };

  
  const send = async() => {
    if (wait) return; // evita múltiples ejecuciones
    setWait(true);
    // Validaciones previas
    if (!userName || !localUri || !localUri2 || !name || !lastName || !email || !password || !confPassword || !fechNa || !numMatricula || !ftMatricula || !ftLicencia || !numLicencia || !number) {
      setWait(false);
      setModal(false);
      return Alert.alert("Error", "Por favor complete todos los campos.");
    };
    // Validar dominio del correo
    if (!email.endsWith("@espol.edu.ec")) {
      setWait(false);
    setModal(false);
      return Alert.alert("Correo inválido", "El correo debe pertenecer al dominio @espol.edu.ec");
    };
    if (!numberCheck(number)) {
      setWait(false);
      setModal(false);
      return Alert.alert("Ingrese un numero de telefono valido");
    };
    // Validar coincidencia de contraseñas
    if (password !== confPassword) {
      setWait(false);
      setModal(false);

      return Alert.alert("Contraseña incorrecta", "Las contraseñas no coinciden.");
    };
    if (!dataUrl || !dataUrl2) {
      setModal(false);
      setWait(false);
      return Alert.alert("Estamos teniendo problemas porfavor intentelo mas tarde");
    };
      

    try {
        const fileUri = ftMatricula?.uri
        const fileUri2 = ftLicencia?.uri
        // console.log('1')
        // const base64 = await FileSystem.readAsStringAsync(fileUri, {
        //   encoding: FileSystem.EncodingType.Base64,
        // });
        // console.log('2')
        // const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {
        //   type: ftMatricula?.type || "image/jpeg",
        // });
        // console.log('3')

        console.log(fileUri,fileUri2)
        const response = await fetch(localUri);
        const response2 = await fetch(localUri2);
        console.log('subir la img')
        const blob = await response.blob();
        const blob2 = await response2.blob();
        await fetch(`${dataUrl?.uploadUrl}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'image/jpeg',
          } ,
          body: blob,
          });
        await fetch(`${dataUrl2?.uploadUrl}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'image/jpeg',
          } ,
          body: blob2,
          });
        console.log('se envio el dato biene')

        await post('/api/auth/register-driverform', {
          email: email.trim(),
          password: password.trim(),
          metadata: {
            nombre: name.trim(),
            usuario: userName.trim(),
            lastname: lastName.trim(),
            nummatricula: numMatricula.trim(),
            fechanacimiento: fechNa.trim(),
            fotomatricula: dataUrl.publicUrl,
            fotodriver: "null",
            fotolicencia: dataUrl2.publicUrl,
            numeroLicencia: numLicencia?.trim(),
            numeroTelefono: numberCheck(number)
        }
    });

    } catch (err) {
        console.log("Error creando cuenta:", err);
        console.log('error del post',error)
        Alert.alert("Error", "No se pudo registrar la cuenta.");
    } finally {
      setWait(false);
      setModal(false);
    };
  
    console.log(error)
    console.log('esta es la data que se guarda: ', data)
};

  useEffect(() => {
    if (data && data.success) {
      router.replace('/');
    }
  }, [data])

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
    
            <View style={{ height: '100%', maxWidth: 600,  paddingTop: 25, paddingHorizontal: 5}}>
              {/* Encabezado */}
                
              <View style={styles.header}>
                <Text style={styles.title}>CREA TU CUENTA</Text>
                <Text style={styles.subtitle}>USUARIO ESPOL</Text>
              </View>

              {/* Inputs */}
              <View style={styles.inputsContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%',}}>
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
                    keyboardType= 'phone-pad'
                    onChangeText={setNumMatricula}
                    placeholder="NUMERO DE MATRICULA"
                    placeholderTextColor="#999"
                    // secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                    />
                  <GalleryFt
                    text='foto del carnet estudiantil'
                    setImage={(x: img) => setFtMatricula(x)}
                    image={ftMatricula}
                    styleT={styles.inputFtMatricula}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                  <TextInput
                    style={styles.inputMatricula}
                    value={numLicencia}
                    onChangeText={setNumLicencia}
                    placeholder="NUMERO DE LICENCIA"
                    placeholderTextColor="#999"
                    // secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                    />
                  <GalleryFt
                    text='Foto de licencia'
                    setImage={(x: img) => setFtLicencia(x)}
                    image={ftLicencia}
                    styleT={styles.inputFtMatricula}
                    />
                </View>
                <TextInput
                  style={styles.input}
                  value={number}
                  onChangeText={setNumber}
                  placeholder="Numero de whatssap"
                  keyboardType= 'phone-pad'
                  placeholderTextColor="#999"
                  // secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                  />
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
            {/* Botón de registro */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.containerButton, wait && { opacity: 0.6 }]} onPress={add} disabled={wait}>
                <Text style={styles.textButton}>REGISTRARSE</Text>
              </TouchableOpacity>
            </View>
              </View>
            </View>
          </ScrollView>
          <Modal
            transparent
            animationType="fade"
            visible={modal}
            onRequestClose={ () => setModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModal(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={{marginBottom: 15,fontSize: 16, textAlign: 'center'}}>¿Estás seguro que los datos son correctos?</Text>

                <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setModal(false)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={send} disabled={wait} style={[styles.acceptButton, wait && { opacity: 0.6 }]}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                </View>
              </View>
              </TouchableWithoutFeedback>
          </View>
            </TouchableWithoutFeedback>
          </Modal>
          <LoadingOverlay visible={loading || wait}/>
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
    backgroundColor: 'rgba(37, 41, 36, 0.88)',
    padding: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center'
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  acceptButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});