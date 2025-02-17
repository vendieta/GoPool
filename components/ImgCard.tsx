import { View , StyleSheet } from "react-native";
import React from "react";
import { PropsRef } from "react-native-gesture-handler/lib/typescript/web/interfaces";
import { PropsWithChildren , ReactElement } from "react";
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = PropsWithChildren<{
  img: ReactElement;
  color: string;
}>;

export default function ImgCard({ children , img , color  } : Props) {
  const colorScheme = useColorScheme() ?? 'light';
  console.log('el color de fondo: ', color)
  return(
    <View style={[styles.container,{backgroundColor: color}]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '80%',
    margin: 'auto',
    borderRadius: 35,
    padding: 50,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 25
  },

  }
)