import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface NavItem {
  key: string;
  icon: string;
  label: string;
}

interface BottomNavigationProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  style?: ViewStyle | ViewStyle[];
}

export default function BottomNavigation({
  currentRoute = 'Map',
  onNavigate,
  style = {},
}: BottomNavigationProps) {
  const navItems: NavItem[] = [
    { key: 'Map', icon: '🗺️', label: 'Mapa' },
    { key: 'Saldo', icon: '💰', label: 'Saldo' },
    { key: 'History', icon: '📋', label: 'Historial' },
    { key: 'Profile', icon: '👤', label: 'Perfil' },
  ];

  const handlePress = (itemKey: string) => {
    if (onNavigate && itemKey !== currentRoute) {
      onNavigate(itemKey);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {navItems.map((item) => {
        const isActive = currentRoute === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => handlePress(item.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>

            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray + '30',
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  navItemActive: {
    // Estilo adicional para item activo si se necesita
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 10,
    color: COLORS.gray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navLabelActive: {
    color: COLORS.primary,
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 30,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
