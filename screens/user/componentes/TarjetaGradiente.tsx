import React, { ReactNode } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  colores: string[];
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function TarjetaGradiente({ colores, children, style }: Props) {
  return (
    <LinearGradient colors={colores} style={[styles.tarjeta, style]}>
      <View style={styles.contenido}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    borderRadius: 15,
    padding:25,
  },
  contenido: {
    alignItems: "center",
  },
});
