import { Stack } from "expo-router"

export default function layout() {
    return(
        <Stack>
            <Stack.Screen name="createRouteDriver" options={{title:'Reportar problemas'}}/>
            <Stack.Screen name='createRouteUser' options={{title:'Temas'}}/>
        </Stack>
    )
}