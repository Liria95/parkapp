import React, { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../App';
import { colors } from '../../utils';

// Componentes reutilizables
import AuthContainer from '../../components/auth/AuthContainer';
import FormContainer from '../../components/common/FormContainer';
import InputField from '../../components/common/InputField';
import AuthButton from '../../components/common/AuthButton';
import LogoHeader from '../../components/common/LogoHeader';
import LinkButton from '../../components/common/LinkButton';

// Formik & Yup
import { Formik } from 'formik';
import * as Yup from 'yup';

// Servicios
import { AuthService } from '../../services/AuthService';

// Tipo de navegación
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

// Validación con Yup
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('Nombre completo es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email es obligatorio'),
  phone: Yup.string()
    .required('Teléfono es obligatorio')
    .matches(/^\+?\d{6,15}$/, 'Teléfono inválido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es obligatorio'),
});

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleRegister = async (values: any, setSubmitting: any) => {
    try {
      console.log('Formulario valores:', values);

      // Llamada al AuthService 
      const result = await AuthService.register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });

      console.log('Resultado registro:', result);

      if (result?.success) {
        Alert.alert('Registro exitoso', result.message, [
          {
            text: 'OK',
            onPress: () => {
              setSubmitting(false);
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Error de registro', result?.message || 'Error desconocido', [
          { text: 'OK', onPress: () => setSubmitting(false) },
        ]);
      }
    } catch (error: any) {
      console.log('Error catch handleRegister:', error.response || error.message);
      Alert.alert('Error', 'Ocurrió un error inesperado', [
        { text: 'OK', onPress: () => setSubmitting(false) },
      ]);
    }
  };

  return (
    <AuthContainer>
      <LogoHeader
        title="Únite y estaciona fácil"
        subtitle="Creá tu cuenta de usuario para comenzar"
        marginTop={60}
        marginBottom={40}
      />

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => handleRegister(values, setSubmitting)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <FormContainer>
            <InputField
              label="Nombre completo"
              iconName="person-outline"
              placeholder="Juan Pérez"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              error={touched.fullName ? errors.fullName : undefined}
              autoCapitalize="words"
            />

            <InputField
              label="Email"
              iconName="mail-outline"
              placeholder="juan@email.com"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Teléfono"
              iconName="call-outline"
              placeholder="+54 9 11 1234-5678"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={touched.phone ? errors.phone : undefined}
              keyboardType="phone-pad"
            />

            <InputField
              label="Contraseña"
              iconName="lock-closed-outline"
              placeholder="Mínimo 6 caracteres"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              secureTextEntry={!showPassword}
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              autoCapitalize="none"
            />

            <InputField
              label="Confirmar contraseña"
              iconName="lock-closed-outline"
              placeholder="Repetí tu contraseña"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              secureTextEntry={!showConfirmPassword}
              showPasswordToggle
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              autoCapitalize="none"
            />

            <AuthButton
              title="Crear Cuenta"
              onPress={handleSubmit as any}
              loading={isSubmitting}
            />

            <LinkButton
              normalText="¿Ya tienes cuenta?"
              linkText="Inicia sesión"
              onPress={() => navigation.navigate('Login')}
            />
          </FormContainer>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default RegisterScreen; 