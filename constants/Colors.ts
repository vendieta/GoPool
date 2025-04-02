/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// constants/Colors.ts
export const Colors = {
  light: {
    text: '#1E1E1E',
    background: '#FFFFFF',
    cardBackground: '#F5F5F5',
    primary: '#007AFF',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
  },
  dark: {
    text: '#F5F5F5',
    background: '#121212',
    cardBackground: '#1E1E1E',
    primary: '#0A84FF',
    border: '#383838',
    error: '#FF453A',
    success: '#30D158',
  },
};

export type ThemeColors = keyof typeof Colors.light;
