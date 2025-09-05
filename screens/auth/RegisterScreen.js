import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleRegister = () => {
    const { name, email, password, confirmPassword, phone } = formData;

    if (!name || !email || !password || !confirmPassword || !phone) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Simulación de registro exitoso
    Alert.alert(
      'Éxito',
      'Cuenta creada exitosamente. Puedes iniciar sesión ahora.',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
    );
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={globalStyles.title}>Crear Cuenta</Text>
          <Text style={globalStyles.subtitle}>
            Únete a ParkApp y estaciona fácil
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="👤 Nombre completo"
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
          />

          <TextInput
            style={globalStyles.input}
            placeholder="📧 Email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={globalStyles.input}
            placeholder="📱 Teléfono"
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            keyboardType="phone-pad"
          />

          <TextInput
            style={globalStyles.input}
            placeholder="🔒 Contraseña"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
          />

          <TextInput
            style={globalStyles.input}
            placeholder="🔒 Confirmar contraseña"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            secureTextEntry
          />

          <TouchableOpacity
            style={[globalStyles.buttonPrimary, { marginTop: 20 }]}
            onPress={handleRegister}
          >
            <Text style={globalStyles.buttonTextPrimary}>Crear Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.buttonSecondary}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={globalStyles.buttonTextSecondary}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
});