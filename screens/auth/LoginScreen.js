import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Simulación de login
    // Admin: admin@parkapp.com / admin123
    // Usuario: user@parkapp.com / user123

    if (email === 'admin@parkapp.com' && password === 'admin123') {
      onLogin('admin');
    } else if (email === 'user@parkapp.com' && password === 'user123') {
      onLogin('user');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.centerContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        {/* Formulario */}
        <View style={styles.formContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="📧 Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={globalStyles.input}
            placeholder="🔒 Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={handleLogin}
          >
            <Text style={globalStyles.buttonTextPrimary}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.buttonSecondary}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={globalStyles.buttonTextSecondary}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        {/* Credenciales de prueba */}
        <View style={styles.testCredentials}>
          <Text style={styles.testTitle}>Credenciales de Prueba:</Text>
          <Text style={styles.testText}>👤 Usuario: user@parkapp.com / user123</Text>
          <Text style={styles.testText}>👨‍💼 Admin: admin@parkapp.com / admin123</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 600,
    height: 200,
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  testCredentials: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray + '30',
  },
  testTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  testText: {
    fontSize: 12,
    color: COLORS.gray,
    marginVertical: 2,
  },
});
