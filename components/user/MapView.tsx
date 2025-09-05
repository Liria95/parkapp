import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface Coordinates {
  x?: number;
  y?: number;
}

interface ParkingSpot {
  id: string | number;
  available: boolean;
  rate?: number;
  coordinates?: Coordinates;
}

interface MapViewProps {
  parkingSpots?: ParkingSpot[];
  onSpotPress?: (spot: ParkingSpot) => void;
  userLocation?: Coordinates;
  style?: ViewStyle | ViewStyle[];
}

export default function MapView({
  parkingSpots = [],
  onSpotPress,
  userLocation,
  style = {},
}: MapViewProps) {
  const renderParkingSpot = (spot: ParkingSpot) => (
    <TouchableOpacity
      key={spot.id.toString()}
      style={[
        styles.spotMarker,
        {
          backgroundColor: spot.available ? COLORS.success : COLORS.danger,
          top: spot.coordinates?.y ?? Math.random() * 200 + 50,
          left: spot.coordinates?.x ?? Math.random() * 250 + 50,
        }
      ]}
      onPress={() => onSpotPress && onSpotPress(spot)}
    >
      <Text style={styles.spotIcon}>🅿️</Text>
      {spot.rate !== undefined && <Text style={styles.spotText}>{spot.rate}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.mapBackground}>
        <Text style={styles.mapTitle}>🗺️ MAPA INTERACTIVO</Text>
        <Text style={styles.mapSubtitle}>📍 Lugares disponibles</Text>
        
        {userLocation && (
          <View style={[
            styles.userMarker,
            { top: userLocation.y ?? 150, left: userLocation.x ?? 125 }
          ]}>
            <Text style={styles.userIcon}>📍</Text>
          </View>
        )}
        
        {parkingSpots.map(renderParkingSpot)}
        
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlIcon}>🔍+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlIcon}>🔍-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlIcon}>🧭</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.legendText}>Disponible</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.danger }]} />
          <Text style={styles.legendText}>Ocupado</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendIcon}>📍</Text>
          <Text style={styles.legendText}>Tu ubicación</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapSubtitle: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
  },
  spotMarker: {
    position: 'absolute',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  spotIcon: {
    fontSize: 16,
    color: COLORS.white,
  },
  spotText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 2,
  },
  userMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  userIcon: {
    fontSize: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  mapControls: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  controlButton: {
    backgroundColor: COLORS.white + 'E0',
    padding: 10,
    borderRadius: 25,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  controlIcon: {
    fontSize: 16,
  },
  legend: {
    backgroundColor: COLORS.white,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  legendText: {
    fontSize: 10,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
});
