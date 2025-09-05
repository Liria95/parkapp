import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface ParkingTimerProps {
  initialTimeInSeconds?: number;
  onTimeUp?: () => void;
  onExtend?: (addedSeconds: number, cost: number) => void;
  onFinish?: (totalCost: number) => void;
  isActive?: boolean;
  hourlyRate?: number;
  style?: ViewStyle | ViewStyle[];
}

export default function ParkingTimer({
  initialTimeInSeconds = 7200, // 2 horas
  onTimeUp,
  onExtend,
  onFinish,
  isActive = true,
  hourlyRate = 50,
  style = {},
}: ParkingTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
  const [currentCost, setCurrentCost] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
      setCurrentCost(prev => prev + hourlyRate / 3600); // por segundo
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, hourlyRate, onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 300) return COLORS.danger;
    if (timeRemaining <= 900) return COLORS.warning;
    return COLORS.success;
  };

  const getExpectedEndTime = () => {
    const endTime = new Date(Date.now() + timeRemaining * 1000);
    return endTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleExtend = () => {
    Alert.alert('Extender Tiempo', '¿Cuánto tiempo quieres agregar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: '+30 min ($25)',
        onPress: () => {
          setTimeRemaining(prev => prev + 1800);
          onExtend?.(1800, 25);
        },
      },
      {
        text: '+1 hora ($50)',
        onPress: () => {
          setTimeRemaining(prev => prev + 3600);
          onExtend?.(3600, 50);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.timerContainer, { backgroundColor: getTimeColor() }]}>
        <Text style={styles.timerLabel}>Tiempo Restante</Text>
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        <Text style={styles.timerSubtext}>Vence: {getExpectedEndTime()} hs</Text>
      </View>

      <View style={styles.costContainer}>
        <Text style={styles.costLabel}>Costo Actual</Text>
        <Text style={styles.costValue}>${currentCost.toFixed(2)}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.extendButton} onPress={handleExtend}>
          <Text style={styles.extendButtonText}>⏰ Extender</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.finishButton} onPress={() => onFinish?.(currentCost)}>
          <Text style={styles.finishButtonText}>🛑 Finalizar</Text>
        </TouchableOpacity>
      </View>

      {timeRemaining <= 900 && timeRemaining > 300 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>⚠️ Quedan menos de 15 minutos</Text>
        </View>
      )}

      {timeRemaining <= 300 && (
        <View style={styles.dangerContainer}>
          <Text style={styles.dangerText}>🚨 ¡Tiempo casi agotado! Extiende o finaliza</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  timerContainer: {
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  timerLabel: { color: COLORS.white, fontSize: 16, marginBottom: 5 },
  timerText: { color: COLORS.white, fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  timerSubtext: { color: COLORS.white, fontSize: 14, opacity: 0.9 },
  costContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gray + '30',
  },
  costLabel: { fontSize: 14, color: COLORS.gray },
  costValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginTop: 5 },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  extendButton: { flex: 1, backgroundColor: COLORS.secondary, padding: 15, borderRadius: 25, alignItems: 'center', marginRight: 10 },
  extendButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  finishButton: { flex: 1, backgroundColor: COLORS.primary, padding: 15, borderRadius: 25, alignItems: 'center', marginLeft: 10 },
  finishButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  warningContainer: {
    backgroundColor: COLORS.warning + '20',
    borderColor: COLORS.warning,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  warningText: { color: COLORS.warning, fontSize: 14, fontWeight: 'bold' },
  dangerContainer: {
    backgroundColor: COLORS.danger + '20',
    borderColor: COLORS.danger,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerText: { color: COLORS.danger, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
});
