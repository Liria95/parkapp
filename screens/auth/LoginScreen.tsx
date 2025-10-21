import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik'; 
import * as Yup from 'yup'; 

// Componentes reutilizables
import AuthContainer from '../../components/auth/AuthContainer';
import FormContainer from '../../components/common/FormContainer';
import InputField from '../../components/common/InputField';
import AuthButton from '../../components/common/AuthButton';
import LogoHeader from '../../components/common/LogoHeader';
import LinkButton from '../../components/common/LinkButton';

// Hooks y servicios
import { AuthService } from '../../services/AuthService';

import { AUTH_ACTIONS, AuthContext } from '../../components/shared/Context/AuthContext';

// Tipos
interface NavigationProp {
  navigate: (screen: string) => void;
}

interface LoginScreenProps {
  navigation: NavigationProp;
}

// Interfaz para los valores del formulario (para tipado TypeScript)
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useContext(AuthContext);

  // Dentro de LoginScreen
  useEffect(() => {
    if (state.user) {
      console.log('Usuario logueado:', state.user);
      console.log('Token:', state.token);
      console.log('Refresh Token:', state.refreshToken);
    }
  }, [state]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email inválido')
      .required('El email es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  // Configuración de Formik
  const formik = useFormik<LoginFormValues>({  
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: LoginFormValues) => { 
      setLoading(true);
      try {
        const result = await AuthService.login(values.email, values.password);

        if (result.success && result.user) {
          // Dispara el tipo de la acción para guardar al usuario en el contexto
          dispatch({
            type: AUTH_ACTIONS.LOGIN,
            payload: {
              token: "TOKEN", 
              refreshToken: "REFRESH_TOKEN", 
              user: result.user,
            }
          });

          
          if (result.isAdmin) {
            console.log('Login Admin exitoso:', result.user?.name);
            
          } else {
            console.log('Login Usuario exitoso:', result.user?.name);
            
          }
        } else {
          // Credenciales incorrectas
          Alert.alert(
            'Error de login',
            result.message || 'Email o contraseña incorrectos',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error inesperado', [{ text: 'OK' }]);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <AuthContainer>
      <LogoHeader title="ParkApp" />

      <FormContainer>
        <InputField
          label="Email"
          iconName="mail-outline"
          placeholder="Ingresá tu email"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <InputField
          label="Contraseña"
          iconName="lock-closed-outline"
          placeholder="Ingresá tu contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
          secureTextEntry={!showPassword}
          showPasswordToggle={true}
          isPasswordVisible={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AuthButton
          title="Iniciar sesión"
          onPress={() => formik.handleSubmit()} // Usa handleSubmit de Formik
          loading={loading}
          disabled={loading || !formik.isValid} // Deshabilita si no es válido o está cargando
        />

        <LinkButton
          normalText="¿No tienes cuenta?"
          linkText="Registrarse"
          onPress={() => navigation.navigate('Register')}
        />
      </FormContainer>
    </AuthContainer>
  );
};

export default LoginScreen;