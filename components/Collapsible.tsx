import { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // Estado para manejar el color del texto al presionar
  const theme = useColorScheme() ?? 'light';

  // Animación para el despliegue del contenido
  const [fadeAnim] = useState(new Animated.Value(0)); // Valor inicial de opacidad: 0 (invisible)

  useEffect(() => {
    if (isOpen) {
      // Animación de desvanecimiento al abrir con retraso
      Animated.timing(fadeAnim, {
        toValue: 1, // Opacidad final: 1 (visible)
        duration: 300, // Duración de la animación: 300ms
        delay: 200, // Retraso de 200ms antes de que comience la animación
        useNativeDriver: true, // Usar el driver nativo para mejor rendimiento
      }).start();
    } else {
      // Al cerrar, la opacidad vuelve a 0 inmediatamente
      fadeAnim.setValue(0);
    }
  }, [isOpen, fadeAnim]);

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        onPressIn={() => setIsPressed(true)} // Cambia el color al presionar
        onPressOut={() => setIsPressed(false)} // Vuelve al color original al soltar
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={30}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText
          type="defaultSemiBold"
          style={[styles.title, { color: isPressed ? '#666' : '#000' }]} // Color cambia al presionar
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ThemedView style={styles.innerContent}>{children}</ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // Fondo blanco explícito
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 0.7,
    borderColor: '#f5f5f5',
    borderStyle: 'solid',
    paddingVertical: 10,
    backgroundColor: '#fff', // Fondo blanco para el encabezado
  },
  content: {
    marginBottom: 10,
    backgroundColor: '#fff', // Fondo blanco para el contenedor animado
  },
  innerContent: {
    backgroundColor: '#fff', // Fondo blanco explícito para el contenido interno
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
});