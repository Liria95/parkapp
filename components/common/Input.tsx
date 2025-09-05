import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { COLORS } from '../../utils/colors';

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string | null;
  icon?: React.ReactNode;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error = null,
  icon = null,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style = {},
  inputStyle = {},
  onPress,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (onPress) onPress();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
        ]}
        onPress={handlePress}
        disabled={!onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {icon && <View style={styles.inputIcon}>{icon}</View>}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={COLORS.gray}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordToggle}
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray + '50',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    minHeight: 50,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainerError: {
    borderColor: COLORS.danger,
  },
  inputContainerDisabled: {
    backgroundColor: COLORS.light,
    borderColor: COLORS.gray + '30',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.dark,
    paddingVertical: 15,
  },
  passwordToggle: {
    padding: 5,
  },
  passwordToggleText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
    marginLeft: 5,
  },
});
