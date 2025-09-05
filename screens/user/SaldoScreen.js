import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';
import SaldoCard from '../../components/common/SaldoCard';
import Button from '../../components/common/Button';

export default function SaldoScreen() {
  const [saldo, setSaldo] = useState(1250.00);
  const [recargaAutomatica, setRecargaAutomatica] = useState(false);
  const [loading, setLoading] = useState(false);

  const movimientos = [
    { 
      id: 1, 
      tipo: 'gasto', 
      descripcion: 'Estacionamiento - Av. San Martín', 
      monto: -50.00, 
      fecha: '30/08/2025 14:30',
      icon: '🚗'
    },
    { 
      id: 2, 
      tipo: 'recarga', 
      descripcion: 'Recarga con tarjeta VISA', 
      monto: 500.00, 
      fecha: '29/08/2025 10:15',
      icon: '💳'
    },
    { 
      id: 3, 
      tipo: 'gasto', 
      descripcion: 'Multa pagada - Plaza Central', 
      monto: -150.00, 
      fecha: '28/08/2025 16:22',
      icon: '🚨'
    },
    { 
      id: 4, 
      tipo: 'recarga', 
      descripcion: 'Recarga automática', 
      monto: 1000.00, 
      fecha: '25/08/2025 08:00',
      icon: '🔄'
    },
  ];

  const handleRecargar = () => {
    Alert.alert(
      'Recargar Saldo',
      'Selecciona el monto a recargar:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: '$500', 
          onPress: () => recargarSaldo(500)
        },
        { 
          text: '$1000', 
          onPress: () => recargarSaldo(1000)
        },
        { 
          text: '$2000', 
          onPress: () => recargarSaldo(2000)
        },
      ]
    );
  };

  const recargarSaldo = async (monto) => {
    setLoading(true);
    
    // Simular proceso de recarga
    setTimeout(() => {
      setSaldo(prev => prev + monto);
      setLoading(false);
      Alert.alert('Éxito', `Saldo recargado correctamente con $${monto}`);
    }, 2000);
  };

  const toggleRecargaAutomatica = () => {
    setRecargaAutomatica(!recargaAutomatica);
    Alert.alert(
      'Recarga Automática',
      recargaAutomatica 
        ? 'Recarga automática desactivada' 
        : 'Recarga automática activada. Se recargará $500 cuando el saldo sea menor a $100'
    );
  };

  const handleMetodosPago = () => {
    Alert.alert(
      'Métodos de Pago',
      'Métodos disponibles:\n\n💳 VISA ****1234 (Principal)\n💳 Mastercard ****5678\n🏦 Cuenta Bancaria\n📱 MercadoPago',
      [
        { text: 'Cerrar', style: 'cancel' },
        { text: 'Gestionar', onPress: () => Alert.alert('Gestión', 'Redirigiendo a gestión de métodos de pago...') }
      ]
    );
  };

  const renderMovimiento = ({ item }) => (
    <View style={[
      styles.movimientoCard,
      { borderLeftColor: item.tipo === 'recarga' ? COLORS.success : COLORS.danger }
    ]}>
      <View style={styles.movimientoHeader}>
        <Text style={styles.movimientoIcon}>{item.icon}</Text>
        <View style={styles.movimientoInfo}>
          <Text style={styles.movimientoDescripcion}>{item.descripcion}</Text>
          <Text style={styles.movimientoFecha}>{item.fecha}</Text>
        </View>
      </View>
      <Text style={[
        styles.movimientoMonto,
        { color: item.tipo === 'recarga' ? COLORS.success : COLORS.danger }
      ]}>
        {item.monto > 0 ? '+' : ''}${Math.abs(item.monto).toFixed(2)}
      </Text>
    </View>
  );

  const getSaldoStatus = () => {
    if (saldo >= 1000) return { text: 'Saldo saludable', color: COLORS.success };
    if (saldo >= 500) return { text: 'Saldo normal', color: COLORS.warning };
    return { text: 'Saldo bajo - Considera recargar', color: COLORS.danger };
  };

  const saldoStatus = getSaldoStatus();

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={globalStyles.title}>💰 Mi Saldo</Text>
        
        {/* Tarjeta de Saldo Principal */}
        <SaldoCard
          saldo={saldo}
          lastMovement={movimientos[0]?.monto}
          onPress={() => Alert.alert('Detalles', 'Ver detalles completos del saldo')}
          style={styles.saldoCard}
        />
        
        {/* Estado del Saldo */}
        <View style={[styles.statusCard, { backgroundColor: saldoStatus.color + '20' }]}>
          <Text style={[styles.statusText, { color: saldoStatus.color }]}>
            {saldoStatus.text}
          </Text>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionContainer}>
        <View style={styles.buttonRow}>
          <Button
            title="➕ Recargar"
            onPress={handleRecargar}
            loading={loading}
            style={styles.halfButton}
          />

          <Button
            title="📊 Historial"
            type="secondary"
            onPress={() => Alert.alert('Historial', 'Ver historial completo de movimientos')}
            style={styles.halfButton}
          />
        </View>
      </View>

      {/* Configuraciones */}
      <View style={styles.configContainer}>
        <Text style={styles.sectionTitle}>⚙️ Configuraciones</Text>
        
        <TouchableOpacity style={styles.configCard} onPress={handleMetodosPago}>
          <View style={styles.configContent}>
            <Text style={styles.configIcon}>💳</Text>
            <Text style={styles.configText}>Métodos de pago</Text>
          </View>
          <Text style={styles.configArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.configCard} onPress={toggleRecargaAutomatica}>
          <View style={styles.configContent}>
            <Text style={styles.configIcon}>🔄</Text>
            <Text style={styles.configText}>Recarga automática</Text>
          </View>
          <View style={[
            styles.toggleSwitch, 
            { backgroundColor: recargaAutomatica ? COLORS.success : COLORS.gray }
          ]}>
            <Text style={styles.toggleText}>
              {recargaAutomatica ? 'ON' : 'OFF'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.configCard} 
          onPress={() => Alert.alert('Promociones', '🎁 Ofertas especiales:\n\n• Recarga $2000 y obtén $200 gratis\n• Usa la app 10 veces y obtén 50% de descuento\n• Refiere un amigo y ambos obtienen $100')}
        >
          <View style={styles.configContent}>
            <Text style={styles.configIcon}>🎁</Text>
            <Text style={styles.configText}>Promociones disponibles</Text>
          </View>
          <View style={styles.promoBadge}>
            <Text style={styles.promoText}>¡3!</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Últimos Movimientos */}
      <View style={styles.movimientosContainer}>
        <Text style={styles.sectionTitle}>📋 Últimos movimientos</Text>
        <FlatList
          data={movimientos}
          renderItem={renderMovimiento}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.movimientosList}
        />
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
  saldoCard: {
    marginTop: 20,
  },
  statusCard: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionContainer: {
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  configContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 15,
  },
  configCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  configContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  configIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  configText: {
    fontSize: 16,
    color: COLORS.dark,
  },
  configArrow: {
    fontSize: 16,
    color: COLORS.gray,
  },
  toggleSwitch: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  toggleText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  promoBadge: {
    backgroundColor: COLORS.danger,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 20,
    alignItems: 'center',
  },
  promoText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  movimientosContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  movimientosList: {
    flex: 1,
  },
  movimientoCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  movimientoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  movimientoIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  movimientoInfo: {
    flex: 1,
  },
  movimientoDescripcion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  movimientoFecha: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  movimientoMonto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});