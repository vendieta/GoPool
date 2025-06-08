import { Stack } from "expo-router"

export default function layout() {
    return(
        <Stack>
            <Stack.Screen name="aboutUs" options={{
            title:'Quienes somos', 
            headerShown: false,
            headerLeft: () => null, // Pasar una función que retorne 
            gestureEnabled: false, // Deshabilitar gesto de retroceso en 
            }}/>
            <Stack.Screen name="accountStatement" options={{title:'Estado de cuenta'}}/>
            <Stack.Screen name="buy" options={{title:'buy'}}/>
            <Stack.Screen name="config" options={{title:'Configuraciones'}}/>
            <Stack.Screen name="credits" options={{title:'Creditos'}}/>
            <Stack.Screen name="help" options={{title:'Servicios de ayuda'}}/>
            <Stack.Screen name="problem" options={{title:'Reportar problemas'}}/>
            <Stack.Screen name='themes' options={{title:'Temas'}}/>
            <Stack.Screen name='registerCar' options={{title:'Regsitra tu auto'}}/>
            <Stack.Screen name='vehiculo' options={{title:'Vehiculos'}}/>
        </Stack>
    )
}