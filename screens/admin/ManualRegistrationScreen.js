import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

const ManualRegistrationScreen = ({ navigation }) => {
  const [patente, setPatente] = useState('');
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [scanning, setScanning] = useState(false);
  const [searchingUser, setSearchingUser] = useState(false);

  // Ubicaciones predefinidas para el demo
  const ubicacionesPredefinidas = [
    {
      id: 1,
      nombre: 'Av. San Martín 123',
      tarifa: 50,
      limite: 2,
      disponible: true
    },
    {
      id: 2,
      nombre: 'Calle Mitre 456',
      tarifa: 40,
      limite: 3,
      disponible: true
    },
    {
      id: 3,
      nombre: 'Plaza Principal',
      tarifa: 60,
      limite: 1,
      disponible: false
    }
  ];

  useEffect(() => {
    // Configurar hora de inicio actual
    setHoraInicio(new Date());
  }, []);

  // Simular escaneo de patente
  const handleScanPatente = () => {
    setScanning(true);
    // Simular proceso de escaneo
    setTimeout(() => {
      const patentesDemo = ['ABC123', 'XYZ789', 'DEF456', 'GHI789'];
      const patenteAleatoria = patentesDemo[Math.floor(Math.random() * patentesDemo.length)];
      setPatente(patenteAleatoria);
      setScanning(false);
      // Buscar usuario automáticamente después del escaneo
      buscarUsuario(patenteAleatoria);
    }, 2000);
  };

  // Simular búsqueda de usuario
  const buscarUsuario = (patenteABuscar = patente) => {
    if (!patenteABuscar.trim()) {
      Alert.alert('Error', 'Ingrese una patente para buscar');
      return;
    }

    setSearchingUser(true);
    
    // Simular llamada a API
    setTimeout(() => {
      const usuariosDemo = [
        {
          id: 1,
          nombre: 'Juan Pérez',
          email: 'juan@email.com',
          saldo: 1250,
          patentes: ['ABC123', 'DEF456'],
          telefono: '+54 9 11 1234-5678'
        },
        {
          id: 2,
          nombre: 'María García',
          email: 'maria@email.com',
          saldo: 850,
          patentes: ['XYZ789'],
          telefono: '+54 9 11 8765-4321'
        }
      ];

      const usuario = usuariosDemo.find(u => 
        u.patentes.includes(patenteABuscar.toUpperCase())
      );

      setUsuarioEncontrado(usuario || null);
      setSearchingUser(false);

      if (!usuario) {
        Alert.alert(
          'Usuario no encontrado',
          'No se encontró un usuario registrado con esta patente. ¿Desea crear un registro temporal?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Registro Temporal', onPress: crearRegistroTemporal }
          ]
        );
      }
    }, 1500);
  };

  const crearRegistroTemporal = () => {
    setUsuarioEncontrado({
      id: 'temp',
      nombre: 'Usuario Temporal',
      email: 'temporal@parkapp.com',
      saldo: 0,
      patentes: [patente.toUpperCase()],
      telefono: 'No registrado',
      temporal: true
    });
  };

  const seleccionarUbicacion = (ubicacion) => {
    if (!ubicacion.disponible) {
      Alert.alert('Ubicación no disponible', 'Este espacio está ocupado actualmente');
      return;
    }
    setUbicacionSeleccionada(ubicacion);
  };

  const registrarEstacionamiento = () => {
    if (!patente.trim()) {
      Alert.alert('Error', 'Debe escanear o ingresar una patente');
      return;
    }

    if (!ubicacionSeleccionada) {
      Alert.alert('Error', 'Debe seleccionar una ubicación');
      return;
    }

    if (!usuarioEncontrado) {
      Alert.alert('Error', 'Debe encontrar o crear un usuario');
      return;
    }

    // Simular registro exitoso
    Alert.alert(
      'Registro Exitoso',
      `Estacionamiento registrado:\n\nPatente: ${patente.toUpperCase()}\nUbicación: ${ubicacionSeleccionada.nombre}\nUsuario: ${usuarioEncontrado.nombre}\nHora inicio: ${horaInicio.toLocaleTimeString()}`,
      [
        {
          text: 'Nuevo Registro',
          onPress: () => {
            setPatente('');
            setUbicacionSeleccionada(null);
            setUsuarioEncontrado(null);
            setHoraInicio(new Date());
          }
        },
        {
          text: 'Volver al Panel',
          onPress: () => navigation.goBack(),
          style: 'default'
        }
      ]
    );
  };

  const UbicacionCard = ({ ubicacion }) => (
    <TouchableOpacity
      style={[
        styles.ubicacionCard,
        ubicacionSeleccionada?.id === ubicacion.id && styles.ubicacionSeleccionada,
        !ubicacion.disponible && styles.ubicacionNoDisponible
      ]}
      onPress={() => seleccionarUbicacion(ubicacion)}
      disabled={!ubicacion.disponible}
    >
      <View style={styles.ubicacionHeader}>
        <Ionicons 
          name={ubicacion.disponible ? "location" : "location-outline"} 
          size={24} 
          color={ubicacion.disponible ? "#2E7BDC" : "#999"} 
        />
        <Text style={[
          styles.ubicacionNombre,
          !ubicacion.disponible && styles.textDisabled
        ]}>
          {ubicacion.nombre}
        </Text>
      </View>
      <View style={styles.ubicacionInfo}>
        <Text style={[styles.ubicacionTarifa, !ubicacion.disponible && styles.textDisabled]}>
          ${ubicacion.tarifa}/hora
        </Text>
        <Text style={[styles.ubicacionLimite, !ubicacion.disponible && styles.textDisabled]}>
          Límite: {ubicacion.limite}h
        </Text>
      </View>
      {!ubicacion.disponible && (
        <Text style={styles.ocupadoText}>OCUPADO</Text>
      )}
      {ubicacionSeleccionada?.id === ubicacion.id && (
        <Ionicons name="checkmark-circle" size={24} color="#72C8A8" style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#2E7BDC', '#5CB3CC']}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Registro Manual</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Tip */}
        <View style={styles.tipContainer}>
          <Ionicons name="bulb" size={20} color="#856404" />
          <Text style={styles.tipText}>
            Para vehículos que estacionaron sin usar la app
          </Text>
        </View>

        {/* Sección Patente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Registrar Patente</Text>
          
          <View style={styles.patenteContainer}>
            <View style={styles.patenteInputContainer}>
              <TextInput
                style={styles.patenteInput}
                value={patente}
                onChangeText={setPatente}
                placeholder="Ej: ABC123"
                maxLength={7}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleScanPatente}
                disabled={scanning}
              >
                {scanning ? (
                  <Ionicons name="refresh" size={24} color="white" />
                ) : (
                  <Ionicons name="camera" size={24} color="white" />
                )}
              </TouchableOpacity>
            </View>
            
            {patente && (
              <View style={styles.patenteConfirmada}>
                <Ionicons name="checkmark-circle" size={24} color="#72C8A8" />
                <Text style={styles.patenteConfirmadaText}>
                  {patente.toUpperCase()} ✓
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Sección Usuario */}
        {patente && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Buscar Usuario</Text>
            
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => buscarUsuario()}
              disabled={searchingUser}
            >
              <LinearGradient
                colors={['#5CB3CC', '#72C8A8']}
                style={styles.searchButtonGradient}
              >
                {searchingUser ? (
                  <Ionicons name="refresh" size={20} color="white" />
                ) : (
                  <Ionicons name="search" size={20} color="white" />
                )}
                <Text style={styles.searchButtonText}>
                  {searchingUser ? 'Buscando...' : 'Buscar Usuario'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {usuarioEncontrado && (
              <View style={[
                styles.usuarioCard,
                usuarioEncontrado.temporal && styles.usuarioTemporal
              ]}>
                <View style={styles.usuarioHeader}>
                  <View style={styles.usuarioAvatar}>
                    <Ionicons 
                      name={usuarioEncontrado.temporal ? "person-add" : "person"} 
                      size={24} 
                      color="white" 
                    />
                  </View>
                  <View style={styles.usuarioInfo}>
                    <Text style={styles.usuarioNombre}>
                      {usuarioEncontrado.nombre}
                    </Text>
                    <Text style={styles.usuarioEmail}>
                      {usuarioEncontrado.email}
                    </Text>
                    <Text style={styles.usuarioSaldo}>
                      Saldo: ${usuarioEncontrado.saldo.toLocaleString()}
                    </Text>
                  </View>
                  {usuarioEncontrado.temporal && (
                    <View style={styles.temporalBadge}>
                      <Text style={styles.temporalText}>TEMP</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Sección Ubicación */}
        {usuarioEncontrado && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Seleccionar Ubicación</Text>
            
            {ubicacionesPredefinidas.map(ubicacion => (
              <UbicacionCard key={ubicacion.id} ubicacion={ubicacion} />
            ))}
          </View>
        )}

        {/* Resumen */}
        {ubicacionSeleccionada && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Confirmar Registro</Text>
            
            <View style={styles.resumenContainer}>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Patente:</Text>
                <Text style={styles.resumenValue}>{patente.toUpperCase()}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Usuario:</Text>
                <Text style={styles.resumenValue}>{usuarioEncontrado?.nombre}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Ubicación:</Text>
                <Text style={styles.resumenValue}>{ubicacionSeleccionada.nombre}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Tarifa:</Text>
                <Text style={styles.resumenValue}>${ubicacionSeleccionada.tarifa}/hora</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Hora inicio:</Text>
                <Text style={styles.resumenValue}>{horaInicio.toLocaleTimeString()}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.registerButton}
                onPress={registrarEstacionamiento}
              >
                <LinearGradient
                  colors={['#72C8A8', '#2E7BDC']}
                  style={styles.registerButtonGradient}
                >
                  <Text style={styles.registerButtonText}>✓ Registrar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButton: {
    padding: 5,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 20,
  },
  tipText: {
    flex: 1,
    marginLeft: 8,
    color: '#856404',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  patenteContainer: {
    marginBottom: 10,
  },
  patenteInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  patenteInput: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  scanButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2E7BDC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patenteConfirmada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    borderColor: '#c8e6c9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  patenteConfirmadaText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#72C8A8',
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  searchButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  usuarioCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  usuarioTemporal: {
    borderWidth: 2,
    borderColor: '#FFC857',
    backgroundColor: '#fffbf0',
  },
  usuarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usuarioAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E7BDC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  usuarioInfo: {
    flex: 1,
  },
  usuarioNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  usuarioEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  usuarioSaldo: {
    fontSize: 14,
    color: '#2E7BDC',
    fontWeight: '600',
    marginTop: 2,
  },
  temporalBadge: {
    backgroundColor: '#FFC857',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  temporalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  ubicacionCard: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    position: 'relative',
  },
  ubicacionSeleccionada: {
    borderColor: '#72C8A8',
    backgroundColor: '#f0f8f0',
  },
  ubicacionNoDisponible: {
    backgroundColor: '#f8f8f8',
    opacity: 0.7,
  },
  ubicacionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ubicacionNombre: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  ubicacionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ubicacionTarifa: {
    fontSize: 14,
    color: '#2E7BDC',
    fontWeight: '600',
  },
  ubicacionLimite: {
    fontSize: 14,
    color: '#666',
  },
  textDisabled: {
    color: '#999',
  },
  ocupadoText: {
    position: 'absolute',
    top: 10,
    right: 15,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  checkIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  resumenContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resumenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resumenLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  resumenValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#2E7BDC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2E7BDC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  registerButtonGradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ManualRegistrationScreen;