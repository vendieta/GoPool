import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || ''}
            placeholderTextColor="#999"
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
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
    color: '#666',
    marginBottom: 5,
    marginLeft: 10,
  },
});