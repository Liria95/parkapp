import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function CameraScreen({ navigation, route }) {
  const [patente, setPatente] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const { spot } = route.params || {};

  const simulateCamera = () => {
    // Simular captura de foto y reconocimiento de patente
    setPhotoTaken(true);
    setPatente('ABC123');
    
    setTimeout(() => {
      Alert.alert('Patente Detectada', 'ABC123 detectada correctamente');
    }, 1000);
  };

  const handleStartParsing = () => {
    if (!photoTaken || !patente) {
      Alert.alert('Error', 'Primero debes escanear la patente');
      return;
    }

    Alert.alert(
      'Confirmar Estacionamiento',
      `¿Iniciar estacionamiento para ${patente}?\n\nUbicación: ${spot?.location}\nTarifa: $${spot?.rate}/hora`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar',
          onPress: () => {
            // Navegar a pantalla de estacionamiento activo
            navigation.navigate('ActiveParking', { 
              spot, 
              patente,
              startTime: new Date() 
            });
          },
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={globalStyles.title}>📷 Registrar Vehículo</Text>
      </View>

      {/* Simulación de Cámara */}
      <View style={styles.cameraContainer}>
        <View style={[
          styles.cameraPlaceholder,
          { backgroundColor: photoTaken ? COLORS.success : COLORS.gray }
        ]}>
          <Text style={styles.cameraText}>
            {photoTaken ? '✅ FOTO CAPTURADA' : '📷 CÁMARA ACTIVA'}
          </Text>
          <Text style={styles.cameraSubtext}>
            {photoTaken ? 'Patente detectada' : 'Enfocar patente'}
          </Text>
        </View>
      </View>

      {/* Patente Detectada */}
      {photoTaken && (
        <View style={styles.patenteContainer}>
          <Text style={styles.patenteLabel}>Patente Detectada:</Text>
          <Text style={styles.patenteText}>{patente} ✓</Text>
        </View>
      )}

      {/* Información del Lugar */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>📍 Información del Lugar:</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            📍 <Text style={styles.infoValue}>Ubicación: {spot?.location || 'N/A'}</Text>
          </Text>
          <Text style={styles.infoText}>
            💰 <Text style={styles.infoValue}>Tarifa: ${spot?.rate || 0}/hora</Text>
          </Text>
          <Text style={styles.infoText}>
            ⏰ <Text style={styles.infoValue}>Límite: 2 horas</Text>
          </Text>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.buttonContainer}>
        {!photoTaken ? (
          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={simulateCamera}
          >
            <Text style={globalStyles.buttonTextPrimary}>📷 Escanear Patente</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={handleStartParsing}
          >
            <Text style={globalStyles.buttonTextPrimary}>🚗 Iniciar Estacionamiento</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    marginBottom: 10,
  },
  cameraPlaceholder: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray + '50',
    borderStyle: 'dashed',
  },
  cameraText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraSubtext: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
  },
  patenteContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: COLORS.success + '20',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.success,
    alignItems: 'center',
  },
  patenteLabel: {
    fontSize: 14,
    color: COLORS.success,
  },
  patenteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  infoContainer: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: COLORS.light,
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 2,
  },
  infoValue: {
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  buttonContainer: {
    padding: 20,
  },
});