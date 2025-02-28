import ScrollRefresh from '@/components/ScrollRefresh';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

// debo descomentar el codigo que esta en el archivo fontfaceobserver.standalone.js
{/*ESTA ES LA PANTALLLA DE INICIO SERIA COMO EL INDEX 
  expo install expo-location
  expo install react-native-maps

  */}

export default function HomeScreen() {

  return (
    // <GestureHandlerRootView >
      <ScrollRefresh/>
    // </GestureHandlerRootView>
)}