import { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/components/Themed/ContextTheme';

// Asegúrate de que Theme coincida con tu definición en ContextTheme
type Theme = 'light' | 'dark'; // Ajusta esto según tu ThemeContext

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { theme } = useTheme(); // theme es de tipo Theme
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isOpen, fadeAnim]);

  // Definimos colores basados en el tema
  const isLightTheme = theme.name === 'light'; // Esto debería funcionar si Theme es 'light' | 'dark'
  const backgroundColor = isLightTheme ? '#fff' : '#333';
  const iconColor = isLightTheme ? '#666' : '#aaa';
  const textColor = isPressed
    ? (isLightTheme ? '#444' : '#ccc')
    : (isLightTheme ? '#000' : '#fff');
  const borderColor = isLightTheme ? '#f5f5f5' : '#555';

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={30}
          weight="medium"
          color={iconColor}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <Text style={[styles.title, { color: textColor }]}>
          {title}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={[styles.innerContent, { backgroundColor }]}>
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 0.7,
    borderStyle: 'solid',
    paddingVertical: 10,
  },
  content: {
    marginBottom: 10,
  },
  innerContent: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600',
  },
});

export default Collapsible;