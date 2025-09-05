import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';

const ActiveParkingScreen = ({ navigation, route }) => {
  // Datos del estacionamiento activo (pueden venir de route.params o estado global)
  const [parkingData, setParkingData] = useState({
    patente: route?.params?.patente || 'ABC123',
    ubicacion: route?.params?.ubicacion || 'Av. San Martín 123',
    horaInicio: route?.params?.horaInicio || new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    tarifaHora: route?.params?.tarifaHora || 50,
    limiteHoras: route?.params?.limiteHoras || 2,
    saldoUsuario: route?.params?.saldoUsuario || 1250,
  });

  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [costoActual, setCostoActual] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [horasExtender, setHorasExtender] = useState('1');
  const [alertaEnviada, setAlertaEnviada] = useState(false);

  // Calcular tiempo y costo
  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date();
      const inicioMs = parkingData.horaInicio.getTime();
      const transcurridoMs = ahora.getTime() - inicioMs;
      const transcurridoHoras = transcurridoMs / (1000 * 60 * 60);
      
      // Tiempo transcurrido en minutos
      const transcurridoMinutos = Math.floor(transcurridoMs / (1000 * 60));
      setTiempoTranscurrido(transcurridoMinutos);

      // Costo actual (por minutos transcurridos)
      const costoMinuto = parkingData.tarifaHora / 60;
      setCostoActual(Math.ceil(transcurridoMinutos * costoMinuto));

      // Tiempo límite
      const limiteMs = inicioMs + (parkingData.limiteHoras * 60 * 60 * 1000);
      const restanteMs = limiteMs - ahora.getTime();
      const restanteMinutos = Math.floor(restanteMs / (1000 * 60));
      
      setTiempoRestante(Math.max(0, restanteMinutos));

      // Alerta cuando quedan 15 minutos
      if (restanteMinutos <= 15 && restanteMinutos > 0 && !alertaEnviada) {
        enviarAlertaTiempo();
        setAlertaEnviada(true);
      }

      // Si se acabó el tiempo
      if (restanteMinutos <= 0) {
        mostrarAlertaTiempoVencido();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [parkingData, alertaEnviada]);

  const enviarAlertaTiempo = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Tiempo por vencer",
        body: `Tu estacionamiento vence en 15 minutos. Patente: ${parkingData.patente}`,
        data: { screen: 'ActiveParking' },
      },
      trigger: null, // Inmediata
    });
  };

  const mostrarAlertaTiempoVencido = () => {
    Alert.alert(
      "⚠️ Tiempo Vencido",
      "El tiempo de estacionamiento ha expirado. Se pueden aplicar multas adicionales.",
      [
        { text: "Extender", onPress: () => setShowExtendModal(true) },
        { text: "Finalizar", onPress: finalizarEstacionamiento, style: 'destructive' }
      ]
    );
  };

  const formatearTiempo = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    const secs = 0; // Para efecto visual
    return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calcularHoraVencimiento = () => {
    const vencimiento = new Date(parkingData.horaInicio.getTime() + (parkingData.limiteHoras * 60 * 60 * 1000));
    return vencimiento.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const extenderEstacionamiento = () => {
    const horasAExtender = parseFloat(horasExtender);
    if (isNaN(horasAExtender) || horasAExtender <= 0 || horasAExtender > 5) {
      Alert.alert('Error', 'Ingrese un número válido de horas (1-5)');
      return;
    }

    const costoExtension = horasAExtender * parkingData.tarifaHora;
    
    if (parkingData.saldoUsuario < costoExtension) {
      Alert.alert(
        'Saldo Insuficiente',
        `Necesita $${costoExtension} para extender ${horasAExtender} hora(s). Su saldo actual es $${parkingData.saldoUsuario}`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Recargar Saldo', onPress: () => navigation.navigate('Balance') }
        ]
      );
      return;
    }

    Alert.alert(
      'Confirmar Extensión',
      `¿Extender ${horasAExtender} hora(s) por $${costoExtension}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setParkingData(prev => ({
              ...prev,
              limiteHoras: prev.limiteHoras + horasAExtender,
              saldoUsuario: prev.saldoUsuario - costoExtension
            }));
            setShowExtendModal(false);
            setAlertaEnviada(false); // Reset para nueva alerta
            Alert.alert('Éxito', `Estacionamiento extendido ${horasAExtender} hora(s)`);
          }
        }
      ]
    );
  };

  const finalizarEstacionamiento = () => {
    Alert.alert(
      'Finalizar Estacionamiento',
      `¿Confirma finalizar el estacionamiento?\n\nCosto total: $${costoActual}\nTiempo usado: ${Math.floor(tiempoTranscurrido / 60)}h ${tiempoTranscurrido % 60}m`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: () => {
            // Simular finalización
            Alert.alert(
              'Estacionamiento Finalizado',
              `Gracias por usar ParkApp\n\nResumen:\nPatente: ${parkingData.patente}\nTiempo: ${Math.floor(tiempoTranscurrido / 60)}h ${tiempoTranscurrido % 60}m\nCosto: $${costoActual}`,
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Map')
                }
              ]
            );
          }
        }
      ]
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simular actualización de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const navegarAMapa = () => {
    navigation.navigate('Map', { 
      highlightLocation: parkingData.ubicacion,
      showVehicleLocation: true 
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        <Text style={styles.headerTitle}>Estacionamiento Activo</Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={navegarAMapa}
        >
          <Ionicons name="map" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Timer Principal */}
      <View style={styles.timerContainer}>
        <LinearGradient
          colors={tiempoRestante <= 15 ? ['#E74C3C', '#C0392B'] : ['#72C8A8', '#2E7BDC']}
          style={styles.timerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.timerLabel}>
            {tiempoRestante > 0 ? 'Tiempo Restante' : 'Tiempo Excedido'}
          </Text>
          <Text style={styles.timerValue}>
            {tiempoRestante > 0 ? formatearTiempo(tiempoRestante) : '00:00:00'}
          </Text>
          <Text style={styles.timerExpiry}>
            Vence: {calcularHoraVencimiento()} hs
          </Text>
          
          {tiempoRestante <= 0 && (
            <View style={styles.expiredBadge}>
              <Ionicons name="warning" size={16} color="white" />
              <Text style={styles.expiredText}>VENCIDO</Text>
            </View>
          )}
        </LinearGradient>
      </View>

      {/* Información del Vehículo */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="car" size={24} color="#2E7BDC" />
            <Text style={styles.infoTitle}>Información del Vehículo</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Patente:</Text>
            <Text style={styles.infoValue}>{parkingData.patente}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ubicación:</Text>
            <Text style={styles.infoValue}>{parkingData.ubicacion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Inicio:</Text>
            <Text style={styles.infoValue}>
              {parkingData.horaInicio.toLocaleTimeString('es-AR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tarifa:</Text>
            <Text style={styles.infoValue}>${parkingData.tarifaHora}/hora</Text>
          </View>
        </View>
      </View>

      {/* Estadísticas de Tiempo y Costo */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#5CB3CC', '#72C8A8']}
            style={styles.statGradient}
          >
            <Ionicons name="time" size={24} color="white" />
            <Text style={styles.statValue}>
              {Math.floor(tiempoTranscurrido / 60)}h {tiempoTranscurrido % 60}m
            </Text>
            <Text style={styles.statLabel}>Tiempo Usado</Text>
          </LinearGradient>
        </View>

        <View style={styles.statCard}>
          <LinearGradient
            colors={['#FFC857', '#72C8A8']}
            style={styles.statGradient}
          >
            <Ionicons name="wallet" size={24} color="white" />
            <Text style={styles.statValue}>${costoActual}</Text>
            <Text style={styles.statLabel}>Costo Actual</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.extendButton}
          onPress={() => setShowExtendModal(true)}
        >
          <LinearGradient
            colors={['#5CB3CC', '#72C8A8']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="time" size={20} color="white" />
            <Text style={styles.actionButtonText}>Extender</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.finishButton}
          onPress={finalizarEstacionamiento}
        >
          <LinearGradient
            colors={['#E74C3C', '#C0392B']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="stop" size={20} color="white" />
            <Text style={styles.actionButtonText}>Finalizar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Estado del Saldo */}
      <View style={styles.balanceContainer}>
        <LinearGradient
          colors={['#2E7BDC', '#5CB3CC']}
          style={styles.balanceGradient}
        >
          <View style={styles.balanceContent}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Saldo Disponible</Text>
              <Text style={styles.balanceValue}>
                ${parkingData.saldoUsuario.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.balanceButton}
              onPress={() => navigation.navigate('Balance')}
            >
              <Ionicons name="add" size={20} color="#2E7BDC" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Alertas y Notificaciones */}
      {tiempoRestante <= 30 && tiempoRestante > 0 && (
        <View style={styles.alertContainer}>
          <LinearGradient
            colors={['#FFC857', '#E74C3C']}
            style={styles.alertGradient}
          >
            <Ionicons name="warning" size={24} color="white" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>¡Atención!</Text>
              <Text style={styles.alertText}>
                Su tiempo de estacionamiento está por vencer
              </Text>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Modal de Extensión */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showExtendModal}
        onRequestClose={() => setShowExtendModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Extender Estacionamiento</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowExtendModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Horas a extender:</Text>
              <TextInput
                style={styles.modalInput}
                value={horasExtender}
                onChangeText={setHorasExtender}
                keyboardType="numeric"
                placeholder="1"
                maxLength={1}
              />
              
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoText}>
                  Costo: ${(parseFloat(horasExtender) || 0) * parkingData.tarifaHora}
                </Text>
                <Text style={styles.modalInfoText}>
                  Saldo disponible: ${parkingData.saldoUsuario}
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowExtendModal(false)}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={extenderEstacionamiento}
                >
                  <LinearGradient
                    colors={['#72C8A8', '#2E7BDC']}
                    style={styles.modalConfirmGradient}
                  >
                    <Text style={styles.modalConfirmText}>Extender</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  mapButton: {
    padding: 5,
  },
  timerContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timerGradient: {
    padding: 30,
    alignItems: 'center',
    position: 'relative',
  },
  timerLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  timerValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  timerExpiry: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  expiredBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 15,
  },
  extendButton: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  finishButton: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  balanceContainer: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  balanceGradient: {
    padding: 20,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'white',
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  balanceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  alertGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  alertContent: {
    flex: 1,
    marginLeft: 15,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  alertText: {
    fontSize: 14,
    color: 'white',
    marginTop: 2,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalInput: {
    height: 50,
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  modalInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
  },
  modalCancelButton: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#2E7BDC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#2E7BDC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalConfirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalConfirmGradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActiveParkingScreen;