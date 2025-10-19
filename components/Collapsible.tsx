import { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, Text } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
import { useTheme } from '@/components/Themed/ContextTheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { theme } = useTheme();
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

  // Colores basados en el tema
  const isLightTheme = theme.name === 'light';
  const backgroundColor = isLightTheme ? '#fff' : '#2a2a2a';
  const iconColor = isLightTheme ? '#666' : '#aaa';
  const backgroundCollapsible = isLightTheme ? '#f5f5f5' : '#121212';
  const textColor = isPressed
    ? (isLightTheme ? theme.primary : '#ddd')
    : (isLightTheme ? '#333' : '#fff');
  const pressedBackground = isLightTheme ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)';

  return (
    <View style={[styles.container, { backgroundColor: backgroundCollapsible }]}>
      <TouchableOpacity
        style={[
          styles.heading,
          { 
            backgroundColor: isPressed ? pressedBackground : 'transparent',
            borderRadius: 12,
          }
        ]}
        onPress={() => setIsOpen((value) => !value)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={24}
          weight="medium"
          color={iconColor}
          style={[
            styles.icon,
            { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }
          ]}
        />
        <Text style={[styles.title, { color: textColor }]}>
          {title}
        </Text>
      </TouchableOpacity>
      
      {isOpen && (
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.innerContent}>
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
    
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
    transitionDuration: '300ms',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  innerContent: {
    paddingHorizontal: 16,
  },
});

export default Collapsible;