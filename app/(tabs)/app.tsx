import ScrollRefresh from '@/components/ScrollRefresh';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// debo descomentar el codigo que esta en el archivo fontfaceobserver.standalone.js
{/*ESTA ES LA PANTALLLA DE INICIO SERIA COMO EL INDEX*/}

export default function HomeScreen() {
  return (
    <GestureHandlerRootView >
      <ScrollRefresh/>
    </GestureHandlerRootView>
)}