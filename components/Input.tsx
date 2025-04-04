import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label: string;
  placeholder?: string;
}

export default function Input({ 
  value, 
  onChangeText, 
  secureTextEntry = false, 
  label, 
  placeholder 
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);
  const labelOpacity = new Animated.Value(value ? 1 : 0.5);
  const labelScale = new Animated.Value(value ? 0.8 : 1);

  useEffect(() => {
    // Animación cuando el input tiene valor o está enfocado
    Animated.parallel([
      Animated.timing(labelPosition, {
        toValue: (value || isFocused) ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
        
      }),
      Animated.timing(labelOpacity, {
        toValue: (value || isFocused) ? 0 : 0.5,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelScale, {
        toValue: (value || isFocused) ? 0.8 : 1,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
  }, [value, isFocused]);

  const labelStyle = {
    transform: [
      { 
        translateY: labelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [13, -25]
        })
      },
      {
        scale: labelScale.interpolate({
          inputRange: [0.8, 1],
          outputRange: [0.8, 1]
        })
      }
    ],
    opacity: labelOpacity,
    left: 15,
    zIndex: 1,
    backgroundColor: (value || isFocused) ? '#f5f5f5' : 'transparent',
    paddingHorizontal: 4,
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || ''}
        placeholderTextColor="transparent"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Animated.Text
        style={[styles.label, labelStyle]}
      >
        {label}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    color: '#333',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  label: {
    fontSize: 14,
    position: 'absolute',
    color: '#666',
  },
});