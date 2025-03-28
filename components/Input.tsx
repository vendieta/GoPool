import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  element: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Input({ element, value, onChangeText, secureTextEntry = false }: Props) {
  const [labelPosition, setLabelPosition] = useState(new Animated.Value(13));
  const [labelPadding, setLabelPadding] = useState(new Animated.Value(10));

  useEffect(() => {
    if (value.length > 0) {
      Animated.timing(labelPosition, {
        toValue: -25,
        duration: 300,
        useNativeDriver: false, // Cambio a false para soportar top
      }).start();

      Animated.timing(labelPadding, {
        toValue: 2,
        duration: 300,
        useNativeDriver: false, // Ya estaba en false, lo mantengo
      }).start();
    } else {
      Animated.timing(labelPosition, {
        toValue: 13,
        duration: 300,
        useNativeDriver: false, // Cambio a false para soportar top
      }).start();

      Animated.timing(labelPadding, {
        toValue: 10,
        duration: 300,
        useNativeDriver: false, // Cambio a false para consistencia
      }).start();
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder=""
        placeholderTextColor="transparent"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      <Animated.Text
        style={[styles.label, { top: labelPosition, paddingLeft: labelPadding }]}
      >
        {element}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 1,
    position: 'relative',
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    position: 'absolute',
    pointerEvents: 'none',
    color: '#666',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: '#333',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    paddingLeft: 15,
    paddingRight: 15,
  },
});