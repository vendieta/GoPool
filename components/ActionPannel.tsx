import { useState } from "react";
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../components/Themed/ContextTheme";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Props {
  region: Coordinate;
  confCoordinate: (data: "startPoint" | "endPoint" | "menu") => void;
}

export default function ActionPannel(data: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const [controler, setControler] = useState('startPoint');
  
  const [startPoint, setStartPoint] = useState<string>('     ');
  const [endPoint, setEndPoint] = useState<string>('     ');
  
  const pointStart = (x: Coordinate) => {
    data.confCoordinate('startPoint');
    setControler('menu');
    setStartPoint(data.region.longitude.toString());
  };
  
  const pointEnd = (x: Coordinate) => {
    data.confCoordinate('endPoint');
    setControler('menu');
    setEndPoint(data.region.longitude.toString());
  };

  const send = () => {
    router.push("/send");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {controler === 'startPoint' ? 
        <>
          <Text style={[styles.text, { color: theme.text }]}>Punto de origen</Text>
          <Text style={[styles.ubi, { backgroundColor: theme.subtleBackground }, { color: theme.text }]}>
            {data.region.longitude}
          </Text>
    
          <Pressable onPress={() => pointStart(data.region)}>
            <Text style={[styles.button, { backgroundColor: theme.accent }]}>
              Confirmar
            </Text>
          </Pressable>
        </> : controler === 'menu' ? 
        <>
          <Text style={{ color: theme.text }}>Tu ubicacion</Text>
          <Pressable onPress={() => setControler('startPoint')}>
            <Text style={[styles.ubi, { backgroundColor: theme.subtleBackground }, { color: theme.text }]}>
              {startPoint}
            </Text>
          </Pressable>
        
          <Text style={{ color: theme.text }}>Tu destino</Text>
          <Pressable onPress={() => setControler('endPoint')}>
            <Text style={[styles.ubi, { backgroundColor: theme.subtleBackground }, { color: theme.text }]}>
              {endPoint}
            </Text>
          </Pressable>

          <TouchableOpacity onPress={send}>
            <Text style={[styles.plus, { backgroundColor: theme.buttonBackground }]}>
              Aceptar
            </Text>
          </TouchableOpacity>

        </> : controler === 'endPoint' ?
        <>
          <Text style={[styles.text, { color: theme.text }]}>Punto de destino</Text>
          <Text style={[styles.ubi, { backgroundColor: theme.subtleBackground }]}>
            {data.region.longitude}
          </Text>
    
          <Pressable onPress={() => pointEnd(data.region)}>
            <Text style={[styles.button, { backgroundColor: theme.accent }]}>
              Confirmar
            </Text>
          </Pressable>
        </> : 
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 25,
    position: 'absolute',
    width: '100%',
    height: 'auto',
    bottom: 0,
    alignItems: 'center'
  },
  text: {
    margin: 10,
    textAlign: 'center'
  },
  ubi: {
    width: '80%',
    padding: 2,
    margin: 2,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 5
  },
  button: {
    margin: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    color: 'white'
  },
  plus: {
    padding: 10,
    borderRadius: 100,
    marginTop: 15,
    color: 'white',
    textAlign: 'center',
    minWidth: 100
  }
});