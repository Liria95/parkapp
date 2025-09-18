import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import {colors} from '../utils';


// Tipos para navegación
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

// Tipos TypeScript
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}


// Styled Components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.lightGray};
`;

const HeaderContainer = styled.View`
  align-items: center;
  margin-top: 60px;
  margin-bottom: 40px;
  padding: 0 40px;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 8px;
`;

const SubtitleText = styled.Text`
  font-size: 16px;
  color: ${colors.gray};
  text-align: center;
`;

const FormContainer = styled.View`
  padding: 0 40px;
  flex: 1;
`;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Validaciones
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleRegister = (): void => {
    if (validateForm()) {
      Alert.alert(
        'Registro exitoso',
        `¡Bienvenido ${formData.fullName}!\nTipo: Usuario Final\nTu cuenta ha sido creada.`,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Usuario registrado:', formData);
              // Ejemplo de navegación post-registro:
              // navigation.navigate('Login');
            },
          },
        ]
      );
    }
  };

  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <HeaderContainer>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <WelcomeText>Únite y estaciona fácil</WelcomeText>
            <SubtitleText>Creá tu cuenta de usuario para comenzar</SubtitleText>
          </HeaderContainer>

          <FormContainer>
            {/* Nombre completo */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre completo</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.fullName ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={errors.fullName ? colors.red : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Juan Pérez"
                  value={formData.fullName}
                  onChangeText={(text: string) =>
                    handleInputChange('fullName', text)
                  }
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
              {errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.email ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={errors.email ? colors.red : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="juan@email.com"
                  value={formData.email}
                  onChangeText={(text: string) =>
                    handleInputChange('email', text)
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Teléfono */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Teléfono</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.phone ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={errors.phone ? colors.red : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="+54 9 11 1234-5678"
                  value={formData.phone}
                  onChangeText={(text: string) =>
                    handleInputChange('phone', text)
                  }
                  keyboardType="phone-pad"
                  autoCorrect={false}
                />
              </View>
              {errors.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
              ) : null}
            </View>

            {/* Contraseña */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.password ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={errors.password ? colors.red : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChangeText={(text: string) =>
                    handleInputChange('password', text)
                  }
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Confirmar contraseña */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirmar contraseña</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.confirmPassword ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={errors.confirmPassword ? colors.red : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Repetí tu contraseña"
                  value={formData.confirmPassword}
                  onChangeText={(text: string) =>
                    handleInputChange('confirmPassword', text)
                  }
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
                    }
                    size={20}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            {/* Botón Crear Cuenta */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            </TouchableOpacity>

            {/* Link a Login */}
            <TouchableOpacity style={styles.loginLink} onPress={goToLogin}>
              <Text style={styles.loginText}>
                ¿Ya tienes cuenta?{' '}
                <Text style={styles.loginTextBold}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  logoImage: { width: 80, height: 80, marginBottom: 15, borderRadius: 40 },
  inputContainer: { marginBottom: 16 },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputError: { borderColor: colors.red, borderWidth: 2 },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: colors.dark },
  eyeIcon: { padding: 5 },
  errorText: { color: colors.red, fontSize: 12, marginTop: 5, marginLeft: 5 },
  registerButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: { alignItems: 'center', marginTop: 30 },
  loginText: { fontSize: 14, color: colors.gray },
  loginTextBold: { fontWeight: 'bold', color: colors.primary },
});

export default RegisterScreen;