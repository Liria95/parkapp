import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colores from "../../constantes/colores";

interface OpcionMenuProps {
  titulo: string;
  icono: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function OpcionMenu({ titulo, icono, onPress }: OpcionMenuProps) {
  return (
    <TouchableOpacity style={styles.contenedor} onPress={onPress}>
      <View style={styles.iconoContainer}>
        <Ionicons name={icono} size={24} color={colores.AZUL_PRINCIPAL} />
      </View>
      <Text style={styles.texto}>{titulo}</Text>
      <Ionicons name="chevron-forward" size={24} color={colores.AZUL_PRINCIPAL} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  iconoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colores.AZUL_SECUNDARIO + "30",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  texto: {
    flex: 1,
    fontSize: 16,
    color: colores.GRIS_OSCURO,
    fontWeight: "500",
  },
});