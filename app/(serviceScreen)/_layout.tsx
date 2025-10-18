import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/components/Themed/ContextTheme';
import { ThemeProvider } from '@/hooks/useContextTheme';

export default function Layout() {
  const { theme } = useTheme(); // theme es directamente 'light' o 'dark'

  const backgroundColor = theme.name === 'light' ? '#fff' : '#333';
  const headerTintColor = theme.name === 'light' ? '#000' : '#fff'; // Color del texto del header
  const headerBackgroundColor = theme.name === 'light' ? '#f0f0f0' : '#444'; // Fondo del header

  return (
    <ThemeProvider>
        
    <View style={[styles.container, { backgroundColor }]}>
      <Stack>
        <Stack.Screen
          name="createRouteDriver"
          options={{headerShown: true, title: 'Crea tu viaje'}}
          
          />
        <Stack.Screen
          name="viajes"
          options={{headerShown: true, title: 'Viajes'}}
          />
        <Stack.Screen
          name="send"
          options={{headerShown: false}}
          />
      </Stack>
    </View>
</ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});