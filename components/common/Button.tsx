import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "../../utils/colors";

type ButtonType = "primary" | "secondary" | "danger";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

export default function Button({
  title,
  onPress,
  type = "primary",
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
  icon = null,
}: ButtonProps) {
  const getButtonStyle = (): StyleProp<ViewStyle>[] => {
    if (disabled) return [styles.buttonBase, styles.buttonDisabled, style];
    if (type === "secondary") return [styles.buttonBase, styles.buttonSecondary, style];
    if (type === "danger") return [styles.buttonBase, styles.buttonDanger, style];
    return [styles.buttonBase, styles.buttonPrimary, style];
  };

  const getTextStyle = (): StyleProp<TextStyle>[] => {
    if (disabled) return [styles.textBase, styles.textDisabled, textStyle];
    if (type === "secondary") return [styles.textBase, styles.textSecondary, textStyle];
    if (type === "danger") return [styles.textBase, styles.textPrimary, textStyle];
    return [styles.textBase, styles.textPrimary, textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={type === "secondary" ? COLORS.primary : COLORS.white}
        />
      ) : (
        <>
          {icon && <Text style={[styles.icon, getTextStyle()]}>{icon}</Text>}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    flexDirection: "row",
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray + "50",
  },
  textBase: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  textPrimary: {
    color: COLORS.white,
  },
  textSecondary: {
    color: COLORS.primary,
  },
  textDisabled: {
    color: COLORS.gray,
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
});
