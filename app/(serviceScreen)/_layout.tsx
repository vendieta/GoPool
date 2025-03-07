import { ThemedView } from "@/components/ThemedView"
import { Stack } from "expo-router"

export default function layout() {
  return(
    <ThemedView style = {{flex : 1}} >
      <Stack>
        <Stack.Screen name="createRouteDriver" options={{title:'Reportar problemas'}}/>
        <Stack.Screen name='createRouteUser' options={{title:'Temas'}}/>
      </Stack>
    </ThemedView>
      )
}