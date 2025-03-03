// import type {
//   SignInWithPasswordCredentials,
//   SignUpWithPasswordCredentials,
// } from '@supabase/supabase-js'
// import { useState } from 'react';
// import { View , Button , StyleSheet , Alert } from 'react-native';

// interface AuthFormProps {
//   onSignUp: (credentials: SignUpWithPasswordCredentials) => void;
//   onLogin: (Credential: SignInWithPasswordCredentials) => void;
//   loading: boolean;
//   mode: 'login' | 'signUp';
//   email: string;
//   password: string;
// };

// export default function AuthForm( {
//   onSignUp,
//   onLogin,
//   loading,
//   mode,
//   email,
//   password,
// } : AuthFormProps)  {
//   // const [ username , serUsername ] = useState('');
  
//   const handleLogin = async (Credentials: SignInWithPasswordCredentials) => {
//     if (!('email' in Credentials)) return;
//     setLoading(true);
//     const { email , password } = Credentials;
//     const { error , data } = await supabase.auth.signInWithPassword({ email , password });

//     if (error) Alert.alert(error.message);

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


  
//   // const handleSubmit = () => {
//   //   if (mode === 'login') {
//   //     onLogin({ email , password });
//   //   } else {
//   //     onSignUp({ email , password , options:{ data : { username } } } );
//   //   };
//   // };
  
//   return(
//       <Button
//         // style= {styles.container}
//         title={mode === 'login' ? 'Iniciar sesion' : 'Regsitrarse'}
//         onPress={() => {mode === 'login' ? onLogin : onSignUp}}
//         disabled={ loading || !email || !password }
//       />
//   )
// };

// const styles = StyleSheet.create({
//   container:{

//   }
// })