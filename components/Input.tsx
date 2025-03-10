import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';

interface InputComponenteProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputComponenteProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
});

export default Input;




// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';

// interface Props {
//   element: string;
// };

// export default function Input( {element}: Props) {
//   const [text, setText] = useState('');
//   const [labelPosition, setLabelPosition] = useState(new Animated.Value(13)); // Inicializamos la posición de la etiqueta
//   const [labelPadding, setLabelPadding] = useState(new Animated.Value(10)); // Inicializamos el padding de la etiqueta

//   useEffect(() => {
//     if (text.length > 0) {
//       // Si hay texto, animamos la etiqueta hacia arriba
//       Animated.timing(labelPosition, {
//         toValue: -25,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();

//       Animated.timing(labelPadding, {
//         toValue: 2,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     } else {
//       // Si no hay texto, devolvemos la etiqueta a su posición original
//       Animated.timing(labelPosition, {
//         toValue: 13,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();

//       Animated.timing(labelPadding, {
//         toValue: 10,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [text]);

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={text}
//         onChangeText={setText}
//         placeholder=""
//         placeholderTextColor="transparent"
//       />
//       <Animated.Text
//         style={[
//           styles.label,
//           { top: labelPosition, paddingLeft: labelPadding }
//         ]}
//       >
//         {element}
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     gap: 1,
//     position: 'relative',
//     color: 'white',
//   },
//   label: {
//     fontSize: 15,
//     position: 'absolute',
//     pointerEvents: 'none',
//     color: 'white',
//   },
//   input: {
//     width: 200,
//     height: 45,
//     borderWidth: 0,
//     borderRadius: 6,
//     color: '#fff',
//     fontSize: 15,
//     backgroundColor: 'transparent',
//     paddingLeft: 7,
//     paddingRight: 7,
//     shadowColor: '#000',
//     shadowOffset: { width: 4, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 15,
//     elevation: 5,
//   },
// });
