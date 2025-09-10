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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definir las pantallas de tu stack
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AdminDashboard: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

// Colores del sistema de diseño
const colors = {
  primary: '#2E7BDC',
  secondary: '#5CB3CC',
  accent: '#72C8A8',
  warning: '#FFC857',
  danger: '#E74C3C',
  dark: '#2C3E50',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6C757D',
};

// Componentes estilizados
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.lightGray};
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-top: 80px;
  margin-bottom: 60px;
`;

const AppTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.primary};
  text-align: center;
`;

const FormContainer = styled.View`
  padding: 0 40px;
  flex: 1;
`;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación del formulario
  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Formato de email inválido');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (): void => {
    if (validateForm()) {
      const SYSTEM_ADMINS = [
        {
          email: 'admin@parkapp.com',
          password: 'admin123',
          type: 'admin',
          name: 'Super Administrador',
        },
        {
          email: 'admin@gmail.com',
          password: 'admin123',
          type: 'admin',
          name: 'Admin Principal',
        },
      ];

      const adminUser = SYSTEM_ADMINS.find(
        admin => admin.email === email && admin.password === password
      );

      if (adminUser) {
        console.log('Login Admin exitoso:', adminUser.name);
        navigation.navigate('AdminDashboard');
      } else {
        console.log('Login Usuario Final exitoso');
        Alert.alert(
          'Login exitoso',
          `Bienvenido Usuario Final!\nEmail: ${email}\nMapa de usuario aún no implementado.`,
          [{ text: 'OK' }]
        );
      }
    }
  };

  const goToRegister = (): void => {
    navigation.navigate('Register');
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
          {/* Logo */}
          <LogoContainer>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <AppTitle>ParkApp</AppTitle>
          </LogoContainer>

          {/* Formulario */}
          <FormContainer>
            {/* Campo Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View
                style={[
                  styles.inputWrapper,
                  emailError ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={emailError ? colors.danger : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ingresá tu email"
                  value={email}
                  onChangeText={(text: string) => {
                    setEmail(text);
                    if (emailError) setEmailError('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Campo Contraseña */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View
                style={[
                  styles.inputWrapper,
                  passwordError ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordError ? colors.danger : colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Ingresá tu contraseña"
                  value={password}
                  onChangeText={(text: string) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                  }}
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
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Botón Iniciar Sesión */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/* Link a Registro */}
            <TouchableOpacity style={styles.registerLink} onPress={goToRegister}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta?{' '}
                <Text style={styles.registerTextBold}>Registrarse</Text>
              </Text>
            </TouchableOpacity>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500' as const,
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
  inputError: {
    borderColor: colors.danger,
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.dark,
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  loginButton: {
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
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 30,
  },
  registerText: {
    fontSize: 14,
    color: colors.gray,
  },
  registerTextBold: {
    fontWeight: 'bold' as const,
    color: colors.primary,
  },
});

export default LoginScreen;