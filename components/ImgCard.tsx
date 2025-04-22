import { View, StyleSheet } from "react-native";
import React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = PropsWithChildren<{
  img: ReactElement;
  color: string;
  
}>;

export default function ImgCard({ children, img, color }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  console.log('el color de fondo: ', color);
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 'auto',
    borderRadius: 35,
    padding: 25,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});