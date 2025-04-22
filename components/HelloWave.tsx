import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '@/components/Themed/ContextTheme';

export function HelloWave() {
  const { theme } = useTheme(); // Usamos el ThemeContext
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
      4 // Run the animation 4 times
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  // Color del texto basado en el tema
  const textColor = theme.name === 'light' ? '#000' : '#fff';

  return (
    <Animated.View style={animatedStyle}>
      <Text style={[styles.text, { color: textColor }]}>HOLA</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});