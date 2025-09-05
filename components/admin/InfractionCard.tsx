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

// Tipos para estado de infracción
type InfractionStatus = "pagada" | "vencida" | "pendiente";

// Tipo para una infracción
interface Infraction {
  id: number | string;
  fecha: string;
  usuario: string;
  patente: string;
  ubicacion: string;
  motivo: string;
  monto: number;
  estado: InfractionStatus;
}

// Props del componente
interface InfractionCardProps {
  infraction: Infraction;
  onPress?: (() => void) | null;
  onManage?: (() => void) | null;
  showActions?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function InfractionCard({
  infraction,
  onPress = null,
  onManage = null,
  showActions = true,
  style = {},
}: InfractionCardProps) {
  const getStatusColor = (): string => {
    if (infraction.estado === "pagada") return COLORS.success;
    if (infraction.estado === "vencida") return COLORS.danger;
    return COLORS.warning;
  };

  const getStatusIcon = (): string => {
    if (infraction.estado === "pagada") return "✅";
    if (infraction.estado === "vencida") return "❌";
    return "🚨";
  };

  const getStatusText = (): string => {
    if (infraction.estado === "pagada") return "PAGADA";
    if (infraction.estado === "vencida") return "VENCIDA";
    return "PENDIENTE";
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            infraction.estado === "pagada"
              ? COLORS.success + "10"
              : COLORS.danger + "10",
          borderLeftColor: getStatusColor(),
        },
        style,
      ]}
      onPress={onPress || undefined}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.infractionInfo}>
          <Text style={[styles.infractionId, { color: getStatusColor() }]}>
            {getStatusIcon()} Infracción #{infraction.id}
          </Text>
          <Text style={styles.infractionDate}>{infraction.fecha}</Text>
        </View>

        <View
          style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
        >
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>👤 Usuario:</Text>
          <Text style={styles.detailValue}>{infraction.usuario}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>🚗 Patente:</Text>
          <Text style={styles.detailValue}>{infraction.patente}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>📍 Ubicación:</Text>
          <Text style={styles.detailValue}>{infraction.ubicacion}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>⚖️ Motivo:</Text>
          <Text style={styles.detailValue}>{infraction.motivo}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>💰 Monto:</Text>
          <Text style={[styles.detailValue, styles.amount]}>
            ${infraction.monto.toFixed(2)}
          </Text>
        </View>
      </View>

      {showActions && infraction.estado === "pendiente" && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={onManage || onPress || undefined}
          >
            <Text style={styles.manageButtonText}>Gestionar</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    borderLeftWidth: 4,
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
    marginBottom: 15,
  },
  infractionInfo: {
    flex: 1,
  },
  infractionId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infractionDate: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  details: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.gray,
    flex: 1,
  },
  detailValue: {
    fontSize: 12,
    color: COLORS.dark,
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
  amount: {
    fontWeight: "bold",
    color: COLORS.danger,
    fontSize: 14,
  },
  actionContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
    alignItems: "flex-end",
  },
  manageButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  manageButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
