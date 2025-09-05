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

type TrendType = "up" | "down" | null;

interface DashboardCardProps {
  icon: string;
  title: string;
  value: string | number;
  subtitle?: string | null;
  color?: string;
  onPress?: (() => void) | null;
  trend?: TrendType;
  style?: StyleProp<ViewStyle>;
}

export default function DashboardCard({
  icon,
  title,
  value,
  subtitle = null,
  color = COLORS.primary,
  onPress = null,
  trend = null,
  style = {},
}: DashboardCardProps) {
  const getTrendColor = (): string => {
    if (trend === "up") return COLORS.success;
    if (trend === "down") return COLORS.danger;
    return COLORS.gray;
  };

  const getTrendIcon = (): string => {
    if (trend === "up") return "📈";
    if (trend === "down") return "📉";
    return "";
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: color }, style]}
      onPress={onPress || undefined}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color }]}>{value}</Text>
          {trend && (
            <View style={styles.trendContainer}>
              <Text style={[styles.trendIcon, { color: getTrendColor() }]}>
                {getTrendIcon()}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {onPress && <Text style={styles.tapHint}>Toca para detalles</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    minWidth: 150,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
  trendContainer: {
    marginLeft: 5,
  },
  trendIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 2,
  },
  tapHint: {
    fontSize: 8,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.7,
  },
});
