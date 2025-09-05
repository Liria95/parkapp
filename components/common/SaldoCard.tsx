import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface SaldoCardProps {
  saldo: number;
  showDetails?: boolean;
  onPress?: () => void;
  lastMovement?: number;
  style?: ViewStyle | ViewStyle[];
}

export default function SaldoCard({
  saldo,
  showDetails = true,
  onPress,
  lastMovement,
  style = {},
}: SaldoCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      <View style={styles.content}>
        <Text style={styles.label}>Saldo Disponible</Text>
        <Text style={styles.amount}>${saldo.toFixed(2)}</Text>
        
        {showDetails && lastMovement !== undefined && (
          <Text style={styles.lastMovement}>
            Último movimiento: {lastMovement > 0 ? '+' : ''}${lastMovement.toFixed(2)}
          </Text>
        )}
        
        {onPress && (
          <Text style={styles.tapHint}>Toca para gestionar →</Text>
        )}
      </View>
      
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>💰</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  content: {
    flex: 1,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 5,
  },
  amount: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMovement: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.8,
  },
  tapHint: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.7,
    marginTop: 5,
    fontStyle: 'italic',
  },
  iconContainer: {
    marginLeft: 15,
  },
  icon: {
    fontSize: 32,
    opacity: 0.3,
  },
});
