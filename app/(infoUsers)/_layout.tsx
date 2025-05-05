import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';



export default function RootLayout() {

return (
    <Stack>
        <Stack.Screen name="[info]"/>
    </Stack>
);
}