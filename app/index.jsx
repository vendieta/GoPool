import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";
import  { AuthProvider , useUserInfo } from '../hooks/userContext'
import { useEffect } from "react";
import LoginScreen from './(sesionScreen)/index'
import HomeScreen from './(tabs)/index'
import TabLayout from './(tabs)/_layout'


const isAuthenticated = false;

export default function Index(){
  const router = useRouter();
  const { session } = useUserInfo();
    console.log('estas esto es la sesion que no me permite pasar:',session)
    if ( session ) {
      return <HomeScreen/>
    } else {
      return  <LoginScreen/>
    };
}



// }
// import React from "react";
// import { View , Text } from "react-native";
// import { ThemedView } from '@/components/ThemedView';
// // const AppContent = () => {
// //   const user = true;
  
// //   return(
// //     <View style={{flex:1, backgroundColor:'red'}}>

// //     </View>
// //   )
// // }

// export default function App(){
//   return(
//   <View style={{flex:1, backgroundColor:'red'}}>
//     <Text>jhkjhkjhjj</Text>
//   </View>
//   );
// }