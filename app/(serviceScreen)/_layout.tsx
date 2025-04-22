import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/components/Themed/ContextTheme';

export default function Layout() {
  const { theme } = useTheme(); // theme es directamente 'light' o 'dark'

  const backgroundColor = theme.name === 'light' ? '#fff' : '#333';
  const headerTintColor = theme.name === 'light' ? '#000' : '#fff'; // Color del texto del header
  const headerBackgroundColor = theme.name === 'light' ? '#f0f0f0' : '#444'; // Fondo del header

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack>
        <Stack.Screen
          name="createRouteDriver"
          options={{
            title: 'Reportar problemas',
            headerTintColor,
            headerStyle: { backgroundColor: headerBackgroundColor },
          }}
        />
        <Stack.Screen
          name="createRouteUser"
          options={{
            title: 'Temas',
            headerTintColor,
            headerStyle: { backgroundColor: headerBackgroundColor },
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});