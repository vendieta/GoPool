// import { View, Text, StyleSheet } from 'react-native';
// import CustomButton from '../../components/ui/ButtonSimple'; // Importamos el nuevo componente
// import { useTheme, lightTheme, darkTheme } from '@/components/Themed/ContextTheme';

// const Themes = () => {
//   const { theme, setTheme } = useTheme(); // Obtenemos el tema actual y la función para cambiarlo

//   // Funciones para cambiar el tema
//   const switchToLight = () => setTheme(lightTheme);
//   const switchToDark = () => setTheme(darkTheme);

//   return (
//     <View style={[styles.container, { backgroundColor: theme.name === 'light' ? '#fff' : '#333' }]}>
//       <Text style={[styles.title, { color: theme.name === 'light' ? '#000' : '#fff' }]}>
//       Selecciona un tema
//       </Text>
//       <View style={styles.buttonContainer}>
//       <CustomButton
//       title="Tema Claro"
//       onPress={switchToLight} // Aquí está el onPress funcionando
//       style={[styles.button, { backgroundColor: theme.name === 'light' ? '#ddd' : '#555' }]}
//       textStyle={{ color: theme.name === 'light' ? '#000' : '#fff' }}
//       />
//       <CustomButton
//       title="Tema Oscuro"
//       onPress={switchToDark} // Aquí también
//       style={[styles.button, { backgroundColor: theme.name === 'dark' ? '#ddd' : '#555' }]}
//       textStyle={{ color: theme.name === 'light' ? '#000' : '#fff' }}
//       />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'column',
//     gap: 15,
//     width: '80%',
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
// });

// export default Themes;