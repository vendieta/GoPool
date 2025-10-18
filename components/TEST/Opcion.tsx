import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/components/Themed/ContextTheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface OptionCardProps {
  link: any;
  title: string;
  icon: string;
  description: string;
  color: string;
  isLightTheme: boolean;
  actionText: string;
}

const OptionCard = ({
  link,
  title,
  icon,
  description,
  color,
  isLightTheme,
  actionText
}: OptionCardProps) => (
  <View style={[styles.optionWrapper, { backgroundColor: isLightTheme ? '#fafafaff' : '#2a2a2a' }]}>
    <Link href={link} asChild>
      <TouchableOpacity style={{ ...styles.optionCard}}>
        <View style={{
          ...styles.iconContainer,
          backgroundColor: `${color}15`,
          borderColor: color
        }}>
          <FontAwesome5 name={icon as any} size={26} color={color} />
        </View>
        
        <View style={styles.textContent}>
          <Text style={{ ...styles.optionTitle, color }}>{title}</Text>
          <Text style={{ ...styles.optionDescription, color: isLightTheme ? '#666' : '#aaa' }}>
            {description}
          </Text>
          
          <View style={{ ...styles.tagContainer, backgroundColor: `${color}20` }}>
            <Text style={{ ...styles.tagText, color }}>{actionText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  </View>
);

export default function Opcion({ element, element1 }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme.name === 'light';

  return (
    <View style={styles.mainContainer}>
      <OptionCard
        {...element}
        isLightTheme={isLightTheme}
        actionText="Ver viajes"
      />
      
      <View style={[styles.separator, { 
        backgroundColor: isLightTheme ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)' 
      }]} />
      
      <OptionCard
        {...element1}
        isLightTheme={isLightTheme}
        actionText="Ofrecer viaje"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  optionWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  optionCard: {
    flexDirection: 'row',
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
    borderWidth: 2,
  },
  textContent: {
    flex: 1,
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
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
  },
});