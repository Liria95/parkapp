import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TarjetaGradiente from "../../componentes/TarjetaGradiente";
import colores from "../../constantes/colores";

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <TarjetaGradiente colores={[colores.AZUL_SECUNDARIO, colores.VIOLETA_ACENTO]}>
        <Text style={styles.texto}>Vista PERFIL en construcción 🛠️</Text>
      </TarjetaGradiente>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  texto: {
    fontSize: 18,
    fontWeight: "bold",
    color: colores.BLANCO,
    textAlign: "center",
    padding: 20,
  },
});
