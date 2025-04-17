import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, Route } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/components/Themed/ContextTheme';

const { width } = Dimensions.get('window');

interface DataProps {
  element: {
    link: Route;
    title: string;
    icon: string;
    description: string;
    color: string;
  };
  element1: {
    link: Route;
    title: string;
    icon: string;
    description: string;
    color: string;
  };
}

export default function Opcion({ element, element1 }: DataProps) {
  const { theme } = useTheme();
  const isLightTheme = theme.name === 'light';
  const cardBackground = isLightTheme ? '#fff' : '#2a2a2a';
  const separatorColor = isLightTheme ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)';

  return (
    <View style={styles.mainContainer}>
      {/* Contenedor para la opción de pasajero */}
      <View style={[
        styles.optionWrapper,
        { backgroundColor: cardBackground }
      ]}>
        <Link href={element.link} asChild>
          <TouchableOpacity style={[
            styles.optionCard, 
            { 
              borderTopWidth: 4,
              borderTopColor: element.color
            }
          ]}>
            <View style={[
              styles.iconContainer,
              { 
                backgroundColor: element.color + '15',
                borderWidth: 2,
                borderColor: element.color
              }
            ]}>
              <MaterialIcons 
                name={element.icon as any} 
                size={26} 
                color={element.color} 
              />
            </View>
            
            <View style={styles.textContent}>
              <Text style={[
                styles.optionTitle, 
                { color: element.color }
              ]}>
                {element.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                { color: isLightTheme ? '#666' : '#aaa' }
              ]}>
                {element.description}
              </Text>
              
              <View style={[
                styles.tagContainer,
                { backgroundColor: element.color + '20' }
              ]}>
                <Text style={[
                  styles.tagText,
                  { color: element.color }
                ]}>
                  Buscar viaje
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Separador visual */}
      <View style={[styles.separator, { backgroundColor: separatorColor }]} />
      
      {/* Contenedor para la opción de conductor */}
      <View style={[
        styles.optionWrapper,
        { backgroundColor: cardBackground }
      ]}>
        <Link href={element1.link} asChild>
          <TouchableOpacity style={[
            styles.optionCard, 
            { 
              borderTopWidth: 4,
              borderTopColor: element1.color
            }
          ]}>
            <View style={[
              styles.iconContainer,
              { 
                backgroundColor: element1.color + '15',
                borderWidth: 2,
                borderColor: element1.color
              }
            ]}>
              <MaterialIcons 
                name={element1.icon as any} 
                size={26} 
                color={element1.color} 
              />
            </View>
            
            <View style={styles.textContent}>
              <Text style={[
                styles.optionTitle, 
                { color: element1.color }
              ]}>
                {element1.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                { color: isLightTheme ? '#666' : '#aaa' }
              ]}>
                {element1.description}
              </Text>
              
              <View style={[
                styles.tagContainer,
                { backgroundColor: element1.color + '20' }
              ]}>
                <Text style={[
                  styles.tagText,
                  { color: element1.color }
                ]}>
                  Ofrecer viaje
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    
  },
  optionWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 18,
    width: '100%',
    
  },
  optionCard: { 
    
    alignItems: 'center',
    backgroundColor: 'transparent',
    
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  textContent: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    marginBottom: 8,
  },
  tagContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});