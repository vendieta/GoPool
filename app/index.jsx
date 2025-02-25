import { Redirect } from "expo-router";


const isAuthenticated = false;

export default function Index(){
  if (isAuthenticated) {
    return <Redirect href={'./(tabs)'}/>
  } else {
    return <Redirect href={'./(sesionScreen)'}/>
  };
};

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