import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function HistoryScreen() {
  const [historial] = useState([
    {
      id: 1,
      fecha: '30/08/2025',
      hora: '14:30 - 16:07',
      ubicacion: 'Av. San Martín 123',
      patente: 'ABC123',
      duracion: '1h 37min',
      costo: 82.50,
      estado: 'completado',
    },
    {
      id: 2,
      fecha: '29/08/2025',
      hora: '10:15 - 11:45',
      ubicacion: 'Plaza Central',
      patente: 'ABC123',
      duracion: '1h 30min',
      costo: 90.00,
      estado: 'completado',
    },
    {
      id: 3,
      fecha: '28/08/2025',
      hora: '16:22 - 17:30',
      ubicacion: 'Calle Rivadavia 456',
      patente: 'DEF456',
      duracion: '1h 8min',
      costo: 56.67,
      estado: 'completado',
    },
    {
      id: 4,
      fecha: '27/08/2025',
      hora: '09:00 - 12:15',
      ubicacion: 'Av. Libertador 890',
      patente: 'ABC123',
      duracion: '3h 15min',
      costo: 195.00,
      estado: 'completado',
    },
  ]);

  const totalGastado = historial.reduce((sum, item) => sum + item.costo, 0);
  const totalTiempo = historial.reduce((sum, item) => {
    const [horas, mins] = item.duracion.replace('h ', ':').replace('min', '').split(':');
    return sum + parseInt(horas) * 60 + parseInt(mins);
  }, 0);

  const renderHistorialItem = ({ item }) => (
    <View style={styles.historialCard}>
      <View style={styles.historialHeader}>
        <Text style={styles.historialFecha}>{item.fecha}</Text>
        <Text style={[styles.historialCosto, { color: COLORS.primary }]}>
          ${item.costo.toFixed(2)}
        </Text>
      </View>
      
      <View style={styles.historialDetails}>
        <Text style={styles.historialDetalle}>📍 {item.ubicacion}</Text>
        <Text style={styles.historialDetalle}>🚗 {item.patente}</Text>
        <Text style={styles.historialDetalle}>⏰ {item.hora} ({item.duracion})</Text>
      </View>
      
      <View style={styles.historialFooter}>
        <View style={[styles.estadoBadge, { backgroundColor: COLORS.success }]}>
          <Text style={styles.estadoText}>✅ COMPLETADO</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>📋 Historial</Text>
        
        {/* Estadísticas Resumen */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{historial.length}</Text>
            <Text style={styles.statLabel}>Estacionamientos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>${totalGastado.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Total Gastado</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{Math.floor(totalTiempo / 60)}h</Text>
            <Text style={styles.statLabel}>Tiempo Total</Text>
          </View>
        </View>
      </View>

      {/* Lista del Historial */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Últimos Estacionamientos</Text>
        <FlatList
          data={historial}
          renderItem={renderHistorialItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.primary + '10',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 15,
  },
  historialCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historialFecha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  historialCosto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historialDetails: {
    marginBottom: 10,
  },
  historialDetalle: {
    fontSize: 12,
    color: COLORS.gray,
    marginVertical: 1,
  },
  historialFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  estadoBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  estadoText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
