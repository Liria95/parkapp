import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../utils/colors";

// Posibles estados de usuario
type UserEstado = "Estacionado" | "Saldo agotado" | string;

// Tipo para el objeto usuario
interface User {
  nombre: string;
  email: string;
  patente: string;
  saldo: number;
  estadoActual: UserEstado;
  activo: boolean;
  ubicacion?: string;
}

// Props del componente
interface UserCardProps {
  user: User;
  onPress?: (() => void) | null;
  showDetails?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function UserCard({
  user,
  onPress = null,
  showDetails = true,
  style = {},
}: UserCardProps) {
  const getStatusColor = (): string => {
    if (user.estadoActual === "Estacionado") return COLORS.warning;
    if (user.estadoActual === "Saldo agotado") return COLORS.danger;
    if (!user.activo) return COLORS.gray;
    return COLORS.success;
  };

  const getStatusIcon = (): string => {
    if (user.estadoActual === "Estacionado") return "🚗";
    if (user.estadoActual === "Saldo agotado") return "⚠️";
    if (!user.activo) return "😴";
    return "✅";
  };

  return (
    <TouchableOpacity
      style={[styles.container, { opacity: user.activo ? 1 : 0.7 }, style]}
      onPress={onPress || undefined}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.nombre}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
        </View>
      </View>

      {showDetails && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🚗 Patente:</Text>
            <Text style={styles.detailValue}>{user.patente}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>💰 Saldo:</Text>
            <Text
              style={[
                styles.detailValue,
                { color: user.saldo > 0 ? COLORS.success : COLORS.danger },
              ]}
            >
              ${user.saldo.toFixed(2)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Estado:</Text>
            <Text style={[styles.detailValue, { color: getStatusColor() }]}>
              {user.estadoActual}
            </Text>
          </View>

          {user.ubicacion && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📍 Ubicación:</Text>
              <Text style={styles.detailValue}>{user.ubicacion}</Text>
            </View>
          )}
        </View>
      )}

      {onPress && (
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>Ver detalles →</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.gray + "20",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusContainer: {
    alignItems: "center",
  },
  statusIcon: {
    fontSize: 20,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.gray,
    flex: 1,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.dark,
    flex: 1,
    textAlign: "right",
  },
  actionContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
