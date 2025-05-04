import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/components/Themed/ContextTheme';
import React from 'react';

export default function NotFoundScreen() {
  const { theme } = useTheme(); // Usamos el ThemeContext

  // Colores basados en el tema
  const backgroundColor = theme.name === 'light' ? '#fff' : '#333';
  const textColor = theme.name === 'light' ? '#000' : '#fff';
  const linkColor = theme.name === 'light' ? '#1a73e8' : '#4da8ff'; // Color del enlace (azul claro/oscuro)

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={StyleSheet.flatten([styles.container, { backgroundColor }])}>
        <Text style={[styles.title, { color: textColor }]}>
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.linkText, { color: linkColor }]}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});