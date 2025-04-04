import { useState, useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import { Alert, Button, View, Text , StyleSheet} from "react-native";
import ImgCard from "@/components/ImgCard";
import Input from "@/components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage


export default function createCountU() {
  const router = useRouter(); // Hook para la navegación en Expo Router
  const mode = "login";
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [session, setSession] = useState<Session|null>(null);

  useEffect(() => {
    // Al iniciar, verificamos si hay una sesión persistente
    const checkSession = async () => {
      const savedSession = await AsyncStorage.getItem("session");
      if (savedSession) {
       
      }
    };
    checkSession();
  }, []);

  


  
  return (
    <ImgCard color="#212121" img={require("@/assets/images/partial-react-logo.png")}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>INICIE SESION</Text>
        <Input 
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="Introduce tu correo"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Introduce tu password"
          secureTextEntry // Para ocultar la contraseña
        />
        <Button
          title={mode === "login" ? "Iniciar sesión" : "Registrarse"}
          disabled={loading || !email || !password}
        />
      </View>
    </ImgCard>
  );
}







// import { View , Text , StyleSheet, Alert , Button} from "react-native";
// import ImgCard from "@/components/ImgCard";
// import Input from "@/components/Input";
// import { useState } from "react";
// import { supabase } from "@/supabaseClient";
// import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

// export default function createCountU(){
//   const mode = 'login'
//   const [ controler , setControler ] = useState('home')
//   const [ loading , setLoading ] = useState(false)
//   const [ email , setEmail] = useState<string>('');
//   const [ password, setPassword] = useState<string>('');
  
//   const manejarCambioEmail = (nuevoValor: string) => {
//     setEmail(nuevoValor);  // Aquí actualizas el estado del email
//   };
  
//   const manejarCambioPassword = (nuevoValor: string) => {
//     setPassword(nuevoValor);  // Aquí actualizas el estado de la contraseña
//   };
//   console.log(email)
//   console.log(password)
  

//   const handleLogin = async (Credentials: SignInWithPasswordCredentials) => {
//     if (!('email' in Credentials)) return;
//     setLoading(true);
//     const { email , password } = Credentials;
//     const { error , data } = await supabase.auth.signInWithPassword({ email , password });

//     if (error) {
//       Alert.alert(error.message);
//     } else {
//       console.log('Usuario autenticado:', data.session);
//       // Aquí podrías redirigir al usuario a la página principal
//     }

//     console.log(data);
//     setLoading(false);
//   }

//   const handleSignup = async (Credentials: SignInWithPasswordCredentials) => {
//     if (!('email' in Credentials)) return;
//     setLoading(true);
//     const { email , password } = Credentials;
//     const { error , data } = await supabase.auth.signUp({ email , password });

//     if (error) Alert.alert(error.message);

//     console.log(data);
//     setLoading(false)
//   }

// // el onpress dentro de un un button sera despues de que la app se lance al mundo porque principalmente
// //  ahorita no es viable por la navegacion 
//   return(
//     <ImgCard 
//       color="#212121"
//       img={require('@/assets/images/partial-react-logo.png')}
//     >   
//     <View style={styles.containerText}>
//       <Text style={styles.text}>INICIE SESION</Text>
//     </View>
//     <View style={styles.containerInput}>
//       <Input          
//         label="Correo Electrónico"
//         value={email}
//         onChangeText={manejarCambioEmail}
//         placeholder="Introduce tu correo"

//         />
//       <Input
//         label="password"
//         value={password}
//         onChangeText={manejarCambioPassword}
//         placeholder="Introduce tu password"
//         />
//     </View>
//         <Button
//             // style= {styles.container}
//             title={mode === 'login' ? 'Iniciar sesion' : 'Regsitrarse'}
//             onPress={() => mode === 'login' ? handleLogin({ email, password }) : handleSignup({ email, password })}
//             disabled={ loading || !email || !password }
//           />
    

//     </ImgCard>
//   );
// };

const styles= StyleSheet.create({
  containerText:{

  },
  containerInput:{
    flexDirection: 'column',
    gap: 30,
  },
  text:{
    fontSize: 30,
    color: 'white'
  }
})