import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function MapScreen({ navigation }) {
  const [saldo, setSaldo] = useState(1250.00);
  const [searchText, setSearchText] = useState('');

  const mockParkingSpots = [
    { id: 1, location: 'Av. San Martín 123', available: true, rate: 50 },
    { id: 2, location: 'Calle Rivadavia 456', available: false, rate: 45 },
    { id: 3, location: 'Plaza Central', available: true, rate: 60 },
  ];

  const handleSelectSpot = (spot) => {
    if (!spot.available) {
      Alert.alert('Error', 'Este lugar no está disponible');
      return;
    }

    Alert.alert(
      'Confirmar Ubicación',
      `¿Quieres estacionar en ${spot.location}?\nTarifa: $${spot.rate}/hora`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => navigation.navigate('Camera', { spot }),
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>🗺️ Mapa de Estacionamientos</Text>
        
        {/* Tarjeta de Saldo */}
        <View style={styles.saldoCard}>
          <Text style={styles.saldoLabel}>Saldo Disponible</Text>
          <Text style={styles.saldoAmount}>${saldo.toFixed(2)}</Text>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="🔍 Buscar zona"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Simulación del Mapa */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️ MAPA INTERACTIVO</Text>
          <Text style={styles.mapSubtext}>📍 Lugares disponibles</Text>
        </View>
      </View>

      {/* Lista de Lugares */}
      <View style={styles.spotsContainer}>
        <Text style={styles.spotsTitle}>Lugares Cercanos:</Text>
        {mockParkingSpots.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            style={[
              styles.spotCard,
              { backgroundColor: spot.available ? COLORS.white : COLORS.light },
            ]}
            onPress={() => handleSelectSpot(spot)}
            disabled={!spot.available}
          >
            <View style={styles.spotInfo}>
              <Text style={styles.spotLocation}>📍 {spot.location}</Text>
              <Text style={styles.spotRate}>💰 ${spot.rate}/hora</Text>
              <Text
                style={[
                  styles.spotStatus,
                  { color: spot.available ? COLORS.success : COLORS.danger },
                ]}
              >
                {spot.available ? '✅ Disponible' : '❌ Ocupado'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  saldoLabel: {
    color: COLORS.white,
    fontSize: 14,
  },
  saldoAmount: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 20,
    paddingTop: 10,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    marginBottom: 10,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapSubtext: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
  },
  spotsContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  spotsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  spotCard: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.gray + '30',
  },
  spotInfo: {
    flexDirection: 'column',
  },
  spotLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  spotRate: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 2,
  },
  spotStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});