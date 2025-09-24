import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Componentes reutilizables
import AuthContainer from '../components/auth/AuthContainer';
import FormContainer from '../components/common/FormContainer';
import InputField from '../components/common/InputField';
import AuthButton from '../components/common/AuthButton';
import LogoHeader from '../components/common/LogoHeader';
import LinkButton from '../components/common/LinkButton';

// Servicios y contexto
import { AuthService } from '../services/AuthService';
import { AUTH_ACTIONS, AuthContext } from '../components/shared/Context/AuthContext';

// Tipos
interface NavigationProp {
  navigate: (screen: string) => void;
}

interface LoginScreenProps {
  navigation: NavigationProp;
}

// Esquema de validación con Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (state.user) {
      console.log('Usuario logueado:', state.user);
      console.log('Token:', state.token);
      console.log('Refresh Token:', state.refreshToken);
    }
  }, [state]);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const result = await AuthService.login(values.email, values.password);

      if (result.success && result.user) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: {
            token: "TOKEN",
            refreshToken: "REFRESH_TOKEN",
            user: result.user,
          },
        });

        if (result.isAdmin) {
          console.log('Login Admin exitoso:', result.user?.name);
          navigation.navigate('AdminDashboard');
        } else {
          Alert.alert('Login exitoso', result.message, [{ text: 'OK' }]);
        }
      } else {
        Alert.alert('Error de login', result.message, [{ text: 'OK' }]);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado', [{ text: 'OK' }]);
    }
  };

  return (
    <AuthContainer>
      <LogoHeader title="ParkApp" />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <FormContainer>
            
            <InputField
              label="Email"
              iconName="mail-outline"   // Ícono de sobre
              placeholder="Ingresá tu email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            
            <InputField
              label="Contraseña"
              iconName="lock-closed-outline"  // Ícono de candado
              placeholder="Ingresá tu contraseña"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              secureTextEntry={!showPassword}
              showPasswordToggle={true}        // Activa el icono de ojo
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              autoCapitalize="none"
              autoCorrect={false}
            />

            
            <AuthButton
              title="Iniciar sesión"
              onPress={handleSubmit as any}
              loading={isSubmitting}
            />

            
            <LinkButton
              normalText="¿No tienes cuenta?"
              linkText="Registrarse"
              onPress={() => navigation.navigate('Register')}
            />
          </FormContainer>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default LoginScreen;
