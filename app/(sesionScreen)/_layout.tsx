import { Stack } from "expo-router"

export default function layout() {
    return(
        <Stack>
            <Stack.Screen name="createCount" options={{ 
            headerShown: false,
            headerLeft: () => null, // Pasar una función que retorne 
            gestureEnabled: false, // Deshabilitar gesto de retroceso en 
            }}/>
            <Stack.Screen name="sesionOff" options={{title:'Estado de cuenta'}}/>
            <Stack.Screen name="sesionOn" options={{title:'buy'}}/>
            <Stack.Screen name="pageInicial" options={{title:'Configuraciones'}}/>
        </Stack>
    )
}