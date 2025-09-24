import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Componentes reutilizables
import AppHeader from '../components/common/AppHeader';
import ScannerSection from '../components/registration/ScannerSection';
import FormContainer from '../components/common/FormContainer';
import InputField from '../components/common/InputField';
import LocationCard from '../components/registration/LocationCard';
import UserFoundCard from '../components/registration/UserFoundCard';
import ToggleSwitch from '../components/common/ToggleSwitch';
import AppModal from '../components/common/AppModal';
import { Container } from '../components/shared/StyledComponents';

// Constantes
import { colors } from '../constants/colors';
import { getResponsiveSize, getDynamicSpacing } from '../utils/ResponsiveUtils';

// Tipos
type RootStackParamList = {
  RegistroManual: undefined;
};

type RegistroManualScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RegistroManual'
>;

interface UsuarioEncontrado {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  saldo: number;
}

interface EspacioSeleccionado {
  id: string;
  numero: string;
  ubicacion: string;
  tarifaPorHora: number;
}

const ContentScrollView = styled.ScrollView`
  flex: 1;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  gap: ${getDynamicSpacing(10)}px;
  padding: ${getDynamicSpacing(20)}px;
`;

const ActionButton = styled.TouchableOpacity<{ primary?: boolean }>`
  flex: 1;
  background-color: ${props => (props.primary ? colors.primary : colors.gray)};
  padding: ${getDynamicSpacing(15)}px;
  border-radius: ${getResponsiveSize(8)}px;
  align-items: center;
  elevation: 2;
`;

const ActionButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${getResponsiveSize(14)}px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ModalSpaceItem = styled.TouchableOpacity`
  padding: ${getDynamicSpacing(15)}px;
  border-radius: ${getResponsiveSize(8)}px;
  background-color: ${colors.lightGray};
  margin-bottom: ${getDynamicSpacing(10)}px;
  border-width: 2px;
  border-color: transparent;
`;

const ModalSpaceTitle = styled.Text`
  font-size: ${getResponsiveSize(16)}px;
  font-weight: bold;
  color: ${colors.dark};
  margin-bottom: ${getDynamicSpacing(5)}px;
`;

const ModalSpaceInfo = styled.Text`
  font-size: ${getResponsiveSize(12)}px;
  color: ${colors.gray};
  margin-bottom: ${getResponsiveSize(2)}px;
`;

const ModalSpacePrice = styled.Text`
  font-size: ${getResponsiveSize(14)}px;
  font-weight: bold;
  color: ${colors.primary};
`;

// Validación con Yup
const RegistroSchema = Yup.object().shape({
  patente: Yup.string()
    .required('La patente es obligatoria')
    .min(6, 'Debe tener al menos 6 caracteres'),
});

const RegistroManualScreen: React.FC = () => {
  const navigation = useNavigation<RegistroManualScreenNavigationProp>();

  const [espacioSeleccionado, setEspacioSeleccionado] =
    useState<EspacioSeleccionado | null>(null);
  const [usuarioEncontrado, setUsuarioEncontrado] =
    useState<UsuarioEncontrado | null>(null);
  const [notificarUsuario, setNotificarUsuario] = useState<boolean>(true);
  const [showEspaciosModal, setShowEspaciosModal] = useState<boolean>(false);

  // Mock data espacios disponibles
  const espaciosDisponibles = [
    { id: '1', numero: 'A-001', ubicacion: 'AV. SAN MARTÍN 123', tarifaPorHora: 50 },
    { id: '2', numero: 'B-005', ubicacion: 'AV. BELGRANO 456', tarifaPorHora: 75 },
    { id: '3', numero: 'C-012', ubicacion: 'CALLE CORRIENTES 789', tarifaPorHora: 60 },
  ];

  const handleRegistrar = (
    values: { patente: string; searchQuery: string },
    resetForm: () => void
  ) => {
    if (!espacioSeleccionado) {
      Alert.alert('Error', 'Debe seleccionar una ubicación');
      return;
    }

    // Simular registro exitoso
    Alert.alert(
      'Registro Exitoso',
      `Vehículo ${values.patente} registrado en ${espacioSeleccionado.ubicacion}\n${
        notificarUsuario ? 'Notificación enviada al usuario' : 'Sin notificación'
      }`,
      [
        {
          text: 'OK',
          onPress: () => {
            resetForm();
            setEspacioSeleccionado(null);
            setUsuarioEncontrado(null);
            setNotificarUsuario(true);
          },
        },
      ]
    );
  };

  return (
    <Container>
      <AppHeader
        title="Registro Manual"
        subtitle="Registrar vehículo sin app"
        onBackPress={() => navigation.goBack()}
        showBackButton={true}
      />

      <Formik
        initialValues={{ patente: '', searchQuery: '' }}
        validationSchema={RegistroSchema}
        onSubmit={(values, { resetForm }) => handleRegistrar(values, resetForm)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <ContentScrollView showsVerticalScrollIndicator={false}>
            <ScannerSection
              onCameraPress={() => {
                handleChange('patente')('ABC123');
              }}
            />

            <FormContainer paddingHorizontal={20}>
              <InputField
                label="Patente del Vehículo"
                iconName="car-outline"
                placeholder="ABC123"
                value={values.patente}
                onChangeText={handleChange('patente')}
                onBlur={handleBlur('patente')}
                error={touched.patente && errors.patente ? errors.patente : ''}
                autoCapitalize="characters"
                maxLength={10}
              />
            </FormContainer>

            <LocationCard
              espacioSeleccionado={espacioSeleccionado}
              onLocationPress={() => setShowEspaciosModal(true)}
            />

            <FormContainer paddingHorizontal={20}>
              <InputField
                label="Buscar usuario existente (opcional)"
                iconName="search-outline"
                placeholder="Email o teléfono del usuario"
                value={values.searchQuery}
                onChangeText={handleChange('searchQuery')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormContainer>

            {usuarioEncontrado && <UserFoundCard usuario={usuarioEncontrado} />}

            <ToggleSwitch
              title="Notificar al usuario"
              subtitle="Enviar SMS/email con detalles"
              value={notificarUsuario}
              onToggle={() => setNotificarUsuario(!notificarUsuario)}
            />

            <ActionsContainer>
              <ActionButton onPress={() => navigation.goBack()}>
                <ActionButtonText>Cancelar</ActionButtonText>
              </ActionButton>
              <ActionButton primary onPress={() => handleSubmit()}>
                <ActionButtonText>Registrar</ActionButtonText>
              </ActionButton>
            </ActionsContainer>
          </ContentScrollView>
        )}
      </Formik>

      {/* Modal Selección de Espacios */}
      <AppModal
        visible={showEspaciosModal}
        title="Seleccionar Espacio"
        onClose={() => setShowEspaciosModal(false)}
      >
        {espaciosDisponibles.map(espacio => (
          <ModalSpaceItem
            key={espacio.id}
            onPress={() => setEspacioSeleccionado(espacio)}
          >
            <ModalSpaceTitle>Espacio {espacio.numero}</ModalSpaceTitle>
            <ModalSpaceInfo>{espacio.ubicacion}</ModalSpaceInfo>
            <ModalSpacePrice>${espacio.tarifaPorHora}/hora</ModalSpacePrice>
          </ModalSpaceItem>
        ))}
      </AppModal>
    </Container>
  );
};

export default RegistroManualScreen;
